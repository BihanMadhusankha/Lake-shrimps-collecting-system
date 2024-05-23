import React from 'react';
import PrawnImage from './../assets/prawn.jpg';
import UserNavigation from '../Navigations/userNav';

const RegForm: React.FC = () => {
  return (
    <div>
        <UserNavigation/>
        <div className="background" style={{position: 'relative', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <img src={PrawnImage} alt="Image" className="Image-container" style={{ width: '50%', height: 'auto' }} />
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#e4efdf', backgroundImage: `url('path-to-background-image.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="form-wrapper" style={{ padding: '40px 20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '700px', textAlign: 'center', margin: '10px', background: 'white' }}>
          <h2 className="title" style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>Vehicle Register Form</h2>
          <form className="form" style={{ display: 'flex', flexDirection: 'column' }}>
            <input type="text" placeholder="Owner Name" className="input" style={{ width: '50%', marginBottom: '1rem', padding: '10px', margin: '8px 0', border: '1px solid #f8f5f5', borderRadius: '5px', fontSize: '16px' }} />
            <input type="text" placeholder="Vehicle Model" className="input" style={{ width: '50%', marginBottom: '1rem', padding: '10px', margin: '8px 0', border: '1px solid #f8f5f5', borderRadius: '5px', fontSize: '16px' }} />
            <input type="text" placeholder="Vehicle Make" className="input" style={{ width: '50%', marginBottom: '1rem', padding: '10px', margin: '8px 0', border: '1px solid #f8f5f5', borderRadius: '5px', fontSize: '16px' }} />
            <input type="year" placeholder="Vehicle Year" className="input" style={{ width: '50%', marginBottom: '1rem', padding: '10px', margin: '8px 0', border: '1px solid #f8f5f5', borderRadius: '5px', fontSize: '16px' }} />
            <input type="text" placeholder="License Plate" className="input" style={{ width: '50%', marginBottom: '1rem', padding: '10px', margin: '8px 0', border: '1px solid #f8f5f5', borderRadius: '5px', fontSize: '16px' }} />
            <input type="date" placeholder="Registration Date" className="input" style={{ width: '50%', marginBottom: '1rem', padding: '10px', margin: '8px 0', border: '1px solid #f8f5f5', borderRadius: '5px', fontSize: '16px' }} />
            <button type="button" className="button" style={{ backgroundColor: '#2709be', color: 'white', border: 'none', padding: '10px', marginTop: '10px', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>Register</button>
          </form>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default RegForm;
