export default function loadDatabase(m) {
    let isNumber = x => typeof x === "number" && !isNaN(x)
    let isBoolean = x => typeof x === "boolean" && Boolean(x)
    let user = db.users[m.sender], chat = db.chats[m.chat], sett = db.settings

    if (typeof user !== "object") db.users[m.sender] = {}
    if (user) {
        if (!isNumber(user.afk)) user.afk = -1
        if (!("afkReason" in user)) user.afkReason = ""
        if (!isBoolean(user.autolevelup)) user.autolevelup = false
        if (!isBoolean(user.banned)) user.banned = false
        if (!("bannedReason" in user)) user.bannedReason = ""
        if (!isNumber(user.exp)) user.exp = 0
        if (!isNumber(user.firstchat)) user.firstchat = -1
        if (!isNumber(user.level)) user.level = 0
        if (!isNumber(user.limit)) user.limit = 25
        if (!isNumber(user.money)) user.money = 0
        if (!isBoolean(user.premium)) user.premium = false
        if (!isNumber(user.premiumTime)) user.premiumTime = -1
        if (!isBoolean(user.registered)) user.registered = false
        if (!isNumber(user.warn)) user.warn = 0
        
        if (!user.registered) {
            if (!isNumber(user.age)) user.age = 0
            if (!("name" in user)) user.name = m.pushName
            if (!isNumber(user.regTime)) user.regTime = -1
        }
    } else {
        db.users[m.sender] = {
            afk: -1,
            afkReason: "",
            age: 0,
            autolevelup: false,
            banned: false,
            bannedReason: "",
            exp: 0,
            firstchat: -1,
            level: 0,
            limit: 25,
            money: 0,
            name: m.pushName,
            premium: false,
            premiumTime: -1,
            registered: false,
            regTime: -1,
            warn: 0
        }
    }

    if (m.isGroup) {
        if (typeof chat !== "object") db.chats[m.chat] = {}
        if (chat) {
            if (!isBoolean(chat.antibot)) chat.antibot = false
            if (!isBoolean(chat.antidelete)) chat.antidelete = true
            if (!isBoolean(chat.antilink)) chat.antilink = false
            if (!isBoolean(chat.antispam)) chat.antispam = false
            if (!isBoolean(chat.antitoxic)) chat.antitoxic = false
            if (!isBoolean(chat.detect)) chat.detect = true
            if (!isNumber(chat.expired)) chat.expired = 0
            if (!isBoolean(chat.isBanned)) chat.isBanned = false
            if (!isBoolean(chat.nsfw)) chat.nsfw = false
            if (!isBoolean(chat.simi)) chat.simi = false
            if (!isBoolean(chat.viewOnce)) chat.viewonce = false
            if (!isBoolean(chat.welcome)) chat.welcome = true
        } else {
            db.chats[m.chat] = {
                antibot: false,
                antidelete: true,
                antilink: false,
                antispam: false,
                antitoxic: false,
                detect: true,
                expired: 0,
                isBanned: false,
                nsfw: false,
                simi: false,
                viewonce: false,
                welcome: true
            }
        }
    }

    if (typeof sett !== "object") db.settings = {}
    if (sett) {
        if (!isBoolean(sett.anticall)) sett.anticall = true
        if (!isBoolean(sett.autoread)) sett.autoread = false
        if (!isBoolean(sett.gconly)) sett.gconly = false
        if (!isBoolean(sett.pconly)) sett.pconly = false
        if (!isBoolean(sett.self)) sett.self = false
    } else {
        db.settings = {
            anticall: true,
            autoread: false,
            gconly: false,
            pconly: false,
            self: false
        }
    }
}