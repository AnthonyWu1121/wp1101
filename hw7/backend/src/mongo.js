// MonGo DB connection 

import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";

import ScoreCard from './models/ScoreCard';

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res) => console.log("mongo db connection created"));

const deleteDB = async () => {
    try{
        await ScoreCard.deleteMany({});
        const msg = 'Database cleared';
        console.log(msg);
        return msg;
    }catch(e){throw new Error("Database deletion failed");}
}

const createScoreCard = async (name, subject, score) => {
    const existing = await ScoreCard.findOne({name: name, subject: subject});
    if(existing){
        ScoreCard.updateOne({name: name, subject: subject}, {score: score});
        const msg = `Updating (${name}, ${subject}, ${score})`;
        console.log(msg);
        const card = existing;
        return {msg, card};
    }else{
        try{
            const newScoreCard = new ScoreCard({name, subject, score});
            const msg = `Adding (${name}, ${subject}, ${score})`;
            console.log(msg);
            newScoreCard.save();
            const card = newScoreCard;
            return {msg, card};
        }catch(e){throw new Error("ScoreCard creation error: " + e);}
    }
};

const queryScoreCard = async (queryType, queryString) => {
    let existing = {};
    if(queryType === 'name'){
        existing = await ScoreCard.findOne({name: queryString});
        if(existing){
            const msg = `Querying ${queryType}: ${queryString}`;
            console.log(msg);
            const target = await ScoreCard.find({name: queryString});
            let messages = [];
            messages.push(msg);
            target.map((t) => {messages.push(`(${t.name}, ${t.subject}, ${t.score})`)})
            return {messages, msg};
        }else{
            const messages = [];
            const msg = `${queryType} (${queryString}) not found!`;
            return {messages, msg};
        }
    }else if(queryType === 'subject'){
        existing = await ScoreCard.findOne({subject: queryString});
        if(existing){
            const msg = `Querying ${queryType}: ${queryString}`;
            console.log(msg);
            const target = await ScoreCard.find({subject: queryString});
            let messages = [];
            messages.push(msg);
            target.map((t) => {messages.push(`(${t.name}, ${t.subject}, ${t.score})`)})
            return {messages, msg};
        }else{
            const msg = `${queryType} (${queryString}) not found!`;
            console.log(msg);
            const messages = [msg];
            return {messages, msg};
        }
    }
    
};

export {deleteDB, createScoreCard, queryScoreCard};