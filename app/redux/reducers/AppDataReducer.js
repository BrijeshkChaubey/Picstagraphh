import { SET_APP_DATA, PUSH_APP_DATA, RESET_STORE } from "../actions/Constants";
import _ from "lodash";

const INITIAL_STATE = {
  reportedUsers: [],
  blockedUsers: [],
  likedUsers: [],
  socialShareHandler: null,
  subscribedArr: [],
  campaignPosts: {},
  unreadMessages: 0,
  unreadNotifications: 0,
  muted: false,
  repeat: true,
  loadedImages: [],
  linkUrl: null,
  homeLoaded: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_APP_DATA:
      return { ...state, [action.appData.prop]: action.appData.value };
    case PUSH_APP_DATA:
      let keyArr = state[action.appData.prop];
      keyArr.push(action.appData.value);
      return { ...state, [action.appData.prop]: keyArr };
    case RESET_STORE:
      return INITIAL_STATE;
    default:
      return state || INITIAL_STATE;
  }
};
