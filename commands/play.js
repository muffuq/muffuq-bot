const { QueryType } = require('discord-player');

module.exports = {
    description: "Yeni bir müzik başlatmanıza yardımcı olur.",
    name: 'play',
    options: [{
        name: 'musics',
        description: 'Spotify ve youtube linkleri',
        type: 'STRING',
        required: true
    }],
    voiceChannel: true,

    run: async (client, interaction) => {
        const name = interaction.options.getString('musics')
       if (!name){
        var embed = new client.discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("/play kullanıldı")
        .setDescription("Aramak istediğiniz müziğin adını yazın ❌")
        .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
        await interaction.reply({
            embeds: [embed]
          });
        return
    }

        const res = await client.player.search(name, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length){
            var embed = new client.discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("/play kullanıldı")
            .setDescription("Sonuç bulunamadı ❌")
            .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.reply({
                embeds: [embed]
              });
            return
        }


        const queue = await client.player.createQueue(interaction.guild, {
                leaveOnEnd: client.config.opt.voiceConfig.leaveOnEnd,
                autoSelfDeaf: client.config.opt.voiceConfig.autoSelfDeaf,
                metadata: interaction.channel
        });

     
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)
        } catch {
            await client.player.deleteQueue(interaction.guild.id);
            var embed = new client.discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("/play kullanıldı")
            .setDescription("Kanala katılamıyorum ❌")
            .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.reply({
                embeds: [embed]
              });
            return
        }
       
        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
        if (!queue.playing) await queue.play()

        const track = queue.current

        var embed = new client.discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Sıraya eklendi")
        .setDescription(`Müzik: **${track.title}**\n Zaman: **${track.duration}**\n Yayıncı: **${track.author}**`)
        .setThumbnail(track.thumbnail)
        .setFooter({ text: 'Developed by muffuq', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        interaction.reply({
            embeds: [embed]
          }); 
    },
};
