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
// profile.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavigation from '../Navigations/userNav';
var Profile = function () {
    var _a = useState(null), user = _a[0], setUser = _a[1];
    var _b = useState(false), isEditing = _b[0], setIsEditing = _b[1];
    var _c = useState({}), editedUser = _c[0], setEditedUser = _c[1];
    useEffect(function () {
        var fetchProfile = function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = localStorage.getItem('accessToken');
                        if (!token) {
                            console.error('Token not found');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, axios.get('http://localhost:5001/SSABS/profile', {
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        setUser(response.data);
                        setEditedUser(response.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching user data:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchProfile();
    }, []);
    var handleEdit = function () {
        setIsEditing(true);
    };
    var handleSave = function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = localStorage.getItem('accessToken');
                    if (!token) {
                        console.error('Token not found');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, axios.put('http://localhost:5001/SSABS/profile', editedUser, {
                            headers: {
                                Authorization: "Bearer ".concat(token),
                            },
                        })];
                case 1:
                    _a.sent();
                    setUser(editedUser);
                    setIsEditing(false);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error updating user data:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleInputChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setEditedUser(__assign(__assign({}, editedUser), (_a = {}, _a[name] = value, _a)));
    };
    return (React.createElement("div", null,
        React.createElement(UserNavigation, null),
        React.createElement("div", { style: { textAlign: 'center', margin: '40px' } },
            React.createElement("h1", { style: { color: '#333', fontSize: '32px', marginBottom: '20px' } }, "Profile"),
            user ? (React.createElement("div", { style: {
                    background: 'rgba(255, 255, 255, 0.8)',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    maxWidth: '400px',
                    margin: '10px  auto'
                } }, isEditing ? (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { marginBottom: '10px' } },
                    React.createElement("input", { type: "text", name: "firstname", value: editedUser.firstname, onChange: handleInputChange, style: { marginBottom: '10px', padding: '5px', width: '100%', borderRadius: '4px' } })),
                React.createElement("div", { style: { marginBottom: '10px' } },
                    React.createElement("input", { type: "text", name: "lastname", value: editedUser.lastname, onChange: handleInputChange, style: { marginBottom: '10px', padding: '5px', width: '100%', borderRadius: '4px' } })),
                React.createElement("div", { style: { marginBottom: '10px' } },
                    React.createElement("input", { type: "text", name: "email", value: editedUser.email, onChange: handleInputChange, style: { marginBottom: '10px', padding: '5px', width: '100%', borderRadius: '4px' } })),
                React.createElement("div", { style: { marginBottom: '10px' } },
                    React.createElement("input", { type: "text", name: "phone", value: editedUser.phone, onChange: handleInputChange, style: { marginBottom: '10px', padding: '5px', width: '100%', borderRadius: '4px' } })),
                React.createElement("button", { onClick: handleSave, style: { padding: '8px 16px', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' } }, "Save"))) : (React.createElement(React.Fragment, null,
                React.createElement("p", { style: { marginBottom: '10px' } },
                    React.createElement("strong", null, "First Name:"),
                    " ",
                    user.firstname),
                React.createElement("p", { style: { marginBottom: '10px' } },
                    React.createElement("strong", null, "Last Name:"),
                    " ",
                    user.lastname),
                React.createElement("p", { style: { marginBottom: '10px' } },
                    React.createElement("strong", null, "Email:"),
                    " ",
                    user.email),
                React.createElement("p", { style: { marginBottom: '10px' } },
                    React.createElement("strong", null, "Phone:"),
                    " ",
                    user.phone),
                React.createElement("button", { onClick: handleEdit, style: { padding: '8px 16px', borderRadius: '4px', backgroundColor: '#28a', color: 'white', border: 'none', cursor: 'pointer' } }, "Edit"))))) : (React.createElement("p", null, "Loading...")))));
};
export default Profile;
