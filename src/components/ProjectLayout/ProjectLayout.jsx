import { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router";
import * as projectService from '../../services/projectsService';
import { UserContext } from "../../contexts/UserContext";

export default function ProjectDetails() {
    const { projectId } = useParams();
    const { user } = useContext(UserContext)
    const [project, setProject] = useState(null);

    useEffect(() => {
        const getProject = async () => {
            const data = await projectService.show(projectId);
            setProject(data);
        };
        getProject();
    }, [projectId]);

    if (!project) return <main className="container py-5">Loading...</main>;

    const isOwner = project.owner?._id === user._id;
    const isMember = project.members?.some(m => m.user._id === user._id)

    return (
        <main className="container py-5">
            <h1 className="mb-4">Project Details</h1>
            <div className="d-flex justify-content-end">
                <Link to='tasks/new' className="btn btn-primary">
                    + Create new task
                </Link>  </div>
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