import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Form validation logic
    if (email === '' || password === '') {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Placeholder for password strength validation
    if (!isPasswordStrongEnough(password)) {
      setErrorMessage('Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.');
      return;
    }

    // Simulate successful signup (replace with actual API call)
    console.log('Signup successful:', email, password);
    navigate('/'); // Redirect to home page after successful signup
  };

  return (
    <div className="signup-container justify-content-center ">
      <h2 className='text-center m-lg-3 '>Signup Form</h2>

      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

      <form onSubmit={handleFormSubmit} className=' justify-content-center text-center align-items-center'>
        <div className="card d-lg-flex flex-lg-row  m-lg-4 justify-content-center bg-black rounded-5 p-0  gap-lg-4">
          {/* Flexbox container for responsive row on large screens */}
          <div className="col-lg-5  ">  {/* First column (50% width on large screens) */}
            <input
              type="text"
              className="form-control mt-lg-3"
              id="FirstName"
              placeholder="First Name"
            // Update with your input handling logic
            />
            <input
              type="text"
              className="form-control mt-lg-3"
              id="nic"
              placeholder="National Id Card Number"
            // Update with your input handling logic
            />
            <input
              type="text"
              className="form-control mt-lg-3"
              id="Ferry"
              placeholder="Ferry"
            // Update with your input handling logic
            />
            <input
              type="password"
              className="form-control mt-lg-3"
              id="exampleInputPassword1"
              placeholder="Password"
              // Update with your input handling logic (likely using useState)
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              className="form-control mt-lg-3 mb-lg-3 "
              id="exampleInputPassword2"
              placeholder=" Conform Password"
              // Update with your input handling logic (likely using useState)
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-lg-5  ">  {/* Second column (50% width on large screens) */}
            <input
              type="text"
              className="form-control mt-lg-3"
              id="LastName"
              placeholder="Last Name"
            // Update with your input handling logic
            />

            <input
              type="email"
              className="form-control mt-lg-3"
              id="exampleInputEmail1"
              placeholder="Email address"
              // Update with your input handling logic (likely using useState)
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              className="form-control mt-lg-3"
              id="TheLakesInput"
              placeholder="The Lake"
            // Update with your input handling logic
            />

            <input
              type="text"
              className="form-control mt-lg-3"
              id="PhoneNoInput"
              placeholder="Mobile Number"
            // Update with your input handling logic
            />

          </div>

        </div>

        <button type="submit" className="btn btn-secondary col-8 rounded-5" id="submit">Submit</button>


      </form>

    </div>
  );
}

// Helper functions for validation
// This function is used to validate an email address
// but we are not using the email variable, so we can remove it// This function is used to validate an email address
// but we are not using the email variable, so we can remove it
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
}

// This function is used to validate a password
// but we are not using the password variable, so we can remove it
function isPasswordStrongEnough(password: string): boolean {
  // Implement password strength validation logic here
  return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password);
}

export default Signup;