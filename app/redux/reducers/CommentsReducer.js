import { SET_COMMENTS, PUSH_COMMENT, RESET_STORE } from '../actions/Constants';
import { concat } from 'lodash'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_COMMENTS:
            state = {
                ...state, [action.commentsData.id]: {
                    arr: action.commentsData.arr,
                    pagination: action.commentsData.pagination
                }
            };
            return state;
        case PUSH_COMMENT:
            let newarr = state[action.commentData.id].arr;
            newarr.unshift(action.commentData.arr)
            state[action.commentData.id] = {
                // arr: concat(arr, action.commentData.arr),
                arr: newarr,
                pagination: action.commentData.pagination
            };
            return state;
        case RESET_STORE:
            return INITIAL_STATE;
        default:
            return state || INITIAL_STATE;
    }
}

