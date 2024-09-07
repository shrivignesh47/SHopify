import React from 'react';
import './UserSidebar.css'; // Import the CSS file

const UserSidebar = ({ setActiveTab, activeTab, isCollapsed }) => {
    return (
        <div className={`user-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-section">
                <h3>Operations</h3>
                <ul className="user-sidebar-menu">
                    <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                        {isCollapsed ? <span>🏠</span> : 'Dashboard'}
                    </li>
                    <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
                        {isCollapsed ? <span>📦</span> : 'Products'}
                    </li>
                    <li className={activeTab === 'sales' ? 'active' : ''} onClick={() => setActiveTab('sales')}>
                        {isCollapsed ? <span>💵</span> : 'Sales'}
                    </li>
                    <li className={activeTab === 'report' ? 'active' : ''} onClick={() => setActiveTab('report')}>
                        {isCollapsed ? <span>📊</span> : 'Report'}
                    </li>
                    <li className={activeTab === 'Template' ? 'active' : ''} onClick={() => setActiveTab('Template')}>
                        {isCollapsed ? <span>⭐</span> : 'Template'}
                    </li>
                </ul>
            </div>

            <div className="sidebar-section">
                <h3>Settings</h3>
                <ul className="user-sidebar-menu">
                    <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
                        {isCollapsed ? <span>⚙️</span> : 'Settings'}
                    </li>
                    <li className={activeTab === 'seo' ? 'active' : ''} onClick={() => setActiveTab('seo')}>
                        {isCollapsed ? <span>🔍</span> : 'SEO'}
                    </li>
                    <li className={activeTab === 'recommendations' ? 'active' : ''} onClick={() => setActiveTab('recommendations')}>
                        {isCollapsed ? <span>⭐</span> : 'Recommendations'}
                    </li>
                    <li className={activeTab === 'customers' ? 'active' : ''} onClick={() => setActiveTab('customers')}>
                        {isCollapsed ? <span>👥</span> : 'Customers'}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserSidebar;
