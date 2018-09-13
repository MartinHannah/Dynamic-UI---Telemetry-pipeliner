import * as components from './views';
import { getViews } from './src/utils/api';

const getComponent = component => components[component];

export const getRoutes = async () => { 
    const { routes } = await getViews(1);

    const parsedRoutes = routes.map(route =>({
        path: route.path,
        name: route.displayName,
        exact: route.exact || false,
        component: getComponent(route.component)
    }));
    return parsedRoutes;
}