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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SealerNav from '../Sealer/sealerNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerImage from '../assets/pngegg (7).png';
import { Modal, Button, Form } from 'react-bootstrap';
var VehicleOwnerPage = function () {
    var _a = useState([]), vehicleOwners = _a[0], setVehicleOwners = _a[1];
    var _b = useState(null), selectedOwner = _b[0], setSelectedOwner = _b[1];
    var _c = useState([]), vehicles = _c[0], setVehicles = _c[1];
    var _d = useState(false), showModal = _d[0], setShowModal = _d[1];
    var _e = useState(null), selectedVehicleId = _e[0], setSelectedVehicleId = _e[1];
    var _f = useState({ name: '', contact: '', distance: '', date: '' }), bookingDetails = _f[0], setBookingDetails = _f[1];
    useEffect(function () {
        var fetchVehicleOwners = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios.get('http://localhost:5001/SSABS/vehicaleowner')];
                    case 1:
                        response = _a.sent();
                        setVehicleOwners(response.data.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching vehicle owners:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchVehicleOwners();
    }, []);
    useEffect(function () {
        var fetchVehicles = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!selectedOwner) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.get("http://localhost:5001/SSABS/vehicaleown/".concat(selectedOwner._id))];
                    case 2:
                        response = _a.sent();
                        setVehicles(response.data.data);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Error fetching vehicles:', error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchVehicles();
    }, [selectedOwner]);
    var handleOwnerSelect = function (owner) {
        setSelectedOwner(owner);
    };
    var handleClose = function () {
        setSelectedOwner(null);
        setVehicles([]);
    };
    var handleBookVehicle = function (vehicleId) {
        setSelectedVehicleId(vehicleId);
        setShowModal(true);
    };
    var handleBookingSubmit = function (e) {
        e.preventDefault();
        alert("Booking details for vehicle ID: ".concat(selectedVehicleId, "\nName: ").concat(bookingDetails.name, "\nContact: ").concat(bookingDetails.contact, "\nDate: ").concat(bookingDetails.date));
        // Here, you would typically send the bookingDetails to your server
        setShowModal(false);
        setBookingDetails({ name: '', contact: '', distance: '', date: '' });
    };
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setBookingDetails(function (prevDetails) {
            var _a;
            return (__assign(__assign({}, prevDetails), (_a = {}, _a[name] = value, _a)));
        });
    };
    return (React.createElement("div", null,
        React.createElement(SealerNav, null),
        React.createElement("h1", { className: 'd-flex justify-content-center mt-4' }, "Vehicle Owners"),
        React.createElement("div", { className: "container rounded-5 p-5 mt-lg-5 ".concat(selectedOwner ? 'blur-background' : '') },
            React.createElement("div", { className: "row justify-content-center" }, vehicleOwners.map(function (owner) { return (React.createElement("div", { className: "card owner-card m-lg-3 rounded-3 col-lg-3", key: owner._id, onClick: function () { return handleOwnerSelect(owner); } },
                React.createElement("div", { className: "card-body" },
                    React.createElement("img", { src: registerImage, className: "img-fluid", alt: "Owner" }),
                    React.createElement("h5", null,
                        "First Name: ",
                        owner.firstname),
                    React.createElement("h5", null,
                        "Last Name: ",
                        owner.lastname),
                    React.createElement("h5", null,
                        "Email: ",
                        owner.email),
                    React.createElement("h5", null,
                        "National Id Card: ",
                        owner.nic),
                    React.createElement("h5", null,
                        "Contact Number: ",
                        owner.phone)))); }))),
        selectedOwner && (React.createElement("div", { className: "vehicle-list-overlay" },
            React.createElement("div", { className: "container vehicle-list-container rounded-5 p-5 mt-lg-5" },
                React.createElement("h2", null,
                    "Vehicles belonging to ",
                    selectedOwner.firstname,
                    " ",
                    selectedOwner.lastname),
                React.createElement("div", { className: "row justify-content-center" }, vehicles.map(function (vehicle, index) { return (React.createElement("div", { className: "card vehicle-card m-lg-3 rounded-3 col-lg-3 d-flex flex-row", key: index },
                    React.createElement("div", { className: "card-body" },
                        React.createElement("h5", null,
                            "License Plate: ",
                            vehicle.licensePlate),
                        React.createElement("h5", null,
                            "Vehicle Type: ",
                            vehicle.vehicleType),
                        React.createElement("img", { src: vehicle.photo, alt: "Vehicle", className: "vehicle-photo" }),
                        React.createElement("button", { className: "btn btn-primary mt-3", onClick: function () { return handleBookVehicle(vehicle._id); } }, "Book Vehicle")))); })),
                React.createElement("button", { className: "btn btn-danger", onClick: handleClose }, "Close")))),
        React.createElement(Modal, { show: showModal, onHide: function () { return setShowModal(false); } },
            React.createElement(Modal.Header, { closeButton: true },
                React.createElement(Modal.Title, null, "Book Vehicle")),
            React.createElement(Modal.Body, null,
                React.createElement(Form, { onSubmit: handleBookingSubmit },
                    React.createElement(Form.Group, { controlId: "name" },
                        React.createElement(Form.Label, null, "Name"),
                        React.createElement(Form.Control, { type: "text", name: "name", value: bookingDetails.name, onChange: handleInputChange, required: true })),
                    React.createElement(Form.Group, { controlId: "contact" },
                        React.createElement(Form.Label, null, "Contact"),
                        React.createElement(Form.Control, { type: "text", name: "contact", value: bookingDetails.contact, onChange: handleInputChange, required: true })),
                    React.createElement(Form.Group, { controlId: "distance" },
                        React.createElement(Form.Label, null, "Distance(Km)"),
                        React.createElement(Form.Control, { type: "text", name: "distance", value: bookingDetails.distance, onChange: handleInputChange, required: true })),
                    React.createElement(Form.Group, { controlId: "date" },
                        React.createElement(Form.Label, null, "Booking Date"),
                        React.createElement(Form.Control, { type: "date", name: "date", value: bookingDetails.date, onChange: handleInputChange, required: true })),
                    React.createElement(Button, { variant: "primary", type: "submit", className: "mt-3" }, "Submit")))),
        React.createElement("style", null, "\n        .blur-background {\n          filter: blur(5px);\n        }\n        .owner-card {\n          cursor: pointer;\n          transition: transform 0.3s ease, box-shadow 0.3s ease;\n        }\n        .owner-card:hover {\n          transform: scale(1.05);\n          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);\n        }\n        .vehicle-list-overlay {\n          position: fixed;\n          top: 0;\n          left: 0;\n          width: 100%;\n          height: 100%;\n          background: rgba(0, 0, 0, 0.5);\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          animation: fadeIn 0.5s;\n        }\n        .vehicle-list-container {\n          background: #fff;\n          animation: slideIn 0.5s;\n        }\n        .vehicle-card {\n          transition: transform 0.3s ease, box-shadow 0.3s ease;\n        }\n        .vehicle-card:hover {\n          transform: scale(1.05);\n          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);\n        }\n        .vehicle-photo {\n          width: 100%;\n          height: auto;\n          transition: transform 0.3s ease;\n        }\n        .vehicle-photo:hover {\n          transform: scale(1.1);\n        }\n        @keyframes fadeIn {\n          from {\n            opacity: 0;\n          }\n          to {\n            opacity: 1;\n          }\n        }\n        @keyframes slideIn {\n          from {\n            transform: translateY(-20px);\n            opacity: 0;\n          }\n          to {\n            transform: translateY(0);\n            opacity: 1;\n          }\n        }\n      ")));
};
export default VehicleOwnerPage;
