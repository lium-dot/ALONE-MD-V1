const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia01MZTd2bnJBbmIxRDErck81QVVJaS9HaTZ2c1FoVll3bFQvdzIxc2UyST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiczErVlQ2Q1hoQjF2bU5XM2w4TXVWTDF3T2kyR1NHUHVoWktIeG5yYjR3Yz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwTVlrZU80TWRlVXY1eGFXL3NXREdZNGk3ZlRRc0xRcXB2eG5OaTlsa0hJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxWVdLVlVXRTZUYXk1WnRtcjFld3h3TDN5eXF4eFg2U1JJMzlKb1NWRVhvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVCek92bXhjMmNoRHFVcnVBN2dPdzFyNFJhd1pBV1N0R2w3SFFSY1hOVnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikh3Wk11cGljMkhrNkVvRHUxMlNwVExWNk5jL0lPV1NGeHF6cFliQzlxams9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0NFanFkZkVpekN0ak1VeitWd0h0aXZsTitjd0EvVHlqZERKSlRicTVVST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibG9ZY094T21reWZObGF5VVZHTmx4NjNSd1RidHlCYWZSVHZpTEx0cVVXQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii84dGJsUHpGd0c2bHlnNW1TN0Z1dFNnbUlaeVBuN0ZIM1Z1T3A5dzRvdmxwenU5cFJ0K01qVzdtWVV1b0RWYU5MNndCczMrbU1jVzd4WmR0SDZNempBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU1LCJhZHZTZWNyZXRLZXkiOiJPaXU3UEhUamZoZ0dHWUpjcXdKK0NzNTJLVGpmem1sdnpaV25HTXFZR1FVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJDQzVWWk01QyIsIm1lIjp7ImlkIjoiMjU0NzU4NDQzMTExOjE5QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTE3NDgwODI3NjU4MjUwOjE5QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTUxSOG9rRUVKbVB3TUVHR0FrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiOFI3QmdLeGJ2T043R25qU1ZYUmNOc0UzQ3pDRmwxaGdtZDU4T0drelJsYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiV1h1TUxwREFiRGpRbmxUd1pwT29oV0cydm5EcFU5bU5jRm9rckY5ZXF0UE5OMWpPcFg5bGhWSnlXRCtPa1owQzNxOUwydEV0RTJubFI4UHVyRGdiQVE9PSIsImRldmljZVNpZ25hdHVyZSI6IlgyWUFmM1BzZ0VRZWFNbEJiSkVia2dEak9Ia2NJRmZpYXJ5MkIzZS9Gc2RxWU1TQTNIWHRwWGQ4L21YdXVxYnRZbXo2cEgrWXhtTDY4ejJHOEZuUGdBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzU4NDQzMTExOjE5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZFZXdZQ3NXN3pqZXhwNDBsVjBYRGJCTndzd2haZFlZSm5lZkRocE0wWlgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0Nzk3ODE1MiwibGFzdFByb3BIYXNoIjoiMlY3N3FVIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMODcifQ==',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Toputech/ALONE-MD-V1',
    OWNER_NAME : process.env.OWNER_NAME || "MR ΛĿĿƐИ",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254758443111",  
    ANTI_LINK : process.env.ANTI_LINK || "no",
    ANTI_BAD : process.env.ANTI_BAD || "yes",               
    AUTO_REPLY : process.env.AUTO_REPLY || "no",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',             
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "no",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'yes',              
    CHAT_BOT1: process.env.CHAT_BOT1 || "no",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    GCF: process.env.GROUP_CONTROL || 'no', 
    GREET : process.env.GREET || "yes",            
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "Ꭿℒℒℰℕ ℐЅ ᏇᎯTℂℋℐℕᎶ👀 ℐℕ ᎶℋᎾЅT ℳᎾⅅℰ👻",   
    AUTOBIO: process.env.AUTOBIO || 'no',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'no',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaeRrcnADTOKzivM0S1r",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaeRrcnADTOKzivM0S1r",
    CAPTION : process.env.CAPTION || "ᴘσωєʀє∂ ву ★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫",
    BOT : process.env.BOT_NAME || 'ALONE_MD',
    URL : process.env.BOT_MENU_LINKS || "https://i.ibb.co/h0Sw13b/file-1285.jpg",
    MODE: process.env.PUBLIC_MODE || "no",              
    TZ: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '4' ,
    ETAT : process.env.PRESENCE || 'online',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',
                  ANTICALL_MSG: process.env.ANTICALL_MSG || '★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫ ĪS ΛŦ ßƐΛSŦ MᎾDƐ ŔĪƓĤŦ ИᎾᏯ ƇΛИŦ ŔƐƇĪƐ√Ɛ YᎾƱŔ ƇΛĿĿ 📞📵 ',
    CHATBOT : process.env.CHATBOT || 'no',  
       URL: process.env.URL || "https://files.catbox.moe/522t4u.jpg",  
              
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
