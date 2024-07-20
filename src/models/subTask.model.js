import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema(
{
    title:{
        type: String,
        required: true
    },
    content:{
        type:String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
}, 
{timestamps:true})

export const SubTask = mongoose.model("SubTask", subTaskSchema)