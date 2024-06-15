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
    user:string;
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

    return (
        <div>
            <UserNavigation/>
            <h2 className='d-flex justify-content-center mt-4'>Courses by Instructor</h2>
            <div className="row">
                {courses.length === 0 ? (
                    <p>No courses found for this instructor.</p>
                ) : (
                    courses.map((course) => (
                        <div key={course._id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img src={course.thumbnail} className="card-img-top" alt={course.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{course.title}</h5>
                                    <p className="card-text">{course.description}</p>
                                    <a href={course.youtubeLink} className="btn btn-primary">Watch on YouTube</a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default InstructorCourses;
