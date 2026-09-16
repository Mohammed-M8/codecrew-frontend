import { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router";
import * as projectService from '../../services/projectsService';
import { UserContext } from "../../contexts/UserContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function ProjectDetails() {
    const { projectId } = useParams();
    const { user } = useContext(UserContext)
    const [project, setProject] = useState(null);
    const navigate = useNavigate()

useEffect(() => {
    const getProject = async () => {
        try {
            const data = await projectService.show(projectId);
            setProject(data);
        } catch (error) {
            if (error.status === 404) {
                navigate('/404', { replace: true });
            } else {
                console.log(error);
            }
        }
    };
    getProject();
}, [projectId, navigate]);

    if (!project) return <LoadingSpinner />;

    const isOwner = user ? (project.owner?._id === user._id) : false;
    const isMember = user ? (project.members?.some(m => m.user._id === user._id)) : false

    return (
        <main className="container py-4">
            <div className="d-flex justify-content-between mb-4">
                <h1>Project Details</h1>
                {isMember ?
                    <Link to='tasks/new' className="btn btn-primary align-self-start">
                        + Create new task
                    </Link> : ''} </div>
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <NavLink
                        end
                        to={`/projects/${projectId}`}
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        Info
                    </NavLink>
                </li>
                {(isOwner || isMember) && <li className="nav-item">
                    <NavLink
                        to={`/projects/${projectId}/tasks`}
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        Tasks
                    </NavLink>
                </li>}
                {isOwner && <li className="nav-item">
                    <NavLink
                        to={`/projects/${projectId}/requests`}
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        Requests
                    </NavLink>
                </li>}
            </ul>

            <Outlet />
        </main>
    );
}