//Express, Router middleware, API endpoint

import express from 'express';

import {deleteDB, createScoreCard, queryScoreCard} from '../mongo';

const router = express.Router();

router.delete('/clear-db', async (_, res) => {
    const msg = await deleteDB();
    res.json({message: msg});
})

router.post('/create-card', async (req, res) => {
    console.log('create body = ', req.body);
    // const name = req.body.name;
    // const subject = req.body.subject;
    // const score = req.body.score;
    const {name, subject, score} = req.body;
    const val = await createScoreCard(name, subject, score);
    res.json({message: val.msg, card: val.card});
    console.log('val = ', val.msg, '--', val.card);
})

router.get('/query-cards', async (req, res) => {
    console.log('query params = ', req.query);
    const {type, queryString} = req.query;
    const val = await queryScoreCard(type, queryString);
    res.json({messages: val.messages, message: val.msg});
})

export default router;