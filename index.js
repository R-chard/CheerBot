const Discord = require('discord.js')
const positivityAPI = require('positivity-api') 
const keepAlive = require('./server.js')
const language = require('@google-cloud/language')

// Instantiates language client
const languageClient = new language.LanguageServiceClient()

// Instantiates discord client
const client = new Discord.Client();

//words that will trigger a encouragement response
sadWords = ["sad","bad","cry"]

client.on('ready', () => {
  console.log('The bot has started')
})

client.on('message', (msg) => {
  
  // gets random quote from API
  if (msg.content.startsWith('!quote')) {
    //msg.content == 'ping' other way to test input
    msg.reply(positivityAPI.random());
  }

  // gets random dog image from API
  else if (msg.content.startsWith('!dog')){
    const message = "Hey there. Are you feeling down? What about a random image of a dog to cheer you up. Aren't they adorable?"
    msg.reply(message + '\nhttps://place.dog/300/200')
  }

  // detects if a user uses a 'sadword' in thier sentance and sends a encouraging message
  if (sadWords.some(word => msg.content.includes(word))) {
    msg.reply(positivityAPI.random())
  }

})

keepAlive();
client.login(process.env.TOKEN);