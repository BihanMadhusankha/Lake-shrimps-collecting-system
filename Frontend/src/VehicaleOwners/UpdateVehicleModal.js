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
var UpdateVehicleModal = function (_a) {
    var vehicle = _a.vehicle, closeModal = _a.closeModal;
    var _b = useState(vehicle), formData = _b[0], setFormData = _b[1];
    var handleInputChange = function (e) {
        var _a;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    var handleFormSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    token = localStorage.getItem('accessToken');
                    return [4 /*yield*/, axios.put("http://localhost:5001/SSABS/vehicaleOwn/products/".concat(vehicle._id), formData, {
                            headers: {
                                Authorization: "Bearer ".concat(token),
                                'Content-Type': 'application/json'
                            },
                        })];
                case 2:
                    response = _a.sent();
                    if (response.status === 200) {
                        console.log('Updated vehicle data:', response.data);
                        closeModal();
                    }
                    else {
                        console.error('Error updating vehicle:', response.data);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error updating vehicle:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleCancelClick = function () {
        closeModal(); // Close the modal when cancel button is clicked
    };
    return (React.createElement("div", { className: "modal", style: { display: 'block', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 } },
        React.createElement("div", { className: "modal-content", style: { backgroundColor: '#fff', margin: '15% auto', padding: '20px', borderRadius: '5px', maxWidth: '400px' } },
            React.createElement("span", { className: "close", style: { float: 'right', cursor: 'pointer' }, onClick: closeModal }, "\u00D7"),
            React.createElement("h2", { style: { textAlign: 'center', marginBottom: '20px' } }, "Update Vehicle"),
            React.createElement("form", { onSubmit: handleFormSubmit },
                React.createElement("div", { style: { marginBottom: '15px' } },
                    React.createElement("label", { htmlFor: "licensePlate", style: { display: 'block', marginBottom: '5px' } }, "License Plate"),
                    React.createElement("input", { type: "text", id: "licensePlate", name: "licensePlate", value: formData.licensePlate, onChange: handleInputChange, style: { width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' } })),
                React.createElement("div", { style: { marginBottom: '15px' } },
                    React.createElement("label", { htmlFor: "vehicleType", style: { display: 'block', marginBottom: '5px' } }, "Vehicle Type"),
                    React.createElement("input", { type: "text", id: "vehicleType", name: "vehicleType", value: formData.vehicleType, onChange: handleInputChange, style: { width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' } })),
                React.createElement("div", { style: { marginBottom: '15px' } },
                    React.createElement("label", { htmlFor: "contactNumber", style: { display: 'block', marginBottom: '5px' } }, "Contact Number"),
                    React.createElement("input", { type: "text", id: "contactNumber", name: "contactNumber", value: formData.contactNumber, onChange: handleInputChange, style: { width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' } })),
                React.createElement("div", { style: { marginBottom: '15px' } },
                    React.createElement("label", { htmlFor: "additionalInfo", style: { display: 'block', marginBottom: '5px' } }, "Additional Info"),
                    React.createElement("input", { type: "text", id: "additionalInfo", name: "additionalInfo", value: formData.additionalInfo, onChange: handleInputChange, style: { width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' } })),
                React.createElement("div", { style: { textAlign: 'center' } },
                    React.createElement("button", { type: "submit", style: { padding: '8px 16px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', marginRight: '10px' } }, "Update"),
                    React.createElement("button", { type: "button", onClick: handleCancelClick, style: { padding: '8px 16px', border: 'none', borderRadius: '5px', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer' } }, "Cancel"))))));
};
export default UpdateVehicleModal;
