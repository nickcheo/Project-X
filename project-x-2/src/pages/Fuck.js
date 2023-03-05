import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

function Fuck() {
  const [value, setValue] = useState(0);
  const history = useNavigate();
  const [socket, setSocket] = useState(null);
   

  useEffect(() => {
    // Set up WebSocket connection on component mount
    const newSocket = new WebSocket('ws://172.20.10.4/websocket');
    setSocket(newSocket);

    // Clean up WebSocket connection on component unmount
    return () => {
    if (newSocket.readyState === 1) {
    
      newSocket.close();
    }
    };
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the slider value
    console.log(`Slider value: ${value}`);
  
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(value.toString());
      console.log("Sent slider value to server");
    } else {
      console.log("WebSocket connection is not open");
    }
    history('/');
  }
  

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, maxHeight: '60vh' }}>
        <h2 style={{ fontSize: '24px', textAlign: 'center' }}>How much do you like Men?</h2>
        <Slider value={value} onChange={handleChange} style={{ width: '300px' }} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Fuck;
