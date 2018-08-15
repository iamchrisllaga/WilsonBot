const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const fs = require("fs");
bot.commands = new Discord.Collection();

//Sets up the command handler
fs.readdir("./commands/", (err, files) => {
	if (err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if (jsfile.length <= 0) {
		console.log("Couldn't find commands.");
		return;
	}
	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

//Controls what displays on the user list for the bot
bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setActivity("with dinos!");
});

//Sets up handler for commands
bot.on("message", async message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	let prefix = botconfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	let commandFile = bot.commands.get(cmd.slice(prefix.length));
	if (commandFile) commandFile.run(bot, message, args);
});

//Gets the bot online with the correct token
bot.login(botconfig.token);
