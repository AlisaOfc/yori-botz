import os from "os"

let menu = {
	before: `
*${global.name}* adalah bot WhatsApp yang dapat anda gunakan sebagai alat untuk membuat *Stiker*, mendengarkan *Musik*, mengunduh konten dari *Media Sosial*, dan memainkan *Game RPG* secara real-time.

┌ • Hi @%user %ucapan
│ • *Uptime* : %uptime
│ • *Prefix* : ( %prefix )
│ • *Database* : %database
│ • *Memory Used* : %memory_used / %memory_free
╰───────···

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
    after: "Jika menemukan bug silahkan laporkan ke owner"
}

let tags = {
	"listmenu": "List Menu"
}

export default {
    command: ["menu", "help"],
    description: "Untuk menampilkan menu berdasarkan daftar, dan melihat cara menggunakan menu",
    example: "",
    name: "menu",
    tags: "main",

    register: true,

    run: async(m, { conn, isPrem, text, command }) => {
        if (text.startsWith("--")) {
            let name = text.toLowerCase().replace("--", ""), data = []
            let cmd = Object.values(plugins).find(plugin => plugin.name === name)

            if (!cmd) return m.reply("Command tidak ditemukan")
            if (cmd.name) data.push("*Name:* " + cmd.name)
            if (cmd.command) data.push("*Command:* " + cmd.command.join(", "))
            if (cmd.description) data.push("*Deskripsi:* " + cmd.description)
            if (cmd.example) data.push("*Penggunaan:* " + m.prefix + cmd.command[0])

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

        	text = text.replace(/%user/, m.sender.split("@")[0]).replace(/%ucapan/, ucapan).replace(/%uptime/, func.runtime(process.uptime())).replace(/%prefix/, m.prefix).replace(/%database/, Object.keys(db.users).length).replace(/%memory_used/, func.formatSize(os.totalmem() - os.freemem())).replace(/%memory_free/, func.formatSize(os.totalmem())).replace(/%name/, name).replace(/%limit/, premium ? "Infinity" : limit + "/25").replace(/%level/, level).replace(/%money/, money.toLocaleString()).replace(/%status/, premium ? "Premium" : "Free").replace(/%readmore/, readMore)
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