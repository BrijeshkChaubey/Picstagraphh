import {
  SET_CAPAIGNS_PROP,
  PUSH_CAMPAIGNS_PROP,
  RESET_STORE,
  SET_REFRESH_INDICATOR,
  SAVE_SINGLE_CONTEST,
  REMOVE_SINGLE_CONTEST,
} from "../actions/Constants";
import { concat } from "lodash";

const INITIAL_STATE = {
  apply: null,
  finalist: null,
  closed: null,
  upcoming: null,
  extra: null,
  favorite: null,
  all: null,
  singleContest:null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CAPAIGNS_PROP:
      return { ...state, [action.campaignData.prop]: action.campaignData.arr };
    case SAVE_SINGLE_CONTEST:
      return { ...state, singleContest: action.payload };
    case REMOVE_SINGLE_CONTEST:
      return { ...state, singleContest: null };

    case PUSH_CAMPAIGNS_PROP:
      let arr = action.unshift
        ? concat(action.campaignData.arr, state[action.campaignData.prop])
        : state[action.campaignData.prop].concat(action.campaignData.arr);
      return { ...state, [action.campaignData.prop]: arr };

    case SET_REFRESH_INDICATOR:
      return Object.assign({}, state, { refreshStatus: action.status });

    case RESET_STORE:
      return INITIAL_STATE;

    default:
      return state || INITIAL_STATE;
  }
};

// export default (state = INITIAL_STATE, action) => {
//     switch (action.type) {
//         case SET_CAPAIGNS_PROP:
//             return action.campaignData;

//         case PUSH_CAMPAIGNS_PROP:
//             return action.unshift ? concat(action.campaignData, state) : state.concat(action.campaignData);

//         case RESET_STORE:
//             return INITIAL_STATE;

//         default:
//             return state || INITIAL_STATE;
//     }
// }
