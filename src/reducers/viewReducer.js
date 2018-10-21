import * as types from '../actions/views/actionTypes';

const initialState = {
  views: [],
  currentView: {
    id: "Dashboard",
    sections: [
    ],
  },
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
      });
    case types.MENU_OPEN_CLOSE: 
      return Object.assign({}, state, {
        menuOpen: action.isOpen
      });
    case types.UPDATE_SECTION: 
      return Object.assign({}, state, { 
        currentView: {
          ...state.currentView,
          sections: state.currentView.sections.map((item, index) => { 
            if(index == action.section.id) { 
              return action.section;
            }
            return item;
          })
        }
      })
    default:
      return state;
  }
}

export default viewReducer;
