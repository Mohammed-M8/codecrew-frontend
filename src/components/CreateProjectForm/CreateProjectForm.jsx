import { useState } from "react";
import * as projectService from '../../services/projectsService';
import { useNavigate } from "react-router";

export default function CreateProjectForm() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [techInput, setTechInput] = useState('');
    const [roleInput, setRoleInput] = useState({ role: '', quantity: 1 });

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: [],
        requiredRoles: [],
        ownerRole: '',
    });

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
            await projectService.create(formData);
            navigate('/projects');
        } catch (error) {
            setMessage(error.message);
        }
    };

    const isFormInvalid = () => {
        return !(
            formData.title &&
            formData.description &&
            formData.technologies.length > 0 &&
            formData.requiredRoles.length > 0 &&
            formData.ownerRole.trim()
        );
    };

    return (
        <main className="container">
            <h1 className="h3 mb-4">Create Project</h1>
            <div className="row">
                <div className="col-12 col-md-10 col-lg-8">
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
                                    <label htmlFor="ownerRole" className="form-label">Your Role on This Project</label>
                                    <input
                                        type="text"
                                        id="ownerRole"
                                        className="form-control"
                                        value={formData.ownerRole}
                                        name="ownerRole"
                                        onChange={handleChange}
                                        placeholder="e.g. Team Lead, Full Stack Developer"
                                        required
                                    />
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
                                        Create Project
                                    </button>
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/projects')}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}