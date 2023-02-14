import { SET_HOME_PROP, PUSH_HOME_PROP, RESET_STORE, SET_REFRESH_INDICATOR } from '../actions/Constants';
import { map, concat } from 'lodash';

const INITIAL_STATE = {
    news: null,
    explore: null,
    participant: null,
    user: null,
    best: null,
    messageUser: null,
    refreshStatus: false,
    exploreList: null,
    bestList: null

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_HOME_PROP:
            return {
                ...state, [action.homeData.prop]: action.homeData.prop == 'user' ? map(action.homeData.arr, dt => {
                    return Object.assign({}, dt, { id: dt._id })
                }) : action.homeData.arr
            };

        case PUSH_HOME_PROP:
            let arr = action.unshift ? concat(action.homeData.arr, state[action.homeData.prop]) : state[action.homeData.prop].concat(action.homeData.arr)
            return {
                ...state, [action.homeData.prop]: action.homeData.prop == 'user' ? map(arr, dt => {
                    return Object.assign({}, dt, { id: dt._id })
                }) : arr
            };

        case SET_REFRESH_INDICATOR:
            return Object.assign({}, state, { refreshStatus: action.status })

        case RESET_STORE:
            return INITIAL_STATE;

        default:
            return state || INITIAL_STATE;
    }
}
