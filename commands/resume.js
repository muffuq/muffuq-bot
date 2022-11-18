module.exports = {
    description: "Duraklatılan müziği yeniden başlatır.",
        name: 'resume',
    options: [],
    voiceChannel: true,

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue){
            var embed = new client.discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("/resume kullanıldı")
            .setDescription("Şuanda müzik çalmıyor ❌")
            .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.reply({
                embeds: [embed]
              });
            return
        }

        queue.setPaused(false);

        var embed = new client.discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("/resume kullanıldı")
        .setDescription(`**${queue.current.title}** Şarkı çalmaya devam ediyor ✅`)
        .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
        await interaction.reply({
            embeds: [embed]
          });
        return
    },
};
