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
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SelerNav from './sealerNav';
var SealerDashboard = function () {
    var _a = useState(true), isLoggedIn = _a[0], setIsLoggedIn = _a[1];
    var navigate = useNavigate();
    useEffect(function () {
        var checkTokenValidity = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios.get('http://localhost:5001/SSABS/seler/dashboard', {
                                headers: {
                                    Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.data) {
                            setIsLoggedIn(false);
                            localStorage.removeItem('accessToken');
                        }
                        setIsLoggedIn(true);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error checking token:', error_1);
                        setIsLoggedIn(false);
                        localStorage.removeItem('accessToken');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        checkTokenValidity();
    }, []);
    useEffect(function () {
        if (!isLoggedIn) {
            navigate('/SSABS/user/login');
        }
    }, [isLoggedIn, navigate]);
    return (React.createElement("div", { className: "dashboard-container" },
        React.createElement("style", null, "\n        body {\n          font-family: 'Arial', sans-serif;\n          margin: 0;\n          padding: 0;\n          background-color: #f4f6f9;\n        }\n\n        .dashboard-container {\n          padding: 20px;\n        }\n\n        .header {\n          background-color: #434c8d;\n          color: white;\n          padding: 40px;\n          text-align: center;\n          border-radius: 8px;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          height: 60px;\n        }\n\n        .top-section, .middle-section, .bottom-section {\n          display: flex;\n          justify-content: space-around;\n          margin-top: 20px;\n          flex-wrap: wrap;\n        }\n\n        .top-box, .middle-box, .bottom-box {\n          background-color: white;\n          font-size: 24px;\n          font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;\n          padding: 20px;\n          border-radius: 8px;\n          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n          text-align: center;\n          flex: 1;\n          margin: 10px;\n          transition: transform 0.3s ease, box-shadow 0.3s ease;\n        }\n\n        .top-box {\n          cursor: pointer;\n        }\n\n        .top-box:hover {\n          transform: translateY(-5px);\n          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n        }\n\n        .top-box-1 {\n          background-color: #f9e79f;\n          border-left: 5px solid #f1c40f;\n        }\n\n        .top-box-2 {\n          background-color: #aed6f1;\n          border-left: 5px solid #3498db;\n        }\n\n        .top-box-3 {\n          background-color: #f5b7b1;\n          border-left: 5px solid #e74c3c;\n        }\n\n        .top-box-4 {\n          background-color: #d5f5e3;\n          border-left: 5px solid #2ecc71;\n        }\n\n        .middle-box:nth-child(1) {\n          border-top: 5px solid #f1c40f;\n        }\n\n        .middle-box:nth-child(2) {\n          border-top: 5px solid #3498db;\n        }\n\n        .middle-box:nth-child(3) {\n          border-top: 5px solid #2ecc71;\n        }\n\n        .bottom-box:nth-child(1) {\n          background-color: #f9e79f;\n          border-left: 5px solid #f1c40f;\n        }\n\n        .bottom-box:nth-child(2) {\n          background-color: #aed6f1;\n          border-left: 5px solid #3498db;\n        }\n\n        .bottom-box:nth-child(3) {\n          background-color: #f5b7b1;\n          border-left: 5px solid #e74c3c;\n        }\n\n        .bottom-box:nth-child(4) {\n          background-color: #d5f5e3;\n          border-left: 5px solid #2ecc71;\n        }\n\n        @media (max-width: 1024px) {\n          .top-box, .middle-box, .bottom-box {\n            flex: 1 1 48%; /* Two items per row */\n            margin: 10px 1%;\n          }\n        }\n\n        @media (max-width: 768px) {\n          .top-box, .middle-box, .bottom-box {\n            flex: 1 1 100%; /* Full width on smaller screens */\n            margin: 10px 0;\n          }\n\n          .header {\n            padding: 20px;\n            height: auto; /* Adjust height for smaller screens */\n          }\n        }\n        "),
        React.createElement(SelerNav, null),
        React.createElement("header", { className: "header" },
            React.createElement("h1", null, "Seller Dashboard")),
        React.createElement("div", { className: "top-section" },
            React.createElement(Link, { to: '/SSABS/seler/profile' },
                React.createElement("button", { className: "top-box top-box-1" }, "Edit Profile")),
            React.createElement(Link, { to: '/SSABS/seler/allpost' },
                React.createElement("button", { className: "top-box top-box-2" }, "Uploaded Post")),
            React.createElement(Link, { to: '/SSABS/seler/products' },
                React.createElement("button", { className: "top-box top-box-3" }, "Upload Post")),
            React.createElement(Link, { to: '/SSABS/sellers/requests' },
                React.createElement("button", { className: "top-box top-box-4" }, "History"))),
        React.createElement("div", { className: "middle-section" },
            React.createElement("div", { className: "middle-box" },
                React.createElement("h2", null, "Daily Sales"),
                React.createElement("div", { className: "chart-placeholder" }, "Pie Chart")),
            React.createElement("div", { className: "middle-box" },
                React.createElement("h2", null, "Statistics"),
                React.createElement("div", { className: "chart-placeholder" }, "Bar Chart")),
            React.createElement("div", { className: "middle-box" },
                React.createElement("h2", null, "Total Revenue"),
                React.createElement("div", { className: "chart-placeholder" }, "Line Chart")))));
};
export default SealerDashboard;
