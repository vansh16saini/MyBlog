import React, {useEffect, useState} from 'react'
import service from "../appwrite/config";
import {Container, PostCard , Button} from '../components'
import { Link } from 'react-router-dom';
function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts && posts.rows) {
                setPosts(posts.rows)
            }
        })
        .catch((error) => {
            console.error("Error fetching posts:", error);
        });
    }, [])
  
    if (posts.length === 0) {
    return (
        <div className="w-full pt-24 pb-12">
        <Container>
            
            <div className="flex flex-col items-center justify-center text-center py-24 border border-white/10 rounded-xl bg-[var(--color-surface)]/40 backdrop-blur-xl">
            
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text)] mb-4">
                No Posts Yet
            </h1>

            <p className="text-[var(--color-muted)] mb-6 max-w-md">
                Looks like there’s nothing here yet. Start creating and share your thoughts with the world.
            </p>

            <Link to="/add-post">
                <Button variant="primary">
                Create First Post
                </Button>
            </Link>

            </div>

        </Container>
        </div>
    );
    }
    return (
        <div className="w-full pt-24 pb-12">
            
            <Container>
            
            {/* Heading */}
            <div className="mb-10 flex items-end justify-between">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text)]">
                Latest Posts
                </h1>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {posts?.map((post) =>
                    post ? <PostCard key={post.$id} {...post} /> : null
                )}
            </div>

            </Container>

        </div>
    )
}

export default Home