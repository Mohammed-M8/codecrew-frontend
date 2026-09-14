const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/projects`;

const index = async () => {
    try {
        const data = await fetch(BASE_URL).then(res => res.json())
        return data;
    } catch (error) {
        console.log(error)
    }
}

const getMyProjects = async () => {
    try {
        const res = await fetch(`${BASE_URL}/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        const data = await res.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}

export {index, getMyProjects}
