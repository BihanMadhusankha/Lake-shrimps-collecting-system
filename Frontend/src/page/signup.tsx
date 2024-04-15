import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:5001/api/signup/', { username, email, password })
      .then((result) => console.log(result.data))
      .catch((error) => console.log(error));
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
            id="username"
            name="username"
            placeholder='First Name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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

        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>

      </form>
      <p>you have another account? <Link to="/login">Sign in </Link></p>
    </div>
  );
}

export default Signup;