import React, { useState } from 'react';
import axios from 'axios';


const Login: React.FC = () => {
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { nic, password });
      if (response.data.success) {
        alert('Login successful!');
        // Redirect to the appropriate page after successful login
        window.location.href = '/dashboard';
      } else {
        alert('Login failed. Please check your NIC and password.');
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('Failed to login.');
    }
  };

  const handleRegister = () => {
    window.location.href = '/signup';
  };

  return (
    <div className="container">
 
        <style>
            {
                `/* src/CSS/Login.css */

                .container {
                  width: 100%;
                  max-width: 400px;
                  margin: 0 auto;
                  padding: 20px;
                  font-family: Arial, sans-serif;
                  text-align: center;
                }
                
                h2 {
                  margin-bottom: 20px;
                }
                
                .login-form {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                }
                
                .form-group {
                  width: 100%;
                  margin-bottom: 15px;
                }
                
                .form-group label {
                  display: block;
                  margin-bottom: 5px;
                  text-align: left;
                }
                
                .form-group input {
                  width: 100%;
                  padding: 10px;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                }
                
                .form-group button {
                  width: 100%;
                  padding: 10px;
                  background-color: #007bff;
                  color: white;
                  border: none;
                  cursor: pointer;
                  border-radius: 4px;
                }
                
                .form-group button:hover {
                  background-color: #0056b3;
                }
                
                .register-link {
                  margin-top: 20px;
                }
                
                .register-now {
                  color: #007bff;
                  cursor: pointer;
                  text-decoration: underline;
                }
                
                .register-now:hover {
                  color: #0056b3;
                }
                `
            }
        </style>


      <h2>Returning Member</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="nic">NIC</label>
          <input
            type="text"
            id="nic"
            placeholder="NIC"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="register-link">
        <p>You are not a member? <span onClick={handleRegister} className="register-now">Register Now</span></p>
      </div>
    </div>
  );
};

export default Login;




