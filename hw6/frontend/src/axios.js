import axios from "axios";

const instance = axios.create({baseURL: 'http://localhost:4000/api/guess'});

const startGame = async () => {
    const {data: {msg}} = await instance.post('/start');
    return msg;
}

const guess = async(number) => {
    try{
        const {data: {msg}} = await instance.get('/guess', {params: {number}});
        return msg;
    }
    catch(error){
        /*my turn*/
        const msg = `Error! ${number} is not a valid number (1 - 100)`;
        return msg;
        /*my turn*/
    }
}

const restart = async () => {
    /*my turn*/
    const {data: {msg}} = await instance.post('/restart');
    return msg;
    /*my turn*/
}

export {startGame, guess, restart};