const Discord = require('discord.js');
const config = require('../config.js');
client = new Discord.Client();
exports.run = async (client, message, args) => {

    try {

        if (!message.member.roles.cache.has(config.sorumlu)) return message.reply(config.yetersizyetkimesaj);
        const piece = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        if (!piece) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir kullanıcı belirtmelisin. **Örnek: @Serhat**`).setFooter(config.footer).setColor("#3498DB").setTimestamp());
        if (!Serhat) return message.channel.send(new Discord.MessageEmbed().setDescription(`İsim belirtmelisin. **Örnek: Serhat**`).setFooter(config.footer).setColor("#3498DB").setTimestamp());
        if (!alchera) return message.channel.send(new Discord.MessageEmbed().setDescription(`Yaş belirtmelisin. **Örnek: 18**`).setFooter(config.footer).setColor("#3498DB").setTimestamp());

        message.channel.send(new Discord.MessageEmbed().setDescription(`**__Kayıt İşlemi Başarılı__**\n\n Kayıt Edilen Kişi: ${piece}\n Kayıt Yapan Yetkili: ${message.author}\n Kayıt İşleminde Verilen Rol: <@&${config.whrol}>\n Kayıt İşleminde Alınan Rol: <@&${config.kayitsiz}>`).setFooter(config.footer).setColor("#00dbff").setThumbnail(config.gif).setTimestamp())
        piece.setNickname(`IC ISIM`).catch(e => message.channel.send(`Benden Üstte Olduğu İçin İsmini Değiştiremedim.`))
        await piece.roles.add(config.whrol) //$erhat/18
        await piece.roles.remove(config.kayitsiz)
        client.channels.cache.get(config.kayitlog).send(new Discord.MessageEmbed()
        .setTitle("Kayıt Yapıldı")
        .setDescription(`\n Kayıt Edilen Kişi: ${piece}\n Kayıt Yapan Yetkili: ${message.author}\nKayıt işleminde verilen rol <@&${config.whrol}>`)
        .setColor("#00dbff")
        .setFooter(config.footer)
        .setThumbnail(config.gif)
        )
        message.guild.channels.cache.get(config.genelChat).send(config.genelchatmesaj)
    } catch (e) {
        message.channel.send(config.hatamesaj)
    }

};
exports.config = {
  name: "wl",
  guildOnly: true,
  aliases: ["wl"],
};
