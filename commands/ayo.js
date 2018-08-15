const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports.run = async (bot, message, args) => {
	let jsonPath = path.join(__dirname, "..", "data", "ayoResponses.json");
	let data = fs.readFileSync(jsonPath, "utf8");
	let ayoResponse = JSON.parse(data);
	let random = Math.floor(Math.random() * ayoResponse.length);
	let emojis = bot.emojis.map(e => e.toString());
	let response = ayoResponse[random].string;
	if (response.split(":").length - 1 == 2) {
		let searchArray = response.split(":");
		let rightEmoji;
		let count = 0;
		let notFound = true;
		while (notFound) {
			if (emojis[count].includes(searchArray[1])) {
				rightEmoji = emojis[count];
				notFound = false;
			}
			count += 1;
		}
		response = rightEmoji;
	}
	return message.channel.send(response);
};

module.exports.help = {
	name: "ayo"
};
