import React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import taskService from '../Auth/config';
import { Button, Input } from "./index";

function TaskForm({ task }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: task?.title || "",
            content: task?.content || "",
        },
    });

    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        try {
            if (task) {
                const updatedTask = {
                    ...formData,
                };
                const dbUpdate = await taskService.updateTask(task.$id, updatedTask);
                if (dbUpdate) {
                    navigate(`/`);
                }
            } else {
                const newTask = {
                    ...formData,
                };
                const dbPost = await taskService.createTask(newTask);
                if (dbPost) {
                    navigate(`/`);
                }
            }
            reset()
        } catch (error) {
            console.error("Error submitting task:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap text-left font-semibold">
            <div className="w-full px-32">
            {errors.title && <span className="text-red-500">Title is required</span>}
                <Input
                    label="Task Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                

                <label htmlFor="description">Description:</label><br />
                <textarea
                    id="description"
                    name="content"
                    {...register("content", { required: true })}
                    className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-blue-600 w-full"
                ></textarea>
                {errors.content && <span className="text-red-500">Content is required</span>}
                <Button type="submit" bgColor={task ? "bg-green-500" : undefined} className="w-full mt-4">
                    {task ? "Update" : "Submit"}
                </Button>
                
            </div>
        </form>
    );
}

export default TaskForm;
