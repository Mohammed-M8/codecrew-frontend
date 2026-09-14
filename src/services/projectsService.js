import { getHeaders } from "../../helpers/getHeaders";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/projects`;

const index = async () => {
    try {
        const data = await fetch(BASE_URL).then(res => res.json())
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

export { index, userProjects, show, create }
