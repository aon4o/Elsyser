const Command = require('../structures/Command')
const con = require('../structures/Database')

module.exports = new Command({
    name: "add_class",
    description: "Add a class type!",
    permission: "ADMINISTRATOR",

    async run(message, args, client) {

        //CHECKING FOR CORRECT NUMBER OF ARGUMENTS
        if (args.length < 2) {
            return message.reply(`You should provide a valid class **<name>**!`)
        }

        //GETTING ARGUMENTS
        let class_name = args[1]

        //VERIFICATION
        if (class_name.length < 3 || class_name.length > 50) {
            return message.reply('**<class_name>** length must be between 3 and 100 symbols!')
        }

        class_name = class_name.toLowerCase()

        //INSERT
        con.query(
            `insert into class (guild_id, name)
            values ("${message.guildId}", "${class_name}")`,
            function (err, result) {
                if (err) {
                    return message.reply("Class already exists!")
                }
                return message.reply(`Class successfully added!`)
            })


    }
})