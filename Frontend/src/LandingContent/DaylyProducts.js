var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { useNavigate } from 'react-router-dom';
import UserNavigation from '../Navigations/userNav';
var DaylyProducts = function () {
    var _a = useState([]), todayProducts = _a[0], setTodayProducts = _a[1];
    var _b = useState(true), isLoggedIn = _b[0], setIsLoggedIn = _b[1];
    var _c = useState(false), showRequestForm = _c[0], setShowRequestForm = _c[1];
    var _d = useState(null), selectedProduct = _d[0], setSelectedProduct = _d[1];
    var _e = useState({
        address: '',
        city: '',
        deliveryOption: '',
        quantity: 1,
        totalAmount: 0,
    }), requestDetails = _e[0], setRequestDetails = _e[1];
    var _f = useState({}), errors = _f[0], setErrors = _f[1];
    var _g = useState(null), alert = _g[0], setAlert = _g[1];
    var navigate = useNavigate();
    useEffect(function () {
        var checkTokenValidity = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios.get('http://localhost:5001/SSABS/user/daylyproducts', {
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
                            fetchTodayProducts();
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
    var fetchTodayProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get('http://localhost:5001/SSABS/user/daylyproducts', {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    setTodayProducts(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error fetching today's products:", error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleRequestClick = function (product) {
        setSelectedProduct(product);
        setRequestDetails(__assign(__assign({}, requestDetails), { totalAmount: product.price * requestDetails.quantity }));
        setShowRequestForm(true);
    };
    var validateField = function (name, value) {
        var error = '';
        switch (name) {
            case 'address':
                if (!value) {
                    error = 'Address is required';
                }
                else if (typeof value === 'string' && !/^[a-zA-Z0-9\s,.-]+$/.test(value)) {
                    error = 'Address can only contain letters, numbers, spaces, commas, and periods';
                }
                else if (typeof value === 'string' && value.length < 5) {
                    error = 'Address must be at least 5 characters long';
                }
                break;
            case 'city':
                if (!value) {
                    error = 'City is required';
                }
                else if (typeof value === 'string' && !/^[a-zA-Z\s]+$/.test(value)) {
                    error = 'City must contain only letters and spaces';
                }
                break;
            case 'quantity':
                if (Number(value) <= 0) {
                    error = 'Quantity must be greater than zero';
                }
                else if (!Number.isInteger(Number(value))) {
                    error = 'Quantity must be a whole number';
                }
                break;
            case 'deliveryOption':
                if (!value) {
                    error = 'Delivery option is required';
                }
                break;
            default:
                break;
        }
        setErrors(function (prevErrors) {
            var _a;
            return (__assign(__assign({}, prevErrors), (_a = {}, _a[name] = error, _a)));
        });
    };
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setRequestDetails(function (prevDetails) {
            var _a;
            var newDetails = __assign(__assign({}, prevDetails), (_a = {}, _a[name] = value, _a));
            if (name === 'quantity' && selectedProduct) {
                newDetails.totalAmount = selectedProduct.price * Number(value);
            }
            validateField(name, value);
            return newDetails;
        });
    };
    var handleFormSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var fieldsToValidate, allValid, userId, requestData, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    fieldsToValidate = ['address', 'city', 'quantity', 'deliveryOption'];
                    allValid = true;
                    fieldsToValidate.forEach(function (field) {
                        validateField(field, requestDetails[field]);
                        if (errors[field]) {
                            allValid = false;
                        }
                    });
                    if (!allValid) {
                        return [2 /*return*/];
                    }
                    userId = localStorage.getItem('id');
                    if (!userId) {
                        console.error('User ID is not available');
                        return [2 /*return*/];
                    }
                    requestData = {
                        productId: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct._id,
                        address: requestDetails.address,
                        city: requestDetails.city,
                        deliveryOption: requestDetails.deliveryOption,
                        quantity: requestDetails.quantity,
                        totalAmount: requestDetails.totalAmount,
                        sellerId: selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.sellerId,
                        userId: userId,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post('http://localhost:5001/SSABS/request', requestData, {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    console.log('Request sent successfully', response.data);
                    setShowRequestForm(false);
                    setAlert({ type: 'success', message: 'Request sent successfully!' });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error sending request:', error_3);
                    setAlert({ type: 'error', message: 'Error sending request. Please try again.' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var styles = {
        headerContainer: {
            width: '100%',
            marginTop: '20px',
        },
        header: {
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
        },
        productsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '40px',
            marginBottom: '40px',
        },
        productCard: {
            width: '280px',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            backgroundColor: '#fff',
            textAlign: 'center',
            margin: '10px',
            transition: 'transform 0.3s ease',
        },
        productName: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333',
        },
        productPrice: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333',
        },
        productHarvest: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333',
        },
        productDescription: {
            fontSize: '16px',
            marginBottom: '20px',
            color: '#666',
        },
        requestButton: {
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            margin: '5px',
        },
        noProductsMessage: {
            fontSize: '18px',
            color: '#666',
        },
        formContainerOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        formContainer: {
            width: '400px',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            backgroundColor: '#fff',
            textAlign: 'center',
            position: 'relative',
        },
        formHeader: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#333',
        },
        formGroup: {
            marginBottom: '20px',
        },
        formLabel: {
            display: 'block',
            marginBottom: '5px',
            fontSize: '16px',
            color: '#333',
        },
        formInput: {
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
        },
        formSelect: {
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
        },
        submitButton: {
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            margin: '5px',
        },
        closeButton: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#dc3545',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
        },
        errorText: {
            color: 'red',
            fontSize: '14px',
            marginTop: '5px',
        },
        successAlert: {
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '10px',
            textAlign: 'center',
        },
        errorAlert: {
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '10px',
            textAlign: 'center',
        },
    };
    return (React.createElement("div", null,
        React.createElement(UserNavigation, null),
        React.createElement("div", { style: styles.headerContainer },
            React.createElement("h1", { style: styles.header }, "Today's Products"),
            alert && (React.createElement("div", { style: alert.type === 'success' ? styles.successAlert : styles.errorAlert }, alert.message)),
            React.createElement("div", { style: styles.productsContainer }, todayProducts.length > 0 ? (todayProducts.map(function (product) { return (React.createElement("div", { key: product._id, style: styles.productCard, onMouseEnter: function (e) { return (e.currentTarget.style.transform = 'scale(1.05)'); }, onMouseLeave: function (e) { return (e.currentTarget.style.transform = 'scale(1)'); } },
                React.createElement("h3", { style: styles.productName },
                    "Product Name: ",
                    product.name),
                React.createElement("h3", { style: styles.productPrice },
                    "One Unit Price: ",
                    product.price),
                React.createElement("h3", { style: styles.productHarvest },
                    "Total Harvest: ",
                    product.totalHarvest),
                React.createElement("p", { style: styles.productDescription }, product.description),
                React.createElement("button", { style: styles.requestButton, onClick: function () { return handleRequestClick(product); } }, "Request"))); })) : (React.createElement("p", { style: styles.noProductsMessage }, "No products added today.")))),
        showRequestForm && selectedProduct && (React.createElement("div", { style: styles.formContainerOverlay },
            React.createElement("div", { style: styles.formContainer },
                React.createElement("h3", { style: styles.formHeader }, "Request Details"),
                React.createElement("form", { onSubmit: handleFormSubmit },
                    React.createElement("div", { style: styles.formGroup },
                        React.createElement("label", { htmlFor: "address", style: styles.formLabel }, "My home address"),
                        React.createElement("input", { type: "text", id: "address", name: "address", value: requestDetails.address, onChange: handleInputChange, style: styles.formInput, pattern: "^[a-zA-Z0-9\\s,.-]+$", required: true }),
                        errors.address && React.createElement("span", { style: styles.errorText }, errors.address)),
                    React.createElement("div", { style: styles.formGroup },
                        React.createElement("label", { htmlFor: "city", style: styles.formLabel }, "My home city"),
                        React.createElement("input", { type: "text", id: "city", name: "city", value: requestDetails.city, onChange: handleInputChange, style: styles.formInput, required: true }),
                        errors.city && React.createElement("p", { style: styles.errorText }, errors.city)),
                    React.createElement("div", { style: styles.formGroup },
                        React.createElement("label", { htmlFor: "quantity", style: styles.formLabel }, "I want quantity(KG)"),
                        React.createElement("input", { type: "number", id: "quantity", name: "quantity", value: requestDetails.quantity, onChange: handleInputChange, style: styles.formInput, required: true }),
                        errors.quantity && React.createElement("p", { style: styles.errorText }, errors.quantity)),
                    React.createElement("div", { style: styles.formGroup },
                        React.createElement("label", { htmlFor: "totalAmount", style: styles.formLabel }, "Total Amount"),
                        React.createElement("input", { type: "text", id: "totalAmount", name: "totalAmount", value: requestDetails.totalAmount.toFixed(2), readOnly: true, style: styles.formInput })),
                    React.createElement("div", { style: styles.formGroup },
                        React.createElement("label", { htmlFor: "deliveryOption", style: styles.formLabel }, "Delivery Option"),
                        React.createElement("select", { id: "deliveryOption", name: "deliveryOption", value: requestDetails.deliveryOption, onChange: handleInputChange, style: styles.formSelect, required: true },
                            React.createElement("option", { value: "" }, "Select Delivery Option"),
                            React.createElement("option", { value: "yes" }, "I need a delivery"),
                            React.createElement("option", { value: "no" }, "I no need a delivery")),
                        errors.deliveryOption && React.createElement("p", { style: styles.errorText }, errors.deliveryOption)),
                    React.createElement("div", { style: styles.formGroup },
                        React.createElement("button", { type: "submit", style: styles.submitButton }, "Submit Request"))),
                React.createElement("button", { style: styles.closeButton, onClick: function () { return setShowRequestForm(false); } }, "Close"))))));
};
export default DaylyProducts;
