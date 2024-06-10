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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Form, Input, Typography } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import loginImage from '../assets/cartoon-t-shirt-drawing-photography-shrimps-png-clipart.jpg';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
var Login = function () {
    var _a = useState({ email: '', password: '' }), data = _a[0], setData = _a[1];
    var navigate = useNavigate();
    var _b = useAuth(), setToken = _b.setToken, setUser = _b.setUser;
    var handleLogin = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, response, role, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    email = data.email, password = data.password;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post('http://localhost:5001/SSABS/user/login', {
                            email: email,
                            password: password,
                        })];
                case 2:
                    response = _a.sent();
                    if (response.data.status === 'success') {
                        localStorage.setItem('accessToken', response.data.accessToken);
                        localStorage.setItem('id', response.data.user._id);
                        setToken(response.data.accessToken);
                        setUser(response.data.user); // Set the user data in the context
                        toast.success('Login successful');
                        role = response.data.user.role;
                        if (role === 'admin') {
                            navigate('/SSABS/admin/dashboard');
                        }
                        else if (role === 'content_creater') {
                            navigate('/SSABS/content_creater/dashboard');
                        }
                        else if (role === 'vehicale_owner') {
                            navigate('/SSABS/vehicale_owner/dashboard');
                        }
                        else if (role === 'seler') {
                            navigate('/SSABS/seler/dashboard');
                        }
                        else {
                            navigate('/SSABS/user/userhome');
                        }
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
    return (React.createElement(Card, { className: "form-container col-12 ", "align-items-center": true },
        React.createElement("div", { style: { display: 'flex', gap: '20px' } },
            React.createElement("div", { style: { flex: 1 } },
                React.createElement(Typography.Title, { level: 3, className: "title" }, "Sign In"),
                React.createElement(Typography.Text, { type: "secondary", strong: true, className: "slogan" }, "Unlock your account!"),
                React.createElement(Form, { layout: "vertical", onSubmitCapture: handleLogin },
                    React.createElement(FormItem, { label: "Email", name: "email", rules: [
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'The input is not valid E-mail!' }
                        ] },
                        React.createElement(Input, { placeholder: "Enter your Email", size: "large", value: data.email, onChange: function (e) { return setData(__assign(__assign({}, data), { email: e.target.value })); } })),
                    React.createElement(FormItem, { label: "Password", name: "password", rules: [{ required: true, message: 'Please input your password!' }] },
                        React.createElement(Input.Password, { placeholder: "Enter your Password", size: "large", value: data.password, onChange: function (e) { return setData(__assign(__assign({}, data), { password: e.target.value })); } })),
                    React.createElement(FormItem, null,
                        React.createElement(Button, { type: "primary", htmlType: "submit", size: "large", className: "btn" }, "Sign In")),
                    React.createElement(FormItem, null,
                        React.createElement(Link, { to: "/SSABS/user/signup" },
                            React.createElement(Button, { className: "btn", size: "large" }, "Create an Account"))),
                    React.createElement(FormItem, null,
                        React.createElement(Link, { to: '/SSABS/user/forgetpassword' },
                            React.createElement(Button, { className: "btn", size: "large" }, "Forgot Password"))))),
            React.createElement("div", { style: { flex: 1.5 } },
                React.createElement("img", { src: loginImage, alt: "Register Img", className: "auth-img" })))));
};
export default Login;
