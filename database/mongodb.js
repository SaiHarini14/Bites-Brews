import mongoose from "mongoose";
import { DB_URI,NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error(`Please define the DB_URI in .env.${NODE_ENV}.local`)
}

export let conn = null;

const connectToDatabase = async() =>{
    try{
        await mongoose.connect(DB_URI);
        conn = await mongoose.connection;
        console.log(`Connect to DB in ${NODE_ENV} mode`);
    }
    catch(error){
        console.error('Error connecting to DB: ', error);
        process.exit(1);
    }
}
export default connectToDatabase;