import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header.jsx'; 
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Accounts from './pages/Accounts.jsx';
import AddNewAcc from './pages/AddNewAcc.jsx';

function App() {
  

  return (
    <BrowserRouter>
      <Header/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newAcc" element={<AddNewAcc />} />
          <Route path='/accounts' element={<Accounts />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
