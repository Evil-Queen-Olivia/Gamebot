const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'mod',
            memberName: 'mute',
            description: 'Mutes the target user.',
            examples: ['mute @User!', 'mute @User 10'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to mute?',
                    type: 'user',
                },
                {
                    key: 'time',
                    prompt: 'How long should they be muted for?',
                    type: 'integer',
                    default: ''
                }
            ]
        });    
    }
    
    hasPermission(msg) {
        if (msg.channel.type === "dm") return "This command can't be used in dms!";
        if (this.client.isOwner(msg.author)) { return true; } else if(msg.member.hasPermission("MANAGE_ROLES") && msg.member.hasPermission("MUTE_MEMBERS")) { return true; } else {return false;}
	}

    run(msg, args) {
        const { user, time } = args;
        if (!time) {
            var mem;
            msg.guild.fetchMember(user).then(guildMember => {
                mem = guildMember;
                if (mem.roles.has("331079629559300097")) return msg.say(user.toString() + " is already muted!");
                mem.addRole("331079629559300097");
                return msg.say('muted ' + user.toString() + "!");
                
            });
        } else {
            var mem;
            msg.guild.fetchMember(user).then(guildMember => {
            mem = guildMember;
            if (mem.roles.has("331079629559300097")) return msg.say(user.toString() + " is already muted!");
            mem.addRole("331079629559300097");
            setTimeout(function(){ mem.removeRole("331079629559300097"); }, time * 60000);
            return msg.say('muted ' + user.toString() + " for " + time + " minutes!");
         });
        }
        
    }
}