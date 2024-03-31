import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios'; // Import for navigation

interface SignupFormData {
  firstname: string;
  lastname: string;
  hashedPassword: string;
  password: string;
  emailCollecter: string;
  nicCollecter: string;
  ferry: string;
  lake: string;
  mobileNo: string;
  message?: string;
}
function Signup() {

  const [formData, setFormData] = useState<SignupFormData>({
    firstname: '',
    lastname: '',
    password: '',
    hashedPassword: '',
    emailCollecter: '',
    nicCollecter: '',
    ferry: '',
    lake: '',
    mobileNo: '',
  });

  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage(''); // Clear any previous error messages

    try {
      const response = await axios.post<SignupFormData>(
        'http://localhost:3000/signup', // Replace with your correct backend endpoint
        formData
      );
      console.log(response.data); // Handle successful signup

    } catch (error: unknown) {
      if ((error as AxiosError<SignupFormData>).response) {
        const data = (error as AxiosError<SignupFormData>).response?.data;
        setErrorMessage((data?.message || '').toString());
      } else {
        setErrorMessage((error as Error).toString()); // Provide user-friendly message
      }
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, ferry: event.target.value });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

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
              id="firstname"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mt-lg-3"
              id="nicCollecter"
              name='nicCollecter'
              placeholder="National Id Card Number"

              value={formData.nicCollecter}
              onChange={handleChange}

            />
            <select
              id="ferry"
              className="form-control mt-lg-3"
              name="ferry"
              title="Please select an option"
              value={formData.ferry} // Set value to formData.ferry
              onChange={handleSelectChange}            >
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

              value={formData.password}
              onChange={handleChange}

            />
            <input
              type="password"
              className="form-control mt-lg-3 mb-lg-3 "
              id="hashedPassword"
              placeholder=" Conform Password"
              name='hashedPassword'
              value={formData.hashedPassword}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-5 ">
            <input
              type="text"
              className="form-control mt-lg-3"
              id="lastname"
              name='lastname'
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
            />

            <input
              type="email"
              className="form-control mt-lg-3"
              id="emailCollecter"
              placeholder="Email address"
              name='emailCollecter'

              value={formData.emailCollecter}
              onChange={handleChange}
            />

            <select id="lake" className='form-control mt-lg-3' name="lake" title="Please select an option" value={formData.lake} // Set value to formData.ferry
              onChange={handleSelectChange}    >
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

              value={formData.mobileNo}
              onChange={handleChange}

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






























// Helper functions for validation (replace if needed)
//   function isValidEmail(email: string): boolean {
//     const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*<span class="math-inline">/;
// return emailRegex.test(email);
// }
//



// function isPasswordStrongEnough(password: string): boolean {
// // Implement password strength validation logic here \(e\.g\., using a library like zxcvbn\)
// return password.length >= 8 && // Minimum length
// /[a-z]/.test(password) && // Lowercase letters
// /[A-Z]/.test(password) && // Uppercase letters
// /[0-9]/.test(password) && // Numbers
// /[!@#</span>%^&*]/.test(password); // Symbols
//   }





// if (!isValidEmail(email)) {
// //   setErrorMessage('Please enter a valid email address.');
// //   return;
// // }

// if (!isPasswordStrongEnough(confirmPassword)) {
//   setErrorMessage(
//     'Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.'
//   );
//   return;
// }

// try {
//   // Send the form data to the backend
//   const response = await fetch('http://localhost:3000/signup', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       firstName:firstName,
//       lastName:lastName,
//       nicCollecter:nicCollecter,
//       email:email,
//       ferry:ferry,
//       lake: lakes,
//       password: confirmPassword, // Hash password on the backend
//       mobileNo: mobileNo,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const data = await response.json();

//   if (data.message === 'Collector created successfully') {
//     navigate('/'); // Redirect to home page on success
//   } else {
//     setErrorMessage(data.message); // Display error message from backend
//   }
// } catch (error) {
//   console.error(error);
//   setErrorMessage('An error occurred during signup. Please try again.');
// }