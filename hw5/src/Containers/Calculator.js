import React, { Fragment, useState, useEffect } from 'react';
import './Calculator.css'

function Calculator() {
    const [tempResult, setTempResult] = useState('');
    const [numShow, setNumShow] = useState('');
    useEffect(() => {
        setTempResult(calculate());
    });

    function pushButton(e){
        let len = numShow.length;
        if(e === '+'){
            if(numShow[len - 1] === '+' || numShow[len - 1] === '-'){
                let tempNum = numShow.slice(0, len - 1);
                tempNum += '+';
                setNumShow(tempNum);
            }else{
                setNumShow(numShow + e);
            }
        }else if(e === '-'){
            if(numShow[len - 1] === '+' || numShow[len - 1] === '-'){
                let tempNum = numShow.slice(0, len - 1);
                tempNum += '-';
                setNumShow(tempNum);
            }else{
                setNumShow(numShow + e);
            }
        }else{
            setNumShow(numShow + e);
        }
    }

    function calculate() {
        if(numShow === ''){
            return '';
        }
        let len = numShow.length;
        let nums = [], opers = [];
        let now = 0, prev = 0;
        for(let i = 0; i < len; i++){
            if(numShow[i] === '+' || numShow[i] === '-'){
                now = i;
                nums.push(numShow.slice(prev, now));
                opers.push(numShow[i]);
                prev = now + 1;
            }
        }
        nums.push(numShow.slice(prev));
        
        let numLen = nums.length;
        let total = parseFloat(nums[0]);
        if(numLen > 1){
            for(let i = 1; i < numLen; i++){
                let numNow = parseFloat(nums[i]);
                if(nums[i] === ''){
                    numNow = 0;
                }
                
                let operNow = opers[i - 1];
                if(operNow === '+'){
                    total += numNow;
                }else if(operNow === '-'){
                    total -= numNow;
                }
            }
        }
        return total;
    }

    function enterNum() {
        setNumShow(tempResult.toString());
        setTempResult('');
    }

    function deleteNum() {
        let len = numShow.length;
        let tempNum = numShow.slice(0, len - 1);
        setNumShow(tempNum);
    }

    function clearNum() {
        setNumShow('');
    }

    return(
        <div className="calculatorContainer">
            <div className="titleContainer">
                <h1 className="title">Calculator</h1>
            </div>
            <div className="showBlock">
                <div className="numShowBlock">
                    numShow = {numShow}
                </div>
                <div className="tempBlock">
                    tempResult = {tempResult}
                </div>
            </div>
            <div className="allButtonContainer">
                <span className="row">
                    <button onClick={() => clearNum()}>AC</button>
                    <button>/</button>
                </span>
                <span className="row">
                    <button onClick={() => pushButton('7')}>7</button>
                    <button onClick={() => pushButton('8')}>8</button>
                    <button onClick={() => pushButton('9')}>9</button>
                    <button>x</button>
                </span>
                <span>
                    <button onClick={() => pushButton('4')}>4</button>
                    <button onClick={() => pushButton('5')}>5</button>
                    <button onClick={() => pushButton('6')}>6</button>
                    <button onClick={() => pushButton('-')}>-</button>
                </span>
                <span>
                    <button onClick={() => pushButton('1')}>1</button>
                    <button onClick={() => pushButton('2')}>2</button>
                    <button onClick={() => pushButton('3')}>3</button>
                    <button onClick={() => pushButton('+')}>+</button>
                </span>
                <span>
                    <button onClick={() => pushButton('0')}>0</button>
                    <button onClick={() => pushButton('.')}>.</button>
                    <button onClick={() => deleteNum()}>DEL</button>
                    <button onClick={() => enterNum()}>=</button>
                </span>
            </div>
        </div>
    )
}

export default Calculator;