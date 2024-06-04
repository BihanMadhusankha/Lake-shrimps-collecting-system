import * as React from "react";
import '../CSS/InstructorsPage.css'
import UserNavigation from '../Navigations/userNav'
import Contentimge1 from '../assets/contentpgstudent1.jpg';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Instructer {
    firstname: string;
    lastname: string;
    email: string;
    nic: string;
    phone: string;
    _id: string;
}
export default function InstructorsPage() {
    const [instructer, setInstructer] = React.useState<Instructer[]>([]);

    React.useEffect(() => {
        const fetchInstructer = async () => {
            try {
                const response = await fetch('http://localhost:5001/SSABS/allInstructer');
                console.log(response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setInstructer(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInstructer();
    }, []);
    return (
        <div>
            <UserNavigation />

            <div className="alldetails">

                <div className="instructorPhoto">
                    <img src={Contentimge1} alt="insructorPhoto" />
                </div>

                {instructer.map((instructer: Instructer) => (
                    <div key={instructer._id} className="instructorDetails">

                        <div className="instructorName">{instructer.firstname}</div>

                        {/* <div className="instrutorDetails">
                            Finance Management | Financial Reporting | Process Review
                            <br /> & Development | Advanced Excel Trainer | Microsoft
                            Office |<br /> Data Base Management | MIS | Build
                            Reporting Modules | <br />
                            System Analyzing & Quality Assurance
                        </div> */}
                        <div className="instructorEmail">{instructer.email}</div>
                        <div className="instructorEmail">{instructer.phone}</div>
                    </div>
                ))}
                <div className="clikbutton">

                    <Link to={'/SSABS/user/userhome/courses'}>  <button className="browse-more-courses ">courses →</button></Link>

                </div>

            </div>

        </div>
    );



}










