import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';

function App() {
  
  return (
    <div >
      <Navbar></Navbar>
      <Header></Header>
      <Home></Home>
    </div>
  );
}

export default App;
