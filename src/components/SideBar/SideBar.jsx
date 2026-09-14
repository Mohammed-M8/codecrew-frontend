import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { NavLink } from "react-router"

export default function SideBar() {

    const { user } = useContext(UserContext)
    return (
        <nav className="col-md-3 col-lg-2 bg-body-tertiary border-end vh-100">
            <div className="d-flex flex-column p-3 h-100">
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
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/projects/search">
                            Search
                        </NavLink>
                    </li>
                </ul>
                <NavLink to="/projects/new" className="btn btn-success">
                    + Create Project
                </NavLink>
            </div>
        </nav>
    )
}