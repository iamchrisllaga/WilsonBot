const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let query = args.toString().split(",");
	let response;
	if (query.length == 0) {
		response = "What's up?";
	} else {
		if (args.toString().split("not").length - (1 % 2) == 1) {
			response =
				"Nice try, I won't be fooled by adding negatives to the query!";
		} else {
			if (
				query.includes("hello") ||
				query.includes("hey") ||
				query.includes("hi") ||
				query.includes("ayo")
			) {
				if (query.includes("pus")) {
					response = "Ayo pussy!";
				} else {
					response = "Ayo!";
				}
			} else if (query.includes("who")) {
				if (query.includes("gamora")) {
					response = "I'll do YOU one better. WHY is Gamora?";
				}
				if (query.includes("favorite")) {
					if (query.includes("person")) {
						response = "Chris is my favorite person, duh.";
					}
				}
				if (query.includes("stinky")) {
					if (Math.random() >= 0.5) {
						response = "Poo poo pee pee, Ray go stinky!";
					} else {
						response = "Poo poo pee pee, Ho Yin go stinky!";
					}
				}
			} else if (query.includes("what")) {
				if (query.includes("doing")) {
					response =
						"Looking for the if statement that corresponds to your question.";
				}
			} else if (query.includes("when")) {
				response = "When?";
			} else if (query.includes("where")) {
				if (query.includes("gamora")) {
					response = "Yeah, I'll do you one better. WHO is Gamora?";
				}
			} else if (query.includes("why")) {
				if (query.includes("gamora")) {
					response =
						"Many members of the scientific community and philosophy of science communities think that science can provide the relevant context, and set of parameters necessary for dealing with topics related to the meaning of life. In their view, science can offer a wide range of insights on topics ranging from the science of happiness to death anxiety. Scientific inquiry facilitates this through nomological investigation into various aspects of life and reality, such as the Big Bang, the origin of life, and evolution, and by studying the objective factors which correlate with the subjective experience of meaning and happiness.";
				}
			} else {
				response = "I don't have an if statement prepared for this.";
			}
		}
	}
	return message.channel.send(response);
};

module.exports.help = {
	name: "wilson"
};
