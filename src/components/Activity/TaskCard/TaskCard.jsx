import getRandomColor from "./taskColor";
import './TaskCard.css';

function TaskCard({ task, handleStatusChange }) {
    return (
        <div className="card task-card shadow-sm">
            <div className="card-body d-flex align-items-center">

                <div className="task-strip"
                    style={{ backgroundColor: getRandomColor() }}
                ></div>


                <div className="flex-grow-1 ms-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-1">{task.title}</h5>
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
                    {task.status !== "completed" &&
                        (<button
                            className={`btn ${task.status === "todo"
                                ? "btn-primary"
                                : "btn-success"
                                }`}
                            onClick={() => handleStatusChange(task.project._id, task._id)}
                        >
                            {task.status === "todo"
                                ? 'Start Task'
                                : 'Mark As Complete'}
                        </button>)}


                </div>
            </div>
        </div>)
}
export default TaskCard;