import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/header/Header.jsx'; 
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Accounts from './pages/Accounts.jsx';
import AddNewAcc from './pages/AddNewAcc.jsx';
import AddBalance from './pages/AddBalance.jsx';
import RemoveBalance from './pages/RemoveBalance.jsx';

function App() {
  const [user, setUser] = useState();

    useEffect(() => {
        axios.get('/api/admin/check-auth')
        .then(resp => {
            setUser(resp.data)
        })
        .catch(err => {});
    }, []);

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          {user&&
          <>
          <Route path="/newAcc" element={<AddNewAcc />} />
          <Route path='/accounts' element={<Accounts />}/>
          <Route path='/account/add/:id' element={<AddBalance />}/>
          <Route path='/account/remove/:id' element={<RemoveBalance />}/>
          </>        
          }
          <Route path="*" element={<h3>404 Puslapis nerastas</h3>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
