import * as api from '../../utils/api';
import * as types from './actionTypes';

export const loadViewsSuccess = (views) => {
    return {
      type: types.LOAD_VIEWS_SUCCESS, views: views,
    };
}

export const loadViews = (id) => {
  return function (dispatch) {
    return api.getRoutes(id).then((views) => {
      dispatch(loadViewsSuccess(views));
    }).catch((err) => {
      throw (err);
    });
  };
};

//return a loaded widget for the view.
export const loadNewView = (widget) => { 
  return function (dispatch) { 
    return api.loadWidget(widget).then((widget) => {
      dispatch(updateCurrentView(widget));
    }).catch((err) => {
      throw (err);
    })
  }
}

//add or remove widgets from the dashboard
export const modifyDashboardWidget = (widgetId, child, add, childOptions) => {
  return function (dispatch) {  
    return api.updateDashboardWidget(widgetId, child, add, childOptions).then((widget) => {
      dispatch(loadNewView(widget.data.id));
    });
  }
}

//set options on a widget and then modify the dashboard widget.
export const modifyWidgetOptions = (widgetId, options, parent, add) => { 
  return function(dispatch) { 
    return api.setWidgetOptions(widgetId, options).then(() => {  
      dispatch(modifyDashboardWidget(parent, widgetId, add));
    })
  }

}


export const updateCurrentView = (view) => {
  return {
    type: types.UPDATE_CURRENT_VIEW, view,
  };
}

export const toggleMenu = (isOpen) => { 
    return { 
        type: types.MENU_OPEN_CLOSE, isOpen
    };
}

export const updateSection = (section) => { 
  console.log(section);
  return {
    type: types.UPDATE_SECTION, section
  }
}

// function() { 
    
//     return api.updateSectionWidgets(parent, section, widgets).then(() => {
//       console.log('modify section', section);
//     })