import * as React from 'react';
import '../CSS/Instrctovideo.css';
import slidimd2 from '../assets/slidimg2.jpg';

// Sample course data
const courses = [
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

const CourseList: React.FC = () => {
    return (
        <div className="course-list">
            {courses.map((course, index) => (
                <div key={index} className="course-card">
                    <img src={course.image} alt={course.title} className="course-image" />
                    <div className="course-content">
                        <h2 className="course-title">{course.title}</h2>
                        <p className="course-category">{course.category}</p>
                        <p className="course-price">{course.price}</p>
                        <div className="course-rating">
                            {"★".repeat(course.rating)}
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseList;
