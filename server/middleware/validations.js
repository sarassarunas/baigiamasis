export function auth(req, res, next) {
    if(!req.session.user)
        return res.status(401).json('Prieiga negalima');

    next();
};

export function valPersNr(req, res, next) {
    
    let year = req.body.persNr.slice(1,3);
    let month = req.body.persNr.slice(3,5);
    let day = req.body.persNr.slice(5,7);
    if(+month>12 || +day>31)
        return res.status(422).json('Netinkamas asmens kodas');
    
    next();
};