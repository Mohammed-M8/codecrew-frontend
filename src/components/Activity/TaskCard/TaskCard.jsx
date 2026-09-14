import getRandomColor from "./taskColor";
import './TaskCard.css';

function TaskCard({ task }) {
    return (
        <div className="card task-card">
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
                                        : "#8d66d6"
                        }}
                    >
                        {task.status}
                    </span>
                    <button className="btn btn-primary ms-3">
                        Start task
                    </button>

                </div>
            </div>
        </div>)
}
export default TaskCard;