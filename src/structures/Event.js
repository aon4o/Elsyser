const Discord = require('discord.js')
const Client = require('./Client.js')

function runFunction(event, ...eventArgs) {}

class Event {
    constructor(event, runFunction) {
        this.event = event
        this.run = runFunction
    }
}

module.exports = Event