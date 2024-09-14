import React from 'react'


const Sidebar = ({ color, design, collapsed, onToggle, items, onEditItem }) => (
    <aside className={`sidebar ${design} ${collapsed ? 'collapsed' : ''}`} style={{ backgroundColor: color }}>
      <button className="sidebar-toggle" onClick={onToggle}>
        {collapsed ? '→' : '←'}
      </button>
  
      {/* Design Variants */}
      {design === 'minimal' && !collapsed && (
        <div className="sidebar-minimal">
          <ul>
            {items.map((item) => (
              <li key={item.id} style={{ color: item.color }}>
                <a href={item.link}>{item.label}</a>
                <button className="temp-edit-button" onClick={() => onEditItem(item.id)}>✎</button>
              </li>
            ))}
          </ul>
        </div>
      )}
  
      {design === 'modern' && !collapsed && (
        <div className="sidebar-modern">
          <ul>
            {items.map((item) => (
              <li key={item.id} style={{ color: item.color }}>
                <i className={`icon ${item.icon}`}></i>
                <a href={item.link}>{item.label}</a>
                {item.submenu && (
                  <ul>
                    {item.submenu.map((subItem) => (
                      <li key={subItem.id} style={{ color: subItem.color }}>
                        <a href={subItem.link}>{subItem.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
                <button className="temp-edit-button" onClick={() => onEditItem(item.id)}>✎</button>
              </li>
            ))}
          </ul>
        </div>
      )}
  
      {design === 'centered' && !collapsed && (
        <div className="sidebar-centered">
          <div className="sidebar-logo">Logo</div>
          <ul>
            {items.map((item) => (
              <li key={item.id} style={{ color: item.color }}>
                <i className={`icon ${item.icon}`}></i>
                <a href={item.link}>{item.label}</a>
                <button className="temp-edit-button" onClick={() => onEditItem(item.id)}>✎</button>
              </li>
            ))}
          </ul>
        </div>
      )}
  
      {design === 'collapsible' && (
        <div className="sidebar-collapsible">
          {!collapsed && (
            <ul>
              {items.map((item) => (
                <li key={item.id} style={{ color: item.color }}>
                  <i className={`icon ${item.icon}`}></i>
                  <a href={item.link}>{item.label}</a>
                  {item.submenu && (
                    <ul>
                      {item.submenu.map((subItem) => (
                        <li key={subItem.id} style={{ color: subItem.color }}>
                          <a href={subItem.link}>{subItem.label}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                  <button className="temp-edit-button" onClick={() => onEditItem(item.id)}>✎</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </aside>
  );
  
  export default Sidebar;