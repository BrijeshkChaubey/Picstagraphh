import {
  SET_PICS_USER_DATA,
  PUSH_PICS_USER_DATA,
  SET_PICS_VALUE,
  SET_PICS_DATA,
  PUSH_PICS_DATA,
  ADD_STORY_DATA,
  CHANGE_STORY_FLAG,
  CHANGE_STORY_INDEX,
  SET_STORY_REFRESH_INDICATOR,
  SET_SINGLE_USER_STORY,
} from "./Constants";
import store from "../configureStore";

export const setPicsUserHomeData = (data, prop, userId) => async (
  dispatch,
  getState
) => {
  const { adId } = getState().appData;

  dispatch({
    type: SET_PICS_USER_DATA,
    picsData: data,
    prop,
    userId,
    adId,
  });
};

export const setPicsValue = (prop, value) => {
  return {
    type: SET_PICS_VALUE,
    prop,
    value,
  };
};

export const setSingleUserStory = (data) => {
  return {
    type: SET_SINGLE_USER_STORY,
    data,
  };
};

export const setStoryRefreshIndicator = (data) => {
  return {
    type: SET_STORY_REFRESH_INDICATOR,
    status: data,
  };
};

export const addStoryData = (data) => {
  return {
    type: ADD_STORY_DATA,
    storyData: data,
  };
};

export const changeStoryFlag = (id, prop, flag, value) => {
  return {
    type: CHANGE_STORY_FLAG,
    id,
    prop,
    flag,
    value,
  };
};

export const changeStoryIndex = (index, userId, prop) => {
  return {
    type: CHANGE_STORY_INDEX,
    index,
    userId,
    prop,
  };
};

export const pushPicsUserHomeData = (data, prop, userId) => async (
  dispatch,
  getState
) => {
  const { adId } = getState().appData;

  dispatch({
    type: PUSH_PICS_USER_DATA,
    picsData: data,
    prop,
    userId,
    adId,
  });
};

export const setPicsHomeData = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      resolve(
        dispatch({
          type: SET_PICS_DATA,
          picsData: data,
        })
      );
    });
  };
};

export const pushPicsHomeData = (data) => {
  return {
    type: PUSH_PICS_DATA,
    picsData: data,
  };
};
