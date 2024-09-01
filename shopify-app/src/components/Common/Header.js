import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/products">Products</Link>
                {/* Add more navigation links */}
            </nav>
        </header>
    );
};

export default Header;
