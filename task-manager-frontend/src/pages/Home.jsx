import React, { useState, useEffect } from 'react';
import taskService from '../Auth/config'; // Assuming this imports your service correctly
import { Container, TaskCard, Column, Button } from '../components/index';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

      taskService.getTasks([])
      .then( (task) => {
        // console.log(task)
        setTasks(task)
      })

    }, []); 

    return (
        <div>
            <Container>
                <Button
                    className='mt-8'
                    onClick={() => {
                        // console.log('navigate to add- task');
                        navigate('/add-task');
                    }}
                >
                    Add Task
                </Button>
                <div className='flex flex-nowrap w-fit'>
                    <Column stage={'TODO'}>
                        <div className='flex flex-wrap'>
                            {tasks &&
                                tasks.map((task) => (
                                    <TaskCard
                                        key={task._id}
                                        title={task.title}
                                        content={task.content}
                                        createdAt={new Date(task.createdAt).toLocaleString()}
                                    />
                                ))}
                        </div>
                    </Column>
                    <Column stage={'IN PROGRESS'}>
                        <div className='flex flex-wrap'>
                            <TaskCard
                                title={'Task 1'}
                                content={'task 1 description'}
                                createdAt={'23/07/2024'}
                            />
                        </div>
                    </Column>
                    <Column stage={'DONE'}>
                        <div className='flex flex-wrap'>
                            <TaskCard
                                title={'Task 1'}
                                content={'task 1 description'}
                                createdAt={'23/07/2024'}
                            />
                        </div>
                    </Column>
                </div>
            </Container>
        </div>
    );
}

export default Home;
