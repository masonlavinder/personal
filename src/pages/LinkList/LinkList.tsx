import React, { useState, useEffect } from 'react';
import { Link } from '../../types/link';
import styles from './LinkList.module.css';

export const LinkList: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);

  useEffect(() => {
    // Sample links data - you can replace this with an API call or service
    const sampleLinks: Link[] = [
      {
        id: '1',
        title: 'React Documentation',
        url: 'https://react.dev',
        description: 'The official React documentation is incredibly well-written and helpful for understanding modern React patterns and best practices.',
        category: 'Development'
      },
      {
        id: '2',
        title: 'TypeScript Handbook',
        url: 'https://www.typescriptlang.org/docs/',
        description: 'Comprehensive guide to TypeScript that has helped me write better typed code and catch bugs early.',
        category: 'Development'
      },
      {
        id: '3',
        title: 'CSS-Tricks',
        url: 'https://css-tricks.com',
        description: 'Great resource for CSS tips, tricks, and modern layout techniques. Their flexbox and grid guides are especially useful.',
        category: 'Design'
      },
      {
        id: '4',
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org',
        description: 'The most comprehensive web development documentation. Essential reference for HTML, CSS, JavaScript, and web APIs.',
        category: 'Development'
      },
      {
        id: '5',
        title: 'Can I Use',
        url: 'https://caniuse.com',
        description: 'Check browser compatibility for any CSS, JavaScript, or HTML feature. Invaluable for cross-browser development.',
        category: 'Tools'
      },
      {
        id: '6',
        title: 'GitHub',
        url: 'https://github.com',
        description: 'The world\'s largest code hosting platform. Great for discovering open source projects and collaborating with others.',
        category: 'Tools'
      },
      {
        id: '7',
        title: 'Stack Overflow',
        url: 'https://stackoverflow.com',
        description: 'The go-to Q&A site for developers. Countless solutions to common and uncommon programming problems.',
        category: 'Community'
      },
      {
        id: '8',
        title: 'Figma',
        url: 'https://figma.com',
        description: 'Collaborative design tool that has revolutionized how designers and developers work together on UI/UX.',
        category: 'Design'
      },
      {
        id: '9',
        title: 'Vercel',
        url: 'https://vercel.com',
        description: 'Easy deployment platform for frontend projects. Deploy with a single command and get instant previews for pull requests.',
        category: 'Deployment'
      },
      {
        id: '10',
        title: 'DevDocs',
        url: 'https://devdocs.io',
        description: 'Fast, searchable documentation browser combining multiple API docs in one interface. Works offline too.',
        category: 'Tools'
      },
      {
        id: '11',
        title: 'Web.dev',
        url: 'https://web.dev',
        description: 'Google\'s resource for modern web development best practices, performance optimization, and accessibility.',
        category: 'Learning'
      },
      {
        id: '12',
        title: 'Frontend Mentor',
        url: 'https://www.frontendmentor.io',
        description: 'Real-world frontend challenges to practice your skills and build your portfolio with professional designs.',
        category: 'Learning'
      }
    ];

    setLinks(sampleLinks);
    setFilteredLinks(sampleLinks);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLinks(links);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = links.filter(link =>
        link.title.toLowerCase().includes(query) ||
        link.description.toLowerCase().includes(query) ||
        (link.category && link.category.toLowerCase().includes(query))
      );
      setFilteredLinks(filtered);
    }
  }, [searchQuery, links]);

  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.linkListTitle}>helpful links</h1>
      <input
        type="text"
        placeholder="search links..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />
      <ul className={styles.linkList}>
        {filteredLinks.map((link) => (
          <li key={link.id} className={styles.linkItem}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItemLink}
            >
              <h3 className={styles.linkTitle}>{link.title}</h3>
              <p className={styles.linkUrl}>{link.url}</p>
              <p className={styles.linkDescription}>{link.description}</p>
              {link.category && (
                <span className={styles.linkCategory}>{link.category}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkList;
