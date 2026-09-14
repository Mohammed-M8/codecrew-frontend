import { useContext, useEffect, useState } from "react"
import * as projectService from '../../services/projectsService';
import { NavLink, useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";

export default function ProjectInfo() {
    const { user } = useContext(UserContext)
    const [project, setProject] = useState(null)
    const params = useParams()
    const projectId = params.projectId

    useEffect(() => {
        const getProject = async () => {
            const data = await projectService.show(projectId)
            setProject(data)
        }

        getProject();
    }, [projectId])

    const totalRequired = (requiredRoles) =>
        requiredRoles.reduce((sum, r) => sum + r.quantity, 0);

    const percentFilled = (p) => {
        const required = totalRequired(p.requiredRoles);
        if (required === 0) return 0;
        return Math.min(100, Math.round((p.members.length / required) * 100));
    };

    if (!project) return <p className="container py-5">Loading...</p>;

    return (
        <main className="container">
            <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                    <div className="d-flex align-items-center gap-3 mb-1">
                        <h1 className="mb-0">{project.title}</h1>
                        {project.owner?._id === user._id && (
                            <NavLink className="btn btn-secondary" to="edit">Edit</NavLink>
                        )}
                    </div>
                    <p className="text-muted mb-0">
                        Owned by {project.owner?.username}
                    </p>
                </div>
                <span className={`badge ${project.status === 'open' ? 'text-bg-success' : 'text-bg-secondary'}`}>
                    {project.status}
                </span>
            </div>

            <p className="mb-4">{project.description}</p>

            <div className="row g-4">
                <div className="col-12 col-lg-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Technologies</h5>
                            <div className="d-flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="badge text-bg-light border">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Members</h5>
                            <p className="text-muted mb-1">
                                {project.members.length}/{totalRequired(project.requiredRoles)} filled
                            </p>
                            <div className="progress mb-3" style={{ height: '6px' }} role="progressbar" aria-label="Members filled">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${percentFilled(project)}%` }}
                                    aria-valuenow={percentFilled(project)}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>

                            {project.members.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {project.members.map((m) => (
                                        <li key={m._id} className="list-group-item d-flex justify-content-between px-0">
                                            <span>{m.user?.username}</span>
                                            <span className="text-muted">{m.role}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted mb-0">No members yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Roles Needed</h5>
                            {project.requiredRoles.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {project.requiredRoles.map((r) => (
                                        <li key={r._id} className="list-group-item d-flex justify-content-between px-0">
                                            <span>{r.role}</span>
                                            <span className="badge text-bg-secondary">{r.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted mb-0">No specific roles listed.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}