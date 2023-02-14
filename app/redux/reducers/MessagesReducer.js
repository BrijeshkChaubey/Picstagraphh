import { combineReducers } from 'redux';
import { SET_SUBSCRIBE_MESSAGE_DATA, PUSH_SUBSCRIBE_MESSAGE_DATA, SET_USER_MESSSAGES, RESET_STORE } from '../actions/Constants';

function subscriber (state=null, action) {
    switch (action.type) {
        case SET_SUBSCRIBE_MESSAGE_DATA:
            return action.messageData;

        case PUSH_SUBSCRIBE_MESSAGE_DATA:
            let arr = state;
            if( arr === null ) {
                arr = [action.messageData]
            }
            else {
                arr.push(action.messageData)
            }
            return arr;

        case RESET_STORE:
            return null;
    
        default:
            return state || null;
    }
}

function userMessages (state={}, action) {
    switch (action.type) {
        case SET_USER_MESSSAGES:
            return {...state, [action.messageData.id]: action.messageData.data};

        case RESET_STORE:
            return null;

        default:
            return state || null;
    }
}

export default combineReducers({
    subscriber: subscriber,
    userMessages: userMessages
})