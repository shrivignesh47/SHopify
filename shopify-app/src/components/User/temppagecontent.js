import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './PageContent.css';

const PageContent = ({
  page,
  productStyle = 'grid',
  onProductChange,
  searchQuery = '',
  setCart,
  setPage,
  testimonials = [], // Testimonials from parent
  aboutDescriptions ='' , // About description from parent
  theme = {}, // Theme settings from parent
  carouselImages = [],
}) => {
  const [products, setProducts] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products from the API
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Add product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };


  // Handle order form changes
  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle order submission
  const handleOrderSubmit = () => {
    setPage('payment');
  };

  // Handle payment submission
  const handlePaymentSubmit = async () => {
    try {
      const paymentSuccess = Math.random() > 0.5; // Simulate random payment outcome
      if (!paymentSuccess) {
        throw new Error('Payment failed');
      }
      setPaymentStatus('success');
      setPage('success');
    } catch (error) {
      setPaymentStatus('failed');
    }
  };

  // Product list layout based on the grid or list design
  const ProductList = ({ products, productStyle }) => (
    <div className={`temp-page-product-list ${productStyle === 'grid' ? 'grid' : 'list'}`}>
      {products.map((product) => (
        <div className="temp-page-product-item" key={product.id}>
          <img src={product.image} alt={product.name} className="temp-page-product-image" />
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Stock:</strong> {product.stock} units</p>
          <button className="temp-page-buy-button" onClick={() => addToCart(product)}>Buy Now</button>
        </div>
      ))}
    </div>
  );

  // Carousel Component with automatic sliding
  const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval); // Clear interval on component unmount
    }, [images.length]);

    return (
      <div className="temp-page-carousel">
        {images.length > 0 && (
          <img
            src={images[currentIndex]}
            alt={`Carousel ${currentIndex + 1}`}
            className="temp-page-carousel-image"
          />
        )}
      </div>
    );
  };


  // About Us Section
  const AboutUs = ({ description }) => (
    <section className="temp-page-about-section">
      <h2>About Us</h2>
      <p>{description}</p>
    </section>
  );

  // Testimonials Section
  const Testimonials = ({ testimonials }) => (
    <section className="temp-page-testimonials-section">
      <h2>What Our Customers Say</h2>
      <div className="temp-page-testimonial-list">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="temp-page-testimonial-item">
            <blockquote>{testimonial.quote}</blockquote>
            <p>- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );


  // Loading state
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  // Page-specific content based on the `page` prop
  const pageContents = {
    home: (
      <div className="temp-page-home-page">
        <section className="temp-page-carousel-section">
          <Carousel images={carouselImages} />
        </section>
        <header className="temp-page-hero-banner">
          <h1>Welcome to Our Professional Store!</h1>
          <p>Find premium products tailored to your needs.</p>
          <button className="temp-page-cta-button">Start Shopping</button>
        </header>

        {/* Products Section */}
        <section className="temp-page-products-section">
          <h2>Featured Products</h2>
          <ProductList
            products={products.filter((product) =>
              product?.name.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            productStyle={productStyle}
            onProductChange={onProductChange}
          />
        </section>
        {/* About Us Section */}
        <AboutUs description={aboutDescriptions} />
  

        {/* Testimonials Section */}
        <Testimonials testimonials={testimonials} />

        {/* Call to Action Section */}
        <section className="temp-page-cta-section">
          <h2>Join Us and Start Shopping!</h2>
          <p>Get exclusive deals and offers when you sign up.</p>
          <button className="temp-page-cta-button" onClick={() => setPage('signup')}>Sign Up Today</button>
        </section>
      </div>
    ),
    login: (
      <div className="temp-page-login-page">
        <h2>Login to Your Account</h2>
        <form className="temp-page-auth-form">
          <div className="temp-page-form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="temp-page-form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="temp-page-auth-button">Login</button>
        </form>
        <p className="temp-page-auth-link">
          Don't have an account? <a href="#" onClick={() => setPage('signup')}>Sign up here</a>.
        </p>
      </div>
    ),
    signup: (
      <div className="temp-page-signup-page">
        <h2>Create Your Account</h2>
        <form className="temp-page-auth-form">
          <div className="temp-page-form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" required />
          </div>
          <div className="temp-page-form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="temp-page-form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="temp-page-auth-button">Sign Up</button>
        </form>
        <p className="temp-page-auth-link">
          Already have an account? <a href="#" onClick={() => setPage('login')}>Login here</a>.
        </p>
      </div>
    ),
    order: (
      <div className="temp-page-order-page">
        <h2>Order Details</h2>
        <form className="temp-page-order-form">
          <div className="temp-page-form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={orderDetails.name}
              onChange={handleOrderChange}
              required
            />
          </div>
          <div className="temp-page-form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={orderDetails.address}
              onChange={handleOrderChange}
              required
            />
          </div>
          <div className="temp-page-form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={orderDetails.phone}
              onChange={handleOrderChange}
              required
            />
          </div>
          <button type="button" className="temp-page-order-button" onClick={handleOrderSubmit}>
            Proceed to Payment
          </button>
        </form>
      </div>
    ),
    payment: (
      <div className="temp-page-payment-page">
        <h2>Payment Page</h2>
        <form className="temp-page-payment-form">
          <div className="temp-page-form-group">
            <label>Card Number</label>
            <input type="text" placeholder="Enter your card number" required />
          </div>
          <div className="temp-page-form-group">
            <label>Expiration Date</label>
            <input type="text" placeholder="MM/YY" required />
          </div>
          <div className="temp-page-form-group">
            <label>CVV</label>
            <input type="text" placeholder="Enter CVV" required />
          </div>
          <button type="button" className="temp-page-payment-button" onClick={handlePaymentSubmit}>
            Pay Now
          </button>
          {paymentStatus === 'failed' && <p className="error-message">Payment failed. Please try again.</p>}
        </form>
      </div>
    ),
    success: (
      <div className="temp-page-success-page">
        <h2>Order Success</h2>
        <p>Your order has been placed successfully. Thank you for shopping with us!</p>
        <button className="temp-page-cta-button" onClick={() => setPage('home')}>Shop More</button>
      </div>
    ),
    default: (
      <div className="temp-page-not-found">
        <h2>Page Not Found</h2>
      </div>
    ),
  };

  return pageContents[page] || pageContents.default;
};

export default PageContent;
