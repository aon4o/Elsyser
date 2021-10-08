const Command = require('../structures/Command')
const con = require('../structures/Database')

module.exports = new Command({
    name: "schedule_add_class",
    description: "Add a class to the current schedule!",
    permission: "ADMINISTRATOR",

    async run(message, args, client) {

        //CHECKING FOR CORRECT NUMBER OF ARGUMENTS
        if (args.length < 8) {
            return message.reply('You must provide a value for each argument:\n' +
                '**`!add_class`** **<day>** **<number>** **<start time>** **<end time>** **<class name>**\n' +
                '**<day>** --> A day from **monday** to **friday** or their short forms.\n' +
                '**<number>** --> The number of the class.\n' +
                '**<start hour>**, **<start min>**, **<end hour>**, **<end min>** --> Valid start/end hour/mins number.\n' +
                '**<class name>** --> The name of the class.\n')
        }

        //GETTING ARGUMENTS
        let day = args[1].toLowerCase()
        let number = args[2]
        let start_hour = args[3]
        let start_min = args[4]
        let end_hour = args[5]
        let end_min = args[6]
        let name = args[7].toLowerCase()

        //DAY VALIDATION
        const long_days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        const days = ['mon', 'tue', 'wed', 'thu', 'fri']
        if (long_days.includes(day)) {
            day = days[long_days.indexOf(day)]
        } else if (!days.includes(day)) {
            return message.reply("**<day>** should be a day from **monday** to **friday** or their short forms.!")
        }

        //NUMBER VALIDATION
        if (isNaN(number)) {
            return message.reply(
                `"${number === undefined ? '"Nothing"' : number}" is not a valid **number**!`
            )
        }
        number = parseInt(number)
        if (number < 1 || number > 10) return message.reply('The **number** should be between 1 and 10!')

        //START/END TIME VERIFICATION
        if (isNaN(start_hour) || isNaN(start_min) || isNaN(end_hour) || isNaN(end_min)) {
            return message.reply(`**<start hour>**, **<start min>**, **<end hour>** and **<end min>** should be valid numbers!`)
        }
        start_hour = parseInt(start_hour)
        start_min = parseInt(start_min)
        end_hour = parseInt(end_hour)
        end_min = parseInt(end_min)
        if (start_hour < 0 || start_hour > 23 || end_hour < 0 || end_hour > 23) {
            return message.reply(`**<start hour>** and **<end hour>** should be numbers between 00 and 23!`)
        }
        if (start_min < 0 || start_min > 59 || end_min < 0 || end_min > 59) {
            return message.reply(`**<start min>** and **<end min>** should be numbers between 00 and 59!`)
        }

        //NAME VERIFICATION
        if (name.length < 3 || name.length > 100) {
            return message.reply('**name** length must be between 3 and 100 symbols!')
        }

        //INSERT
        con.query(
            `insert into schedule (guild_id, day, number, start, end, name)
            values ("${message.guildId}", "${day}", ${number}, "${start_hour}:${start_min}", "${end_hour}:${end_min}", "${name}")`,
            function (err, result) {
            if (err) throw err
            return message.reply(`Class successfully added!`)
        })


    }
})