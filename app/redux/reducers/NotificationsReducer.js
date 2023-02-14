import { combineReducers } from 'redux';
import { SET_NOTIFICATIONS_DATA, PUSH_NOTIFICATIONS_DATA, SET_NOTIFICATIONS_PENDING_REQUESTS, SET_NOTIFICATIONS_LIKE_YOU, RESET_STORE } from '../actions/Constants';

const INITIAL_STATE = null

function notifications(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_NOTIFICATIONS_DATA:
            return action.data;

        case PUSH_NOTIFICATIONS_DATA:
            return action.unshift ? action.data.concat(state) : state.concat(action.data)

        case RESET_STORE:
            return null;

        default:
            return state || null;
    }
}
function requests(state = null, action) {
    switch (action.type) {
        case SET_NOTIFICATIONS_PENDING_REQUESTS:
            return action.data;

        case RESET_STORE:
            return null;

        default:
            return state || null;
    }
}
function likeYou(state = null, action) {
    switch (action.type) {
        case SET_NOTIFICATIONS_LIKE_YOU:
            return action.data;

        case RESET_STORE:
            return null;

        default:
            return state || null;
    }
}

export default combineReducers({
    notifications,
    likeYou,
    requests
})