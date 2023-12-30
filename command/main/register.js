import canvafy from "canvafy"
import { createHash } from "crypto"

export default {
    command: ["daftar", "register", "registrasi"],
    description: "Mendaftar untuk bisa menggunakan menu",
    example: "Example: %p%cmd alisa dev 19",
    name: "daftar",
    tags: "main",

    run: async(m, { conn, text }) => {
        let number = /[0-9]{1,3}/i, user = db.users[m.sender]
        let avatar = await conn.profilePictureUrl(m.sender, "image")
        let data = text.match(number), equality = Object.values(db.users).map(v => v.name)
        let securityBuffer = await new canvafy.Security()
            .setAvatar(avatar)
            .setBackground("image", "https://cdn.discordapp.com/attachments/1087030211813593190/1110243947311288530/beeautiful-sunset-illustration-1212023.webp")
            .setCreatedTimestamp(Date.now())
            .setSuspectTimestamp(1)
            .setBorder("#f0f0f0")
            .setLocale("id")
            .setAvatarBorder("#f0f0f0")
            .setOverlayOpacity(0.9)
            .build()

        if (!data[0]) return m.reply(`Example: ${m.prefix + m.command} alisa dev 19`)
        let name = data.input.split(data[0])[0].trim(), sn = createHash("md5").update(m.sender).digest("hex")

        if (user.registered) return m.reply("Kamu sudah terdaftar, mau daftar ulang? Ketik .unreg [sn]")
        if (equality.includes(name)) return m.reply("Username sudah dipakai, coba untuk menambahkan angka atau karakter spesial")

        user.name = name
        user.age = data[0]
        user.registered = true
        user.regTime = + new Date
        conn.sendMedia(m.chat, securityBuffer, m, { caption: `Selamat registrasi telah berhasil!\n\n• *Name:* ${name}\n• *Umur:* ${data[0]}\n• *Serial Number:* ${sn}\n\nTerimakasih sudah melakukan registrasi. Kamu bisa cek profile mu dengan mengetik *.profile*` })
    }
}