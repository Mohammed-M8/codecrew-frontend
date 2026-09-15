import { getHeaders } from "../../helpers/getHeaders";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/projects`;

const index = async (search) => {
    try {
        let url = BASE_URL
        if (search) {
            url = url + `?search=${search}`
        }
        const data = await fetch(`${url}`).then(res => res.json())
        return data;
    } catch (error) {
        console.log(error)
    }
}

const userProjects = async () => {
    try {
        const data = await fetch(`${BASE_URL}/me`, getHeaders()).then(res => res.json())
        return data;
    } catch (error) {
        console.log(error)
    }
}

const show = async (projectId) => {
    try {
        const data = await fetch(`${BASE_URL}/${projectId}`).then(res => res.json())
        return data;
    } catch (error) {
        console.log(error)
    }
}

const create = async (formData) => {
    const res = await fetch(`${BASE_URL}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.err || 'Something went wrong');
    }

    return data;
};

const deleteProject = async (projectId) => {
    const res = await fetch(`${BASE_URL}/${projectId}`, {
        method: 'DELETE',
        ...getHeaders()
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.err || 'Something went wrong');
    }

    return true;
};

export { index, userProjects, show, create, deleteProject }
