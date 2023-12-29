import fs from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import Function from "../system/lib/function.js"

//—————「 Setings your bot 」—————//
global.name = "Yori - Botz"
global.wm = "Made from love"

global.author = "Alisa Dev"
global.packname = "Created Sticker By"

global.apikey = "buy on https://api.yanzbotz.my.id/pricing"
global.api = "https://api.yanzbotz.my.id/"
global.link = "https://github.com/AlisaOfc"

global.owner = ["6287874358314"]
global.pairingNumber = "" //isi dengan nomor bot mu

global.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i
global.thumbnail = fs.readFileSync("./storage/media/images.jpg")
global.timeImage = Function.timeImage()
global.ucapan = Function.timeSpeech()
global.multiplier = 69
global.func = Function

//—————「 Message settings 」—————//
global.mess = {
    admin: "Perintah ini hanya untuk admin grup",
    audio: "Reply audio nya",
    botAdmin: "Perintah ini hanya dapat digunakan bila bot adalah admin",
    group: "Perintah ini hanya dapat digunakan dalam chat grup",
    image: "Reply foto atau kirim foto dengan caption",
    limit: "Limit harian kamu telah habis, beberapa command tidak dapat diakses",
    loading: "Silakan tunggu sebentar",
    premium: "Perintah ini hanya untuk pengguna premium",
    private: "Perintah ini hanya dapat digunakan dalam chat pribadi",
    quoted: "Reply pesan nya",
    register: "Silakan mendaftar terlebih dahulu sebelum menggunakan bot",
    sticker: "Reply sticker nya",
    video: "Reply video atau kirim video dengan caption",
    owner: "Perintah ini hanya untuk pemilik bot"
}

global.adReply = {
    contextInfo: {
        externalAdReply: {
            title: ucapan,
            body: wm,
            description: author,
            previewType: "PHOTO",
            thumbnail: thumbnail,
            mediaUrl: link,
            sourceUrl: link
        }
    }
}

//—————「 Don"t change it 」—————//
let file = fileURLToPath(import.meta.url)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright("Update config.js"))
    import(`${file}?update=${Date.now()}`)
})