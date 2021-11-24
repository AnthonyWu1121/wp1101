//clear db

import ScoreCard from "../../models/ScoreCard";

const deleteDB = async () => {
    try{
        await ScoreCard.deleteMany({});
        console.log("Database cleared");
        return ('Database cleared');
    }catch(e){throw new Error("Database deletion failed");}
}

export default deleteDB;