import React , {useState, useEffect}from 'react'
import service from '../appwrite/config'
import { Container, PostCard} from '../components'
export default function AllPosts() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
            service.getPosts().then((posts)=> {
        console.log("Response",posts);
        
        if(posts && posts.rows){
            setPosts(posts.rows)
        }
    })
    },[])

    
  return (
    <div className='w-full pt-20'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}
