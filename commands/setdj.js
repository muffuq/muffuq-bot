const { MessageEmbed } = require('discord.js');

module.exports = {
    description: "DJ rolü hakkında bilgi almanızı sağlar.",
    name: 'setdj',
    options: [],

    run: async (client, interaction) => {
        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(client.user.username)
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription("Bu bottaki bazı müzik komutlarını kullanmak için sunucunuzda **DJ** adlı bir rol oluşturmalı ve sahip olmalısınız. Bu role sahip olmayan kullanıcılar, "+client.config.opt.DJ.commands.map(astra => '`/'+astra+'`').join(", "))
        .setTimestamp()
        .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
        interaction.reply({ embeds: [embed] }).catch(e => { })
    },
};
