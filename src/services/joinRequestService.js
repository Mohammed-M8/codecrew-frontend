const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/projects`;

const getJoinRequests = async () => {
  try {
    const res = await fetch(`${BASE_URL}/join-requests`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const getMyJoinRequests = async () => {
  const res = await fetch(`${BASE_URL}/my-join-requests`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return await res.json();
};

const getProjectJoinRequests = async (projectId) => {
  try {
    const res = await fetch(`${BASE_URL}/${projectId}/join-requests`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const createJoinRequest = async (projectId, requestData) => {
  const res = await fetch(`${BASE_URL}/${projectId}/join-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(requestData),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.err);

  return data;
};

const updateJoinRequest = async (projectId, requestId, action) => {
  const res = await fetch(`${BASE_URL}/${projectId}/join-requests/${requestId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ action }),
  });

  return res.json();
};


const cancelJoinRequest = async (projectId, requestId) => {
  const res = await fetch(`${BASE_URL}/${projectId}/join-requests/${requestId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return res.json();
};

export { 
        getJoinRequests,
        getMyJoinRequests, 
        getProjectJoinRequests,
        createJoinRequest, 
        updateJoinRequest, 
        cancelJoinRequest
    };