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
import SealerNav from './sealerNav';
var SellerRequests = function () {
    var _a = useState([]), requests = _a[0], setRequests = _a[1];
    var _b = useState([]), payments = _b[0], setPayments = _b[1];
    var _c = useState(true), isLoggedIn = _c[0], setIsLoggedIn = _c[1];
    var _d = useState(false), showForm = _d[0], setShowForm = _d[1];
    var _e = useState(null), selectedRequest = _e[0], setSelectedRequest = _e[1];
    var _f = useState({
        accountNumber: '',
        bankName: '',
        ifscCode: '',
        totalPayment: '',
    }), accountDetails = _f[0], setAccountDetails = _f[1];
    var _g = useState({
        accountNumber: '',
        bankName: '',
        ifscCode: '',
    }), formErrors = _g[0], setFormErrors = _g[1];
    var _h = useState(null), alert = _h[0], setAlert = _h[1];
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
                            fetchSellerRequests();
                            fetchPaymentReceipts();
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
    var fetchSellerRequests = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get('http://localhost:5001/SSABS/seller/requests', {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    setRequests(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error fetching requests:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var fetchPaymentReceipts = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get('http://localhost:5001/SSABS/seller/receipt', {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    setPayments(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error fetching receipts:', error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleAccept = function (request) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setSelectedRequest(request);
            setShowForm(true);
            return [2 /*return*/];
        });
    }); };
    var validateForm = function () {
        var errors = { accountNumber: '', bankName: '', ifscCode: '' };
        var isValid = true;
        if (!/^\d{10,16}$/.test(accountDetails.accountNumber)) {
            errors.accountNumber = 'Account number should be 10-16 digits long.';
            isValid = false;
        }
        if (!/^[a-zA-Z ]+$/.test(accountDetails.bankName) || accountDetails.bankName.trim() === '') {
            errors.bankName = 'Bank name should only contain letters and should not be empty.';
            isValid = false;
        }
        // if (!/^[A-Z]{4}\d{7}$/.test(accountDetails.ifscCode)) {
        //   errors.ifscCode = 'IFSC code should be 4 letters followed by 7 digits.';
        //   isValid = false;
        // }
        setFormErrors(errors);
        return isValid;
    };
    var handleFormSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(selectedRequest && validateForm())) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios.post("http://localhost:5001/SSABS/seller/requests/accept/".concat(selectedRequest._id, "/").concat(selectedRequest.userId, "/").concat(selectedRequest.sellerId), {}, {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    setRequests(function (prevRequests) {
                        return prevRequests.map(function (request) {
                            return request._id === selectedRequest._id ? __assign(__assign({}, request), { status: 'Accepted' }) : request;
                        });
                    });
                    setAlert({ message: 'Request accepted successfully!', type: 'success' });
                    return [4 /*yield*/, deleteRequest(selectedRequest._id)];
                case 3:
                    _a.sent();
                    setShowForm(false);
                    setSelectedRequest(null);
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Error accepting request:', error_4);
                    setAlert({ message: 'Failed to accept the request. Please try again.', type: 'error' });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var deleteRequest = function (requestId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.delete("http://localhost:5001/SSABS/seller/requests/".concat(requestId), {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    setRequests(function (prevRequests) {
                        return prevRequests.filter(function (request) { return request._id !== requestId; });
                    });
                    console.log('Request deleted:', response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.error('Error deleting request:', error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleReject = function (requestId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.delete("http://localhost:5001/SSABS/seller/requests/".concat(requestId), {
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    setRequests(function (prevRequests) {
                        return prevRequests.filter(function (request) { return request._id !== requestId; });
                    });
                    console.log('Request rejected:', response.data);
                    setAlert({ message: 'Request rejected successfully!', type: 'success' });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.error('Error rejecting request:', error_6);
                    setAlert({ message: 'Failed to reject the request. Please try again.', type: 'error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleAcceptReceipt = function (payment) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // Logic to accept the payment receipt
                console.log('Accepted payment receipt:', payment);
            }
            catch (error) {
                console.error('Error accepting payment receipt:', error);
            }
            return [2 /*return*/];
        });
    }); };
    var handleRejectReceipt = function (paymentId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                console.log('Rejected payment receipt with ID:', paymentId);
            }
            catch (error) {
                console.error('Error rejecting payment receipt:', error);
            }
            return [2 /*return*/];
        });
    }); };
    useEffect(function () {
        if (alert) {
            var timer_1 = setTimeout(function () {
                setAlert(null);
            }, 3000);
            return function () { return clearTimeout(timer_1); };
        }
    }, [alert]);
    return (React.createElement("div", null,
        React.createElement(SealerNav, null),
        alert && (React.createElement("div", { style: {
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: alert.type === 'success' ? '#28a745' : '#dc3545',
                color: 'white',
                zIndex: 1000,
            } }, alert.message)),
        React.createElement("div", { className: 'd-flex flex-row', style: { padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' } },
            React.createElement("div", { className: 'col-6' },
                React.createElement("h2", { className: 'd-flex justify-content-center mt-4', style: { fontSize: '24px', fontWeight: 'bold', color: '#333' } }, "My Requests"),
                requests.length > 0 ? (requests.map(function (request) { return (React.createElement("div", { key: request._id, style: {
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
                        backgroundColor: '#fff',
                        margin: '10px',
                    } },
                    React.createElement("p", null,
                        React.createElement("strong", null, "Product:"),
                        " ",
                        request.productId),
                    React.createElement("p", null,
                        React.createElement("strong", null, "Address:"),
                        " ",
                        request.address),
                    React.createElement("p", null,
                        React.createElement("strong", null, "City:"),
                        " ",
                        request.city),
                    React.createElement("p", null,
                        React.createElement("strong", null, "Delivery Option:"),
                        " ",
                        request.deliveryOption),
                    React.createElement("p", null,
                        React.createElement("strong", null, "Quantity:"),
                        " ",
                        request.quantity,
                        " KG"),
                    React.createElement("p", null,
                        React.createElement("strong", null, "Total Amount:"),
                        " $",
                        request.totalAmount.toFixed(2)),
                    React.createElement("p", null,
                        React.createElement("strong", null, "Status:"),
                        " ",
                        request.status),
                    React.createElement("button", { style: {
                            padding: '10px',
                            border: 'none',
                            borderRadius: '5px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            margin: '5px',
                        }, onClick: function () { return handleAccept(request); }, disabled: request.status === 'Accepted' || request.status === 'Rejected' }, "Accept"),
                    React.createElement("button", { style: {
                            padding: '10px',
                            border: 'none',
                            borderRadius: '5px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            margin: '5px',
                        }, onClick: function () { return handleReject(request._id); }, disabled: request.status === 'Accepted' || request.status === 'Rejected' }, "Reject"))); })) : (React.createElement("p", null, "No pending requests found.")),
                showForm && selectedRequest && (React.createElement("div", { style: {
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#fff',
                        margin: '10px',
                    } },
                    React.createElement("h3", null, "Enter Account Details"),
                    React.createElement("label", null,
                        "Account Number:",
                        React.createElement("input", { type: "text", value: accountDetails.accountNumber, onChange: function (e) {
                                return setAccountDetails(__assign(__assign({}, accountDetails), { accountNumber: e.target.value }));
                            } }),
                        formErrors.accountNumber && React.createElement("p", { style: { color: 'red' } }, formErrors.accountNumber)),
                    React.createElement("br", null),
                    React.createElement("label", null,
                        "Bank Name:",
                        React.createElement("input", { type: "text", value: accountDetails.bankName, onChange: function (e) {
                                return setAccountDetails(__assign(__assign({}, accountDetails), { bankName: e.target.value }));
                            } }),
                        formErrors.bankName && React.createElement("p", { style: { color: 'red' } }, formErrors.bankName)),
                    React.createElement("br", null),
                    React.createElement("label", null,
                        "IFSC Code:",
                        React.createElement("input", { type: "text", value: accountDetails.ifscCode, onChange: function (e) {
                                return setAccountDetails(__assign(__assign({}, accountDetails), { ifscCode: e.target.value }));
                            } }),
                        formErrors.ifscCode && React.createElement("p", { style: { color: 'red' } }, formErrors.ifscCode)),
                    React.createElement("br", null),
                    React.createElement("button", { style: {
                            padding: '10px',
                            border: 'none',
                            borderRadius: '5px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            margin: '5px',
                        }, onClick: handleFormSubmit }, "Submit")))),
            React.createElement("div", { className: 'col-6' },
                React.createElement("h2", { className: 'd-flex justify-content-center mt-4', style: { fontSize: '24px', fontWeight: 'bold', color: '#333' } }, "Payment Receipts"),
                payments.length > 0 ? (payments.map(function (payment) { return (React.createElement("div", { key: payment._id, style: {
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
                        backgroundColor: '#fff',
                        margin: '10px',
                    } },
                    React.createElement("p", null,
                        React.createElement("strong", null, "Seller ID:"),
                        " ",
                        payment.sellerId),
                    React.createElement("div", null,
                        React.createElement("p", null,
                            React.createElement("strong", null, "Payment Receipt:")),
                        React.createElement("img", { src: payment.photoUrl, alt: "Payment Receipt", style: { maxWidth: '200px', maxHeight: '200px' } })),
                    React.createElement("div", null,
                        React.createElement("button", { style: {
                                padding: '10px',
                                border: 'none',
                                borderRadius: '5px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                margin: '5px',
                            }, onClick: function () { return handleAcceptReceipt(payment); } }, "Accept"),
                        React.createElement("button", { style: {
                                padding: '10px',
                                border: 'none',
                                borderRadius: '5px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                margin: '5px',
                            }, onClick: function () { return handleRejectReceipt(payment._id); } }, "Reject")))); })) : (React.createElement("p", null, "No payment receipts found."))))));
};
export default SellerRequests;
