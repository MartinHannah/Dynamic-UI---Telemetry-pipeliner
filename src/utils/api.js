import axios from 'axios';
import * as components from './views';

const baseDomain = 'http://localhost:8080';

//Get the views for this user
export const getViews = (id) => axios.get(`${baseDomain}/routes/${id}`);
//Get the containers specific to this user.
//export const getContainer =  (id) => axios.get(`${baseDomain}/users/${id}`);

export const getUser = (id) => axios.get(`${baseDomain}/users/${id}`);


const getComponent = component => components[component];

export const getRoutes = async (id) => { 
    return getViews(id).then((result) => {
        const routes = result.data.routes;
        const parsedRoutes = routes.map(route =>({
            path: route.path,
            displayName: route.displayName,
            exact: route.exact || false,
            icon: route.icon,
            component: getComponent(route.component)
        }));
        return parsedRoutes;
    });
}

export const getUserViews = async (id) => {
    return getUser(id).then((result) => {
        const containers = result.data.containers;
        const parsedContainers = containers.map(container => ({
            id: container.id, 
            widgets: container.widgets.map(widget => (
                getComponent(widget)
            ))
        }));
        return parsedContainers;
    })
}