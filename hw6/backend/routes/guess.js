import express from "express";
import getNumber from '../core/getNumber'

const router = express.Router();

router.post('/start', (_, res) => {
    getNumber();
    res.json({msg: 'The game has started.'});
})

router.get('/guess', (req, res) => {
    const number = getNumber();
    const guessed = roughScale(req.query.number, 10); // check if NOT a num or not in range [1, 100]
    if (!guessed || guessed < 1 || guessed > 100) {
        res.status(406).send({msg: 'Not a legal number.'});
    }else if(number === guessed){

    }
})

router.post('/restart', (_, res) => {

})

export default router;