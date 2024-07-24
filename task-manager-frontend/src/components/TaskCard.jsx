import React from 'react';
import Button from './Button'; 
import taskService from '../Auth/config';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ id, title, content, createdAt }) => {

    const navigate = useNavigate()

    const deleteHandler = () => {
        console.log("deleteHandler called")
    }

    return (
        <div className='w-full bg-blue-300 rounded-xl p-4 mb-2'>
            <div className='w-full justify-center mb-4'>
                <h2 className='text-xl font-bold'>{title}</h2>
                <p className='text-l font-normal'>{content}</p>
                <p className='text-l font-normal mt-6'>{createdAt}</p>
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
                    onClick={ () => {
                    console.log("navigate to edit-task")
                    navigate(`/edit-task/${id}`)}} 
                >
                    Edit
                </Button>&nbsp;
                <Button
                    type="submit"
                    bgColor="bg-blue-800"
                    onClick={ () => {
                    console.log("navigate to view-details-task/id")
                    navigate("/view-details-task/id")}} 
                >
                    View details
                </Button>
            </div>
        </div>
    );
}

export default TaskCard;
