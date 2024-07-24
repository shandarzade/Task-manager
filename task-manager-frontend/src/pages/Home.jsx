import React, {useState, useEffect} from 'react'
import taskService from '../Auth/config'
import { Container, TaskCard, Column, Button } from "../components/index"
import { useNavigate } from 'react-router-dom'

function Home() {

    const [ tasks, setTasks] = useState([])
    const navigate = useNavigate()

    useEffect( () => {
      taskService.getTasks().then(
        (response) => {
          if (response) {
            setTasks(response.documents);
        }
        }
      ).catch ( (error) => {
        console.log("Error while fetching tasks:", error);
      })
    }, [])

  return (
    <div>
      <Container>
        <Button className='mt-8' onClick={ () => {
              console.log("navigate to add- task")
              navigate("/add-task")}} > Add Task
        </Button>
        <div className='flex flex-nowrap w-fit'>
          <Column stage={"TODO"}>
            <div className='flex flex-wrap'>
            <TaskCard title={"Task 1"} content={"task 1 description"}
              createdAt = {"23/07/2024"} />
              <TaskCard title={"Task 1"} content={"task 1 description"}
              createdAt = {"23/07/2024"} />
    
                  </div>
              {/* {tasks && tasks.map((task) => (
                  <div className='p-2 w-full sm:w-1/4' key={task.$id}>
                     </div>  
              ))} */}
             
            </Column>
          <Column stage={"IN PROGRESS"}>
          <div className='flex flex-wrap'>
            <TaskCard title={"Task 1"} content={"task 1 description"}
    createdAt = {"23/07/2024"} />
                  </div>
          </Column>
          <Column stage={"DONE"}>
          <div className='flex flex-wrap'>
          <TaskCard title={"Task 1"} content={"task 1 description"}
  createdAt = {"23/07/2024"} />
                </div>
          </Column>
        </div>
          
      </Container>
    </div>
  )
}

export default Home