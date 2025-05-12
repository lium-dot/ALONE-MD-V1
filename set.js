const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSURsQWVhNVgyZlhiZmhjSzNnTWk5clNiWjA0ejg1ZnIwN3JzYnJOcDJYYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVm9xbUoxOENnVGdOS00xWVlOTktxT1VtaXVkc2l1ekRydlRCNlIvQThEYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZR0x1L1RyRjd0MHRKMk5jLzQzUllsV1NOUHA0V2EzbzlJZER4R1J3b1ZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrV0kvcCtNRWMveTNCOVd2MWpzc0F3M2dxQldDU1Zjb3c1OWF5Ri9nVWlVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1ISGtnMkpGek9yaXlXckZ6bWd3QVc4eStnSHVMVkZodlphZE5lUTZZMms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InV3OHljMjBnNXdtbGRTYTVsY3JHZlVTYjBGZmovQ2ptZEM4WEpueFFKM0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEZxakVjTzBQS0ZPcG9ad1pCZzRhRWNYT0x0ZVVuM00xWGdsQTRSRHNsdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSFMrL083SFVkalNKY3Y5ZWZ5VitPVEk4Rk93MjFHZUNuMFFDM2dEZVppST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjU4SnBVT0dBM0R6QVY2QzByK1ZHNmVyWUQ3dEY3eGx5OVBzdmNVbmZtMHhtSHU2SDJLNWtrcThMQmxNSUY5Vis1WFNBOExGdnl1SUUzRDU1SG1CYmhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzcsImFkdlNlY3JldEtleSI6InR3a2gwaUw2bFFSSTNTNnY4WVEyL3NVMk01aENyWWk3SGF0cStPRUtWbUE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IndLLVgxY2N5UXJPQVFuNi00X2NDd1EiLCJwaG9uZUlkIjoiMDMyMWY2Y2UtODEyZC00OWZmLWI2MjQtNjc0N2FjYjNkMjZkIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZFbTA4SFZBU1U4cUttUFBDVm5hbTY5SFBoND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZZVFYamlPOXVYT2V2Tzd5M0tLQ1ROWUtMOGM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVjNQUUM3Wk4iLCJtZSI6eyJpZCI6IjI1NDc1ODQ0MzExMTo3MEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1BZenNnRUVQRHFoc0VHR0JFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiV0dBOVhQQnFIZXNjaXc0M0dOcTI5dThTZVgzWENRN2phaXBWSTZOb0dYcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVTZUeGpFYjlCU0lhRVp2OEpUSmVNYlFqcGFDODJGQXdLM0xHRUYrT1ZsV2FBNjRkOFdIVmh4VXNIOGdYL3NTR0dqRk1EV2xDc0hqU2hwbnNzd09ZQUE9PSIsImRldmljZVNpZ25hdHVyZSI6InczZkpPRUZDQVl4RTVZS3VEQzlWeVRTSzJMcjRwZ1pmRUdrRFBkR3hmaGlyVklOOUZQT2lRaTRvSEhiWGdyd1dEcWhVckJYT0w1MkloQ2Vac2pDNmp3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzU4NDQzMTExOjcwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZoZ1BWendhaDNySElzT054amF0dmJ2RW5sOTF3a080Mm9xVlNPamFCbDcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDcwMzk2MTMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRGhRIn0=',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Toputech/ALONE-MD-V1',
    OWNER_NAME : process.env.OWNER_NAME || "🦂★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫🦂",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254758443111",  
    ANTI_LINK : process.env.ANTI_LINK || "yes",
    ANTI_BAD : process.env.ANTI_BAD || "yes",               
    AUTO_REPLY : process.env.AUTO_REPLY || "no",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',             
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "no",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'yes',              
    CHAT_BOT1: process.env.CHAT_BOT1 || "no",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    GCF: process.env.GROUP_CONTROL || 'no', 
    GREET : process.env.GREET || "yes",            
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || 'Ꭿℒℒℰℕ ℐЅ ᏇᎯTℂℋℐℕᎶ👀 ℐℕ ᎶℋᎾЅT ℳᎾⅅℰ👻,   
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
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL: process.env.ANTICALL || 'no',
                  ANTICALL_MSG: process.env.ANTICALL_MSG || 'Dont call i am busy🏆',
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
