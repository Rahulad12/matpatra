import mongoose from 'mongoose';

const Database = async() =>{
 try{
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
 }
    catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

export default Database;