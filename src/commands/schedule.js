const Command = require('../structures/Command')
const con = require('../structures/Database')
const Discord = require("discord.js");

module.exports = new Command({
    name: "schedule",
    description: "Get a schedule from the database!",

    async run(message, args, client) {

        let day = args[1]
        if (day) {
            day = day.toLowerCase()
        }
        let long_day
        const days = ['mon', 'tue', 'wed', 'thu', 'fri']
        const long_days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']

        if (day && day !== "full" && day !== "today" ) {
            if (long_days.includes(day)) {
                long_day = day
                day = days[long_days.indexOf(day)]
            } else if (!days.includes(day)) {
                return message.reply("**<day>** should be a day from **monday** to **friday** or their short forms.!")
            } else {
                long_day = long_days[days.indexOf(day)]
            }
        } else {
            //GET TODAY'S DAY
            if (day === 'today' || !day) {
                let date = new Date()
                if (date.getDay() >= 5) {
                    return message.reply("Today is not a school day! Chill out bro ;)")
                }
                day = days[date.getDay()]
                long_day = long_days[date.getDay()]
            }
            if (day === "full") {
                long_day = "Full Week"
            }
        }

        const schedule = new Discord.MessageEmbed()
        schedule.setAuthor(
            client.user.username,
            client.user.avatarURL({ dynamic: true }),
            "https://github.com/aon2003"
        )
            .setTitle(`${long_day}'s Schedule`)
            .setURL('https://github.com/aon2003')
            .setThumbnail(client.user.avatarURL({ dynamic: true}))
            .setColor('DARK_AQUA')
            .setFooter(`Developed by Alex Naida`, message.author.avatarURL({dynamic: true}))


        if (day === "full")
        {
            //GETTING THE FULL SCHEDULE
            con.query(
                `SELECT day, number, start, end, name FROM schedule
            where guild_id="${message.guildId}"
            order by day, number`,
                function (err, result, fields) {
                    if (err) throw err;

                    //FORMATTING THE INFORMATION
                    let table = ['', '', '', '', ''];
                    for (let row = 0; row < result.length; ++row) {
                        table[days.indexOf(result[row].day)] +=
                            `| ${result[row].number} | ${result[row].start}-${result[row].end} | ${result[row].name} |\n`
                    }

                    //FORMATTING THE EMBED
                    for (let tableDay in table) {
                        if (!table[tableDay]) {
                            table[tableDay] = `This day's schedule is still empty!
                        To add classes, contact your server admins.`
                        }
                        schedule.addField(long_days[tableDay], table[tableDay], false)
                    }
                    
                    //SENDING THE MESSAGE
                    message.reply({ embeds: [schedule] })
                });

        } else
        {
            //GETTING A DAY SCHEDULE
            con.query(
                `SELECT number, start, end, name FROM schedule
            where day="${day}" and guild_id="${message.guildId}"
            order by number`,
                function (err, result, fields) {
                    if (err) throw err;

                    //FORMATTING THE INFORMATION
                    let table = '';
                    for (let row in result) {
                        table += `| ${result[row].number} | ${result[row].start}-${result[row].end} | ${result[row].name} |\n`
                    }

                    //FORMATTING THE EMBED
                    if (!table) {
                        table = `This day's schedule is still empty!
                        To add classes, contact your server admins.`
                    }
                    schedule.setDescription(table)

                    //SEND
                    message.reply({ embeds: [schedule] })
                });
        }
    }
})