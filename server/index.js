import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import account from './controller/account.js';
import admin from './controller/admin.js';
import session from 'express-session';

const app = express();

app.set('trust proxy', 1) 
app.use(session({
  secret: 'pats saugiausias bankas',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());

app.use('/api/account', account);

app.use('/api/admin', admin);

app.use('/docPhoto', express.static('uploads'));

try {
    await mongoose.connect('mongodb://127.0.0.1/vBank');  

    app.listen(3000);   

    console.log('Sėkmingai prisijungta prie duomenų bazės');
} catch {
    console.log('Nepavyko prisijungti prie duomenų bazės');
}