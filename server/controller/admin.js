import { Router } from 'express';
import Admin from '../model/admin.js';
import { auth } from '../middleware/validations.js';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/create', async (req, res) => {
    
    try {

        req.body.password = await bcrypt.hash(req.body.password, 10);
        await Admin.create(req.body);

        res.json('Naujas administratorius sėkmingai sukurtas');
    } catch(err) {
        console.log(err.message);

        res.status(500).json('Įvyko serverio klaida');
    }
});

router.get('/', async (req, res) => {
    try {
        res.json(await Admin.find());
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.post('/login', async (req, res) => {
    if(!req.body.email || !req.body.password)
        return res.status(500).json('Negauti prisijungimo duomenys');

    const data = await Admin.findOne({ email: req.body.email });

    if(!data) 
        return res.status(401).json('Neteisingi prisijungimo duomenys');
    
    if(!await bcrypt.compare(req.body.password, data.password)) 
        return res.status(401).json('Neteisingi prisijungimo duomenys');
    
    req.session.user = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
    };

    res.json(req.session.user);
});

router.get('/check-auth', auth, (req, res) => {
    res.json(req.session.user);
});

router.get('/logout', auth, (req, res) => {
    req.session.destroy();

    res.json("Sėkmingai atsijungėte");
});

export default router;