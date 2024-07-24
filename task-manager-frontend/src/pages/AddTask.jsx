import React, { useState } from 'react';
import { Container, TaskForm, Button } from "../components/index";
import { useNavigate } from 'react-router-dom';
import Home from './Home';

function AddTask() {
  const [showTaskForm, setShowTaskForm] = useState(true);
  const navigate = useNavigate()

  const openTaskForm = () => {
    setShowTaskForm(true);
  };

  const closeTaskForm = () => {
    setShowTaskForm(false);
  };

  return (
    <div className='py-8'>
      <Container>
            <h1 className='text-gray-900 text-center font-bold text-4xl mb-6'>Add Task</h1>
            <TaskForm  />
            
            <br />
            <div className='float-right px-32'>
            <Button  bgColor="bg-blue-400" onClick={ () => {
              console.log("navigate to Home")
              navigate("/")}}> Close </Button>
            </div>
      
        </Container>
    </div>
  );
}

export default AddTask;
