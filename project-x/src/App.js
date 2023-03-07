import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './pages/Home';
import About from './pages/About';
import Questions from './pages/Questions';

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#888888');

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
  }
  return (
    <div className="App">
      <Router>
        <Navbar style={{ backgroundColor }} expand="lg">
          <Container>
            <NavLink to="/" exact className = "nav-link">
             <Navbar.Brand href="#home"><NavLink to="/" style={{ color: 'black', textDecoration: 'none', }} >Productivity</NavLink></Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" exact className="nav-link">
                Home
                </NavLink>
                <br></br>
                <NavLink to="/about" exact className="nav-link">
                About
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
