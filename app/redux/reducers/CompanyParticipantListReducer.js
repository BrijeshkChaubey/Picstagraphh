import { SET_COMPANY_PARTICIPANT_LIST_PROP, PUSH_COMPANY_PARTICIPANT_LIST_PROP, RESET_STORE, SET_COMPANY_LIST_REFRESH_INDICATOR } from '../actions/Constants';
import { concat } from 'lodash';

const INITIAL_STATE = { refreshStatus: false }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_COMPANY_PARTICIPANT_LIST_PROP:

            return Object.assign({}, state, {
                [action.participantObj.id]: {
                    arr: action.participantObj.arr,
                    pagination: action.participantObj.pagination
                }
            })

        case PUSH_COMPANY_PARTICIPANT_LIST_PROP:
            let arr = action.unshift ? concat(action.participantObj.arr, state[action.participantObj.id].arr) : state[action.participantObj.id].arr.concat(action.participantObj.arr)

            state[action.participantObj.id] = {
                arr: arr,
                pagination: action.participantObj.pagination
            };
            return state;
        case SET_COMPANY_LIST_REFRESH_INDICATOR:
            return Object.assign({}, state, { refreshStatus: action.status })
        case RESET_STORE:
            return INITIAL_STATE;
        default:
            return state || INITIAL_STATE;
    }
}
