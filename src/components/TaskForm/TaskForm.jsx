import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router";
import * as projectService from '../../services/projectsService';
import taskService from "../../services/taskService";


const initialState = { title: '', description: '', assignedTo: [], dueDate: '' }

function TaskForm() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [formData, setFormData] = useState(initialState);
    const [selectedMember, setSelectedMember] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        async function getProject() {
            const data = await projectService.show(projectId);
            setProject(data);
        }

        getProject();
    }, [projectId]);

    const handleAddTask = async (taskData) => {
        await taskService.createTask(projectId, taskData);
    }
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    function handleSubmit(event) {
        event.preventDefault();
        handleAddTask(formData);
        setFormData(initialState);
        navigate(`/projects/${projectId}/tasks`);
    }
    function addMember() {
        const findMember = project.members.find((member) => selectedMember === member.user._id);
        setFormData({ ...formData, assignedTo: [...formData.assignedTo, findMember.user] })
        setSelectedMember('');

    }
    function removeMember(removeMember) {
        const updatedMembers = formData.assignedTo.filter((member) => member !== removeMember)
        setFormData({ ...formData, assignedTo: updatedMembers })

    }
    const isFormInvalid = () => {
        return !(
            formData.title &&
            formData.description &&
            formData.assignedTo.length > 0
        );
    };

    return (
        <div className="d-flex justify-content-center align-items-center"
        >
            <div className="w-100" style={{
                maxWidth: '800px'
                , maxWidth: '800px',
                marginTop: '30px'
            }}>
                <h1 className="h3 mb-4 mt-2 text-center">Create Task</h1>

                <div className="card shadow-sm">
                    <div className="card-body p-4">

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
                                <label htmlFor="description" className="form-label">Description</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    id="description"
                                    className="form-control"
                                    value={formData.description}
                                    name="description"
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="mb-3">
                                <label htmlFor="assignedTo" className="form-label">Assigned To</label>
                                <div className="input-group">
                                    <select onChange={(e) => setSelectedMember(e.target.value)} value={selectedMember} className="form-select" aria-label="assignedTo">
                                        <option value='' disabled>Choose a member</option>
                                        {project?.members
                                            .filter((member) => !formData.assignedTo.includes(member.user))
                                            .map((member) => (
                                                <option key={member.user._id} value={member.user._id}>
                                                    {member.user.username}
                                                </option>
                                            ))}
                                    </select>
                                    <button type="button" disabled={selectedMember === ''} className="btn btn-outline-secondary" onClick={addMember}>
                                        Add
                                    </button>
                                </div>

                            </div>

                            <div className="mb-4">
                                {formData.assignedTo.length > 0 && (
                                    <ul className="list-group mt-2">
                                        {formData.assignedTo.map((member) => (
                                            <li key={member._id} className="list-group-item d-flex justify-content-between align-items-center">
                                                {member.username}
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    onClick={() => removeMember(member)}
                                                ></button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="dueDate" className="form-label">
                                    Due Date
                                </label>

                                <input
                                    type="date"
                                    id="dueDate"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split("T")[0]}
                                    className="form-control"
                                />
                            </div>

                            <div className="d-flex gap-2">
                                <button disabled={isFormInvalid()} type="submit" className="btn btn-primary flex-grow-1">
                                    Create Task
                                </button>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default TaskForm