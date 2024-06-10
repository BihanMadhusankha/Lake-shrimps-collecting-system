import * as React from 'react';
import '../CSS/Instrctovideo.css';
// import slidimd2 from '../assets/slidimg2.jpg';
// Sample course data
var courses = [
    {
        title: "Advanced Microsoft Excel With AI: Training & Building Excel Modules : Batch 08 [LIVE]",
        category: "In Accounting",
        price: "LKR 13,500.00",
        rating: 5,
        image: '../asset/slidimg2.jpg'
    },
    {
        title: "Spoken Chinese For Beginners In Sinhala | ඕනෑම අයෙකුට",
        category: "In Chinese",
        price: "LKR 9,900.00",
        rating: 5,
        image: "path/to/image2.jpg"
    },
    {
        title: "Think And Grow Rich: The Legacy | සාර්ථකත්වයට හිම මව්ම ඇඹරූ නව පියවර",
        category: "In Teens",
        price: "LKR 990.00",
        rating: 5,
        image: "path/to/image3.jpg"
    },
    {
        title: "Introduction To Linux In Sinhala | Linux සඳහා පිළිසඳර",
        category: "In Linux",
        price: "LKR 990.00",
        rating: 5,
        image: "path/to/image4.jpg"
    },
    {
        title: "Basic Microsoft Excel",
        category: "In Microsoft Excel",
        price: "LKR 2,000.00",
        rating: 5,
        image: "path/to/image5.jpg"
    },
    {
        title: "Responsive Web Developing With CSS (In Sinhala)",
        category: "In CSS",
        price: "LKR 2,250.00",
        rating: 5,
        image: "path/to/image6.jpg"
    },
];
var CourseList = function () {
    return (React.createElement("div", { className: "course-list" }, courses.map(function (course, index) { return (React.createElement("div", { key: index, className: "course-card" },
        React.createElement("img", { src: course.image, alt: course.title, className: "course-image" }),
        React.createElement("div", { className: "course-content" },
            React.createElement("h2", { className: "course-title" }, course.title),
            React.createElement("p", { className: "course-category" }, course.category),
            React.createElement("p", { className: "course-price" }, course.price),
            React.createElement("div", { className: "course-rating" }, "★".repeat(course.rating))))); })));
};
export default CourseList;
