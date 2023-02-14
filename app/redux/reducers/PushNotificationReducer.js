import { SET_PUSH_NOTIFICATIONS, RESET_STORE } from '../actions/Constants';

export default (state = {}, action = {}) => {
    switch (action.type) {
        case SET_PUSH_NOTIFICATIONS:
            return action.notificationData;

        case RESET_STORE:
            return {};

        default:
            return state || [];
    }
}