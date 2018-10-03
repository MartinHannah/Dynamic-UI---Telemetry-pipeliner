import axios from 'axios';
import * as components from './views';

const baseDomain = 'http://localhost:8080';

//Calls to json
const getViews = () => axios.get(`${baseDomain}/routes/`);
const getWidget = (id) => axios.get(`${baseDomain}/widgets/${id}`);
const updateWidget = (id, data) => axios.put(`${baseDomain}/widgets/${id}`, data);
export const getBuildings = () => axios.get(`${baseDomain}/buildings/`);
export const getBuilding = (id) => axios.get(`${baseDomain}/buildings/${id}`);
export const getEnergyData = (id) => axios.get(`${baseDomain}/${id}`)

const getComponent = component => components[component];

//Go through the views and 
export const getRoutes = async (id) => { 
    return getViews(id).then((result) => {
        return result.data;
    });
}

//Get the widget we want to load and then go through all the child widgets 
//and convert them to loadable components
export const loadWidget = async (widgetId) => { 
    return getWidget(widgetId).then(async (result) => { 
        const widget = result.data;
        //If this widget has a component, get it from the views
        if(widget.component) widget.component = getComponent(widget.component);
      
        let parsedWidgets = [];
        //If this widget has children -> map through and get the components for inner widgets
        if(widget.widgets) {             
            parsedWidgets = await mapWidgets(widget.widgets);
            widget.widgets = parsedWidgets;
        }

        if(widget.availableWidgets) { 
            parsedWidgets = await mapWidgets(widget.availableWidgets);
            widget.availableWidgets = parsedWidgets;
        }
        return widget;
    })
}

//Remove the specified child widget from the dashboard
export const updateDashboardWidget = async(widgetId, child, add = true, childOptions = "") => { 
    return getWidget(widgetId).then(async(result) => {     
        const widget = result.data;
        //if there are no child widgets, do nothing for now
        if(!widget.widgets) 
            return;

        if(add) { 
            return getWidget(child).then((wid) => { 
                let dashboardWidget =  {
                    widget: child, 
                    options: childOptions
                }
                widget.widgets.push(dashboardWidget);
                if(!wid.data.allowMultiple) { 
                    widget.availableWidgets = removeWidget(widget.availableWidgets, child);
                }
                return updateWidget(widgetId, widget);
            }); 
            
        } else { 
            widget.widgets = removeWidget(widget.widgets, child);
            return updateWidget(widgetId, widget);
        }
    })
}

export const modifyOptions = async(widgetId, options) => { 
    return getWidget(widgetId).then(async(result) => {
        const widget = result.data;

        //If there are no option on this widget ,do nothing.
        if(!widget.options)
        return;

        widget.options = Object.assign(widget.options, options)
        return updateWidget(widgetId, widget);
    })
}


//find the widget in the array by the id and then remove it
const removeWidget = (array, widgetId) => { 
    let index;
    for (var i=0; i < array.length; i++){
        if(array[i].widget == widgetId) { 
            index = i;
        }
    }
    array.splice(index, 1);
    return array;
}

//load the widgets in the array.
const mapWidgets = async (array) => { 
    return Promise.all(array.map(async (widget) => {
        const widgetFinal = await loadWidget(widget.widget)
        return {
            widget: widgetFinal,
            options: widget.options
        }
    }));
} 
