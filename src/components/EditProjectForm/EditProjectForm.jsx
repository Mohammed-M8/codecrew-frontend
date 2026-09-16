import { useState, useEffect } from "react";
import * as projectService from '../../services/projectsService';
import { useNavigate, useParams } from "react-router";

export default function EditProjectForm() {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [techInput, setTechInput] = useState('');
    const [roleInput, setRoleInput] = useState({ role: '', quantity: 1 });

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: [],
        requiredRoles: [],
        status: 'open',
    });

    useEffect(() => {
        const getProject = async () => {
            try {
                const data = await projectService.show(projectId);
                setFormData({
                    title: data.title,
                    description: data.description,
                    technologies: data.technologies,
                    requiredRoles: data.requiredRoles.map(r => ({ role: r.role, quantity: r.quantity })),
                    status: data.status,
                });
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        };
        getProject();
    }, [projectId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addTech = () => {
        const trimmed = techInput.trim();
        if (trimmed && !formData.technologies.includes(trimmed)) {
            setFormData({ ...formData, technologies: [...formData.technologies, trimmed] });
        }
        setTechInput('');
    };

    const removeTech = (tech) => {
        setFormData({ ...formData, technologies: formData.technologies.filter(t => t !== tech) });
    };

    const addRole = () => {
        if (!roleInput.role.trim() || roleInput.quantity < 1) return;
        setFormData({
            ...formData,
            requiredRoles: [...formData.requiredRoles, { role: roleInput.role.trim(), quantity: Number(roleInput.quantity) }]
        });
        setRoleInput({ role: '', quantity: 1 });
    };

    const removeRole = (index) => {
        setFormData({ ...formData, requiredRoles: formData.requiredRoles.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            await projectService.update(projectId, formData);
            navigate(`/projects/${projectId}`);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const isFormInvalid = () => {
        return !(
            formData.title &&
            formData.description &&
            formData.technologies.length > 0 &&
            formData.requiredRoles.length > 0
        );
    };

    if (loading) return <main className="container py-5">Loading...</main>;

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="w-100" style={{
                maxWidth: '800px'
                , maxWidth: '800px',
                marginTop: '30px'
            }}>
                <h1 className="h3 mb-3 text-center">Edit Project</h1>

                <div className="card shadow-sm">
                    <div className="card-body p-4">

                        {message && (
                            <div className="alert alert-danger py-2" role="alert">
                                {message}
                            </div>
                        )}

                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    id="title"
                                    className="form-control"
                                    value={formData.title}
                                    name="title"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    id="description"
                                    className="form-control"
                                    value={formData.description}
                                    name="description"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="technologies" className="form-label">Technologies</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id="technologies"
                                        className="form-control"
                                        value={techInput}
                                        onChange={(e) => setTechInput(e.target.value)}
                                        placeholder="e.g. React"
                                    />
                                    <button type="button" className="btn btn-outline-secondary" onClick={addTech}>
                                        Add
                                    </button>
                                </div>
                                {formData.technologies.length > 0 && (
                                    <div className="d-flex flex-wrap gap-2 mt-2">
                                        {formData.technologies.map(tech => (
                                            <span key={tech} className="badge text-bg-secondary d-flex align-items-center gap-1">
                                                {tech}
                                                <button
                                                    type="button"
                                                    className="btn-close btn-close-white"
                                                    style={{ fontSize: '0.6rem' }}
                                                    onClick={() => removeTech(tech)}
                                                ></button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Required Roles</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Role (e.g. Backend Developer)"
                                        value={roleInput.role}
                                        onChange={(e) => setRoleInput({ ...roleInput, role: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        min="1"
                                        className="form-control"
                                        style={{ maxWidth: '80px' }}
                                        value={roleInput.quantity}
                                        onChange={(e) => setRoleInput({ ...roleInput, quantity: e.target.value })}
                                    />
                                    <button type="button" className="btn btn-outline-secondary" onClick={addRole}>
                                        Add
                                    </button>
                                </div>
                                {formData.requiredRoles.length > 0 && (
                                    <ul className="list-group mt-2">
                                        {formData.requiredRoles.map((r, i) => (
                                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                                {r.role} — {r.quantity}
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    onClick={() => removeRole(i)}
                                                ></button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="d-flex gap-2">
                                <button disabled={isFormInvalid()} type="submit" className="btn btn-primary flex-grow-1">
                                    Save Changes
                                </button>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(`/projects/${projectId}`)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}