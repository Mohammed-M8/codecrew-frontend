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
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const data = await fetch(`${BASE_URL}/me`, config).then(res => res.json())
        return data;
    } catch (error) {
        console.log(error)
    }
}

export { index, userProjects }
