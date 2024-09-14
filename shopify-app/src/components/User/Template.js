// import React, { useState, useCallback } from 'react';
// import './Template.css'; // Ensure this file contains the required CSS styles

// // ColorPicker Component
// const ColorPicker = ({ name, value, onChange }) => (
//   <div className="form-group">
//     <label>{name}</label>
//     <input
//       type="color"
//       name={name}
//       value={value}
//       onChange={onChange}
//     />
//   </div>
// );

// // Navbar Designs
// const Navbar1 = ({ color }) => (
//   <nav className="navbar" style={{ backgroundColor: color }}>
//     <div className="navbar-logo">MyShop (Design 1)</div>
//     <div className="navbar-links">
//       <a href="#home">Home</a>
//       <a href="#products">Products</a>
//       <a href="#about">About</a>
//     </div>
//   </nav>
// );

// const Navbar2 = ({ color }) => (
//   <nav className="navbar" style={{ backgroundColor: color }}>
//     <div className="navbar-logo">ShopHere (Design 2)</div>
//     <div className="navbar-links">
//       <a href="#shop">Shop</a>
//       <a href="#offers">Offers</a>
//       <a href="#contact">Contact Us</a>
//     </div>
//   </nav>
// );

// // Sidebar Designs
// const Sidebar1 = ({ color }) => (
//   <aside className="sidebar" style={{ backgroundColor: color }}>
//     <h3>Categories (Design 1)</h3>
//     <ul>
//       <li><a href="#electronics">Electronics</a></li>
//       <li><a href="#fashion">Fashion</a></li>
//       <li><a href="#home-appliances">Home Appliances</a></li>
//     </ul>
//   </aside>
// );

// const Sidebar2 = ({ color }) => (
//   <aside className="sidebar" style={{ backgroundColor: color }}>
//     <h3>Browse (Design 2)</h3>
//     <ul>
//       <li><a href="#gadgets">Gadgets</a></li>
//       <li><a href="#clothing">Clothing</a></li>
//       <li><a href="#books">Books</a></li>
//     </ul>
//   </aside>
// );

// const Footer = () => (
//   <footer className="footer">
//     <p>© 2024 MyShop. All rights reserved.</p>
//   </footer>
// );

// const Carousel = () => (
//   <div className="carousel">
//     <h3>Featured Products</h3>
//     <div className="carousel-slides">
//       <div className="slide">Slide 1</div>
//       <div className="slide">Slide 2</div>
//       <div className="slide">Slide 3</div>
//     </div>
//   </div>
// );

// const ProductList = ({ products, productStyle }) => (
//   <div className={`product-list ${productStyle === 'grid' ? 'grid' : 'list'}`}>
//     {products.map((product) => (
//       <div className="product-item" key={product.id}>
//         <h4>{product.name}</h4>
//         <p>{product.description}</p>
//         <p>Category: {product.category}</p>
//         <p>Price: ${product.price}</p>
//         <p>Stock: {product.stock} units</p>
//       </div>
//     ))}
//   </div>
// );

// // PageContent Component
// const PageContent = ({ page }) => {
//   const pageContents = {
//     login: <div><h2>Login Page</h2><p>Login Form</p></div>,
//     signup: <div><h2>Signup Page</h2><p>Signup Form</p></div>,
//     home: <div><h2>Home Page</h2><p>Welcome to our website!</p></div>,
//     order: <div><h2>Order Page</h2><p>Order Details</p></div>,
//     payment: <div><h2>Payment Page</h2><p>Payment Form</p></div>,
//     default: <div><h2>Page Not Found</h2></div>
//   };

//   return pageContents[page] || pageContents.default;
// };

// // TemplateBuilder Component
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
//   });

//   const [navbarDesign, setNavbarDesign] = useState(1);  // Navbar design selection
//   const [sidebarDesign, setSidebarDesign] = useState(1); // Sidebar design selection
//   const [preview, setPreview] = useState(null);
//   const [deployUrl, setDeployUrl] = useState('');

//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({ ...prevForm, [name]: value }));
//   }, []);

//   const handleProductChange = useCallback((e) => {
//     const { value } = e.target;
//     setForm((prevForm) => {
//       const newProducts = [...prevForm.products];
//       if (newProducts.includes(value)) {
//         newProducts.splice(newProducts.indexOf(value), 1);
//       } else {
//         newProducts.push(value);
//       }
//       return { ...prevForm, products: newProducts };
//     });
//   }, []);

//   const handleLogoChange = useCallback((e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setForm((prevForm) => ({ ...prevForm, logo: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   }, []);

//   const handlePagesChange = useCallback((e) => {
//     const { value, checked } = e.target;
//     setForm((prevForm) => {
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

//   const handlePreview = () => {
//     if (!form.name) {
//       alert('Template name is required.');
//       return;
//     }
//     setPreview(form);
//   };

//   const handleDeploy = () => {
//     const url = `http://localhost:3001/preview?template=${encodeURIComponent(form.name)}`;
//     setDeployUrl(url);
//   };

//   const handleNavbarDesignChange = (e) => {
//     setNavbarDesign(Number(e.target.value));
//   };

//   const handleSidebarDesignChange = (e) => {
//     setSidebarDesign(Number(e.target.value));
//   };

//   const renderNavbar = (color) => {
//     switch (navbarDesign) {
//       case 1:
//         return <Navbar1 color={color} />;
//       case 2:
//         return <Navbar2 color={color} />;
//       default:
//         return <Navbar1 color={color} />;
//     }
//   };

//   const renderSidebar = (color) => {
//     switch (sidebarDesign) {
//       case 1:
//         return <Sidebar1 color={color} />;
//       case 2:
//         return <Sidebar2 color={color} />;
//       default:
//         return <Sidebar1 color={color} />;
//     }
//   };

//   return (
//     <div className="template-builder">
//       <h2>Create Your Professional Website Template</h2>
//       <form>
//         <div className="form-group">
//           <label>Template Name</label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             rows="4"
//           />
//         </div>
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
//         <div className="form-group">
//           <label>Logo Upload</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleLogoChange}
//           />
//           {form.logo && <img src={form.logo} alt="Logo Preview" className="logo-preview" />}
//         </div>
//         <div className="form-group">
//           <label>Select Products</label>
//           <div>
//             <input
//               type="checkbox"
//               value="Product1"
//               checked={form.products.includes('Product1')}
//               onChange={handleProductChange}
//             />
//             <label>Product1</label>
//           </div>
//           <div>
//             <input
//               type="checkbox"
//               value="Product2"
//               checked={form.products.includes('Product2')}
//               onChange={handleProductChange}
//             />
//             <label>Product2</label>
//           </div>
//           {/* Add more products as needed */}
//         </div>
//         <div className="form-group">
//           <label>Pages</label>
//           {['home', 'products', 'about', 'login', 'signup', 'order', 'payment'].map((page) => (
//             <div key={page}>
//               <input
//                 type="checkbox"
//                 value={page}
//                 checked={form.pages.includes(page)}
//                 onChange={handlePagesChange}
//               />
//               <label>{page.charAt(0).toUpperCase() + page.slice(1)}</label>
//             </div>
//           ))}
//         </div>
//         <div className="form-group">
//           <label>Font</label>
//           <select
//             name="font"
//             value={form.font}
//             onChange={handleChange}
//           >
//             <option value="Arial">Arial</option>
//             <option value="Times New Roman">Times New Roman</option>
//             <option value="Courier New">Courier New</option>
//             {/* Add more font options as needed */}
//           </select>
//         </div>
//         <div className="form-group">
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
//         <div className="form-group">
//           <label>Navbar Design</label>
//           <select
//             name="navbarDesign"
//             value={navbarDesign}
//             onChange={handleNavbarDesignChange}
//           >
//             <option value={1}>Navbar Design 1</option>
//             <option value={2}>Navbar Design 2</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Sidebar Design</label>
//           <select
//             name="sidebarDesign"
//             value={sidebarDesign}
//             onChange={handleSidebarDesignChange}
//           >
//             <option value={1}>Sidebar Design 1</option>
//             <option value={2}>Sidebar Design 2</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <button type="button" onClick={handlePreview}>Preview</button>
//           <button type="button" onClick={handleDeploy}>Deploy</button>
//         </div>
//       </form>

//       {preview && (
//         <div className="template-preview">
//           {renderNavbar(form.navbarColor)}
//           {renderSidebar(form.sidebarColor)}
//           <Carousel />
//           <ProductList products={form.products} productStyle={form.productStyle} />
//           <Footer />
//           {form.pages.map(page => (
//             <PageContent key={page} page={page} />
//           ))}
//         </div>
//       )}

//       {deployUrl && (
//         <div className="deploy-url">
//           <p>Preview your deployed template here:</p>
//           <a href={deployUrl} target="_blank" rel="noopener noreferrer">{deployUrl}</a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TemplateBuilder;

// import React, { useState, useCallback } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import './Template.css';

// // ColorPicker Component
// const ColorPicker = ({ name, value, onChange }) => (
//   <div className="form-group">
//     <label>{name}</label>
//     <input
//       type="color"
//       name={name}
//       value={value}
//       onChange={onChange}
//     />
//   </div>
// );

// // Navbar Component
// const Navbar = ({ color, breadcrumbs, onToggleSidebar, onSearch }) => (
//   <nav className="navbar" style={{ backgroundColor: color }}>
//     <button className="sidebar-toggle" onClick={onToggleSidebar}>
//       ☰
//     </button>
//     <div className="navbar-breadcrumbs">
//       {breadcrumbs.map((crumb, index) => (
//         <span key={index}>{crumb} {index < breadcrumbs.length - 1 && ' > '}</span>
//       ))}
//     </div>
//     <input
//       type="text"
//       placeholder="Search..."
//       className="navbar-search"
//       onChange={(e) => onSearch(e.target.value)}
//     />
//   </nav>
// );

// // Sidebar Component
// const Sidebar = ({ color, collapsed, onToggle, items, onEditItem }) => (
//   <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} style={{ backgroundColor: color }}>
//     <button className="sidebar-toggle" onClick={onToggle}>
//       {collapsed ? '☰' : '✖'}
//     </button>
//     {!collapsed && (
//       <div className="sidebar-content">
//         <Droppable droppableId="sidebar">
//           {(provided) => (
//             <ul ref={provided.innerRef} {...provided.droppableProps}>
//               {items.map((item, index) => (
//                 <Draggable key={item.id} draggableId={item.id} index={index}>
//                   {(provided) => (
//                     <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                       <i className={item.icon}></i>
//                       <a href={item.link}>{item.label}</a>
//                       <button onClick={() => onEditItem(item.id)}>Edit</button>
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </ul>
//           )}
//         </Droppable>
//       </div>
//     )}
//   </aside>
// );

// const Footer = ({ design }) => (
//   <footer className={`footer ${design}`}>
//     <p>© 2024 MyShop. All rights reserved.</p>
//   </footer>
// );

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

// const PageContent = ({ page }) => {
//   const pageContents = {
//     login: <div><h2>Login Page</h2><p>Login Form</p></div>,
//     signup: <div><h2>Signup Page</h2><p>Signup Form</p></div>,
//     home: <div><h2>Home Page</h2><p>Welcome to our website!</p></div>,
//     order: <div><h2>Order Page</h2><p>Order Details</p></div>,
//     payment: <div><h2>Payment Page</h2><p>Payment Form</p></div>,
//     default: <div><h2>Page Not Found</h2></div>
//   };

//   return pageContents[page] || pageContents.default;
// };

// // TemplateBuilder Component
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
//     breadcrumbs: ['Home'],
//   });

//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [carouselImages, setCarouselImages] = useState([]);
//   const [preview, setPreview] = useState(null);
//   const [deployUrl, setDeployUrl] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [editingItem, setEditingItem] = useState(null);

//   const [sidebarItems, setSidebarItems] = useState([
//     { id: 'home', icon: 'icon-home', label: 'Home', link: '#home' },
//     { id: 'products', icon: 'icon-products', label: 'Products', link: '#products' },
//     { id: 'about', icon: 'icon-about', label: 'About', link: '#about' },
//     { id: 'contact', icon: 'icon-contact', label: 'Contact', link: '#contact' },
//   ]);

//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({ ...prevForm, [name]: value }));
//   }, []);

//   const handleProductChange = useCallback((e) => {
//     const { value } = e.target;
//     setForm((prevForm) => {
//       const newProducts = [...prevForm.products];
//       if (newProducts.includes(value)) {
//         newProducts.splice(newProducts.indexOf(value), 1);
//       } else {
//         newProducts.push(value);
//       }
//       return { ...prevForm, products: newProducts };
//     });
//   }, []);

//   const handleLogoChange = useCallback((e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setForm((prevForm) => ({ ...prevForm, logo: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   }, []);

//   const handlePagesChange = useCallback((e) => {
//     const { value, checked } = e.target;
//     setForm((prevForm) => {
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

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const { source, destination } = result;

//     const items = Array.from(sidebarItems);
//     const [movedItem] = items.splice(source.index, 1);
//     items.splice(destination.index, 0, movedItem);

//     setSidebarItems(items);
//   };

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

//   return (
//     <div className="template-builder">
//       <h2>Create Your Professional Website Template</h2>
//       <form>
//         <div className="form-group">
//           <label>Template Name</label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             rows="4"
//           />
//         </div>
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
//         <div className="form-group">
//           <label>Logo Upload</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleLogoChange}
//           />
//           {form.logo && <img src={form.logo} alt="Logo Preview" className="logo-preview" />}
//         </div>
//         <div className="form-group">
//           <label>Carousel Images</label>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleCarouselImageChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>Products</label>
//           <input
//             type="text"
//             placeholder="Enter product name"
//             onChange={handleProductChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>Pages</label>
//           {['home', 'login', 'signup', 'order', 'payment'].map((page) => (
//             <div key={page}>
//               <input
//                 type="checkbox"
//                 value={page}
//                 checked={form.pages.includes(page)}
//                 onChange={handlePagesChange}
//               />
//               <label>{page.charAt(0).toUpperCase() + page.slice(1)}</label>
//             </div>
//           ))}
//         </div>
//         <div className="form-group">
//           <label>Font</label>
//           <select
//             name="font"
//             value={form.font}
//             onChange={handleChange}
//           >
//             <option value="Arial">Arial</option>
//             <option value="Times New Roman">Times New Roman</option>
//             <option value="Courier New">Courier New</option>
//           </select>
//         </div>
//         <div className="form-group">
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
//         <div className="form-group">
//           <label>Footer Design</label>
//           <select
//             name="footerDesign"
//             value={form.footerDesign}
//             onChange={handleChange}
//           >
//             <option value="minimal">Minimal</option>
//             <option value="classic">Classic</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <button type="button" onClick={handlePreview}>Preview</button>
//           <button type="button" onClick={handleDeploy}>Deploy</button>
//         </div>
//       </form>

//       {preview && (
//         <div className="template-preview">
//           <Navbar
//             color={form.navbarColor}
//             breadcrumbs={form.breadcrumbs}
//             onToggleSidebar={toggleSidebar}
//             onSearch={setSearchQuery}
//           />
//           <DragDropContext onDragEnd={onDragEnd}>
//             <Droppable droppableId="sidebar">
//               {(provided) => (
//                 <Sidebar
//                   color={form.sidebarColor}
//                   collapsed={sidebarCollapsed}
//                   onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
//                   items={sidebarItems}
//                   onEditItem={handleEditItem}
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                 />
//               )}
//             </Droppable>
//           </DragDropContext>
//           <div className={`content ${sidebarCollapsed ? 'full-width' : ''}`}>
//             <Carousel images={carouselImages} />
//             <ProductList products={form.products.filter(product => product.name.includes(searchQuery))} productStyle={form.productStyle} onProductChange={handleProductChange} />
//             {form.pages.map(page => (
//               <PageContent key={page} page={page} />
//             ))}
//           </div>
//           <Footer design={form.footerDesign} />
//         </div>
//       )}

//       {deployUrl && (
//         <div className="deploy-url">
//           <p>Preview your deployed template here:</p>
//           <a href={deployUrl} target="_blank" rel="noopener noreferrer">{deployUrl}</a>
//         </div>
//       )}

//       {editingItem && (
//         <div className="edit-sidebar-item">
//           <h3>Edit Sidebar Item</h3>
//           <form onSubmit={handleSaveEdit}>
//             <div className="form-group">
//               <label>Label</label>
//               <input
//                 type="text"
//                 value={editingItem.label}
//                 onChange={(e) => setEditingItem(prev => ({ ...prev, label: e.target.value }))}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Link</label>
//               <input
//                 type="text"
//                 value={editingItem.link}
//                 onChange={(e) => setEditingItem(prev => ({ ...prev, link: e.target.value }))}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Icon Class</label>
//               <input
//                 type="text"
//                 value={editingItem.icon}
//                 onChange={(e) => setEditingItem(prev => ({ ...prev, icon: e.target.value }))}
//                 required
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

// import React, { useState, useCallback } from 'react';
// import './Template.css';

// // ColorPicker Component
// const ColorPicker = ({ name, value, onChange }) => (
//   <div className="form-group">
//     <label>{name}</label>
//     <input
//       type="color"
//       name={name}
//       value={value}
//       onChange={(e) => onChange(e)}
//     />
//   </div>
// );

// // Navbar Component
// const Navbar = ({ color, design, breadcrumbs, onToggleSidebar, onSearch }) => (
//   <nav className={`navbar ${design}`} style={{ backgroundColor: color }}>
//     <button className="sidebar-toggle" onClick={onToggleSidebar}>
//       ☰
//     </button>
//     <div className="navbar-breadcrumbs">
//       {breadcrumbs.map((crumb, index) => (
//         <span key={index}>{crumb} {index < breadcrumbs.length - 1 && ' > '}</span>
//       ))}
//     </div>
//     <input
//       type="text"
//       placeholder="Search..."
//       className="navbar-search"
//       onChange={(e) => onSearch(e.target.value)}
//     />
//   </nav>
// );

// // Sidebar Component
// const Sidebar = ({ color, design, collapsed, onToggle, items, onEditItem }) => (
//   <aside className={`sidebar ${design} ${collapsed ? 'collapsed' : ''}`} style={{ backgroundColor: color }}>
//     {!collapsed && (
//       <div className="sidebar-content">
//         <ul>
//           {items.map((item) => (
//             <li key={item.id}>
//               <i className={item.icon}></i>
//               <a href={item.link}>{item.label}</a>
//               <button onClick={() => onEditItem(item.id)}>Edit</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     )}
//   </aside>
// );

// // Footer Component
// const Footer = ({ design }) => (
//   <footer className={`footer ${design}`}>
//     <p>© 2024 MyShop. All rights reserved.</p>
//   </footer>
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

// // PageContent Component
// const PageContent = ({ page }) => {
//   const pageContents = {
//     login: <div><h2>Login Page</h2><p>Login Form</p></div>,
//     signup: <div><h2>Signup Page</h2><p>Signup Form</p></div>,
//     home: <div><h2>Home Page</h2><p>Welcome to our website!</p></div>,
//     order: <div><h2>Order Page</h2><p>Order Details</p></div>,
//     payment: <div><h2>Payment Page</h2><p>Payment Form</p></div>,
//     default: <div><h2>Page Not Found</h2></div>
//   };

//   return pageContents[page] || pageContents.default;
// };

// // TemplateBuilder Component
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

//   const [sidebarItems, setSidebarItems] = useState([
//     { id: 'home', icon: 'icon-home', label: 'Home', link: '#home' },
//     { id: 'products', icon: 'icon-products', label: 'Products', link: '#products' },
//     { id: 'about', icon: 'icon-about', label: 'About', link: '#about' },
//     { id: 'contact', icon: 'icon-contact', label: 'Contact', link: '#contact' },
//   ]);

//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({ ...prevForm, [name]: value }));
//   }, []);

//   const handleProductChange = useCallback((e) => {
//     const { value } = e.target;
//     setForm((prevForm) => {
//       const newProducts = [...prevForm.products];
//       if (newProducts.includes(value)) {
//         newProducts.splice(newProducts.indexOf(value), 1);
//       } else {
//         newProducts.push(value);
//       }
//       return { ...prevForm, products: newProducts };
//     });
//   }, []);

//   const handleLogoChange = useCallback((e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setForm((prevForm) => ({ ...prevForm, logo: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   }, []);

//   const handlePagesChange = useCallback((e) => {
//     const { value, checked } = e.target;
//     setForm((prevForm) => {
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

//   return (
//     <div className="template-builder">
//       <h2>Create Your Professional Website Template</h2>
//       <form>
//         <div className="form-group">
//           <label>Template Name</label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//           />
//         </div>

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

//         <div className="form-group">
//           <label>Logo</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleLogoChange}
//           />
//           {form.logo && <img src={form.logo} alt="Logo Preview" />}
//         </div>

//         <div className="form-group">
//           <label>Products</label>
//           <input
//             type="text"
//             placeholder="Enter product name..."
//             onBlur={handleProductChange}
//           />
//         </div>

//         <div className="form-group">
//           <label>Pages</label>
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
//               value="home"
//               checked={form.pages.includes('home')}
//               onChange={handlePagesChange}
//             />
//             Home
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

//         <div className="form-group">
//           <label>Font</label>
//           <select
//             name="font"
//             value={form.font}
//             onChange={handleChange}
//           >
//             <option value="Arial">Arial</option>
//             <option value="Verdana">Verdana</option>
//             <option value="Helvetica">Helvetica</option>
//             <option value="Times New Roman">Times New Roman</option>
//           </select>
//         </div>

//         <div className="form-group">
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

//         <div className="form-group">
//           <label>Footer Design</label>
//           <select
//             name="footerDesign"
//             value={form.footerDesign}
//             onChange={handleChange}
//           >
//             <option value="minimal">Minimal</option>
//             <option value="classic">Classic</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Navbar Design</label>
//           <select
//             name="navbarDesign"
//             value={form.navbarDesign}
//             onChange={handleChange}
//           >
//             <option value="default">Default</option>
//             <option value="minimal">Minimal</option>
//             <option value="classic">Classic</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Sidebar Design</label>
//           <select
//             name="sidebarDesign"
//             value={form.sidebarDesign}
//             onChange={handleChange}
//           >
//             <option value="default">Default</option>
//             <option value="compact">Compact</option>
//             <option value="expanded">Expanded</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Carousel Images</label>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleCarouselImageChange}
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
//             onSearch={setSearchQuery}
//           />
//           <Sidebar
//             color={form.sidebarColor}
//             design={form.sidebarDesign}
//             collapsed={sidebarCollapsed}
//             onToggle={toggleSidebar}
//             items={sidebarItems}
//             onEditItem={handleEditItem}
//           />
//           <div className='content'>
//             <PageContent page={form.pages[0]} />
//             <ProductList
//               products={form.products}
//               productStyle={form.productStyle}
//               onProductChange={handleProductChange}
//             />
//             <Carousel images={carouselImages} />
//           </div>
//           <Footer design={form.footerDesign} />
//         </div>
//       )}

//       {deployUrl && (
//         <div className="deploy-link">
//           <a href={deployUrl} target="_blank" rel="noopener noreferrer">View Deployed Template</a>
//         </div>
//       )}

//       {editingItem && (
//         <div className="edit-item-modal">
//           <h3>Edit Sidebar Item</h3>
//           <form onSubmit={handleSaveEdit}>
//             <div className="form-group">
//               <label>Label</label>
//               <input
//                 type="text"
//                 value={editingItem.label}
//                 onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Link</label>
//               <input
//                 type="text"
//                 value={editingItem.link}
//                 onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Icon</label>
//               <input
//                 type="text"
//                 value={editingItem.icon}
//                 onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
//                 required
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

// ColorPicker Component
const ColorPicker = ({ name, value, onChange }) => (
  <div className="template-form-group">
    <label>{name}</label>
    <input
      type="color"
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
    />
  </div>
);

// Navbar Component
const Navbar = ({ color, design, breadcrumbs, onToggleSidebar, onSearch }) => (
  <nav className={`navbar ${design}`} style={{ backgroundColor: color }}>
    <button className="sidebar-toggle" onClick={onToggleSidebar}>
      ☰
    </button>
    <div className="navbar-breadcrumbs">
      {breadcrumbs.map((crumb, index) => (
        <span key={index}>{crumb} {index < breadcrumbs.length - 1 && ' > '}</span>
      ))}
    </div>
    <input
      type="text"
      placeholder="Search..."
      className="navbar-search"
      onChange={(e) => onSearch(e.target.value)}
    />
  </nav>
);

// Sidebar Component
const Sidebar = ({ color, design, collapsed, onToggle, items, onEditItem }) => (
  <aside className={`sidebar ${design} ${collapsed ? 'collapsed' : ''}`} style={{ backgroundColor: color }}>
    {!collapsed && (
      <div className="sidebar-content">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <i className={item.icon}></i>
              <a href={item.link}>{item.label}</a>
              <button onClick={() => onEditItem(item.id)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    )}
  </aside>
);

// Footer Component
const Footer = ({ design }) => (
  <footer className={`footer ${design}`}>
    <p>© 2024 MyShop. All rights reserved.</p>
  </footer>
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

// PageContent Component
const PageContent = ({ page }) => {
  const pageContents = {
    login: <div><h2>Login Page</h2><p>Login Form</p></div>,
    signup: <div><h2>Signup Page</h2><p>Signup Form</p></div>,
    home: <div><h2>Home Page</h2><p>Welcome to our website!</p></div>,
    order: <div><h2>Order Page</h2><p>Order Details</p></div>,
    payment: <div><h2>Payment Page</h2><p>Payment Form</p></div>,
    default: <div><h2>Page Not Found</h2></div>
  };

  return pageContents[page] || pageContents.default;
};

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
    { id: 'about', icon: 'icon-about', label: 'About', link: '#about' },
    { id: 'contact', icon: 'icon-contact', label: 'Contact', link: '#contact' },
  ]);

  const fetchProducts = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }, []);

  const handleProductChange = useCallback((id) => {
    // Handle product changes here, e.g., open a modal to edit product details
    console.log('Edit product with ID:', id);
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

  return (
    <div className="template-builder">
      <h2>Create Your Professional Website Template</h2>
      <form>
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

        <div className="template-form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
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

        <div className="template-form-group">
          <label>Font</label>
          <select name="font" value={form.font} onChange={handleChange}>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>
        </div>

        <div className="template-form-group">
          <label>Product Style</label>
          <select name="productStyle" value={form.productStyle} onChange={handleChange}>
            <option value="grid">Grid</option>
            <option value="list">List</option>
          </select>
        </div>

        <div className="form-group">
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
                value="login"
                checked={form.pages.includes('login')}
                onChange={handlePagesChange}
              />
              Login
            </label>
            <label>
              <input
                type="checkbox"
                value="signup"
                checked={form.pages.includes('signup')}
                onChange={handlePagesChange}
              />
              Signup
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
          </select>
        </div>

        <div className="template-form-group">
          <label>Navbar Design</label>
          <select name="navbarDesign" value={form.navbarDesign} onChange={handleChange}>
            <option value="default">Default</option>
            <option value="transparent">Transparent</option>
            <option value="sticky">Sticky</option>
          </select>
        </div>

        <div className="template-form-group">
          <label>Sidebar Design</label>
          <select name="sidebarDesign" value={form.sidebarDesign} onChange={handleChange}>
            <option value="default">Default</option>
            <option value="compact">Compact</option>
            <option value="overlay">Overlay</option>
          </select>
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
          />
          <div className="container">
            <Sidebar
              color={form.sidebarColor}
              design={form.sidebarDesign}
              collapsed={sidebarCollapsed}
              onToggle={toggleSidebar}
              items={sidebarItems}
              onEditItem={handleEditItem}
            />
            <main className="content">
              <PageContent page={form.pages.includes('home') ? 'home' : 'default'} />
              <Carousel images={carouselImages} />
              <ProductList
                products={products.filter(product =>
                  product.name.toLowerCase().includes(searchQuery.toLowerCase())
                )}
                productStyle={form.productStyle}
                onProductChange={handleProductChange}
              />
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
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingItem(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TemplateBuilder;
