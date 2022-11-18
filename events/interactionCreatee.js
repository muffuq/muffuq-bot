let hastebin = require('hastebin');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isButton()) return;
    if (interaction.customId == "open-ticket") {
      if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
        return interaction.reply({
          content: 'Zaten bir ticket oluşturdun',
          ephemeral: true
        });
      };

      interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
        parent: client.config.parentOpened,
        topic: interaction.user.id,
        permissionOverwrites: [{
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: client.config.roleSupport,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
        ],
        type: 'text',
      }).then(async c => {
        interaction.reply({
          content: `Ticket Oluşturuldu <#${c.id}>`,
          ephemeral: true
        });

        const embed = new client.discord.MessageEmbed()
          .setColor('6d6ee8')
          .setAuthor('Ticket', '')
          .setDescription('Seçim kategorisi')
          .setFooter('Developed by muffuq', '')
          .setTimestamp();

        const row = new client.discord.MessageActionRow()
          .addComponents(
            new client.discord.MessageSelectMenu()
            .setCustomId('category')
            .setPlaceholder('Ticket Kategorini seç')
            .addOptions([{
                label: 'Bug',
                value: 'bug',
                emoji: '🐞',
              },
              {
                label: 'Donate',
                value: 'donate',
                emoji: '💸',
              },
              {
                label: 'Şikayet',
                value: 'şikayet',
                emoji: '📬',
              },
              {
                label: 'Oyun İçi',
                value: 'oyuniçi',
                emoji: '🎮',
              },
            ]),
          );

        msg = await c.send({
          content: `<@!${interaction.user.id}>`,
          embeds: [embed],
          components: [row]
        });

        const collector = msg.createMessageComponentCollector({
          componentType: 'SELECT_MENU',
          time: 20000
        });

        collector.on('collect', i => {
          if (i.user.id === interaction.user.id) {
            if (msg.deletable) {
              msg.delete().then(async () => {
                const embed = new client.discord.MessageEmbed()
                  .setColor('6d6ee8')
                  .setAuthor('Ticket', '')
                  .setDescription(`<@!${interaction.user.id}> En Yakın Zamanda Yetkililer İlgilenecek`)
                  .setFooter('Developed by muffuq', '')
                  .setTimestamp();

                const row = new client.discord.MessageActionRow()
                  .addComponents(
                    new client.discord.MessageButton()
                    .setCustomId('close-ticket')
                    .setLabel('Ticketi kapat')
                    .setEmoji('899745362137477181')
                    .setStyle('DANGER'),
                  );

                const opened = await c.send({
                  content: `<@&${client.config.roleSupport}>`,
                  embeds: [embed],
                  components: [row]
                });

                opened.pin().then(() => {
                  opened.channel.bulkDelete(1);
                });
              });
            };
            if (i.values[0] == 'bug') {
              c.edit({
                parent: client.config.parentTransactions
              });
            };
            if (i.values[0] == 'oyuniçi') {
              c.edit({
                parent: client.config.parentgame
              });
            };
            if (i.values[0] == 'donate') {
              c.edit({
                parent: client.config.parentJeux
              });
            };
            if (i.values[0] == 'şikayet') {
              c.edit({
                parent: client.config.parentAutres
              });
            };
          };
        });

        collector.on('end', collected => {
          if (collected.size < 1) {
            c.send(`Kategori seçmedin ticketi kapatıyorum...`).then(() => {
              setTimeout(() => {
                if (c.deletable) {
                  c.delete();
                };
              }, 5000);
            });
          };
        });
      });
    };

    if (interaction.customId == "close-ticket") {
      const guild = client.guilds.cache.get(interaction.guildId);
      const chan = guild.channels.cache.get(interaction.channelId);

      const row = new client.discord.MessageActionRow()
        .addComponents(
          new client.discord.MessageButton()
          .setCustomId('confirm-close')
          .setLabel('Ticketi Kapat')
          .setStyle('DANGER'),
          new client.discord.MessageButton()
          .setCustomId('no')
          .setLabel('Ticketi kapatma')
          .setStyle('SECONDARY'),
        );

      const verif = await interaction.reply({
        content: 'Ticketı kapatmak istediğinizden emin misiniz?',
        components: [row]
      });

      const collector = interaction.channel.createMessageComponentCollector({
        componentType: 'BUTTON',
        time: 10000
      });

      collector.on('collect', i => {
        if (i.customId == 'confirm-close') {
          interaction.editReply({
            content: `Ticket kapatıldı. <@!${interaction.user.id}>`,
            components: []
          });

          chan.edit({
              name: `closed-${chan.name}`,
              permissionOverwrites: [
                {
                  id: client.users.cache.get(chan.topic),
                  deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                  id: client.config.roleSupport,
                  allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ['VIEW_CHANNEL'],
                },
              ],
            })
            .then(async () => {
              const embed = new client.discord.MessageEmbed()
                .setColor('6d6ee8')
                .setAuthor('Ticket', '')
                .setDescription('```Ticket Kontrolü```')
                .setFooter('Developed by muffuq', '')
                .setTimestamp();

              const row = new client.discord.MessageActionRow()
                .addComponents(
                  new client.discord.MessageButton()
                  .setCustomId('delete-ticket')
                  .setLabel('Ticketi Sil')
                  .setEmoji('🗑️')
                  .setStyle('DANGER'),
                );

              chan.send({
                embeds: [embed],
                components: [row]
              });
            });

          collector.stop();
        };
        if (i.customId == 'no') {
          interaction.editReply({
            content: 'Ticket silinmedi',
            components: []
          });
          collector.stop();
        };
      });

      collector.on('end', (i) => {
        if (i.size < 1) {
          interaction.editReply({
            content: 'Ticket silinmedi',
            components: []
          });
        };
      });
    };

    if (interaction.customId == "delete-ticket") {
      const guild = client.guilds.cache.get(interaction.guildId);
      const chan = guild.channels.cache.get(interaction.channelId);

      interaction.reply({
        content: 'Mesajlar Kaydediliyor...'
      });

      chan.messages.fetch().then(async (messages) => {
        let a = messages.filter(m => m.author.bot !== true).map(m =>
          `${new Date(m.createdTimestamp).toLocaleString('fr-FR')} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`
        ).reverse().join('\n');
        if (a.length < 1) a = "Nothing"
        hastebin.createPaste(a, {
            contentType: 'text/plain',
            server: 'https://hastebin.com/'
          }, {})
          .then(function (urlToPaste) {
            const embed = new client.discord.MessageEmbed()
              .setAuthor('Logs Ticket', '')
              .setDescription(`📰 Ticket Logu \`${chan.id}\` Tarafından Yaratıldı <@!${chan.topic}> Tarafından Silindi <@!${interaction.user.id}>\n\nLogs: [**Ticketları görmek için tıklayın**](${urlToPaste})`)
              .setColor('2f3136')
              .setTimestamp();

            const embed2 = new client.discord.MessageEmbed()
              .setAuthor('Logs Ticket', '')
              .setDescription(`📰 Ticket Geçmişleriniz \`${chan.id}\`: [**Ticketları görmek için tıklayın**](${urlToPaste})`)
              .setColor('2f3136')
              .setTimestamp();

            client.channels.cache.get(client.config.logsTicket).send({
              embeds: [embed]
            });
            client.users.cache.get(chan.topic).send({
              embeds: [embed2]
            }).catch(() => {console.log('I can\'t dm him :(')});
            chan.send('Kanal siliniyor...');

            setTimeout(() => {
              chan.delete();
            }, 5000);
          });
      });
    };
  },
  
};
