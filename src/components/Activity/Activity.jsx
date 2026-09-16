import { useContext, useEffect, useState } from "react";
import taskService from '../../services/taskService';
import { UserContext } from "../../contexts/UserContext";
import TaskCard from "../TaskCard/TaskCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function Activity() {
    const { user } = useContext(UserContext);
    const [tasks, setTasks] = useState(null);


    useEffect(() => {
        const fetchAlltasks = async () => {
            const tasks = await taskService.activity(user._id);
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



    if (!tasks) return <LoadingSpinner />

    return (<>
        <h1 className="mb-2 mt-3">Tasks</h1>

        <div className="cards-container" style={{
            width: "80%",
            margin: "0 auto"
        }}>            {
                tasks.length > 0 ?
                    (tasks.map((task) => {
                        return <TaskCard task={task} key={task._id}
                            handleStatusChange={handleStatusChange}
                            handleTaskDelelte={handleTaskDelelte}
                        />
                    }))
                    : (<div className="alert alert-light text-center py-4" role="alert">
                        <h5 className="mb-2">No tasks found</h5>
                        <p className="text-muted mb-0">
                            You don't have any tasks at the moment.
                        </p>
                    </div>)
            }</div></>)
}
export default Activity;