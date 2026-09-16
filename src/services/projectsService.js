import { getHeaders } from "../../helpers/getHeaders";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/projects`;

const index = async (search, page = 1) => {
    try {
        let url = `${BASE_URL}?page=${page}`;

        if (search) {
            url += `&search=${search}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            const error = new Error(data.err || 'Something went wrong');
            error.status = res.status;
            throw error;
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const userProjects = async (page = 1) => {
    try {
        const res = await fetch(`${BASE_URL}/me?page=${page}`, getHeaders());

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            const error = new Error(data.err || 'Something went wrong');
            error.status = res.status;
            throw error;
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const show = async (projectId) => {
    const res = await fetch(`${BASE_URL}/${projectId}`);

    if (res.status === 404) {
        const error = new Error('Not found');
        error.status = 404;
        throw error;
    }

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const error = new Error(data.err || 'Something went wrong');
        error.status = res.status;
        throw error;
    }

    return res.json();
};

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

const update = async (projectId, formData) => {
    const res = await fetch(`${BASE_URL}/${projectId}`, {
        method: 'PUT',
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

const removeMember = async (projectId, memberId) => {
    const res = await fetch(`${BASE_URL}/${projectId}/members/${memberId}`, {
        method: 'DELETE',
        ...getHeaders()
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.err || 'Something went wrong');
    }

    return true;
};

export { index, userProjects, show, create, deleteProject, update,removeMember }
