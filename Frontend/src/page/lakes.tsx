// // Lakes.tsx
// import  { useState, useEffect } from 'react';
// import home from '../assets/react.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import * as React from 'react';


// interface Boat {
//     boatid: number;
//     lakename: string;
//     BON: string;
//     BOID: string;
//     boattypes: string;
// }

// function Lakes() {
//     const [boats, setBoats] = useState<Boat[]>([]);

//     useEffect(() => {
//         const fetchBoats = async () => {
//             try {
//                 const response = await fetch('http://localhost:5001/Customer');
//                 console.log(response)
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 console.log(data)
//                 setBoats(data.data);
//             } catch (error) {
                
//                 console.error('Error fetching data:', error);
//             }
//         };
//         fetchBoats();
//     }, []);

//     return (
//         <div className="container bg-black rounded-5 p-5  mt-lg-5  ">
//             <div className="row justify-content-center">
//                 <h1 className=' text-light fw-semibold '>The Lakes</h1>
//                 {boats.map((boat: Boat) => (
//                     <div className="card bg-gray m-lg-3 rounded-3   col-lg-3 d-flex flex-row " key={boat.boatid}>
//                         <div className="card-body ">
//                             <img src={home} className="img-fluid" alt="..." />
//                             <h5>Boat ID: {boat.boatid}</h5>
//                             <h5>Lake Name: {boat.lakename}</h5>
//                             <h5>Boat Type: {boat.boattypes}</h5>
//                             <h5>Boat Owner ID: {boat.BOID}</h5>
//                             <h5>Boat Owner Name: {boat.BON}</h5>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Lakes;
