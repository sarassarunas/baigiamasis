export function auth(req, res, next) {
    if(!req.session.user)
        return res.status(401).json('Prieiga negalima');

    next();
};

export function valPersNr(req, res, next) {
    if(!req.body.persNr)
        return res.status(422).json('Nera asmens kodo');
    
    const persNr = req.body.persNr;    

    let A = persNr[0];
    let B = persNr[1];
    let C = persNr[2];
    let D = persNr[3];
    let E = persNr[4];
    let F = persNr[5];
    let G = persNr[6];
    let H = persNr[7];
    let I = persNr[8];
    let J = persNr[9];
    let K = persNr[10];

    let S = (A*1) + (B*2) + (C*3) + (D*4) + (E*5) + (F*6) + (G*7) + (H*8) + (I*9) + (J*1);
    let S2 = (A*3) + (B*4) + (C*5) + (D*6) + (E*7) + (F*8) + (G*9) + (H*1) + (I*2) + (J*3);

    if(S%11===10) {
        if(S2%11===10 && +K!==0) {
            return res.status(422).json('Netinkamas asmens kodas');
        } else {
            if(S2%11!==+K)
                return res.status(422).json('Netinkamas asmens kodas');
        }
    } else {
        if(S%11!==+K) {
            return res.status(422).json('Netinkamas asmens kodas');
        }
    }
    next();
};

export function accNrVal(req, res, next) {
    const accNr = req.body.accNr;
    if(accNr.length!==20 || accNr.slice(0,9)!=='LT9173305')
        return res.status(422).json('Netinkamas sąskaitos numeris');
    next();
};