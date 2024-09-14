// tempnavbar.js
import React from 'react';
const Navbar = ({ color, design, breadcrumbs, onToggleSidebar, onSearch, menuItems }) => {
  return (
    <nav className={`navbar ${design}`} style={{ backgroundColor: color }}>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={onToggleSidebar}>
        ☰
      </button>
      
      {/* Design Variants */}
      {design === 'menu' && (
        <div className="navbar-menu">
          {menuItems.map((item, index) => (
            <a key={index} href={item.link}>{item.label}</a>
          ))}
        </div>
      )}

      {design === 'search' && (
        <input
          type="text"
          placeholder="Search..."
          className="navbar-search"
          onChange={(e) => onSearch(e.target.value)}
        />
      )}

      {design === 'minimal' && <div className="navbar-minimal"></div>}
      
      {design === 'sticky' && (
        <div className="navbar-sticky">
          {menuItems.map((item, index) => (
            <a key={index} href={item.link}>{item.label}</a>
          ))}
        </div>
      )}



      {design === 'dynamic' && (
        <div className="navbar-dynamic">
          <input
            type="text"
            placeholder="Search..."
            className="navbar-search"
            onChange={(e) => onSearch(e.target.value)}
          />
          <div className="navbar-menu">
            {menuItems.map((item, index) => (
              <a key={index} href={item.link}>{item.label}</a>
            ))}
          </div>
        </div>
      )}


      {design === 'centered' && (
        <div className="navbar-centered">
          <div className="navbar-logo">Logo</div>
          <div className="navbar-menu">
            {menuItems.map((item, index) => (
              <a key={index} href={item.link}>{item.label}</a>
            ))}
          </div>
        </div>
      )}

      
      {/* Breadcrumbs */}
      <div className="navbar-breadcrumbs">
        {breadcrumbs.map((crumb, index) => (
          <span key={index}>{crumb} {index < breadcrumbs.length - 1 && ' > '}</span>
        ))}
      </div>
    </nav>
  );
        }
export default Navbar;
