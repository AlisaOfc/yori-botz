import { telegraPh, uploadFile } from "../../system/lib/sticker.js"

export default {
    command: ["tourl", "tolink"],
    description: "Mengubah gambar, video, webp dan audio menjadi url",
    example: "",
    name: "tourl",
    tags: "tools",

    media: true,

    run: async(m, { conn }) => {
        let quoted = m.isQuoted ? m.quoted : m, media = await quoted.download()
        let accept = /image\/(png|jpeg|jpg|gif)|video\/mp4/.test(quoted.mime)
        let link = await (accept ? telegraPh : uploadFile)(media)

        m.reply(`Link: ${link}\nSize: ${func.formatSize(media.length)}`)
    }
}