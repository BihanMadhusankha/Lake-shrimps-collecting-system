import * as React from 'react';
import homeImg from '../assets/home.jpg';
import Navigation from './nav';
// import Lakes from './lakes';


function Landing() {
    return (
        <div>
            <Navigation />
            <div className='container'>
                <div className="row">
                    <div className="col-6 mt-5">
                        <img src={homeImg} className="img-fluid" alt="..." />
                    </div>
                    <div className="col-6 mt-5 ">
                        <h1 className='justify-content-center text-center'>About Company</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Commodi explicabo quia omnis, aperiam labore consequuntur,
                            id dolor odio itaque praesentium minus tempora voluptas
                            molestias enim doloremque provident reiciendis natus veritatis.

                        </p>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Commodi explicabo quia omnis, aperiam labore consequuntur,
                            id dolor odio itaque praesentium minus tempora voluptas
                            molestias enim doloremque provident reiciendis natus veritatis.

                        </p>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Commodi explicabo quia omnis, aperiam labore consequuntur,
                            id dolor odio itaque praesentium minus tempora voluptas
                            molestias enim doloremque provident reiciendis natus veritatis.

                        </p>

                    </div>
                </div>
            </div>
            {/* <Lakes/> */}
        </div>

    )
}
export default Landing;