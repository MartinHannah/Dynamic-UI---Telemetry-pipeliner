import * as api from '../../utils/api';
import * as types from '../actionTypes';

export const loadViewsSuccess = (views) => {
    return {
      type: types.LOAD_VIEWS_SUCCESS, views: views,
    };
}

export const loadViews = () => {
  return function (dispatch) {
    return api.getMenus().then((views) => {
      dispatch(loadViewsSuccess(views.data));
      dispatch(updateRoute(1));
    }).catch((err) => {
      throw (err);
    });
  };
};


export const updateRoute = (routeId) => {
  console.log('loading route', routeId)
  return {
    type: types.UPDATE_CURRENT_VIEW, routeId,
  };
}

export const addRoute = (routeInfo) => { 
  return function (dispatch) {
      return api.addRoute(routeInfo).then((route) => {
        dispatch(addRouteSuccess(route));
      }).catch((err) => {
        throw (err);
      });
    };
}

export const editRouteSuccess = (routeId, routeInfo) => { 
  return { 
    type: types.EDIT_ROUTE_SUCCESS, routeInfo
  }
}

export const addRouteSuccess = (routeInfo) => {
  return { 
    type: types.ADD_ROUTE_SUCCESS, routeInfo
  }
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