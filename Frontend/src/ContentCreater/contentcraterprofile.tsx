import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentNav from './contentNav';

const ContentCraterProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<any>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
          console.error('Token not found');
          return;
        }

        const response = await axios.get('http://localhost:5001/SSABS/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setEditedUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        console.error('Token not found');
        return;
      }

      await axios.put('http://localhost:5001/SSABS/profile', editedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div>
      <ContentNav />

      <div style={{ textAlign: 'center', margin: '50px' }}>
        <h1 style={{ color: '#333', fontSize: '32px', marginBottom: '20px' }}>Profile</h1>
        {user ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            {isEditing ? (
              <>
                <div style={{ marginBottom: '10px' }}>
                  <input
                    type="text"
                    name="firstname"
                    value={editedUser.firstname}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px', padding: '5px', width: '100%', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <input
                    type="text"
                    name="lastname"
                    value={editedUser.lastname}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px', padding: '5px', width: '100%', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <input
                    type="text"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px', padding: '5px', width: '100%', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <input
                    type="text"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px', padding: '5px', width: '100%', borderRadius: '4px' }}
                  />
                </div>
                <button onClick={handleSave} style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Save</button>
              </>
            ) : (
              <>
                <p style={{ marginBottom: '10px' }}><strong>First Name:</strong> {user.firstname}</p>
                <p style={{ marginBottom: '10px' }}><strong>Last Name:</strong> {user.lastname}</p>
                <p style={{ marginBottom: '10px' }}><strong>Email:</strong> {user.email}</p>
                <p style={{ marginBottom: '10px' }}><strong>Phone:</strong> {user.phone}</p>
                <button onClick={handleEdit} style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#28a', color: 'white', border: 'none', cursor: 'pointer' }}>Edit</button>
              </>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ContentCraterProfile;
