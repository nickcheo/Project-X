import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Questions({ backgroundColor }) {
  const [value, setValue] = useState(50);
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const rangeStyle = {
    display: 'block',
    width: '50%',
    
  };

  useEffect(() => {
    updateBackgroundColor(value, backgroundColor);
  }, [value, backgroundColor]);

  function updateBackgroundColor(value, backgroundColor) {
    const lightness = value;
    const color = `hsl(0, 0%, ${lightness}%)`;
    backgroundColor && backgroundColor(color);
    document.body.style.background = color;

    // set text color to white if background is dark, otherwise set it to black
    document.body.style.color = lightness <= 50 ? 'white' : 'black';
  }

  function handleNext() {
    setQuestionIndex(questionIndex + 1);
  }

  function handleBack() {
    setQuestionIndex(questionIndex - 1);
  }

  const questions = [
    {
      component: BrightnessQuestion,
      props: { value, handleChange, rangeStyle },
    },
    {
      component: MusicQuestion,
      props: { backgroundColor, questionIndex },
    },
  ];

  const CurrentQuestion = questions[questionIndex].component;
  const currentQuestionProps = questions[questionIndex].props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      }}
    >
      <CurrentQuestion {...currentQuestionProps} />
      {questionIndex > 0 && (
        <Button variant="primary" onClick={handleBack} style={{ marginRight: '1rem' }}>
          Back
        </Button>
      )}
      {questionIndex < questions.length - 1 ? (
        <Button variant="primary" onClick={handleNext}>
          Next
        </Button>
      ) : (
        <Button variant="success">Finish</Button>
      )}
    </div>
  );
}

function BrightnessQuestion({ value, handleChange, rangeStyle }) {
  return (
    <>
      <h1 style={{ marginBottom: '2rem' }}>How bright would you like your lamp to be? </h1>
      <Form.Range value={value} onChange={handleChange} style={rangeStyle} />
      <h4>Brightness: {value}%</h4>
    </>
  );
}

function MusicQuestion({ backgroundColor, questionIndex }) {
    console.log(questionIndex);
  return (
    <div style={{ backgroundColor: backgroundColor }}>
      <h1 style={{ marginBottom: '2rem' }}>What kind of music do you like?</h1>
    </div>
  );
}

export default Questions;
