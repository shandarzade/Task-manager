import React from 'react'
import { Container, Button } from '../components/index'
import { useNavigate } from 'react-router-dom'

function ViewDetailsTask(task) {
  console.log(task)

  const navigate = useNavigate()

  return (
    <div className='bg-gray-400 p-12 min-h-screen'>
    <Container >
      <div className='bg-white p-8 pb-12'>
        <h1 className='text-gray-900 text-center font-bold text-4xl mb-6 mt-4'>Task Details</h1>
        <h2>Title: {task.title}</h2>
        <p>Description: {task.content}</p> 
        <p>Created at: {task.createdAt}</p>
       
        {/* <h2 className='font-bold text-lg'>Title: Task 1</h2>
        <p>Description: Task 1 description</p>
        <p>Created at: 25/01/2024</p> */}
        <div className='float-right '>
            <Button  bgColor="bg-blue-800" onClick={ () => {
              console.log("navigate to Home")
              navigate("/")}}> Close 
            </Button>
        </div>
      </div>
    </Container>
    </div>
  )
}

export default ViewDetailsTask