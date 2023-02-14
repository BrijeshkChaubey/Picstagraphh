import { SET_LIKE_LIST, PUSH_LIKE_LIST, RESET_STORE } from '../actions/Constants';

const INITIAL_STATE = {}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case SET_LIKE_LIST:
            state = { ...state, [action.likeData.id]: action.likeData.data };
            return state;
        case PUSH_LIKE_LIST:
            let arr = state[action.likeData.id];
            arr = arr.concat(action.likeData.data)
            state[action.likeData.id] = arr;
            return state;
        case RESET_STORE:
            return INITIAL_STATE;
        default:
            return state || INITIAL_STATE;
    }
}
