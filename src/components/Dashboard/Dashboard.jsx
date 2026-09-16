// src/components/Dashboard/Dashboard.jsx

import { Outlet } from 'react-router';
import SideBar from '../SideBar/SideBar';

const Dashboard = () => {


  return (
    <div className="container-fluid overflow-x-hidden">

      <SideBar />
      <main className="px-4 pb-2"
        style={{
          marginLeft: '250px',
        }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
