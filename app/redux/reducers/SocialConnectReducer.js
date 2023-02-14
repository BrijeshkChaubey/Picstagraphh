import { SOCIAL_CONNECT_SET, RESET_STORE } from '../actions/Constants';

export default (state = [], action = {}) => {
    switch (action.type) {
        case SOCIAL_CONNECT_SET:
            return action.socialConnectArr;

        case RESET_STORE:
            return [];

        default:
            return state || [];
    }
}