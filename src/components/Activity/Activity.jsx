import { useContext, useEffect, useState } from "react";
import taskService from '../../services/taskService';
import { UserContext } from "../../contexts/UserContext";
import TaskCard from "../TaskCard/TaskCard";

function Activity() {
    const { user } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);


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

    if (!tasks) return (<main>Loading...</main>)

    return (<>
        <div className="cards-container" style={{
            width: "80%",
            margin: "0 auto"
        }}>
            {
                tasks.map((task) => {
                    return <TaskCard task={task} key={task._id}
                        handleStatusChange={handleStatusChange} />
                })
            }</div></>)
}
export default Activity;