import { Router } from 'express';
import Account from '../model/account.js';
import multer from 'multer';
import { valPersNr, auth, accNrVal } from '../middleware/validations.js';

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

router.post('/', upload.single('docPhoto'), auth, valPersNr, accNrVal, async (req, res) => {
    let data = req.body;
    data.docPhoto = req.file.filename;
    data.balance = 0;

    try {
        await Account.create(data);

        res.json('Nauja sąskaita sėkmingai sukurta');
    } catch(err) {
        console.log(err.message);

        res.status(500).json('Įvyko serverio klaida');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        res.json(await Account.find().sort({ lastName: 'asc' }));
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        res.json(await Account.findById(req.params.id));
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.put('/:id', auth, async (req, res) => {
    if(req.body.balance<0)
        return res.status(500).json('Neigiamas balansas negalimas');
    
    try {
        await Account.findByIdAndUpdate(req.params.id, req.body)
        res.json("Vartotojo lėšos sėkmingai atnaujintos");
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.delete('/:id', auth, async (req, res) => {
    
    try {
       let data = await Account.findById(req.params.id);
       if(data.balance !== 0)
        return res.status(400).json("Norint ištrinti sąskaitą, joje negali būti pinigų!");
    } catch {
        return res.status(500).json('Įvyko serverio klaida');
    }
    

    try {
        await Account.findByIdAndDelete(req.params.id)
        res.json("Vartotojo sąskaita sėkmingai ištrinta");
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});



export default router;