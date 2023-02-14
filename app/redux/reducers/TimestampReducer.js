import { SET_TIMESTAMP_DATA } from '../actions/Constants';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_TIMESTAMP_DATA:
            return Object.assign({}, state, { [action.flag]: action.value });
        default:
            return state;
    }
}
