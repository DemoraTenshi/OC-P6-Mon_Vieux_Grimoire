require('dotenv').config();
const fs = require('fs');
const CryptoJS = require('crypto-js');

const secretKey = ENCRYPTION_KEY;
const encryptedData = fs.readFileSync('.env.encrypted', 'utf8');

const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

const envContent = `
MONGODB_URI=${decryptedData.MONGODB_URI}
JWT_SECRET=${decryptedData.JWT_SECRET}
`;

fs.writeFileSync('.env', envContent);
console.log('.env file created with personalized values');