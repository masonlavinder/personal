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
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

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

    // Get unique tags from all posts
    const allTags = Array.from(
        new Set(
            posts.flatMap(post => post.tags || [])
        )
    ).sort();

    useEffect(() => {
        let filtered = posts;

        // Filter by tag
        if (selectedTag) {
            filtered = filtered.filter(post =>
                post.tags && post.tags.includes(selectedTag)
            );
        }

        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        setFilteredPosts(filtered);
    }, [searchQuery, posts, selectedTag]);

    const handleTagClick = (tag: string) => {
        setSelectedTag(selectedTag === tag ? null : tag);
    };


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
          <div className={styles.tagFilters}>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`${styles.tagButton} ${selectedTag === tag ? styles.tagButtonActive : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
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