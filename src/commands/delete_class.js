const Command = require('../structures/Command')
const con = require('../structures/Database')

module.exports = new Command({
    name: "delete_class",
    description: "Delete a class type!",
    permission: "ADMINISTRATOR",

    async run(message, args, client) {

        //CHECKING FOR CORRECT NUMBER OF ARGUMENTS
        if (args.length < 2) {
            return message.reply(`You should provide a valid class **<name>**!`)
        }

        //GETTING ARGUMENTS
        let class_name = args[1].toLowerCase()

        //DELETE
        con.query(
            `delete from class where name="${class_name}" and guild_id=${message.guildId}`,
            function (err, result) {
                if (err) {
                    console.log(err)
                    return message.reply("Unexpected error occurred! Please, contact the bot creator!")
                }
                if (result.affectedRows === 0) {
                    return message.reply(`Class "${class_name}" does not exist.`)
                }
                return message.reply(`Class "${class_name}" successfully deleted!`)
            })


    }
})