import { CHANGE_SURFACE_VIEW ,SET_ACTIVE_VIDEO } from '../actions/Constants';
import _ from 'lodash';

const INITIAL_STATE = {surfaceView : false,activeVideoId:''}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
      case CHANGE_SURFACE_VIEW:
        return Object.assign({}, state, { surfaceView: action.surfaceView });
      case SET_ACTIVE_VIDEO:
        return {...state, activeVideoId: action.payload }
      default:
        return state || INITIAL_STATE;
    }
}
