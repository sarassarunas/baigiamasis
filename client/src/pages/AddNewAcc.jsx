import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { random } from '../helpers/util';

function AddNewAcc() {
    const [alert, setAlert] = useState({});
    const navigate = useNavigate();
    
    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        

        axios.post('/api/account', data)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success' 
                });
                setTimeout(() => {
                        navigate('/accounts');
                    }, 3000);
            }).catch(err => {
                setAlert({
                message: err.response.data,
                status: 'danger'
            });
    })}

    let country = 'LT';
    let controllCode = '91'
    let bankCode = "73305";
    let accNr = '';
    let fullAccNr = '';
    for(let i = 1;i<=11;i++) {
        accNr+=random(0,9);
    }
    fullAccNr = country+controllCode+bankCode+accNr;

    return (
        <>
            <h1>Pridėti naują sąskaitą:</h1>
            {alert.message&&
            <div className={"alert alert-" + alert.status}>
                <p>{alert.message}</p>
            </div>
            }
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="mt-2 col-12 col-md-6">
                        <label className="form-label text-start" htmlFor='name'>Vardas:</label>
                        <input className="form-control" type="text" name="firstName" id='name'/>
                    </div>
                    <div className="mt-2 col-12 col-md-6">
                        <label className="form-label" htmlFor='lastName'>Pavardė:</label>
                        <input className="form-control" type="text" name="lastName" id='lastName'/>
                    </div>
                </div>
                <div className="row">
                    <div className="mt-2 col-12 col-md-6">
                        <label className="form-label" htmlFor='persNr'>Asmens kodas:</label>
                        <input className="form-control" type="number" name="persNr" id='persNr'/>
                    </div>
                    <div className="mt-2 col-12 col-md-6">
                        <label className="form-label" htmlFor='photo'>Id nuotrauka:</label>
                        <input className="form-control" type="file" accept="image/jpeg" name="docPhoto" id='photo'/>
                    </div>
                </div>
                <div className="row">
                    <div className="mt-2 col-12 col-md-6">
                        <label className="form-label" htmlFor='accNr'>Asmens kodas:</label>
                        <input className="form-control" defaultValue={fullAccNr} type="text" name="accNr" id='accNr'/>
                    </div>
                    
                </div>
                <div className="mt-2">
                <button className="btn btn-primary">Pridėti</button>
                </div>
            </form>
        </>
    );
}
export default AddNewAcc;