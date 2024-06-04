import * as React from "react";
import '../CSS/InstructorsPage.css'
import UserNavigation from '../Navigations/userNav'
import Contentimge1 from '../assets/contentpgstudent1.jpg';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function InstructorsPage() {
    return (
        <div>
            <UserNavigation />
            <div className="alldetails">

                <div className="instructorPhoto">
                <img src={Contentimge1} alt="insructorPhoto" />
                </div>


                <div className="instructorName">DUNITH WELLALAGE</div>

                <div className="instrutorDetails">
                    Finance Management | Financial Reporting | Process Review
                    <br /> & Development | Advanced Excel Trainer | Microsoft
                    Office |<br /> Data Base Management | MIS | Build
                    Reporting Modules | <br />
                    System Analyzing & Quality Assurance
                </div>

                <div className="clikbutton">
               
                <Link to={'/SSABS/user/userhome/courses'}>  <button className="browse-more-courses ">courses →</button></Link>
            
                </div>

            </div>

        </div>
    );



}










