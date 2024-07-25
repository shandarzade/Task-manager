import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button, Input,} from './index'
import authService from '../Auth/auth'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'

function Signup() {
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const create = async (data) => {
        console.log(data)
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                }
                
            }
            navigate("/")

        } catch (error) {
            setError(error.message)
        }
    }

  return (
    
    <div className=" items-center justify-center">
        <div className={`mx-auto w-full max-w-lg `}>
            <h1 className='text-blue-600 font-bold text-4xl mb-6'>Signup</h1>
        </div>
        <div className={`mx-auto w-full max-w-lg  rounded-xl p-8 border-2 border-blue-800`}>  
        
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
            <div className='space-y-5 mt-2 text-left font-semibold'>
                <Input 
                    placeholder = "Fisrt Name"
                    {...register("firstName", {
                        required:true}
                    )}
                />
                <Input 
                    placeholder = "Last Name"
                    {...register("lastName", {
                        required:true}
                    )}
                />
                <Input 
                    placeholder = "Email"
                    type = "email"
                    {...register("email", {
                        required:true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                />
                <Input
    
                    placeholder = "Password"
                    type = "password"
                    {...register("password", {
                        required:true,
                    })}
                />
                <Input
                    placeholder = "Confirm password"
                    type = "password"
                    {...register("Confirm password", {
                        required:true,
                    })}
                />
                <Button type="submit" className="w-full">
                    Create Account
                </Button>

                <p className="mt-2 text-center text-base text-black">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                       <span className='text-blue-600'>Login</span> 
                    </Link>
                </p>
            </div>
        </form>
        </div>
    </div>
    
  )
}

export default Signup