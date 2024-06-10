import React, { useEffect, useRef } from 'react';
import '../CSS/classpost.css';
import ad1 from '../assets/ad1/ad1.png';
import ad2 from '../assets/ad2.png';
import ad3 from '../assets/ad3.png';
import ad4 from '../assets/ad4.png';
import ad5 from '../assets/ad5.png';
import ad6 from '../assets/ad6.png';
import ad7 from '../assets/ad7.png';
import ad8 from '../assets/ad8.png';
import ad9 from '../assets/ad9.png';
var images = [
    { src: ad1, alt: 'School Master', to: 'https://dinapalagroup.lk/product-category/weekly-deals/?sld=203' },
    { src: ad2, alt: 'SLTC', to: 'https://dinapalagroup.lk/product-category/weekly-deals/?sld=203' },
    { src: ad3, alt: 'SLTC', to: 'https://dinapalagroup.lk/product-category/weekly-deals/?sld=203' },
    { src: ad4, alt: 'SLTC', to: 'https://dinapalagroup.lk/product-category/weekly-deals/?sld=203' },
    { src: ad5, alt: 'SLTC', to: 'https://dinapalagroup.lk/product-category/weekly-deals/?sld=203' },
    { src: ad6, alt: 'SLTC', to: 'https://dinapalagroup.lk/product-category/weekly-deals/?sld=203' },
    { src: ad7, alt: 'SLTC', to: 'https://dinapalagroup.lk/product-category/weekly-deals/?sld=203' },
    { src: ad8, alt: 'SLTC', to: 'https://dinapalagroup.lk/product-category/weekly-deals/?sld=203' },
    { src: ad9, alt: 'SLTC', to: 'https://dinapalagroup.lk/product-category/weekly-deals/?sld=203' },
];
var Carousel = function () {
    var carouselRef = useRef(null);
    useEffect(function () {
        var interval = setInterval(function () {
            if (carouselRef.current) {
                var firstChild = carouselRef.current.firstElementChild;
                if (firstChild) {
                    carouselRef.current.appendChild(firstChild);
                }
            }
        }, 120000); // Change image every 2 seconds
        return function () { return clearInterval(interval); };
    }, []);
    return (React.createElement("div", { className: "carouselimgsplay" },
        React.createElement("div", { className: "onebyoneimgs", ref: carouselRef }, images.map(function (image, index) { return (React.createElement("a", { href: image.to },
            React.createElement("img", { key: index, src: image.src, alt: image.alt }))); }))));
};
export default Carousel;
