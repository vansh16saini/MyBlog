import React , {useState, useEffect}from 'react'
import service from '../appwrite/config'
import { Container, PostCard} from '../components'
export default function AllPosts() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
            service.getPosts().then((posts)=> {
        
        if(posts && posts.rows){
            setPosts(posts.rows)
        }
    })
    },[])

    
  return (
    <div className="w-full pt-24">
    
        <Container>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
            ))}
            </div>

        </Container>

    </div>
  )
}
