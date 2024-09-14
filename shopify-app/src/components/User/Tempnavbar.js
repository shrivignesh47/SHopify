// import React from 'react';
// import PropTypes from 'prop-types';

// const Navbar = ({ 
//   color, 
//   design, 
//   breadcrumbs, 
//   onToggleSidebar, 
//   onSearch, 
//   menuItems, 
//   showAuthLinks, 
//   onPageChange,
//   logo // New prop for logo
// }) => {
//   const renderMenuItems = () => (
//     menuItems.map((item, index) => (
//       <a key={index} href={item.link} className="navbar-menu-item">
//         {item.label}
//       </a>
//     ))
//   );

//   const renderSearch = () => (
//     <input
//       type="text"
//       placeholder="Search..."
//       className="navbar-search"
//       onChange={(e) => onSearch(e.target.value)}
//       aria-label="Search"
//     />
//   );

//   return (
//     <nav className={`navbar ${design}`} style={{ backgroundColor: color }}>
//       {/* Sidebar Toggle Button */}
//       <button 
//         className="sidebar-toggle" 
//         onClick={onToggleSidebar} 
//         aria-label="Toggle Sidebar"
//       >
//         ☰
//       </button>

//       {/* Navbar Design Variants */}
//       {design === 'menu' && (
//         <div className="navbar-content">
//           {logo && <div className="tempnavbar-logo"><img src={logo} alt="Logo" /></div>}
//           <div className="navbar-menu">{renderMenuItems()}</div>
//         </div>
//       )}
//       {design === 'search' && (
//         <div className="navbar-content">
//           {logo && <div className="tempnavbar-logo"><img src={logo} alt="Logo" /></div>}
//           {renderSearch()}
//         </div>
//       )}
//       {design === 'minimal' && (
//         <div className="navbar-content">
//           {logo && <div className="tempnavbar-logo"><img src={logo} alt="Logo" /></div>}
//           {/* Additional minimal design content */}
//         </div>
//       )}
//       {design === 'sticky' && (
//         <div className="navbar-content">
//           {logo && <div className="tempnavbar-logo"><img src={logo} alt="Logo" /></div>}
//           <div className="navbar-menu">{renderMenuItems()}</div>
//         </div>
//       )}
//       {design === 'dynamic' && (
//         <div className="navbar-content">
//           {logo && <div className="tempnavbar-logo"><img src={logo} alt="Logo" /></div>}
//           {renderSearch()}
//           <div className="navbar-menu">{renderMenuItems()}</div>
//         </div>
//       )}
//       {design === 'centered' && (
//         <div className="navbar-content navbar-centered">
//           {logo && <div className="tempnavbar-logo"><img src={logo} alt="Logo" /></div>}
//           <div className="navbar-menu">{renderMenuItems()}</div>
//         </div>
//       )}

//       {/* Authentication Links */}
//       {showAuthLinks && (
//         <div className="navbar-auth-links">
//           <a
//             href="#login"
//             className="navbar-link"
//             onClick={(e) => {
//               e.preventDefault();
//               onPageChange('login');
//             }}
//             aria-label="Login"
//           >
//             Login
//           </a>
//           <a
//             href="#signup"
//             className="navbar-link"
//             onClick={(e) => {
//               e.preventDefault();
//               onPageChange('signup');
//             }}
//             aria-label="Signup"
//           >
//             Signup
//           </a>
//         </div>
//       )}
//     </nav>
//   );
// };

// Navbar.propTypes = {
//   color: PropTypes.string.isRequired,
//   design: PropTypes.oneOf(['menu', 'search', 'minimal', 'sticky', 'dynamic', 'centered']).isRequired,
//   breadcrumbs: PropTypes.arrayOf(PropTypes.string),
//   onToggleSidebar: PropTypes.func.isRequired,
//   onSearch: PropTypes.func.isRequired,
//   menuItems: PropTypes.arrayOf(PropTypes.shape({
//     link: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//   })).isRequired,
//   showAuthLinks: PropTypes.bool.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   logo: PropTypes.string
// };

// export default Navbar;



import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ 
  color, 
  design, 
  breadcrumbs, 
  onToggleSidebar, 
  onSearch, 
  menuItems, 
  showAuthLinks, 
  onPageChange,
  logo 
}) => {
  const renderMenuItems = () => (
    menuItems.map((item, index) => (
      <a 
        key={index} 
        href={item.link} 
        className="navbar-menu-item"
        onClick={(e) => {
          e.preventDefault(); // Prevent default link behavior
          onPageChange(item.id); // Call the function to change the page
        }}
      >
        {item.label}
      </a>
    ))
  );

  const renderSearch = () => (
    <input
      type="text"
      placeholder="Search..."
      className="navbar-search"
      onChange={(e) => onSearch(e.target.value)}
      aria-label="Search"
    />
  );

  return (
    <nav className={`navbar ${design}`} style={{ backgroundColor: color }}>
      {/* Sidebar Toggle Button */}
      <button 
        className="sidebar-toggle" 
        onClick={onToggleSidebar} 
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      {/* Navbar Design Variants */}
      <div className="navbar-content">
        {logo && <div className="tempnavbar-logo"><img src={logo} alt="Logo" /></div>}
        {design === 'menu' && <div className="navbar-menu">{renderMenuItems()}</div>}
        {design === 'search' && renderSearch()}
        {design === 'minimal' &&  renderSearch()}
        {design === 'sticky' && <div className="navbar-menu">{renderMenuItems()}</div>}
        {design === 'dynamic' && (
          <div>
            {renderSearch()}
            <div className="navbar-menu">{renderMenuItems()}</div>
          </div>
        )}
        {design === 'centered' && <div className="navbar-menu navbar-centered">{renderMenuItems()}</div>}
      </div>

      {/* Authentication Links */}
      {showAuthLinks && (
        <div className="navbar-auth-links">
          <a
            href="#login"
            className="navbar-link"
            onClick={(e) => {
              e.preventDefault();
              onPageChange('login');
            }}
            aria-label="Login"
          >
            Login
          </a>
          <a
            href="#signup"
            className="navbar-link"
            onClick={(e) => {
              e.preventDefault();
              onPageChange('signup');
            }}
            aria-label="Signup"
          >
            Signup
          </a>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  color: PropTypes.string.isRequired,
  design: PropTypes.oneOf(['menu', 'search', 'minimal', 'sticky', 'dynamic', 'centered']).isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.string),
  onToggleSidebar: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  })).isRequired,
  showAuthLinks: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired,
  logo: PropTypes.string
};

export default Navbar;
