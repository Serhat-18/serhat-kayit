const Discord = require("discord.js")
const client = new Discord.Client();
const config = require("./config.js")
const moment = require('moment')
require("moment-duration-format")
  moment.locale("tr")
const fs = require("fs");                                        
require('./util/Loader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`${props.config.name} Komutu Sorunsuz Baslatildi`);
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {
      client.aliases.set(alias, props.config.name);
    });
  });                                                                     
});


client.on("ready", () => {
  client.channels.cache.get(config.seskanal).join();
});


client.on("message", message => {
  if (message.channel.type === "dm") {
    client.channels.cache.get(config.dmlog).send(new Discord.MessageEmbed()
    .setTitle("Dm-log!")
    .setDescription(`${message.author} Kişisi Özelden Mesaj Attı!`)
    .addField(`Gönderilen Mesaj`, message.content)
    .setFooter(config.footer)
    .setColor(`#00ffee`)
    .setThumbnail(message.author.avatarURL()));
  }
});


client.on("guildMemberAdd", member => {
  member.roles.add(config.otorol)
  client.channels.cache.get(config.otorollog).send(new Discord.MessageEmbed()
  .setTitle("Otorol Verildi!")
  .setColor("#00ff00")
  .setDescription(`${member} Adlı kullanıcıya <@&ROL_ID> rolü başarıyla verildi`)
  .setThumbnail(config.gif)
  .setFooter(config.otorolfooter)
  )
  })


  

client.login(config.token)
