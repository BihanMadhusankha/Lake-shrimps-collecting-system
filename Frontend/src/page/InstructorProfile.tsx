// src/App.tsx
import React, { useState, useEffect } from 'react';
import '../CSS/InstructorProfile.css'
import { Link } from 'react-router-dom';
import UserNavigation from '../Navigations/userNav'

interface Lesson {
  id: number;
  title: string;
  imageUrl: string;
  lessonCount: number;
  price: string;
}

const InstructorProfile: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const data: Lesson[] = [
        { id: 1, title: 'Lesson 1', imageUrl: 'https://via.placeholder.com/150', lessonCount: 9, price: 'FREE NOW' },
        { id: 2, title: 'Lesson 2', imageUrl: 'https://via.placeholder.com/150', lessonCount: 9, price: 'FREE NOW' },
        { id: 3, title: 'Lesson 3', imageUrl: 'https://via.placeholder.com/150', lessonCount: 9, price: 'FREE NOW' },
      ];
      setLessons(data);
    };

    fetchLessons();
  }, []);

  return (

    <div className='alldetailsinstructorprofile'>
    <UserNavigation />
    
    <div className="container">



      
      <header className="header">
        <div className="header-photo"></div>
        <div className="header-info">

          <p className="header-description">
            Finance Management | Financial Reporting | Process Review & Development | Advanced Excel Trainer | Microsoft Office | Data Base Management | MIS | Build Reporting Modules | System Analyzing & Quality Assurance
          </p>
        <button className="instructors-button">VIEW ALL INSTRUCTORS</button>
        </div>
      </header>


      <div className="lessons">
        <h2>LESSONS</h2>
        {lessons.map(lesson => (
          <div key={lesson.id} className="lesson-card">
            <img src={lesson.imageUrl} alt={lesson.title} className="lesson-photo" />
            <div className="lesson-info">
              <h3>{lesson.title}</h3>
              <div className="lesson-details">
                <span>{lesson.lessonCount} LESSON</span>
                <span>{lesson.price}</span>
                
                <Link to={'/SSABS/user/userhome/video'}> <button className="visit-course-button">VISIT COURSE</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default InstructorProfile;


