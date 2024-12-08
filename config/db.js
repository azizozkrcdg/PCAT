import mongoose from 'mongoose';
import dotenv from "dotenv";

const connectionDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URI);
        console.log("DB connect succesfull");
    } catch (err) {
        console.log("DB connect failed!!!", err);
    }
}

export default connectionDB