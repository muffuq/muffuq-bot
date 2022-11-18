module.exports = {
    description: "Müziği çalmayı durdurur.",
    name: 'stop',
    options: [],
    voiceChannel: true,

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing){
            var embed = new client.discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("/stop kullanıldı")
            .setDescription("Şuanda müzik çalmıyor ❌")
            .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.reply({
                embeds: [embed]
              });
            return
        }

        queue.destroy();

        var embed = new client.discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("/stop kullanıldı")
        .setDescription("Müziği durdurdum görüşmek üzere :wave:")
        .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
        await interaction.reply({
            embeds: [embed]
          });
    },
};
