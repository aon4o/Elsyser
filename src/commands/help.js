const Discord = require('discord.js')
const Command = require('../structures/Command.js')

module.exports = new Command({
    name: 'help',
    description: 'Shows the help menu',
    permission: 'SEND_MESSAGES',
    async run(message, args, client) {
        console.log(message)
        console.log(args)

        const embed = new Discord.MessageEmbed()

        embed
            .setAuthor(
                client.user.username,
                client.user.avatarURL({ dynamic: true }),
                "https://github.com/aon2003"
            )
            .setThumbnail(client.user.avatarURL({ dynamic: true}))
            .setURL('https://github.com/aon2003')
            .setFooter(`Developed by Alex Naida`, message.author.avatarURL({dynamic: true}))
            .setTimestamp()

        if (args[1] === 'admin')
        {
            embed
                .setTitle("Admin Help Menu.")
                .setDescription(`Hello, **${message.author.username}**! This is the admin help message.\n
            Here you can find information about all the **Admin** commands I support and how to use them!`)
                .setColor('RED')

                .addFields({
                        name: '**Admin commands**',
                        value: 'These commands are usable only by the server admins or people with special permissions.',
                        inline: false
                    },{
                        name: '**`!clear <number:int>`**',
                        value: 'This command deletes a specific number of messages.\n' +
                            '*Max number of deletions at once -> 20*',
                        inline: false
                    },
                )
        } else {
            embed
                .setTitle("User Help Menu.")
                .setDescription(`Hello, **${message.author.username}**! This is the user help message.\n
            Here you can find information about all the **User** commands I support and how to use them!
            If you want to see the **Admin** commands, type in **\`!help admin\`**`
                )
                .setColor('GREEN')

                .addFields({
                        name: '**User commands**',
                        value: 'These commands are usable by every user in the server.',
                        inline: false
                    },{
                        name: '**`!hello`**',
                        value: 'Shows you informational message about the bot.',
                        inline: false
                    },{
                        name: '**`!help`**',
                        value: 'Shows you this message.',
                        inline: false
                    },{
                        name: '**`!week`**',
                        value: 'Tells you which type of week it is: --> `even` or `odd`',
                        inline: false
                    },{
                        name: '**`!schedule <day>`**',
                        value: 'Shows you a message with the schedule for the day you\'ve chosen.\n' +
                            '**`<day>`** can be:\n' +
                            'a day from `monday` to `friday` or their short forms,\n' +
                            '`today` for the current days schedule,\n' +
                            'or *empty* for the full weeks schedule.',
                        inline: false
                    },
                )
        }

        embed
            .addField(
                'In the near future there will be more commands available.\n',
                'If you have an idea about what functions should be added,\n' +
                'feel free to contact the creators! ;)',
            )

        message.reply({ embeds: [embed] })

    }
})