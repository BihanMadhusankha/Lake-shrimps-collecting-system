import React from 'react'
import homeImg from '../assets/home.jpg';

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
    <div className='mt-3'>
    <h4>Seler</h4>
        <h4>Content Creaters</h4>
        <h4>Vehicale Owners</h4>
    </div>
        

</div>

    </div>
  )
}
