import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/navCSS.css';
import userPhoto from '../assets/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png';
export default function AdminNAvigation() {
    return (React.createElement("div", null,
        React.createElement("div", { className: "Nav" },
            React.createElement("header", { className: "p-3  border-bottom" },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end" },
                        React.createElement("a", { href: "/", className: "d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none" }),
                        React.createElement("div", { className: "dropdown text-end" },
                            React.createElement("a", { href: "#", className: "d-block link-body-emphasis text-decoration-none dropdown-toggle", "data-bs-toggle": "dropdown", "aria-expanded": "false" },
                                React.createElement("img", { src: userPhoto, alt: "mdo", width: "32", height: "32", className: "rounded-circle" })),
                            React.createElement("ul", { className: "dropdown-menu text-small" },
                                React.createElement(Link, { to: '/SSABS/admin/dashboard' },
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "dropdown-item", href: "#" }, "Dashboard"))),
                                React.createElement("li", null,
                                    React.createElement("hr", { className: "dropdown-divider" })),
                                React.createElement(Link, { to: '/SSABS/user/login' },
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "dropdown-item", href: "#" }, "Sign out")))))))))));
}
