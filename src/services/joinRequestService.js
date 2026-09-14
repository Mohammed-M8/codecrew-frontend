const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/projects`;

const getJoinRequests = async () => {
  try {
    const res = await fetch(`${BASE_URL}/join-requests`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getJoinRequests };