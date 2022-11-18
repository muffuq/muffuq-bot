// module.exports = {
//     description: "Şuanda çalan müziği durdurur..",
//     name: 'pause',
//     options: [],
//     voiceChannel: true,

//     run: async (client, interaction) => {
//         const queue = client.player.getQueue(interaction.guild.id);

//        if (!queue || !queue.playing) return interaction.reply({ content: `Şuanda müzik çalmıyor ❌`, ephemeral: true }).catch(e => { })

//         const success = queue.setPaused(true);

//         return interaction.reply({ content: success ? `Şu anda çalan müzik adı **${queue.current.title}** Durduruldu ✅` : `Bir şeyler ters gitti ❌` }).catch(e => { })
//     },
// };


module.exports = {
    description: "Şuanda çalan müziği durdurur..",
    name: 'pause',
    options: [],
    voiceChannel: true,

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

       if (!queue || !queue.playing){
        var embed = new client.discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("/pause kullanıldı")
        .setDescription("Şuanda müzik çalmıyor ❌")
        .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
        await interaction.reply({
            embeds: [embed]
          });
        return
    }

        queue.setPaused(true);
        
         var embed = new client.discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("/pause kullanıldı")
        .setDescription(`Durdurulan müzik: **${queue.current.title}**`)
        .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
        await interaction.reply({
            embeds: [embed]
          });
    },
};
