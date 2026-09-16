import { useContext, useEffect, useState, useMemo, Fragment } from "react"
import * as projectService from '../../services/projectsService';
import { NavLink, useNavigate, useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import DeleteProjectModal from "../DeleteProjectModal/DeleteProjectModal";
import RemoveMemberModal from "../RemoveMemberModal/RemoveMemberModal";
import getRandomColor from "../../../helpers/getRandomColor";
import "./ProjectInfo.css";

export default function ProjectInfo() {
    const { user } = useContext(UserContext)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const [memberToRemove, setMemberToRemove] = useState(null)
    const [project, setProject] = useState(null)
    const params = useParams()
    const projectId = params.projectId
    const navigate = useNavigate();

    useEffect(() => {
        const getProject = async () => {
            const data = await projectService.show(projectId)
            setProject(data)
        }

        getProject();
    }, [projectId])

    const stripColors = useMemo(() => ({
        technologies: getRandomColor(),
        members: getRandomColor(),
        roles: getRandomColor(),
    }), []);

    const totalRequired = (requiredRoles) =>
        requiredRoles.reduce((sum, r) => sum + r.quantity, 0) + 1;

    const percentFilled = (p) => {
        const required = totalRequired(p.requiredRoles);
        if (required === 0) return 0;
        return Math.min(100, Math.round((p.members.length / required) * 100));
    };

    const handleDelete = async () => {
        try {
            await projectService.deleteProject(projectId)
            navigate('/projects')
        } catch (error) {
            console.log(error)
        }
    }

    const openRemoveModal = (memberId) => {
        setMemberToRemove(memberId)
        setShowRemoveModal(true)
    }

    const handleRemove = async () => {
        try {
            await projectService.removeMember(project._id, memberToRemove)
            setProject((prev) => ({
                ...prev,
                members: prev.members.filter((m) => m.user._id !== memberToRemove),
            }))
            setShowRemoveModal(false)
            setMemberToRemove(null)
        } catch (error) {
            console.log(error)
        }
    }

    if (!project) return <p className="container py-5">Loading...</p>;

    return (
        <main className="container">
            <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                    <div className="d-flex align-items-center gap-3 mb-1">
                        <h1 className="mb-0">{project.title}</h1>
                        {project.owner?._id === user._id && (
                            <>
                                <NavLink className="btn btn-secondary" to="edit">Edit</NavLink>
                                <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>Delete</button>
                            </>
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
            <DeleteProjectModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                handleDelete={handleDelete}
            />

            <RemoveMemberModal
                show={showRemoveModal}
                onClose={() => setShowRemoveModal(false)}
                handleRemove={handleRemove}
            />

            <p className="mb-4">{project.description}</p>

            <div className="row g-4">
                <div className="col-12 col-lg-8">
                    <div className="card info-card shadow-sm mb-4">
                        <div className="info-strip" style={{ backgroundColor: stripColors.technologies }} />
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

                    <div className="card info-card shadow-sm">
                        <div className="info-strip" style={{ backgroundColor: stripColors.members }} />
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
                                        <Fragment key={m._id}>
                                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                <span>{m.user?.username}</span>
                                                <span className="text-muted">{m.role}</span>
                                                {project.owner?._id === user._id && m.user?._id !== project.owner?._id && (
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => openRemoveModal(m.user._id)}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </li>
                                        </Fragment>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted mb-0">No members yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="card info-card shadow-sm">
                        <div className="info-strip" style={{ backgroundColor: stripColors.roles }} />
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