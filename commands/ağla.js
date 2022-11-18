// const {
//     SlashCommandBuilder
//   } = require('@discordjs/builders');
  
//   module.exports = {
//     data: new SlashCommandBuilder()
//       .setName('ağla')
//       .setDescription('Botu ağlatır :('),
//     async execute(interaction, client) {
//       const embed = new client.discord.MessageEmbed()
//       .setColor("RANDOM")
//       .setAuthor("Botumu neden ağlatıyorsun ??")
//       .setImage(`https://media3.giphy.com/media/2rtQMJvhzOnRe/giphy.gif?cid=790b76115d398a482f6177556b32d70a&rid=giphy.gif`)
//       await interaction.reply({
//         embeds: [embed]
//       });
//     },
//   };

module.exports = {
    description: "Botu ağlatır",
    name: "ağla",
    options: [],
    run: async (client, interaction) => {
      const embed = new client.discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor("Botumu neden ağlatıyorsun ??")
      .setImage(`https://media3.giphy.com/media/2rtQMJvhzOnRe/giphy.gif?cid=790b76115d398a482f6177556b32d70a&rid=giphy.gif`)
      await interaction.reply({
        embeds: [embed]
      });
    },
};