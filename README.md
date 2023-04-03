# JS-Bot-Template
 Javascript Discord Bot template, using discord.js v14.9.0

This repository was originally created so I could easily create bots without having to replicate the same files over and over again. Below are some of the base dependencies that I use in every project, and an explanation of why I use them, incase you are curious. You are welcome to fork this repo and use it for your own purposes, without any need for providing credit. Keep in mind this repository is licensed under the MIT license and that should be referred to before forking, or interacting with this repository and its code.

## Base Dependencies
 - Discord.js: [^v14.9.0](https://npmjs.org/discord.js)
 - Common-Tags: [^v1.8.2](https://npmjs.org/common-tags)
 - Mongoose: [^7.0.3](https://npmjs.org/mongoose)
 - Short-Unique-Id: [^4.4.4](https://npmjs.org/short-unique-id)

 ### __Discord.js__
Discord.js is the default library for connecting this template to discord. I prefer it, as its maintainers update the library frequenlty with 
new features as Discord rolls them out. 
___
 ### __Common Tags__
Used for formatting strings in code file in an easier to read way, ensuring that if your strings are indented, that those indents are removed to prevent unwanted dead space in client facing messages.
___
 ### __Mongoose__
Mongoose is my preferred method for connecting to and interacting with my MongoDB databases. Its easy, light-weight and super simple for
	newbies like myself to pick up on. 
___
 ### __Short Unique Id__
A library commonly used by me to create unique ids. Most of the time when working with discord bots you want an id that is a bit easier on the eyes than MongoDB's ObjectId property. Short-Unique-Id, allows me to create Ids that are of whichever length I prefer and change up the characters in those Ids to either, letters, numbers, or a combination of both. 
___
