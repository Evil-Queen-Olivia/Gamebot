const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dm',
            group: 'mod',
            memberName: 'dm',
            description: 'Sends a message to the user you mention.',
            examples: ['dm @User Hi there!'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to send the DM to?',
                    type: 'user'
                },
                {
                    key: 'content',
                    prompt: 'What would you like the content of the message to be?',
                    type: 'string'
                }
            ]
        });    
    }
    
    hasPermission(msg) {
        if (msg.channel.type === "dm") return true;
		if (this.client.isOwner(msg.author) || msg.member.roles.has('309392580246765570')) {
            return true;
        } else return false;
	}

    run(msg, args) {
        const { user, content } = args;
        return user.send(content);
    }
};