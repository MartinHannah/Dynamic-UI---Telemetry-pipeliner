import * as types from '../actions/views/actionTypes';

const initialState = {
  viewsLoaded: false,
  views: [],
  currentView: 'Dashboard',
  menuOpen: true,
};

export default function viewReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_VIEWS_SUCCESS:
      return Object.assign({}, state, {
        views: action.views,
        viewsLoaded: true,
      });
    case types.UPDATE_CURRENT_VIEW:
      return Object.assign({}, state, {
        currentView: action.name,
      });
    case types.MENU_OPEN_CLOSE: 
      return Object.assign({}, state, {
        menuOpen: action.isOpen
      });
    default:
      return state;
  }
}
