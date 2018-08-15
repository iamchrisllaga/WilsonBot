const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports.run = async (bot, message, args) => {
	//Setting up the JSON file that is read and written to
	let jsonPath = path.join(__dirname, "..", "data", "players.json");
	let data = fs.readFileSync(jsonPath, "utf8");
	let players = JSON.parse(data);

	if (args.length <= 0) {
		return message.channel.send({
			embed: {
				color: 3447003,
				author: {
					name: bot.user.username,
					icon_url: bot.user.avatarURL
				},
				title: "Yikes",
				description:
					"Type ~inhouse help to learn how to use this command!",
				timestamp: new Date(),
				footer: {
					icon_url: bot.user.avatarURL,
					text: "© WilsonBot Co."
				}
			}
		});
	}

	if (args[0] == "add") {
		if (args.length == 4) {
			players[args[1]] = {
				name: args[1],
				roles: {
					"1:": translateRoleToNumber(args[2])
				},
				rank: rankToNumber(args[3])
			};
		} else if (args.length == 8) {
			players[args[1]] = {
				name: args[1],
				roles: {
					"1": translateRoleToNumber(args[2]),
					"2": translateRoleToNumber(args[3]),
					"3": translateRoleToNumber(args[4]),
					"4": translateRoleToNumber(args[5]),
					"5": translateRoleToNumber(args[6])
				},
				rank: rankToNumber(args[7])
			};
		} else {
			return message.channel.send({
				embed: {
					color: 3447003,
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					title: "Yikes",
					description:
						"Type ~inhouse help to learn how to use this command!",
					timestamp: new Date(),
					footer: {
						icon_url: bot.user.avatarURL,
						text: "© WilsonBot Co."
					}
				}
			});
		}
		var newPlayerData = JSON.stringify(players, null, 2);
		fs.writeFile(jsonPath, newPlayerData, finished);
		function finished(err) {
			console.log(err);
		}
		let roleArray = Object.values(players[args[1]].roles);
		let roleString = "";
		for (var i = 0; i < roleArray.length; i++) {
			roleString += translateNumberToRole(roleArray[i]);
			if (i != roleArray.length - 1) roleString += " > ";
		}
		return message.channel.send({
			embed: {
				color: 3447003,
				author: {
					name: bot.user.username,
					icon_url: bot.user.avatarURL
				},
				title: "You added a player!",
				description: "Here is information on the player you added.",
				fields: [
					{
						name: "Name",
						value: players[args[1]].name
					},
					{
						name: "Role Preferences",
						value: roleString
					},
					{
						name: "Rank",
						value: players[args[1]].rank
					}
				],
				timestamp: new Date(),
				footer: {
					icon_url: bot.user.avatarURL,
					text: "© WilsonBot Co."
				}
			}
		});
	}

	if (args[0] == "remove") {
		var prevLength = players.length;
		if (args.length != 2) {
			return message.channel.send({
				embed: {
					color: 3447003,
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					title: "Yikes",
					description:
						"Type ~inhouse help to learn how to use this command!",
					timestamp: new Date(),
					footer: {
						icon_url: bot.user.avatarURL,
						text: "© WilsonBot Co."
					}
				}
			});
		}
		var removeThis = args[1];
		delete players[removeThis];
		if (!players[args[1]]) {
			return message.channel.send({
				embed: {
					color: 3447003,
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					title: "Yikes",
					description: "No such player, no one removed!",
					timestamp: new Date(),
					footer: {
						icon_url: bot.user.avatarURL,
						text: "© WilsonBot Co."
					}
				}
			});
		}
		var newPlayerData = JSON.stringify(players, null, 2);
		fs.writeFile(jsonPath, newPlayerData, finished);
		function finished(err) {
			console.log(err);
		}
		return message.channel.send({
			embed: {
				color: 3447003,
				author: {
					name: bot.user.username,
					icon_url: bot.user.avatarURL
				},
				title: "You removed a player!",
				description: "Here is information on the player you removed.",
				fields: [
					{
						name: "Name",
						value: args[1]
					}
				],
				timestamp: new Date(),
				footer: {
					icon_url: bot.user.avatarURL,
					text: "© WilsonBot Co."
				}
			}
		});
	}

	if (args[0] == "update") {
		if (args[1] == "roles" || args[1] == "role") {
			if (args.length != 8) {
				return message.channel.send({
					embed: {
						color: 3447003,
						author: {
							name: bot.user.username,
							icon_url: bot.user.avatarURL
						},
						title: "Yikes",
						description: "Wrong usage!",
						fields: [
							{
								name: "Command Usage",
								value:
									"~inhouse update roles WilsonBot [role] [role] [role] [role] [role]"
							},
							{
								name: "Rank Examples",
								value: "b5, silver2, p5, dia3"
							}
						],
						timestamp: new Date(),
						footer: {
							icon_url: bot.user.avatarURL,
							text: "© WilsonBot Co."
						}
					}
				});
			}
			if (!players[args[2]]) {
				return message.channel.send({
					embed: {
						color: 3447003,
						author: {
							name: bot.user.username,
							icon_url: bot.user.avatarURL
						},
						title: "Yikes",
						description:
							"Player " +
							args[2] +
							"doesn't exist! Make sure you're using the correct casing.",
						timestamp: new Date(),
						footer: {
							icon_url: bot.user.avatarURL,
							text: "© WilsonBot Co."
						}
					}
				});
			}
			players[args[2]].roles = {
				first: translateRoleToNumber(args[3]),
				second: translateRoleToNumber(args[4]),
				third: translateRoleToNumber(args[5]),
				fourth: translateRoleToNumber(args[6]),
				fifth: translateRoleToNumber(args[7])
			};
			var newPlayerData = JSON.stringify(players, null, 2);
			fs.writeFile(jsonPath, newPlayerData, finished);
			function finished(err) {
				console.log(err);
			}
			let roleArray = Object.values(players[args[2]].roles);
			let roleString = "";
			for (var i = 0; i < roleArray.length; i++) {
				roleString += translateNumberToRole(roleArray[i]);
				if (i != roleArray.length - 1) roleString += " > ";
			}
			return message.channel.send({
				embed: {
					color: 3447003,
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					title: "You updated a player!",
					description:
						"Here is information on the player you updated.",
					fields: [
						{
							name: "Name",
							value: players[args[2]].name
						},
						{
							name: "Role Preferences",
							value: roleString
						},
						{
							name: "Rank",
							value: players[args[2]].rank
						}
					],
					timestamp: new Date(),
					footer: {
						icon_url: bot.user.avatarURL,
						text: "© WilsonBot Co."
					}
				}
			});
		} else if (args[1] == "rank") {
			if (args.length != 4) {
				return message.channel.send({
					embed: {
						color: 3447003,
						author: {
							name: bot.user.username,
							icon_url: bot.user.avatarURL
						},
						title: "Yikes",
						description: "Wrong usage!",
						fields: [
							{
								name: "Command Usage",
								value: "~inhouse update rank WilsonBot [rank]"
							},
							{
								name: "Rank Examples",
								value: "b5, silver2, p5, dia3"
							}
						],
						timestamp: new Date(),
						footer: {
							icon_url: bot.user.avatarURL,
							text: "© WilsonBot Co."
						}
					}
				});
			}
			players[args[2]].rank = rankToNumber(args[3]);
			var newPlayerData = JSON.stringify(players, null, 2);
			fs.writeFile(jsonPath, newPlayerData, finished);
			function finished(err) {
				console.log(err);
			}
			let roleArray = Object.values(players[args[2]].roles);
			let roleString = "";
			for (var i = 0; i < roleArray.length; i++) {
				roleString += translateNumberToRole(roleArray[i]);
				if (i != roleArray.length - 1) roleString += " > ";
			}
			return message.channel.send({
				embed: {
					color: 3447003,
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					title: "You updated a player!",
					description:
						"Here is information on the player you updated.",
					fields: [
						{
							name: "Name",
							value: players[args[2]].name
						},
						{
							name: "Role Preferences",
							value: roleString
						},
						{
							name: "Rank",
							value: players[args[2]].rank
						}
					],
					timestamp: new Date(),
					footer: {
						icon_url: bot.user.avatarURL,
						text: "© WilsonBot Co."
					}
				}
			});
		} else {
			return message.channel.send({
				embed: {
					color: 3447003,
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					title: "Yikes",
					description:
						"Type ~inhouse help to learn how to use this command!",
					timestamp: new Date(),
					footer: {
						icon_url: bot.user.avatarURL,
						text: "© WilsonBot Co."
					}
				}
			});
		}
	}

	if (args[0] == "teams") {
		if (args.length != 11) {
			return message.channel.send({
				embed: {
					color: 3447003,
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					title: "Yikes",
					description: "You have the wrong amount of players!",
					timestamp: new Date(),
					footer: {
						icon_url: bot.user.avatarURL,
						text: "© WilsonBot Co."
					}
				}
			});
		}
		let teamOne = [];
		let teamTwo = [];
		let playersToBeUsed = [
			players[args[1]],
			players[args[2]],
			players[args[3]],
			players[args[4]],
			players[args[5]],
			players[args[6]],
			players[args[7]],
			players[args[8]],
			players[args[9]],
			players[args[10]]
		];
		for (var i = 0; i < playersToBeUsed.length; i++) {
			if (!playersToBeUsed[i]) {
				return message.channel.send({
					embed: {
						color: 3447003,
						author: {
							name: bot.user.username,
							icon_url: bot.user.avatarURL
						},
						title: "Yikes",
						description:
							"Player " + args[i + 1] + " doesn't exist!",
						timestamp: new Date(),
						footer: {
							icon_url: bot.user.avatarURL,
							text: "© WilsonBot Co."
						}
					}
				});
			}
		}
		//Scrambling the input order so that teams aren't the same every time
		var mixOne, mixTwo, mixThree;
		for (mixThree = playersToBeUsed.length - 1; mixThree > 0; mixThree--) {
			mixOne = Math.floor(Math.random() * (mixThree + 1));
			mixTwo = playersToBeUsed[mixThree];
			playersToBeUsed[mixThree] = playersToBeUsed[mixOne];
			playersToBeUsed[mixOne] = mixTwo;
		}

		//Putting playersToBeUsed into order, where the last element is the player with the lowest rank
		let playersUsed = [];
		let countOne = 0;
		while (countOne < 10) {
			var min = playersToBeUsed[0].rank;
			var minIndex = 0;
			for (var i = 0; i < playersToBeUsed.length; i++) {
				if (playersToBeUsed[i].rank < min) {
					min = playersToBeUsed[i].rank;
					minIndex = i;
				}
			}
			playersUsed.push(playersToBeUsed[minIndex]);
			playersToBeUsed.splice(minIndex, 1);
			countOne += 1;
		}
		playersToBeUsed = playersUsed;
		playersUsed = [];

		//Fill in the teams starting with the highest ranked players, each team swaps off getting the next available high ranking player
		//Start keeping track of the score of each team
		var teamOneScore = 0;
		var teamTwoScore = 0;
		var countTwo = 0;
		while (countTwo < 10) {
			if (countTwo % 2 === 0) {
				teamOne.push(playersToBeUsed.pop());
				teamOneScore += teamOne[teamOne.length - 1].rank;
			} else {
				teamTwo.push(playersToBeUsed.pop());
				teamTwoScore += teamTwo[teamTwo.length - 1].rank;
			}
			countTwo += 1;
		}
		//Start placing players within their teams into their correct 'role slot', prioritizing the lowest ranked players
		var teamOneRoles = ["free", "free", "free", "free", "free"];
		var teamTwoRoles = ["free", "free", "free", "free", "free"];
		while (teamOne.length > 0) {
			var placePlayer = teamOne.pop();
			if (teamOneRoles[placePlayer.roles.first] == "free")
				teamOneRoles[placePlayer.roles.first] = placePlayer;
			else if (teamOneRoles[placePlayer.roles.second] == "free")
				teamOneRoles[placePlayer.roles.second] = placePlayer;
			else if (teamOneRoles[placePlayer.roles.third] == "free")
				teamOneRoles[placePlayer.roles.third] = placePlayer;
			else if (teamOneRoles[placePlayer.roles.fourth] == "free")
				teamOneRoles[placePlayer.roles.fourth] = placePlayer;
			else if (teamOneRoles[placePlayer.roles.fifth] == "free")
				teamOneRoles[placePlayer.roles.fifth] = placePlayer;
			else {
				console.log("Uh oh." + placePlayer.name);
			}
		}
		while (teamTwo.length > 0) {
			var placePlayer = teamTwo.pop();
			if (teamTwoRoles[placePlayer.roles.first] == "free")
				teamTwoRoles[placePlayer.roles.first] = placePlayer;
			else if (teamTwoRoles[placePlayer.roles.second] == "free")
				teamTwoRoles[placePlayer.roles.second] = placePlayer;
			else if (teamTwoRoles[placePlayer.roles.third] == "free")
				teamTwoRoles[placePlayer.roles.third] = placePlayer;
			else if (teamTwoRoles[placePlayer.roles.fourth] == "free")
				teamTwoRoles[placePlayer.roles.fourth] = placePlayer;
			else if (teamTwoRoles[placePlayer.roles.fifth] == "free")
				teamTwoRoles[placePlayer.roles.fifth] = placePlayer;
			else {
				console.log("Uh oh." + placePlayer.name);
			}
		}
		teamOne = teamOneRoles;
		teamTwo = teamTwoRoles;

		//Get the strings for the finalized teams and display them
		for (var i = 0; i < teamOne.length; i++) {
			teamOne[i] = teamOne[i].name + " - " + teamOne[i].rank.toString();
		}
		for (var i = 0; i < teamTwo.length; i++) {
			teamTwo[i] = teamTwo[i].name + " - " + teamTwo[i].rank.toString();
		}
		var teamOneString =
			"Top: " +
			teamOne[0] +
			"\nJungle: " +
			teamOne[1] +
			"\nMid: " +
			teamOne[2] +
			"\nBottom: " +
			teamOne[3] +
			"\nSupport: " +
			teamOne[4];
		var teamTwoString =
			"Top: " +
			teamTwo[0] +
			"\nJungle: " +
			teamTwo[1] +
			"\nMid: " +
			teamTwo[2] +
			"\nBottom: " +
			teamTwo[3] +
			"\nSupport: " +
			teamTwo[4];
		return message.channel.send({
			embed: {
				color: 3447003,
				author: {
					name: bot.user.username,
					icon_url: bot.user.avatarURL
				},
				title: "Clown fiesta time!",
				description: "Here are your teams!",
				timestamp: new Date(),
				fields: [
					{
						name: "Team Wilson (" + teamOneScore + ")",
						value: teamOneString
					},
					{
						name: "Team Ray (" + teamTwoScore + ")",
						value: teamTwoString
					}
				],
				footer: {
					icon_url: bot.user.avatarURL,
					text: "© WilsonBot Co."
				}
			}
		});
	}

	if (args[0] == "info") {
		if (args.length != 2) {
			return message.channel.send({
				embed: {
					color: 3447003,
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					title: "Yikes",
					description:
						"Type ~inhouse help to learn how to use this command!",
					timestamp: new Date(),
					footer: {
						icon_url: bot.user.avatarURL,
						text: "© WilsonBot Co."
					}
				}
			});
		}
		if (args[1] == "everyone") {
			var rosterString = "";
			var rosterArray = [];
			for (name in players) {
				rosterString += name + " ";
			}
			return message.channel.send({
				embed: {
					color: 3447003,
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					title: "Roster",
					description: rosterString,
					timestamp: new Date(),
					footer: {
						icon_url: bot.user.avatarURL,
						text: "© WilsonBot Co."
					}
				}
			});
		}
		if (!players[args[1]]) {
			return message.channel.send({
				embed: {
					color: 3447003,
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					title: "Yikes",
					description:
						"Player " +
						args[1] +
						" doesn't exist! Make sure you're using the correct casing.",
					timestamp: new Date(),
					footer: {
						icon_url: bot.user.avatarURL,
						text: "© WilsonBot Co."
					}
				}
			});
		}
		let roleArray = Object.values(players[args[1]].roles);
		let roleString = "";
		for (var i = 0; i < roleArray.length; i++) {
			roleString += translateNumberToRole(roleArray[i]);
			if (i != roleArray.length - 1) roleString += " > ";
		}
		return message.channel.send({
			embed: {
				color: 3447003,
				author: {
					name: bot.user.username,
					icon_url: bot.user.avatarURL
				},
				title: "You wanted info on a player!",
				description: "Here is information on the player you requested.",
				fields: [
					{
						name: "Name",
						value: players[args[1]].name
					},
					{
						name: "Role Preferences",
						value: roleString
					},
					{
						name: "Rank",
						value: players[args[1]].rank
					}
				],
				timestamp: new Date(),
				footer: {
					icon_url: bot.user.avatarURL,
					text: "© WilsonBot Co."
				}
			}
		});
	}

	if (args[0] == "help") {
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
	}
};

function translateRoleToNumber(role) {
	if (role.includes("top") || (role.includes("t") && role.includes("p")))
		return 0;
	else if (role.includes("j") || role.includes("wood")) return 1;
	else if (role.includes("b") || role.includes("a")) return 3;
	else if (role.includes("m") || role.includes("center")) return 2;
	else if (role.includes("s")) return 4;
	else {
		console.log("Uh oh.");
	}
}

function translateNumberToRole(role) {
	if (role == 0) return "top";
	else if (role == 1) return "jungle";
	else if (role == 2) return "mid";
	else if (role == 3) return "bot";
	else if (role == 4) return "support";
	else {
		console.log("Uh oh.");
	}
}

function rankToNumber(rank) {
	var rankNumber = 0;
	if (rank.length == 2) {
		if (rank.charAt(0) == "b") rankNumber += 0;
		else if (rank.charAt(0) == "s") rankNumber += 5;
		else if (rank.charAt(0) == "g") rankNumber += 10;
		else if (rank.charAt(0) == "p") rankNumber += 15;
		else if (rank.charAt(0) == "d") rankNumber += 20;
		else {
			console.log("Uh oh.");
		}
		if (rank.charAt(1) == "5" || rank.substring(1).toLowerCase() == "v")
			rankNumber += 1;
		else if (
			rank.charAt(1) == "4" ||
			rank.substring(1).toLowerCase() == "iv"
		)
			rankNumber += 2;
		else if (
			rank.charAt(1) == "3" ||
			rank.substring(1).toLowerCase() == "iii"
		)
			rankNumber += 3;
		else if (
			rank.charAt(1) == "2" ||
			rank.substring(1).toLowerCase() == "ii"
		)
			rankNumber += 4;
		else if (
			rank.charAt(1) == "1" ||
			rank.substring(1).toLowerCase() == "i"
		)
			rankNumber += 5;
		else {
			console.log("Uh oh.");
		}
	} else {
		if (rank.includes("br")) rankNumber += 0;
		else if (rank.includes("si")) rankNumber += 5;
		else if (rank.includes("go")) rankNumber += 10;
		else if (rank.includes("pl")) rankNumber += 15;
		else if (rank.includes("di")) rankNumber += 20;
		else {
			console.log("Uh oh.");
		}
		if (rank.includes("5")) rankNumber += 1;
		else if (rank.includes("4")) rankNumber += 2;
		else if (rank.includes("3")) rankNumber += 3;
		else if (rank.includes("2")) rankNumber += 4;
		else if (rank.includes("1")) rankNumber += 5;
		else {
			console.log("Uh oh.");
		}
	}
	return rankNumber;
}

module.exports.help = {
	name: "inhouse"
};
