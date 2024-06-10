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
import Aos from 'aos'; // Animation library
import 'aos/dist/aos.css';
var Card = function (_a) {
    var title = _a.title, linkTo = _a.linkTo, image = _a.image;
    return (React.createElement("div", { className: "card m-2 text-center" },
        image && React.createElement("img", { src: image, alt: title, className: "card-img-top", style: { maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' } }),
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
        React.createElement(Link, { to: "/SSABS/user/userhome/byColor", className: "btn btn-primary" }, "Explore Now")));
};
var UsersLanding = function () {
    useEffect(function () {
        Aos.init();
    }, []);
    var titles = [
        { title: 'Sellers', linkTo: '/SSABS/selerPage' },
        { title: 'Content Creators', linkTo: '/SSABS/user/userhome/con.creaters' },
    ];
    var aboutShrimps = "At Shrimp Haven, we are passionate about bringing the best shrimp to the market. Our mission is to connect shrimp lovers and industry professionals with top-quality shrimp, sourced responsibly and delivered with care. Whether you're a buyer looking for the freshest shrimp or a seller aiming to reach a broader audience, Shrimp Haven is your trusted partner in the shrimp industry.";
    var ourStory = "Shrimp Haven was founded with a simple idea: to create a seamless, reliable platform for buying and selling shrimp. Recognizing the challenges faced by both buyers and sellers in the shrimp market, we set out to bridge the gap with a user-friendly, secure, and efficient marketplace. Our team is comprised of seafood enthusiasts, industry experts, and technology professionals dedicated to enhancing your shrimp buying and selling experience.";
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
                    React.createElement("h1", null, "About Shrimps"),
                    React.createElement("h4", null, "Welcome to Shrimp Haven"),
                    React.createElement("p", { className: ' opacity-0.7' }, aboutShrimps),
                    React.createElement("h4", null, "Our Story"),
                    React.createElement("p", { className: ' opacity-0.7' }, ourStory))),
            React.createElement("div", { className: 'col-6  ', "data-aos": "fade-left" },
                React.createElement("img", { className: 'w-100', src: landingImg, alt: "About" }))),
        React.createElement("div", { className: 'm-4 d-flex flex-row ', "data-aos": "fade-right" },
            React.createElement("div", { className: 'col-6  ', "data-aos": "fade-left" },
                React.createElement("img", { className: 'w-100', src: landingImg, alt: "About" })),
            React.createElement("div", { className: 'col-6 ' },
                React.createElement("section", { className: "about-company " },
                    React.createElement(Link, { to: '/SSABS/user/daylyproducts' },
                        React.createElement("div", { className: 'card w-100 ' },
                            React.createElement("h2", null, "Today Products")))))),
        React.createElement("section", { className: "user-categories m-4 " },
            React.createElement("h2", { className: ' m-3' }, "Who is the person you want ?"),
            React.createElement("div", { className: "mt-3 d-flex flex-row justify-content-center mt-2", "data-aos": "fade-up" }, titles.map(function (item, index) { return (React.createElement(Card, { key: index, title: item.title, linkTo: item.linkTo })); }))),
        React.createElement("section", { className: "shrimp-categories" },
            React.createElement("h2", { className: 'm-4 d-flex justify-content-center ' }, "Explore Shrimp Categories"),
            React.createElement("div", { className: "row  ", "data-aos": "zoom-in" },
                React.createElement("div", { className: ' d-flex flex-row justify-content-center' }, shrimpCategories.map(function (category, index) { return (React.createElement(ShrimpCategory, __assign({ key: index }, category))); }))))));
};
export default UsersLanding;
