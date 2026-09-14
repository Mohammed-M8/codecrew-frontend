import { useContext, useEffect, useState } from "react";
import taskService from '../../services/taskService';
import { UserContext } from "../../contexts/UserContext";

function Activity() {
    const { user } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchAlltasks = async () => {
            const tasks = await taskService.activity(user._id)
            setTasks(tasks);
        };
        if (user) fetchAlltasks();
    }, [user]);

    {
        tasks.map((task) => {
            return (
                <div className="card task-card" key={task._id}>
                    <div className="card-body d-flex align-items-center">

                        <div className="task-strip"></div>


                        <div className="flex-grow-1 ms-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-1">{task.title}</h5>

                                <span className="badge text-bg-primary">
                                    {task.status}
                                </span>
                            </div>

                            <p className="mb-1 text-muted">
                                {task.project.title}
                            </p>

                            <small>
                                📅 Due: {task.dueDate}
                            </small>
                        </div>
                        <button className="btn btn-primary ms-3">
                            Start task
                        </button>

                    </div>
                </div>)
        })
    }
}
export default Activity;