const Discord = require("discord.js");
const fs = require("fs");

const intents = [
    'GUILDS',
    'DIRECT_MESSAGES',
    'GUILD_MESSAGES',
]
class Client extends Discord.Client {
    constructor() {
        super({ intents });

        this.commands = new Discord.Collection();
        this.prefix = '!'
    }

    start(token) {
        fs.readdirSync("./src/commands")
            .filter(file => file.endsWith(".js"))
            .forEach(file => {
                const command = require(`../commands/${file}`);
                console.log(`Command "${command.name}" loaded`);
                this.commands.set(command.name, command);
            });

        fs.readdirSync("./src/events")
            .filter(file => file.endsWith(".js"))
            .forEach(file => {
                const event = require(`../events/${file}`);
                console.log(`Event "${event.event}" loaded`);
                this.on(event.event, event.run.bind(null, this))
            });

        this.login(token)
    }
}

module.exports = Client;
