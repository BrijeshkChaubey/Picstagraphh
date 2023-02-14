import { CHANGE_SURFACE_VIEW ,SET_ACTIVE_VIDEO} from './Constants';

export const changeSurfaceView = (data) => {
    return {
        type: CHANGE_SURFACE_VIEW,
        surfaceView: data
    }
}

export const setActiveVideo = (data) => {
  return {
    type: SET_ACTIVE_VIDEO,
    payload: data,
  };
};