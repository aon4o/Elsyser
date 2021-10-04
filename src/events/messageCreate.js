const Event = require('../structures/Event.js')

module.exports = new Event('messageCreate', (client, message) => {
    //CHECK IF MESSAGE IS A COMMAND
    if (!message.content.startsWith(client.prefix) || message.author.bot) {
        return;
    }

    //GETTING ARGUMENTS
    const args = message.content.substring(client.prefix.length).split(/ +/);

    //CHECKING FOR A VALID COMMAND
    const command = client.commands.find(command => command.name === args[0]);

    //NOT A VALID COMMAND ERROR
    if (!command) {
        return message.reply('`' + args[0] + '` is not a valid command! To see the list with commands type **`!help`**');
    }

    //DOES NOT HAVE A PERMISSION ERROR
    const permission = message.member.permissions.has(command.permission)
    if (!permission)
        return message.reply(`You do not have the permission ${command.permission} to run this command!`)

    //RUNNING THE COMMAND
    command.run(message, args, client);
})