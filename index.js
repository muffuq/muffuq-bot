const { Player } = require('discord-player');
const fs = require('fs');
const {
  Client,
  Collection,
  Intents
} = require('discord.js');
const config = require('./config');

let client = new Client({
  intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES
  ]
});


// Giriş çıkış logu-----------------
client.on('guildMemberAdd', guildMember => {
    var godaid = client.channels.cache.get(client.config.girislog)
    var embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Giriş Log:')
        .setDescription(`**Sunucuya girdi: <@${guildMember.user.id}>**`)
        .setFooter(client.config.footerText, client.user.avatarURL())
        godaid.send({
            embeds: [embed]
          });

});

client.on('guildMemberRemove', guildMember => {
    var godaid = client.channels.cache.get(client.config.cikislog)
    var embed = new client.discord.MessageEmbed()
        .setColor('RED')
        .setAuthor('Çıkış Log:')
        .setDescription(`**Sunucudan Çıktı: <@${guildMember.user.id}>**`)
        .setFooter(client.config.footerText, client.user.avatarURL())
        godaid.send({
            embeds: [embed]
          });
});
// Giriş çıkış logu bitiş --------------


client.db = require("orio.db")
client.db.deleteAll()
const Discord = require('discord.js');
client.discord = Discord;
client.config = require('./config');
client.player = new Player(client, client.config.opt.discordPlayer);
const player = client.player

const synchronizeSlashCommands = require('discord-sync-commands-v14');

client.commands = new Collection();
fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, {
            name: commandName,
            ...props
        });
        console.log(`👌 Yüklendi slash komutu: ${commandName}`);
    });
    synchronizeSlashCommands(client, client.commands.map((c) => ({
        name: c.name,
        description: c.description,
        options: c.options,
        type: 'CHAT_INPUT'
    })), {
        debug: false
    });
});


fs.readdir("./events", (_err, files) => {
  files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      console.log(`👌 Event Yüklendi:  ${eventName}`);
      client.on(event.name, (...args) => event.execute(...args, client));
      delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  
  if(!interaction.guild) return

  if (interaction.isCommand()){

  const cmd = client.commands.get(interaction.commandName);

  if (!cmd) return void interaction.reply({
      content: `Komut \`${interaction.commandName}\` Bulunamadı`,
      ephemeral: true
  })

  const DJ = client.config.opt.DJ;

  if (cmd && DJ.enabled && DJ.commands.includes(interaction.commandName)) {
      const roleDJ = interaction.guild.roles.cache.find(x => x.name === DJ.roleName)
      if(!interaction.member.permissions.has("MANAGE_GUILD")){
          if(!interaction.member.roles.cache.has(roleDJ?.id)){

          const embed = new MessageEmbed()
          .setColor('BLUE')
          .setTitle(client.user.username)
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription("Bu bottaki bazı müzik komutlarını kullanmak için sunucunuzda **DJ** adlı bir rol oluşturmalı ve sahip olmalısınız. Bu role sahip olmayan kullanıcılar, "+client.config.opt.DJ.commands.map(astra => '`'+astra+'`').join(", "))
          .setTimestamp()
          .setFooter({ text: 'Developed by muffuq', iconURL:int.user.displayAvatarURL({ dynamic: true }) });
          return interaction.reply({ content: `${interaction.user}`, embeds: [embed], ephemeral: true}).catch(e => { })
      }
  }
  }

  if (cmd && cmd.voiceChannel) {
      if (!interaction.member.voice.channel) return interaction.reply({ content: `Bir ses kanalına bağlı değilsiniz. ❌`, ephemeral: true});
      if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ content: `You are not on the same audio channel as me. ❌`, ephemeral: true});
  }

  cmd.run(client, interaction)
  }

  if (interaction.isButton()){
      const queue = client.player.getQueue(int.guildId);
  switch (interaction.customId) {
      case 'saveTrack': {
     if (!queue || !queue.playing){
     return interaction.reply({ content: `Şu anda çalan müzik yok. ❌`, ephemeral: true, components: [] });
     } else {
        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(client.user.username + "- Parçayı Kaydet")
        .setThumbnail(client.user.displayAvatarURL())
        .addField(`Parça`, `\`${queue.current.title}\``)
        .addField(`Süre`, `\`${queue.current.duration}\``)
        .addField(`Link`, `${queue.current.url}`)
        .addField(`Kayıtlı Sunucu`, `\`${interaction.guild.name}\``)
        .addField(`Açan`, `${queue.current.requestedBy}`)
        .setTimestamp()
        .setFooter({ text: 'Developed by muffuq', iconURL: int.user.displayAvatarURL({ dynamic: true }) });
        interaction.member.send({ embeds: [embed] }).then(() => {
              return interaction.reply({ content: `Müziğin adını özel mesajla gönderdim ✅`, ephemeral: true}).catch(e => { })
          }).catch(error => {
              return interaction.reply({ content: `Sana özel mesaj gönderemiyorum. ❌`, ephemeral: true}).catch(e => { })
          });
      }
  }
      break
      case 'time': {
          if (!queue || !queue.playing){
              return interaction.reply({ content: `Şu anda çalan müzik yok. ❌`, ephemeral: true, components: [] });
              } else {

          const progress = queue.createProgressBar();
          const timestamp = queue.getPlayerTimestamp();
  
          if (timestamp.progress == 'Infinity') return interaction.message.edit({ content: `Bu şarkı canlı yayında, görüntülenecek süre verisi yok. 🎧` }).catch(e => { })
  
          const embed = new MessageEmbed()
          .setColor('BLUE')
          .setTitle(queue.current.title)
          .setThumbnail(client.user.displayAvatarURL())
          .setTimestamp()
          .setDescription(`${progress} (**${timestamp.progress}**%)`)
          .setFooter({ text: 'Developed by muffuq', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
          interaction.message.edit({ embeds: [embed] }).catch(e => { })
          interaction.reply({ content: `**✅ Başarılı:** Zaman verileri güncellendi. `, ephemeral: true}).catch(e => { })
      }
  }
  }
  };
});


player.on('trackStart', (queue, track, interaction) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
});

player.on('trackAdd', (queue, track, interaction) => {
});

player.on('channelEmpty', (queue) => {
    queue.destroy();
});

player.on('queueEnd', (queue) => {
    if(client.config.opt.voiceConfig.leaveOnTimer.status === true) {
        setTimeout(() => {
            if(queue.connection) queue.connection.disconnect();
            queue.destroy();
        }, client.config.opt.voiceConfig.leaveOnTimer.time);
    }
});


client.login(require('./config').token);