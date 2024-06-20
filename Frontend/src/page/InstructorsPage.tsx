import * as React from "react";
import '../CSS/InstructorsPage.css';
import UserNavigation from '../Navigations/userNav';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface User {
    firstname: string;
    lastname: string;
    email: string;
    nic: string;
    phone: string;
    _id: string;
}

const InstructorsPage: React.FC = () => {
    const [instructors, setInstructors] = React.useState<User[]>([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        AOS.init({ duration: 1000 });
        
        const fetchInstructors = async () => {
            try {
                const response = await fetch('http://localhost:5001/allInstructer');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setInstructors(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInstructors();
    }, []);

    const handleCardClick = (id: string) => {
        navigate(`/SSABS/user/userhome/courses/${id}`);
    };

    return (
        <div>
            <UserNavigation />
            <div className="container mt-4">
                <h1 className="text-center mb-4">Our Instructors</h1>
                <div className="row">
                    {instructors.map((instructor: User) => (
                        <div key={instructor._id} className="col-sm-12 col-md-6 col-lg-4 mb-4" data-aos="fade-up">
                            <div className="cardoi  h-100 shadow-sm">
                                <div className="cardoi-body" onClick={() => handleCardClick(instructor._id)}>
                                    <div className="card-avatar mb-3">
                                        <img 
                                            src={`https://ui-avatars.com/api/?name=${instructor.firstname}+${instructor.lastname}`} 
                                            alt={`${instructor.firstname} ${instructor.lastname}`}
                                            className="rounded-circle"
                                        />
                                    </div>
                                    <h5 className="cardoi-title">{instructor.firstname} {instructor.lastname}</h5>
                                    <p className="cardoi-text"><strong>Email:</strong> {instructor.email}</p>
                                    <p className="cardoi-text"><strong>Phone:</strong> {instructor.phone}</p>
                                </div>
                                <div className="cardoi-footer text-center">
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => handleCardClick(instructor._id)}
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default InstructorsPage;
