import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="bg-(--color-background) border-t border-white/5">
            <div className="max-w-480 mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <Logo/>
                <div className="flex items-center space-x-6 text-sm text-var(--color-muted)">
                    <a href="#" className="hover:text-(--color-primary) transition-colors">Privacy</a>
                    <a href="#" className="hover:text-(--color-primary) transition-colors">Terms</a>
                    <a href="#" className="hover:text-(--color-primary) transition-colors">Contact</a>
                </div>

                <p className="text-xs text-(--color-muted)/60">
                © {new Date().getFullYear()} MyBlog. All rights reserved.
                </p>
            </div>
        </footer>
  )
}

export default Footer