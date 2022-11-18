const Discord = require('discord.js');
module.exports = {
    description: "Çalınan müziği dm kutusu aracılığıyla size gönderir ve kaydeder.",
    name: 'save',
    options: [],
    voiceChannel: true,

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

  if (!queue || !queue.playing) return interaction.reply({ content: `Şuanda müzik çalmıyor. ❌`, ephemeral: true }).catch(e => { })

  const embed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setTitle(client.user.username + " - Save Track")
  .setThumbnail(client.user.displayAvatarURL())
  .addField(`Track`, `\`${queue.current.title}\``)
  .addField(`Duration`, `\`${queue.current.duration}\``)
  .addField(`URL`, `${queue.current.url}`)
  .addField(`Saved Server`, `\`${interaction.guild.name}\``)
  .addField(`Requested By`, `${queue.current.requestedBy}`)
  .setTimestamp()
  .setFooter({ text: 'Developed by muffuq', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
  interaction.user.send({ embeds: [embed] }).then(() => {
    interaction.reply({ content: `Müziğin adını özel mesajla gönderdim. ✅`, ephemeral: true }).catch(e => { })
        }).catch(error => {
            interaction.reply({ content: `Sana mesaj gönderemiyorum ❌`, ephemeral: true }).catch(e => { })
        });
    },
};
