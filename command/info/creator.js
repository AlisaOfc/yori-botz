export default {
    command: ["owner", "creator"],
    description: "Nomor owner atau creator yang membuat bot ini",
    example: "",
    name: "owner",
    tags: "info",

    run: async(m, { conn }) => {
        conn.sendContact(m.chat, owner, m)
        m.reply("Itu adalah nomor owner, jangan di spam ya")
    }
}