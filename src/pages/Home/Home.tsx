import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { returnComputerImage } from '../../components/ComputerImage.tsx';
import { blogService } from '../../services/blogService';
import { BlogPostSummary } from '../../types/blog';

const Home: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPostSummary[]>([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const allPosts = await blogService.getAllPosts();
        setRecentPosts(allPosts.slice(0, 3));
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <div className={styles.mainWrapper}>
        <div className={styles.content}>
            <div className={styles.contentSplit}>
                <div className={`${styles.contentLeft} ${styles.contentColumn}`}>
                    <div className={styles.contentBubble}>
                        <div className={styles.contentVerticalSplit}>
                            <div>
                                <h1>mason lavinder</h1>
                            </div>
                            <div>{returnComputerImage()}</div>
                        </div>
                    </div>
                    <div className={styles.contentBubble}>
                        <h1>about me</h1>
                        <p>Hey, welcome to my website.  I appreciate you taking a gander.  Hopefully you find it unique (or at least not bad).  I am an engineer focusing on AI and analytics deployement.  I love to run, fish, and touch grass (though clearly a computer guy). </p>
                    </div>
                    <div className={styles.contentBubble}>
                        <h1>my tastes</h1>
                        <h3> Computer </h3>
                        <p> Apple over everything, current have a Mac Pro (intel based) and an first gen iMac.</p>
                        </div>
                </div>
                <div className={`${styles.contentRight} ${styles.contentColumn}`}>
                    <div className={styles.contentBubble}>
                        <h1>where to find me</h1>
                    </div>
                    <div className={styles.contentBubble}>
                        <h1>recent blog</h1>
                        {recentPosts.length > 0 ? (
                            <ul className={styles.recentPostList}>
                                {recentPosts.map((post) => (
                                    <li key={post.id} className={styles.recentPostItem}>
                                        <Link to={`/lavinder/blog/${post.slug}`} className={styles.recentPostLink}>
                                            <h3 className={styles.recentPostTitle}>{post.title}</h3>
                                            <p className={styles.recentPostDate}>{post.publishDate}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Loading recent posts...</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
};

export default Home;
