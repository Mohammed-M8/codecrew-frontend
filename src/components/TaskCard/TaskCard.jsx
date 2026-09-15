import getRandomColor from "./taskColor";
import './TaskCard.css';
import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function TaskCard({ task, handleStatusChange }) {
    const { user } = useContext(UserContext);
    const isMissing = task.status !== 'completed' && new Date(task.dueDate) < new Date()
    return (
        <div className={`card task-card ${isMissing ? "missed-task" : "shadow-sm"}`}>
            <div className="card-body d-flex align-items-center">

                <div className="task-strip"
                    style={{ backgroundColor: getRandomColor() }}
                ></div>


                <div className="flex-grow-1 ms-3">
                    <div className="d-flex align-items-center">
                        <Link
                            to={`/projects/${task.project._id}/tasks/${task._id}`}>
                            <h5 className="mb-1">{task.title}</h5>
                        </Link>
                        {isMissing ?
                            (<div className=" missing d-flex align-items-center
                            "><i className="bi bi-exclamation-triangle-fill text-danger ms-2"></i>
                                <span className="ms-2"
                                > Due date Missed</span></div>) : ""}
                    </div>

                    <p className="mb-1 text-muted">
                        {task.project.title}
                    </p>

                    <small>
                        📅 Due: {new Date(task.dueDate).toLocaleDateString()}
                    </small>
                </div>
                <div className="task-actions">
                    <span className="badge"
                        style={{
                            backgroundColor:
                                task.status === "completed"
                                    ? "#28a745"
                                    : task.status === "in-progress"
                                        ? "#ffc107"
                                        : "#D65DB1"
                        }}
                    >
                        {task.status}
                    </span>
                    {(task.status !== "completed"
                        && task.assignedTo.some((member) =>
                            member._id.toString() === user._id.toString())) &&
                        (<button
                            className={`btn ${task.status === "todo"
                                ? "btn-primary"
                                : "btn-success"
                                }`}
                            onClick={() => handleStatusChange(task.project._id, task._id)}
                        >
                            {task.status === "todo"
                                ? 'Start Task'
                                : 'Mark As Completed'}
                        </button>)}


                </div>
            </div>
        </div>)
}
export default TaskCard;