const maxVol = require("../config.js").opt.maxVol;

module.exports = {
    description: "Müziğin sesini ayarlar",
    name: 'volume',
    options: [{
        name: 'volume',
        description: 'Ses ayarı 100 den fazla yapmayınız',
        type: 'INTEGER',
        required: true
    }],
    voiceChannel: true,

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        var embed = new client.discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("/volume kullanıldı")
        .setDescription("Bu komut geçiçi süreliğine kapalıdr :wrench:")
        .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
        await interaction.reply({
            embeds: [embed]
          });
        return
       if (!queue || !queue.playing) return interaction.reply({ content: `Çalan müzik yok. ❌`, ephemeral: true }).catch(e => { })

        const vol = parseInt(interaction.options.getInteger('volume'));

        if (!vol) return interaction.reply({ content: `Mevcut Ses: **${queue.volume}** 🔊\n**ile ses seviyesini değiştirmek için \`1\` ile \`${maxVol}\` arasında bir sayı yazın.**`, ephemeral: true }).catch(e => { })

        if (queue.volume === vol) return interaction.reply({ content: `Değiştirmek istediğiniz ses düzeyi zaten mevcut ses düzeyidir ❌`, ephemeral: true }).catch(e => { })

        if (vol < 0 || vol > maxVol) return interaction.reply({ content: `**bir numara yaz\`1\` ile \`${maxVol}\` ses seviyesini değiştirmek için** ❌`, ephemeral: true }).catch(e => { })

        const success = queue.setVolume(vol);

        return interaction.reply({ content: success ? `Ses seviyesi değişti: **%${vol}**/**${maxVol}** 🔊` : `Bir şeyler ters gitti ❌` }).catch(e => { })
    },
};
