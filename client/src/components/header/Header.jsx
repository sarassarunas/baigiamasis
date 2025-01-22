import { Link } from "react-router-dom";
import axios from 'axios';

function Header({user, setUser}) {
    const handleLogout = () => {
        axios.get('/api/admin/logout')
        .then(resp => setUser(false));
    }
    return(
        <>
            <div className="container">
                <nav>
                    <ul className="nav nav-pills card-header-pills">
                        <li className="nav-item"><Link to="/" className="nav-link">Pagrindinis</Link></li>
                        
                        {user?
                        <>
                        <li className="nav-item"><Link to="/accounts" className="nav-link">Visos saskaitos</Link></li>
                        <li className="nav-item"><Link to="/newAcc" className="nav-link">Pridėti naują</Link></li>
                        <li className="nav-item"><Link to="/" className="nav-link" onClick={handleLogout}>Atsijungti</Link></li>
                        </>
                        :
                        <li className="nav-item"><Link to="/login" className="nav-link">Prisijungti</Link></li>
                        }                      
                        
                        
                    </ul>
                </nav>
            </div>
        </>
    );
}
export default Header;