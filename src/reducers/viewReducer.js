import update from 'react-addons-update';
import * as types from '../actions/views/actionTypes';


const initialState = {
  views: [],
  currentView: {
    id: "Dashboard",
  },
  currentSections: [

  ],
  menuOpen: true,
};

const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_VIEWS_SUCCESS:
      return Object.assign({}, state, {
        views: action.views,
      });
    case types.UPDATE_CURRENT_VIEW:
      return Object.assign({}, state, {
        currentView: action.view,
        currentSections: action.view.sections,
      });
    case types.MENU_OPEN_CLOSE: 
      return Object.assign({}, state, {
        menuOpen: action.isOpen
      });
    case types.UPDATE_SECTION: 
      return update(state, {
        currentSections: {
            [action.section.id]: {
              widgets: { $set: action.section.widgets}
            }
        }
      });
    default:
      return state;
  }
}

export default viewReducer;
