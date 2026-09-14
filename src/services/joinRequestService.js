import { getMyProjects } from './projectsService.js';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/projects`;

const getJoinRequests = async () => {
  try {
    const projects = await getMyProjects();
    const token = localStorage.getItem('token');

    const allRequests = [];

    for (const project of projects) {
      const res = await fetch(
        `${BASE_URL}/${project._id}/join-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const requests = await res.json();

      requests.forEach((request) => {
        allRequests.push({
          ...request,
          project,
        });
      });
    }

    return allRequests;
  } catch (error) {
    console.log(error);
  }
};

export { getJoinRequests };