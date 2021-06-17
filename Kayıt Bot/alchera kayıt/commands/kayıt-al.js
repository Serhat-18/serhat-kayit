const Discord = require('discord.js');
const config = require('../config.js');
client = new Discord.Client();
exports.run = async (client, message, args) => {

    try {

        if (!message.member.roles.cache.has(config.sorumlu)) return message.reply(config.yetersizyetkimesaj); 
        const piece = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!piece) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir kullanıcı belirtmelisin. **Örnek: @Serhat**`).setFooter(config.footer).setColor("#3498DB").setTimestamp());
        message.channel.send(new Discord.MessageEmbed().setDescription(`**__Kayıt Alma İşlemi Başarılı__**\n\n Kaydı Alınan Kişi: ${piece}\n Kaydı Alan Yetkili: ${message.author}`).setFooter(config.footer).setColor("#f00505").setThumbnail(config.gif).setTimestamp())
        piece.setNickname(config.unregisterisim).catch(e => message.channel.send(`Benden Üstte Olduğu İçin İsmini Değiştiremedim.`))
        await piece.roles.remove(config.erkek) //$erhat/18
        await piece.roles.remove(config.kadın)
        await piece.roles.add(config.kayitsiz)
        client.channels.cache.get(config.kayitalmalog).send(new Discord.MessageEmbed()
        .setTitle("Kayıt Yapıldı")
        .setDescription(`\n Kaydı Alınan Kişi: ${piece}\n Kaydı Alan Yetkili: ${message.author}`)
        .setColor("#f00505")
        .setFooter(config.footer)
        .setThumbnail(config.gif)
        )
    } catch (e) {
        message.channel.send(config.hatamesaj)
    }

};
exports.config = {
  name: "kayıt-al",
  guildOnly: true,
  aliases: ["k.al","kal","unregister"],
};
