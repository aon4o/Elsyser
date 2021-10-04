console.clear();

const Client = require("./structures/Client.js");
require('dotenv').config()

const client = new Client();
client.start(process.env.TOKEN)
