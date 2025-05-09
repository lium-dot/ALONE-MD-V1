const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUpERmVSZWJtRjArVXB3bWRQWFRXRTdxMU5RL3NSS1RSM1czak1vNTJIRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU3pHaUtCOWh6dHFZekpGeEJBUDIzTHhjNW5SNTlGclFnQzFSQ0xXcnhRYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1R0xmSE9DL1NaZ3ZvQnZHQ2txN0VET2hkMmFpaEdWV2NOY0xlTDd4QTBjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIdG1SZlNVQjFLNFZIWUx6OUxYMzFCMjlwOXh1aTh5TzluUGxEa1RadFhRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBEWVBoVjNsc0RPdnFnaDdXN0hqTi9lTnlrdW9leHJPS1QrdWV6Z1ZDbVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjUzUFgzWE1yZU9ONEIyQWVyNTFDV3cvSU5LRDVETUI0U3REQkgxZ3loaG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE1kV0x2SzdRQThCb0JNV2lZTEVoTktMTGt6M1NNMXNNNytvcXMxL0dXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaTdLeUNWRFNmd2p3empGdnpsTkdhUC8rWk56RDVGVEF4eUNYYkUrNGcxcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkR0UzhZK085dlRvWHpHZDFwUnZtYytYQzVCaEw2UzVtUDZzdUxOQjlVaDZNWlZjK2VhYTJsMnlKcnFWWGdiVFJDQ25UdmM5OGJnT0tZSkxDRFZQM0J3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk4LCJhZHZTZWNyZXRLZXkiOiJsYjZXQkdIbFNBRlBTQ3YzQndqQUtjYk55aVdDaHFIUFBnRzEzc0hYQ2FnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJYZ0pkMGlLX1NxYW4yMGxYWldfMHBnIiwicGhvbmVJZCI6IjQyYTFmNDBmLTJhNmEtNDA1Mi1iOTAzLTJlNzcxY2FiODQxNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmZHNpSHdZa2RzWFBIU21DM00ySFNhYnl3WGs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK2Z4Yk5lZ1dOdmF2RGZ1Z285TWhpUHIvREVZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkNKWlpHVFZQIiwibWUiOnsiaWQiOiIyNTQ3NTg0NDMxMTE6MjdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ltbW9NOENFSTNpOXNBR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ikd5RVlodVpNYUhtbnJPUVJEL1NIOEwwWVFmM2RoVzRJNFNya3AyTlRQa009IiwiYWNjb3VudFNpZ25hdHVyZSI6IkRwWkhSTkZuOWxtcXlHb0xIV0E4aDJCU3g1cDNKRTVpUmFLYVljc1hMWkdCUGNKSkdEQ29IczVkWEhmRURxbTBGbDQ1bnF5azU3cUt4T3NwZEJIaUF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiIwZnI3Y211aVRVQ2d6WjB2eE96OWc4VW1sdENSaWNGSWloNFcxeWR1ZUNyUS9pdVJkeWxhM3d3Q0hSbEYyeDRvc2t1ZUZKMG9EU3M5TGIxS1pFeTFDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1ODQ0MzExMToyN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSc2hHSWJtVEdoNXA2emtFUS8waC9DOUdFSDkzWVZ1Q09FcTVLZGpVejVEIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ2Nzc2MzQ3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUNubCJ9',
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
