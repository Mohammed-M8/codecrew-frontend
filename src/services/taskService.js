const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

const activity = async (userId) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}/activity`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
        );
        await res.json();
    }
    catch (err) {
        console.log(err)
    }
}
export { activity };