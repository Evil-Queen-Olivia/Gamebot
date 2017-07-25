const { Command } = require('discord.js-commando');
console.log("loaded reply!");

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            group: 'util',
            memberName: 'test',
            description: 'Replies with a Message.',
            examples: ['reply']
        });
    }

    hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}


    run(msg) {
        return msg.say('This looks promising!');
    }
};