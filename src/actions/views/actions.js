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

export const loadNewView = (widget) => { 
  return function (dispatch) { 
    console.log(widget);
    return api.loadWidget(widget).then((widget) => {
      console.log(widget);
      dispatch(updateCurrentView(widget));
    }).catch((err) => {
      throw (err);
    })
  }
}

export const modifyDashboardWidget = (widgetId, child, add, childOptions) => {
  return function (dispatch) {  
    return api.updateDashboardWidget(widgetId, child, add, childOptions).then((widget) => {
      dispatch(loadNewView(widget.data.id));
    });
  }
}

export const modifyWidgetOptions = (widgetId, options, parent, add) => { 
  return function(dispatch) { 
    return api.modifyOptions(widgetId, options).then(() => {  
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

