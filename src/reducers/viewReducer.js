import update from 'react-addons-update';
import * as types from '../actions/actionTypes';
import { getObjectByProp } from '../utils/util';


const initialState = {
  views: [],
  currentView: {
    id: 0,
    label: "Dashboard"
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
      if(action.routeId == 'pages' || action.routeId == 'widgets') { 
        return Object.assign({}, state, { 
          currentView: { 
            id: action.routeId,
            label: 'Manage'
          }
        })
      } else { 
        return Object.assign({}, state, {
          currentView: getObjectByProp(state.views, 'id', action.routeId),
          currentSections: getObjectByProp(state.views, 'id', action.routeId).container.sections,
        });
      }

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
