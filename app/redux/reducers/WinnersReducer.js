import { SET_COMPANY_PARTICIPANT_WINNERS, PUSH_COMPANY_PARTICIPANT_WINNERS, RESET_STORE } from '../actions/Constants';
import { concat } from 'lodash';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_COMPANY_PARTICIPANT_WINNERS:
            state[action.participantObj.id] = {
                arr: action.participantObj.arr,
                pagination: action.participantObj.pagination
            };
            return state;
        case PUSH_COMPANY_PARTICIPANT_WINNERS:
            let arr = action.unshift ? concat(action.participantObj.arr, state[action.participantObj.id].arr) : state[action.participantObj.id].arr.concat(action.participantObj.arr)

            state[action.participantObj.id] = {
                arr: arr,
                pagination: action.participantObj.pagination
            };
            return state;
        case RESET_STORE:
            return INITIAL_STATE;
        default:
            return state || INITIAL_STATE;
    }
}
