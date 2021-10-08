const Discord = require('discord.js')
const Command = require('../structures/Command.js')
const con = require("../structures/Database");

module.exports = new Command({
    name: 'classes',
    description: 'Shows a list with all classes added to this server',
    permission: 'SEND_MESSAGES',
    run: async function (message, args, client) {
        const embed = new Discord.MessageEmbed()
        embed
            .setAuthor(
                client.user.username,
                client.user.avatarURL({dynamic: true}),
                "https://github.com/aon2003"
            )
            .setThumbnail(client.user.avatarURL({dynamic: true}))
            .setURL('https://github.com/aon2003')
            .setFooter(`Developed by Alex Naida`, message.author.avatarURL({dynamic: true}))
            .setTimestamp()


        con.query(
            `select name from class where guild_id="${message.guildId}"`,
            function (err, result) {
                if (err) {
                    console.log(err)
                    return message.reply("Unexpected error occurred! Please contact the bot creator!")
                }

                if (result.length === 0) {
                    return message.reply("There are no classes in your server!\n" +
                        "If you think this is a mistake, contact your server admins!")
                }

                for (const resEl of result) {
                    embed.addField(resEl.name, " - TBA", false)

                }

                return message.reply({embeds: [embed]})
            })
    }
})