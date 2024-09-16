import React, { useState, useEffect, useCallback } from 'react';
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
// ProductList Component


const TemplateBuilder = () => {
  const [form, setForm] = useState({
    name: '',
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
    theme: {
      backgroundColor: '#ffffff',
      textColor: '#000000'
    },
    testimonials: [],
    aboutDescriptions: '',

  });


  const [page, setPage] = useState('home'); // Initial page
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deployUrl, setDeployUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [products] = useState([]);
  
  
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



  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  const handleAddTestimonial = () => {
    setForm(prevForm => ({
      ...prevForm,
      testimonials: [...prevForm.testimonials, { quote: '', author: '' }]
    }));
  };

  const handleTestimonialChange = (index, field, value) => {
    const newTestimonials = [...form.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setForm(prevForm => ({
      ...prevForm,
      testimonials: newTestimonials
    }));
  };

  const handleAddAboutDescription = () => {
    setForm(prevForm => ({
      ...prevForm,
      aboutDescriptions: [...prevForm.aboutDescriptions, { text: '' }]
    }));
  };
  
  const handleAboutDescriptionChange = (index, value) => {
    const newDescriptions = [...form.aboutDescriptions];
    newDescriptions[index].text = value;
    setForm(prevForm => ({
      ...prevForm,
      aboutDescriptions: newDescriptions
    }));
  };
  
  const handleThemeChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      theme: {
        ...prevForm.theme,
        [name]: value
      }
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

  const handlecarouselImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map(file => URL.createObjectURL(file));
    setCarouselImages(images);
  };

  const handlePreview = () => {
    if (!form.name) {
      alert('Template name is required.');
      return;
    }
    const htmlContent = generateHTMLContent(
      form,
      navbarItems,
      sidebarItems,
      carouselImages,
      products,
      searchQuery
    );
    setPreview(htmlContent);
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

  const generateHTMLContent = (form, navbarItems, sidebarItems, carouselImages, products, searchQuery) => {
    // Generate HTML for navbar items
    const navbarItemsHTML = navbarItems.map(item => `
      <li>
        <a href="${item.link}" style="color: ${form.navbarTextColor || '#fff'};">
          <i class="${item.icon}"></i>
          ${item.label}
        </a>
      </li>
    `).join('');
  
    // Generate HTML for sidebar items
    const sidebarItemsHTML = sidebarItems.map(item => `
      <li>
        <a href="${item.link}" style="color: ${item.color};">
          <i class="${item.icon}"></i>
          ${item.label}
        </a>
      </li>
    `).join('');
  
    // Generate HTML for carousel images
    const carouselImagesHTML = carouselImages.map(src => `
      <div class="slide">
        <img src="${src}" alt="Carousel Image" />
      </div>
    `).join('');
  
    // Generate HTML for products
    // Generate HTML for footer
    const footerHTML = `
      <footer class="footer">
        <p>${form.footerContent || (form.footerDesign === 'minimal' ? 'Minimal Footer' : 'Footer Content')}</p>
      </footer>
    `;
  
    // Generate CSS based on form settings
    const dynamicCSS = `
      body {
        font-family: ${form.font};
        background-color: ${form.backgroundColor};
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .navbar {
        background-color: ${form.navbarColor};
        color: ${form.navbarTextColor || '#fff'};
        padding: 0.5rem;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 1000;
      }
      .navbar ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
      }
      .navbar li {
        margin: 0 1rem;
      }
      .navbar a {
        text-decoration: none;
        color: ${form.navbarTextColor || '#fff'};
        display: block;
        padding: 0.5rem 1rem;
        ${form.navbarDesign === 'bold' ? `
          font-weight: bold;
          border-bottom: 2px solid ${form.navbarTextColor || '#fff'};
        ` : ''}
        ${form.navbarDesign === 'minimal' ? `
          padding: 0.5rem;
        ` : ''}
      }
      .main-container {
        display: flex;
        margin-top: 3rem; /* Adjust based on navbar height */
      }
      .sidebar {
        background-color: ${form.sidebarColor};
        color: ${form.sidebarTextColor || '#fff'};
        width: 250px;
        transition: transform 0.3s ease;
        position: fixed;
        top: 3rem; /* Adjust based on navbar height */
        left: 0;
        height: calc(100vh - 3rem); /* Adjust based on navbar height */
        overflow-y: auto;
      }
      .sidebar.collapsed {
        transform: translateX(-250px);
      }
      .sidebar ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .sidebar li {
        padding: 1rem;
      }
      .sidebar a {
        text-decoration: none;
        color: ${form.sidebarTextColor || '#fff'};
        display: flex;
        align-items: center;
      }
      .sidebar i {
        margin-right: 0.5rem;
      }
      .content {
        flex: 1;
        margin-left: 250px; /* Adjust based on sidebar width */
        padding: 1rem;
      }
      .carousel {
        display: flex;
        overflow: auto;
        margin-bottom: 1rem;
      }
      .carousel .slide {
        flex: 0 0 auto;
        margin-right: 16px;
      }
      .footer {
        background-color: ${form.footerDesign === 'minimal' ? '#f8f9fa' : '#343a40'};
        color: ${form.footerTextColor || '#000'};
        padding: 1rem;
        text-align: center;
      }
      .collapse-toggle {
        cursor: pointer;
        position: fixed;
        top: 3rem; /* Adjust based on navbar height */
        left: 0;
        background-color: ${form.sidebarColor};
        color: ${form.sidebarTextColor || '#fff'};
        padding: 1rem;
        z-index: 1001;
        font-size: 1.5rem;
        border: none;
      }
    `;
  
    // Generate HTML for pages based on form.pages
    const pagesHTML = form.pages.map(page => {
      switch (page) {
        case 'home':
          return `
            <section class="carousel">
              ${carouselImagesHTML}
            </section>
            <section class="products" id="products-container">
              <!-- Products will be dynamically loaded here -->
            </section>
          `;
        case 'about':
          return `<section class="about"><h1>About Us</h1><p>Welcome to the about page!</p></section>`;
        case 'contact':
          return `<section class="contact"><h1>Contact Us</h1><p>Reach out to us via this page.</p></section>`;
        default:
          return '';
      }
    }).join('');
  
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${form.name}</title>
        <style>
          ${dynamicCSS}
        </style>
      </head>
      <body>
        <header class="navbar">
          <ul>
            ${navbarItemsHTML}
          </ul>
        </header>
        <button class="collapse-toggle">☰</button>
        <div class="main-container">
          <aside class="sidebar">
            <ul>
              ${sidebarItemsHTML}
            </ul>
          </aside>
          <main class="content">
            ${pagesHTML}
          </main>
        </div>
        ${footerHTML}
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            const sidebarToggle = document.querySelector('.collapse-toggle');
            if (sidebarToggle) {
              sidebarToggle.addEventListener('click', function() {
                document.querySelector('.sidebar').classList.toggle('collapsed');
              });
            }
  
            // Fetch products dynamically and update the DOM
            const fetchProducts = async () => {
              try {
                const token = localStorage.getItem('token');
                if (!token) {
                  console.error('No token found');
                  return;
                }
  
                const response = await fetch('http://localhost:3000/api/products', {
             
                });
  
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
  
                const products = await response.json();
                const productsContainer = document.getElementById('products-container');
  
                if (!productsContainer) {
                  console.error('Products container not found in the DOM');
                  return;
                }
  
                productsContainer.innerHTML = products
                  .map(product => \`
                    <div class="product-item">
             
                    </div>
                  \`).join('');
              } catch (err) {
                console.error('Error fetching products', err);
              }
            };
  
            fetchProducts();
          });
        </script>
      </body>
      </html>
    `;
  };
  
  const handleDownload = () => {
    if (!preview) {
      alert('Please generate a preview first.');
      return;
    }
    const blob = new Blob([preview], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${form.name}.html`;
    link.click();
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
        <h2>Upload Carousel Images</h2>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handlecarouselImageUpload} 
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
        <label>Theme</label>
        <ColorPicker
          name="backgroundColor"
          value={form.theme?.backgroundColor || '#ffffff'}
          onChange={handleThemeChange}
        />
        <ColorPicker
          name="textColor"
          value={form.theme?.textColor || '#000000'}
          onChange={handleThemeChange}
        />
      </div>

        <div className="template-form-group">
        <h2>Testimonials</h2>
        {form.testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-item">
            <input
              type="text"
              placeholder="Quote"
              value={testimonial.quote}
              onChange={(e) => handleTestimonialChange(index, 'quote', e.target.value)}
            />
            <input
              type="text"
              placeholder="Author"
              value={testimonial.author}
              onChange={(e) => handleTestimonialChange(index, 'author', e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddTestimonial}>Add Testimonial</button>
      </div>

      <div className="template-form-group">
      <h2>About Us Description</h2>
      <div className="about-description-item">
        <textarea
          placeholder="Description"
          value={form.aboutDescriptions}
          onChange={(e) => setForm({ ...form, aboutDescriptions: e.target.value })}
        />
      </div>
    </div>
    


        <button type="button" onClick={handlePreview}>Preview</button>
        <button type="button" onClick={handleDeploy}>Deploy</button>
        <button type="button" onClick={handleDownload}>Download HTML</button>

      </form>

      {preview && (
        <div className="template-preview">
          <Navbar
            color={form.navbarColor}
            design={form.navbarDesign}
            onToggleSidebar={toggleSidebar}
            onSearch={(query) => setSearchQuery(query)}
            menuItems={navbarItems}
            onPageChange={handlePageChange}
            logo={form.logo}
            cart={cart}
            setCart={setCart}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            
          />
          <div className="container">
            {/* Conditionally render Sidebar based on design */}
            {form.sidebarDesign !== 'default' && (
              <Sidebar
                color={form.sidebarColor}
                design={form.sidebarDesign}
                collapsed={sidebarCollapsed}
                onToggle={toggleSidebar}
                items={sidebarItems}
                onEditItem={handleEditItem}
                onSidebarItemClick={handlePageChange}
              />
            )}
            <main className="content">
              {form.pages.includes('login') && <PageContent page="login" />}
              {form.pages.includes('signup') && <PageContent page="signup" />}
              {form.pages.includes('home') && (
                <>
                  <PageContent 
                  page={page}
                  searchQuery={searchQuery}
                  cart={cart}
                  setPage={setPage}
                  setCart={setCart}
                  carouselImages={carouselImages}
                  theme={form.theme}
                  testimonials={form.testimonials}
                  aboutDescriptions={form.aboutDescriptions}   
                  setSearchQuery={setSearchQuery} />     
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





// import React, { useState, useCallback } from 'react';
// import axios from 'axios';
// import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
// import './Template.css'; // Import the CSS file

// // API URL and Key
// const API_URL = 'https://servocrm.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2023-03-15-preview';
// const API_KEY = '9351ca19204e49a09ddb691f79867420';
// const predefinedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQzNmQ0NTdiZmUzYzc1MjZmZTdhZTYiLCJuYW1lIjoidXNlciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI2Mzk0NzQ5LCJleHAiOjE3MjYzOTgzNDl9.luFVXPtwZd0xGLyD4aEDGmYtdoyJeAcCiyNbnKciyLM';

// function TemplateBuilder() {
//   const [inputs, setInputs] = useState({
//     title: '',
//     description: '',
//     colorScheme: '#ffffff',
//     font: 'Arial',
//     navbarColor: '#000000',
//     sidebarColor: '#333333',
//     footerColor: '#000000',
//     pages: '', // Comma-separated list of pages
//     apiUrl: '' // For fetching products
//   });
//   const [websiteData, setWebsiteData] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editData, setEditData] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [products, setProducts] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputs({ ...inputs, [name]: value });
//   };

//   const fetchProducts = useCallback(async () => {
//     try {
//       const response = await axios.get(inputs.apiUrl, {
//         headers: { 'Authorization': `Bearer ${predefinedToken}` }
//       });
//       setProducts(response.data);
//     } catch (err) {
//       console.error('Error fetching products', err);
//     }
//   }, [inputs.apiUrl]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // Fetch products from the API URL provided by the user
//       if (inputs.apiUrl) {
//         await fetchProducts();
//       }

//       const response = await axios.post(
//         API_URL,
//         {
//           messages: [
//             {
//               role: 'system',
//               content: 'You are a website design expert. Generate a complete HTML, CSS, and JavaScript code template with inline styles and scripts based on the user inputs. Ensure that the output is well-structured and visually appealing. Include dynamic pages as specified and product data fetched from the provided API. Do not include explanations, only the necessary code. Make professional website navbar fix top and sidebar fix in side and footer down content in center '
//             },
//             {
//               role: 'user',
//               content: `Create a website template with the following details: ${JSON.stringify(inputs)}. Products: ${JSON.stringify(products)}. All CSS and JavaScript should be included inline within the HTML document.`
//             }
//           ]
//         },
//         {
//           headers: {
//             'api-key': API_KEY,
//             'Content-Type': 'application/json',
//           },
//           timeout: 120000 // Increase timeout to 120 seconds
//         }
//       );

//       // Full HTML content including CSS and JS inline
//       const htmlContent = response.data.choices[0].message.content;

//       // Update state with the complete HTML content
//       setWebsiteData(htmlContent);
//       setEditData(htmlContent); // Set initial edit data
//     } catch (error) {
//       console.error('Error generating website:', error);
//       setError('Failed to generate the website. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditChange = (e) => {
//     const { value } = e.target;
//     setEditData(value);
//   };

//   const handleSaveEdit = () => {
//     setWebsiteData(editData);
//     setEditMode(false);
//   };

//   return (
//     <Container fluid className="temp-container">
//       <Row className="temp-header">
//         <Col>
//           <h1 className="temp-title">Website Template Builder</h1>
//         </Col>
//       </Row>

//       <Form onSubmit={handleSubmit}>
//         <Row>
//           <Col md={6}>
//             <Form.Group controlId="formTitle" className="temp-form-group">
//               <Form.Label className="temp-label">Website Title</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 name="title" 
//                 value={inputs.title || ''} 
//                 onChange={handleChange} 
//                 placeholder="Enter website title" 
//                 className="temp-input"
//               />
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group controlId="formDescription" className="temp-form-group">
//               <Form.Label className="temp-label">Description</Form.Label>
//               <Form.Control 
//                 as="textarea" 
//                 rows={3} 
//                 name="description" 
//                 value={inputs.description || ''} 
//                 onChange={handleChange} 
//                 placeholder="Enter website description" 
//                 className="temp-textarea"
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row>
//           <Col md={4}>
//             <Form.Group controlId="formColorScheme" className="temp-form-group">
//               <Form.Label className="temp-label">Color Scheme</Form.Label>
//               <Form.Control 
//                 type="color" 
//                 name="colorScheme" 
//                 value={inputs.colorScheme || '#ffffff'} 
//                 onChange={handleChange} 
//                 className="temp-color-picker"
//               />
//             </Form.Group>
//           </Col>
//           <Col md={4}>
//             <Form.Group controlId="formNavbarColor" className="temp-form-group">
//               <Form.Label className="temp-label">Navbar Color</Form.Label>
//               <Form.Control 
//                 type="color" 
//                 name="navbarColor" 
//                 value={inputs.navbarColor || '#000000'} 
//                 onChange={handleChange} 
//                 className="temp-color-picker"
//               />
//             </Form.Group>
//           </Col>
//           <Col md={4}>
//             <Form.Group controlId="formSidebarColor" className="temp-form-group">
//               <Form.Label className="temp-label">Sidebar Color</Form.Label>
//               <Form.Control 
//                 type="color" 
//                 name="sidebarColor" 
//                 value={inputs.sidebarColor || '#333333'} 
//                 onChange={handleChange} 
//                 className="temp-color-picker"
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row>
//           <Col md={4}>
//             <Form.Group controlId="formFooterColor" className="temp-form-group">
//               <Form.Label className="temp-label">Footer Color</Form.Label>
//               <Form.Control 
//                 type="color" 
//                 name="footerColor" 
//                 value={inputs.footerColor || '#000000'} 
//                 onChange={handleChange} 
//                 className="temp-color-picker"
//               />
//             </Form.Group>
//           </Col>
//           <Col md={8}>
//             <Form.Group controlId="formPages" className="temp-form-group">
//               <Form.Label className="temp-label">Pages (comma-separated, e.g., Home, Signup, Payment)</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 name="pages" 
//                 value={inputs.pages || ''} 
//                 onChange={handleChange} 
//                 placeholder="Enter pages" 
//                 className="temp-input"
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row>
//           <Col>
//             <Form.Group controlId="formApiUrl" className="temp-form-group">
//               <Form.Label className="temp-label">API URL for Products</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 name="apiUrl" 
//                 value={inputs.apiUrl || ''} 
//                 onChange={handleChange} 
//                 placeholder="Enter API URL for fetching products" 
//                 className="temp-input"
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row className="mb-4">
//           <Col className="text-center">
//             <Button variant="primary" type="submit" className="temp-button temp-button-primary" disabled={loading}>
//               {loading ? 'Generating...' : 'Generate'}
//             </Button>
//           </Col>
//         </Row>
//       </Form>

//       {error && <Alert variant="danger" className="temp-alert">{error}</Alert>}

//       {websiteData && (
//         <div className="temp-preview-container">
//           <Row className="temp-preview-header">
//             <Col>
//               <h2>Preview</h2>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <iframe
//                 title="website-preview"
//                 srcDoc={websiteData}
//                 style={{ width: '100%', height: '600px', border: 'none' }}
//                 sandbox="allow-same-origin allow-scripts"
//               />
//             </Col>
//           </Row>
//           <Row className="mt-3">
//             <Col className="text-center">
//               <Button 
//                 variant="secondary" 
//                 className="temp-button temp-button-secondary"
//                 onClick={() => setEditMode(!editMode)}
//               >
//                 {editMode ? 'Cancel Edit' : 'Edit'}
//               </Button>
//             </Col>
//           </Row>

//           {editMode && (
//             <div className="temp-edit-panel">
//               <Row>
//                 <Col>
//                   <h3 className="temp-edit-panel-header">Edit Panel</h3>
//                 </Col>
//               </Row>
//               <Form>
//                 <Form.Group controlId="formHtmlEdit" className="temp-form-group">
//                   <Form.Label className="temp-label">HTML</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     name="html"
//                     value={editData || ''}
//                     onChange={handleEditChange}
//                     rows={15}
//                     placeholder="Edit HTML"
//                     className="temp-textarea"
//                   />
//                 </Form.Group>
//                 <Row>
//                   <Col className="text-center">
//                     <Button variant="primary" className="temp-button temp-button-primary" onClick={handleSaveEdit}>
//                       Save
//                     </Button>
//                   </Col>
//                 </Row>
//               </Form>
//             </div>
//           )}
//         </div>
//       )}
//     </Container>
//   );
// }

// export default TemplateBuilder;


