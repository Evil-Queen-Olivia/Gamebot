const update = false;

const giantbomb = require('giantbomb');
const gb = giantbomb('0eaca5252056e2d21c07db2b62036a89c47bc52d');
 
var { CommandoClient } = require('discord.js-commando');
var path = require('path');

var config = require('config.json')('./config.json');


var client = new CommandoClient({
    commandPrefix: '/',
    unknownCommandResponse: false,
    owner: [config.owner, config.owner2],
    disableEveryone: false
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['mod', 'Moderation']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('Logged in as ' + client.user.username + "!");
    if (update) {
        client.user.setStatus("dnd");
        client.user.setGame('Updating');
    } else {
        client.user.setGame('/help for help!', "https://www.twitch.tv/Spindlyskit");
    }
});

client.login(config.token);