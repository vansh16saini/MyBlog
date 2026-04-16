import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="w-full pt-24 pb-12">
        
        <Container>
            
            {/* Image */}
            <div className="w-full relative mb-8 rounded-xl overflow-hidden border border-white/10 bg-[var(--color-surface)]/40 backdrop-blur-xl">
            
            <div className="w-full aspect-video flex items-center justify-center bg-black/20">
                <img
                src={service.getFileView(post.featuredImage)}
                alt={post.title}
                className="max-h-full max-w-full object-contain"
                />
            </div>

            {isAuthor && (
                <div className="absolute top-4 right-4 flex gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                    <Button variant="outline">Edit</Button>
                </Link>
                <Button variant="primary" onClick={deletePost}>
                    Delete
                </Button>
                </div>
            )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text)] mb-6">
            {post.title}
            </h1>

            {/* Content */}
            <div className="prose prose-invert max-w-none text-[var(--color-muted)]">
            {parse(post.content)}
            </div>

        </Container>

        </div>
) : null;
}