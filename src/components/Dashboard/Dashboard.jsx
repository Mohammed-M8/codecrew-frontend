// src/components/Dashboard/Dashboard.jsx

import { Outlet } from 'react-router';
import SideBar from '../SideBar/SideBar';

const Dashboard = () => {


  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <main className="col-md-9 col-lg-10 p-4" style={{ height: '100vh', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
