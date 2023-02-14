import { SET_USER_INFO, SET_USER_INFO_PROP, RESET_STORE } from '../actions/Constants';

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_USER_INFO:
            return action.userInfo;
        
        case SET_USER_INFO_PROP:
            return { ...state, [action.userInfo.prop]: action.userInfo.value};

        case RESET_STORE:
            return INITIAL_STATE;    
        
        default:
            return state;
    }
}