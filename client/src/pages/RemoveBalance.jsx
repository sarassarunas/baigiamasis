import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import SingleAccount from "../components/singleAcc/SingleAccount.jsx";
import { extractFormData } from '../helpers/util.js';

function AddBalance() {
    const [data, setData] = useState({});
    const { id } = useParams();
    const [alert, setAlert] = useState({});

    useEffect(() => {
        axios.get('/api/account/' + id)
        .then(resp => setData(resp.data))
            .catch(err => setAlert({
                message: err.response.data,
                status: 'danger'
        }));
    }, [alert]);

    function handleRemove(e) {
        e.preventDefault();
        const fieldData = extractFormData(e.target);
        let currBalance = +data.balance;
        let newBalance = currBalance-(+fieldData.value);
        if(newBalance<0)
            return setAlert({
                message: `Lėšų kiekis yra nepakankamas`,
                status: 'danger'
            });
                
        

        axios.put('/api/account/'+id, {balance:newBalance})
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            });})
        .catch(err => setAlert({
            message: err.response.statusText,
            status: 'danger'
        }));

    }
    
    return (
        <>
            <div className="row my-3 justify-content-center">
                <div className="col-12 col-md-8 ms-md-5">
                    <div className="row">
                        <div className="col-12 col-md-4 align-content-center">
                            <button className="btn btn-warning" onClick={() => history.back()}>Grįžti į sąrašą</button>
                        </div>
                        <div className="col-12 col-md-8 text-md-start">
                            <h1 className="">Nuimti lėšas</h1>
                        </div>
                    </div>
                </div>
            </div>
            {alert.message&&
            <div className={"alert alert-" + alert.status}>
                <p>{alert.message}</p>
            </div>
            }
            <SingleAccount
                firstName={data.firstName}
                lastName={data.lastName}
                balance={data.balance}
            />
            <div className="row justify-content-md-center">
                <form onSubmit={handleRemove} className="col-12 col-md-6">
                    <label className="d-block">Suma kurią norite atimti:</label>
                    <div className="input-group">
                        
                        <input type="number" className="form-control" name="value" step="any" min="0"/>
                        <button className="btn btn-primary">Atimti</button>
                    </div>

                </form>
            </div>
        </>
    );
}
export default AddBalance;