import React , {useState }from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [error,setError] = useState("")
    const login = async(data)=>{
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(authLogin(userData))
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='w-full min-h-[calc(100vh-80px)] flex items-center justify-center px-6'>
        <div className='w-full max-w-md bg-(--color-surface)/60 backdrop-blur-xl border border-white/10 rounded-xl p-10 shadow-lg'>

            <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--color-text)]">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-[var(--color-muted)]">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="text-(--color-primary) hover:underline transition-all"
                    >
                        Sign Up
                    </Link>
            </p>
            {error && <p className="text-red-500 mt-6 text-center text-sm">{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8 space-y-5'>
                <div className='space-y-5'>
                    <Input
                    label="Email: "
                    placeholder= "Enter your email"
                    type = "email"
                    className='bg-transparent border border-white/10 focus:border-(--color-primary)'
                    {...register("email",{
                        required: true,
                        validate:{
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    className="bg-transparent border border-white/10 focus:border-(--color-primary)"
                    {...register("password",{
                        required:true,
                    })}
                    />
                    <Button
                    type="submit"
                    className='w-full bg-(--color-primary) text-black font-semibold py-2.5 rounded-lg hover:opacity-90 transition-all cursor-pointer'
                    >Sign In</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login