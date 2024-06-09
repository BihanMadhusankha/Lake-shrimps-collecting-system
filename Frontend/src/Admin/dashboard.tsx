import React from 'react';
import Sidebar from './Sidebar';
import '../CSS/dash.css';
import AdminNavigation from './AdminNAvigation';
import Card from './adminCard';

interface NavigationLink {
  path: string;
  label: string;
}

const Dashboard: React.FC = () => {
  const navigationLinks: NavigationLink[] = [
    { path: '/SSABS/admin/allusers', label: 'Users' },
    { path: '/SSABS/admin/profile', label: 'Profile' },
    { path: '/SSABS/admin/alltransaction', label: 'Transaction' },
  ];

  return (
    <div className="dashboard d-flex flex-column">
      <AdminNavigation />
      <h2 className="d-flex justify-content-center m-3">Admin Dashboard</h2>

      <div>
        <div className=' d-flex  flex-row'>
          <Sidebar />
          <div className="cards-container col-3 me-auto ">
            {navigationLinks.map((link) => (
              <Card key={link.path} path={link.path} label={link.label}  />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;