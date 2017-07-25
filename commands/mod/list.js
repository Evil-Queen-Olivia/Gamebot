const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'verify',
            group: 'mod',
            memberName: 'verify',
            description: 'Adds the verified role to the person you mention.',
            examples: ['verify @User!'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to add the verified role to?',
                    type: 'user'
                }
            ]
        });    
    }
    
    hasPermission(msg) {
        if (msg.channel.type === "dm") return "This command can't be used in dms!";
		return true;
	}

    run(msg, args) {
        const { user } = args;
        if (this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_ROLES")) {
            
            var mem;
            msg.guild.fetchMember(user).then(guildMember => {
                mem = guildMember;
                if (mem.roles.has("331067830805987328")) return msg.say(user.toString() + " is already verified!");
                mem.addRole("331067830805987328");
                return msg.say('Verified ' + user.toString() + "!");
                
            });
        } else return msg.say('You cannot add the verified role to users!');
        
    }
};