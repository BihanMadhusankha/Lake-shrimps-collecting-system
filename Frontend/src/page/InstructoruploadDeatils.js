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
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import ContentNav from '../ContentCreater/contentNav';
import { useNavigate } from 'react-router-dom';
var categories = [
    'Shrimp Biology',
    'Shrimp Farming',
    'Shrimp Recipes',
    'Shrimp Conservation',
    'Shrimp Diseases and Treatment',
];
var validationSchema = yup.object({
    title: yup
        .string()
        .required('Title is required')
        .matches(/^[A-Z][a-zA-Z\s]*$/, 'Title must start with a capital letter and contain only letters and spaces'),
    category: yup
        .string()
        .oneOf(categories, 'Invalid category')
        .required('Category is required'),
    description: yup
        .string()
        .required('Description is required')
        .max(100, 'Description must be at most 100 characters long')
        .matches(/^[A-Z].*$/, 'Description must start with a capital letter'),
    youtubeLink: yup
        .string()
        .url('Invalid YouTube link')
        .required('YouTube link is required'),
    thumbnail: yup
        .mixed()
        .required('Thumbnail is required')
});
var InstructorProfile = function () {
    var navigate = useNavigate();
    var formik = useFormik({
        initialValues: {
            title: '',
            category: categories[0],
            description: '',
            youtubeLink: '',
            thumbnail: null,
        },
        validationSchema: validationSchema,
        onSubmit: function (values) { return __awaiter(void 0, void 0, void 0, function () {
            var formData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        formData.append('title', values.title);
                        formData.append('category', values.category);
                        formData.append('description', values.description);
                        formData.append('youtubeLink', values.youtubeLink);
                        if (values.thumbnail)
                            formData.append('thumbnail', values.thumbnail);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.post('http://localhost:5001/SSABS/instructer/uploadfile', formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    Authorization: "Bearer ".concat(localStorage.getItem('accessToken')), // Include the token in the request headers
                                },
                            })];
                    case 2:
                        _a.sent();
                        alert('Course uploaded successfully!');
                        navigate('/SSABS/content_creater/dashboard');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error uploading course', error_1);
                        alert('Failed to upload course.');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
    });
    return (React.createElement("div", null,
        React.createElement(ContentNav, null),
        React.createElement("div", { style: { width: '80%', margin: '0 auto', fontFamily: 'Arial, sans-serif', textAlign: 'center' } },
            React.createElement("style", null, "\n          @keyframes fadeIn {\n            from { opacity: 0; }\n            to { opacity: 1; }\n          }\n          \n          .fadeIn {\n            animation: fadeIn 2s;\n          }\n\n          @keyframes buttonHover {\n            from { background-color: #007bff; }\n            to { background-color: #0056b3; }\n          }\n\n          button:hover {\n            animation: buttonHover 0.5s forwards;\n          }\n          "),
            React.createElement("h2", { style: { marginTop: '20px', marginBottom: '20px' }, className: "fadeIn" }, "Upload Your Content"),
            React.createElement("form", { onSubmit: formik.handleSubmit, className: "upload-form", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                React.createElement("div", { className: "form-fields", style: { display: 'flex', flexDirection: 'column', textAlign: 'left' } },
                    React.createElement("label", { style: { marginBottom: '5px' } }, "Title"),
                    React.createElement("input", __assign({ type: "text", placeholder: "Title" }, formik.getFieldProps('title'), { style: { marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' } })),
                    formik.touched.title && formik.errors.title ? React.createElement("div", { style: { color: 'red', marginBottom: '10px' } }, formik.errors.title) : null,
                    React.createElement("label", { style: { marginBottom: '5px' } }, "Category"),
                    React.createElement("select", __assign({}, formik.getFieldProps('category'), { style: { marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' } }), categories.map(function (cat) { return (React.createElement("option", { key: cat, value: cat }, cat)); })),
                    formik.touched.category && formik.errors.category ? React.createElement("div", { style: { color: 'red', marginBottom: '10px' } }, formik.errors.category) : null,
                    React.createElement("label", { style: { marginBottom: '5px' } }, "Description"),
                    React.createElement("textarea", __assign({ placeholder: "Description about your course" }, formik.getFieldProps('description'), { style: { marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'none', height: '100px' } })),
                    formik.touched.description && formik.errors.description ? React.createElement("div", { style: { color: 'red', marginBottom: '10px' } }, formik.errors.description) : null,
                    React.createElement("label", { style: { marginBottom: '5px' } }, "Upload Thumbnail"),
                    React.createElement("input", __assign({ placeholder: "Upload Thumbnail" }, formik.getFieldProps('thumbnail'), { type: "file", accept: "image/*", onChange: function (event) {
                            if (event.target.files && event.target.files.length > 0) {
                                formik.setFieldValue('thumbnail', event.target.files[0]);
                            }
                        }, style: { marginBottom: '10px' } })),
                    formik.touched.thumbnail && formik.errors.thumbnail ? React.createElement("div", { style: { color: 'red', marginBottom: '10px' } }, formik.errors.thumbnail) : null,
                    React.createElement("label", { style: { marginBottom: '5px' } }, "YouTube Link"),
                    React.createElement("input", __assign({ type: "text", placeholder: "YouTube Link" }, formik.getFieldProps('youtubeLink'), { style: { marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' } })),
                    formik.touched.youtubeLink && formik.errors.youtubeLink ? React.createElement("div", { style: { color: 'red', marginBottom: '10px' } }, formik.errors.youtubeLink) : null,
                    React.createElement("button", { type: "submit", style: { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' } }, "Upload"))))));
};
export default InstructorProfile;
