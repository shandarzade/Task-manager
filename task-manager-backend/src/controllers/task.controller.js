import { User } from "../models/user.model.js";
import { SubTask } from  "../models/subTask.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const getTask = asyncHandler( async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await SubTask.findById(taskId);
    
        if(!task){
            throw new ApiError(400, "Task not found")
        }
    
        return res.status(200)
        .json(
            new ApiResponse(
                200,
                task,
                "Tasks fetch succesfully"
            )
        )
    } catch (error) {
        throw new ApiError(400, "something went wrong while getting the tasks")
    }
} )

const addTask = asyncHandler( async (req, res) => {
    
    const {title, content} = req.body

    if(!title || !content){
        throw new ApiError(400, "All fields are required")
    }

    const task = await SubTask.create(
        {
            title,
            content
        }
    )

    const createdTask =  await SubTask.findById(task._id)
    
    if(!createdTask){
        throw new ApiError(500, "Something went wrong while creating task")
    }

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            createdTask,
            "Task created successfully"
        )
    )
    
})

const updateTask = asyncHandler( async (req, res) => {
    const  {oldTitle, newTitle, oldContent, newContent} = req.body

    const taskId = req.task?._id;

    if (!taskId) {
        throw new ApiError(400, "Task ID is required");
    }
    if (!oldTitle || !oldContent || !newTitle || !newContent) {
        throw new ApiError(400, "Old title, old content, new title, and new content are all required");
    }

    const task = await SubTask.findById(taskId);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    task.title = newTitle
    task.content = newContent
    await task.save( { validateBeforeSave: false })

    return res.status(200)
    .json( new ApiResponse(
        200,
        task,
        "Task update successfully"
    ) )
})

const deleteTask = asyncHandler(async (req, res) => {
    try {
        const task = await SubTask.findByIdAndDelete(req.task?._id);
        
        if (!task) {
            return res.status(404).json(new ApiResponse(
                404,
                null,
                "Task not found"
            ));
        }
        
        return res.status(200).json(new ApiResponse(
            200,
            task,
            "Task deleted successfully"
        ));
    } catch (error) {
        // Handle any errors that occur during the deletion process
        return res.status(500).json(new ApiResponse(
            500,
            null,
            "Internal server error"
        ));
    }
});

const getAllTask = asyncHandler( async (req, res) => {

    try {
        const tasks = await SubTask.find()

        if(!tasks){
            throw new ApiError(400, "Tasks are not found")
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                tasks,
                "Tasks fetch succesfully"
            )
        )
    } catch (error) {
        throw new ApiError(400, "something went wrong while getting the tasks")
    }
} )


export { 
    getTask,
    addTask,
    updateTask,
    deleteTask,
    getAllTask
 }
