import { Dimensions, Platform } from "react-native";
import env from "../../../env.json";

const appConfigs = {
  staging: "staging",
  production: "production",
};
//* Use this to change App Environment
const appEnv = appConfigs.staging;
// const appEnv = appConfigs.production;
const appEnvJson = env[appEnv];
console.log("appEnvJson", appEnvJson);
export const RE_CAPTCHA_SITE_KEY = appEnvJson.RE_CAPTCHA_SITE_KEY;

export const live = true;
// export const BASE_URL = 'http://184.72.194.163/';
// export const BASE_URL = "https://api.picstagraph.com/";
export const BASE_URL = "https://stagingapi.picstagraph.com/v2/";
// export const BASE_URL = "https://stagingapi.picstagraph.com/";
//export const BASE_URL = 'http://picstagraph-backend-dev2.twgmjxarxk.us-east-1.elasticbeanstalk.com/';
//export const BASE_URL = 'http://www.devpicstagraph-dev.us-east-1.elasticbeanstalk.com/';

// export const WEB_URL = 'http://picstagraph.com.s3-website-us-east-1.amazonaws.com/';

export const MESSAGE_SOCKET_URL = "https://socket.picstagraph.com/";

export const SHA =
  "669189955580-hp1nr4n9kgc1co7cjgkkrvn61oe3s31d.apps.googleusercontent.com";

export const deviceId = ["4502E89A38B0363CCC440DC0E75C0DCE"];
export const userImageUrl =
  "https://stagingassets.picstagraph.com/profile/1552387064030-2205256774854474505_medium.jpg";

export const postAdId =
  Platform.OS === "ios"
    ? "ca-app-pub-4491798631387882/8863997657"
    : "ca-app-pub-4491798631387882/9687846934";

export const storyAdId =
  Platform.OS === "ios"
    ? "ca-app-pub-4491798631387882/5655079068"
    : "ca-app-pub-4491798631387882/4818663636";

let WEB_URL1 = "https://api.picstagraph.com/";
if (BASE_URL.search("stagingapi") > 0) {
  WEB_URL1 = "https://staging.picstagraph.com/";
} else if (BASE_URL.search("api") > 0) {
  WEB_URL1 = "https://app.picstagraph.com/";
}

export const WEB_URL = WEB_URL1;

export const CONTEST_TYPE = {
  IMAGE_CONTEST: "image",
  VIDEO_CONTEST: "video",
};

export const POST_TYPES = {
  CompanyCampaign: "companycampaign",
  Campaign: "campaign",
  CreatorCampaign: "creatorcampaign",
  Blog: "blog",
  CompanyParticipantCampaign: "participant",
  Advertise: "advertise",
  Contest: "contest",
  Userpost: "userpost",
  MediaPost: "media",
  Ad: "advertisement",
};

export const WINNER_OPTIONS = {
  MOST_POINTS: "mostpoints",
  JURY: "jury",
  DRAW: "draw",
  TOP_3: "top 3",
  TOP_10: "top 10",
};

export const REVIEW_ENUM = ["yes", "no", "never"];

export const GENDER_ENUM = ["female", "male", "secret"];

export const DOB_ENUM = ["DD", "MM", "YYYY"];

export const LINK_TASK = {
  Profile: "news-feed",
  Campaign: "contest",
  Media: "media-share?media",
  Participant: "media-share?participant",
};

export const LINK_SCREENS = {
  Profile: "OthersProfile",
  Campaign: "CompanyCampaign",
  Media: "NotificationScreen",
  Participant: "NotificationScreen",
};

export const LEVEL_POINTS = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 750,
  6: 1000,
  7: 1250,
  8: 1500,
  9: 2000,
  10: 2500,
};

export const LEVEL_POINTS_DIFF = {
  1: 100,
  2: 150,
  3: 250,
  4: 250,
  5: 250,
  6: 250,
  7: 250,
  8: 500,
  9: 500,
};

export const SHARE_URL = [
  { type: POST_TYPES.Campaign, url: "contest/information/company/" },
  { type: POST_TYPES.MediaPost, url: "media-share?media/" },
  { type: POST_TYPES.Blog, url: "media-share?media/" },
  {
    type: POST_TYPES.CompanyParticipantCampaign,
    url: "media-share?participant/",
  },
];

var userData = {
  activeVideoPost: null,
  appSocket: "",
  token: "",
  loginValidated: false,
  viewedPostsArr: [],
  postMediaTobeLoaded: {},
  visitedPostsArr: [],
  deletedPosts: [],
  savedPosts: [],
  reportedPosts: [],
  reportedComments: [],
  storyImages: {},
  homeChangeTab: 0,
  homeNewsfeedLoad: 0,
  homeExploreLoad: 0,
  homeBestLoad: 0,
  profileNewsFeedLoad: 0,
  homeParticipantLoad: 0,
  initialRouteName: "CampaignNavigator",
  notificationData: {},
};

export const setUserData = (prop, value) => {
  userData[prop] = value;
};
export const getUserData = (prop) => userData[prop];
export const getAllData = () => userData;

export const fcmToken = "";
export const receivingNotificationId = "";

export const CREDS = {
  LINKING_APP_NAME: "picstagraphApp",
  INSTAGRAM_CLIENT_ID: "58e2155f75df4cbc9560e9f33facce06",
  TWITTER_COMSUMER_KEY: "5ODNF25DfGXVnWYvjgeyiGQjh",
  TWITTER_CONSUMER_SECRET: "7ubq7Ig5kI6RCn80z2J1AU78soy4E3JZ9hswd3l65CHLJP3dOx",
  //ANALYTICS_TRACKER_ID: "UA-129127828-1", //Mobils-app account
  ANALYTICS_TRACKER_ID: "UA-127336629-1", //Mobils-app account
  //ANALYTICS_TRACKER_ID: "UA-129118641-1", //Demo account
  JWT_SECRET_KEY: "picstagraph90",
  GOOGLE_SEARCH_PLACES_KEY: "AIzaSyD8nNA8oClra35kgn3VAi1Eo5jdZnNgd24",
  RESET_PASS_TASK: "resetPassword",
  LOGIN_TASK: "login",
  FACEBOOK_ID: "166253321496998",
};

export const WINDOW = Dimensions.get("window");
export const WINDOW_HEIGHT = Dimensions.get("window").height;
export const WINDOW_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const iPhoneX =
  Platform.OS == "ios" && WINDOW.height == 812 && WINDOW.width == 375
    ? true
    : false;
export const footerHeight = iPhoneX ? 80 : 60;

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const LANG_ARR = {
  English: "en",
  German: "he",
};

export const FILTERS_TYPES = {
  USER_GROUPS: "userGroups",
  RELEVANCE: "relevance",
  JOBCATEGORY: "job_category",
  REMOTE_TRUE: "remote",
  CONTENT_FILTER: "contentType",
  TARGET_GROUP: "targetGroup",
  LOCATION: "location",
  LOCATIONCOUNTRY: "locationCountry",
  RADIUS: "radius",
  CATEGORY: "category",
  GENDER: "gender",
  AGE: "age",
  HASHTAG: "hashtag",
  OFFERTAG: "offerTag",
  INQUIRYTAG: "inquiryTag",
  STATUS: "status",
  PRICE: "prize",
};

export const FILTERS_FOR = {
  DEFAULT: "DEFAULT",
  COMPANY: "COMPANY",
  CREATOR: "CREATOR",
  PARTICIPANT: "PARTICIPANT",
  HOME_EXPLORE: "HOME_EXPLORE",
  HOME_PARTICIPANT: "HOME_PARTICIPANT",
  HOME_USER: "HOME_USER",
  RELEVANCE:"RELEVANCE",
  PICS: "PICS",
  SUBSCRIBED_STORY: "SUBSCRIBED_STORY",
  EXPLORE_STORY: "EXPLORE_STORY",
  HOME_BEST: "HOME_BEST",
  JOBS: "JOBS",
  REMOTE:"REMOTE"
};

export const FILTER_ROUTES = [
  { key: FILTERS_TYPES.CONTENT_FILTER, filter: "Content Type" },
  { key: FILTERS_TYPES.RELEVANCE, filter: "Relevance" },
  { key: FILTERS_TYPES.CATEGORY, filter: "Category" },
  { key: FILTERS_TYPES.HASHTAG, filter: "Hashtag" },
  { key: FILTERS_TYPES.LOCATION, filter: "Location" },
  { key: FILTERS_TYPES.USER_GROUPS, filter: "User groups" },
  { key: FILTERS_TYPES.STATUS, filter: "Status" },
  { key: FILTERS_TYPES.TARGET_GROUP, filter: "Target group" },
  { key: FILTERS_TYPES.LOCATIONCOUNTRY, filter: "Location" },
  { key: FILTERS_TYPES.RADIUS, filter: "Radius" },
  { key: FILTERS_TYPES.GENDER, filter: "Gender" },
  { key: FILTERS_TYPES.AGE, filter: "Age" },
  { key: FILTERS_TYPES.OFFERTAG, filter: "Offer tag" },
  { key: FILTERS_TYPES.INQUIRYTAG, filter: "Inquiry tag" },
  { key: FILTERS_TYPES.PRICE, filter: "Prize" },
  { key: FILTERS_TYPES.REMOTE_TRUE, filter: "Remote" },
  { key: FILTERS_TYPES.JOBCATEGORY, filter: "Job Category" },
];

export const FILTERS_TO_SHOW = {
  [FILTERS_FOR.HOME_USER]: [
    FILTERS_TYPES.RELEVANCE,
    FILTERS_TYPES.CATEGORY,
    FILTERS_TYPES.OFFERTAG,
    // FILTERS_TYPES.LOCATION,
  ],
  [FILTERS_FOR.JOBS]: [
    FILTERS_TYPES.JOBCATEGORY,
    FILTERS_TYPES.REMOTE_TRUE,
  ],
  [FILTERS_FOR.HOME_EXPLORE]: [
    FILTERS_TYPES.RELEVANCE,
    FILTERS_TYPES.CATEGORY,
    FILTERS_TYPES.CONTENT_FILTER,
    // FILTERS_TYPES.LOCATION,
    // FILTERS_TYPES.HASHTAG,
  ],
  [FILTERS_FOR.COMPANY]: [
    FILTERS_TYPES.RELEVANCE,
    // FILTERS_TYPES.LOCATION,
    FILTERS_TYPES.CATEGORY,
    FILTERS_TYPES.CONTENT_FILTER,
    FILTERS_TYPES.PRICE,
  ],
  [FILTERS_FOR.HOME_PARTICIPANT]: [
    FILTERS_TYPES.CONTENT_FILTER,
    FILTERS_TYPES.RELEVANCE,
    // FILTERS_TYPES.LOCATION,
    FILTERS_TYPES.CATEGORY,
    // FILTERS_TYPES.HASHTAG,
  ],
  [FILTERS_FOR.DEFAULT]: [
    FILTERS_TYPES.USER_GROUPS,
    FILTERS_TYPES.RELEVANCE,
    FILTERS_TYPES.CONTENT_FILTER,
    FILTERS_TYPES.TARGET_GROUP,
    FILTERS_TYPES.LOCATION,
    FILTERS_TYPES.CATEGORY,
    FILTERS_TYPES.GENDER,
    FILTERS_TYPES.AGE,
    FILTERS_TYPES.HASHTAG,
    FILTERS_TYPES.OFFERTAG,
  ],
  [FILTERS_FOR.SUBSCRIBED_STORY]: [
    FILTERS_TYPES.LOCATION,
    FILTERS_TYPES.CATEGORY,
  ],
  [FILTERS_FOR.EXPLORE_STORY]: [FILTERS_TYPES.LOCATION, FILTERS_TYPES.CATEGORY],
};

export const SUBSCRIBE_TYPE = {
  SUBSCRIBERS: "subscribers",
  SUBSCRIBED: "subscribed",
  SUBSCRIBE: "subscribe",
  UNSUBSCRIBE: "unsubscribe",
};

export const MEDIA_TYPE = {
  MEDIA_POST: "media",
  PROFILE: "profile",
  PARTICIPANT: "participant",
  Blog: "blog",
};

export const PARTICIPANT_TYPE = {
  PENDING: "pendingParticipant",
  APPROVED: "approvedParticipant",
  WINNER: "winner",
  FINALIST: "finalistParticipant",
};

export const MESSAGE_TYPE = ["subscriber", "unknown", "company", "userMessage"];

export const PAGINATION = {
  subscribers: 10,
  comments: 15,
  mentionedUsers: 10,
  newsfeed: 10,
  homeExplore: 5,
  homeBest: 5,
  homeUsers: 10,
  homeParticipant: 10,
  ownNewsfeed: 15,
  companyCampaign: 10,
  creatorCampaign: 10,
  ownSaved: 10,
  ownContest: 5,
  likeList: 15,
  othersNewsfeed: 15,
  companyParticipant: 1,
  participantTop10: 20,
  notification: 10,
  messageUsers: 10,
  homePics: 3,
};

export const REPORT_TYPES = {
  USER: "user",
  COMMENT: "comment",
  PICS: "pics",
};

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  pages: 0,
};

export const EMPTY_LOCATION = JSON.stringify({
  longitude: "",
  latitude: "",
  address: "",
});

export const DEFAULT_VIDEO_PROPS = {
  paused: true,
  muted: true,
  repeat: Platform.OS === "ios" ? true : false,
  fullscreen: false,
};