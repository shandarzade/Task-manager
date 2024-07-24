import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../Auth/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(
            () => {
                dispatch(logout())
            }
        ).catch ( (error) => {
            console.log("error while logout")
        })
    }

  return (
    <button
        className='inline-bock px-6 py-2 duration-200 hover:text-gray-950 hover:bg-blue-100 rounded-full text-xl'
        onClick={logoutHandler}
    >   Logout
    </button>
  )
}

export default LogoutBtn