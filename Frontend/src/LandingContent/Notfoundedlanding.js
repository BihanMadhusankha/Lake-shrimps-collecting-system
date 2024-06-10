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
import React, { useEffect, useState } from 'react';
import landingImg from '../assets/landing.jpg';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../CSS/navCSS.css';
import Aos from 'aos'; // Animation library
import 'aos/dist/aos.css';
var Card = function (_a) {
    var title = _a.title, linkTo = _a.linkTo, image = _a.image;
    return (React.createElement("div", { className: "card m-2 text-center" },
        image && React.createElement("img", { src: image, alt: title, className: "card-img-top" }),
        React.createElement("div", { className: "card-body" },
            React.createElement(Link, { to: linkTo, className: "card-title" }, title))));
};
var ShrimpCategory = function (_a) {
    var title = _a.title, description = _a.description, animation = _a.animation;
    var _b = useState(false), isHovered = _b[0], setIsHovered = _b[1];
    var handleMouseEnter = function () { return setIsHovered(true); };
    var handleMouseLeave = function () { return setIsHovered(false); };
    return (React.createElement("div", { className: "shrimp-category ".concat(isHovered ? animation : ''), onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
        React.createElement("h3", null, title),
        React.createElement("p", null, description),
        React.createElement(Link, { to: "/Notfounded", className: "btn btn-primary" }, "Explore Now")));
};
export default function Notfoundedlanding() {
    var titles = [
        { title: 'Sellers', linkTo: '/Notfounded' },
        { title: 'Vehicale Owners', linkTo: '/Notfounded' },
        { title: 'Content Creators', linkTo: '/Notfounded' },
    ];
    var aboutCompany = "\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec diam euismod, porta lacus at, faucibus orci. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget a libero. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget a libero.\n  ";
    var shrimpCategories = [
        {
            title: 'By Color',
            description: 'Explore shrimp varieties based on their distinctive colors and flavors.',
            animation: 'animate__fadeInLeft', // Add your desired animation class
        },
        {
            title: 'By Size',
            description: 'Find the perfect shrimp size for your culinary creations, from jumbo to small.',
            animation: 'animate__fadeInUp', // Add your desired animation class
        },
        {
            title: 'By Species',
            description: 'Discover the unique characteristics and tastes of different shrimp species.',
            animation: 'animate__fadeInRight', // Add your desired animation class
        },
        {
            title: 'By Preparation',
            description: 'Choose from head-on, peeled & deveined, frozen, or fresh shrimp for convenience.',
            animation: 'animate__bounce', // Add your desired animation class
        },
    ];
    // Initialize animation library on component mount
    useEffect(function () {
        Aos.init();
    }, []);
    return (React.createElement("div", { className: "shrimp-market-landing kerala-theme" },
        React.createElement("section", { className: "hero" },
            React.createElement("div", { id: "carouselExampleSlidesOnly", className: "carousel ", "data-ride": "carousel" },
                React.createElement("div", { className: "carousel-inner  " },
                    React.createElement("div", { className: "carousel-item active vh-100" },
                        React.createElement("img", { className: "vh-100   w-100", src: landingImg, alt: "First slide" }),
                        React.createElement("h1", { className: 'h-tag-container vh-100 opacity-0.7', "data-aos": "zoom-in-up" }, "Welcome to the Sustainable Shrimp Revolution"))))),
        React.createElement("div", { className: 'm-4 d-flex flex-row ', "data-aos": "fade-right" },
            React.createElement("div", { className: 'col-6' },
                React.createElement("section", { className: "about-company" },
                    React.createElement("h2", null, "About Shrimps"),
                    React.createElement("p", { className: ' opacity-0.7' }, aboutCompany),
                    React.createElement("p", { className: ' opacity-0.7' }, aboutCompany))),
            React.createElement("div", { className: 'col-6  ', "data-aos": "fade-left" },
                React.createElement("img", { className: 'w-100', src: landingImg, alt: "About" }))),
        React.createElement("section", { className: "user-categories m-4 " },
            React.createElement("h2", null, "Who is the person you want ?"),
            React.createElement("div", { className: "mt-3 d-flex flex-row justify-content-between mt-2", "data-aos": "fade-up" }, titles.map(function (item) { return (React.createElement(Card, { key: item.title, title: item.title, linkTo: item.linkTo, image: undefined })); }))),
        React.createElement("section", { className: "shrimp-categories" },
            React.createElement("h2", { className: 'm-4 d-flex justify-content-center ' }, "Explore Shrimp Categories"),
            React.createElement("div", { className: "row  ", "data-aos": "zoom-in" },
                React.createElement("div", { className: ' d-flex flex-row justify-content-center' }, shrimpCategories.map(function (category) { return (React.createElement(ShrimpCategory, __assign({ key: category.title }, category))); }))))));
}
