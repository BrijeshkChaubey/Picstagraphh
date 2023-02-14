import {
  SET_JOB_LIST,
  SET_JOB_REFRESH_INDICATOR,
  PUSH_JOB_LIST,
} from "../actions/Constants";
import { concat } from "lodash";

const INITIAL_STATE = { refreshStatus: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_JOB_LIST:
      return Object.assign({}, state, {
        data: {
          arr: action.jobObj.data,
          pagination: action.jobObj.pagination,
        },
      });

    case PUSH_JOB_LIST:
      console.log("url", state);
      let arr = concat(state.data.arr, action.jobObj.data);

      return Object.assign({}, state, {
        data: {
          arr: arr,
          pagination: action.jobObj.pagination,
        },
      });

    case SET_JOB_REFRESH_INDICATOR:
      return Object.assign({}, state, { refreshStatus: action.status });

    default:
      return state || INITIAL_STATE;
  }
};
