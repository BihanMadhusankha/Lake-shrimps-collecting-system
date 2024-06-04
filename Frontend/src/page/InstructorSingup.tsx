import React, { useState } from 'react';
import axios from 'axios';


const Login: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nic, setNic] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        const formData = {
            firstName,
            lastName,
            nic,
            password,
        };

        try {
            await axios.post('/api/register', formData);
            alert('Registration successful!');
        } catch (error) {
            console.error('Error registering', error);
            alert('Failed to register.');
        }
    };

    return (
        <div className="container">

            <style>
                {`
/* src/CSS/Login.css */

.container {
  width: 80%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: center;
}

h2 {
  margin-top: 20px;
  margin-bottom: 10px;
}

p {
  margin-bottom: 20px;
  font-size: 18px;
  color: #555;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form input {
  width: 80%;
  max-width: 400px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form button {
  width: 80%;
  max-width: 400px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.login-form button:hover {
  background-color: #0056b3;
}

`}

            </style>
            <h2>How to become an instructor</h2>
            <p>පහත දැක්වෙන පෝරමය පුරවා ඇතුල් වන්න</p>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="First Name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name *"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="NIC *"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password *"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">APPLY</button>
            </form>
        </div>
    );
};

export default Login;
