import { Alert } from "react-native";
import axios from "axios";
import { buildHeader, imagePreFetcher } from "./helpers";
import { live, BASE_URL, POST_TYPES } from "./globals";
import NavigationService from "../../components/navigations/NavigationService";
import { helpers } from "..";
import { chain, uniqBy } from "lodash";

//const URL = 'http://localhost:3146/api/';
//const URL = 'http://10.0.28.189:3146/api/';
//const URL = 'http://picstagraph-backend-dev.us-east-1.elasticbeanstalk.com/api/';
export const URL = BASE_URL + "api/";
export const URL_V2 = BASE_URL + "api/";
//App API's
const REGISTER_SAVE_U = { type: "POST", url: URL + "users?isMobile=true" };
const LOGIN_U = { type: "POST", url: URL + "auth/login/" };
const FBLOGIN_U = { type: "POST", url: URL_V2 + "users/facebook-user" };
const APPLELOGIN_U = { type: "POST", url: URL + "users/apple-user" };
const GOOGLELOGIN_U = { type: "POST", url: URL_V2 + "users/google-user" };
const SOCIAL_PROVIDER_SAVE_U = {
  type: "PATCH",
  url: (provider) => {
    return URL + "users/" + provider + "/save";
  },
  dynamic: true,
};
const SOCIAL_PROVIDER_DISCONNECT_U = {
  type: "DELETE",
  url: (provider) => {
    return URL + "auth/" + provider + "/disconnect";
  },
  dynamic: true,
};
const CHANGE_PASSWORD_U = { type: "PATCH", url: URL + "users/change-password" };
const CHANGE_EMAIL_U = { type: "PATCH", url: URL + "users/change-email" };
const VALIDATE_TOKEN_U = { type: "GET", url: URL + "auth/validate" };
const GET_SUBSCIRBER_COUNT = {
  type: "GET", url: URL + "category/subscribe/count",
  };

const LANGUAGE_SET_U = {
  type: "PUT",
  url: (d) => URL + "users" + d,
  dynamic: true,
};
const GET_CATEGORIES = { type: "GET", url: URL + "category" };
const GET_STATIC_INFO = { type: "GET", url: URL + "sysconfig" };
const GET_VIEWERS_LIST = {
  type: "GET",
  url: (d) =>
    URL + "media/" + d.mediaId + "/Views?page=" + d.page + "&limit=" + d.limit,
  dynamic: true,
};
const FETCH_ACTION_POINTS = {
  type: "POST",
  url: (d) => {
    console.log("URL", d);

    console.log("URL", URL + "campaign/" + d.campId + "/social-share");
    return URL + "campaign/" + d.campId + "/social-share";
  },
  dynamic: true,
};

const AWARD_USER_POINTS = {
  type: "POST",
  url: (d) => {
    return URL + "campaign/" + d.campId + "/getPointOnContestShare";
  },
  dynamic: true,
};
// const LANGUAGE_SET_U = { type: 'PATCH', url: (d) => URL + 'users/' + d, dynamic: true };
const CAMPAIGNS_GET_ALL_U = {
  type: "POST",
  url: URL + "campaigns/get-all-campaigns",
};
const USERINFO_GET_U = {
  type: "GET",
  url: (provider) => {
    return URL + "users/" + provider;
  },
  dynamic: true,
};
const GET_CAT_SUB_COUNT = {
  type: "GET",
  url: (provider) => {
    return URL + "category/subscribe/count?category=" + provider.category;
  },
  dynamic: true,
};
const USERINFO_UPDATE_U = { type: "PUT", url: URL + "users/" };
const IMAGE_UPLOAD_U = {
  type: "POST",
  url: (provider) => {
    return URL + "image/profile?postType=" + provider;
  },
  dynamic: true,
};
const VIDEO_POST_CREATE_U = {
  type: "POST",
  url: (provider) => URL + "video?postType=" + provider,
  dynamic: true,
};
const MEDIA_POST_SAVE_U = {
  type: "POST",
  url: (provider) => {
    console.log(
      'URL + "media?postType=" + provider',
      URL + "media?postType=" + provider
    );
    return URL + "media?postType=" + provider;
  },
  dynamic: true,
};
const PROFILE_IMAGE_SAVE = {
  type: "POST",
  url: (provider) => URL + "media/profile?postType=" + provider,
  dynamic: true,
};
const CAMPAIGN_FAVORITE = {
  type: "GET",
  url: (d) => URL + "campaign/favorite",
  dynamic: true,
};
const CAMPAIGN_GET_U = {
  type: "GET",
  url: (d) => {
    filterStr = d.filterStr ? "&" + d.filterStr : "";
    return (
      URL +
      "campaign/list/" +
      d.type +
      "?page=" +
      d.page +
      "&limit=" +
      6 +
      filterStr
    );
  },
  dynamic: true,
};
const CAMPAIGN_GET_U_V2 = {
  type: "GET",
  url: (d) => {
    filterStr = d.filterStr ? "&" + d.filterStr : "";
    apiType = d.apiType ? "&campaignStatus=" + d.apiType : "";

    return d.timestamp == ""
      ? URL +
      "campaign/list_v2/" +
      d.type +
      "?page=" +
      d.page +
      "&limit=" +
      6 +
      apiType +
      filterStr
      : URL +
      "campaign/list_v2/" +
      d.type +
      "?page=" +
      d.page +
      "&timestamp=" +
      d.timestamp +
      "&limit=" +
      6 +
      apiType +
      filterStr;
  },
  dynamic: true,
};
const CAMPAIGN_GET_UDTATE_REDIS = {
  type: "GET",
  url: (d) => {
    filterStr = d.filterStr ? "&" + d.filterStr : "";
    apiType = d.apiType ? "&campaignStatus=" + d.apiType : "";
    return (
      URL +
      "campaign/update-field" +
      "?timestamp=" +
      d.timestamp +
      "&userType=" +
      d.type +
      "&page=" +
      d.page +
      apiType +
      filterStr
    );
  },
  dynamic: true,
};
const LIKE_POST_U = {
  type: "POST",
  url: (d) => URL + d.type + "/" + d.id + "/like",
  dynamic: true,
};
const NOTIFICATION_READ_POST_U = {
  type: "POST",
  url: (d) => URL + "notification/read",
  dynamic: true,
};
const LIKE_USER_GET_U = {
  type: "GET",
  url: (d) =>
    URL + d.type + "/" + d.id + "/like?page=" + d.page + "&limit=" + d.limit,
  dynamic: true,
};
const COMMENTS_GET_U = {
  type: "GET",
  url: (d) =>
    URL +
    d.type +
    "/" +
    d.id +
    "/comment_v2?page=" +
    d.page +
    "&limit=" +
    d.limit,
  dynamic: true,
};
const COMMENTS_SAVE_U = {
  type: "POST",
  url: (d) => URL + d.type + "/" + d.id + "/comment",
  dynamic: true,
};
const COMMENTS_DELETE_U = {
  type: "DELETE",
  url: (d) => URL + d.type + "/" + d.id + "/comment/" + d.commentId,
  dynamic: true,
};
const COMMENTS_EDIT_U = {
  type: "PUT",
  url: (d) => URL + d.type + "/" + d.id + "/comment/" + d.commentId,
  dynamic: true,
};
const PARTICIPANTS_GET_U = {
  type: "GET",
  url: (d) => {
    let urlStr =
      URL +
      "participant/" +
      d.text +
      "?key=" +
      d.key +
      "&page=" +
      d.page +
      "&limit=" +
      d.limit +
      "&command=" +
      d.command;
    urlStr = d.timestamp == "" ? urlStr : urlStr + "&timestamp=" + d.timestamp;

    console.log("urlStr", urlStr);
    
    let url1 = d?.id ? urlStr + "&participantId=" + d.id : urlStr;
    let url2 = d?.id
      ? urlStr + "&downTimestamp=" + d.downTimestamp + "&participantId=" + d?.id
      : urlStr + "&downTimestamp=" + d.downTimestamp;
    return d.downTimestamp == "" ? url1 : url2;
  },
  dynamic: true,
};
const PARTICIPANTS_GET_U_LIST = {
  type: "GET",
  url: (d) => {
    let urlStr =
      URL +
      "participant/" +
      d.text +
      "?key=" +
      d.key +
      "&page=" +
      d.page +
      "&limit=" +
      d.limit +
      "&command=" +
      d.command;
    urlStr = d.timestamp == "" ? urlStr : urlStr + "&timestamp=" + d.timestamp;
    alert("nice");
    return d.downTimestamp == ""
      ? urlStr
      : urlStr + "&downTimestamp=" + d.downTimestamp;
  },
  dynamic: true,
};
// const PARTICIPANTS_TOP10_GET_U = { type: 'GET', url: (d) => URL+'participant?key='+d.slug+"&page="+d.page+"&limit="+d.limit+'&top=10', dynamic: true };
const PARTICIPANTS_TOP10_GET_U = {
  type: "GET",
  url: (d) => {
   let urlStr= URL +
      "participant?key=" +
      d.slug +
      "&page=" +
      d.page +
      "&limit=" +
      d.limit +
      "&command=" +
      d.command;
    console.log('URL',urlStr)
  },
  dynamic: true,
};
const HOME_NEWSFEED_U = {
  type: "GET",
  url: (d) => {
    let urlStr =
      URL +
      "newsfeeds/" +
      d.id +
      "?page=" +
      d.page +
      "&limit=" +
      d.limit +
      "&country=" +
      d.country;
    // console.log("URL", urlStr);
    return d.timestamp == "" ? urlStr : urlStr + "&timestamp=" + d.timestamp;
  },
  dynamic: true,
};
// const HOME_EXPLORE_U = {
//     type: 'GET',
//     url: (d) => {
//         filterStr = d.filterStr !== '' ? '&' + d.filterStr : '';
//         return URL + 'media?page=' + d.page + '&limit=' + d.limit + '&country=' + d.country + filterStr
//     },
//     dynamic: true
// }
const HOME_EXPLORE_U = {
  type: "GET",
  url: (d) => {
    filterStr = d.filterStr !== "" ? "&" + d.filterStr : "";

    let urlStr =
      filterStr != "&relevance=verified"
        ? URL + "media/type?"
        : URL + "media/type?";
    if (filterStr == "&relevance=verified") {
      urlStr = urlStr + filterStr + "&remote=";
      if (d.mediaPage) {
        urlStr = urlStr + "&mediaLimit=" + "9" + "&mediaPage=" + d.mediaPage;
      }
      if (d.mediaPage && d.stagePage) {
        urlStr = urlStr + "&";
      }
      if (d.stagePage) {
        urlStr = urlStr + "stageLimit=" + "6" + "&stagePage=" + d.stagePage;
      }
    } else if (filterStr == "&relevance=verified&typeContent=video"||"&relevance=verified&typeContent=image") {
      if (filterStr) {
        urlStr = urlStr + filterStr;
      }
      if (d.mediaPage) {
        urlStr = urlStr + "&mediaLimit=" + "9" + "&mediaPage=" + d.mediaPage;
      }
      if (d.mediaPage && d.stagePage) {
        urlStr = urlStr + "&";
      }
      if (d.stagePage) {
        urlStr = urlStr + "stageLimit=" + "6" + "&stagePage=" + d.stagePage;
      }
    } else {
      if (d.mediaPage) {
        urlStr = urlStr + "mediaLimit=" + "9" + "&mediaPage=" + d.mediaPage;
      }
      if (d.mediaPage && d.stagePage) {
        urlStr = urlStr + "&";
      }
      if (d.stagePage) {
        urlStr = urlStr + "stageLimit=" + "6" + "&stagePage=" + d.stagePage;
      }
      if (filterStr) {
        urlStr = urlStr + filterStr;
      }
    }

    let url1 = d?.id ? urlStr + d.id : urlStr;
    let url2 = d?.id
      ? urlStr + "&timestamp=" + d.timestamp + d.id
      : urlStr + "&timestamp=" + d.timestamp;
    return d.timestamp == "" ? url1 : url2;
  },
  dynamic: true,
};

const HOME_EXPLORE_U_V2 = {
  type: "GET",
  url: (d) => {
    filterStr = d.filterStr !== "" ? "&" + d.filterStr : "";
    let urlStr = URL + "media/type_v2?";
    if (d.mediaPage) {
      if (filterStr) {
        urlStr = urlStr + "mediaLimit=9&mediaPage=" + d.mediaPage;
      } else {
        urlStr = urlStr + "mediaLimit=9&mediaPage=" + d.mediaPage;
      }
    }
    if (d.mediaPage && d.stagePage) {
      urlStr = urlStr + "&";
    }
    if (d.stagePage) {
      if (filterStr) {
        urlStr = urlStr + "stageLimit=6&stagePage=" + d.stagePage;
      } else {
        urlStr = urlStr + "stageLimit=6&stagePage=" + d.stagePage;
      }
    }

    if (filterStr) {
      urlStr = urlStr + filterStr;
    }

    urlStr = d.timestamp == "" ? urlStr : urlStr + "&timestamp=" + d.timestamp;

    return d.downTimestamp == ""
      ? urlStr
      : urlStr + "&downTimestamp=" + d.downTimestamp;
  },
  dynamic: true,
};
const JOB_GET = {
  type: "GET",
  url: (d) => {
    filterStr = d.filterStr !== "" ? d.filterStr : "";
    let urlStr = URL_V2 + "job/category/";
    if (filterStr) {
      urlStr = urlStr + filterStr;
    }
    if (d.page) {
      if (filterStr) {
        urlStr = urlStr + "?limit=15&page=" + d.mediaPage;
      } else {
        urlStr = urlStr + "?limit=15&page=" + d.mediaPage;
      }
    }

    urlStr = d.timestamp == "" ? urlStr : urlStr + "&timestamp=" + d.timestamp;

    return d.downTimestamp == ""
      ? urlStr
      : urlStr + "&downTimestamp=" + d.downTimestamp;
  },
  dynamic: true,
};

const JOB_DETAIL_GET = {
  type: "GET",
  url: (d) => URL_V2 + "job/" + d.id,
  dynamic: true,
};

const HOME_BEST_U = {
  type: "GET",
  url: (d) => {
    filterStr = d.filterStr !== "" ? "&" + d.filterStr : "";
    let urlStr = URL + "media/type?category=All&relevance=favourites&";
    if (d.mediaPage) {
      urlStr =
        urlStr +
        "mediaLimit=" +
        (d?.id ? "6" : "6") +
        "&mediaPage=" +
        d.mediaPage;
    }
    if (d.mediaPage && d.stagePage) {
      urlStr = urlStr + "&";
    }
    if (d.stagePage) {
      urlStr =
        urlStr +
        "stageLimit=" +
        (d?.id ? "9" : "6") +
        "&stagePage=" +
        d.stagePage;
    }

    if (filterStr) {
      urlStr = urlStr + filterStr;
    }
    let url1 = d?.id ? urlStr + d.id : urlStr;
    // let url2 = d?.id ? urlStr + "&timestamp=" + d.timestamp + d.id : urlStr + "&timestamp=" + d.timestamp;
    let url2 = d?.id ? urlStr + d.id : urlStr;
    return d.timestamp == "" ? url1 : url2;
  },
  dynamic: true,
};

const HOME_BEST_U_V2 = {
  type: "GET",
  url: (d) => {
    filterStr = d.filterStr !== "" ? "&" + d.filterStr : "";
    let urlStr = URL + "media/type_v2?category=All&relevance=favourites&";
    if (d.mediaPage) {
      if (filterStr) {
        urlStr = urlStr + "mediaLimit=3&mediaPage=" + d.mediaPage;
      } else {
        urlStr = urlStr + "mediaLimit=9&mediaPage=" + d.mediaPage;
      }
    }
    if (d.mediaPage && d.stagePage) {
      urlStr = urlStr + "&";
    }
    if (d.stagePage) {
      if (filterStr) {
        urlStr = urlStr + "stageLimit=3&stagePage=" + d.stagePage;
      } else {
        urlStr = urlStr + "stageLimit=6&stagePage=" + d.stagePage;
      }
    }

    if (filterStr) {
      urlStr = urlStr + filterStr;
    }

    urlStr = d.timestamp == "" ? urlStr : urlStr;
    // urlStr = d.timestamp == "" ? urlStr : urlStr + "&timestamp=" + d.timestamp;

    // return d.downTimestamp == ""
    //   ? urlStr
    //   : urlStr + "&downTimestamp=" + d.downTimestamp;

    return d.downTimestamp == ""
      ? urlStr
      : urlStr + "&downTimestamp=" + d.downTimestamp;
  },
  dynamic: true,
};

const HOME_PARTICIPANT_U = {
  type: "GET",
  url: (d) => {
    filterStr = d.filterStr !== "" ? "&" + d.filterStr : "";
    return URL + "participant?page=" + d.page + "&limit=" + d.limit + filterStr;
  },
  dynamic: true,
};
const USER_LIST_GET = {
  type: "GET",
  url: (d) => {
    filterStr = d.filterStr !== "" ? "&" + d.filterStr : "";
    return (
      URL +
      "users?page=" +
      d.page +
      "&limit=" +
      d.limit +
      filterStr +
      "&isLastPage=" +
      d.isLastPage
    );
  },
  dynamic: true,
};
const USER_LIST_SEARCH = {
  type: "GET",
  url: (provider) => URL + "users/search?" + getRequestData(provider),
  dynamic: true,
};
const ACTIVATE_DEACTIVATE_PROFILE_SET = {
  type: "POST",
  url: URL + "users/deactive-account",
};
const ADVERTIZE_PROFILE_SET = {
  type: "PATCH",
  url: (d) => URL + "users/" + d,
  dynamic: true,
};
const SOCIAL_SHARE_PROFILE_SET = {
  type: "PUT",
  url: (d) => URL + "users",
  dynamic: true,
};
const OWN_NEWSFEEDS_U = {
  type: "GET",
  url: (d) => {
    let urlStr =
      URL + "newsfeeds/user-newsfeed?page=" + d.page + "&limit=" + d.limit;

    let url1 = d?.id ? urlStr + "&newsfeedId=" + d.id : urlStr;
    let url2 = d?.id
      ? urlStr + "&timestamp=" + d.timestamp + "&newsfeedId=" + d.id
      : urlStr + "&timestamp=" + d.timestamp;
    return d.timestamp == "" ? url1 : url2;
  },
  dynamic: true,
};
const OWN_NEWSFEEDS_U_V2 = {
  type: "GET",
  url: (d) => {
    let urlStr =
      URL +
      "newsfeeds/user-newsfeed_v2/" +
      d.id +
      "?page=" +
      d.page +
      "&limit=" +
      d.limit;
    urlStr = d.timestamp == "" ? urlStr : urlStr + "&timestamp=" + d.timestamp;
    return d.downTimestamp == ""
      ? urlStr
      : urlStr + "&downTimestamp=" + d.downTimestamp;
  },
  dynamic: true,
};

const OTHER_NEWSFEEDS_U = {
  type: "GET",
  url: (d) => {
    let urlStr =
      URL +
      "newsfeeds/user-newsfeed?page=" +
      d.page +
      "&limit=" +
      d.limit +
      "&username=" +
      d.username;
    let url1 = d?.id ? urlStr + "&newsfeedId=" + d.id : urlStr;
    let url2 = d?.id
      ? urlStr + "&timestamp=" + d.timestamp + "&newsfeedId=" + d.id
      : urlStr + "&timestamp=" + d.timestamp;
    return d.timestamp == "" ? url1 : url2;
  },
  dynamic: true,
};

const OTHER_NEWSFEEDS_U_V2 = {
  type: "GET",
  url: (d) => {
    let urlStr =
      URL +
      "newsfeeds/user-newsfeed_v2/" +
      d.username +
      "?page=" +
      d.page +
      "&limit=" +
      d.limit;
    urlStr = d.timestamp == "" ? urlStr : urlStr + "&timestamp=" + d.timestamp;
    return d.downTimestamp == ""
      ? urlStr
      : urlStr + "&downTimestamp=" + d.downTimestamp;
  },
  dynamic: true,
};

// const GET_NOTIFICATIONS_U = {
//     type: 'GET',
//     url: (d) => {
//         let urlStr = URL + 'notification/user-notification_v2/' + d.userid + '?page=' + d.page + '&limit=' + d.limit
//         urlStr = d.timestamp == '' ? urlStr : urlStr + '&timestamp=' + d.timestamp
//         return urlStr
//         // URL + 'notification/user-notification?page=' + d.page + '&limit=' + d.limit, dynamic: true
//     },
//     dynamic: true
// };

const OWN_SAVEDFEEDS_U = {
  type: "GET",
  url: (d) =>
    URL + "savepost/" + d.id + "?page=" + d.page + "&limit=" + d.limit,
  dynamic: true,
};
const USRE_CONTEST_U = {
  type: "GET",
  url: (d) =>
    URL +
    "campaign/user-campaign/" +
    d.userName +
    "?page=" +
    d.page +
    "&isOwner=" +
    d.isOwner +
    "&limit=" +
    d.limit,
  dynamic: true,
};
const SAVE_SAVEDFEEDS_U = { type: "POST", url: URL + "savepost" };
const REPORT_POST_U = { type: "POST", url: URL + "reports" };
const OTHER_USER_BLOCK_U = {
  type: "POST",
  url: (d) => URL + "follow/block/" + d,
  dynamic: true,
};
const OTHER_USER_UNBLOCK_U = {
  type: "PUT",
  url: (d) => URL + "follow/block/" + d,
  dynamic: true,
};
const LIKE_OTHER_USER_U = { type: "POST", url: URL + "likes" };
const UPDATE_PUSH_NOTIFICATIONS = {
  type: "PATCH",
  url: URL + "users/notification/update",
};
const GET_PUSH_NOTIFICATIONS = { type: "GET", url: URL + "users/notification" };
const SUBSCRIBE_USER_U = {
  type: "POST",
  url: (d) => URL + "follow/" + d,
  dynamic: true,
};
const UNSUBSCRIBE_USER_U = {
  type: "PUT",
  url: (d) => {
    return URL + "follow/" + d;
  },
  dynamic: true,
};
const SUBSCRIBE_REQUESTS_UPDATE_U = {
  type: "PUT",
  url: URL + "subscribe/accept-request",
};
const SUBSCRIBED_UESERS_GET_U = {
  type: "GET",
  url: (d) =>
    URL +
    "follow/following?id=" +
    d.id +
    "&get_type=" +
    d.get_type +
    "&page=" +
    d.page +
    "&limit=" +
    d.limit,
  dynamic: true,
};
const SUBSCRIBERS_GET_U = {
  type: "GET",
  url: (d) =>
    URL +
    "follow/followers?id=" +
    d.id +
    "&get_type=" +
    d.get_type +
    "&page=" +
    d.page +
    "&limit=" +
    d.limit,
  dynamic: true,
};
const MESSAGES_LIST_GET_U = {
  type: "GET",
  url: (provider) => {
    return URL + "messages/userlist?type=" + provider;
  },
  dynamic: true,
};
const GET_USER_MESSAGES_U = {
  type: "GET",
  url: (provider) => {
    return URL + "messages?" + getRequestData(provider);
  },
  dynamic: true,
};

const UPDATE_SEEN_MESSAGES = {
  type: "PUT",
  url: (provider) => {
    return URL + "messages/" + provider;
  },
  dynamic: true,
};

const GET_PICS_HOME_U = {
  type: "POST",
  url: (d) => {
    filterStr = d.filterStr !== "" ? "&" + d.filterStr : "";
    let urlStr =
      URL +
      "media/pics/latest-user_v2/" +
      d.id +
      "?page=" +
      d.page +
      "&limit=" +
      d.limit +
      filterStr +
      "&isSubscribe=" +
      d.isSubscribe;
    return d.timestamp == "" ? urlStr : urlStr + "&timestamp=" + d.timestamp;
  },
  dynamic: true,
};

// const GET_PICS_HOME_U = { type: 'GET', url: (d) => URL+'media/pics/latest-user?page='+d.page+'&limit='+d.limit+'&isSubscribe='+d.isSubscribe, dynamic: true };
const GET_PICS_STATUS_U = {
  type: "GET",
  url: (d) => URL + "media/pics_v2/" + d.id,
  dynamic: true,
};
const GET_LIKE_YOU_NOTIFICATIONS = { type: "GET", url: URL + "likes" };
const CAMPAIGN_PARTICIPANT_SAVE = { type: "POST", url: URL + "participant/" };
const POST_CLICK_U = {
  type: "POST",
  url: (d) => URL + d.type + "/" + d.id + "/clicks",
  dynamic: true,
};
const SUBMIT_SURVEY = {
  type: "POST",
  url: (d) => URL + "campaign/" + d.id + "/survey/answer",
  dynamic: true,
};
const CAMPAIGN_POST_CLICK_U = {
  type: "POST",
  url: (d) => URL + "campaign/" + d.id + "/views",
  dynamic: true,
};
const CAMPAIGN_CALL_TO_ACTION_U = {
  type: "POST",
  url: (d) => URL + "campaign/" + d.id + "/call-to-Action",
  dynamic: true,
};
const POST_VIEW_U = {
  type: "POST",
  url: (d) => URL + d.type + "/" + d.id + "/views",
  dynamic: true,
};
const DEVICE_FIREBASE_TOKEN_SAVE_U = {
  type: "PUT",
  url: URL + "users/device-token",
};
const GET_NOTIFICATIONS_U = {
  type: "GET",
  url: (d) =>
    URL + "notification/user-notification?page=" + d.page + "&limit=" + d.limit,
  dynamic: true,
};
const GET_CAMPAIGN_INFO = {
  type: "GET",
  url: (d) => URL + "campaign/" + d,
  dynamic: true,
};
const GET_NOTIFICATIONMENTION_INFO = {
  type: "GET",
  url: (d) => URL + d.type + "/" + d.id,
  dynamic: true,
};
const GET_MEDIA_INFO = {
  type: "GET",
  url: (d) => URL + "media/" + d,
  dynamic: true,
};
const GET_PARTICIPANT_INFO = {
  type: "GET",
  url: (d) => URL + "participant/" + d,
  dynamic: true,
};
const DELETE_OWN_POST = {
  type: "DELETE",
  url: (d) => URL + d.postType + "/" + d.id,
  dynamic: true,
};
const POST_UPDATE = {
  type: "PUT",
  url: (d) => URL + d.type + "/" + d.id,
  dynamic: true,
};
const MESSAGE_DELETE = {
  type: "DELETE",
  url: (d) => URL + "messages/for/" + d.id + "?otherUserId=" + d.otherUserId,
  dynamic: true,
};
const FORGOT_PASS_EMAIL_SEND = {
  type: "PUT",
  url: URL + "auth/forgot-password?isMobile=true",
};
const VALIDATE_RESET_PASSWORD = {
  type: "GET",
  url: (d) => URL + "users/validate-reset-password/" + d.token,
  dynamic: true,
};
const RESET_PASSWORD = { type: "PUT", url: URL + "users/set-password" };
const GET_NOTIFICATION_COUNTER = {
  type: "GET",
  url: URL + "users/header/count",
};

const PARTICIPANTS_WINNERS_GET_U = {
  type: "GET",
  url: (d) =>
    URL +
    "participant?slug=" +
    d.slug +
    "&page=" +
    d.page +
    "&limit=" +
    d.limit +
    "&command=winner",
  dynamic: true,
};
const VALIDATE_REGISTER = {
  type: "GET",
  url: (d) => URL + "users/validate-register/" + d.token,
  dynamic: true,
};

//Filters API's
const CATEGORIES_GET_U = { type: "GET", url: URL + "categories" };
const CATEGORIES_SAVE_U = { type: "POST", url: URL + "categories" };
const OFFER_TAG_GET_U = { type: "GET", url: URL + "offerTags" };
const OFFER_TAG_SAVE_U = { type: "POST", url: URL + "offerTags" };
const INQUIRY_TAG_GET_U = { type: "GET", url: URL + "inquiryTags" };
const INQUIRY_TAG_SAVE_U = { type: "POST", url: URL + "inquiryTags" };
const HASHTAG_TAG_GET_U = { type: "GET", url: URL + "hashtags" };
const HASHTAG_TAG_SAVE_U = { type: "POST", url: URL + "hashtags" };
const LOACTION_COUNTRY_GET_U = {
  type: "GET",
  url: "https://restcountries.eu/rest/v2/all",
};

//Third party API's
const INSTAGRAM_U = {
  type: "GET",
  url: "https://api.instagram.com/v1/users/self/",
};

//services
const SEND_FEEDBACK_U = { type: "POST", url: URL + "feedback" };
const DELETE_ACCOUNT_U = { type: "POST", url: URL + "users/delete-account" };
const SEND_REPORT_PROBLEM_U = { type: "POST", url: URL + "reportproblem" };
const SEND_REPORT_AUTHORITY_U = { type: "POST", url: URL + "lawenforcement" };

export const API = {
  registerSave: (data, cb) => request(data, cb, REGISTER_SAVE_U),
  login: (data, cb) => request(data, cb, LOGIN_U),
  fblogin: (data, cb) => request(data, cb, FBLOGIN_U),
  applelogin: (data, cb) => request(data, cb, APPLELOGIN_U),
  googlelogin: (data, cb) => request(data, cb, GOOGLELOGIN_U),
  instagramUserInfo: (data, cb) => request(data, cb, INSTAGRAM_U),
  socialProviderSave: (data, cb, header, urlData) =>
    request(data, cb, SOCIAL_PROVIDER_SAVE_U, header, urlData),
  socialProviderDisconnect: (data, cb, header, urlData) =>
    request(data, cb, SOCIAL_PROVIDER_DISCONNECT_U, header, urlData),
  validateToken: (data, cb, header) =>
    request(data, cb, VALIDATE_TOKEN_U, header),
  languageSet: (data, cb, header, urlData) =>
    request(data, cb, LANGUAGE_SET_U, header, urlData),
  getAllCampaignsList: (data, cb, header) =>
    request(data, cb, CAMPAIGNS_GET_ALL_U, header),
  getUserInfo: (data, cb, header, urlData) =>
    request(data, cb, USERINFO_GET_U, header, urlData),

  userInfoUpdate: (data, cb, header) =>
    request(data, cb, USERINFO_UPDATE_U, header),
  imageUpload: (data, cb, header, urlData) =>
    request(data, cb, IMAGE_UPLOAD_U, header, urlData),
  saveVideoPost: (data, cb, header, urlData) =>
    request(data, cb, VIDEO_POST_CREATE_U, header, urlData),
  saveMediaPost: (data, cb, header, urlData, option) => {
    console.log("data", data);
    return request(data, cb, MEDIA_POST_SAVE_U, header, urlData, null, option);
  },
  getSubscriberCount: (data, cb, header) => {
    return request(data, cb, GET_SUBSCIRBER_COUNT, header);
  },
  profileImageSave: (data, cb, header, urlData) =>
    request(data, cb, PROFILE_IMAGE_SAVE, header, urlData),
  campaignFavoriteGetApi: (data, cb, header, urlData) =>
    request(data, cb, CAMPAIGN_FAVORITE, header, urlData),
  campaignGetApi: (data, cb, header, urlData) =>
    request(data, cb, CAMPAIGN_GET_U, header, urlData),
  campaignGetApi2: (data, cb, header, urlData) =>
    request(data, cb, CAMPAIGN_GET_U_V2, header, urlData),
  campaignUpdateRedis: (data, cb, header, urlData) =>
    request(data, cb, CAMPAIGN_GET_UDTATE_REDIS, header, urlData),
  likesPostApi: (data, cb, header, urlData) =>
    request(data, cb, LIKE_POST_U, header, urlData),
  notificationReadPostApi: (data, cb, header, urlData) =>
    request(data, cb, NOTIFICATION_READ_POST_U, header, urlData),
  getLikeUsers: (data, cb, header, urlData) =>
    request(data, cb, LIKE_USER_GET_U, header, urlData),
  commentsGetApi: (data, cb, header, urlData) =>
    request(data, cb, COMMENTS_GET_U, header, urlData),
  commentsSaveApi: (data, cb, header, urlData) =>
    request(data, cb, COMMENTS_SAVE_U, header, urlData),
  commentsEditApi: (data, cb, header, urlData) =>
    request(data, cb, COMMENTS_EDIT_U, header, urlData),
  commentsDeleteApi: (data, cb, header, urlData) =>
    request(data, cb, COMMENTS_DELETE_U, header, urlData),
  participantGetApi: (data, cb, header, urlData) =>
    request(data, cb, PARTICIPANTS_GET_U, header, urlData),
  participantGetApiList: (data, cb, header, urlData) =>
    request(data, cb, PARTICIPANTS_GET_U_LIST, header, urlData),
  participantTop10GetApi: (data, cb, header, urlData) =>
    request(data, cb, PARTICIPANTS_TOP10_GET_U, header, urlData),
  homeNewsfeedGetApi: (data, cb, header, urlData) =>
    request(data, cb, HOME_NEWSFEED_U, header, urlData),
  homeExploreGetApi: (data, cb, header, urlData) =>
    request(data, cb, HOME_EXPLORE_U, header, urlData),
  homeExploreGetApi2: (data, cb, header, urlData) =>
    request(data, cb, HOME_EXPLORE_U_V2, header, urlData),
  jobGetApi: (data, cb, header, urlData) =>
    request(data, cb, JOB_GET, header, urlData),
  jobInfoGetApi: (data, cb, header, urlData) =>
    request(data, cb, JOB_DETAIL_GET, header, urlData),
  homeBestGetApi: (data, cb, header, urlData) =>
    request(data, cb, HOME_BEST_U, header, urlData),
  homeBestGetApi2: (data, cb, header, urlData) =>
    request(data, cb, HOME_BEST_U_V2, header, urlData),
  home: (data, cb, header, urlData) =>
    request(data, cb, HOME_PARTICIPANT_U, header, urlData),
  usersListGet: (data, cb, header, urlData) =>
    request(data, cb, USER_LIST_GET, header, urlData, true),
  usersListSearch: (data, cb, header, urlData, imageFetcher) =>
    request(data, cb, USER_LIST_SEARCH, header, urlData, imageFetcher),
  getOwnNewsFeeds: (data, cb, header, urlData) =>
    request(data, cb, OWN_NEWSFEEDS_U, header, urlData),
  getOwnNewsFeeds2: (data, cb, header, urlData) =>
    request(data, cb, OWN_NEWSFEEDS_U_V2, header, urlData),
  saveOwnSaved: (data, cb, header) =>
    request(data, cb, SAVE_SAVEDFEEDS_U, header),
  getOwnSaved: (data, cb, header, urlData) =>
    request(data, cb, OWN_SAVEDFEEDS_U, header, urlData),
  getUserContest: (data, cb, header, urlData) =>
    request(data, cb, USRE_CONTEST_U, header, urlData),
  reportPost: (data, cb, header) => request(data, cb, REPORT_POST_U, header),
  getOtherNewsFeeds: (data, cb, header, urlData) =>
    request(data, cb, OTHER_NEWSFEEDS_U, header, urlData),
  getOtherNewsFeeds2: (data, cb, header, urlData) =>
    request(data, cb, OTHER_NEWSFEEDS_U_V2, header, urlData),
  blockOtherUser: (data, cb, header, urlData) =>
    request(data, cb, OTHER_USER_BLOCK_U, header, urlData),
  unblockOtherUser: (data, cb, header, urlData) =>
    request(data, cb, OTHER_USER_UNBLOCK_U, header, urlData),
  updatePushNotifications: (data, cb, header) =>
    request(data, cb, UPDATE_PUSH_NOTIFICATIONS, header),
  likeOtherUser: (data, cb, header) =>
    request(data, cb, LIKE_OTHER_USER_U, header),
  getPushNotifications: (data, cb, header) =>
    request(data, cb, GET_PUSH_NOTIFICATIONS, header),
  subscribeUser: (data, cb, header, urlData) =>
    request(data, cb, SUBSCRIBE_USER_U, header, urlData),
  unsubscribeUser: (data, cb, header, urlData) =>
    request(data, cb, UNSUBSCRIBE_USER_U, header, urlData),
  updateSubscribeRequests: (data, cb, header) =>
    request(data, cb, SUBSCRIBE_REQUESTS_UPDATE_U, header),
  getSubscribedUsers: (data, cb, header, urlData) =>
    request(data, cb, SUBSCRIBED_UESERS_GET_U, header, urlData),
  getSubscribers: (data, cb, header, urlData) =>
    request(data, cb, SUBSCRIBERS_GET_U, header, urlData),
  getMessages: (data, cb, header, urlData) =>
    request(data, cb, MESSAGES_LIST_GET_U, header, urlData),
  getUserMessages: (data, cb, header, urlData) =>
    request(data, cb, GET_USER_MESSAGES_U, header, urlData),
  updateSeenMessage: (data, cb, header, urlData) =>
    request(data, cb, UPDATE_SEEN_MESSAGES, header, urlData),
  getPicsHomeList: (data, cb, header, urlData) =>
    request(data, cb, GET_PICS_HOME_U, header, urlData),
  getUserStory: (data, cb, header, urlData) =>
    request(data, cb, GET_PICS_STATUS_U, header, urlData),
  getPicsStatus: (data, cb, header, urlData) =>
    request(data, cb, GET_PICS_STATUS_U, header, urlData),
  getLikeYouNotifications: (data, cb, header) =>
    request(data, cb, GET_LIKE_YOU_NOTIFICATIONS, header),
  saveCampaignParticipant: (data, cb, header) =>
    request(data, cb, CAMPAIGN_PARTICIPANT_SAVE, header),
  postClick: (data, cb, header, urlData) =>
    request(data, cb, POST_CLICK_U, header, urlData),
  submitSurvey: (data, cb, header, urlData) =>
    request(data, cb, SUBMIT_SURVEY, header, urlData),
  companyCampaginPostClick: (data, cb, header, urlData) =>
    request(data, cb, CAMPAIGN_POST_CLICK_U, header, urlData),
  companyCampaginCallToAction: (data, cb, header, urlData) =>
    request(data, cb, CAMPAIGN_CALL_TO_ACTION_U, header, urlData),
  postViews: (data, cb, header, urlData) =>
    request(data, cb, POST_VIEW_U, header, urlData),
  deviceFirebaseTokenSave: (data, cb, header) =>
    request(data, cb, DEVICE_FIREBASE_TOKEN_SAVE_U, header),
  getNotifications: (data, cb, header, urlData) =>
    request(data, cb, GET_NOTIFICATIONS_U, header, urlData),
  getNotificationMentionInfo: (data, cb, header, urlData) =>
    request(data, cb, GET_NOTIFICATIONMENTION_INFO, header, urlData),
  getCamapignInfo: (data, cb, header, urlData) =>
    request(data, cb, GET_CAMPAIGN_INFO, header, urlData),
  getMediaInfo: (data, cb, header, urlData) =>
    request(data, cb, GET_MEDIA_INFO, header, urlData),
  getParticipantInfo: (data, cb, header, urlData) =>
    request(data, cb, GET_PARTICIPANT_INFO, header, urlData),
  deleteOwnPost: (data, cb, header, urlData) =>
    request(data, cb, DELETE_OWN_POST, header, urlData),
  postUpdate: (data, cb, header, urlData) =>
    request(data, cb, POST_UPDATE, header, urlData),
  deleteMessage: (data, cb, header, urlData) =>
    request(data, cb, MESSAGE_DELETE, header, urlData),
  forgotPassEmailSend: (data, cb, header) =>
    request(data, cb, FORGOT_PASS_EMAIL_SEND, header),
  validateResetPassword: (data, cb, urlData) =>
    request(
      data,
      cb,
      VALIDATE_RESET_PASSWORD,
      helpers.buildHeader({}),
      urlData,
    ),
  resetPassword: (data, cb, header) =>
    request(data, cb, RESET_PASSWORD, header),
  getNotificationCounter: (data, cb, header) =>
    request(data, cb, GET_NOTIFICATION_COUNTER, header),
  participantWinnersGetApi: (data, cb, header, urlData) =>
    request(data, cb, PARTICIPANTS_WINNERS_GET_U, header, urlData),
  validateRegister: (data, cb, urlData) =>
    request(data, cb, VALIDATE_REGISTER, helpers.buildHeader({}), urlData),
  getStaticInfo: (data, cb, header) =>
    request(data, cb, GET_STATIC_INFO, header),
  getCategories: (data, cb, header) =>
    request(data, cb, GET_CATEGORIES, header),
  awardUserPoints: (data, cb, header, urlData) =>
    request(data, cb, AWARD_USER_POINTS, header, urlData),
  getViewersList: (data, cb, header, urlData) =>
    request(data, cb, GET_VIEWERS_LIST, header, urlData),
  fetchActionPoints: (data, cb, header, urlData) =>
    request(data, cb, FETCH_ACTION_POINTS, header, urlData),

  //Privacy Screen
  activateDeactivateProfileSet: (data, cb, header) =>
    request(data, cb, ACTIVATE_DEACTIVATE_PROFILE_SET, header),
  advertizeProfileSet: (data, cb, header, urlData) =>
    request(data, cb, ADVERTIZE_PROFILE_SET, header, urlData),
  socialShareProfileSet: (data, cb, header, urlData) => {
    console.log("data", data);
    console.log("data URL", urlData);

    return request(data, cb, SOCIAL_SHARE_PROFILE_SET, header, urlData);
  },
  changePassword: (data, cb, header) =>
    request(data, cb, CHANGE_PASSWORD_U, header),
  changeEmail: (data, cb, header) => request(data, cb, CHANGE_EMAIL_U, header),

  //Filters
  categoryFilterGet: (data, cb, header) =>
    request(data, cb, CATEGORIES_GET_U, header),
  categoryFilterSave: (data, cb, header) =>
    request(data, cb, CATEGORIES_SAVE_U, header),
  offerTagFilterGet: (data, cb, header) =>
    request(data, cb, OFFER_TAG_GET_U, header),
  offerTagFilterSave: (data, cb, header) =>
    request(data, cb, OFFER_TAG_SAVE_U, header),
  inquiryTagFilterGet: (data, cb, header) =>
    request(data, cb, INQUIRY_TAG_GET_U, header),
  inquiryTagFilterSave: (data, cb, header) =>
    request(data, cb, INQUIRY_TAG_SAVE_U, header),
  hashtagFilterGet: (data, cb, header) =>
    request(data, cb, HASHTAG_TAG_GET_U, header),
  hashtagFilterSave: (data, cb, header) =>
    request(data, cb, HASHTAG_TAG_SAVE_U, header),

  //Service
  sendFeedback: (data, cb, header) =>
    request(data, cb, SEND_FEEDBACK_U, header),
  deleteAccount: (data, cb, header) =>
    request(data, cb, DELETE_ACCOUNT_U, header),
  sendReportProblem: (data, cb, header) =>
    request(data, cb, SEND_REPORT_PROBLEM_U, header),
  sendAuthorityReport: (data, cb, header) =>
    request(data, cb, SEND_REPORT_AUTHORITY_U, header),
  locationCountryFilterGet: (data, cb, header) =>
    request(data, cb, LOACTION_COUNTRY_GET_U, header),
};

// request({}, {
//     success: (res) => { console.log("res", res); },
//     error: () => {}
// }, {
//     type: 'GET',
//     url: 'http://10.0.28.189:3001/api/searchHistory'
// })

function getRequestData(data) {
  let formBody = [];
  let encodedKey;
  let encodedValue;
  for (let property in data) {
    encodedKey = property;
    encodedValue = data[property];
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&");
}

async function request(
  requestData,
  cb,
  featureURL,
  secureRequest = buildHeader(),
  urlData = "",
  imagePreLoader = false,
  option,
) {
  secureRequest = await secureRequest;
  const url = featureURL.dynamic ? featureURL.url(urlData) : featureURL.url;
  console.log(`apiUrl ==> ${url} 
  ,requestData ==> ${JSON.stringify(requestData)}
  ,option ==> ${option}
  ,secureRequest ==> ${JSON.stringify(secureRequest)}
  ,featureURL ==> ${JSON.stringify(featureURL)}`);
  if (!live) {
    console.groupCollapsed("API REQUEST");
    console.log({ featureURL });
    console.log({ secureRequest });
    console.log({ requestData });
    console.log({ url });
    console.groupEnd();
  }

  try {
    let response;

    if (featureURL.type === "GET") {
      response = await axios.get(url, {
        headers: secureRequest,
        params: requestData,
      });
      console.log(`axios response ${url} ==>`,response);
    } else if ("POST|PATCH|PUT".includes(featureURL.type)) {
      response = await axios[featureURL.type.toLocaleLowerCase()](
        url,
        requestData,
        {
          headers: secureRequest,
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            console.log("testpercent", percent);
            console.log("option", option);
            if (option) {
              option.value(percent);
            }
          },
        },
        
      );
     
    } else if ("DELETE".includes(featureURL.type)) {
      response = await axios.create({ headers: secureRequest }).delete(url);
    }
    if (!live) {
      console.groupCollapsed("API RESPONSE");
      console.log({ response });
      console.groupEnd();
    }
    if (cb.complete) cb.complete();
    console.log("url=>" + url, response.data);
    if (response.status == 200) {
     
      cb.success(response.data);
     
      const { data } = response.data;
      if (
        data &&
        Array.isArray(data) &&
        data.length > 0 &&
        (data[0].typeContent ||
          data[0].postType ||
          (data[0].profileUrl && data[0].username && imagePreLoader))
      ) {
        const isUsers =
          data[0].profileUrl && data[0].username && imagePreLoader;
        let imageUrls = [];
        let fastImageUrls = [];

        if (isUsers) {
          // console.log("Users");
          let x = data.map((pc) => {
            return pc.profileUrl;
          });
          imageUrls = uniqBy(x);
        } else if (!data[0].createdAt) {
          console.log("here3");
          // console.log("Grid");
          data.forEach((pc) => {
            pc.typeContent === "image" && pc.resizeMediaUrl
              ? fastImageUrls.push({ uri: pc.resizeMediaUrl })
              : null;
          });
        } else {
          // console.log("List");
          data.forEach((pc) => {
            (pc.typeContent === "image" || pc.postType === "campaign") &&
            pc.mediaUrl
              ? imageUrls.push(pc.mediaUrl)
              : null;
          });
        }

        if (imageUrls.length > 0 || fastImageUrls.length > 0) {
          imagePreFetcher(imageUrls, fastImageUrls);
        }
      }
    } else {
      let invalidLogin = await loginValidate(response);
      if (invalidLogin) logout();
      cb.error(response.data);
    }
  } catch (error) {
    // console.log('ErrCatch', error);

    !live ? console.log({ error }) : null;
    if (cb.complete) cb.complete();
    if (error.response) {
      console.log("ERROR", error.response);
      // if(error.response.data.message === 'Invalid credentials' || error.response.data.error === 'Error: Invalid credentials') {
      //     // logout();
      cb.error(error.response.data);
      // }
      // let invalidLogin = await loginValidate(error.response);
      // if(invalidLogin){
      // logout();
      // console.log("error2 :",error.response.data);
      cb.error(error.response.data);

      // }
    } else {
      let invalidLogin = await loginValidate(error);
      if (invalidLogin) logout();
      // console.log("error3 :",error);
      cb.error(error);
    }
  }
}

 function loginValidate(res) {
  let loginFailed = false;
  if (res.data) {
    console.log("ERROR", res);

    if (res.data.message) {
      if (res.data.message === "Invalid credentials") {
        loginFailed = true;
      }
    }
    if (res.data.error) {
      if (res.data.error === "Error: Invalid credentials") {
        loginFailed = true;
      }
    }
  }
  return loginFailed;
}

function logout() {
  setTimeout(() => {
    Alert.alert("Success", "Authentication failed", [
      {
        text: "OK",
        onPress: () => {
          NavigationService.navigate("rootNav", "Login", {});
        },
      },
    ]);
  }, 300);
}
