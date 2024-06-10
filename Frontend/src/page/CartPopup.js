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
var CartPopup = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, userId = _a.userId;
    var _b = useState([]), messages = _b[0], setMessages = _b[1];
    var _c = useState(null), paymentReceipt = _c[0], setPaymentReceipt = _c[1];
    var _d = useState(null), selectedSellerId = _d[0], setSelectedSellerId = _d[1];
    var _e = useState(null), alertMessage = _e[0], setAlertMessage = _e[1];
    var _f = useState(null), alertType = _f[0], setAlertType = _f[1];
    useEffect(function () {
        if (isOpen) {
            fetchMessages();
        }
    }, [isOpen]);
    var fetchMessages = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("http://localhost:5001/SSABS/message/user/".concat(userId), {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    setMessages(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching messages:', error_1);
                    setAlertMessage('Error fetching messages');
                    setAlertType('error');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (messageId) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.delete("http://localhost:5001/SSABS/message/delete/".concat(messageId), {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                            },
                        })];
                case 1:
                    _a.sent();
                    setMessages(messages.filter(function (message) { return message._id !== messageId; }));
                    setAlertMessage('Message deleted successfully');
                    setAlertType('success');
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error deleting message:', error_2);
                    setAlertMessage('Error deleting message');
                    setAlertType('error');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handlePayment = function (sellerId) {
        setSelectedSellerId(sellerId);
        var paymentForm = document.getElementById('paymentForm');
        if (paymentForm) {
            paymentForm.style.display = 'block';
            paymentForm.style.transition = 'opacity 0.3s ease';
            setTimeout(function () {
                paymentForm.style.opacity = '1';
            }, 10);
        }
    };
    var handleSubmitPayment = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    if (!paymentReceipt) {
                        throw new Error('No payment receipt selected');
                    }
                    if (!selectedSellerId) {
                        throw new Error('Seller ID is not selected');
                    }
                    formData = new FormData();
                    formData.append('file', paymentReceipt);
                    formData.append('sellerId', selectedSellerId);
                    return [4 /*yield*/, axios.post('http://localhost:5001/SSABS/upload/paymentReceipt', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    console.log('File uploaded successfully:', response.data);
                    setAlertMessage('Payment receipt uploaded successfully');
                    setAlertType('success');
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error uploading payment receipt:', error_3);
                    setAlertMessage('Error uploading payment receipt');
                    setAlertType('error');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleFileChange = function (event) {
        var file = event.target.files && event.target.files[0];
        if (file) {
            setPaymentReceipt(file);
        }
    };
    return (React.createElement("div", null, isOpen && (React.createElement("div", null,
        React.createElement("h1", { className: "d-flex justify-content-center" }, "Messages"),
        alertMessage && (React.createElement("div", { style: alertStyle(alertType) }, alertMessage)),
        React.createElement("ul", null, messages.map(function (message) { return (React.createElement("li", { className: "d-flex justify-content-center", key: message._id },
            message.message,
            React.createElement("button", { style: buttonStyle('#007bff'), onClick: function () { return handlePayment(message.sellerId); } }, "Payment"),
            React.createElement("button", { style: buttonStyle('#dc3545'), onClick: function () { return handleDelete(message._id); } }, "Delete"))); })),
        React.createElement("button", { style: buttonStyle('#28a745'), onClick: onClose }, "Close"),
        React.createElement("form", { id: "paymentForm", style: formStyle, onSubmit: handleSubmitPayment, className: "d-flex justify-content-center" },
            React.createElement("div", { style: { margin: '10px' } },
                React.createElement("label", { htmlFor: "payment-photo" }, "Add payment receipt"),
                React.createElement("input", { id: "payment-photo", type: "file", accept: "image/*", onChange: handleFileChange, style: inputStyle })),
            React.createElement("button", { type: "submit", style: buttonStyle('#007bff') }, "Submit Payment"))))));
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
var formStyle = {
    display: 'none',
    opacity: '0',
    transition: 'opacity 0.3s ease',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    marginTop: '10px',
};
var inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
};
var alertStyle = function (type) { return ({
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    color: type === 'success' ? 'green' : 'red',
    backgroundColor: type === 'success' ? '#d4edda' : '#f8d7da',
    border: type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
}); };
export default CartPopup;
