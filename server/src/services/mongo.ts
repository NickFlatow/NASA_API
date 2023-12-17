import mongoose from 'mongoose';


const MONGO_URL = 'mongodb+srv://nickflatow:dWItQLLiY6r1bYUs@cluster0.m0i9flg.mongodb.net/?retryWrites=true&w=majority';
    
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});


export async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}
export async function mongoDisconnect() {
    await mongoose.disconnect();
}