var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useEffect, useState } from 'react';
import AdminNavigation from './AdminNAvigation';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import '../CSS/adminallusers.css';
export default function AdminUsers() {
    var _this = this;
    var _a = useState(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = useState(null), error = _b[0], setError = _b[1];
    var _c = useState([]), users = _c[0], setUsers = _c[1];
    var _d = useState(null), highlightedRow = _d[0], setHighlightedRow = _d[1];
    var _e = useState(''), searchQuery = _e[0], setSearchQuery = _e[1];
    var _f = useState(false), showPopup = _f[0], setShowPopup = _f[1];
    useEffect(function () {
        var fetchUsers = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsLoading(true);
                        setError(null);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, axios.get('http://localhost:5001/SSABS/admin/dashboard')];
                    case 2:
                        response = _a.sent();
                        data = response.data;
                        setUsers(data);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching users:', error_1);
                        setError('Failed to load user data. Please try again later.');
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchUsers();
    }, []);
    useEffect(function () {
        if (users.length > 0) {
            users.forEach(function (_, index) {
                setTimeout(function () {
                    setHighlightedRow(index);
                }, index * 1000);
            });
        }
    }, [users]);
    var handleDeleteUser = function (userId) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.delete("http://localhost:5001/SSABS/admin/dashboard/".concat(userId))];
                case 1:
                    response = _a.sent();
                    if (response.status === 200) {
                        setUsers(users.filter(function (user) { return user._id !== userId; }));
                    }
                    else {
                        console.error('Error deleting user:', response.statusText);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error deleting user:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var generatePDF = function () {
        var doc = new jsPDF();
        doc.text('User Report', 20, 10);
        doc.autoTable({
            head: [['First Name', 'Last Name', 'Role']],
            body: users.map(function (user) { return [user.firstname, user.lastname, user.role]; }),
        });
        doc.save('user_report.pdf');
    };
    var filteredUsers = users.filter(function (user) {
        return user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase());
    });
    return (React.createElement("div", { className: "dashboard d-flex flex-column" },
        React.createElement(AdminNavigation, null),
        React.createElement("h2", { className: "d-flex justify-content-center m-3" }, "All Users"),
        React.createElement("button", { onClick: generatePDF, className: "button generate-pdf col-2 m-3" }, "Download PDF"),
        isLoading ? (React.createElement("p", null, "Loading user data...")) : error ? (React.createElement("p", { className: "error-message" }, error)) : (React.createElement("div", null,
            React.createElement("div", { className: "search-container col-5" },
                React.createElement("input", { type: "text", placeholder: "Search users...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, onFocus: function () { return setShowPopup(true); }, onBlur: function () { return setShowPopup(false); } }),
                showPopup && (React.createElement("div", { className: "search-popup" },
                    React.createElement("p", null, "Search results:"),
                    React.createElement("ul", null, filteredUsers.map(function (user) { return (React.createElement("li", { key: user._id },
                        user.firstname,
                        " ",
                        user.lastname)); }))))),
            React.createElement("table", { className: "user-table m-3" },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "First Name"),
                        React.createElement("th", null, "Last Name"),
                        React.createElement("th", null, "Role"),
                        React.createElement("th", null, "Actions"))),
                React.createElement("tbody", null,
                    filteredUsers.map(function (user, index) { return (React.createElement("tr", { key: user._id, className: highlightedRow === index ? 'highlight' : '' },
                        React.createElement("td", null, user.firstname),
                        React.createElement("td", null, user.lastname),
                        React.createElement("td", null, user.role),
                        React.createElement("td", null,
                            React.createElement("button", { className: "button delete-button", onClick: function () { return handleDeleteUser(user._id); } }, "Delete")))); }),
                    filteredUsers.length === 0 && (React.createElement("tr", null,
                        React.createElement("td", { colSpan: 4, style: { textAlign: 'center' } }, "No users found.")))))))));
}
