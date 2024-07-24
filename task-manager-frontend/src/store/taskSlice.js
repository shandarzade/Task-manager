import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    tasks: [ {
        id: 1,
        task : "task 1"
    }]
    
}

const taskSlice = createSlice( {
    name: "task",
    initialState,
    reducers : {
        addTask : (state, action) => {
            const task = {
                id :  nanoid(),
                task : action.payload
            }
            state.tasks.push(task)
        },
        deleteTask : (state, action) => {
            state.tasks = state.tasks.filter( (task) => 
            task.id !== action.payload)
        },
        updateTask : (state, action) => {
            const { id, task } = action.payload;
            const existingTask = state.tasks.find(t => t.id === id);
            if (existingTask) {
                existingTask.task = task;
            }
        }
    }
} )

export const {addTask, deleteTask, updateTask} = taskSlice.actions

export default taskSlice.reducer
