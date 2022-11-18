module.exports = {
    description: "Önceki müziği tekrar çalar.",
    name: 'back',
    options: [],
    voiceChannel: true,

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing){
            var embed = new client.discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("/Back kullanıldı")
            .setDescription("Şuanda müzik çalmıyor ❌")
            .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.reply({
                embeds: [embed]
              });
            return
        }

        else if (!queue.previousTracks[1]){
            var embed = new client.discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("/Back kullanıldı")
            .setDescription("Daha önce çalan müzik yok ❌")
            .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.reply({
                embeds: [embed]
              });
            return
        }

        await queue.back();

        var embed = new client.discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("/Back kullanıldı")
        .setDescription("Önceki müzik çalmaya başladı...✅")
        .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
        await interaction.reply({
          embeds: [embed]
        });
    },
};