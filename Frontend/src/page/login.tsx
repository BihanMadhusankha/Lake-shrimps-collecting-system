import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [confirmPassword, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/SSABS/user/login', { email, confirmPassword });
      if (response.data) {
        navigate('/');
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
        <h1 className="h3 mb-3 fw-normal mt-3 ">Please sign in</h1>

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
          <label htmlFor="Confirm Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            placeholder='Password'
            value={confirmPassword}
            onChange={(e) => setPassword(e.target.value)}
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

      <p>you have not another account? <Link to="/SSABS/user/signup">Sign in </Link></p>
    </div>
  );
}

export default Login;