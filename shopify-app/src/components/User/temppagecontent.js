// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import './PageContent.css';

// const PageContent = ({ page, productStyle = 'grid', onProductChange, searchQuery = '', setIsCartOpen, cart, setCart, setPage }) => {
//   const [products, setProducts] = useState([]);

//   // Fetch products from the API
//   const fetchProducts = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/products', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProducts(response.data);
//     } catch (err) {
//       console.error('Error fetching products', err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // Function to add product to cart
//   const addToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//   };

//   // ProductList Component
//   const ProductList = ({ products, productStyle, onProductChange }) => (
//     <div className={`product-list ${productStyle === 'grid' ? 'grid' : 'list'}`}>
//       {products.map((product) => (
//         <div className="product-item" key={product.id}>
//           <img src={product.image} alt={product.name} className="product-image" />
//           <h4>{product.name}</h4>
//           <p>{product.description}</p>
//           <p><strong>Category:</strong> {product.category}</p>
//           <p><strong>Price:</strong> ₹{product.price}</p>
//           <p><strong>Stock:</strong> {product.stock} units</p>
//           <button className="buy-button" onClick={() => addToCart(product)}>Buy Now</button>
//         </div>
//       ))}
//     </div>
//   );

//   // Page contents including login and signup
//   const pageContents = {
//     home: (
//       <div className="home-page">
//         <header className="hero-banner">
//           <h1>Welcome to Our Professional Store!</h1>
//           <p>Find premium products tailored to your needs.</p>
//           <button className="cta-button">Start Shopping</button>
//         </header>

//         <section className="products-section">
//           <h2>Featured Products</h2>

//           <ProductList
//             products={products.filter(
//               (product) =>
//                 product?.name &&
//                 product.name.toLowerCase().includes(searchQuery.toLowerCase())
//             )}
//             productStyle={productStyle}
//             onProductChange={onProductChange}
//           />
//         </section>

//         <section className="cta-section">
//           <h2>Join Us and Start Shopping!</h2>
//           <p>Get exclusive deals and offers when you sign up.</p>
//           <button className="cta-button" onClick={() => setPage('signup')}>Sign Up Today</button>
//         </section>
//       </div>
//     ),
//     login: (
//       <div className="login-page">
//         <h2>Login to Your Account</h2>
//         <form className="auth-form">
//           <div className="form-group">
//             <label>Email</label>
//             <input type="email" placeholder="Enter your email" required />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input type="password" placeholder="Enter your password" required />
//           </div>
//           <button type="submit" className="auth-button">Login</button>
//         </form>
//         <p className="auth-link">Don't have an account? <a href="#" onClick={() => setPage('signup')}>Sign up here</a>.</p>
//       </div>
//     ),
//     signup: (
//       <div className="signup-page">
//         <h2>Create Your Account</h2>
//         <form className="auth-form">
//           <div className="form-group">
//             <label>Full Name</label>
//             <input type="text" placeholder="Enter your full name" required />
//           </div>
//           <div className="form-group">
//             <label>Email</label>
//             <input type="email" placeholder="Enter your email" required />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input type="password" placeholder="Enter your password" required />
//           </div>
//           <button type="submit" className="auth-button">Sign Up</button>
//         </form>
//         <p className="auth-link">Already have an account? <a href="#" onClick={() => setPage('login')}>Login here</a>.</p>
//       </div>
//     ),
//     order: (
//       <div className="order-page">
//         <h2>Order Details</h2>
//         <form className="order-form">
//           <div className="form-group">
//             <label>Full Name</label>
//             <input type="text" placeholder="Enter your full name" required />
//           </div>
//           <div className="form-group">
//             <label>Address</label>
//             <input type="text" placeholder="Enter your address" required />
//           </div>
//           <div className="form-group">
//             <label>Phone</label>
//             <input type="text" placeholder="Enter your phone number" required />
//           </div>
//           <button type="button" className="order-button" onClick={() => setPage('payment')}>Proceed to Payment</button>
//         </form>
//       </div>
//     ),
//     payment: (
//       <div className="payment-page">
//         <h2>Payment Page</h2>
//         <form className="payment-form">
//           <div className="form-group">
//             <label>Card Number</label>
//             <input type="text" placeholder="Enter your card number" required />
//           </div>
//           <div className="form-group">
//             <label>Expiration Date</label>
//             <input type="text" placeholder="MM/YY" required />
//           </div>
//           <div className="form-group">
//             <label>CVV</label>
//             <input type="text" placeholder="Enter CVV" required />
//           </div>
//           <button type="button" className="payment-button" onClick={() => setPage('success')}>Pay Now</button>
//         </form>
//       </div>
//     ),
//     success: (
//       <div className="success-page">
//         <h2>Order Success</h2>
//         <p>Your order has been placed successfully. Thank you for shopping with us!</p>
//         <button className="cta-button" onClick={() => setPage('home')}>Shop More</button>
//       </div>
//     ),
//     default: (
//       <div>
//         <h2>Page Not Found</h2>
//       </div>
//     )
//   };

//   return pageContents[page] || pageContents.default;
// };

// export default PageContent;



import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './PageContent.css';

const PageContent = ({ 
  page, 
  productStyle = 'grid', 
  onProductChange, 
  searchQuery = '', 
  setSearchQuery, 
  cart, 
  setCart, 
  setPage 
}) => {
  const [products, setProducts] = useState([]);
  const [orderDetails, setOrderDetails] = useState({ name: '', address: '', phone: '' });
  const [paymentStatus, setPaymentStatus] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products', err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleOrderSubmit = async () => {
    try {
      // Mock payment process
      const paymentSuccess = Math.random() > 0.5;
      if (!paymentSuccess) {
        throw new Error('Payment failed');
      }
      setPaymentStatus('success');
      setPage('success');
    } catch (error) {
      setPaymentStatus('failed');
      console.error('Payment Error:', error);
    }
  };

  const ProductList = ({ products, productStyle }) => (
    <div className={`product-list ${productStyle === 'grid' ? 'grid' : 'list'}`}>
      {products.map((product) => (
        <div className="product-item" key={product.id}>
          <img src={product.image} alt={product.name} className="product-image" />
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Stock:</strong> {product.stock} units</p>
          <button className="buy-button" onClick={() => addToCart(product)}>Buy Now</button>
        </div>
      ))}
    </div>
  );

  const pageContents = {
    home: (
      <div className="home-page">
        <header className="hero-banner">
          <h1>Welcome to Our Professional Store!</h1>
          <p>Find premium products tailored to your needs.</p>
          <button className="cta-button">Start Shopping</button>
        </header>

        <section className="products-section">
          <h2>Featured Products</h2>

          <ProductList
            products={products.filter(
              (product) =>
                product?.name &&
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            productStyle={productStyle}
            onProductChange={onProductChange}
          />
        </section>

        <section className="cta-section">
          <h2>Join Us and Start Shopping!</h2>
          <p>Get exclusive deals and offers when you sign up.</p>
          <button className="cta-button" onClick={() => setPage('signup')}>Sign Up Today</button>
        </section>
      </div>
    ),
    login: (
      <div className="login-page">
        <h2>Login to Your Account</h2>
        <form className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p className="auth-link">Don't have an account? <a href="#" onClick={() => setPage('signup')}>Sign up here</a>.</p>
      </div>
    ),
    signup: (
      <div className="signup-page">
        <h2>Create Your Account</h2>
        <form className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="auth-link">Already have an account? <a href="#" onClick={() => setPage('login')}>Login here</a>.</p>
      </div>
    ),
    order: (
      <div className="order-page">
        <h2>Order Details</h2>
        <form className="order-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="Enter your full name" value={orderDetails.name} onChange={handleOrderChange} required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" placeholder="Enter your address" value={orderDetails.address} onChange={handleOrderChange} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" name="phone" placeholder="Enter your phone number" value={orderDetails.phone} onChange={handleOrderChange} required />
          </div>
          <button type="button" className="order-button" onClick={() => setPage('payment')}>Proceed to Payment</button>
        </form>
      </div>
    ),
    payment: (
      <div className="payment-page">
        <h2>Payment Page</h2>
        <form className="payment-form">
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" placeholder="Enter your card number" required />
          </div>
          <div className="form-group">
            <label>Expiration Date</label>
            <input type="text" placeholder="MM/YY" required />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input type="text" placeholder="Enter CVV" required />
          </div>
          <button type="button" className="payment-button" onClick={() => setPage('success')}>Pay Now</button>
        </form>
      </div>
    ),
    success: (
      <div className="success-page">
        <h2>Order Success</h2>
        <p>Your order has been placed successfully. Thank you for shopping with us!</p>
        <button className="cta-button" onClick={() => setPage('home')}>Shop More</button>
      </div>
    ),
    default: (
      <div>
        <h2>Page Not Found</h2>
      </div>
    )
  };

  console.log('Current page:', page);

  return pageContents[page] || pageContents.default;
};

export default PageContent;
