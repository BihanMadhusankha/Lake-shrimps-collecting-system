import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import '../CSS/dash.css'; // Assuming your existing CSS for the table
import AdminNavigation from '../Navigations/AdminNAvigation';
import Card from './adminCard'; // Import Card component (if created)


// Interface for user data (replace with your actual data structure)
interface User {
  _id: string;
  firstname: string;
  lastname: string;
  role: string;
  // ... other user properties as needed
}

interface NavigationLink {
  path: string; // Path for the link
  label: string; // Text displayed on the link
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track any errors

  const navigationLinks: NavigationLink[] = [
    { path: '/users', label: 'Users' },

  ];
  // Fetch data (replace with your actual API endpoint)
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors

      try {
        const response = await fetch('http://localhost:5001/SSABS/admin/dashboard'); // Replace with your actual API endpoint
        const data: User[] = await response.json(); // Type cast the response data

        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchUsers();
  }, []);

  // Function to handle user deletion (replace with actual API call)
  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5001/SSABS/admin/dashboard/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId)); // Update local state
      } else {
        console.error('Error deleting user:', await response.text());
        // Handle deletion error appropriately (e.g., display an error message to the user)
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle network or other errors appropriately
    }
  };

  return (
    <div className="dashboard d-flex flex-column">
      <AdminNavigation />
      <h2 className="d-flex justify-content-center m-3">Admin Dashboard</h2>

      <div>
        <div className=' d-flex  flex-row'>
          <Sidebar />
          <div className="cards-container col-3 me-auto "> {/* Wrap cards in a container */}
            {navigationLinks.map((link) => (
              <Card key={link.path} path={link.path} label={link.label} />
            ))}
          </div>

        </div>
        {isLoading ? (
          <p>Loading user data...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Actions</th> {/* Add a new header for the delete button */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className='button' onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </button>
                  </td> {/* Add a table cell for the delete button */}
                </tr>
              ))}
              {users.length === 0 && !error && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
