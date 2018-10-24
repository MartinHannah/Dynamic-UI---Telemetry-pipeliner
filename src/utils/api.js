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
export const getChartData  = (data) => axios.get(`${baseDomain}/${data}/`);

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
        if(widget.widgets) {             
            parsedWidgets = await mapWidgets(widget.widgets);
            widget.widgets = parsedWidgets;
        }

        if(widget.sections) { 
            for(let i = 0; i < widget.sections.length; i++) { 
                if(widget.sections[i].widgets !== undefined) { 
                    parsedWidgets = await mapWidgets(widget.sections[i].widgets);
                    widget.sections[i].widgets = parsedWidgets;
                }

            }
        }

        if(widget.availableWidgets) { 
            parsedWidgets = await mapWidgets(widget.availableWidgets);
            widget.availableWidgets = parsedWidgets;
        }
        return widget;
    })
}

//Add or Remove a dashboard widget
export const updateDashboardWidget = async(widgetId, child, add = true, childOptions = "") => { 
    return getWidget(widgetId).then(async(result) => {     
        const widget = result.data;
        console.log(widget);

        if(add) { 
            console.log('add');
            return getWidget(child).then((wid) => { 
                console.log(wid);
                let dashboardWidget =  {
                    widget: child, 
                    options: childOptions
                }
                //Need to add it to the right sections instead... 
                widget.sections[0].widgets.push(dashboardWidget);
                if(!wid.data.allowMultiple) { 
                    widget.availableWidgets = removeWidget(widget.availableWidgets, child);
                }
                return updateWidget(widgetId, widget);
            }); 
            
        } else { 
           // widget.sections = removeWidget(widget.widgets, child);
            return updateWidget(widgetId, widget);
        }
    })
}

//set the options on the widget
export const setWidgetOptions = async(widgetId, options) => { 
    return getWidget(widgetId).then(async(result) => {
        const widget = result.data;

        //If there are no option on this widget ,do nothing.
        if(!widget.options)
        return;

        widget.options = Object.assign(widget.options, options)
        return updateWidget(widgetId, widget);
    })
}


export const updateSectionWidgets = (parent, sectionId, widgets) => { 
    return getWidget(parent).then((result) => { 
        const widget = result.data;
        console.log(widget);
        console.log(sectionId);
        const section = widget.sections.find((element) => { 
            return element.id === sectionId;
        })
        console.log(section);
        console.log('before: ', section.widgets);
        console.log(widgets);
        section.widgets = widgets;
       // console.log(section.widgets);
        console.log(widget);
        widget.sections.splice(section.id, 1, section);
        console.log(widget);
        console.log('now need to update parent widget');
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
        };
    }));
} 
