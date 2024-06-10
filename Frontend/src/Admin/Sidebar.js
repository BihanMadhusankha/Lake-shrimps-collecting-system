import React from 'react';
import { FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../CSS/dash.css';
var Sidebar = function () {
    var navigationLinks = [
        { path: '/users', label: 'Users', icon: FaUsers }, // Replace
        { path: '/settings', label: 'Settings', icon: FaCog },
        { path: '/signout', label: 'Signout', icon: FaSignOutAlt }, // Replace
    ];
    return (React.createElement("div", null,
        React.createElement("div", { className: "sidebar-header" },
            React.createElement("h3", null, "My Dashboard"),
            React.createElement("ul", { className: 'sidebar-links' }, navigationLinks.map(function (link) { return (React.createElement("li", { key: link.path, className: '' },
                React.createElement("a", { href: link.path },
                    link.icon && React.createElement(link.icon, { className: "sidebar-link-icon me-2 " }),
                    link.label))); })))));
};
export default Sidebar;
