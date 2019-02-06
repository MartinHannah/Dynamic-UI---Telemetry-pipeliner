import axios from 'axios';

//Create an instance with the appropriate headers. 
const baseDomain = 'http://localhost:3001';

//Menus 
export const getMenus = () => axios.get(`${baseDomain}/menus`);

//Routes
export const getRoutes = () => axios.get(`${baseDomain}/routes`);
export const getRoute = (id) => axios.get(`${baseDomain}/routes/${id}`);
export const addRoute = (body) => axios.post(`${baseDomain}/routes`, body);
export const editRoute = (id, body) => axios.put(`${baseDomain}/routes/${id}`, body);
export const deleteRoute = (id) => axios.delete(`${baseDomain}/routes/${id}`);

export const getContainer = (id) => axios.get(`${baseDomain}/containers?where[uiRouteId]=${id}`)
export const addContainer = (body) => axios.post(`${baseDomain}/containers`, body)
//Sections
export const getSections = () => axios.get(`${baseDomain}/sections`);
export const getSectionsByContainer = (id) => axios.get(`${baseDomain}/sections?where[uiContainerId]=${id}`);
export const getSection = (id) => axios.get(`${baseDomain}/sections/${id}`);
export const addSection = (body) => axios.post(`${baseDomain}/sections`, body);
export const editSection = (id, body) => axios.put(`${baseDomain}/sections/${id}`, body);
export const deleteSection = (id) => axios.delete(`${baseDomain}/sections/${id}`);

//Widgets 
export const getWidgets = () => axios.get(`${baseDomain}/widgets`);
export const getWidget = (id) => axios.get(`${baseDomain}/widgets/${id}`);

// Widget Instances
export const getWidgetInstances = () => axios.get(`${baseDomain}/instances`);
export const getWidgetBySection = (id) => axios.get(`${baseDomain}/instances?where[uiSectionId]=${id}`);
export const getWidgetInstance = (id) => axios.get(`${baseDomain}/instances/${id}`);
export const addWidgetInstance = (body) => axios.post(`${baseDomain}/instances`, body);
export const editWidgetInstance = (id, body) => axios.put(`${baseDomain}/instances/${id}`, body);
export const deleteWidgetInstance = (id) => axios.put(`${baseDomain}/instances/${id}`);

//Widget Options
export const getWidgetConfigs = () => axios.get(`${baseDomain}/widgets/options`);
export const getWidgetConfig = (id) => axios.get(`${baseDomain}/widgets/options?where[uiWidgetId]=${id}`);
export const addWidgetConfig = (body) => axios.post(`${baseDomain}/widgets/options`, body);
export const editWidgetConfig = (id, body) => axios.put(`${baseDomain}/widgets/options/${id}`, body);
export const deleteWidgetConfig = (id) => axios.delete(`${baseDomain}/widgets/options/${id}`);

//Widget Instance Options 
export const getWidgetInstanceConfigs = () => axios.get(`${baseDomain}/instances/options`);
export const getWidgetInstanceConfig = (id) => axios.get(`${baseDomain}/instances/${id}/options`);
export const addWidgetInstanceConfig = (body) => axios.post(`${baseDomain}/instances/options`, body);
export const editWidgetInstanceConfig = (id, body) => axios.put(`${baseDomain}/instances/options/${id}`, body);
export const deleteWidgetInstanceConfig = (id) => axios.delete(`${baseDomain}/instances/options/${id}`);


export const getCustomers = () => axios.get(`${baseDomain}/customers`);


//const getContainers = () => axios.get(`${baseDomain}/containers`);

//Generic get
export const get = (data) => axios.get(`${baseDomain}${data}`);

