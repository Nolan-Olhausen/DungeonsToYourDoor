import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  const [activePage, setActivePage] = useState('Home');
  return (
    <div className="App">
      <Navbar activePage={activePage} onNavClick={setActivePage} />
    </div>
  );
}

export default App;
