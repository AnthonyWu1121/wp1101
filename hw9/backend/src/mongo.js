import dotenv from  'dotenv-defaults';
import mongoose from "mongoose";

export default () => {
    dotenv.config();

    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((res) => console.log("mongo db connection created"));

    const db = mongoose.connection;

    db.once("open", () => {
        console.log("Mongo databaase connected!");
    })
}