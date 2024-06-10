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
import ContentNav from './contentNav';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
var UploadedContent = function () {
    var _a = useState([]), courses = _a[0], setCourses = _a[1];
    var _b = useState(null), error = _b[0], setError = _b[1];
    var _c = useState(null), updatingCourseId = _c[0], setUpdatingCourseId = _c[1];
    var _d = useState(null), updatedCourse = _d[0], setUpdatedCourse = _d[1];
    var _e = useState(''), searchQuery = _e[0], setSearchQuery = _e[1];
    useEffect(function () {
        var fetchCourses = function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = localStorage.getItem('accessToken');
                        if (!token) {
                            setError('No access token found. Please log in.');
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.get('http://localhost:5001/SSABS/contentcreater/uploadedpost', {
                                headers: {
                                    'Authorization': "Bearer ".concat(token)
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        setCourses(response.data);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        setError('Error fetching courses');
                        console.error('Error fetching courses', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchCourses();
    }, []);
    var handleDelete = function (courseId) { return __awaiter(void 0, void 0, void 0, function () {
        var token, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = localStorage.getItem('accessToken');
                    if (!token) {
                        setError('No access token found. Please log in.');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.delete("http://localhost:5001/SSABS/contentcreater/uploadedpost/".concat(courseId), {
                            headers: {
                                'Authorization': "Bearer ".concat(token)
                            }
                        })];
                case 2:
                    _a.sent();
                    setCourses(courses.filter(function (course) { return course._id !== courseId; }));
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error deleting course', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleUpdate = function (courseId) {
        var courseToUpdate = courses.find(function (course) { return course._id === courseId; });
        if (courseToUpdate) {
            setUpdatingCourseId(courseId);
            setUpdatedCourse(courseToUpdate);
        }
    };
    var handleChange = function (e) {
        var _a;
        if (updatedCourse) {
            setUpdatedCourse(__assign(__assign({}, updatedCourse), (_a = {}, _a[e.target.name] = e.target.value, _a)));
        }
    };
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!updatedCourse) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    token = localStorage.getItem('accessToken');
                    if (!token) {
                        setError('No access token found. Please log in.');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, axios.put("http://localhost:5001/SSABS/contentcreater/uploadedpost/".concat(updatingCourseId), updatedCourse, {
                            headers: {
                                'Authorization': "Bearer ".concat(token)
                            }
                        })];
                case 2:
                    _a.sent();
                    setCourses(courses.map(function (course) {
                        if (course._id === updatingCourseId) {
                            return updatedCourse;
                        }
                        return course;
                    }));
                    setUpdatingCourseId(null);
                    setUpdatedCourse(null);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error updating course', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var downloadPDF = function () { return __awaiter(void 0, void 0, void 0, function () {
        var input, actions, thumbnails, canvas, imgData, pdf, imgProps, pdfWidth, pdfHeight;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = document.getElementById('table-to-pdf');
                    if (!input) return [3 /*break*/, 2];
                    actions = document.querySelectorAll('.actions');
                    thumbnails = document.querySelectorAll('.thumbnail');
                    actions.forEach(function (el) { return el.style.display = 'none'; });
                    thumbnails.forEach(function (el) { return el.style.display = 'none'; });
                    return [4 /*yield*/, html2canvas(input)];
                case 1:
                    canvas = _a.sent();
                    imgData = canvas.toDataURL('image/png');
                    pdf = new jsPDF();
                    imgProps = pdf.getImageProperties(imgData);
                    pdfWidth = pdf.internal.pageSize.getWidth();
                    pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('courses.pdf');
                    // Show columns again
                    actions.forEach(function (el) { return el.style.display = 'table-cell'; });
                    thumbnails.forEach(function (el) { return el.style.display = 'table-cell'; });
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var handleSearchChange = function (e) {
        setSearchQuery(e.target.value);
    };
    var filteredCourses = courses.filter(function (course) {
        return course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
    return (React.createElement("div", null,
        React.createElement(ContentNav, null),
        React.createElement("div", { style: { padding: '20px' } },
            React.createElement("h2", null, "My Courses"),
            React.createElement("input", { type: "text", placeholder: "Search courses...", value: searchQuery, onChange: handleSearchChange, style: searchInputStyle }),
            React.createElement("button", { onClick: downloadPDF, style: downloadButtonStyle }, "Download PDF"),
            error ? React.createElement("p", { style: { color: 'red' } }, error) : (React.createElement("table", { id: "table-to-pdf", style: { width: '100%', borderCollapse: 'collapse' } },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", { style: tableHeaderStyle }, "Title"),
                        React.createElement("th", { style: tableHeaderStyle }, "Category"),
                        React.createElement("th", { style: tableHeaderStyle }, "Description"),
                        React.createElement("th", { style: tableHeaderStyle, className: "thumbnail" }, "Thumbnail"),
                        React.createElement("th", { style: tableHeaderStyle }, "YouTube Link"),
                        React.createElement("th", { style: tableHeaderStyle, className: "actions" }, "Actions"))),
                React.createElement("tbody", null, filteredCourses.map(function (course) { return (React.createElement("tr", { key: course._id },
                    React.createElement("td", { style: tableCellStyle }, course.title),
                    React.createElement("td", { style: tableCellStyle }, course.category),
                    React.createElement("td", { style: tableCellStyle }, course.description),
                    React.createElement("td", { style: tableCellStyle, className: "thumbnail" },
                        React.createElement("img", { src: course.thumbnail, alt: course.title, style: { width: '100px' } })),
                    React.createElement("td", { style: tableCellStyle },
                        React.createElement("a", { href: course.youtubeLink, target: "_blank", rel: "noopener noreferrer" }, "Watch on YouTube")),
                    React.createElement("td", { style: tableCellStyle, className: "actions" }, updatingCourseId === course._id ? (React.createElement(React.Fragment, null,
                        React.createElement("input", { type: "text", name: "title", value: updatedCourse === null || updatedCourse === void 0 ? void 0 : updatedCourse.title, onChange: handleChange, style: inputStyle }),
                        React.createElement("input", { type: "text", name: "category", value: updatedCourse === null || updatedCourse === void 0 ? void 0 : updatedCourse.category, onChange: handleChange, style: inputStyle }),
                        React.createElement("input", { type: "text", name: "description", value: updatedCourse === null || updatedCourse === void 0 ? void 0 : updatedCourse.description, onChange: handleChange, style: inputStyle }),
                        React.createElement("input", { type: "text", name: "youtubeLink", value: updatedCourse === null || updatedCourse === void 0 ? void 0 : updatedCourse.youtubeLink, onChange: handleChange, style: inputStyle }),
                        React.createElement("button", { style: submitButtonStyle, onClick: handleSubmit }, "Submit"))) : (React.createElement(React.Fragment, null,
                        React.createElement("button", { style: updateButtonStyle, onClick: function () { return handleUpdate(course._id); } }, "Update"),
                        React.createElement("button", { style: deleteButtonStyle, onClick: function () { return handleDelete(course._id); } }, "Delete")))))); })))))));
};
export default UploadedContent;
var tableHeaderStyle = {
    padding: '8px',
    backgroundColor: '#f2f2f2',
    border: '1px solid #ddd'
};
var tableCellStyle = {
    padding: '8px',
    border: '1px solid #ddd'
};
var updateButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '5px'
};
var deleteButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    cursor: 'pointer'
};
var submitButtonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '5px'
};
var inputStyle = {
    padding: '5px',
    marginBottom: '5px',
    width: '100%'
};
var downloadButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px'
};
var searchInputStyle = {
    padding: '8px',
    marginBottom: '20px',
    width: '100%',
    boxSizing: 'border-box'
};
