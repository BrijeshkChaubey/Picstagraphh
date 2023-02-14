import { SET_NAVIGATION, RESET_STORE } from '../actions/Constants';

const INITIAL_STATE = {
    rootNavigation: {},
    profileTab: {},
    settingsNavigation: {}
}

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_NAVIGATION:
            let newState = {...state, [action.data.navigationType]: action.data.navigationRoute}
            return newState;

        case RESET_STORE:
            return INITIAL_STATE;

        default:
            return state;
    }
}