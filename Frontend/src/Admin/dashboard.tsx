import React from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import '../CSS/dash.css'; // Assuming your existing CSS for the table
import AdminNavigation from './AdminNAvigation';
import Card from './adminCard'; // Import Card component (if created)


// Interface for user data (replace with your actual data structure)


interface NavigationLink {
  path: string; // Path for the link
  label: string; // Text displayed on the link
}

const Dashboard: React.FC = () => {
  const navigationLinks: NavigationLink[] = [
    { path: '/SSABS/admin/allusers', label: 'Users' },
    { path: '/SSABS/admin/profile', label: 'Profile' },
    { path: '/SSABS/admin/alltransaction', label: 'Transaction' },

  ];
  // Fetch data (replace with your actual API endpoint)
  

  // Function to handle user deletion (replace with actual API call)
  

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
        
      </div>
    </div>
  );
};

export default Dashboard;
