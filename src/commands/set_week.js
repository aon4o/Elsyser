const Command = require("../structures/Command")
const con = require("../structures/Database");

module.exports = new Command({
    name: "set_week",
    description: "Set week for a schedule",
    permission: "MANAGE_MESSAGES",

    async run(message, args, client) {
        let weekType = args[1]
        let date = new Date()
        let weekNumber = date.getWeek()

        if (!weekType || (weekType !== 'odd' && weekType !== 'even'))
            return message.reply(
                `"${weekType === undefined ? 'Nothing' : weekType}" is not a valid value!\nIt should be **odd** or **even**!`
            )
        if (weekType === 'odd') {
            weekNumber += 1
        }

        con.query(
            `delete from week where guild_id=${message.guildId}`,
            function (err, result) {
                if (err) throw err
            })

        con.query(
            `insert into week (guild_id, week_offset)
            values ("${message.guildId}", "${weekNumber%2}")`,
            function (err, result) {
                if (err) throw err
            })

        return message.reply(`Week successfully set!`)
    }
})