import { useContext, useEffect, useState } from "react";
import taskService from '../../services/taskService';
import { UserContext } from "../../contexts/UserContext";
import TaskCard from "./TaskCard/TaskCard";

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

    return (<>

        {
            tasks.map((task) => {
                return <TaskCard task={task} key={task._id} />
            })
        }</>)
}
export default Activity;