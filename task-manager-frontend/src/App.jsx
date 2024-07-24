import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './Auth/auth'
import { login, logout,  } from './store/authSlice'
import { addTask, deleteTask  } from './store/taskSlice'
import Header from './components/Header/Header'
import taskService from './Auth/config'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddTask from './pages/AddTask'
import { TaskCard, Column } from './components/index'
import EditTask from './pages/EditTask'
import { Outlet } from 'react-router-dom'

function App() {
  // const [loading, setLoading] = useState(true)
  // const [tasks, setTasks] = useState([])

  // const dispatch = useDispatch()

  // useEffect( () => {
  //   authService.getCurrentUser()
  //   .then( (userData) => {
  //     if(userData){
  //       dispatch(login(userData))
  //     }else{
  //       dispatch(logout)
  //     }
  //   })
  //   .finally( () => setLoading(false))
  // }, [])

  // useEffect( () => {
  //   taskService.getTask()
  //   .then( (userData) => {
  //     if(userData){
  //       dispatch(addTask(userData))
  //     }
  //   })
  //   .finally( () => setLoading(false))
  // }, [])


  // console.log(`${import.meta.env.VITE_BASE_URL}/users/register`)

  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/v1/tasks/get-task")
  //     .then((response) => {
  //       console.log(response.data.data)
  //       if (Array.isArray(response.data.data)) {
  //         setTasks(response.data.data)
  //       }else {
  //         console.error("Data received is neither an array nor an object:", response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }, [])

  return  (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
          <Header /> 
          <Outlet />         
      </div>
    </div>
  ) 

      {/* <p>Number of tasks: {tasks.length}</p>
      {
        tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.content}</p>
            <p>Created at: {new Date(task.createdAt).toLocaleDateString()} {new Date(task.createdAt).toLocaleTimeString()}</p>
          </div>
        ))
      } */}
    
  
}

export default App
