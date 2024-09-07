// import React, { useState } from 'react';
// import './Template.css'; // Assuming you have a CSS file for styling

// const Navbar = ({ color, onEdit }) => (
//     <nav className="navbar" style={{ backgroundColor: color }}>
//         <div className="navbar-logo">MyShop</div>
//         <div className="navbar-links">
//             <a href="#home">Home</a>
//             <a href="#products">Products</a>
//             <a href="#about">About</a>
//         </div>
//         <button onClick={() => onEdit('navbar')} className="edit-button">Edit Navbar</button>
//     </nav>
// );

// const Sidebar = ({ color, onEdit }) => (
//     <aside className="sidebar" style={{ backgroundColor: color }}>
//         <h3>Sidebar</h3>
//         <ul>
//             <li><a href="#electronics">Electronics</a></li>
//             <li><a href="#fashion">Fashion</a></li>
//             <li><a href="#home-appliances">Home Appliances</a></li>
//             <li><a href="#books">Books</a></li>
//         </ul>
//         <button onClick={() => onEdit('sidebar')} className="edit-button">Edit Sidebar</button>
//     </aside>
// );

// const Footer = () => (
//     <footer className="footer">
//         <p>© 2024 MyShop. All rights reserved.</p>
//     </footer>
// );

// const ProductList = ({ products, productStyle }) => (
//     <div className={`product-list ${productStyle === 'grid' ? 'grid' : 'list'}`}>
//         {products.map((product) => (
//             <div className="product-item" key={product.id}>
//                 <h4>{product.name}</h4>
//                 <p>{product.description}</p>
//                 <p>Category: {product.category}</p>
//                 <p>Price: ${product.price}</p>
//                 <p>Stock: {product.stock} units</p>
//             </div>
//         ))}
//     </div>
// );

// const TemplateBuilder = () => {
//     const [form, setForm] = useState({
//         name: '',
//         description: '',
//         themeColor: '#ffffff',
//         backgroundColor: '#ffffff',
//         navbarColor: '#007bff', // Default blue navbar
//         sidebarColor: '#343a40', // Default dark sidebar
//         logo: null,
//         products: [],
//         pages: ['home'], // Default page is home
//         font: 'Arial',
//         productStyle: 'grid',
//     });
//     const [preview, setPreview] = useState(null);
//     const [editSection, setEditSection] = useState(null);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const handleProductChange = (e) => {
//         const { value } = e.target;
//         const newProducts = [...form.products];
//         if (newProducts.includes(value)) {
//             newProducts.splice(newProducts.indexOf(value), 1);
//         } else {
//             newProducts.push(value);
//         }
//         setForm({ ...form, products: newProducts });
//     };

//     const handleLogoChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setForm({ ...form, logo: reader.result });
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handlePagesChange = (e) => {
//         const { value, checked } = e.target;
//         const newPages = [...form.pages];
//         if (checked) {
//             if (!newPages.includes(value)) newPages.push(value);
//         } else {
//             const index = newPages.indexOf(value);
//             if (index > -1) newPages.splice(index, 1);
//         }
//         setForm({ ...form, pages: newPages });
//     };

//     const handlePreview = () => {
//         setPreview(form);
//     };

//     const handleEdit = (section) => {
//         setEditSection(section);
//     };

//     const handleSaveChanges = () => {
//         // Save changes logic (e.g., update state, send to server)
//         setEditSection(null);
//     };

//     return (
//         <div className="template-builder">
//             <h2>Create a Professional Website Template</h2>
//             <form>
//                 <div className="form-group">
//                     <label>Template Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={form.name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Description</label>
//                     <textarea
//                         name="description"
//                         value={form.description}
//                         onChange={handleChange}
//                         rows="4"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Theme Color</label>
//                     <input
//                         type="color"
//                         name="themeColor"
//                         value={form.themeColor}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Background Color</label>
//                     <input
//                         type="color"
//                         name="backgroundColor"
//                         value={form.backgroundColor}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Navbar Color</label>
//                     <input
//                         type="color"
//                         name="navbarColor"
//                         value={form.navbarColor}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Sidebar Color</label>
//                     <input
//                         type="color"
//                         name="sidebarColor"
//                         value={form.sidebarColor}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Logo Upload</label>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleLogoChange}
//                     />
//                     {form.logo && <img src={form.logo} alt="Logo Preview" width="100" />}
//                 </div>
//                 <div className="form-group">
//                     <label>Select Products</label>
//                     {/* Replace with actual product options */}
//                     <div>
//                         <input
//                             type="checkbox"
//                             value="Product1"
//                             checked={form.products.includes('Product1')}
//                             onChange={handleProductChange}
//                         />
//                         <label>Product1</label>
//                     </div>
//                     <div>
//                         <input
//                             type="checkbox"
//                             value="Product2"
//                             checked={form.products.includes('Product2')}
//                             onChange={handleProductChange}
//                         />
//                         <label>Product2</label>
//                     </div>
//                 </div>
//                 <div className="form-group">
//                     <label>Select Pages</label>
//                     <div>
//                         <input
//                             type="checkbox"
//                             value="home"
//                             checked={form.pages.includes('home')}
//                             onChange={handlePagesChange}
//                         />
//                         <label>Home</label>
//                     </div>
//                     <div>
//                         <input
//                             type="checkbox"
//                             value="login"
//                             checked={form.pages.includes('login')}
//                             onChange={handlePagesChange}
//                         />
//                         <label>Login</label>
//                     </div>
//                     <div>
//                         <input
//                             type="checkbox"
//                             value="signup"
//                             checked={form.pages.includes('signup')}
//                             onChange={handlePagesChange}
//                         />
//                         <label>Signup</label>
//                     </div>
//                     <div>
//                         <input
//                             type="checkbox"
//                             value="navbar"
//                             checked={form.pages.includes('navbar')}
//                             onChange={handlePagesChange}
//                         />
//                         <label>Navbar</label>
//                     </div>
//                     <div>
//                         <input
//                             type="checkbox"
//                             value="sidebar"
//                             checked={form.pages.includes('sidebar')}
//                             onChange={handlePagesChange}
//                         />
//                         <label>Sidebar</label>
//                     </div>
//                     <div>
//                         <input
//                             type="checkbox"
//                             value="payment"
//                             checked={form.pages.includes('payment')}
//                             onChange={handlePagesChange}
//                         />
//                         <label>Payment</label>
//                     </div>
//                     <div>
//                         <input
//                             type="checkbox"
//                             value="cart"
//                             checked={form.pages.includes('cart')}
//                             onChange={handlePagesChange}
//                         />
//                         <label>Cart</label>
//                     </div>
//                 </div>
//                 <div className="form-group">
//                     <label>Font</label>
//                     <select name="font" value={form.font} onChange={handleChange}>
//                         <option value="Arial">Arial</option>
//                         <option value="Verdana">Verdana</option>
//                         <option value="Helvetica">Helvetica</option>
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <label>Product Style</label>
//                     <select name="productStyle" value={form.productStyle} onChange={handleChange}>
//                         <option value="grid">Grid</option>
//                         <option value="list">List</option>
//                     </select>
//                 </div>
//                 <button type="button" onClick={handlePreview}>Preview</button>
//             </form>

//             {preview && (
//                 <div className="template-preview">
//                     <Navbar color={preview.navbarColor} onEdit={handleEdit} />
//                     <div className="page-container" style={{ backgroundColor: preview.backgroundColor }}>
//                         <Sidebar color={preview.sidebarColor} onEdit={handleEdit} />
//                         <main className="content">
//                             <h1>Welcome to {preview.name}</h1>
//                             <p>{preview.description}</p>
//                             <ProductList products={preview.products} productStyle={preview.productStyle} />
//                         </main>
//                     </div>
//                     {editSection && (
//                         <div className="edit-panel">
//                             <h2>Edit {editSection}</h2>
//                             <button onClick={handleSaveChanges}>Save Changes</button>
//                         </div>
//                     )}
//                     {preview.pages.includes('footer') && <Footer />}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TemplateBuilder;


import React, { useState, useCallback } from 'react';
import './Template.css'; // Ensure this file contains the required CSS styles

// ColorPicker Component
const ColorPicker = ({ name, value, onChange }) => (
  <div className="form-group">
    <label>{name}</label>
    <input
      type="color"
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

// Define different Navbar designs
const Navbar1 = ({ color }) => (
  <nav className="navbar" style={{ backgroundColor: color }}>
    <div className="navbar-logo">MyShop (Design 1)</div>
    <div className="navbar-links">
      <a href="#home">Home</a>
      <a href="#products">Products</a>
      <a href="#about">About</a>
    </div>
  </nav>
);

const Navbar2 = ({ color }) => (
  <nav className="navbar" style={{ backgroundColor: color }}>
    <div className="navbar-logo">ShopHere (Design 2)</div>
    <div className="navbar-links">
      <a href="#shop">Shop</a>
      <a href="#offers">Offers</a>
      <a href="#contact">Contact Us</a>
    </div>
  </nav>
);

// Define different Sidebar designs
const Sidebar1 = ({ color }) => (
  <aside className="sidebar" style={{ backgroundColor: color }}>
    <h3>Categories (Design 1)</h3>
    <ul>
      <li><a href="#electronics">Electronics</a></li>
      <li><a href="#fashion">Fashion</a></li>
      <li><a href="#home-appliances">Home Appliances</a></li>
    </ul>
  </aside>
);

const Sidebar2 = ({ color }) => (
  <aside className="sidebar" style={{ backgroundColor: color }}>
    <h3>Browse (Design 2)</h3>
    <ul>
      <li><a href="#gadgets">Gadgets</a></li>
      <li><a href="#clothing">Clothing</a></li>
      <li><a href="#books">Books</a></li>
    </ul>
  </aside>
);

const Footer = () => (
  <footer className="footer">
    <p>© 2024 MyShop. All rights reserved.</p>
  </footer>
);

const Carousel = () => (
  <div className="carousel">
    <h3>Featured Products</h3>
    <div className="carousel-slides">
      <div className="slide">Slide 1</div>
      <div className="slide">Slide 2</div>
      <div className="slide">Slide 3</div>
    </div>
  </div>
);

const ProductList = ({ products, productStyle }) => (
  <div className={`product-list ${productStyle === 'grid' ? 'grid' : 'list'}`}>
    {products.map((product) => (
      <div className="product-item" key={product.id}>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stock} units</p>
      </div>
    ))}
  </div>
);

// TemplateBuilder Component
const TemplateBuilder = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    themeColor: '#ffffff',
    backgroundColor: '#ffffff',
    navbarColor: '#007bff',
    sidebarColor: '#343a40',
    logo: null,
    products: [],
    pages: ['home'],
    font: 'Arial',
    productStyle: 'grid',
  });

  const [navbarDesign, setNavbarDesign] = useState(1);  // Navbar design selection
  const [sidebarDesign, setSidebarDesign] = useState(1); // Sidebar design selection
  const [preview, setPreview] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }, []);

  const handleProductChange = useCallback((e) => {
    const { value } = e.target;
    setForm((prevForm) => {
      const newProducts = [...prevForm.products];
      if (newProducts.includes(value)) {
        newProducts.splice(newProducts.indexOf(value), 1);
      } else {
        newProducts.push(value);
      }
      return { ...prevForm, products: newProducts };
    });
  }, []);

  const handleLogoChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prevForm) => ({ ...prevForm, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handlePagesChange = useCallback((e) => {
    const { value, checked } = e.target;
    setForm((prevForm) => {
      const newPages = [...prevForm.pages];
      if (checked) {
        if (!newPages.includes(value)) newPages.push(value);
      } else {
        const index = newPages.indexOf(value);
        if (index > -1) newPages.splice(index, 1);
      }
      return { ...prevForm, pages: newPages };
    });
  }, []);

  const handlePreview = () => {
    if (!form.name) {
      alert('Template name is required.');
      return;
    }
    setPreview(form);
  };

  const handleNavbarDesignChange = (e) => {
    setNavbarDesign(Number(e.target.value));
  };

  const handleSidebarDesignChange = (e) => {
    setSidebarDesign(Number(e.target.value));
  };

  // Function to render the selected Navbar design
  const renderNavbar = (color) => {
    switch (navbarDesign) {
      case 1:
        return <Navbar1 color={color} />;
      case 2:
        return <Navbar2 color={color} />;
      default:
        return <Navbar1 color={color} />;
    }
  };

  // Function to render the selected Sidebar design
  const renderSidebar = (color) => {
    switch (sidebarDesign) {
      case 1:
        return <Sidebar1 color={color} />;
      case 2:
        return <Sidebar2 color={color} />;
      default:
        return <Sidebar1 color={color} />;
    }
  };

  return (
    <div className="template-builder">
      <h2>Create a Professional Website Template</h2>
      <form>
        <div className="form-group">
          <label>Template Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <ColorPicker
          name="themeColor"
          value={form.themeColor}
          onChange={handleChange}
        />
        <ColorPicker
          name="backgroundColor"
          value={form.backgroundColor}
          onChange={handleChange}
        />
        <ColorPicker
          name="navbarColor"
          value={form.navbarColor}
          onChange={handleChange}
        />
        <ColorPicker
          name="sidebarColor"
          value={form.sidebarColor}
          onChange={handleChange}
        />
        <div className="form-group">
          <label>Logo Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
          />
          {form.logo && <img src={form.logo} alt="Logo Preview" width="100" />}
        </div>
        <div className="form-group">
          <label>Select Products</label>
          <div>
            <input
              type="checkbox"
              value="Product1"
              checked={form.products.includes('Product1')}
              onChange={handleProductChange}
            />
            <label>Product1</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="Product2"
              checked={form.products.includes('Product2')}
              onChange={handleProductChange}
            />
            <label>Product2</label>
          </div>
          {/* Add more products as needed */}
        </div>
        <div className="form-group">
          <label>Pages</label>
          <div>
            <input
              type="checkbox"
              value="home"
              checked={form.pages.includes('home')}
              onChange={handlePagesChange}
            />
            <label>Home</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="products"
              checked={form.pages.includes('products')}
              onChange={handlePagesChange}
            />
            <label>Products</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="about"
              checked={form.pages.includes('about')}
              onChange={handlePagesChange}
            />
            <label>About</label>
          </div>
        </div>
        <div className="form-group">
          <label>Font</label>
          <select
            name="font"
            value={form.font}
            onChange={handleChange}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            {/* Add more font options as needed */}
          </select>
        </div>
        <div className="form-group">
          <label>Product Style</label>
          <select
            name="productStyle"
            value={form.productStyle}
            onChange={handleChange}
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
          </select>
        </div>

        <div className="form-group">
          <label>Navbar Design</label>
          <select
            name="navbarDesign"
            value={navbarDesign}
            onChange={handleNavbarDesignChange}
          >
            <option value={1}>Navbar Design 1</option>
            <option value={2}>Navbar Design 2</option>
          </select>
        </div>

        <div className="form-group">
          <label>Sidebar Design</label>
          <select
            name="sidebarDesign"
            value={sidebarDesign}
            onChange={handleSidebarDesignChange}
          >
            <option value={1}>Sidebar Design 1</option>
            <option value={2}>Sidebar Design 2</option>
          </select>
        </div>

        <button type="button" onClick={handlePreview}>Preview</button>
      </form>

      {preview && (
        <div className="template-preview">
          {renderNavbar(form.navbarColor)}
          {renderSidebar(form.sidebarColor)}
          <Carousel />
          <ProductList products={form.products} productStyle={form.productStyle} />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default TemplateBuilder;
