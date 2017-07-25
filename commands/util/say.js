const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            group: 'util',
            memberName: 'say',
            description: 'Replies with the text you provide.',
            examples: ['say Hi there!'],
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to say?',
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
        const { text } = args;
        msg.delete();
        return msg.say(`\u180E${text}`);
    }
};