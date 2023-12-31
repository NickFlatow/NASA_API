//this should be in server.ts no but, server.ts does not load first. No idea why.
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});


export async function mongoConnect() {

    if (!MONGO_URL) {
        throw new Error('Missing MONGO_URL!');
    }
    await mongoose.connect(MONGO_URL);
}
export async function mongoDisconnect() {
    await mongoose.disconnect();
}