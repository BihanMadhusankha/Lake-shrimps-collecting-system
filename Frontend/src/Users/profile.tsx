import React, { useState, useRef, useEffect } from 'react';
import UserNavigation from '../Navigations/userNav';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  nic: string;
  profilePicture?: string;
  _id: string;
}

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ensure useParams gets the correct id
  const [user, setUser] = useState<User>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    nic: '',
    _id: '', // Initialize without id
  });
  const [isEditing, setIsEditing] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:5001/SSABS/user/userhome/profile/${userId}`);
      console.log(response)
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Error fetching user data');
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append('firstname', user.firstname);
      formData.append('lastname', user.lastname);
      formData.append('phone', user.phone);
      formData.append('nic', user.nic);

      const photo = photoInputRef.current?.files?.[0];
      if (photo) {
        formData.append('profilePicture', photo);
      }

      const response = await axios.put(`http://localhost:5001/SSABS/user/userhome/profile/${user._id}`, formData);

      if (response.status === 200) {
        setUser(response.data);
        setIsEditing(false);
        toast.success('Profile updated successfully');
      } else {
        throw new Error('Failed to save user data');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      toast.error('Failed to save user data');
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({ ...user, profilePicture: e.target?.result?.toString() });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderUserDetails = () => (
    <div className="card-body">
      <h2 className="d-flex justify-content-center m-3">Your Details</h2>
      <p>First Name: {user.firstname}</p>
      <p>Last Name: {user.lastname}</p>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phone}</p>
      <p>NIC: {user.nic}</p>
      <button className="btn btn-primary" onClick={handleEditClick}>
        Edit
      </button>
    </div>
  );

  const renderEditDetails = () => (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="card-body">
        <h2>Your Details</h2>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            value={user.firstname}
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            value={user.lastname}
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={user.email}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nic" className="form-label">
            NIC
          </label>
          <input
            type="text"
            className="form-control"
            id="nic"
            value={user.nic}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            className="form-control"
            id="profilePicture"
            ref={photoInputRef}
            onChange={handlePhotoChange}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </div>
    </form>
  );

  const renderProfilePicture = () => {
    if (user.profilePicture) {
      return (
        <img
          src={user.profilePicture}
          alt="Profile Picture"
          className="rounded-circle mx-auto d-block mb-3"
          style={{ width: '150px', height: '150px' }}
        />
      );
    }
    return (
      <div className="text-center">
        <FaCamera size={50} className="text-muted" />
        <p className="text-muted">Upload Profile Picture</p>
      </div>
    );
  };

  return (
    <div className="container">
      <UserNavigation />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            {renderProfilePicture()}
            {isEditing ? renderEditDetails() : renderUserDetails()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
