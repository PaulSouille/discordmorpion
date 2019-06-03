const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config');
const Morpion = require('./Morpion');

bot.on('message', function (message) {
    if (message.content === '!reset') {
        Morpion.reset();
    }
})

bot.on('message', function (message) {
    if (message.content === '!play') {
        Morpion.play(message);
    }
})

bot.on('message', function (message) {
    if (message.content === '!display') {
        Morpion.display(message);
    }
})

bot.on('message', function (message) {
    if (message.content.startsWith('!set')) {
        let position = message.content.split(' ');
        position.shift();
        Morpion.insertPosition(position[0], message);
    }
})

bot.on('ready', () => {
    bot.user.setActivity('Gagner des LAN.');
})

bot.login(config.token.discord);