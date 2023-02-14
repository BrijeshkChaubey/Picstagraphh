import { combineReducers } from 'redux';
import { SET_SUBSCRIBED_LIST, SET_SUBSCRIBERS_LIST, PUSH_SUBSCRIBED_LIST, PUSH_SUBSCRIBERS_LIST, RESET_STORE } from '../actions/Constants';

function subscribedList(state={}, action) {
    switch (action.type) {
        case SET_SUBSCRIBED_LIST:
            state[action.subscribedList.id] = {
                arr: action.subscribedList.arr,
                pagination: action.subscribedList.pagination
            };
            return state;
        case PUSH_SUBSCRIBED_LIST:
            let arr = state[action.subscribedList.id].arr;

            return Object.assign({},state,{
                [action.subscribedList.id] : {
                    arr: arr.concat(action.subscribedList.arr),
                    pagination: action.subscribedList.pagination
                }
            })

        case RESET_STORE:
            return {};
        default:
            return state || {};
    }
}

function subscribersList(state={}, action) {
    switch (action.type) {
        case SET_SUBSCRIBERS_LIST:
            state[action.subscribersList.id] = {
                arr: action.subscribersList.arr,
                pagination: action.subscribersList.pagination
            };
            return state;
        case PUSH_SUBSCRIBERS_LIST:
                let arr = state[action.subscribersList.id].arr;

                return Object.assign({},state,{
                    [action.subscribersList.id] : {
                        arr: arr.concat(action.subscribersList.arr),
                        pagination: action.subscribersList.pagination
                    }
                })

        case RESET_STORE:
            return {};
        default:
            return state || {};
    }
}

export default combineReducers({
    subscribedList: subscribedList,
    subscribersList: subscribersList
})