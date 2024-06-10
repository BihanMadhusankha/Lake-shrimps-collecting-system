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
// import jsPDF from 'jspdf';
import 'jspdf-autotable';
import UpdateVehicleModal from './UpdateVehicleModal'; // Import the modal component
import VehicleNav from './vehicleNav';
var RegisteredVehicles = function () {
    var _a = useState([]), vehicles = _a[0], setVehicles = _a[1];
    var _b = useState(null), selectedVehicle = _b[0], setSelectedVehicle = _b[1];
    var _c = useState(''), searchTerm = _c[0], setSearchTerm = _c[1];
    useEffect(function () {
        var fetchVehicles = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios.get('http://localhost:5001/SSABS/vehicaleOwn/products', {
                                headers: {
                                    Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        setVehicles(response.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching vehicles:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchVehicles();
    }, []);
    var handleUpdateClick = function (vehicle) {
        setSelectedVehicle(vehicle);
    };
    var handleDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var token, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = localStorage.getItem('accessToken');
                    return [4 /*yield*/, axios.delete("http://localhost:5001/SSABS/vehicaleOwn/products/".concat(id), {
                            headers: {
                                Authorization: "Bearer ".concat(token),
                            },
                        })];
                case 1:
                    _a.sent();
                    // Remove the deleted vehicle from the state
                    setVehicles(function (prevVehicles) { return prevVehicles.filter(function (vehicle) { return vehicle._id !== id; }); });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error deleting vehicle:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // const handleDownloadPDF = () => {
    //   const doc = new jsPDF();
    //   const tableColumn = ["License Plate", "Vehicle Type", "Contact Number", "Additional Info"];
    //   const tableRows = vehicles.map(vehicle => [
    //     vehicle.licensePlate,
    //     vehicle.vehicleType,
    //     vehicle.contactNumber,
    //     vehicle.additionalInfo,
    //   ]);
    // doc.autoTable({
    //   head: [tableColumn],
    //   body: tableRows,
    //   startY: 20,
    // });
    //   doc.text("Registered Vehicles", 14, 15);
    //   doc.save("registered_vehicles.pdf");
    // };
    var filteredVehicles = vehicles.filter(function (vehicle) {
        return vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.additionalInfo.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return (React.createElement("div", null,
        React.createElement(VehicleNav, null),
        React.createElement("div", { style: { padding: '20px', margin: '20px auto', maxWidth: '90%' } },
            React.createElement("h2", { style: { textAlign: 'center', marginBottom: '20px', color: '#333' } }, "Registered Vehicles"),
            React.createElement("input", { type: "text", placeholder: "Search...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, style: { marginBottom: '20px', padding: '5px' } }),
            React.createElement("table", { style: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' } },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", { style: { padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc', backgroundColor: '#f0f0f0' } }, "License Plate"),
                        React.createElement("th", { style: { padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc', backgroundColor: '#f0f0f0' } }, "Vehicle Type"),
                        React.createElement("th", { style: { padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc', backgroundColor: '#f0f0f0' } }, "Contact Number"),
                        React.createElement("th", { style: { padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc', backgroundColor: '#f0f0f0' } }, "Additional Info"),
                        React.createElement("th", { style: { padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc', backgroundColor: '#f0f0f0' } }, "Photo"),
                        React.createElement("th", { style: { padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc', backgroundColor: '#f0f0f0' } }, "Actions"))),
                React.createElement("tbody", null, filteredVehicles.map(function (vehicle, index) { return (React.createElement("tr", { key: vehicle._id, style: { backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' } },
                    React.createElement("td", { style: { padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc' } }, vehicle.licensePlate),
                    React.createElement("td", { style: { padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc' } }, vehicle.vehicleType),
                    React.createElement("td", { style: { padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc' } }, vehicle.contactNumber),
                    React.createElement("td", { style: { padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc' } }, vehicle.additionalInfo),
                    React.createElement("td", { style: { padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc' } },
                        React.createElement("img", { src: vehicle.photo, alt: "Vehicle", style: { width: '100px', height: 'auto', borderRadius: '5px' } })),
                    React.createElement("td", { style: { padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc' } },
                        React.createElement("button", { onClick: function () { return handleUpdateClick(vehicle); }, style: { padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer', color: '#fff', backgroundColor: '#007bff', marginRight: '10px' } }, "Update"),
                        React.createElement("button", { onClick: function () { return handleDelete(vehicle._id); }, style: { padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer', color: '#fff', backgroundColor: '#dc3545' } }, "Delete")))); }))),
            selectedVehicle && React.createElement(UpdateVehicleModal, { vehicle: selectedVehicle, closeModal: function () { return setSelectedVehicle(null); } }),
            " ")));
};
export default RegisteredVehicles;
