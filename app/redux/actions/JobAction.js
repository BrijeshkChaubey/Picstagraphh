import {
  SET_JOB_LIST,
  SET_JOB_REFRESH_INDICATOR,
  PUSH_JOB_LIST,
  SET_JOB_DETAIL,
  PUSH_JOB_DETAIL,
} from "./Constants";

export const setJobList = (jobObj) => {
  return {
    type: SET_JOB_LIST,
    jobObj,
  };
};

export const pushJobList = (jobObj, unshift = false) => {
  return {
    type: PUSH_JOB_LIST,
    jobObj,
    unshift,
  };
};

export const setJobListRefreshIndicator = (data) => {
  return {
    type: SET_JOB_REFRESH_INDICATOR,
    status: data,
  };
};

export const setJobDetail = (jobObj) => {
  return {
    type: SET_JOB_DETAIL,
    jobObj,
  };
};

export const pushJobDetail = (jobObj, unshift = false) => {
  return {
    type: PUSH_JOB_DETAIL,
    jobObj,
    unshift,
  };
};