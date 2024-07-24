import React from 'react'
import { LogoutBtn, Container, Logo, Button } from "../index.js"
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


function Header() {
  const authStatus = useSelector( (state) => state.auth.status)
  const navigate = useNavigate()

  // const navItems = [ 
  //   {
  //     name: "Login",
  //     slug: "/login",
  //     // active: !authStatus,
  // },
  // {
  //     name: "Signup",
  //     slug: "/signup",
  //     // active: !authStatus,
  // },
  // {
  //     name: "Add Task",
  //     slug: "/add-task",
  //     // active: !authStatus,
  // },
  // ]

  return (
    <header className='py-3 shadow bg-blue-500 '>
      <Container>
      <nav className='flex'>
          <div className="mr-4">
            <Link>
              <Logo width='40px ' />
            </Link>    
          </div>
          <ul className='flex ml-auto'>
            <li key = "login">
              <button 
              onClick={ () => navigate("/login")}
              className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-gray-950 rounded-full text-xl'
              > 
              Login
              </button>
            </li>
            <li key = "signup">
              <button 
              onClick={ () => navigate("/signup")}
              className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-gray-950 rounded-full text-xl'
              > 
              Signup
              </button>
            </li>
            
            {authStatus && (
              <li> 
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header