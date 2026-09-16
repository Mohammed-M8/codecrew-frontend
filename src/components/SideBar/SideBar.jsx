import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { NavLink } from "react-router"

export default function SideBar() {

    const { user } = useContext(UserContext)
    return (
        <nav data-bs-theme="dark" className="bg-body-tertiary border-end position-fixed start-0"
            style={{
                width: '250px',
                top: '56px',
                height: 'calc(100vh - 56px)'
            }}>
            <div className="d-flex flex-column p-3 h-100">
                <h5 style={{ color: "white" }}>{user.username}'s Dashboard</h5>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <NavLink end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/projects">
                            <i class="bi bi-archive"></i> My Projects
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/requests">
                            <i class="bi bi-envelope"></i> Join Requests
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/tasks">
                            <i class="bi bi-card-checklist"></i> My Tasks
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/projects/search">
                            <i class="bi bi-search"></i> Search
                        </NavLink>
                    </li>
                </ul>
                <NavLink to="/projects/new" className="btn btn-success mb-3">
                    + Create Project
                </NavLink>
            </div>
        </nav>
    )
}