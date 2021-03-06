import * as api from '../../utils/api';
import * as types from './actionTypes';

export function loadViewsSuccess(views) {
    return {
      type: types.LOAD_VIEWS_SUCCESS, views: views,
    };
}

export const loadViews = function (id) {
  return function (dispatch) {
    return api.getRoutes(id).then((views) => {
      dispatch(loadViewsSuccess(views));
    }).catch((error) => {
      throw (error);
    });
  };
};

export function updateCurrentView(name) {
  return {
    type: types.UPDATE_CURRENT_VIEW, name,
  };
}

export function toggleMenu(isOpen) { 
    return { 
        type: types.MENU_OPEN_CLOSE, isOpen
    };
}
