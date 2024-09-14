import React from 'react'


const PageContent = ({ page }) => {
    const pageContents = {
      login: (
        <div>
          <h2>Login Page</h2>
          <form>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter your password" required />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ),
      signup: (
        <div>
          <h2>Signup Page</h2>
          <form>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullname" placeholder="Enter your full name" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter your password" required />
            </div>
            <button type="submit">Signup</button>
          </form>
        </div>
      ),
      home: <div><h2>Home Page</h2><p>Welcome to our website!</p></div>,
      order: <div><h2>Order Page</h2><p>Order Details</p></div>,
      payment: <div><h2>Payment Page</h2><p>Payment Form</p></div>,
      default: <div><h2>Page Not Found</h2></div>
    };
  
    return pageContents[page] || pageContents.default;
  };


  export default PageContent;