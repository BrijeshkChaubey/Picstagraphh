import { SET_PENDING_PARTICIPANT_PROP, PUSH_PENDING_PARTICIPANT_PROP, RESET_STORE } from '../actions/Constants';
import _ from 'lodash';

const INITIAL_STATE = {}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case SET_PENDING_PARTICIPANT_PROP:
            state[action.participantObj.id] = {
                arr: action.participantObj.arr,
                pagination: action.participantObj.pagination
            };
            return state;
        case PUSH_PENDING_PARTICIPANT_PROP:
            let arr = state[action.participantObj.id].arr;
            arr = arr.concat(action.participantObj.arr);
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
