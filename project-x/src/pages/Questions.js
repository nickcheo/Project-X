import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

function Questions({ backgroundColor }) {
    const [value, setValue] = useState(50);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const rangeStyle = {
        display: 'block',
        margin: '0 auto',
        width: '50%'
    };

    useEffect(() => {
        updateBackgroundColor(value, backgroundColor);
    }, [value, backgroundColor]);

    function updateBackgroundColor(value, backgroundColor) {
        const lightness = value;
        const color = `hsl(0, 0%, ${lightness}%)`;
        backgroundColor && backgroundColor(color);
        document.body.style.background = color;
        
    }
    

    return (
        <>
            <Form.Label>Range: {value}</Form.Label>
            <Form.Range value={value} onChange={handleChange} style={rangeStyle} />
        </>
    );
}

export default Questions;
