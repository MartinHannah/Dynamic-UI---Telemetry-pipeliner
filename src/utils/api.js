import axios from 'axios';

const baseDomain = 'http://localhost:8080';

export const getViews = (id) => axios.get(`${baseDomain}/views/${id}`);
export const getUsers =  (id) => axios.get(`${baseDomain}/users/${id}`);
