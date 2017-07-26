const { RichEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'announce',
            group: 'mod',
            memberName: 'announce',
            description: 'Announces the text you say.',
            examples: ['announce Hi there!'],
            args: [
                {
                    key: 'channel',
                    prompt: 'channel to announce everyone',
                    type: 'channel'
                },
                {
                    key: 'ping',
                    prompt: 'Mention everyone?',
                    type: 'boolean'
                },
                {
                    key: 'text',
                    prompt: 'Text to say',
                    type: 'string'
                }
            ]
        });    
    }
    
    hasPermission(msg) {
        if (msg.channel.type === "dm") return false;
		if (this.client.isOwner(msg.author) || msg.member.hasPermission("METION_EVERYONE")) {
            return true;
        } else return false;
	}

    run(msg, args) {
    const { channel, ping, text } = args;
    const embed = new RichEmbed()
        .setDescription(text)
        .setAuthor(msg.author.username, msg.author.displayAvatarURL)
        .setColor(msg.member.displayColor)
        .setTimestamp();
    
    var tchannel = msg.guild.channels.find('id', channel.id);

    if (ping) {
        tchannel.send("@everyone");
    }

    return tchannel.sendEmbed(embed);

    }
};