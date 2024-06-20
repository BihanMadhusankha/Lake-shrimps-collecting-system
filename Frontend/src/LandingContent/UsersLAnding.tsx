import React, { useEffect, useState } from 'react';
import landingImg from '../assets/landing.jpg';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Aos from 'aos'; // Animation library
import 'aos/dist/aos.css';

interface CardProps {
  title: string;
  linkTo: string;
  image?: string;
}

const cardStyle: React.CSSProperties = {
  margin: '10px',
  padding: '15px',
  textAlign: 'center',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
};

const imgStyle: React.CSSProperties = {
  maxHeight: '100%',
  maxWidth: '100%',
  objectFit: 'cover',
};

const Card: React.FC<CardProps> = ({ title, linkTo, image }) => {
  return (
    <div className="card m-2 text-center" style={cardStyle}>
      {image && <img src={image} alt={title} className="card-img-top" style={imgStyle} />}
      <div className="card-body">
        <Link to={linkTo} className="card-title">{title}</Link>
      </div>
    </div>
  );
};

interface ShrimpCategoryProps {
  title: string;
  description: string;
  animation: string;
}

const shrimpCategoryStyle: React.CSSProperties = {
  margin: '20px',
  padding: '20px',
  textAlign: 'center',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
};

const ShrimpCategory: React.FC<ShrimpCategoryProps> = ({ title, description, animation }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const categoryStyle: React.CSSProperties = {
    ...shrimpCategoryStyle,
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isHovered ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 0 10px rgba(0,0,0,0.1)',
  };

  return (
    <div
      className={`shrimp-category ${isHovered ? animation : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={categoryStyle}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to="/SSABS/user/userhome/byColor" className="btn btn-primary">Explore Now</Link>
    </div>
  );
};

const UsersLanding: React.FC = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  const titles = [
    { title: 'Sellers', linkTo: '/SSABS/selerPage' },
    { title: 'Content Creators', linkTo: '/SSABS/user/userhome/con.creaters' },
  ];

  const aboutShrimps = `At Shrimp Haven, we are passionate about bringing the best shrimp to the market. Our mission is to connect shrimp lovers and industry professionals with top-quality shrimp, sourced responsibly and delivered with care. Whether you're a buyer looking for the freshest shrimp or a seller aiming to reach a broader audience, Shrimp Haven is your trusted partner in the shrimp industry.`;

  const ourStory = `Shrimp Haven was founded with a simple idea: to create a seamless, reliable platform for buying and selling shrimp. Recognizing the challenges faced by both buyers and sellers in the shrimp market, we set out to bridge the gap with a user-friendly, secure, and efficient marketplace. Our team is comprised of seafood enthusiasts, industry experts, and technology professionals dedicated to enhancing your shrimp buying and selling experience.`;

  const shrimpCategories = [
    {
      title: 'By Color',
      description: 'Explore shrimp varieties based on their distinctive colors and flavors.',
      animation: 'animate__fadeInLeft', // Add your desired animation class
    },
    {
      title: 'By Size',
      description: 'Find the perfect shrimp size for your culinary creations, from jumbo to small.',
      animation: 'animate__fadeInUp', // Add your desired animation class
    },
    {
      title: 'By Species',
      description: 'Discover the unique characteristics and tastes of different shrimp species.',
      animation: 'animate__fadeInRight', // Add your desired animation class
    },
    {
      title: 'By Preparation',
      description: 'Choose from head-on, peeled & deveined, frozen, or fresh shrimp for convenience.',
      animation: 'animate__bounce', // Add your desired animation class
    },
  ];

  return (
    <div className="shrimp-market-landing kerala-theme">
      {/* Hero section with carousel or video */}
      <section className="hero">
        <div id="carouselExampleSlidesOnly" className="carousel" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active vh-100">
              <img className="vh-100 w-100" src={landingImg} alt="First slide" />
              <h1 className="h-tag-container vh-100 opacity-0.7" >Welcome to the Sustainable Shrimp Revolution</h1>
            </div>
          </div>
        </div>
      </section>

      <div className="m-4 d-flex flex-row" data-aos="fade-right">
        <div className="col-6">
          <section className="about-company">
            <h1>About Shrimps</h1>
            <h4>Welcome to Shrimp Haven</h4>
            <p style={{ opacity: 0.7 }}>{aboutShrimps}</p>

            <h4>Our Story</h4>
            <p style={{ opacity: 0.7 }}>{ourStory}</p>
          </section>
        </div>

        <div className="col-6" data-aos="fade-left">
          <img className="w-100" src={landingImg} alt="About" />
        </div>
      </div>

      <div className="m-4 d-flex flex-row" data-aos="fade-right">
        <div className="col-6" data-aos="fade-left">
          <img className="w-100" src={landingImg} alt="About" />
        </div>
        <div className="col-6">
          <section className="about-company">
            <Link to={'/SSABS/user/daylyproducts'}>
              <div className="card w-100">
                <h2>Today's Products</h2>
              </div>
            </Link>
          </section>
        </div>
      </div>

      <section className="user-categories m-4">
        <h2 className="m-3">Who is the person you want?</h2>
        <div className="mt-3 d-flex flex-row justify-content-center" data-aos="fade-up">
          {titles.map((item, index) => (
            <Card key={index} title={item.title} linkTo={item.linkTo} />
          ))}
        </div>
      </section>

      <section className="shrimp-categories">
        <h2 className="m-4 d-flex justify-content-center">Explore Shrimp Categories</h2>
        <div className="row" data-aos="zoom-in">
          <div className="d-flex flex-row justify-content-center">
            {shrimpCategories.map((category, index) => (
              <ShrimpCategory key={index} {...category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UsersLanding;
