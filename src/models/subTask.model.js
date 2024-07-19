import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema(
{

    content:{
        type:String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, 
{timestamps:true})

export const SubTask = mongoose.model("SubTask", subTaskSchema)