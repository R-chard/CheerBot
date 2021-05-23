const Discord = require('discord.js')
const positivityAPI = require('positivity-api') 
const keepAlive = require('./server.js')
const language = require('@google-cloud/language')
const fs = require("fs")
const fetch = require("node-fetch")

require('dotenv').config();

// Instantiates language client
const languageClient = new language.LanguageServiceClient()

// Instantiates discord client
const client = new Discord.Client();

const SADNESS_THRESHOLD = -0.75
const IMAGE_FILE_PATH = "./image.jpg"
const API_URL = "https://place.dog/600/400"

client.on('ready', () => {
  console.log('The bot has started')
})

client.on('message', async (msg) => {
  
  // gets random quote from API
  if (msg.content.startsWith('!quote')) {
    //msg.content == 'ping' other way to test input
    msg.reply(positivityAPI.random());
  }

  // gets random dog image from API
  else if (msg.content.startsWith('!dog')){
    const message = "Hey there. Are you feeling down? What about a random image of a dog to cheer you up. Aren't they adorable?"
    const response = await fetch(API_URL)
    const buffer = await response.buffer()
    fs.writeFile(IMAGE_FILE_PATH,buffer,()=> {
        msg.reply(message, {
            files:[IMAGE_FILE_PATH]
        })})
  }
  
  else{
      const document = {
          content: msg.content,
          type: "PLAIN_TEXT",
      };
      const [result] = await languageClient.analyzeSentiment({document})
      const sentiment = result.documentSentiment

      if (sentiment.score < SADNESS_THRESHOLD){
          const reassuring_msg = "Dont be so negative. Perhaps this positive quote would help cheer you up!\n"
          msg.reply(reassuring_msg + '\n' + positivityAPI.random())
      }
  }

})

keepAlive();
client.login(process.env.TOKEN);