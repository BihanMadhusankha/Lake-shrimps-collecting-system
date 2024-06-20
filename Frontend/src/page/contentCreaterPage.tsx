import React from 'react'
import UserNavigation from '../Navigations/userNav'
import '../CSS/contentCreaterPage.css'
import Contentimge1 from '../assets/contentpgstudent1.jpg';
import Contentimge2 from '../assets/contendpgstudent2.jpg';
import slidimd1 from '../assets/slidimg1.jpeg';
import slidimd2 from '../assets/slidimg2.jpg';
import slidimd3 from '../assets/slidimg3.jpg';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Advertisment from '../page/classpost'






export default function ContentCreatorPage() {
  return (
    <div>
      <UserNavigation />


      <div className="app">


        <style>
          {
            `.blog-container {
      display: flex;
      justify-content: space-between;
      padding: 20px;
    }
    
    .video-section {
      flex: 1;
      margin-right: 20px;
    }
    
    .youtube-video {
      width: 100%;
      height: 100%;
      aspect-ratio: 16/9;
    }
    
    .description-section {
      flex: 1;
    }
    
    .description-section h2 {
      margin-top: 50px;
      margin-bottom: 30px; 
      font-size: 32px;
      font-weight: bold;
    }
    
    .description-section p {
      font-size: 16px;
      line-height: 1.5;
    }

    `
          }
        </style>


        

          <div className="heropageconten ">

            <div className="bigtitle m-6">
              <h1 className="bigtitle m-6" data-aos="fade-left"  >The best program to Enroll for exchange</h1>
              {/* <button className="btn btn-outline-primary">Find courses →</button> */}
              {/* <Link to={'#'}> <button className="btn btn-outline-warning">Find INSTRUCTORS →</button></Link> */}

             
            </div>

            <div className='heroimg' >

              <div className="intro-images2" data-aos="fade-up"
                data-aos-duration="3000">
                <img src={Contentimge2} alt="hero banner" />
              </div>
              <div className="intro-images" data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="5000">
                <img src={Contentimge1} alt="hero banner" />
              </div>



            </div>



          </div>


        {/* class post here to play */}
        <Advertisment />

        {/* class post here to play */}



        <section className="features">
          <div className="feature1" data-aos="zoom-in">
            <h2>QUALIFIED INSTRUCTORS</h2>
            <p>We have the best knowledge & thought leaders in many fields of study willing to share what they know.</p>
          </div>
          <div className="feature2" data-aos="zoom-in">
            <h2>THOUSANDS OF STUDENTS</h2>
            <p>The only platform in Sri Lanka, connecting thousands of students with the best tutors in the industry.</p>
          </div>
          <div className="feature3" data-aos="zoom-in">
            <h2>100+ COURSES TO SELECT FROM</h2>
            <p>Largest selection of courses with strict quality control. Best place to learn online in Sri Lanka.</p>
          </div>
        </section>



        <section className="instructorsq">

          <div className="allinstructorsimgandwordh">

            <div className="instructor-cardh ">
              <img data-aos="zoom-in" className="instructor-cardh" src={Contentimge2} alt="hero banner" />
            </div>

            <div data-aos="fade-left" className="instructorcwords">
              <h2 className= "inh2eka">INSTRUCTORS</h2>
              <h3>Learn with us</h3>
              <p>Minim veniam nostrud exer citation.</p>
              <p>20K+ Enrolled learners</p>
              <Link to={'/SSABS/user/userhome/FindINSTRUCTORS'}> <button className="btn btn-primary">Find INSTRUCTORS →</button></Link>
            </div>

          </div>

        </section>

        {/* new slids  */}

        <div className="slidimgs">
          <div className="description">
            <p>Shrimp farming, a subset of aquaculture, has emerged as a lucrative and sustainable method for meeting the increasing global demand for shrimp. This practice involves the breeding, raising, and harvesting of shrimp in controlled environments, such as tanks or ponds. Technological advancements have significantly enhanced the efficiency and yield of shrimp farms, making it a profitable venture for many entrepreneurs and businesses.</p>
          </div>
          <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={slidimd1} className="d-block w-100" alt="First slide" />
              </div>
              <div className="carousel-item">
                <img src={slidimd2} className="d-block w-100" alt="Second slide" />
              </div>
              <div className="carousel-item">
                <img src={slidimd3} className="d-block w-100" alt="Third slide" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* new slids  */}



        <section className="coursesbox">
          <h2 className='catagorypooost'>categories to explore when learning about shrimp</h2>
          <div className="course-list1">
            <div className="course-card2">
              <h3 className='topicwordscard1'>Aquaculture and Farming Techniques:</h3>
             
              <p className='dipwordpost1'>Explore the various methods and technologies used in shrimp farming, such as pond culture, recirculating aquaculture systems (RAS), and biofloc technology.</p>
            </div>
            <div className="course-card2">
              <h3 className='topicwordscard1'>Shrimp Species and Biology:</h3>
              <p className='dipwordpost1'>Study the different species of shrimp commonly farmed around the world, such as Pacific white shrimp (Litopenaeus vannamei), black tiger shrimp (Penaeus monodon), and freshwater prawns (Macrobrachium spp.).</p>
            </div>
            <div className="course-card2">
              <h3 className='topicwordscard1'>Market Trends and Economics:</h3>
              <p className='dipwordpost1'>Investigate global trends in shrimp consumption, production, and trade, including key importing and exporting countries. Analyze market dynamics, pricing factors, and demand drivers influencing the shrimp industry, such as consumer preferences, dietary trends, and health considerations.</p>
            </div>
          </div>
          {/* <button className="browse-more-courses">Browse more courses →</button> */}
        </section>




        {/* youtube video here */}

        <div className="blog-container">

          <div className="video-section">
            <iframe
              className="youtube-video"
              src="https://www.youtube.com/embed/1AK_RQ1uaGs"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Video"
            ></iframe>
          </div>

          <div className="description-section">
            <h2>LOREM IPSUM</h2>
            <p>
              America's largest indoor shrimp farm operates with cutting-edge aquaculture technology to produce and sell around 2 million shrimp annually. Utilizing a controlled environment, the farm ensures optimal conditions for shrimp growth, free from the challenges of traditional outdoor farming such as disease, weather fluctuations, and pollutants.                 </p>
            <p>
              This indoor setup includes advanced water filtration systems, precise temperature control, and sustainable practices to maximize shrimp health and yield. The farm's commitment to quality and sustainability has positioned it as a leader in the industry, meeting the growing demand for fresh, locally-sourced shrimp.                </p>
          </div>

        </div>


        {/* youtube video here */}





      </div>

    </div>







  );
}
