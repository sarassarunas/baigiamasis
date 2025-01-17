import { Router } from 'express';
import Account from '../model/account.js';
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, './uploads');
    },
    filename: function (req, file, next) { 
        next(null, Date.now() + '.jpg');
    }
});

const upload = multer({ storage: storage });


router.post('/', upload.single('docPhoto'), async (req, res) => {
    let data = req.body;
    data.docPhoto = req.file.filename;
    data.balance = 0;
    // data.accNr = 'LT00000000002';

    try {
        await Account.create(data);

        res.json('Nauja sąskaita sėkmingai sukurta');
    } catch(err) {
        console.log(err.message);

        res.status(500).json('Įvyko serverio klaida');
    }
});

export default router;