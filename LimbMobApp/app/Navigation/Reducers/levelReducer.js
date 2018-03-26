import { Level } from "../Actions/actionTypes";

const initialState = {
    currentLevel: '1'
  };
  
  const LevelReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CHANGE_LEVEL':
        return { ...state, currentLevel: action.payload };
      default:
        return state;
    }
  };
  
  export default LevelReducer;
