const mongoose=require('mongoose');
// database built 
//mongoose.schema is a class that allows you to define structure of documents in MOngoDb Collection
const Schema=mongoose.Schema;
//PostSchema is a object of the Schema
const UserSchema=new Schema({
        username:{
        type:String,
        required :true,
        unique:true
       },
       password:{
        type:String,
        required:true
       },
         
    });
module.exports = mongoose.model('User', UserSchema);