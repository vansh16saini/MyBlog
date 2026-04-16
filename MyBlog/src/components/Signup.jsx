import React , {useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error,setError] = useState('')
    const {register, handleSubmit} = useForm()
    const createAccount = async(data) =>{
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const userDataa = await authService.getCurrentUser()
                if(userDataa) dispatch(login(userDataa));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-[var(--color-surface)]/60 backdrop-blur-xl border border-white/10 rounded-xl p-10 shadow-lg">
            
            <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--color-text)]">
            Create your account
            </h2>

            <p className="mt-2 text-center text-sm text-[var(--color-muted)]">
            Already have an account?{" "}
            <Link
                to="/login"
                className="text-[var(--color-primary)] hover:underline transition-all"
            >
                Sign In
            </Link>
            </p>

            {error && (
            <p className="text-red-500 mt-6 text-center text-sm">{error}</p>
            )}

            <form onSubmit={handleSubmit(createAccount)} className="mt-8 space-y-5">
            
            <Input
                label="Name"
                placeholder="Enter your name"
                className="bg-transparent border border-white/10 focus:border-[var(--color-primary)]"
                {...register("name", {
                required: true,
                })}
            />

            <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                className="bg-transparent border border-white/10 focus:border-[var(--color-primary)]"
                {...register("email", {
                required: true,
                validate: {
                    matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email must be valid",
                },
                })}
            />

            <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                className="bg-transparent border border-white/10 focus:border-[var(--color-primary)]"
                {...register("password", {
                required: true,
                })}
            />

            <Button
                type="submit"
                variant="primary"
                className="w-full cursor-pointer"
            >
                Create Account
            </Button>

            </form>

        </div>
    </div>
  )
}

export default Signup