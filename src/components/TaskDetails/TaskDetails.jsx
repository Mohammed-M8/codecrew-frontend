import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import taskService from "../../services/taskService";

function TaskDetail() {
    const { projectId, taskId } = useParams();
    const [task, setTask] = useState(null);

    function getStatusColor(status) {
        if (status === "todo") return "#A78BFA";
        else if (status === "in-progress") return "#ffc107";
        else return "#28a745";
    }

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const taskData = await taskService.show(projectId, taskId);
                setTask(taskData);
            }

            catch (err) { console.log(err.message) }
        }
        fetchTask()
    }, [projectId, taskId])

    const handleStatusChange = async (projectId, taskId) => {
        try {
            const updatedStatus = await taskService.updateStatus(projectId, taskId);
            setTask(updatedStatus);
        }
        catch (err) { console.log(err.message) }
    }


    if (!task) return (<main>Loading...</main>)
    const isMissing = task.status !== 'completed' && new Date(task.dueDate) < new Date()

    return (
        <div className="container py-4">

            <Link
                to={-1}
                className="d-inline-block mb-2 text-decoration-none text-dark"
                style={{ fontSize: '20px' }}
            >
                ← Back
            </Link>

            <div className={`card ${isMissing ? "" : "shadow-sm"}`}
                style={{
                    boxShadow: "0 0 8px rgba(220, 53, 69, 0.7)"
                }}
            >

                <div className="card-header bg-white p-4">
                    <div className="d-flex justify-content-between align-items-start">

                        <div>
                            <h2 className="mb-2 d-flex align-items-start">{task.title}
                                {isMissing ?
                                    (<div className="missing d-flex align-items-center
                            "><i className="bi bi-exclamation-triangle-fill text-danger ms-2"></i>
                                        <span className="ms-2"
                                            style={{
                                                fontSize: "20px",
                                                color: "rgba(220, 53, 69, 0.6)",
                                                fontWeight: "bold"
                                            }}
                                        > Due date Missed</span></div>) : ""}
                            </h2>
                            <p className="text-muted mb-0">
                                {task.project.title}
                            </p>

                        </div>

                        <span
                            className="badge"
                            style={{
                                backgroundColor: getStatusColor(task.status),
                                color:
                                    task.status === "in-progress"
                                        ? "#000"
                                        : "#fff"
                            }}
                        >
                            {task.status}
                        </span>

                    </div>
                </div>

                <div className="card-body p-4">

                    <section className="mb-4">
                        <h5 className="mb-2">Description</h5>

                        <p className="text-muted mb-0">
                            {task.description}
                        </p>
                    </section>

                    <hr />

                    <section className="mb-4">

                        <h5 className="mb-3">Task Information</h5>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <small className="text-muted d-block">
                                    Project
                                </small>

                                <span>
                                    {task.project.title}
                                </span>
                            </div>

                            <div className="col-md-6 mb-3">
                                <small className="text-muted d-block">
                                    Due Date
                                </small>

                                <span>
                                    {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="col-md-6 mb-3">
                                <small className="text-muted d-block">
                                    Created
                                </small>

                                <span>
                                    {new Date(task.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="col-md-6 mb-3">
                                <small className="text-muted d-block">
                                    Status
                                </small>

                                <span>
                                    {task.status}
                                </span>
                            </div>

                        </div>

                    </section>

                    <hr />
                    <section className="mb-4">

                        <h5 className="mb-3">Assigned To</h5>

                        <div className="d-flex flex-wrap gap-2">

                            {task.assignedTo.map((member) => (
                                <span
                                    key={member._id}
                                    className="badge bg-light text-dark border p-2"
                                >
                                    {member.username}
                                </span>
                            ))}

                        </div>

                    </section>

                    <hr />

                    {task.status !== "completed" && (
                        <div className="d-flex justify-content-end">

                            <button
                                className={`btn ${task.status === "todo"
                                    ? "btn-primary"
                                    : "btn-success"
                                    }`}
                                onClick={() => handleStatusChange(task.project._id, task._id)}
                            >
                                {task.status === "todo"
                                    ? "Start Task"
                                    : "Mark As Complete"}
                            </button>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
export default TaskDetail;