import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout} from './components/index.js'
import AddTask from "./pages/AddTask.jsx"
import Home from './pages/Home.jsx'
import EditTask from './pages/EditTask.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ViewDetailsTask from './pages/ViewDetailsTask.jsx'

const router = createBrowserRouter([
  {
    path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Home/>,
        },
        {
          path: '/login',
          element:(
            <AuthLayout authentication={false}>
              <Login/>
             </AuthLayout>
          )
        },
        {
          path:'/signup',
          element:(
            <AuthLayout authentication = {false}>
              <Signup/>
            </AuthLayout>
          )
        },
        {
          path: "/add-task",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <AddTask />
              </AuthLayout>
          ),
      },
      {
          path: "/edit-task/:slug",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <EditTask />
              </AuthLayout> 
          ),
      },
      {
        path: "/view-details-task/:slug",
        element: (
            <AuthLayout authentication>
                {" "}
                <ViewDetailsTask />
            </AuthLayout>
        ),
    },
      ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router = {router} />
    </Provider>
  </React.StrictMode>,
)
