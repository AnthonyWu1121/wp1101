import React, { Fragment, useState, useEffect } from 'react';
import './Calculator.css'

function Calculator() {
    const [tempResult, setTempResult] = useState('');
    const [numShow, setNumShow] = useState('');
    useEffect(() => {
        setTempResult(calculate());
    });

    const pushButton = (e) => {
        let len = numShow.length;
        if(e === '+'){
            if(numShow[len - 1] === '-' || numShow[len - 1] === '×' || numShow[len - 1] === '/'){
                let tempNum = numShow.slice(0, len - 1);
                tempNum += '+';
                setNumShow(tempNum);
            }else if(numShow[len - 1] !== '+'){
                setNumShow(numShow + e);
            }
        }else if(e === '-'){
            if(numShow[len - 1] === '+' || numShow[len - 1] === '×' || numShow[len - 1] === '/'){
                let tempNum = numShow.slice(0, len - 1);
                tempNum += '-';
                setNumShow(tempNum);
            }else if(numShow[len - 1] !== '-'){
                setNumShow(numShow + e);
            }
        }else if(e === '×'){
            if(numShow[len - 1] === '+' || numShow[len - 1] === '-' || numShow[len - 1] === '/'){
                let tempNum = numShow.slice(0, len - 1);
                tempNum += '×';
                setNumShow(tempNum);
            }else if(numShow[len - 1] !== '×'){
                setNumShow(numShow + e);
            }
        }else if(e === '/'){
            if(numShow[len - 1] === '+' || numShow[len - 1] === '×' || numShow[len - 1] === '-'){
                let tempNum = numShow.slice(0, len - 1);
                tempNum += '/';
                setNumShow(tempNum);
            }else if(numShow[len - 1] !== '/'){
                setNumShow(numShow + e);
            }
        }else if(e === '.'){
            if(numShow[len - 1] !== '.'){
                setNumShow(numShow + e);
            }
        }else{
            setNumShow(numShow + e);
        }
    }

    const calculate = () => {
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
        console.log('nums', nums);
        let numsInt = [];
        let numLen = nums.length;
        for(let i = 0; i < numLen; i++){
            let lenp = nums[i].length;
            let tempNums = [], tempOpers = [];
            let nowp = 0, prevp = 0;
            for(let j = 0; j < lenp; j++){
                if(nums[i][j] === '×' || nums[i][j] === '/'){
                    nowp = j;
                    tempNums.push(nums[i].slice(prevp, nowp));
                    tempOpers.push(nums[i][j]);
                    prevp = nowp + 1;
                }
            }
            tempNums.push(nums[i].slice(prevp));
            console.log('tempNums', tempNums);
            let tempTotal = 0;
            if(tempNums[0] !== ''){
                tempTotal = parseFloat(tempNums[0]);
            }
            
            if(lenp > 1){
                for(let j = 1; j < lenp; j++){
                    let numNow = parseFloat(tempNums[j]);
                    if(tempNums[j] === ''){
                        numNow = 1;
                    }
                    
                    let operNow = tempOpers[j - 1];
                    if(operNow === '×'){
                        tempTotal *= numNow;
                    }else if(operNow === '/'){
                        if(numNow === 0){
                            return 'Error! Divided by 0';
                        }
                        tempTotal /= numNow;
                    }
                }
            }
            numsInt[i] = tempTotal;
        }
        console.log('numsInt', numsInt);
        let total = numsInt[0];
        if(numLen > 1){
            for(let i = 1; i < numLen; i++){
                let numNow = numsInt[i];
                if(numNow == NaN){
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

    const enterNum = () => {
        setNumShow(tempResult.toString());
        setTempResult('');
    }

    const deleteNum = () => {
        let len = numShow.length;
        let tempNum = numShow.slice(0, len - 1);
        setNumShow(tempNum);
    }

    const clearNum = () => {
        setNumShow('');
    }

    return(
        <div className="calculatorContainer">
            <div className="titleContainer">
                <h1 className="title">Calculator</h1>
            </div>
            <div className="showBlock">
                <div className="numShowBlock">
                    {numShow}
                </div>
                <div className="tempBlock">
                    {tempResult}
                </div>
            </div>
            <div className="allButtonContainer">
                <span className="row">
                    <button onClick={() => clearNum()}>C</button>
                    <button onClick={() => deleteNum()}>←</button>
                </span>
                <span className="row">
                    <button onClick={() => pushButton('7')}>7</button>
                    <button onClick={() => pushButton('8')}>8</button>
                    <button onClick={() => pushButton('9')}>9</button>
                    <button onClick={() => pushButton('/')}>/</button>
                </span>
                <span className="row">
                    <button onClick={() => pushButton('4')}>4</button>
                    <button onClick={() => pushButton('5')}>5</button>
                    <button onClick={() => pushButton('6')}>6</button>
                    <button onClick={() => pushButton('×')}>×</button>
                </span>
                <span className="row">
                    <button onClick={() => pushButton('1')}>1</button>
                    <button onClick={() => pushButton('2')}>2</button>
                    <button onClick={() => pushButton('3')}>3</button>
                    <button onClick={() => pushButton('-')}>-</button>
                </span>
                <span className="row">
                    <button onClick={() => pushButton('0')}>0</button>
                    <button onClick={() => pushButton('.')}>.</button>
                    <button onClick={() => enterNum()}>=</button>
                    <button onClick={() => pushButton('+')}>+</button>
                </span>
            </div>
        </div>
    )
}

export default Calculator;