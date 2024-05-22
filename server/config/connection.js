import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = async () => {
  mongoose.connect(process.env.MONGO_DB_URL).then((con) => {
    console.log("MongoDb Connected Successfully");
  });
};

export default connection;
