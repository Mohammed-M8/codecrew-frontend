// THIS IS A DEMO OF AN AUTHENTICATED FETCH REQUEST

import { getHeaders } from "../../helpers/getHeaders";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/protected`;
const USERS_URL=`${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;
const currentUser = async () => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    const res = await fetch(BASE_URL, config);

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const getUserById = async (userId) => {
  const res = await fetch(`${USERS_URL}/${userId}`, getHeaders());

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

export {
  currentUser, getUserById
};