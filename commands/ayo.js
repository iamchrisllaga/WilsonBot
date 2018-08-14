const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports.run = async(bot, message, args) => {
	const wilson = bot.emojis.find("name", "wilson");
	const johnYikes = bot.emojis.find("name", "johnYikes");

	let jsonPath = path.join(__dirname, '..', 'data', 'ayoResponses.json');
	let data = fs.readFileSync(jsonPath, 'utf8');
	let ayoResponse = JSON.parse(data);
	let random = Math.floor(Math.random() * ayoResponse.length);
	
	let response = ayoResponse[random].string;
	if(response == ':wilson:') response = (`${wilson}`);
	if(response == ':johnYikes:') response = (`${johnYikes}`);
	return message.channel.send(response);
}

module.exports.help = {
	name: 'ayo'
}