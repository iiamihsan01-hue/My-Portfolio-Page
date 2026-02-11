const path = require('path');
const dotenv = require('dotenv');

// Explicitly specify the path to .env to be sure
const envPath = path.resolve(__dirname, '../.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error('Error loading .env file:', result.error);
} else {
    console.log('.env file loaded successfully.');
}

console.log('Environment keys:', Object.keys(process.env).filter(key => !key.startsWith('npm_') && !key.startsWith('Program')));
console.log('MONGODB_URI is:', process.env.MONGODB_URI ? 'DEFINED' : 'UNDEFINED');

if (process.env.MONGODB_URI) {
    const mongoose = require('mongoose');
    const uri = process.env.MONGODB_URI;
    console.log(`Connection String (masked): ${uri.replace(/:([^:@]+)@/, ':****@')}`);

    mongoose.connect(uri)
        .then(() => {
            console.log('✅ MongoDB Connected Successfully!');
            process.exit(0);
        })
        .catch(err => {
            console.error('❌ MongoDB Connection Error:', err.message);
            process.exit(1);
        });
} else {
    console.error('❌ MONGODB_URI is missing from environment variables.');
}
