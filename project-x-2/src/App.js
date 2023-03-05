import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Fuck from './pages/Fuck';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar bg="light" expand="lg">
          <Container>
            <NavLink to="/" exact className = "nav-link">
             <Navbar.Brand href="#home">React Bootstrap Navbar</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" exact className="nav-link" activeClassName="active">
                Home
                </NavLink>
                <br></br>
                <NavLink to="/about" exact className="nav-link" activeClassName="active">
                About
                </NavLink>
                <NavLink to="/about" exact className="nav-link" activeClassName="active">
                Morality
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/about" element={<About/>} />
        <Route  path="/fuck" element={<Fuck/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
