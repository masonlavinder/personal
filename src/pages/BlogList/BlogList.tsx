import React from 'react';
import { blogService } from '../../services/blogService';
import { useEffect, useState } from 'react';
import { BlogPostSummary } from '../../types/blog';
import { Link } from 'react-router-dom';
import MenuBar from '../../components/MenuBar';
import styles from './BlogList.module.css'


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
    <>
      <MenuBar
        items={[
          { id: 'home', label: 'Home', href: '/personal/' },
          { id: 'blog', label: 'Blog', href: '/personal/blog' },
        ]}
      />
      <div className={styles.mainWrapper}>
          <h1>Blog</h1>
          <ul className={styles.postList}>
    {posts.map((post) => (
      <li key={post.id} className={styles.postItem}>
        <Link to={`/personal/blog/${post.slug}`} className={styles.postLink}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <p className={styles.postDate}>{post.publishDate}</p>
        </Link>
      </li>
    ))}
  </ul>
      </div>
    </>
  )
};

export default Blog;