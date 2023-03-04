import React, { useState } from 'react';
import Slider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

function SliderQuestion() {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the slider value
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <h2 style={{ fontSize: '24px', textAlign: 'center' }}>How much do you like React Bootstrap Slider?</h2>
        <Slider value={value} onChange={handleChange} style={{ width: '300px' }} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SliderQuestion;
