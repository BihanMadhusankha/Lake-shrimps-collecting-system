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
import AdminNavigation from './AdminNAvigation'; // Fixed the typo in the component name
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
var AllTransactionsPage = function () {
    var _a = useState([]), receipts = _a[0], setReceipts = _a[1];
    var _b = useState(true), isLoggedIn = _b[0], setIsLoggedIn = _b[1];
    var navigate = useNavigate();
    useEffect(function () {
        var checkTokenValidity = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios.get('http://localhost:5001/SSABS/profile', {
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
                        else {
                            setIsLoggedIn(true);
                        }
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
    useEffect(function () {
        if (isLoggedIn) {
            fetchAllReceipts();
        }
    }, [isLoggedIn]);
    var fetchAllReceipts = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get('http://localhost:5001/SSABS/admin/alltransaction', {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    setReceipts(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error fetching receipts:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.delete("http://localhost:5001/SSABS/admin/receipt/".concat(id), {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                            },
                        })];
                case 1:
                    _a.sent();
                    setReceipts(receipts.filter(function (receipt) { return receipt._id !== id; }));
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error deleting receipt:', error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDownloadPDF = function () { return __awaiter(void 0, void 0, void 0, function () {
        var input, deleteButtons, canvas, imgData, pdf;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = document.getElementById('receiptTable');
                    if (!input) return [3 /*break*/, 2];
                    deleteButtons = input.querySelectorAll('.delete-button');
                    deleteButtons.forEach(function (button) {
                        button.style.display = 'none';
                    });
                    return [4 /*yield*/, html2canvas(input)];
                case 1:
                    canvas = _a.sent();
                    imgData = canvas.toDataURL('image/png');
                    pdf = new jsPDF();
                    // Add the image to the PDF
                    pdf.addImage(imgData, 'PNG', 0, 0, 200, 100);
                    pdf.save('receipts.pdf');
                    deleteButtons.forEach(function (button) {
                        button.style.display = 'inline-block';
                    });
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", null,
        React.createElement(AdminNavigation, null),
        React.createElement("div", { className: "container" },
            React.createElement("h1", { className: "text-center" }, "All Transactions"),
            React.createElement("button", { onClick: handleDownloadPDF, style: buttonStyle('#007bff') }, "Download PDF"),
            React.createElement("table", { id: "receiptTable", className: "table table-striped mb-5" },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "#"),
                        React.createElement("th", null, "Seller ID"),
                        React.createElement("th", null, "Message"),
                        React.createElement("th", null, "Date"),
                        React.createElement("th", null, "Action"))),
                React.createElement("tbody", { style: { counterReset: 'none' } }, receipts.map(function (receipt, index) { return (React.createElement("tr", { key: receipt._id },
                    React.createElement("td", null, index + 1),
                    React.createElement("td", null, receipt.sellerId),
                    React.createElement("td", null, receipt.message),
                    React.createElement("td", null, new Date(receipt.createdAt).toLocaleDateString()),
                    React.createElement("td", null,
                        React.createElement("button", { onClick: function () { return handleDelete(receipt._id); }, style: buttonStyle('#dc3545'), className: "delete-button" }, "Delete")))); }))))));
};
var buttonStyle = function (bgColor) { return ({
    padding: '5px',
    margin: '5px',
    borderRadius: '10px',
    backgroundColor: bgColor,
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
}); };
export default AllTransactionsPage;
