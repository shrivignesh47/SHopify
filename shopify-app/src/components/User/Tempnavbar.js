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
//   logo,
//   cart = [], // Default empty array for cart
//   setCart, // Function to update cart
//   isCartOpen = false, // Default false for cart visibility
//   setIsCartOpen // Function to toggle cart visibility
// }) => {
//   const renderMenuItems = () => (
//     menuItems.map((item, index) => (
//       <a 
//         key={index} 
//         href={item.link} 
//         className="navbar-menu-item"
//         onClick={(e) => {
//           e.preventDefault();
//           onPageChange(item.id);
//         }}
//       >
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

//   const handleCartClick = () => {
//     setIsCartOpen(!isCartOpen);
//   };

//   return (
//     <nav className={`navbar ${design}`} style={{ backgroundColor: color }}>
//       <button 
//         className="sidebar-toggle" 
//         onClick={onToggleSidebar} 
//         aria-label="Toggle Sidebar"
//       >
//         ☰
//       </button>

//       <div className="navbar-content">
//         {logo && <div className="navbar-logo"><img src={logo} alt="Logo" /></div>}
//         {design === 'menu' && <div className="navbar-menu">{renderMenuItems()}</div>}
//         {(design === 'search' || design === 'minimal' || design === 'dynamic') && renderSearch()}
//         {design === 'dynamic' && <div className="navbar-menu">{renderMenuItems()}</div>}
//         {design === 'centered' && <div className="navbar-menu navbar-centered">{renderMenuItems()}</div>}
//       </div>

//       <button className="cart-button" onClick={handleCartClick}>
//         Cart ({cart.length})
//       </button>

//       {isCartOpen && (
//         <div className="cart-popup">  
//           <h2>Your Cart</h2>
//           {cart.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             <ul>
//               {cart.map((item) => (
//                 <li key={item.id}>
//                   <img src={item.image} alt={item.name} className="cart-item-image" />
//                   <div className="cart-item-details">
//                     <h4>{item.name}</h4>
//                     <p>Price: ₹{item.price}</p>
//                     <button onClick={() => setCart(cart.filter(i => i.id !== item.id))}>Remove</button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//           <button onClick={() => onPageChange('order')}>Proceed to Checkout</button>
//         </div>
//       )}

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
//     id: PropTypes.string.isRequired
//   })).isRequired,
//   showAuthLinks: PropTypes.bool.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   logo: PropTypes.string,
//   cart: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     image: PropTypes.string,
//     price: PropTypes.number.isRequired
//   })),
//   setCart: PropTypes.func.isRequired, // Ensure this is required
//   isCartOpen: PropTypes.bool,
//   setIsCartOpen: PropTypes.func.isRequired
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
  logo,
  cart = [], 
  setCart, 
  isCartOpen = false, 
  setIsCartOpen 
}) => {
  const renderMenuItems = () => (
    menuItems.map((item, index) => (
      <a 
        key={index} 
        href={item.link} 
        className="navbar-menu-item"
        onClick={(e) => {
          e.preventDefault();
          onPageChange(item.id);
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

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleAddMoreClick = () => {
    setIsCartOpen(false); // Close the cart popup
  };

  const handleBuyClick = () => {
    setIsCartOpen(false); // Close the cart popup
    onPageChange('order'); // Navigate to the order page
  };

  return (
    <nav className={`navbar ${design}`} style={{ backgroundColor: color }}>
      <button 
        className="sidebar-toggle" 
        onClick={onToggleSidebar} 
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      <div className="navbar-content">
        {logo && <div className="navbar-logo"><img src={logo} alt="Logo" /></div>}
        {design === 'menu' && <div className="navbar-menu">{renderMenuItems()}</div>}
        {(design === 'search' || design === 'minimal' || design === 'dynamic') && renderSearch()}
        {design === 'dynamic' && <div className="navbar-menu">{renderMenuItems()}</div>}
        {design === 'centered' && <div className="navbar-menu navbar-centered">{renderMenuItems()}</div>}
      </div>

      <button className="cart-button" onClick={handleCartClick}>
        Cart ({cart.length})
      </button>

      {isCartOpen && (
        <div className="cart-popup">  
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>Price: ₹{item.price}</p>
                    <button onClick={() => setCart(cart.filter(i => i.id !== item.id))}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleAddMoreClick}>Add More</button>
          <button onClick={handleBuyClick}>Buy</button>
        </div>
      )}

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
  logo: PropTypes.string,
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.number.isRequired
  })),
  setCart: PropTypes.func.isRequired,
  isCartOpen: PropTypes.bool,
  setIsCartOpen: PropTypes.func.isRequired
};

export default Navbar;
