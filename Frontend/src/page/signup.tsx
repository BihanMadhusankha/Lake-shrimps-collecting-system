import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [firstname, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/SSABS/user/signup/', {
        firstname,
        lastname,
        role,
        email,
        birthday,
        gender,
        phone,
        nic,
        state,
        password,
        confirmPassword,
      });

      if (response.data) {
        navigate('/SSABS/user/login');
      } else {
        setErrorMessage('Signup failed. Please check your details.');

      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };



  return (
    <div className='container'>
      <form
        className="row g-3 w-75 m-5 "
        onSubmit={handleSubmit}
      >
        <h1 className="h3 mb-3 fw-normal mt-3 ">Please sign up</h1>

        <div className="col-md-4">
          <label htmlFor="username" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            name="firstname"
            placeholder='First Name'
            value={firstname}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="username" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            placeholder='Last Name'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="Roal" className="form-label">
            Roal
          </label>
          <select className="form-select"
            id="roal"
            name="roal"
            title="Roal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required>
            <option selected disabled value="">Choose...</option>
            <option>Admin</option>
            <option>User</option>
            <option>Teacher</option>

          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="email" className="form-label">
            Birthday
          </label>
          <input
            type="date"
            className="form-control"
            id="birthday"
            name="birthday"
            placeholder='Birthday'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="Gender" className="form-label">
            Gender
          </label>
          <select className="form-select"
            id="gender"
            name="gender"
            title="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required>
            <option selected disabled value="">Choose...</option>
            <option>Male</option>
            <option>Female</option>

          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            placeholder='Phone Number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="nic" className="form-label">
           NIC
          </label>
          <input
            type="text"
            className="form-control"
            id="nic"
            name="nic"
            placeholder='NIC'
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="State" className="form-label">
            State
          </label>
          <select className="form-select"
            id="state"
            name="state"
            title="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required>
            <option selected disabled value="">Choose...</option>
            <option>Colombo</option>
            <option>Homagama</option>
            <option>Kottawa</option>

          </select>
        </div>


        <div className="col-md-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="Confirm Password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>



        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>

      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>you have another account? <Link to="/SSABS/user/login">Sign in </Link></p>
    </div>
  );
}

export default Signup;