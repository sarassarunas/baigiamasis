import { useState } from 'react'; 
import axios from 'axios';
import { extractFormData } from '../helpers/util.js';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
    const [alert, setAlert] = useState({});
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const data = extractFormData(e.target);

        axios.post('/api/admin/login', data)
        .then(resp => {
            setUser(resp.data);
            setAlert({
                message: 'Sveiki, esate prisijungęs, kaip ' + resp.data.firstName,
                status: 'success'
            });
            setTimeout(() => {
                navigate('/accounts');
            }, 3000);
        })
        .catch(err => setAlert({
            message: err.response.data?err.response.data:'nepavyko susisiekti su serveriu',
            status: 'danger'
        }));
    }

    return (
        <>
            <h1>Login page</h1>
            {alert.message && 
                <div className={"alert alert-" + alert.status}>{alert.message}</div>
            }
            <form onSubmit={handleLogin}>
                <div className="row my-5">
                    <div className="col-12 col-md-6">
                        <label className="d-block mb-2" htmlFor="email">El. pašto adresas:</label>
                        <input className="form-control" type="email" name="email" id="email" />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="d-block mb-2" htmlFor="password">Slaptažodis:</label>
                        <input className="form-control" type="password" name="password" id="password" />
                    </div>
                </div>
                <button className="btn btn-primary">Prisijungti</button>
            </form>
        </>
    );
}
export default Login;