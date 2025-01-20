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

    function handleAdd(e) {
        e.preventDefault();
        const fieldData = extractFormData(e.target);
        let currBalance = +data.balance;
        let newBalance = currBalance+(+fieldData.value);
        

        axios.put('/api/account/'+id, {balance:newBalance})
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            });
            
            // // Peradresavimo kūrimas
            // setTimeout(() => {
            //     navigate('/admin');
            // }, 3000);
        })
        .catch(err => setAlert({
            message: err.response.data,
            status: 'danger'
        }));

    }
    
    return (
        <>
            <div className="row my-3 justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <button className="btn btn-warning" onClick={() => history.back()}>Grįžti į sąrašą</button>
                        </div>
                        <div className="col-12 col-md-6">
                            <h1 className="">Prideti lėšas</h1>
                        </div>
                    </div>
                </div>
            </div>
            <SingleAccount
                firstName={data.firstName}
                lastName={data.lastName}
                balance={data.balance}
            />
            <div className="row justify-content-md-center">
                <form onSubmit={handleAdd} className="col-12 col-md-6">
                    <label className="d-block">Suma kurią norite pridėti:</label>
                    <div className="input-group">
                        
                        <input type="number" className="form-control" name="value" step="any" min="0"/>
                        <button className="btn btn-primary">Pridėti</button>
                    </div>

                </form>
            </div>
        </>
    );
}
export default AddBalance;