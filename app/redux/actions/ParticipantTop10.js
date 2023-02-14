import { SET_COMPANY_PARTICIPANT_TOP10, PUSH_COMPANY_PARTICIPANT_TOP10 } from './Constants';

export const setParticipantTop10 = (participantObj) => {
    return {
        type: SET_COMPANY_PARTICIPANT_TOP10,
        participantObj
    }
}

export const pushParticipantTop10 = (participantObj, unshift = false) => {
    return {
        type: PUSH_COMPANY_PARTICIPANT_TOP10,
        participantObj,
        unshift
    }
}