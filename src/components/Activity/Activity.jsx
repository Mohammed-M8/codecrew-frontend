import { useContext, useEffect, useState } from "react";
import taskService from '../../services/taskService';
import { UserContext } from "../../contexts/UserContext";
import TaskCard from "../TaskCard/TaskCard";

function Activity() {
    const { user } = useContext(UserContext);
    const [tasks, setTasks] = useState(null);


    useEffect(() => {
        const fetchAlltasks = async () => {
            const tasks = await taskService.activity(user._id);
            console.log("tasks", tasks);
            setTasks(tasks);
        };
        if (user) fetchAlltasks();
    }, [user]);

    const handleStatusChange = async (projectId, taskId) => {
        try {
            const updatedStatus = await taskService.updateStatus(projectId, taskId);
            setTasks(
                updatedStatus.status === "completed"
                    ? tasks.filter(
                        (task) => task._id !== updatedStatus._id
                    )
                    : tasks.map((task) => task._id === updatedStatus._id ? updatedStatus : task))
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



    if (!tasks) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "60vh" }}
            >
                <div className="spinner-border spinner-border-lg text-primary" role="status">
                </div>
            </div>
        );
    }
    return (<>
        <div className="cards-container" style={{
            width: "80%",
            margin: "0 auto"
        }}>
            {
                tasks.map((task) => {
                    return <TaskCard task={task} key={task._id}
                        handleStatusChange={handleStatusChange}
                        handleTaskDelelte={handleTaskDelelte}
                    />
                })
            }</div></>)
}
export default Activity;