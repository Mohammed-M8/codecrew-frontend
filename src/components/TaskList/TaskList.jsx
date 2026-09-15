import { useContext, useEffect, useState } from "react";
import taskService from '../../services/taskService';
import { UserContext } from "../../contexts/UserContext";
import TaskCard from "../TaskCard/TaskCard";
import { useParams } from "react-router";

function TaskList() {
    const { user } = useContext(UserContext);
    const [tasks, setTasks] = useState(null);
    const { projectId, taskId } = useParams();
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchAlltasks = async () => {
            const tasks = await taskService.index(projectId, taskId);
            console.log("tasks", tasks);
            setTasks(tasks);
        };
        if (user) fetchAlltasks();
    }, [user]);

    const handleStatusChange = async (projectId, taskId) => {
        try {
            const updatedStatus = await taskService.updateStatus(projectId, taskId);
            setTasks(tasks.map((task) => task._id === updatedStatus._id ? updatedStatus : task))
        }
        catch (err) { console.log(err.message) }
    }
    const handleTaskDelelte = async (projectId, taskId) => {
        try {
            await taskService.deleteTask(projectId, taskId);
            setTasks(tasks.filter((task) => task._id !== taskId))
        }
        catch (err) { console.log(err.message) }
    }


    if (!tasks) return (<div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
    >
        <div className="spinner-border spinner-border-lg text-primary" role="status">
        </div>
    </div>)

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        return task.status === filter
    })

    return (<>

        <div className="d-flex align-items-center gap-2 mb-4">
            <label htmlFor="statusFilter" className="fw-semibold">
                Filter:
            </label>

            <select
                id="statusFilter"
                className="form-select"
                style={{ width: "200px" }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="all">All Tasks</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
        </div>
        <div className="cards-container" style={{
            width: "80%",
            margin: "0 auto"
        }}>


            {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                    <TaskCard
                        task={task}
                        key={task._id}
                        handleStatusChange={handleStatusChange}
                        handleTaskDelelte={handleTaskDelelte}
                    />
                ))
            ) : (
                <div className="alert alert-light text-center py-4" role="alert">
                    <h5 className="mb-2">No tasks found</h5>
                    <p className="text-muted mb-0">
                        You don't have any tasks at the moment.
                    </p>
                </div>
            )}
        </div></>)
}
export default TaskList;