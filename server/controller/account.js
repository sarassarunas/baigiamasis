import { Router } from 'express';
import Account from '../model/account.js';
import multer from 'multer';
import { valPersNr } from '../middleware/validations.js';

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

// function random(min, max) {
//     const minCeiled = Math.ceil(min);
//     const maxFloored = Math.floor(max);
//     return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
// }

router.post('/', upload.single('docPhoto'), valPersNr, async (req, res) => {
    let data = req.body;
    data.docPhoto = req.file.filename;
    data.balance = 0;

    // let accNrs = [];
    //     try {
        
    //         accNrs = await Account.find();
    
    //     } catch {
            
    //         return res.status(500).json('Įvyko serverio klaida gaunant duomenys');
    //     }

    
    
    // function newAccNr() {
        
    //     let country = 'LT';
    //     let controllCode = '91'
    //     let bankCode = "73305";
    //     let accNr = '';
    //     let fullAccNr = '';
    //     for(let i = 1;i<=11;i++) {
    //         accNr+=random(0,9);
    //     }
    //     fullAccNr = country+controllCode+bankCode+accNr;
        
    //     let index = accNrs.findIndex(el => el.accNr === fullAccNr);

    //     if(index != -1)
    //         return newAccNr();

    //     return fullAccNr;
        

    // }

    // data.accNr = newAccNr();

    try {
        await Account.create(data);

        res.json('Nauja sąskaita sėkmingai sukurta');
    } catch(err) {
        console.log(err.message);

        res.status(500).json('Įvyko serverio klaida');
    }
});

router.get('/', async (req, res) => {
    try {
        res.json(await Account.find());
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.json(await Account.findById(req.params.id));
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Account.findByIdAndUpdate(req.params.id, req.body)
        res.json("Vartotojo lėšos sėkmingai atnaujintos");
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.delete('/:id', async (req, res) => {
    
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