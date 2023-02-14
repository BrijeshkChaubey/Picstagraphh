import {applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {globals} from '../configs';
import {configureStore} from '@reduxjs/toolkit';

import LoginReducer from './reducers/LoginReducer';
import navPropsReducer from './reducers/NavReducer';
import FilterWrapperReducer from './reducers/FilterWrapperReducer';
import FiltersDataReducer from './reducers/FiltersDataReducer';
import SocialConnectReducer from './reducers/SocialConnectReducer';
import UserInfoReducer from './reducers/UserInfoReducer';
import CampaignsReducer from './reducers/CampaignsReducer';
import CommentsReducer from './reducers/CommentsReducer';
import CompanyParticipantReducer from './reducers/CompanyParticipantReducer';
import ParticipantsPendingReducer from './reducers/ParticipantsPendingReducer';
import ParticipantTop10Reducer from './reducers/ParticipantTop10Reducer';
import LocalizeReducer from './reducers/LocalizeReducer';
import HomeReducers from './reducers/HomeReducers';
import ProfileReducer from './reducers/ProfileReducer';
import OtherProfileReducer from './reducers/OtherProfileReducer';
import PushNotificationReducer from './reducers/PushNotificationReducer';
import PicsHomeReducer from './reducers/PicsHomeReducer';
import SubscribeReducer from './reducers/SubscribeReducer';
import NotificationsReducer from './reducers/NotificationsReducer';
import MessagesReducer from './reducers/MessagesReducer';
import LikeListReducer from './reducers/LikeListReducer';
import PaginationReducer from './reducers/PaginationReducer';
import AppDataReducer from './reducers/AppDataReducer';
import WinnerParticipantReducer from './reducers/WinnersReducer';
import TimestampReducer from './reducers/TimestampReducer';
import CompanyParticipantListReducer from './reducers/CompanyParticipantListReducer';
import ParticipantTop10ListReducer from './reducers/ParticipantTop10ListReducer';
import VideoReducer from './reducers/VideoReducer';
import JobReducer from './reducers/JobReducer';

const logger = createLogger({
  predicate: (getState, action) => (!globals.live ? __DEV__ : false),
  collapsed: true,
});

// const configureStore = (initialState = {}) =>
// createStore(
//   combineReducers({
//     loginData: LoginReducer,
//     navProps: navPropsReducer,
//     localize: LocalizeReducer,
//     appData: AppDataReducer,
//   }),
//   initialState,
//   applyMiddleware(thunk, logger),
// )

// export default configureStore;
 const store = configureStore({
  reducer: {
    loginData: LoginReducer,
    navProps: navPropsReducer,
    filterWrapperReducer: FilterWrapperReducer,
    filtersApiData: FiltersDataReducer,
    socialConnectData: SocialConnectReducer,
    participantsPendingReducer: ParticipantsPendingReducer,
    userInfo: UserInfoReducer,
    comments: CommentsReducer,
    campaigns: CampaignsReducer,
    companyParticipant: CompanyParticipantReducer,
    companyParticipantList: CompanyParticipantListReducer,
    participantTop10: ParticipantTop10Reducer,
    participantTop10List: ParticipantTop10ListReducer,
    winnerParticipant: WinnerParticipantReducer,
    localize: LocalizeReducer,
    home: HomeReducers,
    profile: ProfileReducer,
    otherProfile: OtherProfileReducer,
    pushNotification: PushNotificationReducer,
    picsHomeReducer: PicsHomeReducer,
    subscribeList: SubscribeReducer,
    notifications: NotificationsReducer,
    messages: MessagesReducer,
    likeList: LikeListReducer,
    pagination: PaginationReducer,
    appData: AppDataReducer,
    timestamp: TimestampReducer,
    video: VideoReducer,
    jobList: JobReducer,
  },
  middleware: [thunk, logger],
});
export default store;