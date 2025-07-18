import React from 'react';
import { blogService } from '../services/blogService';
import { useEffect, useState } from 'react';
import { BlogPostSummary } from '../types/blog';
import { Link } from 'react-router-dom';
import '../styles/Blog.css'


export const Blog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPostSummary[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const listOfPosts = await blogService.getAllPosts();
            setPosts(listOfPosts);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
      
        fetchPosts();
      }, []);
      
  
    return (
    <div className="main-wrapper">
        <h1>Blog</h1>
        <ul className="post-list">
  {posts.map((post) => (
    <li key={post.id} className="post-item">
      <Link to={`/personal/blog/${post.slug}`} className="post-link">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-date">{post.publishDate}</p>
      </Link>
    </li>
  ))}
</ul>
    </div>
  )
};

export default Blog;