// MonGo DB connection 

import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res) => console.log("mongo db connection created"));

const db = mongoose.connection;

export default db;