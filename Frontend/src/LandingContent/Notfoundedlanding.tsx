import React, { useEffect, useState } from 'react'
import landingImg from '../assets/landing.jpg';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../CSS/navCSS.css'
import Aos from 'aos'; 
import 'aos/dist/aos.css';

const Card = ({ title, linkTo, image }: { title: string; linkTo: string; image: string | undefined }) => {
  return (
    <div className="card m-2 text-center">
      {image && <img src={image} alt={title} className="card-img-top" />}
      <div className="card-body">
        <Link to={linkTo} className="card-title">{title}</Link>
      </div>
    </div>
  );
};

const ShrimpCategory = ({ title, description, animation }: { title: string; description: string; animation: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className={`shrimp-category ${isHovered ? animation : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to="/Notfounded" className="btn btn-primary">Explore Now</Link>
    </div>
  );
};

export default function Notfoundedlanding() {
  const titles = [
    { title: 'Sellers', linkTo: '/Notfounded' },
    { title: 'Vehicale Owners', linkTo: '/Notfounded' },
    { title: 'Content Creators', linkTo: '/Notfounded' },

  ];

  const aboutCompany = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec diam euismod, porta lacus at, faucibus orci. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget a libero. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget a libero.
  `;

  const shrimpCategories = [
    {
      title: 'By Color',
      description: 'Explore shrimp varieties based on their distinctive colors and flavors.',
      animation: 'animate__fadeInLeft', 
    },
    {
      title: 'By Size',
      description: 'Find the perfect shrimp size for your culinary creations, from jumbo to small.',
      animation: 'animate__fadeInUp', 
    },
    {
      title: 'By Species',
      description: 'Discover the unique characteristics and tastes of different shrimp species.',
      animation: 'animate__fadeInRight', 
    },
    {
      title: 'By Preparation',
      description: 'Choose from head-on, peeled & deveined, frozen, or fresh shrimp for convenience.',
      animation: 'animate__bounce', 
    },
  ];

  useEffect(() => {
    Aos.init();
  }, []);

  return (

    <div className="shrimp-market-landing kerala-theme">
      <section className="hero">
        <div id="carouselExampleSlidesOnly" className="carousel " data-ride="carousel">
          <div className="carousel-inner  ">
            <div className="carousel-item active vh-100">
              <img className="vh-100   w-100" src={landingImg} alt="First slide" />
              <h1 className='h-tag-container vh-100 opacity-0.7' data-aos="zoom-in-up">Welcome to the Sustainable Shrimp Revolution</h1>
            </div>
          </div>
        </div>
      </section>

      <div className='m-4 d-flex flex-row ' data-aos="fade-right">
        <div className='col-6'>
          <section className="about-company">
            <h2>About Shrimps</h2>
            <p className=' opacity-0.7'>{aboutCompany}</p>
            <p className=' opacity-0.7'>{aboutCompany}</p>
          </section>
        </div>

        <div className='col-6  ' data-aos="fade-left">
          <img className='w-100' src={landingImg} alt="About" />
        </div>


      </div>

      <section className="user-categories m-4 ">
        <h2 >Who is the person you want ?</h2>
        <div className="mt-3 d-flex flex-row justify-content-between mt-2" data-aos="fade-up">
          {titles.map((item) => (
            <Card key={item.title} title={item.title} linkTo={item.linkTo} image={undefined} />
          ))}
        </div>
      </section>

      <section className="shrimp-categories">
        <h2 className='m-4 d-flex justify-content-center '>Explore Shrimp Categories</h2>
        <div className="row  " data-aos="zoom-in">
          <div className=' d-flex flex-row justify-content-center'>
            {shrimpCategories.map((category) => (
              <ShrimpCategory key={category.title} {...category} />
            ))}
          </div>

        </div>
      </section>



    </div>
  )
}
