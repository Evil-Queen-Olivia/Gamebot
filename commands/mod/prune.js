const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'prune',
            group: 'mod',
            memberName: 'prune',
            description: 'Deletes `x` messages.',
            examples: ['prune 10'],
            args: [
                {
                    key: 'num',
                    prompt: 'How many messages do you want to prune?',
                    type: 'integer'
                }
            ]
        });    
    }
    
    hasPermission(msg) {
        if (msg.channel.type === "dm") return false;
		if (this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_MESSAGES")) {
            return true;
        } else return false;
	}

    run(msg, args) {
        const { num } = args;
        msg.channel.bulkDelete(num+1);
        return;
    }
};