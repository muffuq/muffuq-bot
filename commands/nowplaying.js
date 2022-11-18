const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    description: "Çalınan müzik hakkında bilgi verir.",
    name: 'nowplaying',
    options: [],
    voiceChannel: true,

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

 if (!queue || !queue.playing){
    var embed = new client.discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("/nowplaying kullanıldı")
    .setDescription("Şuanda müzik çalmıyor ❌")
    .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
    await interaction.reply({
        embeds: [embed]
      });
    return
}

        const track = queue.current;

        var embed = new MessageEmbed();

        embed.setColor('BLUE');
        embed.setThumbnail(track.thumbnail);
        embed.setTitle(track.title)

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;

        embed.setDescription(`Ses: **%${queue.volume}**\nZaman: **${trackDuration}**\nLink: ${track.url}\nLoop: **${methods[queue.repeatMode]}**\n${track. requestedBy}`);

        embed.setTimestamp();
        embed.setFooter({ text: 'Developed by muffuq', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        const saveButton = new MessageButton();

        saveButton.setLabel('Kaydet');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(saveButton);

        interaction.reply({ embeds: [embed], components: [row] }).catch(e => { })
    },
};
