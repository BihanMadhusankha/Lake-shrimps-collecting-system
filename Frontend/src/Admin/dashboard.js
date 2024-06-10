import React from 'react';
import Sidebar from './Sidebar';
import '../CSS/dash.css';
import AdminNavigation from './AdminNAvigation';
import Card from './adminCard';
var Dashboard = function () {
    var navigationLinks = [
        { path: '/SSABS/admin/allusers', label: 'Users' },
        { path: '/SSABS/admin/profile', label: 'Profile' },
        { path: '/SSABS/admin/alltransaction', label: 'Transaction' },
    ];
    return (React.createElement("div", { className: "dashboard d-flex flex-column" },
        React.createElement(AdminNavigation, null),
        React.createElement("h2", { className: "d-flex justify-content-center m-3" }, "Admin Dashboard"),
        React.createElement("div", null,
            React.createElement("div", { className: ' d-flex  flex-row' },
                React.createElement(Sidebar, null),
                React.createElement("div", { className: "cards-container col-3 me-auto " }, navigationLinks.map(function (link) { return (React.createElement(Card, { key: link.path, path: link.path, label: link.label })); }))))));
};
export default Dashboard;
