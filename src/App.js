import React, { useState } from 'react';
import Routes from './config/routes';
import Navbar from './components/landing/Navbar';
import Footer from './components/landing/Footer';

import './App.css';

function App() {

  const [token, setToken] = useState(null);

  
  return (
    <>
      <Navbar token={token} setToken={setToken} />

      <Routes token={token} setToken={setToken}/>

      <Footer />
    </>
  );
}

export default App;
