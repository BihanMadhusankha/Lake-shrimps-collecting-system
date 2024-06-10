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
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Card, Typography, Input, Button, Flex } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import registerImage from '../assets/pngegg (7).png';
import { toast } from 'react-hot-toast';
var sriLankaNICRegex = /^[0-9]{9}[vVxX]$/;
import './signup.css';
import Navigation from '../Navigations/userNav';
var Signup = function () {
    var _a = useState({
        firstname: '',
        lastname: '',
        role: '',
        email: '',
        phone: '',
        nic: '',
        password: '',
        cpassword: '',
    }), data = _a[0], setData = _a[1];
    var navigate = useNavigate();
    var handleRegister = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var firstname, lastname, role, email, phone, nic, password, cpassword, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault(); // Prevent default form submission
                    firstname = data.firstname, lastname = data.lastname, role = data.role, email = data.email, phone = data.phone, nic = data.nic, password = data.password, cpassword = data.cpassword;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post('http://localhost:5001/SSABS/user/signup', {
                            firstname: firstname,
                            lastname: lastname,
                            role: role,
                            email: email,
                            phone: phone,
                            nic: nic,
                            password: password,
                            cpassword: cpassword,
                        })];
                case 2:
                    response = _a.sent();
                    if (response.data) {
                        setData(response.data);
                        toast.success('Signup successful');
                        navigate('/SSABS/user/login');
                    }
                    else {
                        toast.error(response.data.error);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    toast.error('An unexpected error occurred. Please try again later.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var validatePassword = function (_, value) { return __awaiter(void 0, void 0, void 0, function () {
        var minimumPasswordLength, hasLowercase, hasUppercase, hasNumber, hasSymbol, complexityRequirementsMet;
        return __generator(this, function (_a) {
            minimumPasswordLength = 8;
            if (value.length < minimumPasswordLength) {
                return [2 /*return*/, Promise.reject("Password must be at least ".concat(minimumPasswordLength, " characters long."))];
            }
            hasLowercase = /[a-z]/.test(value);
            hasUppercase = /[A-Z]/.test(value);
            hasNumber = /[0-9]/.test(value);
            hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(value);
            complexityRequirementsMet = [hasLowercase, hasUppercase, hasNumber, hasSymbol].filter(Boolean).length >= 3;
            if (!complexityRequirementsMet) {
                return [2 /*return*/, Promise.reject('Password must contain a combination of lowercase letters, uppercase letters, numbers, and symbols.')];
            }
            return [2 /*return*/, Promise.resolve()];
        });
    }); };
    return (React.createElement("div", { className: ' ' },
        React.createElement(Navigation, null),
        React.createElement(Card, { className: 'form-container col-12 d-flex justify-content-center ', "align-items-center": true },
            React.createElement(Flex, { gap: "large" },
                React.createElement(Flex, { vertical: true, flex: 1 },
                    React.createElement(Typography.Title, { level: 3, className: 'title' }, "Create an Account"),
                    React.createElement(Typography.Text, { type: 'secondary', strong: true, className: 'slogan' }, "Join for exclusive access!"),
                    React.createElement(Form, { layout: 'vertical', onSubmitCapture: handleRegister },
                        React.createElement(FormItem, { label: 'First Name', name: 'firstname', rules: [
                                { required: true, message: 'Please input your first name!' },
                                {
                                    pattern: /^[A-Za-z]+$/,
                                    message: 'Please enter only letters for your first name.',
                                }
                            ] },
                            React.createElement(Input, { placeholder: 'Enter your Full Name', size: 'large', value: data.firstname, onChange: function (e) { return setData(__assign(__assign({}, data), { firstname: e.target.value })); } })),
                        React.createElement(FormItem, { label: 'Last Name', name: 'lastname', rules: [
                                { required: true, message: 'Please input your last name!' },
                                {
                                    pattern: /^[A-Za-z]+$/,
                                    message: 'Please enter only letters for your first name.',
                                }
                            ] },
                            React.createElement(Input, { placeholder: 'Enter your Last Name', size: 'large', value: data.lastname, onChange: function (e) { return setData(__assign(__assign({}, data), { lastname: e.target.value })); } })),
                        React.createElement(FormItem, { label: 'User Role', name: 'role', rules: [{ required: true, message: 'Please input your User Role!' }] },
                            React.createElement("select", { name: "selecteduserrole", style: { width: '100%', height: '40px', fontSize: '14px', borderRadius: '8px', padding: '5px' }, value: data.role, title: "Select your role", onChange: function (e) { return setData(__assign(__assign({}, data), { role: e.target.value })); } },
                                React.createElement("option", { value: "user" }, "User"),
                                React.createElement("option", { value: "user" }, "User"),
                                React.createElement("option", { value: "seler" }, "Seler"),
                                React.createElement("option", { value: "vehicale_owner" }, "Vehicale Owner"),
                                React.createElement("option", { value: "content_creater" }, "Content Creater"))),
                        React.createElement(FormItem, { label: 'Email', name: 'email', rules: [{ required: true, message: 'Please input your email!' },
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                }
                            ] },
                            React.createElement(Input, { placeholder: 'Enter your Email', size: 'large', value: data.email, onChange: function (e) { return setData(__assign(__assign({}, data), { email: e.target.value })); } })),
                        React.createElement(FormItem, { label: 'Phone', name: 'phone', rules: [
                                { required: true, message: 'Please input your phone!' },
                                { pattern: /^07\d{8}$/,
                                    message: 'The input is not valid phone number (starts with 07 and has 8 digits)!', },
                            ] },
                            React.createElement(Input, { placeholder: 'Enter your Phone', size: 'large', value: data.phone, onChange: function (e) { return setData(__assign(__assign({}, data), { phone: e.target.value })); } })),
                        React.createElement(FormItem, { label: 'NIC', name: 'nic', rules: [
                                { required: true, message: 'Please input your NIC!' },
                                {
                                    validator: function (_, value) {
                                        if (!sriLankaNICRegex.test(value) || value.length !== 10) {
                                            return Promise.reject('The input is not a valid Sri Lankan NIC (starts with 9 digits and ends with v, V, x, or X).');
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ] },
                            React.createElement(Input, { placeholder: 'Enter your NIC', size: 'large', value: data.nic, onChange: function (e) { return setData(__assign(__assign({}, data), { nic: e.target.value })); } })),
                        React.createElement(FormItem, { label: 'Password', name: 'password', rules: [
                                { required: true, message: 'Please input your password!' },
                                { validator: validatePassword },
                            ] },
                            React.createElement(Input.Password, { placeholder: 'Enter your Password', size: 'large', value: data.password, onChange: function (e) { return setData(__assign(__assign({}, data), { password: e.target.value })); } })),
                        React.createElement(FormItem, { label: 'Confirm Password', name: 'cpassword', rules: [
                                { required: true, message: 'Please confirm your password!' },
                                function (_a) {
                                    var getFieldValue = _a.getFieldValue;
                                    return ({
                                        validator: function (_, value) {
                                            if (!value || getFieldValue('password') !== value) {
                                                return Promise.reject('Passwords do not match!');
                                            }
                                            return Promise.resolve();
                                        },
                                    });
                                },
                            ] },
                            React.createElement(Input.Password, { placeholder: 'Confirm your Password', size: 'large', value: data.cpassword, onChange: function (e) { return setData(__assign(__assign({}, data), { cpassword: e.target.value })); } })),
                        React.createElement(FormItem, null,
                            React.createElement(Button, { type: 'primary', htmlType: 'submit', size: 'large', className: 'btn' }, "Create Account")),
                        React.createElement(FormItem, null,
                            React.createElement(Link, { to: "/SSABS/user/login" },
                                React.createElement(Button, { className: 'btn', size: 'large' }, "Sign In"))))),
                React.createElement(Flex, { flex: 1.5 },
                    React.createElement("img", { src: registerImage, alt: "Register Img", className: 'auth-img' }))))));
};
export default Signup;
