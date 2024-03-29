import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation

function Signup() {
  const [email, setEmail] = useState('');
  const [confirmPassword, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nicCollecter, setIdCard] = useState('');
  const [ferry, setFerry] = useState('');
  const [lakes, setLakes] = useState('');
  const [mobileNo, setMobileNumber] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (!isValidEmail(email)) {
    //   setErrorMessage('Please enter a valid email address.');
    //   return;
    // }

    if (!isPasswordStrongEnough(confirmPassword)) {
      setErrorMessage(
        'Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.'
      );
      return;
    }

    try {
      // Send the form data to the backend
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName:firstName,
          lastName:lastName,
          nicCollecter:nicCollecter,
          email:email,
          ferry:ferry,
          lake: lakes,
          password: confirmPassword, // Hash password on the backend
          mobileNo: mobileNo,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.message === 'Collector created successfully') {
        navigate('/'); // Redirect to home page on success
      } else {
        setErrorMessage(data.message); // Display error message from backend
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred during signup. Please try again.');
    }
  };

  // Helper functions for validation (replace if needed)
//   function isValidEmail(email: string): boolean {
//     const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*<span class="math-inline">/;
// return emailRegex.test(email);
// }
function isPasswordStrongEnough(password: string): boolean {
// Implement password strength validation logic here \(e\.g\., using a library like zxcvbn\)
return password.length >= 8 && // Minimum length
/[a-z]/.test(password) && // Lowercase letters
/[A-Z]/.test(password) && // Uppercase letters
/[0-9]/.test(password) && // Numbers
/[!@#</span>%^&*]/.test(password); // Symbols
  }
return (
  <div className="signup-container justify-content-center ">
    <h2 className='text-center m-lg-3 '>Signup Form</h2>

    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

    <form onSubmit={handleFormSubmit} className=' justify-content-center text-center align-items-center'>
      <div className="card d-lg-flex flex-lg-row m-lg-4 justify-content-center bg-black rounded-5 p-0  gap-lg-4">
        <div className="col-lg-5 ">
          <input
            type="text"
            className="form-control mt-lg-3"
            id="firstName"
            name='firstName'
            placeholder="First Name"

            onChange={(e) => setFirstName(e.target.value)}

          />
          <input
            type="text"
            className="form-control mt-lg-3"
            id="nicCollecter"
            name='nicCollecter'
            placeholder="National Id Card Number"

            onChange={(e) => setIdCard(e.target.value)}

          />
          <select id="ferry" className='form-control mt-lg-3' name="ferry" title="Please select an option" onChange={(e) => setFerry(e.target.value)}>
            <option value="Ferry1">Ferry 1</option>
            <option value="Ferry2">Ferry 2</option>
            <option value="Ferry3">Ferry 3</option>
            <option value="Ferry4">Ferry 4</option>
            <option value="Ferry5">Ferry 5</option>


          </select>
          <input
            type="password"
            className="form-control mt-lg-3"
            id="password"
            placeholder="Password"
            name='password'

            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="form-control mt-lg-3 mb-lg-3 "
            id="conformPassword"
            placeholder=" Conform Password"
            name='conformPassword'

            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-lg-5 ">
          <input
            type="text"
            className="form-control mt-lg-3"
            id="lastName"
            name='lastName'
            placeholder="Last Name"

            onChange={(e) => setLastName(e.target.value)}

          />

          <input
            type="email"
            className="form-control mt-lg-3"
            id="emailCollecter"
            placeholder="Email address"
            name='emailCollecter'

            onChange={(e) => setEmail(e.target.value)}
          />

          <select id="lakes" className='form-control mt-lg-3' name="lakes" title="Please select an option" onChange={(e) => setLakes(e.target.value)}>
            <option value="lake1">Lake 1</option>
            <option value="lake2">Lake 2</option>
            <option value="lake3">Lake 3</option>
            <option value="lake4">Lake 4</option>
            <option value="lake5">Lake 5</option>

            

          </select>

          <input
            type="text"
            className="form-control mt-lg-3"
            id="mobileNo"
            placeholder="Mobile Number"
            name='mobileNo'

            onChange={(e) => setMobileNumber(e.target.value)}


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
// but we are not using the email variable, so we can remove it


export default Signup;