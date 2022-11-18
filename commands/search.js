const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    description: "Müzik aramaya yarar.",
    name: 'search',
    options: [{
        name: 'name',
        description: 'Çalmak istediğiniz müziğin adını yazın.',
        type: 'STRING',
        required: true
    }],
    voiceChannel: true,

    run: async (client, interaction) => {
        const name = interaction.options.getString('name')
if (!name) return interaction.reply({ content: `Lütfen geçerli bir şarkı adı girin. ❌`, ephemeral: true }).catch(e => { })

        const res = await client.player.search(name, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        });
        if (!res || !res.tracks.length) return interaction.reply({ content: `Arama Sonucu Bulunamadı. ❌`, ephemeral: true }).catch(e => { })

        const queue = await client.player.createQueue(interaction.guild, {
            leaveOnEnd: client.config.opt.voiceConfig.leaveOnEnd,
                autoSelfDeaf: client.config.opt.voiceConfig.autoSelfDeaf,
                metadata: interaction.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('BLUE');
        embed.setTitle(`Aranan Müzik "${name}"`);

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | \`${track.author}\``).join('\n')}\n\n Bir şarkı seçin **1** ile **${maxTracks.length}** arasında olmalı. İptal etmek için **iptal** yazabilirsin`)

        embed.setTimestamp();
        embed.setFooter({ text: 'Developed by muffuq', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        interaction.reply({ embeds: [embed] }).catch(e => { })

        const collector = interaction.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === interaction.user.id
        });

       collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel'){
                interaction.reply({ content: `İptal edildi ✅`, ephemeral: true }).catch(e => { }) 
            collector.stop();
            }
            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return interaction.reply({ content: `Hata: **1** ila ** arasında bir şarkı seçin${maxTracks.length}** ve gönder yazın veya **iptal** yazın ve seçimi iptal edin. ❌`, ephemeral: true }).catch(e => { })

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(interaction.member.voice.channel);
            } catch {
                await client.player.deleteQueue(interaction.guild.id);
                return interaction.reply({ content: `Ses kanalına katılamıyorum. ❌`, ephemeral: true }).catch(e => { })
            }

            await interaction.reply({ content: `Müzik aramanız yükleniyor. 🎧` }).catch(e => { })

            queue.addTrack(res.tracks[Number(query.content)-1]);
            if (!queue.playing) await queue.play();
           
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return interaction.reply({ content: `Şarkı arama süresi sona eriyor ❌`, ephemeral: true }).catch(e => { })
        });
    },
};
