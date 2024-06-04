import React from 'react';
import { FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import FaUsers, FaCog, FaSignOutAlt icons from react-icons
import '../CSS/dash.css'
interface SidebarLink {
    path: string; // Path for the link
    label: string; // Text displayed on the link
    icon?: React.ComponentType<any>; // Optional icon component for the link
}

const Sidebar: React.FC = () => {

    const navigationLinks: SidebarLink[] = [
        { path: '/users', label: 'Users', icon: FaUsers }, // Replace
        { path: '/settings', label: 'Settings', icon: FaCog },
        { path: '/signout', label: 'Signout', icon: FaSignOutAlt }, // Replace
    ];

    return (
        <div >
            <div className="sidebar-header">
                <h3>My Dashboard</h3>
                <ul className='sidebar-links'>
                    {navigationLinks.map((link) => (
                        <li key={link.path} className=''>
                            <a href={link.path}>
                                {link.icon && <link.icon className="sidebar-link-icon me-2 " />}
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default Sidebar;
