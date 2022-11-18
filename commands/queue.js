const { MessageEmbed } = require('discord.js');

module.exports = {
    description: "Size çalma listesini gösterir.",
    name: 'queue',
    options: [],
    voiceChannel: true,

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

 
        if (!queue || !queue.playing){
            var embed = new client.discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("/queue kullanıldı")
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
            .setAuthor("/queue kullanıldı")
            .setDescription("Bundan sonra müzik yok ❌")
            .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.reply({
                embeds: [embed]
              });
            return
        }


        var embed = new MessageEmbed();
        const methods = ['🔁', '🔂'];

        embed.setColor('BLUE');
        embed.setThumbnail(interaction.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setTitle(`Server Music List - ${interaction.guild.name} ${methods[queue.repeatMode]}`);

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (Müziği açan <@${track. requestedBy.id}>)`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `ve **${songs - 5}** Sıradaki müzik...` : `**${songs}** Listedeki Şarkılar.`;

        embed.setDescription(`Şuanda çalan: \`${queue.current.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs }`);

        embed.setTimestamp();
        embed.setFooter({text: 'Developed by muffuq', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        interaction.reply({ embeds: [embed] }).catch(e => { })
    },
};
