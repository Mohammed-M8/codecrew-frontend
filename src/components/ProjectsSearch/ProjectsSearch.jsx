import { useEffect, useState } from "react";
import { Link } from "react-router";
import * as projectService from '../../services/projectsService';

export default function ProjectsSearch() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function getProjects() {
            const data = await projectService.index();
            setProjects(data);
        }
        getProjects();
    }, []);

    const totalRequired = (requiredRoles) =>
        requiredRoles.reduce((sum, r) => sum + r.quantity, 0);

    const percentFilled = (p) => {
        const required = totalRequired(p.requiredRoles);
        if (required === 0) return 0;
        return Math.min(100, Math.round((p.members.length / required) * 100));
    };

    return (
        <main className="container py-5">
            <h1 className="mb-3">Search Projects</h1>
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
                                    <button className="btn btn-primary">Join</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}