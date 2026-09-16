import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import * as projectService from '../../services/projectsService';
import taskService from "../../services/taskService";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


const initialState = { title: '', description: '', assignedTo: [], dueDate: '' }

function EditTask() {
    const { projectId, taskId } = useParams();
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

    useEffect(() => {
        async function getTask() {
            const data = await taskService.show(projectId, taskId);
            setFormData({ ...data, dueDate: data.dueDate.split("T")[0] })
        }

        getTask();
    }, [taskId]);

    if (!formData || !project) return <LoadingSpinner />

    const handleUpdateTask = async (taskData) => {
        await taskService.updateTask(projectId, taskId, taskData);
    }
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    function handleSubmit(event) {
        event.preventDefault();
        handleUpdateTask(formData);
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
        <main className="container">
            <h1 className="h3 mb-4">Create Task</h1>
            <div className="row">
                <div className="col-12 col-md-10 col-lg-8">
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
                                                .filter((member) =>
                                                    !formData.assignedTo.some(
                                                        (assignedMember) =>
                                                            assignedMember._id === member.user._id
                                                    )
                                                )
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
                                        Update Task
                                    </button>
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </main >
    )

}
export default EditTask;