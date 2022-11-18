const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    description: "Müziğin hangi dakikasında çaldığınızı gösterir.",
    name: 'time',
    options: [],
    voiceChannel: true,
    run: async (client, interaction) => {

        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing){
            var embed = new client.discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("/time kullanıldı")
            .setDescription("Şuanda müzik çalmıyor ❌")
            .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.reply({
                embeds: [embed]
              });
            return
        }

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity'){
            var embed = new client.discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("/time kullanıldı")
            .setDescription("Bu şarkı canlı yayında gösterilecek zaman yok...")
            .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.reply({
                embeds: [embed]
              });
            return
            }    

        const saveButton = new MessageButton();

        saveButton.setCustomId('time');
        saveButton.setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(saveButton);

        var embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(queue.current.title)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(`${progress} (**${timestamp.progress}**%)`)
        .setFooter({ text: 'Developed by muffuq', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
        interaction.reply({ embeds: [embed], components: [row]}).catch(e => { })
    },
};
