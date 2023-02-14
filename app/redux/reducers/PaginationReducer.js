import { combineReducers } from 'redux';
export const SET_PAGINATION_MESSAGE_USERS = 'SET_PAGINATION_MESSAGE_USERS';
import { SET_PAGINATION_NEWSFEED, SET_PAGINATION_OWN_NEWSFEED, SET_PAGINATION_HOME_EXPLORE, SET_PAGINATION_HOME_BEST, SET_PAGINATION_HOME_USERS, SET_PAGINATION_HOME_PARTICIPANT, SET_PAGINATION_COMPANY_CAMPAIGN, SET_PAGINATION_CREATOR_CAMPAIGN, SET_PAGINATION_OWN_SAVED, SET_PAGINATION_OWN_CONTEST, SET_PAGINATION_LIKE_LIST, RESET_STORE, SET_PAGINATION_NOTIFICATION, SET_PAGINATION_SUBSCRIBED_STORY, SET_PAGINATION_EXPLORE_STORY } from '../actions/Constants';
import * as globals from '../../configs/libs/globals';

const NEWSFEED_INITIAL = {
    limit: globals.PAGINATION.newsfeed,
    page: 1,
    total: 0,
    bestPagintion: null,
}

function Newsfeed(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_NEWSFEED:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}


function ApplyContest(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_NEWSFEED:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}

function FinalistContest(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_NEWSFEED:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}

function ClosedContest(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_NEWSFEED:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}

function SubscribedStory(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_SUBSCRIBED_STORY:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}

function ExploreStory(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_EXPLORE_STORY:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}

function OwnNewsfeed(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_OWN_NEWSFEED:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}

function HomeExplore(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_HOME_EXPLORE:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}

function HomeBest(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_HOME_BEST:
           
            return { ...NEWSFEED_INITIAL, bestPagination: action.pagination };

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}



function HomeUsers(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_HOME_USERS:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}

function MessageUsers(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_MESSAGE_USERS:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}

function HomeParticipant(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_HOME_PARTICIPANT:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}

function CompanyCampaign(state = { apply: null, finalist: null, closed: null }, action) {
    switch (action.type) {
        case SET_PAGINATION_COMPANY_CAMPAIGN:
            return { ...state, [action.pagination.prop]: action.pagination.value }

        case RESET_STORE:
            return { apply: null, finals: null, closed: null };

        default:
            return state || { apply: null, finals: null, closed: null };
    }
}

function CreatorCampaign(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_CREATOR_CAMPAIGN:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}

function GetOwnSaved(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_OWN_SAVED:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}

function OwnContest(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_OWN_CONTEST:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}


function LikeList(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_LIKE_LIST:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}


function notification(state = NEWSFEED_INITIAL, action) {
    switch (action.type) {
        case SET_PAGINATION_NOTIFICATION:
            return action.pagination;

        case RESET_STORE:
            return NEWSFEED_INITIAL;

        default:
            return state || NEWSFEED_INITIAL;
    }
}

export default combineReducers({
    newsfeed: Newsfeed,
    homeExplore: HomeExplore,
    HomeBest: HomeBest,
    homeUsers: HomeUsers,
    homeParticipant: HomeParticipant,
    ownNewsfeed: OwnNewsfeed,
    companyCampaign: CompanyCampaign,
    creatorCampaign: CreatorCampaign,
    getOwnSaved: GetOwnSaved,
    getOwnContest: OwnContest,
    likeList: LikeList,
    notification: notification,
    messageUsers: MessageUsers,
    subscribedStory: SubscribedStory,
    exploreStory: ExploreStory,
})