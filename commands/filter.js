// module.exports = {
//     description: "Devam eden müziğe ses filtresi ekler.",
//     name: 'filter',
//     options: [ {
//         name: 'filtre',
//         description: 'Uygulamak istediğiniz filtreyi yazın. (bassboost, 8D, nightcore)',
//         type: 'STRING',
//         required: true
//     }],
//     voiceChannel: true,

//     run: async (client, interaction) => {
//         const queue = client.player.getQueue(interaction.guild.id);

//    if (!queue || !queue.playing) return interaction.reply({ content: `Şuanda müzik çalmıyor. ❌`, ephemeral: true }).catch(e => { })
//    const filtre = interaction.options.getString('filtre')
//         const actualFilter = queue.getFiltersEnabled()[0];

//         if (!filtre) return interaction.reply({ content: `Lütfen geçerli bir filtre adı girin. ❌\n\`bassboost, 8D, nightcore\``, ephemeral: true }).catch(e => { })

//         const filters = [];
//         queue.getFiltersEnabled().map(x => filters.push(x));
//         queue.getFiltersDisabled().map(x => filters.push(x));

//         const filter = filters.find((x) => x.toLowerCase() === filtre.toLowerCase());

//         if (!filter) return interaction.reply({ content: `Adınıza uygun bir filtre bulamadım. ❌\n\`bassboost, 8D, nightcore\``, ephemeral: true }).catch(e => { })
//         const filtersUpdated = {};

//         filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

//         await queue.setFilters(filtersUpdated);

//         interaction.reply({ content: `Uygulanan Filtre: **${filter}**, Filtre Durumu: **${queue.getFiltersEnabled().includes(filter) ? 'Active' : 'Inactive'}** ✅\n **Unutmayın, müzik uzunsa filtre uygulama süresi buna göre uzayabilir.**` }).catch(e => { })
//     },
// };


module.exports = {
    description: "Devam eden müziğe ses filtresi ekler.",
    name: 'filter',
    options: [ {
        name: 'filtre',
        description: 'Uygulamak istediğiniz filtreyi yazın. (bassboost, 8D, nightcore)',
        type: 'STRING',
        required: true
    }],
    voiceChannel: true,

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

   if (!queue || !queue.playing){
    var embed = new client.discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("/filter kullanıldı")
    .setDescription("Şuanda müzik çalmıyor ❌")
    .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
    await interaction.reply({
        embeds: [embed]
      });
    return
}
   const filtre = interaction.options.getString('filtre')
        const actualFilter = queue.getFiltersEnabled()[0];

        if (!filtre){
            var embed = new client.discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("/filter kullanıldı")
            .setDescription(`Lütfen geçerli bir filtre adı girin. ❌\n\`bassboost, 8D, nightcore\``)
            .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.reply({
                embeds: [embed]
              });
            return
        }

        const filters = [];
        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === filtre.toLowerCase());

        if (!filter){
            var embed = new client.discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("/filter kullanıldı")
            .setDescription(`Adınıza uygun filte bulamadım. ❌\n\`bassboost, 8D, nightcore\``)
            .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.reply({
                embeds: [embed]
              });
            return
        }
        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);
        
        var embed = new client.discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("/filter kullanıldı")
        .setDescription(`**Uygulanan Filtre:** **${filter}** \n\`Unutmayın, müzik uzunsa filtre uygulama süresi buna göre uzayabilir.\``)
        .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
        await interaction.reply({
            embeds: [embed]
          });
    },
};