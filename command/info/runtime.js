export default {
    command: ["runtime", "uptime"],
    description: "Runtime atau Uptime bot",
    example: "",
    name: "runtime",
    tags: "info",

    run: async(m) => {
        m.reply(await func.runtime(process.uptime()))
    }
}