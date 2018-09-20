import * as types from '../actions/views/actionTypes';

const initialState = {
  containers: [],
  views: [],
  currentView: {
    name: "Dashboard",
    widgets: [
    ]
  },
  menuOpen: true,
};

export default function viewReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_VIEWS_SUCCESS:
      return Object.assign({}, state, {
        views: action.views,
      });
    case types.UPDATE_CURRENT_VIEW:
      return Object.assign({}, state, {
        currentView: action.view,
      });
    case types.MENU_OPEN_CLOSE: 
      return Object.assign({}, state, {
        menuOpen: action.isOpen
      });
    case types.UPDATE_CONTAINERS:
      return Object.assign({}, state, {
        containers: action.containers
      });
    default:
      return state;
  }
}
