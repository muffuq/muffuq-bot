const Discord = require('discord.js');
module.exports = {
    description: "Botun hızı hakkında bilgi almanıza yardımcı olur.",
    name: 'ping',
    options: [],

    run: async (client, interaction) => {
        const start = Date.now();
        interaction.reply('Ping!').then(async() => {
        let last = Date.now();
            const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(client.user.username + " - Ping!")
                .setThumbnail(client.user.displayAvatarURL())
                .addField(`Mesaj Ping`, `\`${Date.now() - start}ms\` 🛰️`)
                .addField(`API Gecikmesi`, `\`${Math.round(client.ws.ping)}ms\` 🛰️`)
                .setTimestamp()
                .setFooter({ text: 'Developed by muffuq', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
            interaction.editReply({ embeds: [embed] }).catch(e => { });
        })
    },
};
