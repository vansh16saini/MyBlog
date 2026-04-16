import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config.js'
function PostCard({$id , title, featuredImage} ) {
  return (
    <Link to={`/post/${$id}`} className="block group">
  
  <div className="w-full bg-[var(--color-surface)]/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:border-[var(--color-primary)]">
    
    <div className="w-full mb-4 overflow-hidden rounded-lg">
      <img
        src={service.getFileView(featuredImage)}
        alt={title}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <h2 className="text-lg font-semibold tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
      {title}
    </h2>

  </div>

</Link>
  )
}

export default PostCard