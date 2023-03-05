import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <h1 className="text-center mb-4">Welcome to my website</h1>
      <p className="text-center mb-4" style={{ fontSize: '20px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed tellus vel sapien pellentesque vulputate ac sed est.</p>
      <div className="text-center" style={{ marginTop: '10vh' }}>
        <NavLink to="/Fuck">
          <Button variant="primary" size="lg">Learn More</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
