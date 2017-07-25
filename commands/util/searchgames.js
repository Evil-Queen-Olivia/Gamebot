const giantbomb = require('giantbomb');
const gb = giantbomb('0eaca5252056e2d21c07db2b62036a89c47bc52d');

const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'search-games',
            group: 'util',
            memberName: 'search-games',
            description: 'Searches for the game you say.',
            examples: ['say Hi there!'],
            args: [
                {
                    key: 'game',
                    prompt: 'What game do you want to search for?',
                    type: 'string'
                }
            ]
        });    
    }

    hasPermission(msg) {
		if (this.client.isOwner(msg.author)) {
            return true;
        } else return false;
	}

    run(msg, args) {
        const { game } = args;
         
        // Display details for Game. 
        var games = "```css\n";
        msg.say("**Searching for " + game + "!**");
        gb.games.search(game, (err, res, json) => {
            for (var i=1; i<=json.results.length; i++) {
                games = games + "[" + i.toString() + "] " + json.results[i-1].name + "\n";
            }
            if (games == "```css\n") {
                return msg.say("**Could not find any matches for " + game + "!**")
            }
            msg.say("**Found the following games for " + game + ":**");
            return msg.say(games + "```" + "\n*A maximum of 10 results can be shown. If the result you wanted is not appering be more specific with your search query!*");
        });
        return;
    }
};