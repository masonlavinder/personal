import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GenericButton from '../GenericButton';
import styles from './MenuBar.module.css';

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  children?: MenuItem[];
  disabled?: boolean;
}

interface MenuBarProps {
  items: MenuItem[];
  className?: string;
  onItemClick?: (item: MenuItem) => void;
  themeButton?: {
    label: string;
    onClick: () => void;
  };
}

const MenuBar: React.FC<MenuBarProps> = ({ 
  items, 
  className = '',
  onItemClick,
  themeButton
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;
    
    if (item.children && item.children.length > 0) {
      setActiveDropdown(activeDropdown === item.id ? null : item.id);
    } else {
      if (item.onClick) {
        item.onClick();
      }
      if (onItemClick) {
        onItemClick(item);
      }
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    }
  };

  const renderMenuItem = (item: MenuItem, isMobile = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeDropdown === item.id;

    return (
      <div key={item.id} className={isMobile ? styles.mobileMenuItem : styles.menuItem}>
        {/* These are the menu items that will be rendered in the menu bar.
        Render link if href is provided, otherwise render a button */}
        {item.href && !hasChildren ? (
          <Link
            to={item.href}
            className={`${styles.menuButton} ${item.disabled ? styles.disabled : ''}`}
            onClick={(e) => {
              if (item.disabled) {
                e.preventDefault();
                return;
              }
              if (item.onClick) {
                item.onClick();
              }
              if (onItemClick) {
                onItemClick(item);
              }
              setMobileMenuOpen(false);
            }}
          >
            <span>{item.label}</span>
          </Link>
        ) : (
          <button
            onClick={() => handleItemClick(item)}
            disabled={item.disabled}
            className={`${styles.menuButton} ${item.disabled ? styles.disabled : ''}`}
          >
            <span>{item.label}</span>
            {hasChildren && (
              <span className={`${styles.dropdownArrow} ${isActive ? styles.rotated : ''}`}>
                ▼
              </span>
            )}
          </button>
        )}

        {hasChildren && isActive && (
          <div className={isMobile ? styles.mobileDropdown : styles.dropdownMenu}>
            {item.children!.map((child) => (
              child.href ? (
                <Link
                  key={child.id}
                  to={child.href}
                  className={`${styles.dropdownItem} ${child.disabled ? styles.disabled : ''}`}
                  onClick={(e) => {
                    if (child.disabled) {
                      e.preventDefault();
                      return;
                    }
                    if (child.onClick) {
                      child.onClick();
                    }
                    if (onItemClick) {
                      onItemClick(child);
                    }
                    setActiveDropdown(null);
                    setMobileMenuOpen(false);
                  }}
                >
                  {child.label}
                </Link>
              ) : (
                <button
                  key={child.id}
                  onClick={() => handleItemClick(child)}
                  disabled={child.disabled}
                  className={`${styles.dropdownItem} ${child.disabled ? styles.disabled : ''}`}
                >
                  {child.label}
                </button>
              )
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`${styles.menuBar} ${className}`}>

      <div className={styles.menuContainer}>
        {/* Center section with menu items */}
        <div className={styles.menuCenter}>
          {/* Desktop Menu */}
          <div className={styles.menuItems}>
            {items.map((item) => renderMenuItem(item))}
          </div>
        </div>

        {/* Right section with theme button and mobile menu */}
        <div className={styles.rightSection}>
          {/* Theme Button */}
          {themeButton && (
            <div className={styles.themeButtonContainer}>
              <GenericButton
                label={themeButton.label}
                onClick={themeButton.onClick}
                className={styles.themeButton}
                />
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className={`${styles.mobileMenuButton} ${mobileMenuOpen ? styles.open : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
          {items.map((item) => renderMenuItem(item, true))}
        </div>
      </div>
    </nav>
  );
};
export default MenuBar;