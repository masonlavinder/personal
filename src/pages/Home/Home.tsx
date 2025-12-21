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
                        <p>Welcome to my website! My name is Mason and I'm a full stack developer specializing in AI applications.</p>
                        <p>My career started with a degree in Aerospace Engineering from Virginia Tech, but I discovered my passion for data science through internships and my first job. That curiosity led me back to school, studying at night to earn my Master's in Data Analytics Engineering from George Mason University, where I studied data engineering, analytics, and AI.</p>
                        <p>When I first started at MPR, I worked on a variety of applications, from medical devices to nuclear reactor design, mostly focused around software and data engineering. During these projects, I realized the importance of software engineering to data and machine learning projects and spent time honing my skills, not just around analysis, but software at scale.</p>
                        <p>These days, I'm still at MPR Associates but I am focused on building practical AI solutions for the engineering world, working with technologies like RAG databases, React, Python, SQLAlchemy, AWS, and more to create tools that solve real problems.</p>
                    </div>
                    <div className={styles.contentBubble}>
                        <h1>my tastes</h1>
                        <h3>Computer </h3>
                        <p>I am a big Apple guy. BUT I also have learned the ways of Ubuntu. I work with a work-issued Dell with Ubuntu and an M1 iMac at home.</p>
                        <h3>Keyboard </h3>
                        <p>I never thought I would be a keyboard guy.  But I know have a Keychron Q1 Max with Gateron Jupiter Red's for daily use and a NuPhy Air60 V2 for travel. </p> 
                        <h3>Tech Stack</h3>
                        <p>I do plenty of front end and back end work, but recently my focus has been on front end design. I tend to prefer React with TypeScript—I've done plenty of JavaScript, but types really are a game changer.</p>
                        <p>For back end, I work most in Python, and for databases, I prefer PostgreSQL. On past projects, I've also worked in C++, C, R, and probably some others I'm forgetting.</p>
                        <h3>Design Philosophy</h3>
                        <p>I tend to think simple is always better. You can't put lipstick on a pig.</p>
                        <p>For front end design, I start in black and white and introduce color progressively. Shape and form matter and often color can distract from these at first.</p>
                        <p>For back end databases, the same thing rings true.  You have to design your database or models early and you should think about common access patterns.  Never over noramlize, never over optimize when starting out.</p>
                        <p>When in doubt, remember that the designers of many tools are either smarter than you or you are using the product wrong. Work with SQL  don't design around it. If you are designing around it, you may be using the wrong tool.</p>
                        <p>When picking out products, really do your research. You have to live with your choices. Also use the bare minimum. There is a lot of software bloat and too many frameworks because people forget how to use css or to push the sort down to the database rather than python.</p>
                        <h3>Hobbies</h3>
                        <p>I love getting outside. </p>
                        <p>Running and fitness are big parts of my life (10+ half marathons and 1 full marathon completed so far). I also love cycling to take some strain off my legs. I grew up in the mountains so I love to hike and trail run when I can. Fishing is a newer hobby that I get to do with family.</p>
                        <h3>All Time Greats List</h3>
                        <p>Books (Fiction) - Dune, East of Eden, The Hobit, The Alchemist </p>
                        <p>Books (Non-Fiction) - Kitchen Confidential, The Psycology of Money, Washington: A Life </p>
                        <p>Movies - Ferris Bueller's Day Off, Interstellar, LOTR, Inglourious Basterds, Empire Strikes Back</p>
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
