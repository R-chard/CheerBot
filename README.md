# CheerBot 😃

CheerBot is an AI-backed Discord bot that aims to improve the positivity of Discord users using sentimental analysis of messages sent in the Discord server. Our inspiration for building this bot came from reading about the decline in mental health during the COVID-19 pandemic. We recognised that unfettered negative self-speak can be a potent source of harm in one's mental health. Hence, we developed a bot that can spot situations like this, and encourage the user to stay positive, despite tough times.

## Features ⭐
The main functionality of our bot is to passively screen all text messages in the server, and then use the Sentiment Analysis API in [Google Cloud Natural Language](https://cloud.google.com/natural-language) to identify messages that are deemed too negative. CheerBot subsequently sends a positive quote as an attempt to console the user.

To further improve the mental health of our users, we have also introduced the following features. CheerBot allows the user to

- 💬 Get an inspiring quote using **!quote**
- 📅 Set a recurring schedule to start the day right with a positive message at 9am EST everyday using **!schedule** 
- 🐶 Get an adorable image of a puppy  to lighten up the mood using **!dog** 
- 📃 Display the list of available commands and what they do using **!help**

## Tech Stack ⚙️

CheerBot is written in Javascript and runs on the NodeJS framework using packages like [node-fetch](https://www.npmjs.com/package/node-fetch), [node-schedule](https://www.npmjs.com/package/node-schedule) and [@google-cloud/language](https://www.npmjs.com/package/@google-cloud/language) 
We also used the following open source APIs for our project
- Inspiring quotes -> [positivity-api package](https://www.npmjs.com/package/positivity-api)
- Cute dog images -> https://place.dog

## Usage 🔨
To use our discord bot, simply add it to your discord server by...
>Note that for security reasons, we do not allow users to run our program directly, since this would mean our tokens and API keys would be compromised

## Contributors
[R-chard](https://github.com/R-chard)
[person25square](https://github.com/Person25square)
[StealTempo3662](https://github.com/agoodson582)