import { SET_PENDING_PARTICIPANT_PROP, PUSH_PENDING_PARTICIPANT_PROP } from './Constants';

export const setPendingParticipantProp = (participantObj) => {
    return {
        type: SET_PENDING_PARTICIPANT_PROP,
        participantObj
    }
}

export const pushPendingParticipantProp = (participantObj) => {
    return {
        type: PUSH_PENDING_PARTICIPANT_PROP,
        participantObj
    }
}