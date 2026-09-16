import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import JoinProjectForm from "../JoinProjectForm/JoinProjectForm";
import getRandomColor from "../../../helpers/getRandomColor";
import "./ProjectsList.css";


export default function ProjectsList({ projects, variant }) {
    const { user } = useContext(UserContext)
    const [selectedProject, setSelectedProject] = useState(null);
    const navigate = useNavigate();

    const stripColors = useMemo(() => {
        const map = {};
        projects.forEach((p) => {
            map[p._id] = getRandomColor();
        });
        return map;
    }, [projects]);

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
        <div className=" d-flex flex-column gap-3">
            {projects.map((p) => (
                <div onClick={() => navigate(`/projects/${p._id}`)} key={p._id} className="card project-card shadow-sm"
                    style={{
                        width: "70%",
                        margin: "0 auto"
                    }}>
                    <div className="card-body">
                        <div className="project-strip" style={{
                            backgroundColor: stripColors[p._id],
                        }} />
                        <div className="row align-items-center">
                            <div className="col">
                                <h5 className="card-title mb-1">{p.title}</h5>

                                <p className="text-muted mb-1">
                                    {p.members.length}/{totalRequired(p.requiredRoles)} members
                                </p>
                                <div className="progress mb-2" style={{ height: '6px', width: '65%' }} role="progressbar" aria-label="Members filled">
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

                            <div className="col-auto d-flex flex-column gap-2">
                                <div className="project-actions">
                                    <Link to={`/projects/${p._id}`} className="btn btn-outline-primary .btn">
                                        View Project
                                    </Link>
                                    {variant === "search" && isLoggedIn && (

                                        isAlreadyMember(p)

                                            ? <p className="text-muted mb-0 text-center">Joined</p>

                                            : <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); setSelectedProject(p); }}>Join</button>

                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {selectedProject && <JoinProjectForm project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </div>
    )
}