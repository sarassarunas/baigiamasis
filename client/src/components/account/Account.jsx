import './Account.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


function Account(props, setAlert) {

    const [popUp, setPopUp] = useState(false);
    

    function handleDelte(id) {
        axios.delete('/api/account/'+id)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            });
            // window.location.reload();
            // // Peradresavimo kūrimas
            // setTimeout(() => {
            //     navigate('/admin');
            // }, 3000);
        })
        // .then(()=>{window.location.reload();})
        .catch(err => setAlert({
            message: err.response.data,
            status: 'danger'
        }));
    }

    return(
        <>
        {popUp?
            <div className='popUp'>
                <h1>ar tikrai norite ištrinti sąskaitą?</h1>
                <button >Taip</button>
                <button onClick={()=>{setPopUp(!popUp)}}>Ne</button>   
            </div>:
            <div className="row border border-start-0 border-end-0 mt-3">
                <div className="col-12 col-md-8 my-2">
                    <div className="row">
                        <div className="info col-12 col-md-4 text-md-start">
                            <div className="name mt-1">
                                <label className="d-block">Vartotojas:</label>
                                <span className="d-block">{props.firstName + ' ' + props.lastName}</span>
                            </div>
                            <div className="persNr mt-1">
                                <label className="d-block">Asmens kodas:</label>
                                <span className="d-block">{props.persNr}</span>
                            </div>
                            <div className="acc mt-1">
                                <label className="d-block">Sąskaitos Nr:</label>
                                <span className="d-block">{props.accNr}</span>
                            </div>
                        </div>
                        <div className="balance col-12 col-md-4">
                        <label className="d-block">Sąskaitos balansas:</label>
                        <span className="d-block">{props.balance + ' €'}</span>
                        </div>
                        <div className="photo col-12 col-md-4 ">
                            <img src={"/docPhoto/" + props.docPhoto} alt="" />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 border-start">
                    <div className="buttons my-2">
                        <Link to={'/account/add/'+props.id}><button className="btn btn-warning">Prideti lėšas</button></Link>
                        <Link to={'/account/remove/'+props.id}><button className="btn btn-warning">Atimti lėšas</button></Link>
                        <button className="btn btn-danger" onClick={()=>{setPopUp(!popUp)}}>Ištrinti</button>
                    </div>
                </div>
            </div>
        }  
        </>
    );
}
export default Account;