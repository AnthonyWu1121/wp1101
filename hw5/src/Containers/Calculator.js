import React, { useState, useEffect } from 'react';
import './Calculator.css'

function Calculator() {
    const [numShow, setNumShow] = useState(0);

    return(
        <div className="calculatorContainer">
            <h1 className="title">Calculator</h1>
        </div>
    )
}

export default Calculator;