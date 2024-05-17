import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    parties:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    symbol:{
        type:String,
        required:true
    
    },
    description:{
        type:String,
        required:true
    },
    votes:{
        type:Number,
        required:true,
        default:0
    }

});

const Candidate = mongoose.model("Candidate",candidateSchema);

export default Candidate;

