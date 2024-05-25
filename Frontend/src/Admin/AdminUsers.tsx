import React, { useEffect, useState } from 'react';
import AdminNavigation from './AdminNAvigation';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import '../CSS/adminallusers.css';

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  role: string;
}

export default function AdminUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5001/SSABS/admin/dashboard');
        const data: User[] = await response.json();

        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      users.forEach((_, index) => {
        setTimeout(() => {
          setHighlightedRow(index);
        }, index * 1000);
      });
    }
  }, [users]);

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5001/SSABS/admin/dashboard/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        console.error('Error deleting user:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('User Report', 20, 10);
    doc.autoTable({
      head: [['First Name', 'Last Name', 'Role']],
      body: users.map(user => [user.firstname, user.lastname, user.role]),
    });
    doc.save('user_report.pdf');
  };

  // Function to filter users based on search query
  const filteredUsers = users.filter(user =>
    user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard d-flex flex-column">
      <AdminNavigation setSearchQuery={setSearchQuery} />
      <h2 className="d-flex justify-content-center m-3">All Users</h2>

      <button onClick={generatePDF} className="button generate-pdf col-2 m-3">
        Download PDF
      </button>

      {isLoading ? (
        <p>Loading user data...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          <div className="search-container  col-5">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowPopup(true)}
              onBlur={() => setShowPopup(false)}
            />
            {showPopup && (
              <div className="search-popup">
                {/* Your popup content here */}
                {/* For example: */}
                <p>Search results:</p>
                <ul>
                  {filteredUsers.map((user) => (
                    <li key={user._id}>
                      {user.firstname} {user.lastname}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <table className="user-table m-3">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className={highlightedRow === index ? 'highlight' : ''}
                >
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="button delete-button"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
