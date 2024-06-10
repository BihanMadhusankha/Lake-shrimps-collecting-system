import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
export default function contentNav() {
    return (React.createElement("div", null,
        React.createElement("div", { className: "Nav" },
            React.createElement("header", { className: "p-3 border-bottom " },
                React.createElement("div", { className: "container" },
                    React.createElement("div", { className: "d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start" },
                        React.createElement("a", { href: "/", className: "d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none" }),
                        React.createElement("div", { className: "dropdown text-end" },
                            React.createElement("a", { href: "#", className: "d-block link-body-emphasis text-decoration-none dropdown-toggle", "data-bs-toggle": "dropdown", "aria-expanded": "false" },
                                React.createElement("img", { src: "https://github.com/mdo.png", alt: "mdo", width: "32", height: "32", className: "rounded-circle" })),
                            React.createElement("ul", { className: "dropdown-menu text-small" },
                                React.createElement(Link, { to: '/SSABS/contentcreater/profile' },
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "dropdown-item", href: "#" }, "Profile"))),
                                React.createElement(Link, { to: '/SSABS/vehicaleOwn/products' },
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "dropdown-item", href: "#" }, "Setting"))),
                                React.createElement(Link, { to: '/SSABS/vehicaleOwn/allpost' },
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "dropdown-item", href: "#" }, "Dashboard"))),
                                React.createElement("li", null,
                                    React.createElement("hr", { className: "dropdown-divider" })),
                                React.createElement(Link, { to: '/SSABS/user/login' },
                                    React.createElement("li", null,
                                        React.createElement(Button, { onClick: function () {
                                                localStorage.removeItem('accessToken');
                                            } },
                                            React.createElement("a", { className: "dropdown-item", href: "#" }, "Sign out"))))))))))));
}
