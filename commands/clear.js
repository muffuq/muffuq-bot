// module.exports = {
//     description: "Müzik kuyruğunu temizler.",
//     name: 'clear',
//     options: [],
//     voiceChannel: true,

//     run: async (client, interaction) => {
//         const queue = client.player.getQueue(interaction.guild.id);

//         if (!queue || !queue.playing) return interaction.reply({ content: `Şuanda müzik çalmıyor. ❌`, ephemeral: true }).catch(e => { })

//         if (!queue.tracks[0]) return interaction.reply({ content: `Sırada müzik yok ❌`, ephemeral: true }).catch(e => { })

//         await queue.clear();

//         interaction.reply({ content: `Sıra temizlendi. 🗑️` }).catch(e => { })
//     },
// };

module.exports = {
    description: "Müzik sırasını temizler.",
    name: 'clear',
    options: [],
    voiceChannel: true,

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing){
            var embed = new client.discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("/clear kullanıldı")
            .setDescription("Şuanda müzik çalmıyor ❌")
            .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.reply({
                embeds: [embed]
              });
            return
        }

        if (!queue.tracks[0]){
            var embed = new client.discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("/clear kullanıldı")
            .setDescription("Sırada müzik yok ❌")
            .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.reply({
                embeds: [embed]
              });
            return
        }

        await queue.clear();
        var embed = new client.discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("/clear kullanıldı")
        .setDescription("Sıra temizlendi 🗑️")
        .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
        await interaction.reply({
            embeds: [embed]
          });
    },
};