import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import {Footer, Header} from './components/index'
import './App.css'
import {Outlet} from 'react-router-dom'
function App() {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userDate)=>{
      if (userDate) {
        dispatch(login({userDate}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setloading(false))
  },[])
  return !loading ? (
    <div className=' min-h-sc '>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  ) : (null)
}

export default App
