import { Link } from "react-router";
import { useState } from "react";
import JoinProjectForm from "../JoinProjectForm/JoinProjectForm";

export default function ProjectsList({ projects,variant }) {
    const [selectedProject, setSelectedProject] = useState(null);

    const totalRequired = (requiredRoles) =>
        requiredRoles.reduce((sum, r) => sum + r.quantity, 0);

    const percentFilled = (p) => {
        const required = totalRequired(p.requiredRoles);
        if (required === 0) return 0;
        return Math.min(100, Math.round((p.members.length / required) * 100));
    };
    return (
        <div className="d-flex flex-column gap-3">
            {projects.map((p) => (
                <div key={p._id} className="card shadow-sm">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h5 className="card-title mb-1">{p.title}</h5>

                                <p className="text-muted mb-1">
                                    {p.members.length}/{totalRequired(p.requiredRoles)} members
                                </p>
                                <div className="progress mb-2" style={{ height: '6px' }} role="progressbar" aria-label="Members filled">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${percentFilled(p)}%` }}
                                        aria-valuenow={percentFilled(p)}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>

                                <p className="mb-0">
                                    <strong>Technologies:</strong> {p.technologies.join(', ')}
                                </p>
                            </div>

                            <div className="col-4 d-flex flex-column gap-2">
                                <Link to={`/projects/${p._id}`} className="btn btn-outline-primary">
                                    View Project
                                </Link>
                                {variant === "search" && <button className="btn btn-primary" onClick={() => setSelectedProject(p)}>Join</button>}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {selectedProject && <JoinProjectForm project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </div>
    )
}