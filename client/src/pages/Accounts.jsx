import { useState, useEffect } from "react";
import axios from 'axios';
import Account from "../components/account/Account.jsx";

function Accounts() {
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState({});

    useEffect(() => {
        axios.get('/api/account')
        .then(resp => {
            setData(resp.data)
        })
        .catch(err => console.log(err));
    }, []);
    
    return (
        <>
            <h1>Visos vartotojų sąskaitos:</h1>
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
        </>
    )
}
export default Accounts;