import { SET_PAGINATION_NEWSFEED, SET_PAGINATION_OWN_NEWSFEED, SET_PAGINATION_HOME_EXPLORE, SET_PAGINATION_HOME_BEST, SET_PAGINATION_HOME_USERS, SET_PAGINATION_HOME_PARTICIPANT, SET_PAGINATION_COMPANY_CAMPAIGN, SET_PAGINATION_CREATOR_CAMPAIGN, SET_PAGINATION_OWN_SAVED, SET_PAGINATION_OWN_CONTEST, SET_PAGINATION_LIKE_LIST, SET_PAGINATION_NOTIFICATION, SET_PAGINATION_MESSAGE_USERS, SET_PAGINATION_SUBSCRIBED_STORY, SET_PAGINATION_EXPLORE_STORY, SET_PAGINATION_OTHER_NEWSFEED } from './Constants';

function getPaginationType(type) {
    let typeConst = '';
    switch (type) {
        case 'newsfeed':
            typeConst = SET_PAGINATION_NEWSFEED;
            break;

        case 'homeExplore':
            typeConst = SET_PAGINATION_HOME_EXPLORE;
            break;
        
        case 'homeBest':
            typeConst = SET_PAGINATION_HOME_BEST;
            break;

        case 'homeUsers':
            typeConst = SET_PAGINATION_HOME_USERS;
            break;

        case 'homeParticipant':
            typeConst = SET_PAGINATION_HOME_PARTICIPANT;
            break;

        case 'companyCampaign':
            typeConst = SET_PAGINATION_COMPANY_CAMPAIGN;
            break;

        case 'creatorCampaign':
            typeConst = SET_PAGINATION_CREATOR_CAMPAIGN;
            break;

        case 'ownNewsfeed':
            typeConst = SET_PAGINATION_OWN_NEWSFEED;
            break;

        case 'otherNewsfeed':
            typeConst = SET_PAGINATION_OTHER_NEWSFEED;
            break;

        case 'ownSaved':
            typeConst = SET_PAGINATION_OWN_SAVED;
            break;

        case 'ownContest':
            typeConst = SET_PAGINATION_OWN_CONTEST;
            break;

        case 'likeList':
            typeConst = SET_PAGINATION_LIKE_LIST;
            break;

        case 'notification':
            typeConst = SET_PAGINATION_NOTIFICATION
            break;

        case 'messageUsers':
            typeConst = SET_PAGINATION_MESSAGE_USERS;
            break;
        case 'subscribedStory':
            typeConst = SET_PAGINATION_SUBSCRIBED_STORY;
            break;
        case 'exploreStory':
            typeConst = SET_PAGINATION_EXPLORE_STORY;
            break;

        default:
            break;
    }
    return typeConst;
}

export const setPagination = (pagination, type) => {
    return {
        type: getPaginationType(type),
        pagination
    }

}