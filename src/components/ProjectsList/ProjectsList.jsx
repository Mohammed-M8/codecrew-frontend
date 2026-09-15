import { useContext } from "react";
import { Link } from "react-router";
<<<<<<< HEAD
import { useState } from "react";
import JoinProjectForm from "../JoinProjectForm/JoinProjectForm";

export default function ProjectsList({ projects,variant }) {
    const [selectedProject, setSelectedProject] = useState(null);

=======
import { UserContext } from "../../contexts/UserContext";

export default function ProjectsList({ projects, variant }) {
    const { user } = useContext(UserContext)
>>>>>>> main
    const totalRequired = (requiredRoles) =>
        requiredRoles.reduce((sum, r) => sum + r.quantity, 0) + 1;

    const percentFilled = (p) => {
        const required = totalRequired(p.requiredRoles);
        if (required === 0) return 0;
        return Math.min(100, Math.round((p.members.length / required) * 100));
    };

    const isAlreadyMember = (p) => {

        if (!user) return false;

        return p.members.some(m => (m.user?._id || m.user) === user._id);

    };

    const isLoggedIn = !!user

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
<<<<<<< HEAD
                                {variant === "search" && <button className="btn btn-primary" onClick={() => setSelectedProject(p)}>Join</button>}
                            </div>
=======
                                {variant === "search" && isLoggedIn && (

                                    isAlreadyMember(p)

                                        ? <p className="text-muted mb-0 text-center">Joined</p>

                                        : <button className="btn btn-primary">Join</button>

                                )}                            </div>
>>>>>>> main
                        </div>
                    </div>
                </div>
            ))}

            {selectedProject && <JoinProjectForm project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </div>
    )
}