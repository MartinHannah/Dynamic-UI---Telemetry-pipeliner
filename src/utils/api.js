import axios from 'axios';
import * as components from './views';

const baseDomain = 'http://localhost:8080';

export const getViews = (id) => axios.get(`${baseDomain}/views/${id}`);
export const getUsers =  (id) => axios.get(`${baseDomain}/users/${id}`);



const getComponent = component => components[component];

export const getRoutes = async () => { 
    return getViews(1).then((result) => {
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