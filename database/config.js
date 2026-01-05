const axios = require('axios');

module.exports = {
  tokens: "8505227985:AAH3fRSx44v3YXtnnPV8MJBhNt18FjLCS28",  // Masukin Bot token kamu
  owners: "8216865539", // Masukin ID Telegram kamu
  port: "3126", // Masukin Port panel kamu 
  ipvps: "https://indictive.tech", // Masukin IP vps kamu atau domain panel kamu yg asalnya ( https://AiiSigma.id ) menjadi ( http://AiiSigma.id )

  // Bot Appearance & Settings (Move here for easier renaming/encrypted index.js)
  botSettings: {
    botName: "𝖨𝖭𝖣𝖨𝖢𝖳𝖨V𝖤 𝖢𝖮𝖱𝖤",
    startImage: 'https://files.catbox.moe/j5k0yy.jpg',
    footerText: "𝐒𝐢𝐗 ☊ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧",
    footerLink: "https://t.me/AiiSigma",

    // Poll Menu Settings
    pollTitle: '🌜 Pilih Menu yang Diinginkan',
    pollOptions: ['🔑 sᴇᴛᴛɪɴɢs ᴍᴇɴᴜ', '🔧 ᴏᴡɴᴇʀ ᴍᴇɴᴜ', '📊 sᴇssɪᴏɴ sᴛᴀᴛᴜs', '❌ ᴄᴀɴᴄᴇʟ'],

    // Devs / Links buttons
    buttons: [
      { text: 'ϟ', url: 'https://t.me/AiiSigma' },
      { text: '🍷', url: 'https://t.me/N3xithCore' }
    ]
  },

  // Dynamic Functions for Messages
  messages: {
    getStartCaption: (username, settings) => {
      // You can edit the HTML/style here
      return `<blockquote><b>${settings.botName}</b></blockquote>\nWelcome, @${username}\n\n<blockquote><a href="${settings.footerLink}">${settings.footerText}</a></blockquote>`;
    }
  }
};