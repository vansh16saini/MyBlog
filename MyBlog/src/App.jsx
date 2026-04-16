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
        dispatch(login({userData:userDate}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setloading(false))
  },[])
  return !loading ? (
    <div className='min-h-screen flex flex-col'>
      <Header/>
      <main className="grow">
          <Outlet />
      </main>
      <Footer/>
    </div>
  ) : (null)
}

export default App
