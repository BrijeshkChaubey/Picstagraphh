import {
  SET_COMPANY_PARTICIPANT_PROP,
  PUSH_COMPANY_PARTICIPANT_PROP,
  SET_COMPANY_REFRESH_INDICATOR,
} from "./Constants";

export const setParticipantProp = (participantObj) => {
  return {
    type: SET_COMPANY_PARTICIPANT_PROP,
    participantObj,
  };
};

export const pushParticipantProp = (participantObj, unshift = false) => {
  return {
    type: PUSH_COMPANY_PARTICIPANT_PROP,
    participantObj,
    unshift,
  };
};

export const setCompanyRefreshIndicator = (data) => {
  return {
    type: SET_COMPANY_REFRESH_INDICATOR,
    status: data,
  };
};
