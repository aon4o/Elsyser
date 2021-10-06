const Command = require("../structures/Command")
const con = require("../structures/Database");
require('../additional_functions/getWeek')

module.exports = new Command({
    name: "week",
    description: "Get week the type of the current week",

    async run(message, args, client) {
        let date = new Date()
        let weekNumber = date.getWeek()
        let week

        con.query(
            `select week_offset from week where guild_id=${message.guildId}`,
            function (err, result) {
                if (err) throw err
                if (result.length === 0) {
                    return message.reply('Your server does not have its weeks set!\n' +
                        'If you think this is a mistake, contact your server admins.')
                }
                if (result[0].week_offset) {
                    weekNumber += 1
                }
                if (weekNumber % 2 === 0) {
                    week = 'even'
                } else {
                    week = 'odd'
                }
                return message.reply(`The current week is **${week}**!`)
            })

    }
})