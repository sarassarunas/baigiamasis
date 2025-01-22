import { useState, useEffect } from "react";
import axios from 'axios';
import Account from "../components/account/Account.jsx";

function Accounts() {
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState({});
    const [fatalError, setFatalError] = useState({});

    useEffect(() => {
        axios.get('/api/account')
        .then(resp => {
            setData(resp.data)
        })
        .catch(err => 
            setFatalError({
                message: err.response.data?err.response.data:'nepavyko susisiekti su serveriu',
                status: 'danger'
            })
            );
    }, [alert]);
    //
    return (
        <>
            <h1>Visos vartotojų sąskaitos:</h1>
            {fatalError.message&&
            <div className={"alert alert-" + fatalError.status}>
                <p>{fatalError.message}</p>
            </div>}
            {alert.message&&
            <div className={"alert alert-" + alert.status}>
                <p>{alert.message}</p>
            </div>
            }
            {!data[0]?
            <div className='alert alert-warning'>
                <p>Nėra jokių sąskaitų</p>
            </div>
            :
            <div className="accList">
                {data.map(acc=>(
                    <Account 
                        key={acc._id}
                        firstName={acc.firstName}
                        lastName={acc.lastName}
                        accNr={acc.accNr}
                        persNr={acc.persNr}
                        docPhoto={acc.docPhoto}
                        balance={acc.balance}
                        id={acc._id}
                        setAlert={setAlert}
                    />
                ))}
            </div>
            }   
        </>
    )
}
export default Accounts;