module.exports = {
    description: "Çalınan müziği değiştirir.",
    name: 'skip',
    options: [],
    voiceChannel: true,

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);
 
        if (!queue || !queue.playing){
            var embed = new client.discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("/skip kullanıldı")
            .setDescription("Şuanda müzik çalmıyor ❌")
            .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.reply({
                embeds: [embed]
              });
            return
        }

        queue.skip();

        var embed = new client.discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("/skip kullanıldı")
        .setDescription(`**${queue.current.title}** Şarkı geçildi ✅`)
        .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
        await interaction.reply({
            embeds: [embed]
          });
        return
    },
};
