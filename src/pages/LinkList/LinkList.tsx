import React, { useState, useEffect } from 'react';
import { Link } from '../../types/link';
import styles from './LinkList.module.css';
import { sampleLinks } from './linksData';

export const LinkList: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setLinks(sampleLinks);
    setFilteredLinks(sampleLinks);
  }, []);

  // Get unique categories from all links
  const allCategories = Array.from(
    new Set(
      sampleLinks.flatMap(link => link.categories || [])
    )
  ).sort();

  useEffect(() => {
    let filtered = links;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(link =>
        link.categories && link.categories.includes(selectedCategory)
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(link =>
        link.title.toLowerCase().includes(query) ||
        link.description.toLowerCase().includes(query) ||
        (link.categories && link.categories.some(cat => cat.toLowerCase().includes(query)))
      );
    }

    setFilteredLinks(filtered);
  }, [searchQuery, links, selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

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
      <div className={styles.categoryFilters}>
        {allCategories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.categoryButtonActive : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
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
              {link.categories && link.categories.length > 0 && (
                <div className={styles.linkCategories}>
                  {link.categories.map((category, index) => (
                    <span key={index} className={styles.linkCategory}>{category}</span>
                  ))}
                </div>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkList;
