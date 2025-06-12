const mongoose=require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const connectDB =async()=>
{
    try{
        mongoose.set('strictQuery',false); //so as to remove some error we have made strictquery false
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch(error)
    {
      console.log(error);
    }
}
module.exports=connectDB;
