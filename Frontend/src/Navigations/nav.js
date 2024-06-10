import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/navCSS.css';
import '../CSS/login_btn.css';
function Navigation() {
    return (React.createElement("div", { className: "Nav" },
        React.createElement("header", { className: "p-3 border-bottom  " },
            React.createElement("div", { className: "container " },
                React.createElement("div", { className: "d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start" },
                    React.createElement("a", { href: "/", className: "d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none" }),
                    React.createElement("ul", { className: "nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" },
                        React.createElement(Link, { to: '/' },
                            React.createElement("li", null,
                                React.createElement("a", { href: "#", className: "nav-link px-2 text-white" }, "Home"))),
                        React.createElement(Link, { to: '/Notfounded' },
                            React.createElement("li", null,
                                React.createElement("a", { href: "#", className: "nav-link px-2 text-white" }, "Sellers"))),
                        React.createElement(Link, { to: '/Notfounded' },
                            React.createElement("li", null,
                                React.createElement("a", { href: "#", className: "nav-link px-2 text-white" }, "Vehi.Owner"))),
                        React.createElement(Link, { to: '/Notfounded' },
                            React.createElement("li", null,
                                React.createElement("a", { href: "#", className: "nav-link px-2 text-white" }, "Con.Creaters")))),
                    React.createElement("form", { className: "col-12 col-lg-auto mb-3 mb-lg-0 me-lg-4", role: "search" },
                        React.createElement("input", { type: "search", className: "form-control form-control-dark text-bg-transparent", placeholder: "Search...", "aria-label": "Search" })),
                    React.createElement("div", { className: "login-buttons d-flex flex-row " },
                        React.createElement(Link, { type: "button", className: "btn btn-outline-light me-1 login-btn", to: '/SSABS/user/login' }, "Login"),
                        React.createElement(Link, { type: "button", className: "btn btn-outline-light login-btn", to: '/SSABS/user/signup' }, "Sign-up")))))));
}
export default Navigation;
