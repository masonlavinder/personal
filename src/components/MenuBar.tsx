import React, { useState } from 'react';
import GenericButton from './GenericButton';


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
      <div key={item.id} className={`menu-item ${isMobile ? 'mobile-menu-item' : ''}`}>
        {/* These are the menu items that will be rendered in the menu bar.
        Render link if href is provided, otherwise render a button */}
        <button
          onClick={() => handleItemClick(item)}
          disabled={item.disabled}
          className={`menu-button ${item.disabled ? 'disabled' : ''}`}
        >
          <span>{item.label}</span>
          {hasChildren && (
            <span className={`dropdown-arrow ${isActive ? 'rotated' : ''}`}>
              ▼
            </span>
          )}
        </button>

        {hasChildren && isActive && (
          <div className={`dropdown-menu ${isMobile ? 'mobile-dropdown' : ''}`}>
            {item.children!.map((child) => (
              <button
                key={child.id}
                onClick={() => handleItemClick(child)}
                disabled={child.disabled}
                className={`dropdown-item ${child.disabled ? 'disabled' : ''}`}
              >
                {child.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`menu-bar ${className}`}>

      <div className="menu-container">
        {/* Center section with menu items */}
        <div className="menu-center">
          {/* Desktop Menu */}
          <div className="menu-items">
            {items.map((item) => renderMenuItem(item))}
          </div>
        </div>

        {/* Right section with theme button and mobile menu */}
        <div className="right-section">
          {/* Theme Button */}
          {themeButton && (
            <div className="theme-button-container">
              <GenericButton
                label={themeButton.label}
                onClick={themeButton.onClick}
                className="theme-button"
                />
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className={`mobile-menu-button ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {items.map((item) => renderMenuItem(item, true))}
        </div>
      </div>
    </nav>
  );
};
export default MenuBar;