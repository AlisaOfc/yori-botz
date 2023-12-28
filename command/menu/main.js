let menu = {
	before: `
Hi @%user %ucapan

┌ • *Name* : %name
│ • *Limit* : %limit
│ • *Level* : %level
│ • *Money* : %money
│ • *Status* : %status
╰───────···
%readmore`.trimStart(),
    header: "┌ • %category",
    body: "│ • %cmd %isPremium %isLimit",
    footer: "╰───────···\n",
    after: "Ketik *.help --sticker* untuk mendapatkan detail dan penggunaan contoh"
}

let tags = {
	"main": "Main Menu"
}

export default {
    command: ["menumain"],
    description: "Untuk menampilkan menu tipe main, dan melihat cara menggunakan menu",
    example: "",
    name: "menumain",
    tags: "listmenu",

    register: true,

    run: async(m, { conn, isPrem, text, command }) => {
        if (text.startsWith("--")) {
            let name = text.toLowerCase().replace("--", ""), data = []
            let cmd = Object.values(plugins).find(plugin => plugin.name === name)

            if (!cmd) return m.reply("Command tidak ditemukan")
            if (cmd.name) data.push("*Name: *" + cmd.name)
            if (cmd.command) data.push("*Command: *" + cmd.command.join(", "))
            if (cmd.description) data.push("*Deskripsi: *" + cmd.description)
            if (cmd.example) data.push("*Penggunaan: *" + m.prefix + cmd.command[0])

            m.reply(data.join("\n"))
        } else {
            let more = String.fromCharCode(8206)
            let readMore = more.repeat(4001)
            let { level, limit, name, premium, money } = db.users[m.sender]
        	let help = Object.values(plugins).map(plugin => {
        		return {
        			cmd: plugin.command,
        			tags: [plugin.tags],
        			limit: plugin.limit,
        			premium: plugin.premium
        		}
        	})

        	let text = [menu.before, ...Object.keys(tags).map(tag => {
        		return menu.header.replace(/%category/g, tags[tag]) + "\n" + [...help.filter(aa => aa.tags.includes(tag) && aa.cmd).map(a => {
        			return a.cmd.map(help => {
        				return menu.body.replace(/%cmd/g, m.prefix + help).replace(/%isLimit/g, a.limit ? "(Limit)" : "").replace(/%isPremium/g, a.premium ? "(Premium)" : "").trim()
        			}).join("\n")
        		}), menu.footer].join("\n")
        	}), menu.after].join("\n")

        	text = text.replace(/%user/, m.sender.split("@")[0]).replace(/%ucapan/, ucapan).replace(/%name/, name).replace(/%limit/, premium ? "Infinity" : limit + "/25").replace(/%level/, level).replace(/%money/, money.toLocaleString()).replace(/%status/, premium ? "Premium" : "Free").replace(/%readmore/, readMore)
        	conn.sendMessage(m.chat, { text: text.trim(),
        	    contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        mediaType: 1,
                        previewType: "pdf",
                        title: global.name,
                        body: wm,
                        thumbnail: thumbnail,
                        renderLargerThumbnail: true,
                        sourceUrl: linkGroup
                    }
                }
            }, { quoted: null })
        }
    }
}