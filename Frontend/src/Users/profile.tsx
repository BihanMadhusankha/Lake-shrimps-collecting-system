import React, { useState, useRef, useEffect } from 'react';
import UserNavigation from '../Navigations/userNav';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Za-z]+$/
const phoneRegex = /^07\d{8}$/
const sriLankaNICRegex = /^[0-9]{9}[vVxX]$/;

interface User {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    phone: string;
    nic: string;
    // Add more user details as needed (e.g., phone number, bio)
}

export default function Profile(): React.FC {
    const [user, setUser] = useState<User>({ firstname: "", lastname: "", email: "", role: "", phone: "", nic: "" }); // Initial user data
    const [isEditing, setIsEditing] = useState(false); // Flag for edit mode
    const photoInputRef = useRef<HTMLInputElement>(null); // Reference for file input

    const validateInput = (value: string, type: string): string | undefined => {
        switch (type) {
            case 'firstname':
                if (!nameRegex.test(value)) {
                    return 'Invalid name format';
                }
                break;
            case 'lastname':
                if (!nameRegex.test(value)) {
                    return 'Invalid name format';
                }
                break;
            case 'email':
                if (!emailRegex.test(value)) {
                    return 'Invalid email format';
                }
                break;
            case 'phone':
                if (!phoneRegex.test(value)) {
                    return 'Invalid phone number format';
                }
                break;
            case 'nic':
                if (!sriLankaNICRegex.test(value)) {
                    return 'Invalid nic format';
                }
                break;
            default:
                // Add validation for other input types if needed (e.g., required field)
                if (value.trim() === '') {
                    return 'This field is required';
                }
        }
        return undefined; // No validation error
    };
    // Fetch user data (replace with your actual data fetching logic)
    const fetchUserData = async () => {
        const response = await fetch("your-api-endpoint"); // Replace with your API call
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch("your-api-endpoint", {
                method: "PUT", // Use PUT for updating existing data
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user), // Send the updated user data
            });

            if (!response.ok) {
                throw new Error("Failed to save user data");
            }

            const savedUser = await response.json(); // Get the saved data from response
            setUser(savedUser); // Update state with the saved user data
            setIsEditing(false); // Hide edit form after successful save
        } catch (error) {
            console.error("Error saving user data:", error);
            // Handle errors appropriately (e.g., display an error message to the user)
        }

        setIsEditing(false); // Hide edit form after saving
    };

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Handle selected profile picture (e.g., preview, upload to backend)
        }
    };

    const renderUserDetails = () => (
        <div className="card-body">
            <h2 className=' d-flex justify-content-center m-3'>Your Details</h2>
            <p>First Name: {user.firstname}</p>
            <p>Last Name: {user.lastname}</p>
            <p>Email: {user.email}</p>
            <p>Your Role: {user.role}</p>
            <p>Phone Number: {user.phone}</p>
            <p>NIC: {user.phone}</p>
            <button className='btn btn-primary ' onClick={handleEditClick}>Edit</button>
        </div>
    );

    const renderEditDetails = () => (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="card-body">
                <h2 className=' d-flex justify-content-center m-3  '>Your Details</h2>

                <input
                    type="text"
                    value={user.firstname}
                    className="rounded-2 m-3"
                    placeholder="First Name"
                    onChange={(e) => {
                        validateInput(e.target.value, 'text');
                        setUser({ ...user, firstname: e.target.value });
                        
                    }}
                />
               
                <input
                    placeholder='Last Name'
                    type="text"
                    value={user.lastname}
                    className='rounded-2 m-3'
                    onChange={(e) => {
                        validateInput(e.target.value, 'text');
                        setUser({ ...user, lastname: e.target.value });
                        
                    }}                />
                <input
                    placeholder='Email Address'
                    type="email"
                    value={user.email}
                    className='rounded-2 m-3'
                    onChange={(e) => {
                        validateInput(e.target.value, 'text');
                        setUser({ ...user, email: e.target.value });
                        
                    }}                />
                <input
                    placeholder='Role'
                    type="text"
                    value={user.role}
                    className='rounded-2 m-3'
                    onChange={(e) => {
                        validateInput(e.target.value, 'text');
                        setUser({ ...user, role: e.target.value });
                        
                    }}                />
                <input
                    placeholder='Phone Number'
                    type="text"
                    value={user.phone}
                    className='rounded-2 m-3'
                    onChange={(e) => {
                        validateInput(e.target.value, 'text');
                        setUser({ ...user, phone: e.target.value });
                        
                    }}                />
                <input
                    placeholder='NIC'
                    type="text"
                    value={user.nic}
                    className='rounded-2 m-3'
                    onChange={(e) => {
                        validateInput(e.target.value, 'text');
                        setUser({ ...user, nic: e.target.value });
                        
                    }}                />
                <button className='btn btn-primary ' type="submit" onClick={handleSaveClick}>
                    Save
                </button>
            </div>
        </form>
    );

    return (
        <div>
            <UserNavigation />
            <div className="container">
                <div className="row">
                    <div className="col-6 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title d-flex justify-content-center m-3">
                                    User Name
                                </h3>
                                <label htmlFor="userPhoto" className="d-flex flex-column justify-content-center align-items-center">
                                    <img
                                        src="https://www.w3schools.com/howto/img_avatar.png"
                                        alt="profile picture"
                                        className="img-fluid rounded-circle w-75 h-75"
                                    />
                                    <button className="mt-3 w-50 h-50 rounded-5">
                                        <i className="text-primary mr-2 border-black text-dark">
                                            choose profile
                                        </i>
                                    </button>
                                    <input
                                        type="file"
                                        id="userPhoto"
                                        accept="image/*"
                                        hidden
                                        ref={photoInputRef}
                                        onChange={handlePhotoChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 mt-5">
                        <div className="card">
                            {isEditing ? renderEditDetails() : renderUserDetails()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
