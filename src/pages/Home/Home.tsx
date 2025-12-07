import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import MenuBar from '../../components/MenuBar.tsx';
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
        <div className={styles.header}>
            <MenuBar
                items={[
                    { id: 'home', label: 'Home', href: '/personal/' },
                    { id: 'blog', label: 'Blog', href: '/personal/blog' },
                ]}
                className={styles.headerMenu}
                onItemClick={(item) => console.log(`Clicked on ${item.label}`)}
                themeButton={{
                    label: 'Switch it up',
                    onClick: () => console.log('Theme toggled')
                }}
                />
        </div>
        <div className={styles.content}>
            <div className={styles.contentSplit}>
                <div className={`${styles.contentLeft} ${styles.contentColumn}`}>
                    <div className={styles.contentBubble}>
                        <div className={styles.contentSplit}>
                            <p>{returnComputerImage()}</p>
                            <div>
                                <h1>Lavinder</h1>
                            </div>
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
                                        <Link to={`/personal/blog/${post.slug}`} className={styles.recentPostLink}>
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
