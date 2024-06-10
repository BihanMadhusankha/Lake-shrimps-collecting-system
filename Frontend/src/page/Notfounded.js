// src/NotFound.tsx
import React from 'react';
import '../CSS/Notfounded.css';
var NotFound = function () {
    return (React.createElement("div", { className: "not-found-container" },
        React.createElement("h1", { className: "not-found-title" }, "404"),
        React.createElement("p", { className: "not-found-message" }, "Page Not Found"),
        React.createElement("div", { className: "not-found-animation" },
            React.createElement("div", { className: "circle" }),
            React.createElement("div", { className: "circle" }),
            React.createElement("div", { className: "circle" }),
            React.createElement("div", { className: "circle" }),
            React.createElement("div", { className: "circle" }))));
};
export default NotFound;
