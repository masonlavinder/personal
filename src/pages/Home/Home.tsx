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
                            <div className={styles.nameContainer}>
                                <h1 className={styles.nameText}>mason</h1>
                                <h1 className={styles.nameText}>lavinder</h1>
                            </div>
                            <div>{returnComputerImage()}</div>
                        </div>
                    </div>
                    <div className={styles.contentBubble}>
                        <h1>about me</h1>
                        <p>Welcome to my website.  My name is Mason and I am a full stack developer focusing on full stack AI applications.  I originally majored in Aerospace Engineering at Virginia Tech, but got intrested in data science in some of my internships and first job.  I eventually went back to school at night and got my Master's in Data Analytics Engineering in George Mason where I studied data engineering, analytics, and artificial intelligence.  I am currently working on a full stack AI project. </p>
                    </div>
                    <div className={styles.contentBubble}>
                        <h1>my tastes</h1>
                        <h3> Computer </h3>
                        <p> I am a big Apple guy. BUT I also have learned the ways of Ubuntu. I have a mediocre work-issued Dell with Ubuntu and an M1 iMac at home.</p>
                        <h3> Keyboard </h3>
                        <p> I never thought I would be a keyboard guy.  But I know have a Keychron Q1 Max with Gateron Jupiter Red's for daily use and a NuPhy Air60 V2 for travel. </p> 
                        </div>
                </div>
                <div className={`${styles.contentRight} ${styles.contentColumn}`}>
                    <div className={styles.contentBubble}>
                        <h1>where to find me</h1>
                        <div className={styles.socialLinksContainer}>
                            <a
                                href="https://www.linkedin.com/in/mason-lavinder/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.linkedinLink}
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/masonlavinder"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.linkedinLink}
                            >
                                GitHub
                            </a>
                        </div>
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
