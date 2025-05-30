import React from 'react';
import './App.css';
import TicTacToe from './TicTacToe';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app" style={{background: '#fff', color: '#000'}}>
      <nav className="navbar" style={{background: '#fff', color: '#000', borderBottom: '2px solid #eee'}}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo" style={{color:'#2196f3'}}><span className="logo-symbol">*</span> KAVIA TicTacToe</div>
            <span style={{fontSize: 16, color: '#000'}}>Light Theme</span>
          </div>
        </div>
      </nav>
      <main>
        <TicTacToe />
      </main>
    </div>
  );
}

export default App;