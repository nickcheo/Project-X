import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
// import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
      <p>hi</p>
      
      <Router>
        <Link to="/">help me</Link>
        <br></br>
        <Link to="/about">help me2</Link>
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/about" element={<About/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
