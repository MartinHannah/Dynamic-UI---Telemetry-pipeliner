import axios from 'axios';


const baseDomain = 'http://localhost:3000';

//Calls to json
export const getRoutes = () => axios.get(`${baseDomain}/routes`);
//const getContainers = () => axios.get(`${baseDomain}/containers`);

//Generic get
export const get = (data) => axios.get(`${baseDomain}/${data}`);

