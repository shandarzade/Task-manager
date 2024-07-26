import React from 'react'; 
import { Container,  Button, TaskList } from '../components/index';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()


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

                <TaskList />
               
            </Container>
        </div>
    );
}

export default Home;
