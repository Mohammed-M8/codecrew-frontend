// src/components/Dashboard/Dashboard.jsx

import { useContext, useEffect } from 'react';

import { UserContext } from '../../contexts/UserContext';
import { NavLink, Outlet } from 'react-router';

const Dashboard = () => {
  const { user } = useContext(UserContext)


  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-3 col-lg-2 bg-body-tertiary border-end vh-100">
          <div className="d-flex flex-column p-3">
            <h5>{user.username}'s Dashboard</h5>
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <NavLink end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/projects">
                  My Projects
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/requests">
                  Join Requests
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/tasks">
                  My Tasks
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 col-lg-10 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
