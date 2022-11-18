module.exports = {
  clientId: "976488278272380989",

  status: "Çok işlevli mutfak robotuyum",

  girislog: "977436300833615903",

  cikislog: "977436300833615903",


  parentOpened: "976506101933694986",
  parentTransactions: "976506414535176242",
  parentJeux: "976506538074202162",
  parentgame: "976506487176323175",
  parentAutres: "976506593648713738",


  roleSupport: "975778909599711254",

  
  logsTicket: "976506210947858522",
  ticketChannel: "976500787553378354",

  footerText: "Developed by muffuq",

  token: "",

  opt: {
    DJ: {
        enabled: false, //IF YOU WANT ONLY DJS TO USE IT, set false to true.
        roleName: 'DJ', //WRITE WHAT THE NAME OF THE DJ ROLE WILL BE, THEY CAN USE IT ON YOUR SERVER
        commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume'] //Please don't touch
    },
        
    voiceConfig: {
        leaveOnEnd: false, //If this variable is "true", the bot will leave the channel the music ends.
        autoSelfDeaf: false, //IF YOU WANT TO DEAF THE BOT, set false to true.

        leaveOnTimer:{ //The leaveOnEnd variable must be "false" to use this system.
            status: true, //If this variable is "true", the bot will leave the channel when the bot is offline.
            time: 100000, //1000 = 1 second
        }
    }, 

    maxVol: 100, //You can specify the maximum volume level.
    loopMessage: false,

    discordPlayer: {
        ytdlOptions: {
            quality: 'highestaudio', //Please don't touch
            highWaterMark: 1 << 25 //Please don't touch
        }
        }
    }
}
