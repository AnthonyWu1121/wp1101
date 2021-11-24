//Express, Router middleware, API endpoint

import express from 'express';

import createScoreCard from './api/create';
import deleteDB from './api/clear';

const router = express.Router();

router.post('/create-card', (req, res) => {
    const {name, subject, score} = req.query;
    const msg = createScoreCard(name, subject, score);
    res.json({message: msg, card: true});
})

router.delete('/clear-db', (req, res) => {
    const msg = deleteDB();
    res.json({message: msg});
})


export default router;