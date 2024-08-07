import React, {useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input,} from './index'
import authService from '../Auth/auth'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'



function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        console.log(data)
        setError("")  
        try {
           
            const session = await authService.login(data.email, data.password)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                }
                
                navigate("/")
            }
        } catch (error) {   
            setError("Invalid Password or Email")
        }
    }


  return (
    
    <div className=' items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg `}>
            <h1 className='text-blue-600 font-bold text-4xl mb-6'>Login</h1>
        </div>
        <div className={`mx-auto w-full max-w-lg rounded-xl p-8 border-2 border-blue-800`}>
            
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-2 text-left font-semibold'>
                <div className="space-y-5 ">
                    <Input 
                        type = "email"
                        placeholder = "Enter your email"
                        {...register("email",{
                            required:true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input 
                        type = "password"
                        placeholder = "Enter your password"
                        {...register("password",{
                            required: true
                        })}
                    />
                    <Button
                    type="submit"
                    className="w-full"
                    >
                        Login
                    </Button>
                    <p className="mt-2 text-center text-base text-black">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                           <span className='text-blue-600'> Signup</span> 
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login