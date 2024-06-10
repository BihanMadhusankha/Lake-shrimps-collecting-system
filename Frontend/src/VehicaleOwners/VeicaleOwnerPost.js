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
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VehicleNav from './vehicleNav';
var validationSchema = yup.object({
    contactNumber: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Contact number must be exactly 10 digits')
        .required('Contact number is required'),
    vehicleType: yup
        .string()
        .oneOf(['car', 'motorcycle', 'bicycle', 'truck'], 'Select a valid vehicle type')
        .required('Vehicle type is required'),
    licensePlate: yup
        .string()
        .matches(/^[A-Z]{2,3}-\d{4}$/, 'License plate must be in the format AAA-1234')
        .required('License plate is required'),
    additionalInfo: yup
        .string()
        .matches(/^[A-Z][a-zA-Z\s]*$/, 'Additional info must start with an uppercase letter and only contain letters and spaces')
        .max(100, 'Additional info must be at most 100 characters long'),
    photo: yup
        .mixed()
        .required('A vehicle photo is required')
        .test('fileType', 'Unsupported file format', function (value) {
        return value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type);
    }),
});
var RegisterVehicle = function () {
    var navigate = useNavigate();
    var formik = useFormik({
        initialValues: {
            contactNumber: '',
            vehicleType: '',
            licensePlate: '',
            additionalInfo: '',
            photo: null,
        },
        validationSchema: validationSchema,
        onSubmit: function (values) { return __awaiter(void 0, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = new FormData();
                        data.append('photo', values.photo);
                        data.append('contactNumber', values.contactNumber);
                        data.append('vehicleType', values.vehicleType);
                        data.append('licensePlate', values.licensePlate);
                        data.append('additionalInfo', values.additionalInfo);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.post('http://localhost:5001/SSABS/vehicaleOwn/products', data, {
                                headers: {
                                    Authorization: "Bearer ".concat(localStorage.getItem('accessToken')),
                                },
                            })];
                    case 2:
                        _a.sent();
                        alert('Vehicle registered successfully');
                        navigate('/SSABS/vehicale_owner/dashboard');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error registering vehicle:', error_1);
                        alert('Failed to register vehicle');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
    });
    return (React.createElement("div", null,
        React.createElement(VehicleNav, null),
        React.createElement("div", { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px', backgroundColor: '#f8f9fa' } },
            React.createElement("div", { style: { padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginTop: '20px', width: '400px' } },
                React.createElement("h3", { style: { fontSize: '20px', fontWeight: 'bold', color: '#333' } }, "Register Your Vehicle"),
                React.createElement("form", { onSubmit: formik.handleSubmit },
                    React.createElement("div", { style: { marginBottom: '10px' } },
                        React.createElement("label", { htmlFor: "contactNumber", style: { display: 'block', fontSize: '16px', color: '#333' } }, "Contact Number"),
                        React.createElement("input", { type: "text", id: "contactNumber", name: "contactNumber", value: formik.values.contactNumber, onChange: formik.handleChange, onBlur: formik.handleBlur, style: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }, required: true }),
                        formik.touched.contactNumber && formik.errors.contactNumber ? (React.createElement("div", { style: { color: 'red' } }, formik.errors.contactNumber)) : null),
                    React.createElement("div", { style: { marginBottom: '10px' } },
                        React.createElement("label", { htmlFor: "vehicleType", style: { display: 'block', fontSize: '16px', color: '#333' } }, "Vehicle Type"),
                        React.createElement("select", { id: "vehicleType", name: "vehicleType", value: formik.values.vehicleType, onChange: formik.handleChange, onBlur: formik.handleBlur, style: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }, required: true },
                            React.createElement("option", { value: "" }, "Select a vehicle type"),
                            React.createElement("option", { value: "car" }, "Car"),
                            React.createElement("option", { value: "motorcycle" }, "Motorcycle"),
                            React.createElement("option", { value: "bicycle" }, "Bicycle"),
                            React.createElement("option", { value: "truck" }, "Truck")),
                        formik.touched.vehicleType && formik.errors.vehicleType ? (React.createElement("div", { style: { color: 'red' } }, formik.errors.vehicleType)) : null),
                    React.createElement("div", { style: { marginBottom: '10px' } },
                        React.createElement("label", { htmlFor: "licensePlate", style: { display: 'block', fontSize: '16px', color: '#333' } }, "License Plate"),
                        React.createElement("input", { type: "text", id: "licensePlate", name: "licensePlate", value: formik.values.licensePlate, onChange: formik.handleChange, onBlur: formik.handleBlur, style: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }, required: true }),
                        formik.touched.licensePlate && formik.errors.licensePlate ? (React.createElement("div", { style: { color: 'red' } }, formik.errors.licensePlate)) : null),
                    React.createElement("div", { style: { marginBottom: '10px' } },
                        React.createElement("label", { htmlFor: "additionalInfo", style: { display: 'block', fontSize: '16px', color: '#333' } }, "Additional Info"),
                        React.createElement("input", { type: "text", id: "additionalInfo", name: "additionalInfo", value: formik.values.additionalInfo, onChange: formik.handleChange, onBlur: formik.handleBlur, style: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' } }),
                        formik.touched.additionalInfo && formik.errors.additionalInfo ? (React.createElement("div", { style: { color: 'red' } }, formik.errors.additionalInfo)) : null),
                    React.createElement("div", { style: { marginBottom: '10px' } },
                        React.createElement("label", { htmlFor: "photo", style: { display: 'block', fontSize: '16px', color: '#333' } }, "Upload Vehicle Photo"),
                        React.createElement("input", { type: "file", id: "photo", name: "photo", onChange: function (event) {
                                if (event.currentTarget.files) {
                                    formik.setFieldValue('photo', event.currentTarget.files[0]);
                                }
                            }, style: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }, required: true }),
                        formik.touched.photo && formik.errors.photo ? (React.createElement("div", { style: { color: 'red' } }, formik.errors.photo)) : null),
                    React.createElement("button", { type: "submit", style: { padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' } }, "Submit"))))));
};
export default RegisterVehicle;
