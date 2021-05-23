const Discord = require('discord.js')
const positivityAPI = require('positivity-api') 
const keepAlive = require('./server.js')
const language = require('@google-cloud/language')
const fs = require("fs")
const fetch = require("node-fetch")
const schedule = require('node-schedule')

const channelScheduleMap = {}

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

  if (msg.content == '!help'){
    msg.reply("Hi there. CheerBot is a AI-backed Discord bot that aims to improve the positivity of discord users with the following features: \n\n- `!schedule` sends a positive message in the server everyday at 9am(EST) after being called. This can be stopped by calling `!schedule` again.\n- `!quote` sends an encouragement message.\n- `!dog` sends an image of an adorable puppy to brighten up the user's mood.\n\nAdditionally, all other messages in the server are also screened by the bot using sentiment analysis. Any message that is too negative would cause CheerBot to respond with a message to console the user")
  }
  
  // gets random quote from API
  if (msg.content == '!quote') {
    msg.reply(positivityAPI.random());
  }

  // gets random dog image from API
  else if (msg.content == '!dog'){
    const message = "Hey there. Are you feeling down? What about a random image of a dog to cheer you up. Aren't they adorable?"
    const response = await fetch(API_URL)
    const buffer = await response.buffer()
    fs.writeFile(IMAGE_FILE_PATH,buffer,()=> {
        msg.reply(message, {
            files:[IMAGE_FILE_PATH]
        })})
  }

  // schedule positive messages to be received everyday at a specific time
  else if(msg.content == `!schedule`){

    if (msg.channel in channelScheduleMap){
      channelScheduleMap[msg.channel].cancel()
      delete channelScheduleMap[msg.channel]
      msg.reply(`Got it! CheerBot will no longer sent scheduled messages in the morning`)
    }
    else{
      const job = schedule.scheduleJob({hour:9,tz:"America/Detroit"},function(){
        const message = "Good morning! The quote of the day is:\n\n"
        msg.channel.send(message + positivityAPI.random())
      })
      channelScheduleMap[msg.channel] = job
      msg.reply(`Got it! A positive message will be sent in this server everyday at 9.00 EST`)
    }
  }
  else{
      const document = {
          content: msg.content,
          type: "PLAIN_TEXT",
      };
      const [result] = await languageClient.analyzeSentiment({document})
      const sentiment = result.documentSentiment

      if (sentiment.score < SADNESS_THRESHOLD){
          const reassuring_msg = "Dont be so worried. Perhaps this positive quote would help cheer you up!\n"
          msg.reply(reassuring_msg + '\n' + positivityAPI.random())
      }
  }

})

keepAlive();
client.login(process.env.TOKEN);