import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";

async function connect() {
  // TODO 1.1 Connect your MongoDB
  // dotenv.config();

  mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  }).then((res) => console.log("mongo db connection created"));

  const db = mongoose.connection;

  db.once("open", () => {
    // dataInit();
    console.log("Mongo databaase connected!");
  })
}

export default { connect };