const Discord = require('discord.js');
const config = require('../config.js');
client = new Discord.Client();

exports.run = async (client, message, args) => {

    try {
        if (!message.member.roles.cache.has(config.sorumlu)) return message.reply(config.yetkimesaj); 
        const piece = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        message.channel.send(new Discord.MessageEmbed()
        .setTitle("Ceza Kaldırıldı")
        .setDescription(`**${piece}** Adlı kişinin cezası **${message.author}** tarafından başarıyla kaldırıldı\nKaldırılan ceza: **<@&${config.cezali}>**`)
        .setFooter(config.cezafooter)
        .setColor("#ff0000")
        .setThumbnail(config.gif)
        )
        client.channels.cache.get(config.cezakaldirmalog).send(new Discord.MessageEmbed()
        .setTitle("Ceza Kaldırıldı")
        .setDescription(`Bir üyenin cezası kaldırıldı\nCezası kaldırılan kişi:${piece}\nCezayı kaldıran yetkili: ${message.author}\nKaldırılan ceza: <@&${config.cezali}>`)
        .setFooter(config.cezafooter)
        .setColor("#ff0000")
        .setThumbnail(config.gif)
        )
        await piece.roles.add(config.kayitsiz) //Made By $erhat/18
        await piece.roles.remove(config.cezali)
    } catch (e) {
        message.channel.send(config.hatamesaj)
    }

};
exports.config = {
  name: "süphekaldir",
  guildOnly: true,
  aliases: ["süphekaldir","cezakaldir","ck"],
};
