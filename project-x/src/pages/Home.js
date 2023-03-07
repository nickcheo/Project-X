import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function Home() {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleClick = () => {
    console.log("am I here");
    navigate('/questions');
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center" style={{ marginTop: '-400px'}}>
        <h1 style={{ fontSize: '50px' }}>Productivity</h1>
        <p>This is a productivity web app</p>
        {showButton && <button className = "btn btn-primary" onClick={handleClick}>Let's Begin!</button>}
      </div>
    </div>
  );
}

export default Home;
