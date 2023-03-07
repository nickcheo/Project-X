import React, { useState } from 'react';
// import App from './src/index.js';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';


function Fuck() {
  const [value, setValue] = useState(0);
  const history = useNavigate();

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the slider value

    // console.log('Slider value: ${value}');
    history('/fuck2');
    
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
