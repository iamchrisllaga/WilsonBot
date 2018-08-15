const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	return message.channel.send({
		embed: {
			color: 3447003,
			author: {
				name: bot.user.username,
				icon_url: bot.user.avatarURL
			},
			title: "Need help?",
			description: "Uh...",
			timestamp: new Date(),
			fields: [
				{
					name: "~inhouse add",
					value:
						"Example:\n~inhouse add WilsonBot jungle plat4\n~inhouse add WilsonBot jungle top bot support mid plat4\nNote: The order you list your roles in is from your first preference to your least"
				},
				{
					name: "~inhouse remove",
					value: "Example:\n~inhouse remove WilsonBot"
				},
				{
					name: "~inhouse update rank",
					value: "Example:\n~inhouse update rank WilsonBot plat4"
				},
				{
					name: "[rank]",
					value:
						"Example:\np5 or plat5 or br2 or bronze2 or diamond3 or dia3"
				},
				{
					name: "~inhouse update roles OR ~inhouse update role",
					value:
						"Example:\n~inhouse update roles WilsonBot jungle mid bot support top"
				},
				{
					name: "~inhouse teams",
					value:
						"Example:\n~inhouse teams WilsonBot ChrisBot StanleyBot ShawnBot RayBot HoYinBot TokioBot WesleyBot JessBot OrenBot"
				},
				{
					name: "~inhouse info [name]",
					value:
						"Example:\n~inhouse info WilsonBot\n~inhouse info everyone"
				}
			],
			footer: {
				icon_url: bot.user.avatarURL,
				text: "© WilsonBot Co."
			}
		}
	});
};

module.exports.help = {
	name: "help"
};
