import React from 'react';
import Button from './Button'; 
import taskService from '../Auth/config';
import { useNavigate } from 'react-router-dom';
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, index}) => {
    const navigate = useNavigate();

    const deleteHandler = () => {
        console.log("deleteHandler called");
    };

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className='w-full bg-blue-300 rounded-xl p-4 mb-2'>
                        <div className='w-full justify-center mb-4'>
                            <h2 className='text-xl font-bold'>{task.title}</h2>
                            <p className='text-l font-normal'>{task.content}</p>
                            <p className='text-l font-normal mt-6'>{new Date(task.createdAt).toLocaleString()}</p>
                        </div>
                        <div className='flex flex-nowrap'>
                            <Button
                                type="submit"
                                bgColor="bg-red-800"
                                onClick={deleteHandler}
                            >
                                Delete
                            </Button>&nbsp;
                            <Button
                                type="submit"
                                bgColor="bg-green-800"
                                onClick={() => {
                                    navigate(`/edit-task/${task._id}`);
                                }} 
                            >
                                Edit
                            </Button>&nbsp;
                            <Button
                                type="submit"
                                bgColor="bg-blue-800"
                                onClick={() => {
                                    console.log(`navigate to view-details-task/${task._id}`);
                                    navigate(`/view-details-task/${task._id}`);
                                }} 
                            >
                                View details
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;
