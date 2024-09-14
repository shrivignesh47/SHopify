// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import './Template.css';
// import Navbar from './Tempnavbar';
// import Sidebar from './tempsidebar';
// import Footer from './tempfooter';
// import PageContent from './temppagecontent';

// // ColorPicker Component
// const ColorPicker = ({ name, value, onChange }) => (
//   <div className="template-form-group">
//     <label>{name}</label>
//     <input
//       type="color"
//       name={name}
//       value={value}
//       onChange={onChange}
//     />
//   </div>
// );

// // Carousel Component
// const Carousel = ({ images }) => (
//   <div className="carousel">
//     <h3>Featured Products</h3>
//     <div className="carousel-slides">
//       {images.map((src, index) => (
//         <div className="slide" key={index}>
//           <img src={src} alt={`Slide ${index + 1}`} />
//         </div>
//       ))}
//     </div>
//   </div>
// );

// // ProductList Component
// const ProductList = ({ products, productStyle, onProductChange }) => (
//   <div className={`product-list ${productStyle === 'grid' ? 'grid' : 'list'}`}>
//     {products.map((product) => (
//       <div className="product-item" key={product.id}>
//         <h4>{product.name}</h4>
//         <p>{product.description}</p>
//         <p>Category: {product.category}</p>
//         <p>Price: ${product.price}</p>
//         <p>Stock: {product.stock} units</p>
//         <button onClick={() => onProductChange(product.id)}>Edit</button>
//       </div>
//     ))}
//   </div>
// );

// const TemplateBuilder = () => {
//   const [form, setForm] = useState({
//     name: '',
//     description: '',
//     themeColor: '#ffffff',
//     backgroundColor: '#ffffff',
//     navbarColor: '#007bff',
//     sidebarColor: '#343a40',
//     logo: null,
//     products: [],
//     pages: ['home'],
//     font: 'Arial',
//     productStyle: 'grid',
//     footerDesign: 'minimal',
//     navbarDesign: 'default',
//     sidebarDesign: 'default',
//     breadcrumbs: ['Home'],
//   });

//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [carouselImages, setCarouselImages] = useState([]);
//   const [preview, setPreview] = useState(null);
//   const [deployUrl, setDeployUrl] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [editingItem, setEditingItem] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [sidebarItems, setSidebarItems] = useState([
//     { id: 'home', icon: 'icon-home', label: 'Home', link: '#home' },
//     { id: 'products', icon: 'icon-products', label: 'Products', link: '#products' },
//     { id: 'about', icon: 'icon-about', label: 'About', link: '#about', submenu: [
//       { id: 'team', label: 'Team', link: '#team' },
//       { id: 'careers', label: 'Careers', link: '#careers' },
//     ]},
//     { id: 'contact', icon: 'icon-contact', label: 'Contact', link: '#contact' },
//   ]);
//   const [navbarItems, setNavbarItems] = useState([
//   { id: 'home', icon: 'icon-home', label: 'Home', link: '#home' },
//   { id: 'products', icon: 'icon-products', label: 'Products', link: '#products' },
  
//   ]);
//   const fetchProducts = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/products', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       setProducts(response.data);
//     } catch (err) {
//       console.error('Error fetching products', err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setForm(prevForm => ({ ...prevForm, [name]: value }));
//   }, []);

//   const handleProductChange = useCallback((id) => {
//     console.log('Edit product with ID:', id);
//   }, []);

//   const handleLogoChange = useCallback((e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setForm(prevForm => ({ ...prevForm, logo: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   }, []);


//   const handlePageChange = (page) => {
//     setForm(prevForm => ({
//       ...prevForm,
//       pages: [page] // Ensure only the selected page is rendered
//     }));
//     console.log('Page changed to:', page);
//   };

//   const handlePagesChange = useCallback((e) => {
//     const { value, checked } = e.target;
//     setForm(prevForm => {
//       const newPages = [...prevForm.pages];
//       if (checked) {
//         if (!newPages.includes(value)) newPages.push(value);
//       } else {
//         const index = newPages.indexOf(value);
//         if (index > -1) newPages.splice(index, 1);
//       }
//       return { ...prevForm, pages: newPages };
//     });
//   }, []);

//   const handleCarouselImageChange = useCallback((e) => {
//     const files = Array.from(e.target.files).map(file => URL.createObjectURL(file));
//     setCarouselImages(files);
//   }, []);

//   const handlePreview = () => {
//     if (!form.name) {
//       alert('Template name is required.');
//       return;
//     }
//     setPreview(form);
//   };

//   const handleDeploy = () => {
//     const url = `http://localhost:3001/deploy?template=${encodeURIComponent(form.name)}`;
//     setDeployUrl(url);
//   };

//   const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

//   const handleEditItem = (itemId) => {
//     const item = sidebarItems.find(item => item.id === itemId);
//     if (item) {
//       setEditingItem(item);
//     }
//   };

//   const handleSaveEdit = (e) => {
//     e.preventDefault();
//     setSidebarItems(prevItems => prevItems.map(item =>
//       item.id === editingItem.id ? editingItem : item
//     ));
//     setEditingItem(null);
//   };

//   const handleSaveEditNavbar = (e) => {
//     e.preventDefault();
//     setNavbarItems(prevItems => prevItems.map(item =>
//       item.id === editingItem.id ? editingItem : item
//     ));
//     setEditingItem(null);
//   };

//   const showAuthLinks = form.pages.includes('login') || form.pages.includes('signup');

//   return (
//     <div className="template-builder">
//       <h2>Create Your Professional Website Template</h2>
//       <form>
//         {/* Form Controls */}
//         <div className="template-form-group">
//           <label>Template Name</label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Other form controls */}
//         <ColorPicker
//           name="themeColor"
//           value={form.themeColor}
//           onChange={handleChange}
//         />
//         <ColorPicker
//           name="backgroundColor"
//           value={form.backgroundColor}
//           onChange={handleChange}
//         />
//         <ColorPicker
//           name="navbarColor"
//           value={form.navbarColor}
//           onChange={handleChange}
//         />
//         <ColorPicker
//           name="sidebarColor"
//           value={form.sidebarColor}
//           onChange={handleChange}
//         />
//         <div className="template-form-group">
//           <label>Product Style</label>
//           <select
//             name="productStyle"
//             value={form.productStyle}
//             onChange={handleChange}
//           >
//             <option value="grid">Grid</option>
//             <option value="list">List</option>
//           </select>
//         </div>

//         <div className="template-form-group">
//         <label>Pages</label>
//         <div>
//           <label>
//             <input
//               type="checkbox"
//               value="home"
//               checked={form.pages.includes('home')}
//               onChange={handlePagesChange}
//             />
//             Home
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="login"
//               checked={form.pages.includes('login')}
//               onChange={handlePagesChange}
//             />
//             Login
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="signup"
//               checked={form.pages.includes('signup')}
//               onChange={handlePagesChange}
//             />
//             Signup
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="order"
//               checked={form.pages.includes('order')}
//               onChange={handlePagesChange}
//             />
//             Order
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="payment"
//               checked={form.pages.includes('payment')}
//               onChange={handlePagesChange}
//             />
//             Payment
//           </label>
//         </div>
//       </div>

//       <div className="template-form-group">
//         <label>Logo</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleLogoChange}
//         />
//         {form.logo && <img src={form.logo} alt="Logo Preview" className="logo-preview" />}
//       </div>

//       <div className="template-form-group">
//         <label>Carousel Images</label>
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleCarouselImageChange}
//         />
//       </div>
        
//       <div className="template-form-group">
//           <label>Footer Design</label>
//           <select name="footerDesign" value={form.footerDesign} onChange={handleChange}>
//             <option value="minimal">Minimal</option>
//             <option value="classic">Classic</option>
//             <option value="modern">Modern</option>
//             <option value="social">Social</option>
//           </select>
//         </div>
//         <div className="template-form-group">
//         <label htmlFor="navbarDesign">Navbar Design</label>
//         <select
//           id="navbarDesign"
//           name="navbarDesign"
//           value={form.navbarDesign}
//           onChange={handleChange}
//         >
//           <option value="default">Default</option>
//           <option value="menu">Menu</option>
//           <option value="search">Search</option>
//           <option value="minimal">Minimal</option>
//           <option value="dynamic">Dynamic</option>
//           <option value="centered">Centered</option>
//         </select>
//       </div>

//                <div className="template-form-group">
//                  <label>Sidebar Design</label>
//                  <select name="sidebarDesign" value={form.sidebarDesign} onChange={handleChange}>
//                    <option value="default">Default</option>
//                    <option value="modern">Modern</option>
//                    <option value="minimal">Minimal</option>
//                  </select>
//               </div>
//         <div className="template-form-group">
//           <label>Font</label>
//           <input
//             type="text"
//             name="font"
//             value={form.font}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="template-form-group">
//           <label>Breadcrumbs</label>
//           <input
//             type="text"
//             name="breadcrumbs"
//             value={form.breadcrumbs.join(', ')}
//             onChange={(e) => setForm(prevForm => ({
//               ...prevForm,
//               breadcrumbs: e.target.value.split(',').map(item => item.trim())
//             }))}
//           />
//         </div>
//         <button type="button" onClick={handlePreview}>Preview</button>
//         <button type="button" onClick={handleDeploy}>Deploy</button>
//       </form>

//       {preview && (
//         <div className="template-preview">
//           <Navbar
//             color={form.navbarColor}
//             design={form.navbarDesign}
//             breadcrumbs={form.breadcrumbs}
//             onToggleSidebar={toggleSidebar}
//             onSearch={(query) => setSearchQuery(query)}
//             menuItems={navbarItems}
//             showAuthLinks={showAuthLinks}
//             onPageChange={handlePageChange}
//             logo={form.logo}
//           />
//           <div className="container">
//             <Sidebar
//               color={form.sidebarColor}
//               design={form.sidebarDesign}
//               collapsed={sidebarCollapsed}
//               onToggle={toggleSidebar}
//               items={sidebarItems}
//               onEditItem={handleEditItem}
//             />
//             <main className="content">
//               {form.pages.includes('login') && (
//                 <PageContent page="login" />
//               )}
//               {form.pages.includes('signup') && (
//                 <PageContent page="signup" />
//               )}
//               {form.pages.includes('home') && (
//                 <>
//                   <PageContent page="home" />
//                   <Carousel images={carouselImages} />
//                   <ProductList
//                     products={products.filter(product =>
//                       product.name.toLowerCase().includes(searchQuery.toLowerCase())
//                     )}
//                     productStyle={form.productStyle}
//                     onProductChange={handleProductChange}
//                   />
//                 </>
//               )}
//               {!form.pages.includes('home') && !form.pages.includes('login') && !form.pages.includes('signup') && (
//                 <PageContent page="default" />
//               )}
//             </main>
//           </div>
//           <Footer design={form.footerDesign} />
//         </div>
//       )}

//       {deployUrl && (
//         <div className="deploy-url">
//           <p>Template deployed! Visit: <a href={deployUrl} target="_blank" rel="noopener noreferrer">{deployUrl}</a></p>
//         </div>
//       )}

//       {editingItem && (
//         <div className="edit-sidebar-item">
//           <h3>Edit Sidebar Item</h3>
//           <form onSubmit={handleSaveEdit}>
//             <div className="template-form-group">
//               <label>Label</label>
//               <input
//                 type="text"
//                 value={editingItem.label}
//                 onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
//               />
//             </div>
//             <div className="template-form-group">
//               <label>Link</label>
//               <input
//                 type="text"
//                 value={editingItem.link}
//                 onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
//               />
//             </div>
//             <div className="template-form-group">
//               <label>Icon</label>
//               <input
//                 type="text"
//                 value={editingItem.icon}
//                 onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
//               />
//             </div>
//             <div className="template-form-group">
//               <label>Color</label>
//               <input
//                 type="color"
//                 value={editingItem.color}
//                 onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
//               />
//             </div>
//             <button type="submit">Save</button>
//             <button type="button" onClick={() => setEditingItem(null)}>Cancel</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TemplateBuilder;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Template.css';
import Navbar from './Tempnavbar';
import Sidebar from './tempsidebar';
import Footer from './tempfooter';
import PageContent from './temppagecontent';

// ColorPicker Component
const ColorPicker = ({ name, value, onChange }) => (
  <div className="template-form-group">
    <label>{name}</label>
    <input
      type="color"
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

// Carousel Component
const Carousel = ({ images }) => (
  <div className="carousel">
    <h3>Featured Products</h3>
    <div className="carousel-slides">
      {images.map((src, index) => (
        <div className="slide" key={index}>
          <img src={src} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>
  </div>
);

// ProductList Component
const ProductList = ({ products, productStyle, onProductChange }) => (
  <div className={`product-list ${productStyle === 'grid' ? 'grid' : 'list'}`}>
    {products.map((product) => (
      <div className="product-item" key={product.id}>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stock} units</p>
        <button onClick={() => onProductChange(product.id)}>Edit</button>
      </div>
    ))}
  </div>
);

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
    footerDesign: 'minimal',
    navbarDesign: 'default',
    sidebarDesign: 'default',
    breadcrumbs: ['Home'],
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [deployUrl, setDeployUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [sidebarItems, setSidebarItems] = useState([
    { id: 'home', icon: 'icon-home', label: 'Home', link: '#home' },
    { id: 'products', icon: 'icon-products', label: 'Products', link: '#products' },
    { id: 'about', icon: 'icon-about', label: 'About', link: '#about', submenu: [
      { id: 'team', label: 'Team', link: '#team' },
      { id: 'careers', label: 'Careers', link: '#careers' },
    ]},
    { id: 'contact', icon: 'icon-contact', label: 'Contact', link: '#contact' },
  ]);
  const [navbarItems, setNavbarItems] = useState([
    { id: 'home', icon: 'icon-home', label: 'Home', link: '#home' },
    { id: 'products', icon: 'icon-products', label: 'Products', link: '#products' },
    ...(form.pages.includes('home') ? [
      { id: 'login', icon: 'icon-login', label: 'Login', link: '#login' },
    ] : []),
    ...(form.pages.includes('home') ? [
      { id: 'signup', icon: 'icon-signup', label: 'Signup', link: '#signup' },
    ] : []),
  ]);

  const fetchProducts = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products', err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  }, []);

  const handleProductChange = useCallback((id) => {
    console.log('Edit product with ID:', id);
  }, []);

  const handleLogoChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prevForm => ({ ...prevForm, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handlePageChange = (page) => {
    setForm(prevForm => ({
      ...prevForm,
      pages: [page] // Ensure only the selected page is rendered
    }));
  };

  const handlePagesChange = useCallback((e) => {
    const { value, checked } = e.target;
    setForm(prevForm => {
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

  const handleCarouselImageChange = useCallback((e) => {
    const files = Array.from(e.target.files).map(file => URL.createObjectURL(file));
    setCarouselImages(files);
  }, []);

  const handlePreview = () => {
    if (!form.name) {
      alert('Template name is required.');
      return;
    }
    setPreview(form);
  };

  const handleDeploy = () => {
    const url = `http://localhost:3001/deploy?template=${encodeURIComponent(form.name)}`;
    setDeployUrl(url);
  };

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

  const handleEditItem = (itemId) => {
    const item = sidebarItems.find(item => item.id === itemId);
    if (item) {
      setEditingItem(item);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setSidebarItems(prevItems => prevItems.map(item =>
      item.id === editingItem.id ? editingItem : item
    ));
    setEditingItem(null);
  };

  const handleSaveEditNavbar = (e) => {
    e.preventDefault();
    setNavbarItems(prevItems => prevItems.map(item =>
      item.id === editingItem.id ? editingItem : item
    ));
    setEditingItem(null);
  };



  return (
    <div className="template-builder">
      <h2>Create Your Professional Website Template</h2>
      <form>
        {/* Form Controls */}
        <div className="template-form-group">
          <label>Template Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Other form controls */}
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
        <div className="template-form-group">
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

        <div className="template-form-group">
          <label>Pages</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="home"
                checked={form.pages.includes('home')}
                onChange={handlePagesChange}
              />
              Home
            </label>
            <label>
              <input
                type="checkbox"
                value="order"
                checked={form.pages.includes('order')}
                onChange={handlePagesChange}
              />
              Order
            </label>
            <label>
              <input
                type="checkbox"
                value="payment"
                checked={form.pages.includes('payment')}
                onChange={handlePagesChange}
              />
              Payment
            </label>
          </div>
        </div>

        <div className="template-form-group">
          <label>Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
          />
          {form.logo && <img src={form.logo} alt="Logo Preview" className="logo-preview" />}
        </div>

        <div className="template-form-group">
          <label>Carousel Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleCarouselImageChange}
          />
        </div>
        
        <div className="template-form-group">
          <label>Footer Design</label>
          <select name="footerDesign" value={form.footerDesign} onChange={handleChange}>
            <option value="minimal">Minimal</option>
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="social">Social</option>
          </select>
        </div>

        <div className="template-form-group">
          <label>Navbar Design</label>
          <select
            name="navbarDesign"
            value={form.navbarDesign}
            onChange={handleChange}
          >
            <option value="default">Default</option>
            <option value="menu">Menu</option>
            <option value="search">Search</option>
            <option value="minimal">Minimal</option>
            <option value="dynamic">Dynamic</option>
            <option value="centered">Centered</option>
          </select>
        </div>

        <div className="template-form-group">
          <label>Sidebar Design</label>
          <select name="sidebarDesign" value={form.sidebarDesign} onChange={handleChange}>
            <option value="default">Default</option>
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>

        <div className="template-form-group">
          <label>Font</label>
          <input
            type="text"
            name="font"
            value={form.font}
            onChange={handleChange}
          />
        </div>
        <div className="template-form-group">
          <label>Breadcrumbs</label>
          <input
            type="text"
            name="breadcrumbs"
            value={form.breadcrumbs.join(', ')}
            onChange={(e) => setForm(prevForm => ({
              ...prevForm,
              breadcrumbs: e.target.value.split(',').map(item => item.trim())
            }))}
          />
        </div>
        <button type="button" onClick={handlePreview}>Preview</button>
        <button type="button" onClick={handleDeploy}>Deploy</button>
      </form>

      {preview && (
        <div className="template-preview">
          <Navbar
            color={form.navbarColor}
            design={form.navbarDesign}
            breadcrumbs={form.breadcrumbs}
            onToggleSidebar={toggleSidebar}
            onSearch={(query) => setSearchQuery(query)}
            menuItems={navbarItems}
            onPageChange={handlePageChange}
            logo={form.logo}
          />
          <div className="container">
            <Sidebar
              color={form.sidebarColor}
              design={form.sidebarDesign}
              collapsed={sidebarCollapsed}
              onToggle={toggleSidebar}
              items={sidebarItems}
              onEditItem={handleEditItem}
              onSidebarItemClick={handlePageChange} // This line connects sidebar clicks to page change
            />
            <main className="content">
              {form.pages.includes('login') && <PageContent page="login" />}
              {form.pages.includes('signup') && <PageContent page="signup" />}
              {form.pages.includes('home') && (
                <>
                  <PageContent page="home" />
                  <Carousel images={carouselImages} />
                  <ProductList
                    products={products.filter(product =>
                      product.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )}
                    productStyle={form.productStyle}
                    onProductChange={handleProductChange}
                  />
                </>
              )}
              {!form.pages.includes('home') && !form.pages.includes('login') && !form.pages.includes('signup') && <PageContent page="default" />}
            </main>
          </div>
          <Footer design={form.footerDesign} />
        </div>
      )}

      {deployUrl && (
        <div className="deploy-url">
          <p>Template deployed! Visit: <a href={deployUrl} target="_blank" rel="noopener noreferrer">{deployUrl}</a></p>
        </div>
      )}

      {editingItem && (
        <div className="edit-sidebar-item">
          <h3>Edit Sidebar Item</h3>
          <form onSubmit={handleSaveEdit}>
            <div className="template-form-group">
              <label>Label</label>
              <input
                type="text"
                value={editingItem.label}
                onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
              />
            </div>
            <div className="template-form-group">
              <label>Link</label>
              <input
                type="text"
                value={editingItem.link}
                onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
              />
            </div>
            <div className="template-form-group">
              <label>Icon</label>
              <input
                type="text"
                value={editingItem.icon}
                onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
              />
            </div>
            <div className="template-form-group">
              <label>Color</label>
              <input
                type="color"
                value={editingItem.color}
                onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingItem(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TemplateBuilder;
