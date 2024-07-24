import React, {useEffect, useState} from 'react'
import { Container, TaskForm, Button } from "../components/index"
import taskService from '../Auth/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditTask(  ) {

    const [ task, setTasks] = useState()
    const { taskId } = useParams()
    const navigate  = useNavigate()

    useEffect( () => {
        if (taskId) {
            taskService.getTask(taskId).then( (task) => {
                if (task) {
                    setTasks(task)
                }
            }).catch(
                (error) => {
                    console.log("error while fetching task", error)
                }
            )
        }
    }, [taskId])

    const saveHandler = () => {}


  return (
    <div className='py-8'>
        <Container>
            <h1 className='text-gray-900 text-center font-bold text-4xl mb-6'>Edit Task</h1>
            <TaskForm  task={task} />
            <br />
            <div className='float-right px-32'>
            <Button  bgColor="bg-blue-400" onClick = {saveHandler}> Save </Button> &nbsp;
            <Button  bgColor='bg-red-400'
            onClick={ () => {
                console.log("navigate to Home")
                navigate("/")}}
                > Cancel </Button> 
            </div>
      
        </Container>
    </div>
  )
}

export default EditTask