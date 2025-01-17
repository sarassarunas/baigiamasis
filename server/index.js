import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import account from './controller/account.js'

const app = express();
app.use(express.json());

// const storage = multer.diskStorage({
//     destination: function (req, file, next) {
//         next(null, './uploads');
//     },
//     filename: function (req, file, next) { 
//         next(null, Date.now() + '.jpg');
//     }
// });

// const upload = multer({ storage: storage });

app.use('/api/account', account);







try {
    await mongoose.connect('mongodb://127.0.0.1/vBank');  

    app.listen(3000);   

    console.log('Sėkmingai prisijungta prie duomenų bazės');
} catch {
    console.log('Nepavyko prisijungti prie duomenų bazės');
}