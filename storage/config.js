import fs from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import moment from "moment-timezone"
import Function from "../system/lib/function.js"

//—————「 Setings your bot 」—————//
global.author = "Alisa Dev"
global.name = "Yori - Botz"
global.packname = "Created Sticker By"
global.wm = "Made from love"
global.linkGroup = "https://s.id/Kitsune-Infomation"

global.owner = ["6287874358314", "62895347198105"]
global.pairingNumber = "" //wajib diisi

global.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i
global.thumbnail = fs.readFileSync("./storage/media/thumbnail.jpg")
global.ucapan = timeSpeech()
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
            mediaUrl: "https://github.com/AlisaOfc",
            sourceUrl: "https://github.com/AlisaOfc"
        }
    }
}


//—————「 It"s a function 」—————//
function timeSpeech() {
	let wakt = moment.tz("Asia/Jakarta").format("HH:mm")
	let ucapanWaktu = ""

    if (wakt < "23:59") ucapanWaktu = "Selamat Malam"
    if (wakt < "19:00") ucapanWaktu = "Selamat Petang"
    if (wakt < "18:00") ucapanWaktu = "Selamat Sore"
    if (wakt < "15:00") ucapanWaktu = "Selamat Siang"
    if (wakt < "10:00") ucapanWaktu = "Selamat Pagi"
    if (wakt < "05:00") ucapanWaktu = "Selamat Subuh"
    if (wakt < "03:00") ucapanWaktu = "Selamat Tengah Malam"

    return ucapanWaktu
}

//—————「 Don"t change it 」—————//
let file = fileURLToPath(import.meta.url)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright("Update config.js"))
    import(`${file}?update=${Date.now()}`)
})