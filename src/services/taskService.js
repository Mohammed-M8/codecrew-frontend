const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

const activity = async (userId) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}/activity`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
        );
        if (!res.ok) {
            throw new Error(`Failed to fetch activity: ${res.status}`);
        }
        return await res.json();
    }
    catch (err) {
        console.log(err)
    }
}
const index = async (projectId) => {
    try {
        const res = await fetch(`${BASE_URL}/projects/${projectId}/tasks`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
        );
        if (!res.ok) {
            throw new Error(`Failed to fetch activity: ${res.status}`);
        }
        return await res.json();
    }
    catch (err) {
        console.log(err)
    }
}

const updateStatus = async (projectId, taskId) => {
    try {
        const res = await fetch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}`,
            {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
        );

        return await res.json();
    }
    catch (err) {
        console.log(err)
    }
}

const show = async (projectId, taskId) => {
    try {
        const res = await fetch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}`,
            {
                method: 'GET',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
        );

        return await res.json();
    }
    catch (err) {
        console.log(err)
    }
}
export default { activity, updateStatus, show, index };