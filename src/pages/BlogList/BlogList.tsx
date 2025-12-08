import React from 'react';
import { blogService } from '../../services/blogService';
import { useEffect, useState } from 'react';
import { BlogPostSummary } from '../../types/blog';
import { Link } from 'react-router-dom';
import styles from './BlogList.module.css'


export const Blog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPostSummary[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState<BlogPostSummary[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const listOfPosts = await blogService.getAllPosts();
            setPosts(listOfPosts);
            setFilteredPosts(listOfPosts);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };

        fetchPosts();
      }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPosts(posts);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = posts.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.tags.some(tag => tag.toLowerCase().includes(query))
            );
            setFilteredPosts(filtered);
        }
    }, [searchQuery, posts]);


    return (
      <div className={styles.mainWrapper}>
          <h1 className={styles.blogListTitle}>the blog list</h1>
          <input
            type="text"
            placeholder="search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <ul className={styles.postList}>
    {filteredPosts.map((post) => (
      <li key={post.id} className={styles.postItem}>
        <Link to={`/lavinder/blog/${post.slug}`} className={styles.postLink}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <p className={styles.postExcerpt}>{post.excerpt}</p>
          <p className={styles.postDate}>{post.publishDate}</p>
        </Link>
      </li>
    ))}
  </ul>
      </div>
  )
};

export default Blog;