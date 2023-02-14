import { SET_COMPANY_PARTICIPANT_WINNERS, PUSH_COMPANY_PARTICIPANT_WINNERS } from './Constants';

export const setParticipantWinners = (participantObj, unshift = false) => {
    return {
        type: SET_COMPANY_PARTICIPANT_WINNERS,
        participantObj,
        unshift
    }
}

export const pushParticipantWinners = (participantObj) => {
    return {
        type: PUSH_COMPANY_PARTICIPANT_WINNERS,
        participantObj
    }
}