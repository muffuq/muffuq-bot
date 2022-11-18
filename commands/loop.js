// const { QueueRepeatMode } = require('discord-player');
// const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
// module.exports = {
//     description: "Müzik döngüsü modunu açar veya kapatır.",
//     name: 'loop',
//     options: [],
//     voiceChannel: true,

//     run: async (client, interaction) => {
//         const queue = client.player.getQueue(interaction.guild.id);
// let cmds = client.db.get("loop"+interaction.user.id)
// if (!queue || !queue.playing) return interaction.reply({ content: `Şuanda müzik çalmıyor. ❌`, ephemeral: true }).catch(e => { })
// if(cmds) return interaction.reply({ content: `Burada zaten aktif bir komutunuz var. ❌`, ephemeral: true }).catch(e => { })

// await client.db.set("loop"+interaction.user.id, "loop")
// let button = new MessageActionRow().addComponents(
//     new MessageButton()
//     .setLabel("Loop")
//     .setStyle("SUCCESS")
//     .setCustomId("loop"))

//         const embed = new MessageEmbed()
//             .setColor("BLUE")
//             .setTitle('Loop System')
//             .setDescription(`**${queue.current.title}** Şuanda döngüye girdi.`)
//             .setTimestamp()
//             .setFooter({ text: 'Developed by muffuq', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
//         interaction.reply({ embeds: [embed], components:[button]}).then(async Message => {


//             const filter = i =>  i.user.id === interaction.user.id
//             let col = await interaction.channel.createMessageComponentCollector({filter, time: 60000 });
    
//             col.on('collect', async(button) => {
//             if(button.user.id !== interaction.user.id) return
            
//               switch (button.customId) {
//                 case 'loop':
//                     if (queue.repeatMode === 1) return interaction.reply({ content: `Önce mevcut müziğin döngü modunu devre dışı bırakmalısınız **(/loop)** ❌`, ephemeral: true }).catch(e => { })
//                     const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
//                      interaction.editReply({ content: success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**, Tüm dizi tekrarlanacak🔁` : `Bir şeyler ters gitti. ❌`}).catch(e => { }).catch(e => { });
//                     await button.deferUpdate();
//                 break
//             }
//             })
//             col.on('end', async(button) => {
//                 await client.db.delete("loop"+interaction.user.id)
//                  button = new MessageActionRow().addComponents(
//                     new MessageButton()
//                     .setStyle("SUCCESS")
//                     .setLabel("Loop It")
//                     .setCustomId("loop")
//                     .setDisabled(true))

//                     const embed = new MessageEmbed()
//                     .setColor("BLUE")
//                     .setTitle('Loop System - Ended')
//                     .setDescription(`Seçim yapma zamanınız geldi.`)
//                     .setTimestamp()
//                     .setFooter({ text: 'Developed by muffuq', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                      
//                 await interaction.editReply({embeds: [embed], components:[button]}).catch(e => { });
//             })
//         }).catch(e => { })
// }
// }


const { QueueRepeatMode } = require('discord-player');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    description: "Müzik döngüsü modunu açar veya kapatır.",
    name: 'loop',
    options: [],
    voiceChannel: true,

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);
let cmds = client.db.get("loop"+interaction.user.id)
if (!queue || !queue.playing){
    var embed = new client.discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("/loop kullanıldı")
    .setDescription("Şuanda müzik çalmıyor ❌")
    .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
    await interaction.reply({
        embeds: [embed]
      });
    return
}

if(cmds){
    var embed = new client.discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("/loop kullanıldı")
    .setDescription("Burada zaten aktif bir komutunuz var ❌")
    .setFooter({ text: 'Developed by muffuq', iconURL:interaction.user.displayAvatarURL({ dynamic: true }) });
    await interaction.reply({
        embeds: [embed]
      });
    return
}

await client.db.set("loop"+interaction.user.id, "loop")
let button = new MessageActionRow().addComponents(
    new MessageButton()
    .setLabel("Loop")
    .setStyle("SUCCESS")
    .setCustomId("loop"))

        var embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle('Loop System')
            .setDescription(`**${queue.current.title}** Şuanda döngüye girdi.`)
            .setTimestamp()
            .setFooter({ text: 'Developed by muffuq', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        interaction.reply({ embeds: [embed], components:[button]}).then(async Message => {


            const filter = i =>  i.user.id === interaction.user.id
            let col = await interaction.channel.createMessageComponentCollector({filter, time: 60000 });
    
            col.on('collect', async(button) => {
            if(button.user.id !== interaction.user.id) return
            
              switch (button.customId) {
                case 'loop':
                    if (queue.repeatMode === 1) return interaction.reply({ content: `Önce mevcut müziğin döngü modunu devre dışı bırakmalısınız **(/loop)** ❌`, ephemeral: true }).catch(e => { })
                    const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
                     interaction.editReply({ content: success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**, Tüm dizi tekrarlanacak🔁` : `Bir şeyler ters gitti. ❌`}).catch(e => { }).catch(e => { });
                    await button.deferUpdate();
                break
            }
            })
            col.on('end', async(button) => {
                await client.db.delete("loop"+interaction.user.id)
                 button = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setStyle("SUCCESS")
                    .setLabel("Loop It")
                    .setCustomId("loop")
                    .setDisabled(true))

                    var embed = new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle('Loop System - Ended')
                    .setDescription(`Seçim yapma zamanınız geldi.`)
                    .setTimestamp()
                    .setFooter({ text: 'Developed by muffuq', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                      
                await interaction.editReply({embeds: [embed], components:[button]}).catch(e => { });
            })
        }).catch(e => { })
}
}
