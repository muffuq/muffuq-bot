const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
    description: "Bot'un istatistikleri hakkında bilgi sağlar.",
    name: 'stats',
    options: [],
    run: async (client, interaction) => {

        let button = new MessageActionRow().addComponents(
            new MessageButton()
            .setStyle("SUCCESS")
            .setLabel("Update")
            .setCustomId("rel"),
            new MessageButton()
            .setStyle("DANGER")
            .setLabel("Delete")
            .setCustomId("del"))
            
                let embed = new MessageEmbed()
                .setColor("BLUE")
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL())
                .setTitle(client.user.username)
                .setFooter({ text: 'Develop by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`> **Sunucu: \`${client.guilds.cache.size}\`**
> **Kullanıcılar: \`${Math.ceil(client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString("tr-TR"))}.000\`**
> **Kanallar: \`${client.channels.cache.size}\`**`)
                interaction.reply({embeds:[embed], components:[button]}).then(async Message => {
                    
                    const filter = i =>  i.user.id === interaction.user.id
                    let col = await interaction.channel.createMessageComponentCollector({filter, time: 180000 });
            
                    col.on('collect', async(button) => {
                    if(button.user.id !== interaction.user.id) return
                    
                      switch (button.customId) {
                        case 'rel':
                              const embedd = new MessageEmbed()
                        .setColor("BLUE")
                        .setTimestamp()
                        .setThumbnail(client.user.displayAvatarURL())
                        .setTitle(client.user.username)
                        .setFooter({ text: 'Develop by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription(`> **Sunucu: \`${client.guilds.cache.size}\`**
> **Kullanıcılar: \`${Math.ceil(client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString("tr-TR"))}.000\`**
> **Kanallar: \`${client.channels.cache.size}\`**`)
                              
                        await interaction.editReply({embeds: [embedd]}).catch(e => { });
                        button.reply({content: "> **✅ Başarı:** Bot istatistikleri güncellendi!", ephemeral: true}).catch(e => { });
            
                        break
                        case 'del':
                        col.stop(true)
                        await interaction.deleteReply().catch(e => { });
                        button.reply({content: "> **✅ Başarı:** Bot istatistikleri silindi!", ephemeral: true}).catch(e => { });
                        break
            
                      }
                    })
                    col.on('end', async(button) => {

                         button = new MessageActionRow().addComponents(
                            new MessageButton()
                            .setStyle("SUCCESS")
                            .setLabel("Update")
                            .setCustomId("rel")
                            .setDisabled(true),
                            new MessageButton()
                            .setStyle("DANGER")
                            .setLabel("Delete")
                            .setCustomId("del")
                            .setDisabled(true))

                        const embedd = new MessageEmbed()
                        .setColor("BLUE")
                        .setTimestamp()
                        .setThumbnail(client.user.displayAvatarURL())
                        .setTitle(client.user.username + "Komut Süresi Sona Erdi")
                        .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription(`> **sunucu: \`${client.guilds.cache.size}\`**
> **Kullanıcılar: \`${Math.ceil(client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString("tr-TR"))}.000\`**
> **Kanallar: \`${client.channels.cache.size}\`**`)
                              
                        await interaction.editReply({embeds: [embedd], components:[button]}).catch(e => { });
                    })
                }).catch(e => { });
    },
};
