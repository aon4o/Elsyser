console.clear();

//REQUIRING LIBS
const Client = require('./structures/Client')
require('dotenv').config()

//INITIALIZING AND STARTING BOT
const client = new Client();
client.start(process.env.TOKEN)
