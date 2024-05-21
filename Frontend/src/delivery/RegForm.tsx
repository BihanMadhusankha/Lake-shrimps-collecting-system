import React from 'react';
import PrawnImage from './../assets/prawn.jpg';



const RegForm: React.FC = () => {
  return (

    <div className="background">
            <img src={PrawnImage} alt="Image" className="Image-container" style={{ width: '50%', height: 'auto' }} />
    <div className="container">
      <div className="form-wrapper">
        <h2 className="title">Vehicle Register Form</h2>
        <form className="form">

          <input type="text" placeholder="Owner Name" className="input" />
          <input type="text" placeholder="Vehicle Model" className="input" />
          <input type="text" placeholder="Vehicle Make" className="input" />
          <input type="year" placeholder="Vehicle Year" className="input" />
          <input type="text" placeholder="License Plate" className="input" />
          <input type="date" placeholder="Registration Date" className="input" />
          <button type="button" className="button">Register</button>
          
        </form>
      </div>
    </div>
    </div>
  );
};

export default RegForm;