import * as React from "react";
import '../CSS/InstructorsPage.css';
import UserNavigation from '../Navigations/userNav';
import {  useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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

            <div className="alldetails">
                <div className="row">
                    {instructors.map((instructor: User) => (
                        <div key={instructor._id} className="col-md-4 mb-4">
                            <div className="card h-100" onClick={() => handleCardClick(instructor._id)}>
                                <div className="card-body">
                                    <h5 className="card-title">{instructor.firstname} {instructor.lastname}</h5>
                                    <p className="card-text"><strong>Email:</strong> {instructor.email}</p>
                                    <p className="card-text"><strong>Phone:</strong> {instructor.phone}</p>
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
