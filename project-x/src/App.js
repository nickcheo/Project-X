import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './pages/Home';
import About from './pages/About';
import Questions from './pages/Questions';

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#888888');
  const [textColor, setTextColor] = useState('black');

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
  }

  useEffect(() => {
    const lightness = parseInt(backgroundColor.slice(11, -2));
    if (lightness > 50) {
      console.log("dark");
      setTextColor('black');
    } else {
      setTextColor('white');
      console.log(lightness);
    }
  }, [backgroundColor]);

  return (
    <div className="App">
      <Router>
        <Navbar style={{ backgroundColor, color: textColor }} expand="lg">
          <Container>
            <NavLink to="/" exact className = "nav-link">
             <Navbar.Brand href="#home"><NavLink to="/" style={{ color: textColor, textDecoration: 'none', fontWeight: 'bold', fontSize: '1.6rem', marginRight: '1rem', }} >Productivity</NavLink></Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" exact className="nav-link">
                  <span style={{ color: textColor, textDecoration: 'none', fontSize: '1.1rem', marginRight: '1rem', }}>Home</span>
                </NavLink>
                <NavLink to="/about" exact className="nav-link">
                  <span style={{ color: textColor, textDecoration: 'none', fontSize: '1.1rem', marginRight: '1rem', }}>About</span>
              </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/questions" element={<Questions backgroundColor={handleBackgroundColorChange}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
