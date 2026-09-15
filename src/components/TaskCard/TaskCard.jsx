import getRandomColor from "./taskColor";
import './TaskCard.css';
import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function TaskCard({ task, handleStatusChange, handleTaskDelelte }) {
    const { user } = useContext(UserContext);
    const isMissing = task.status !== 'completed' && new Date(task.dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
    const isCreator = task.createdBy === user._id;


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
                        {isCreator ?
                            <> <Link
                                to={`/projects/${task.project._id}/tasks/${task._id}/edit`}
                                className="btn btn-outline-primary ms-2"
                            >
                                <i className="bi bi-pencil"></i>
                                <span className="ms-1">Edit</span>
                            </Link>
                                <button
                                    onClick={() => handleTaskDelelte(task.project._id, task._id)}
                                    className="btn btn-outline-danger ms-2">
                                    <i className="bi bi-trash"></i>
                                    Delete
                                </button></>
                            : ''}
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