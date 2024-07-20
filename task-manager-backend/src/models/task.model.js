// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema({

//     content:{
//         type:String,
//         required: true
//     },
//     complete: {
//         type: Boolean,
//         default: false
//     },
    
//     createdBy:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     subTasks:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "SubTask"
//     }

// }, {timestamps:true})

// export const Task = mongoose.model("Task", taskSchema)