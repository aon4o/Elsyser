const Command = require("../structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
	name: "hello",
	description: "Hello!",
	permission: 'SEND_MESSAGES',

	async run(message, args, client) {
		const embed = new Discord.MessageEmbed()
		embed.setAuthor(
			client.user.username,
			client.user.avatarURL({ dynamic: true }),
			"https://github.com/aon2003"
		)
			.setTitle(`Hello, ${message.author.username}!`)
			.setURL('https://github.com/aon2003')
			.setDescription('My name is **Elsyser** and my reason to live is to make your school life easier!\n'
				+ 'If you want to know how I can help you, type in **`!help`** and I\'ll tell you!')
			.setThumbnail(client.user.avatarURL({ dynamic: true}))

			.setColor('DARK_VIVID_PINK')

			.addFields({
				name: 'Bot Name',
				value: 'Elsyser',
				inline: true
			}, {
				name: 'Bot Version',
				value: '1.0.0',
				inline: true
			})

			.setImage('https://uchi.bg/wp-content/uploads/2018/03/maxresdefault.jpg')
			.setFooter(`Developed by Alex Naida`, message.author.avatarURL({dynamic: true}))
			// .setTimestamp()

		message.reply({ embeds: [embed] })
	}
});
