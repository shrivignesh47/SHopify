import React from 'react'

const Footer = ({ design }) => (
    <footer className={`footer ${design}`}>
      <p>© 2024 MyShop. All rights reserved.</p>
      {design === 'social' && (
        <div className="footer-social">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      )}
    </footer>
  );

  export default Footer;