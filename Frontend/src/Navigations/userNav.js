import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/navCSS.css';
import { Button } from 'antd';
import CartPopup from '../page/CartPopup';
var UserNavigation = function () {
    var _a = useState(false), isCartOpen = _a[0], setIsCartOpen = _a[1];
    var userId = localStorage.getItem('id'); // Replace with actual user ID logic
    return (React.createElement("div", { className: "Nav" },
        React.createElement("header", { className: "p-3 border-bottom" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start" },
                    React.createElement("a", { href: "/", className: "d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none" },
                        React.createElement("h1", { className: 'me-5', style: { color: 'white', fontFamily: "'LogoFont', sans-serif" } }, "SBSC")),
                    React.createElement("ul", { className: "nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" },
                        React.createElement(Link, { to: '/SSABS/user/userhome' },
                            React.createElement("li", null,
                                React.createElement("a", { href: "#", className: "nav-link px-2 text-white" }, "Home"))),
                        React.createElement(Link, { to: '/SSABS/selerPage' },
                            React.createElement("li", null,
                                React.createElement("a", { href: "#", className: "nav-link px-2 text-white" }, "Sellers"))),
                        React.createElement(Link, { to: '/SSABS/user/userhome/con.creaters' },
                            React.createElement("li", null,
                                React.createElement("a", { href: "#", className: "nav-link px-2 text-white" }, "Con.Creaters"))),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#", className: "nav-link px-2 text-white", onClick: function () { return setIsCartOpen(true); } }, "Cart"))),
                    React.createElement("form", { className: "col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3", role: "search" },
                        React.createElement("input", { type: "search", className: "form-control", placeholder: "Search...", "aria-label": "Search" })),
                    React.createElement("div", { className: "dropdown text-end" },
                        React.createElement("a", { href: "#", className: "d-block link-body-emphasis text-decoration-none dropdown-toggle", "data-bs-toggle": "dropdown", "aria-expanded": "false" },
                            React.createElement("img", { src: "https://github.com/mdo.png", alt: "mdo", width: "32", height: "32", className: "rounded-circle" })),
                        React.createElement("ul", { className: "dropdown-menu text-small" },
                            React.createElement(Link, { to: '/SSABS/user/userhome/profile' },
                                React.createElement("li", null,
                                    React.createElement("a", { className: "dropdown-item", href: "#" }, "Profile"))),
                            React.createElement("li", null,
                                React.createElement("hr", { className: "dropdown-divider" })),
                            React.createElement(Link, { to: '/SSABS/user/login' },
                                React.createElement("li", null,
                                    React.createElement(Button, { onClick: function () {
                                            localStorage.removeItem('accessToken');
                                        } }, "Sign out")))))))),
        React.createElement(CartPopup, { isOpen: isCartOpen, onClose: function () { return setIsCartOpen(false); }, userId: userId ? userId : '' })));
};
export default UserNavigation;
