import React from 'react'
import {Container,Logo,LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {
  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
        name: "Login",
        slug: "/login",
        active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },
  ]
  return (
        <nav className='fixed top-0 w-full z-50 bg-[var(--color-background)]/40 backdrop-blur-xl border-b border-white/5"'>
          <div className='max-w-[1920px] mx-auto px-6 py-4 flex items-center'>
            <Link to='/'>
              <Logo width='70px'/>
            </Link>

            <ul className='flex items-center ml-auto space-x-6'>
              {navItems.map((item)=>
                item.active ? (
                  <li key={item.name}>
                    <button
                    onClick={()=>navigate(item.slug)}
                    className='px-6 py-2 text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-all duration-300 font-medium tracking-tight'
                    >{item.name}</button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn/>
                </li>
              )}
            </ul>
          </div>
        </nav>
  )
}

export default Header