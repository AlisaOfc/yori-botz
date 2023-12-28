const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

export async function before(m) {
    if (m.isBaileys || !m.isGroup) return false

    const chat = db.chats[m.chat]
    const isGroupLink = linkRegex.exec(m.text)
    const kickMessage = "Tautan Group Terdeteksi\n\nMaaf, kami memiliki kebijakan yang melarang pengiriman tautan grup WhatsApp di grup ini. Kami berharap Anda dapat mematuhi aturan ini untuk menjaga lingkungan yang aman dan terhindar dari spam. Terima kasih atas kerjasama Anda."

    if (chat.antiLink && isGroupLink) {
        await m.reply(kickMessage)
        conn.sendMessage(m.chat, { delete: m.key })

        if ((!m.isBotAdmin && m.isAdmin) || (m.isBotAdmin && !m.isAdmin)) {
            await m.reply(kickMessage)
            conn.sendMessage(m.chat, { delete: m.key })
            conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
        }
    }

    return true
}