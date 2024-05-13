import React from 'react'
import homeImg from '../assets/home.jpg';
import { Link } from 'react-router-dom';

export default function UsersLAnding() {
  return (
    <div>
      <div className='landing container'>
        <div className="row">
          <div className="col-6 mt-5">
            <img src={homeImg} className="img-fluid" alt="..." />
          </div>
          <div className="col-6 mt-5">
            {/* <h1 className='justify-content-center text-center'>About Company</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi explicabo quia omnis, aperiam labore consequuntur, id dolor odio itaque praesentium minus tempora voluptas molestias enim doloremque provident reiciendis natus veritatis.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi explicabo quia omnis, aperiam labore consequuntur, id dolor odio itaque praesentium minus tempora voluptas molestias enim doloremque provident reiciendis natus veritatis.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi explicabo quia omnis, aperiam labore consequuntur, id dolor odio itaque praesentium minus tempora voluptas molestias enim doloremque provident reiciendis natus veritatis.</p> */}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h1 className='d-flex justify-content-center'>Users Category</h1>
        <div className='mt-3 d-flex flex-row justify-content-between mt-5    '>
         
            <div className='cardT card col-3 '>
              <div className="card-body d-flex justify-content-center">
                <h4 className="card-title"></h4>
                <Link to={'/SSABS/user/userhome/selerPage'}><h4 className="card-title">Sellers</h4></Link>
              </div>
            </div>
          
            <div className='cardT card col-3 '>
              <div className="card-body d-flex   justify-content-center">
              <Link to={'/SSABS/user/userhome/vehicaleowner'}><h4 className="card-title">Vehicale Owners</h4></Link>
              </div>
            </div>
          
          
            <div className='cardT card col-3 '>
              <div className="card-body d-flex justify-content-center">
                <Link to={'/SSABS/user/userhome/con.creaters'}><h4 className="card-title">Content Creaters</h4></Link>
              </div>
            </div>
          

        </div>


      </div>

    </div>
  )
}
