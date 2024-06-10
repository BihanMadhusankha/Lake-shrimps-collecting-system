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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProductModal from './EditProductModal'; // Import the EditProductModal component
import SealerNav from './sealerNav';
var Dashboard = function () {
    var _a = useState([]), products = _a[0], setProducts = _a[1];
    var _b = useState(null), selectedProduct = _b[0], setSelectedProduct = _b[1];
    var _c = useState(false), isModalOpen = _c[0], setIsModalOpen = _c[1];
    var _d = useState(''), selectedDate = _d[0], setSelectedDate = _d[1]; // State for the selected date
    var _e = useState(''), searchQuery = _e[0], setSearchQuery = _e[1]; // State for search query
    useEffect(function () {
        var fetchProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = localStorage.getItem('accessToken');
                        return [4 /*yield*/, axios.get('http://localhost:5001/SSABS/seler/products', {
                                headers: {
                                    Authorization: "Bearer ".concat(token) // Attach token to request headers
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        setProducts(response.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching products:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchProducts();
    }, []);
    var handleDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var token, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = localStorage.getItem('accessToken');
                    return [4 /*yield*/, axios.delete("http://localhost:5001/SSABS/seler/products/".concat(id), {
                            headers: {
                                Authorization: "Bearer ".concat(token) // Attach token to request headers
                            }
                        })];
                case 1:
                    _a.sent();
                    setProducts(products.filter(function (product) { return product._id !== id; }));
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error deleting product:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleEdit = function (product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };
    var handleSave = function (updatedProduct) { return __awaiter(void 0, void 0, void 0, function () {
        var token, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = localStorage.getItem('accessToken');
                    return [4 /*yield*/, axios.put("http://localhost:5001/SSABS/seler/products/".concat(updatedProduct._id), updatedProduct, {
                            headers: {
                                Authorization: "Bearer ".concat(token),
                            },
                        })];
                case 1:
                    _a.sent();
                    setProducts(products.map(function (product) { return (product._id === updatedProduct._id ? updatedProduct : product); }));
                    setIsModalOpen(false);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error updating product:', error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Filter products based on selected date and search query
    var filteredProducts = products.filter(function (product) {
        var matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });
    var getMaxDate = function () {
        var today = new Date();
        return today.toISOString().split('T')[0];
    };
    var getMinDate = function () {
        var today = new Date();
        var lastMonth = new Date(today.setMonth(today.getMonth() - 1));
        return lastMonth.toISOString().split('T')[0];
    };
    // const handleDownloadPDF = () => {
    //   const doc = new jsPDF();
    //   doc.autoTable({
    //     head: [['Name', 'Price', 'Harvest', 'Description']],
    //     body: filteredProducts.map(product => [product.name, product.price, product.totalHarvest, product.description]),
    //   });
    //   doc.save('products.pdf');
    // };
    return (React.createElement("div", null,
        React.createElement(SealerNav, null),
        React.createElement("div", { style: { padding: '20px' } },
            React.createElement("h2", { className: 'd-flex justify-content-center mt-4' }, "Add to all products"),
            React.createElement("div", { className: 'd-flex justify-content-between', style: { marginBottom: '20px' } },
                React.createElement("div", null,
                    React.createElement("label", { className: ' m-4' }, "Select Date: "),
                    React.createElement("input", { placeholder: 'select date', type: "date", value: selectedDate, min: getMinDate(), max: getMaxDate(), onChange: function (e) { return setSelectedDate(e.target.value); }, style: {
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            marginLeft: '10px',
                        } })),
                React.createElement("div", null,
                    React.createElement("label", { className: ' m-4' }, "Search Product: "),
                    React.createElement("input", { placeholder: 'search product', type: "text", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, style: {
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            marginLeft: '10px',
                        } }))),
            React.createElement("table", { className: 'm-3', style: { borderCollapse: 'collapse', width: '100%', animation: 'fadeIn 1s ease-in-out' } },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", { style: { border: '1px solid #ddd', padding: '8px', textAlign: 'left' } }, "Shrimps type"),
                        React.createElement("th", { style: { border: '1px solid #ddd', padding: '8px', textAlign: 'left' } }, "Unite price(Rs)"),
                        React.createElement("th", { style: { border: '1px solid #ddd', padding: '8px', textAlign: 'left' } }, "Total harvest(Kg)"),
                        React.createElement("th", { style: { border: '1px solid #ddd', padding: '8px', textAlign: 'left' } }, "Description"),
                        React.createElement("th", { style: { border: '1px solid #ddd', padding: '8px', textAlign: 'left' } }, "Actions"))),
                React.createElement("tbody", null, filteredProducts.map(function (product) { return (React.createElement("tr", { key: product._id, style: { animation: 'fadeIn 1s ease-in-out' } },
                    React.createElement("td", { style: { border: '1px solid #ddd', padding: '8px', textAlign: 'left' } }, product.name),
                    React.createElement("td", { style: { border: '1px solid #ddd', padding: '8px', textAlign: 'left' } }, product.price),
                    React.createElement("td", { style: { border: '1px solid #ddd', padding: '8px', textAlign: 'left' } }, product.totalHarvest),
                    React.createElement("td", { style: { border: '1px solid #ddd', padding: '8px', textAlign: 'left' } }, product.description),
                    React.createElement("td", { style: { border: '1px solid #ddd', padding: '8px', textAlign: 'left' } },
                        React.createElement("button", { onClick: function () { return handleEdit(product); }, style: {
                                marginRight: '8px',
                                padding: '6px 12px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }, onMouseEnter: function (e) { return (e.currentTarget.style.backgroundColor = '#0056b3'); }, onMouseLeave: function (e) { return (e.currentTarget.style.backgroundColor = '#007bff'); } }, "Edit"),
                        React.createElement("button", { onClick: function () { return handleDelete(product._id); }, style: {
                                marginRight: '8px',
                                padding: '6px 12px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }, onMouseEnter: function (e) { return (e.currentTarget.style.backgroundColor = '#c82333'); }, onMouseLeave: function (e) { return (e.currentTarget.style.backgroundColor = '#dc3545'); } }, "Delete")))); }))),
            isModalOpen && selectedProduct && (React.createElement(EditProductModal, { product: selectedProduct, onClose: function () { return setIsModalOpen(false); }, onSave: handleSave })))));
};
// Adding global CSS for animations
var style = document.createElement('style');
style.innerHTML = "\n  @keyframes fadeIn {\n    from { opacity: 0; }\n    to { opacity: 1; }\n  }\n";
document.head.appendChild(style);
export default Dashboard;
