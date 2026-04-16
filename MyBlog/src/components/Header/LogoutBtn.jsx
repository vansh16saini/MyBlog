import React from 'react'
import {useDispatch} from 'react-redux'
import  authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () =>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button
    className='px-6 py-2 rounded-lg bg-[var(--color-primary)] text-black font-semibold tracking-wide hover:opacity-90 transition-all duration-300'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn