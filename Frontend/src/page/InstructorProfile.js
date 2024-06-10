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
// src/App.tsx
import React, { useState, useEffect } from 'react';
import '../CSS/InstructorProfile.css';
import { Link } from 'react-router-dom';
import UserNavigation from '../Navigations/userNav';
var InstructorProfile = function () {
    var _a = useState([]), lessons = _a[0], setLessons = _a[1];
    useEffect(function () {
        var fetchLessons = function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = [
                    { id: 1, title: 'Lesson 1', imageUrl: 'https://via.placeholder.com/150', lessonCount: 9, price: 'FREE NOW' },
                    { id: 2, title: 'Lesson 2', imageUrl: 'https://via.placeholder.com/150', lessonCount: 9, price: 'FREE NOW' },
                    { id: 3, title: 'Lesson 3', imageUrl: 'https://via.placeholder.com/150', lessonCount: 9, price: 'FREE NOW' },
                ];
                setLessons(data);
                return [2 /*return*/];
            });
        }); };
        fetchLessons();
    }, []);
    return (React.createElement("div", { className: 'alldetailsinstructorprofile' },
        React.createElement(UserNavigation, null),
        React.createElement("div", { className: "container" },
            React.createElement("header", { className: "header" },
                React.createElement("div", { className: "header-photo" }),
                React.createElement("div", { className: "header-info" },
                    React.createElement("p", { className: "header-description" }, "Finance Management | Financial Reporting | Process Review & Development | Advanced Excel Trainer | Microsoft Office | Data Base Management | MIS | Build Reporting Modules | System Analyzing & Quality Assurance"),
                    React.createElement("button", { className: "instructors-button" }, "VIEW ALL INSTRUCTORS"))),
            React.createElement("div", { className: "lessons" },
                React.createElement("h2", null, "LESSONS"),
                lessons.map(function (lesson) { return (React.createElement("div", { key: lesson.id, className: "lesson-card" },
                    React.createElement("img", { src: lesson.imageUrl, alt: lesson.title, className: "lesson-photo" }),
                    React.createElement("div", { className: "lesson-info" },
                        React.createElement("h3", null, lesson.title),
                        React.createElement("div", { className: "lesson-details" },
                            React.createElement("span", null,
                                lesson.lessonCount,
                                " LESSON"),
                            React.createElement("span", null, lesson.price),
                            React.createElement(Link, { to: '/SSABS/user/userhome/video' },
                                " ",
                                React.createElement("button", { className: "visit-course-button" }, "VISIT COURSE")))))); })))));
};
export default InstructorProfile;
