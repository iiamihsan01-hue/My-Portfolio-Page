require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('❌ Error: MONGODB_URI is undefined in .env file.');
    console.error('Current env variables:', Object.keys(process.env).filter(k => !k.startsWith('npm_')));
    process.exit(1);
}

console.log('Attempting to connect to MongoDB...');
// Mask password for safe logging
const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
console.log(`Connection String: ${maskedUri}`);

mongoose.connect(uri)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Error:');
        console.error(err.message);
        process.exit(1);
    });
