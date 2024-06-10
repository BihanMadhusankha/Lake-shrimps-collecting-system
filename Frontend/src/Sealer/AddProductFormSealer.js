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
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SealerNav from './sealerNav';
import { useAuth } from '../page/AuthContext';
var AddProductFormSealer = function () {
    var _a = useState(''), name = _a[0], setName = _a[1];
    var _b = useState(0), price = _b[0], setPrice = _b[1];
    var _c = useState(''), description = _c[0], setDescription = _c[1];
    var _d = useState(0), totalHarvest = _d[0], setTotalHarvest = _d[1];
    var _e = useState({}), errors = _e[0], setErrors = _e[1];
    var _f = useState(''), successMessage = _f[0], setSuccessMessage = _f[1];
    var navigate = useNavigate();
    var user = useAuth().user;
    var validateForm = function () {
        var formIsValid = true;
        var newErrors = {};
        if (!name) {
            newErrors.name = 'Please select a product';
            formIsValid = false;
        }
        if (price <= 0) {
            newErrors.price = 'Please enter a valid price';
            formIsValid = false;
        }
        if (!description || !/^[A-Z].{0,99}$/.test(description)) {
            newErrors.description = 'Please enter a description with the first letter capital and up to 100 characters';
            formIsValid = false;
        }
        if (totalHarvest <= 0) {
            newErrors.totalHarvest = 'Please enter a valid total harvest';
            formIsValid = false;
        }
        setErrors(newErrors);
        return formIsValid;
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var sellerId, token, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!user) {
                        console.error('No user logged in');
                        return [2 /*return*/];
                    }
                    sellerId = user.id;
                    if (!validateForm()) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    token = localStorage.getItem('accessToken');
                    if (!token) {
                        console.error('Token is missing');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, axios.post('http://localhost:5001/SSABS/seler/products', {
                            name: name,
                            price: price,
                            description: description,
                            totalHarvest: totalHarvest,
                            sellerId: sellerId,
                        }, {
                            headers: {
                                'Authorization': "Bearer ".concat(token),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    console.log(response.data.totalHarvest);
                    setSuccessMessage('Product added successfully');
                    setTimeout(function () {
                        setSuccessMessage('');
                        navigate('/SSABS/seler/dashboard');
                    }, 3000);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error posting product', error_1);
                    setSuccessMessage('Failed to add product');
                    setTimeout(function () {
                        setSuccessMessage('');
                    }, 3000);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var inputStyle = {
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    };
    var labelStyle = {
        marginBottom: '5px',
        fontWeight: 'bold',
    };
    var buttonStyle = {
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#28a745',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
    };
    var formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };
    var successMessageStyle = {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px',
        textAlign: 'center',
    };
    return (React.createElement("div", null,
        React.createElement(SealerNav, null),
        React.createElement("form", { className: 'd-flex justify-content-center mt-4', onSubmit: handleSubmit, style: formStyle },
            React.createElement("div", null,
                React.createElement("h3", { className: 'd-flex justify-content-center ' }, "Add product"),
                React.createElement("label", { style: labelStyle }, "Select shrimps type name"),
                React.createElement("select", { value: name, onChange: function (e) { return setName(e.target.value); }, required: true, style: inputStyle },
                    React.createElement("option", { value: "" }, "Select a product"),
                    React.createElement("option", { value: "Brine shrimp" }, "Brine shrimp"),
                    React.createElement("option", { value: "Cherry shrimp" }, "Cherry shrimp"),
                    React.createElement("option", { value: "Cocktail shrimp" }, "Cocktail shrimp"),
                    React.createElement("option", { value: "Large shrimp" }, "Large shrimp"),
                    React.createElement("option", { value: "Jumbo shrimp" }, "Jumbo shrimp")),
                errors.name && React.createElement("div", { className: "error" }, errors.name)),
            React.createElement("div", null,
                React.createElement("label", { style: labelStyle }, "Product Unit Price (Rs)"),
                React.createElement("input", { placeholder: "product price", type: "number", value: price, onChange: function (e) { return setPrice(Number(e.target.value)); }, required: true, style: inputStyle }),
                errors.price && React.createElement("div", { className: "error" }, errors.price)),
            React.createElement("div", null,
                React.createElement("label", { style: labelStyle }, "Description"),
                React.createElement("textarea", { placeholder: "product description", value: description, onChange: function (e) { return setDescription(e.target.value); }, required: true, style: __assign(__assign({}, inputStyle), { height: '100px' }) }),
                errors.description && React.createElement("div", { className: "error" }, errors.description)),
            React.createElement("div", null,
                React.createElement("label", { style: labelStyle }, "Total Harvest (Kg)"),
                React.createElement("input", { placeholder: "total harvest", type: "number", value: totalHarvest, onChange: function (e) { return setTotalHarvest(Number(e.target.value)); }, required: true, style: inputStyle }),
                errors.totalHarvest && React.createElement("div", { className: "error" }, errors.totalHarvest)),
            React.createElement("button", { type: "submit", style: buttonStyle }, "Add Product")),
        successMessage && React.createElement("div", { style: successMessageStyle }, successMessage)));
};
export default AddProductFormSealer;
