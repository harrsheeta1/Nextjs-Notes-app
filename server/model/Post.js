// Post is basically for the schema desgining 
const mongoose=require('mongoose');
// database built 
//mongoose.schema is a class that allows you to define structure of documents in MOngoDb Collection
const Schema=mongoose.Schema;
//PostSchema is a object of the Schema
const PostSchema=new Schema(
    {
   
      body :{
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
       user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User', // connects to User schema
       required: true
  }}                                                   
);
module.exports = mongoose.model('Post', PostSchema);
// mongoose is a library which contains the information and all realted stuff about mongodb 
//model function binds the schema to the MOngoDb collection allowing for the seamless interaction with the database