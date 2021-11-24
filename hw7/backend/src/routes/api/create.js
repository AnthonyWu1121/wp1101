import ScoreCard from "../../models/ScoreCard";

const createScoreCard = async (name, subject, score) => {
    const existing = await ScoreCard.findOne({name, subject});
    if(existing){
        return (`Updating (${name}, ${subject}, ${score})`);
    }
    try{
        const newScoreCard = new ScoreCard({name, subject, score});
        console.log(`Adding (${name}, ${subject}, ${score})`);
        return newScoreCard.save();
    }catch(e){throw new Error("ScoreCard creation error: " + e);}
};

export default createScoreCard;