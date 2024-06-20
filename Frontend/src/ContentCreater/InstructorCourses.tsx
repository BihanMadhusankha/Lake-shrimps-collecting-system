import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserNavigation from '../Navigations/userNav';

interface Course {
    title: string;
    description: string;
    youtubeLink: string;
    thumbnail: string;
    _id: string;
    user: string;
}

const InstructorCourses: React.FC = () => {
    const { instructorId } = useParams<{ instructorId: string }>();
    const [courses, setCourses] = React.useState<Course[]>([]);

    React.useEffect(() => {
        const fetchCourses = async () => {
            try {
                console.log(`Fetching courses for instructor ID: ${instructorId}`);
                const response = await axios.get(`http://localhost:5001/instructor/${instructorId}/courses`);
                console.log('Response data:', response.data.data);
                setCourses(response.data.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [instructorId]);

    const containerStyles = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 15px'
    };

    const cardContainerStyles = {
        marginBottom: '30px'
    };

    const cardStyles = {
        position: 'relative' as const,
        overflow: 'hidden' as const,
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const cardHoverStyles = {
        transform: 'scale(1.05)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
    };

    const cardImgStyles = {
        borderRadius: '10px',
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        transition: 'transform 0.3s ease-in-out'
    };

    const cardBodyStyles = {
        textAlign: 'center' as const,
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px'
    };

    const cardTitleStyles = {
        fontWeight: 'bold' as const,
        color: '#333',
        marginTop: '10px'
    };

    const cardTextStyles = {
        color: '#666',
        marginBottom: '20px'
    };

    const cardFooterStyles = {
        backgroundColor: '#f8f9fa',
        borderRadius: '0 0 10px 10px',
        padding: '15px',
        textAlign: 'center' as const,
        marginBottom: '10px' // Added margin bottom to lift the button up
    };

    const buttonStyles = {
        fontSize: '0.9rem',
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        textDecoration: 'none' as const
    };

    return (
        <div>
            <UserNavigation />
            <div style={containerStyles} className="container mt-4">
                <h2 className="text-center mb-4">Courses by Instructor</h2>
                <div className="row">
                    {courses.length === 0 ? (
                        <p className="text-center">No courses found for this instructor.</p>
                    ) : (
                        courses.map((course) => (
                            <div key={course._id} className="col-sm-12 col-md-6 col-lg-4" style={cardContainerStyles}>
                                <div
                                    style={cardStyles}
                                    onMouseEnter={(e) => {
                                        const target = e.currentTarget as HTMLDivElement;
                                        Object.assign(target.style, cardHoverStyles);
                                    }}
                                    onMouseLeave={(e) => {
                                        const target = e.currentTarget as HTMLDivElement;
                                        Object.assign(target.style, cardStyles);
                                    }}
                                >
                                    <img src={course.thumbnail} alt={course.title} style={cardImgStyles} />
                                    <div style={cardBodyStyles}>
                                        <h5 style={cardTitleStyles}>{course.title}</h5>
                                        <p style={cardTextStyles}>{course.description}</p>
                                    </div>
                                    <div style={cardFooterStyles}>
                                        <a href={course.youtubeLink} style={buttonStyles}>Watch on YouTube</a>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstructorCourses;
