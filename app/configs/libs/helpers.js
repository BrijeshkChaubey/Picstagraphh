import moment from "moment";
var forge = require("node-forge");
import * as validators from "./Validators";

import { globals } from "..";
import FastImage from "react-native-fast-image";
import NavigationService from "../../components/navigations/NavigationService";
import {
  Platform,
  PermissionsAndroid,
  Alert,
  Linking,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  map,
  filter,
  reject,
  concat,
  find,
  toUpper,
  uniqBy,
  findIndex,
  differenceBy,
  orderBy,
  shuffle,
  chain,
  forEach,
  chunk,
} from "lodash";
import NetInfo from "@react-native-community/netinfo";
//import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";


export const SECRET_KEY =
  "B374A26A71490437AA024E4FADD5B497FDFF1A8EA6FF12F6FB65AF2720B59CCF";

export const _setStateData = (obj, prop, value) => {
  obj[prop][0] = value;
  return obj;
};

export const nameShortner = (name) => {
  const nameSeperate = name.split("");
  let val = "";

  if (nameSeperate.length < 13) {
    return name;
  } else {
    for (i = 0; i < nameSeperate.length; ++i) {
      if (i < 10) {
        val += nameSeperate[i];
      } else if (i < 13) {
        val += ".";
      }
    }
    return val;
  }
};

export const pageFinder = (index, limit) => {
  const realIndex = index == 0 ? 1 : index;
  return Math.ceil(realIndex / limit);
};

export function getUserLevel(likeCount, levelPoints) {
  if (likeCount < levelPoints[2]) return 1;
  else if (likeCount >= levelPoints[2] && likeCount < levelPoints[3]) return 2;
  else if (likeCount >= levelPoints[3] && likeCount < levelPoints[4]) return 3;
  else if (likeCount >= levelPoints[4] && likeCount < levelPoints[5]) return 4;
  else if (likeCount >= levelPoints[5] && likeCount < levelPoints[6]) return 5;
  else if (likeCount >= levelPoints[6] && likeCount < levelPoints[7]) return 6;
  else if (likeCount >= levelPoints[7] && likeCount < levelPoints[8]) return 7;
  else if (likeCount >= levelPoints[8] && likeCount < levelPoints[9]) return 8;
  else if (likeCount >= levelPoints[9] && likeCount < levelPoints[10]) return 9;
  else if (likeCount >= levelPoints[10] && likeCount < levelPoints[11])
    return 10;
  else if (likeCount >= levelPoints[11] && likeCount < levelPoints[12])
    return 11;
  else if (likeCount >= levelPoints[12] && likeCount < levelPoints[13])
    return 12;
  else if (likeCount >= levelPoints[13] && likeCount < levelPoints[14])
    return 13;
  else if (likeCount >= levelPoints[14] && likeCount < levelPoints[15])
    return 14;
  else if (likeCount >= levelPoints[15]) return 15;
}

// export function getUserLevel(likeCount) {
//     if (likeCount <= 5) return 1;
//     else if (likeCount > 5 && likeCount <= 10) return 2;
//     else if (likeCount > 10 && likeCount <= 15) return 3;
//     else if (likeCount > 15 && likeCount <= 20) return 4;
//     else if (likeCount > 20 && likeCount <= 25) return 5;
//     else if (likeCount > 25 && likeCount <= 30) return 6;
//     else if (likeCount > 30 && likeCount <= 35) return 7;
//     else if (likeCount > 35 && likeCount <= 40) return 8;
//     else if (likeCount > 40 && likeCount <= 45) return 9;
//     else if (likeCount > 45) return 10;
// }

export const filterRemover = (string) => {
  if (string == "") {
    return string;
  }

  const filterSeperate = string.split("&");
  let val = 0;

  for (let i = 0; i < filterSeperate.length; ++i) {
    let filterVal = filterSeperate[i];
    const filterX = filterVal.split("=");

    if (filterX.length > 0 && filterX[filterX.length - 1] == "verified") {
      val += 1;
    } else if (filterX.length > 0 && filterX[0] == "address") {
      val += 1;
    }
  }

  // const filterSeperate = string.split('&')
  // let val = false

  // for(i = 0; i < filterSeperate.length; ++i){
  //     let filterVal = filterSeperate[i];
  //     const filterX = filterVal.split('=')

  //     if(filterX.length > 0 && filterX[filterX.length - 1] == 'verified'){
  //         val = true;
  //         break;
  //     }
  // }

  if (val == 2) {
    let changedString = "";

    for ( let i = 0; i < filterSeperate.length; ++i) {
      let filterVal = filterSeperate[i];
      const filterX = filterVal.split("=");

      if (filterX.length > 0 && filterX[filterX.length - 1] != "verified") {
        const andX = i + 1 == filterSeperate.length ? "" : "&";
        changedString = changedString + filterSeperate[i] + andX;
      }
    }
    return changedString;
  } else {
    return string;
  }
};

// TODO: Both _spaceChecker and _emailCorrector can be replaced with ==> text1.replace(/\s+/g, '')
export const _spaceChecker = (value) => {
  const splitData = value.split("");

  // if(splitData.length > 0){
  //     return splitData[splitData.length - 1] == ' ' ? true : false;
  // }
  for (let i = 0; i < splitData.length; ++i) {
    if (splitData[i] == " ") {
      return true;
    }
  }
  return false;
};
//
export const _emailCorrector = (email) => {
  const splitData = email.split("");
  let value = "";

  for (let i = 0; i < splitData.length; ++i) {
    if (splitData[i] != " ") {
      value = value + splitData[i];
    }
  }
  return value;
};

export const _validateData = (obj) => {
  let validation = {
    status: true,
    data: [],
  };
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let ele = obj[key];
      let value = ele[0];
      console.log('ele,value', ele,value)
      let validationArr = ele[0].split("|");//changed from ele[1] to the ele[0]

      if (ele[3]) {
        let res = ele[3]();

        if (!res.status) {
          validation.status = false;
          validation.data.push(res.data);
        }
      }

      validationArr.map((item) => {
        let itemArr = item.split("-");

        switch (itemArr[0]) {
          case "required":
            if (!validators.RequiredFieldValidator(value)) {
              validation.status = false;
              validation.data.push(ele[2] + " is required");
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' is required')) // ' is required')
            }
            break;
          case "number":
            if (!validators.NumberValidator(value) && value != "") {
              validation.status = false;
              validation.data.push(ele[2] + " must be number");
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be number')) //' must be number')
            }
            break;
          case "mobnumber":
            if (!validators.MobileNumberValidator(value) && value != "") {
              validation.status = false;
              validation.data.push(ele[2] + " must be number");
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be number')) //' must be number')
            }
            break;
          case "email":
            if (!validators.EmailValidator(value) && value != "") {
              validation.status = false;
              validation.data.push(ele[2] + " must be valid email");
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be valid email')) //' must be valid email')
            }
            break;
          case "public_email":
            if (!validators.EmailValidator(value) && value != "") {
              validation.status = false;
              validation.data.push(ele[2] + " must be valid email");
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be valid email')) //' must be valid email')
            }
            break;
          case "url":
            if (!validators.UrlValidator(value) && value != "") {
              validation.status = false;
              validation.data.push(ele[2] + " must be valid URL");
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be valid URL')) // ' must be valid URL')
            }
            break;
          case "link":
            if (!validators.LinkValidator(value)) {
              validation.status = false;
              validation.data.push(ele[2] + " must be valid link");
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be valid URL')) //' must be valid link')
            }
            break;
          case "min":
            if (value.length < itemArr[1]) {
              validation.status = false;
              validation.data.push(
                ele[2] + ` must be minimum ${itemArr[1]} characters`,
              );
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be minimum') + itemArr[1] + getLocale(currentLang, 'validator', ' characters'))  // ` must be minimum ${itemArr[1]} characters`)
            }
            break;
          case "password":
            if (value.length < itemArr[1]) {
              validation.status = false;
              validation.data.push(
                ele[2] +
                  ` has atleast ${itemArr[1]} characters. Enter at least one special character (.-/). Enter a capital letter. Combination of alphabet and numbers
`,
              );
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must be minimum') + itemArr[1] + getLocale(currentLang, 'validator', ' characters'))  // ` must be minimum ${itemArr[1]} characters`)
            }
            break;
          case "max":
            if (value.length > itemArr[1]) {
              validation.status = false;
              validation.data.push(
                ele[2] + ` must be maximum ${itemArr[1]} characters`,
              );
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', '') + itemArr[1] + getLocale(currentLang, 'validator', ''))
            }
            break;
          case "space":
            if (!validators.spaceValidator(value)) {
              validation.status = false;
              validation.data.push(ele[2] + ` must not contain spaces`);
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must not contain spaces')) // ` must not contain spaces`)
            }
            break;
          case "emoji":
            if (!validators.emojisValidator(value)) {
              validation.status = false;
              validation.data.push(ele[2] + ` must not contain emoji`);
              // validation.data.push(ele[2] + getLocale(currentLang, 'validator', ' must not contain emoji'))  //` must not contain emoji`)
            }
            break;
          default:
            break;
        }
      });
    }
  }
  return validation;
};

//Check if object is empty
export const _isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const _isObjectInArr = (obj, arr) => {
  var state = false;
  for (let i = 0; i < arr.length; i++) {
    var count = 0;
    for (var key in arr[i]) {
      if (arr[i].hasOwnProperty(key)) {
        if (arr[i][key] == obj[key]) {
          count++;
        }
      }
    }
    if (Object.keys(obj).length == count) {
      state = true;
    }
  }
  return state;
};

export const _removeObjectInArr = (obj, arr) => {
  var repeatIndex = -1;
  for (let i = 0; i < arr.length; i++) {
    var count = 0;
    for (var key in arr[i]) {
      if (arr[i].hasOwnProperty(key)) {
        if (arr[i][key] == obj[key]) {
          count++;
        }
      }
    }
    if (Object.keys(obj).length == count) {
      repeatIndex = i;
    }
  }
  arr = arr.filter((item, index) => {
    return repeatIndex == index ? false : true;
  });
  return arr;
};

//Encrypt data AES 256
export const _encryp = (secureData) => {
  var key = forge.random.getBytesSync(64);
  var iv = forge.random.getBytesSync(64);
  var cipher = forge.cipher.createCipher("AES-CBC", SECRET_KEY);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(secureData));
  cipher.finish();
  var encrypted = cipher.output;
  return encrypted;
};

export const _sortByKeyArr = (array, key, type = "all") => {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

export const _standardCb = (loader) => {
  return {
    error: (error) => {
      let cb = {
        ok: () => {},
      };
      setTimeout(() => {
        loader.error("Error", error.message, cb);
      }, 100);
    },
    complete: () => loader.hideLoader(),
  };
};
export const _getData = (data) => {
  let obj = {};
  for (var key in data) {
    if (data.hasOwnProperty(key)) obj[key] = data[key][0];
  }
  return obj;
};

export const buildHeader = async(headerParams = {}) => {
  let secureFgp = await AsyncStorage.getItem('secureFgp');
  console.log("Secure", secureFgp);
  var header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
   "secureFgp": secureFgp,
    //'Access-Control-Allow-Origin': 'http://127.0.0.1:8081',
  };
  header = Object.assign({}, header, headerParams);
  return await header;
};

export const _objectArrToArrConvert = (arr, prop) => {
  var newArr = [];
  arr.map((item) => {
    newArr.push(item[prop]);
  });
  return newArr;
};

export const getLocale = (prop, string1, string2) => {
  if (!prop?.translations[prop.activeLanguage]) {
    return "Not found";
  } else if (!prop?.translations[prop.activeLanguage][string1]) {
    return "Not found";
  } else if (!prop?.translations[prop.activeLanguage][string1][string2]) {
    return "Not found";
  }
  return prop?.translations[prop.activeLanguage][string1][string2];
};

export const buildPostType = (type, userType = "") => {
  if (!type) {
    return false;
  } else {
    if (userType) {
      if (userType === "creator" || userType === "company") {
        return type === "campaign" && userType === "blog"
          ? "creatorcampaign"
          : "campaign";
      } else {
        return type.toLocaleLowerCase();
      }
    } else {
      return type.toLocaleLowerCase();
    }
  }
};

export const pauseVideo = (mute = false) => {
  let activeVideoPost = globals.getUserData("activeVideoPost");

  if (activeVideoPost !== null) {
    activeVideoPost.component.pausVideo(mute);
  }
  globals.setUserData("activeVideoPost", null);
};

export const getBackendPostType = (contentInfo, type, globalType) => {
  type = buildPostType(contentInfo.postType, contentInfo.userType || "");
  let postType = "";
  type = type.toLocaleLowerCase();
  switch (type) {
    case globalType.Blog:
      postType = "blog";
      break;

    case globalType.Campaign:
    case globalType.CreatorCampaign:
      postType = "campaign";
      break;

    case globalType.CompanyParticipantCampaign:
      postType = "participant";
      break;

    case globalType.Ad:
    case globalType.Advertise:
      postType = "advertisement";
      break;

    case globalType.Userpost:
    case globalType.MediaPost:
      postType = "media";

    default:
      break;
  }
  return postType;
};

export const dateToFromNowDaily = (myDate, formatStr, localize) => {
  const getDay = (date) => {
    const day = moment(date).format("dddd");

    return getLocale(localize, "day_format", day.toLocaleLowerCase());
  };
  let fromNow = moment(myDate).fromNow();

  // moment(myDate).calendar(null, {
  //   // when the date is closer, specify custom values
  //   lastWeek: () => {
  //     return `[${getLocale(localize, "day_format", "last")} ${getDay(
  //       myDate
  //     )}]`;
  //   },
  //   lastDay: () => {
  //     return `[${getLocale(localize, "day_format", "yesterday")}]`;
  //   },
  //   sameDay: () => {
  //     return `[${getLocale(localize, "day_format", "today")}]`;
  //   },
  //   nextDay: () => {
  //     return getDay(myDate);
  //   },
  //   nextWeek: () => {
  //     return getDay(myDate);
  //   },
  //   // when the date is further away, use from-now functionality
  //   sameElse: () => {
  //     console.log("getDay(myDate) fromNow", fromNow);
  //     return fromNow;
  //   },
  // });
  return moment(myDate).calendar(null, {
    // when the date is closer, specify custom values
    lastWeek: "[Last] dddd",
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    // when the date is further away, use from-now functionality
    sameElse: function() {
      return "[" + fromNow + "]";
    },
  });
};

export const getMessageSeperator = (
  date,
  localize,
  shouldDateFormat = false
) => {
  const formatStr = "DD/MM/YYYY";

  if (shouldDateFormat && date) {
    return moment(date).format(formatStr);
  } else if (date) {
    return dateToFromNowDaily(date, formatStr, localize);
  }
  return "";
};

export const getDuration = (seconds) => {
  // multiply by 1000 because Date() requires miliseconds
  var date = new Date(seconds * 1000);
  var hh = date.getUTCHours();
  var mm = date.getUTCMinutes();
  var ss = date.getSeconds();
  // If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
  // if (hh > 12) {hh = hh % 12;}
  // These lines ensure you have two-digits
  if (hh < 10) hh = "0" + hh;
  if (mm < 10) mm = "0" + mm;
  if (ss < 10) ss = "0" + ss;
  // This formats your string to HH:MM:SS
  var t = hh + ":" + mm + ":" + ss;
  return t;
};

export const aspect_ratio = (val, lim) => {
  var lower = [0, 1];
  var upper = [1, 0];

  while (true) {
    var mediant = [lower[0] + upper[0], lower[1] + upper[1]];

    if (val * mediant[1] > mediant[0]) {
      if (lim < mediant[1]) {
        return upper;
      }
      lower = mediant;
    } else if (val * mediant[1] == mediant[0]) {
      if (lim >= mediant[1]) {
        return mediant;
      }
      if (lower[1] < upper[1]) {
        return lower;
      }
      return upper;
    } else {
      if (lim < mediant[1]) {
        return lower;
      }
      upper = mediant;
    }
  }
};

export const buildFilterUrl = (filterScreen, filtersData, FILTERS_TYPES) => {
  var filterFor = filtersData[filterScreen];
  let str = "";
  let category = filterFor[FILTERS_TYPES.CATEGORY];
  str += category[0] ? "category=" + category[0].api : "";

  let price = filterFor[FILTERS_TYPES.PRICE];
  str += price[0] ? "offers=" + price[0].api : "";

  let relevance = filterFor[FILTERS_TYPES.RELEVANCE];
  str += str !== "" && relevance[0] ? "&" : "";
  str += relevance[0] ? "relevance=" + relevance[0].api : "";

  let typeContent = filterFor[FILTERS_TYPES.CONTENT_FILTER];
  str += str !== "" && typeContent[0] ? "&" : "";
  str += typeContent[0] ? "typeContent=" + typeContent[0].key : "";

  let gender = filterFor[FILTERS_TYPES.GENDER];
  str += str !== "" && gender[0] ? "&" : "";
  str += gender[0] ? "gender=" + gender[0].gender : "";

  let locationCountry = filterFor[FILTERS_TYPES.LOCATIONCOUNTRY];
  str += str !== "" && locationCountry[0] ? "&" : "";
  str += locationCountry[0] ? "addressCountry=" + locationCountry[0].name : "";

  let location = filterFor[FILTERS_TYPES.LOCATION];
  str += str !== "" && location[0] ? "&" : "";
  str += location[0]
    ? "latitude=" +
      location[0].latitude +
      "&longitude=" +
      location[0].longitude +
      "&address=" +
      location[0].address
    : "";

  let radius = filterFor[FILTERS_TYPES.RADIUS];
  str += str !== "" && radius[0] ? "&" : "";
  str += radius[0] ? "radius=" + radius[0].key : "";

  let offerTag = filterFor[FILTERS_TYPES.OFFERTAG];
  str += str !== "" && offerTag[0] ? "&" : "";
  str += offerTag[0] ? "offerTag=" + offerTag[0]._id : "";

  let inquiryTag = filterFor[FILTERS_TYPES.INQUIRYTAG];
  str += str !== "" && inquiryTag[0] ? "&" : "";
  str += inquiryTag[0] ? "inquiryTag=" + inquiryTag[0]._id : "";

  let hashtag = filterFor[FILTERS_TYPES.HASHTAG];
  str += str !== "" && hashtag[0] ? "&" : "";
  // str += hashtag[0] ? 'hashTag='+hashtag[0].value : '';

  str +=
    hashtag[0] && hashtag[0].value
      ? "hashTag=" + hashtag[0].value
      : hashtag[0]
      ? "hashTag=" + hashtag[0]
      : "";

  let status = filterFor[FILTERS_TYPES.STATUS];
  str += str !== "" && status[0] ? "&" : "";
  str += status[0] ? "campaignStatus=" + status[0].api : "";

  return str;
};

export const getPostLocation = (locationObj) => {
  let location = "";
  if (locationObj) {
    if (typeof locationObj === "object") {
      if (locationObj.address) location = locationObj.address;
    } else {
      locationObj = JSON.parse(locationObj);
      if (locationObj.address) location = locationObj.address;
    }
  }
  return location;
};

export const tabChange = () => {
  NavigationService.reset("tabNav");
  NavigationService.navigate("tabNav", "HomeNavigator");
  let homeTabChange = globals.getUserData("homeChangeTab");

  if (homeTabChange) {
    homeTabChange(0, false);
  }
};

export const hashtagExploreNavigate = (hashtag) => {
  hashtag = hashtag.substr(1);
  NavigationService.reset("tabNav");
  NavigationService.navigate("tabNav", "HomeNavigator");
  let homeTabChange = globals.getUserData("homeChangeTab");

  if (homeTabChange) {
    homeTabChange(1, false, true);
  } else {
    const interOne = setInterval(() => {
      homeTabChange = globals.getUserData("homeChangeTab");
      if (homeTabChange) {
        clearInterval(interOne);
        homeTabChange(1, false, true);
      }
    }, 500);
  }

  let homeExploreLoad = globals.getUserData("homeExploreLoad");

  if (homeExploreLoad) {
    homeExploreLoad(hashtag);
  } else {
    const interTwo = setInterval(() => {
      homeExploreLoad = globals.getUserData("homeExploreLoad");
      if (homeExploreLoad) {
        clearInterval(interTwo);
        homeExploreLoad(hashtag);
      }
    }, 500);
  }
};

export const newsNavigateRefresh = () => {
  NavigationService.reset("tabNav");
  NavigationService.navigate("tabNav", "HomeNavigator");
  let homeTabChange = globals.getUserData("homeChangeTab");

  if (homeTabChange) {
    homeTabChange(1);
  } else {
    const interOne = setInterval(() => {
      homeTabChange = globals.getUserData("homeChangeTab");
      if (homeTabChange) {
        clearInterval(interOne);
        homeTabChange(1);
      }
    }, 500);
  }

  let homeNewsfeedLoad = globals.getUserData("homeNewsfeedLoad");

  if (homeNewsfeedLoad) {
    homeNewsfeedLoad();
  } else {
    const interTwo = setInterval(() => {
      homeNewsfeedLoad = globals.getUserData("homeNewsfeedLoad");
      if (homeNewsfeedLoad) {
        clearInterval(interTwo);
        homeNewsfeedLoad();
      }
    }, 500);
  }
};

export const exploreNavigateRefresh = () => {
  NavigationService.reset("tabNav");
  NavigationService.navigate("tabNav", "HomeNavigator");
  let homeTabChange = globals.getUserData("homeChangeTab");

  if (homeTabChange) {
    homeTabChange(1);
  } else {
    const interOne = setInterval(() => {
      homeTabChange = globals.getUserData("homeChangeTab");
      if (homeTabChange) {
        clearInterval(interOne);
        homeTabChange(1);
      }
    }, 500);
  }

  let homeExploreLoad = globals.getUserData("homeExploreLoad");

  if (homeExploreLoad) {
    homeExploreLoad();
  } else {
    const interTwo = setInterval(() => {
      homeExploreLoad = globals.getUserData("homeExploreLoad");
      if (homeExploreLoad) {
        clearInterval(interTwo);
        homeExploreLoad();
      }
    }, 500);
  }
};

export const hashtagParticipantNavigate = (hashtag) => {
  // hashtag = hashtag.substr(1);
  // NavigationService.navigate('tabNav', 'HomeNavigator');
  // const homeTabChange = globals.getUserData('homeChangeTab')
  // homeTabChange(2);
  // const homeParticipantLoad = globals.getUserData('homeParticipantLoad');
  // homeParticipantLoad(hashtag);

  hashtag = hashtag.substr(1);
  NavigationService.reset("tabNav");
  NavigationService.navigate("tabNav", "HomeNavigator");
  let homeTabChange = globals.getUserData("homeChangeTab");

  if (homeTabChange) {
    homeTabChange(2, false);
  } else {
    const interOne = setInterval(() => {
      homeTabChange = globals.getUserData("homeChangeTab");
      if (homeTabChange) {
        clearInterval(interOne);
        homeTabChange(2, false);
      }
    }, 500);
  }

  let homeParticipantLoad = globals.getUserData("homeParticipantLoad");

  if (homeParticipantLoad) {
    homeParticipantLoad(hashtag);
  } else {
    const interTwo = setInterval(() => {
      homeParticipantLoad = globals.getUserData("homeParticipantLoad");
      if (homeParticipantLoad) {
        clearInterval(interTwo);
        homeParticipantLoad(hashtag);
      }
    }, 500);
  }
};

export const getTabWidth = (length) => {
  return (globals.WINDOW_WIDTH) / length;
};

export const checkIphoneXR = () => {
  if (
    Platform.OS === "ios" &&
    (globals.WINDOW_HEIGHT >= 812 || globals.WINDOW_WIDTH >= 812)
  ) {
    return true;
  } else {
    return false;
  }
};

export const storyAdder = (newData, prevData) => {
  const stories = chain(newData)
    .concat(prevData)
    .uniqBy((dtx) => (dtx._id ? dtx._id : dtx.userId))
    .value();

  return stories;

  // const newStories = differenceBy(newData, prevData, 'userId')

  // const stories = map(prevData, dt => {
  //     const z = find(newStories, rs => rs._id === dt.userId)

  //     if (z !== undefined && z.data !== dt.userPics) {

  //         return Object.assign({}, dt, {
  //             userPics: concat(dt.userPics, z.data)
  //         })
  //     }
  //     else {
  //         return dt
  //     }
  // })

  // return stories
};

export const addAdder = (stories) => {
  let newData = [];
  let ad = 1;

  forEach(stories, (pc, index) => {
    if (index % 2 === 0 && index !== 0) {
      newData.push({
        userId: `ad${ad}`,
        advertisement: true,
        allStoriesViewed: true,
        currentIndex: 0,
        userPics: [
          {
            _id: `ad${ad}`,
            advertiser: "",
            CallToAction: "",
            headline: "",
            icon: null,
            images: false,
            video: false,
          },
        ],
      });

      ad = ad + 1;
    }

    newData.push(pc);
  });

  return newData;
};

// Change Story Data in accordance to our own story and other users story

export const storyManipulator = (data, userId, type, adId = undefined) => {
  // Here data is the array of total stories including our own story if there is any and userId is currently logged user id

  let realData = reject(
    data,
    (xd) =>
      (xd.userPics ? xd.userPics.length == 0 : xd.data.length == 0) ||
      xd.advertisement
  ); // I removed users whose total stories is 0
  // Here userPics is the total stories of a specific user

  realData = map(realData, (dt) => {
    const sortedData = orderBy(
      dt.userPics ? dt.userPics : dt.data,
      ["createdAt"],
      ["desc"]
    );

    const userPic = reject(
      sortedData,
      (picx) => picx.typeContent == "video" && picx.isVideoUpload == false
    ); // Removed specific stories whose video is still getting uploaded

    const currentIndex = findIndex(userPic, (pic) => !pic.isViewed);

    const storiesSeen = filter(userPic, (sts) => sts.isViewed);

    // let currentIndex = 0
    // let storiesSeen = []

    // if (renderMore) {
    //     currentIndex = findIndex(userPic, pic => {
    //         const isViewed = find(pic.views, vx => vx.userId === userId)
    //         return isViewed ? false : true
    //     })

    //     storiesSeen = filter(userPic, sts => {
    //         const isViewed = find(sts.views, vx => vx.userId === userId)
    //         return isViewed ? true : false
    //     })
    // }

    // If stories seen is equal to total stories then allStoriesViewed is true
    // currentIndex is the story index which is unviewed and the user will be directed towards that specific story
    // return Object.assign({}, dt, { currentIndex: currentIndex != -1 ? currentIndex : 0, allStoriesViewed: storiesSeen.length === userPic.length })
    return {
      userPics: sortedData,
      userId: dt.userId || dt._id,
      currentIndex: currentIndex != -1 ? currentIndex : 0,
      allStoriesViewed: storiesSeen.length === userPic.length,
      advertisement: false,
    };
  });

  const ownStory = find(realData, (rd) => {
    // console.log("StGp", rd.userId, userId);

    return rd.userId == userId;
  }); // Carrying out logged in user story

  if (ownStory && type.toLocaleLowerCase() !== "singleuser") {
    // If logged in user has uploaded stories then following
    realData = reject(realData, (rd) => rd.userId == userId); // Removing own story from the array

    const viewedStories = filter(realData, (rd) => rd.allStoriesViewed); // Filtering unviewed stories
    const unViewedStories = filter(realData, (rd) => !rd.allStoriesViewed); // Filtering viewed stories

    let storiesWithAdd =
      type.toLocaleLowerCase() === "subscribeddata"
        ? concat([ownStory], unViewedStories, viewedStories)
        : concat(unViewedStories, viewedStories);

    if (adId) {
      storiesWithAdd = addAdder(storiesWithAdd);
    }

    return storiesWithAdd; // Adding Own story at start then unviewed stories and then viewed stories
  } else {
    // If logged in user has not uploaded stories then following
    const viewedStories = filter(realData, (rd) => rd.allStoriesViewed); // Filtering unviewed stories
    const unViewedStories = filter(realData, (rd) => !rd.allStoriesViewed); // Filtering viewed stories

    let storiesWithAdd = uniqBy(
      concat(unViewedStories, viewedStories),
      "userId"
    );

    if (adId) {
      storiesWithAdd = addAdder(
        uniqBy(concat(unViewedStories, viewedStories), "userId")
      );
    }

    return storiesWithAdd; // Adding unviewed stories first and then viewed stories
  }
};

export const checkValidFormat = (data) => {
  if (data.mime) {
    const splitWise = data.mime.split("/");
    if (splitWise.length > 1) {
      const format = toUpper(splitWise[splitWise.length - 1]);

      if (format == "MOV" || format == "MP4" || format == "M4V") {
        return true;
      } else if (data.path) {
        const splitted = data.path.split("/");
        if (splitted.length > 1) {
          const format = toUpper(splitted[splitted.length - 1]);
          const splitFormat = format.split(".");
          const finalExtn = toUpper(splitFormat[splitFormat.length - 1]);
          if (finalExtn == "MOV" || finalExtn == "MP4" || finalExtn == "M4V") {
            return true;
          }
        }
      } else return false;
    }
  } else return false;
};
measureView = (item,index) => {
  // item.viewRef.measure((x, y, width, height, pageX, pageY) => {
  //   console.log(
  //     "PRIYANK PAGEY ################## INDEX",
  //     {
  //       pageX,
  //       pageY,
  //       height,
  //       x,
  //       y,
  //       width
  //     },
  //     index
  //   );
  //   console.log("PRIYANK SHOULD BE FROM", globals.WINDOW_HEIGHT / 8);
  //   console.log("PRIYANK UPTO THIS", (globals.WINDOW_HEIGHT / 4) * 3);
  //   console.log("VALUE IS", pageY + height);

  //   if (
  //     pageY + height > globals.WINDOW_HEIGHT / 5.2 &&
  //     pageY + height < (globals.WINDOW_HEIGHT / 4) * 3 &&
  //     pageY > 0 &&
  //     item.videoRef.state.videoProps.paused
  //   ) {
  //     console.log("PRIYANK PLAYING NOW FOR INDEX", index);
  //     item.videoRef.startVideo();
  //   } else if (
  //     pageY + height < globals.WINDOW_HEIGHT / 5.2 ||
  //     pageY + height > (globals.WINDOW_HEIGHT / 4) * 3
  //   ) {
  //     item.videoRef.pausVideo();
  //   }

  //   // if (scrollPosition > start && scrollPosition < end && videoPaused) {
  //   //   this.setState({ videoPaused: false });
  //   // } else if ((scrollPosition > end || scrollPosition < start) && !videoPaused) {
  //   //   this.setState({ videoPaused: true });
  //   // }
  // });
}
measureViewRef = (item, index) => {
  // item.viewRef.viewRef.measure((x, y, width, height, pageX, pageY) => {
  //   console.log(
  //     "PRIYANK PAGEY ################## INDEX",
  //     {
  //       pageX,
  //       pageY,
  //       height,
  //       x,
  //       y,
  //       width
  //     },
  //     index
  //   );
  //   console.log("PRIYANK SHOULD BE FROM", globals.WINDOW_HEIGHT / 8);
  //   console.log("PRIYANK UPTO THIS", (globals.WINDOW_HEIGHT / 4) * 3);
  //   console.log("VALUE IS", pageY + height);

  //   if (
  //     pageY + height > globals.WINDOW_HEIGHT / 5.2 &&
  //     pageY + height < (globals.WINDOW_HEIGHT / 4) * 3 &&
  //     pageY > 0 &&
  //     item.videoRef.state.videoProps.paused
  //   ){
  //     console.log("PRIYANK PLAYING NOW FOR INDEX", index);
  //     item.videoRef.startVideo();
  //   } else if (
  //     pageY + height < globals.WINDOW_HEIGHT / 5.2 ||
  //     pageY + height > (globals.WINDOW_HEIGHT / 4) * 3
  //   ) {
  //     item.videoRef.pausVideo();
  //   }

  //   // if (scrollPosition > start && scrollPosition < end && videoPaused) {
  //   //   this.setState({ videoPaused: false });
  //   // } else if ((scrollPosition > end || scrollPosition < start) && !videoPaused) {
  //   //   this.setState({ videoPaused: true });
  //   // }
  // });
}
export const videoPlayToggle = () => {
  const videosRef = globals.getUserData("videosRef");
  console.log("Video ref1", videosRef)

  const realData = uniqBy(videosRef, (dt) => dt.idRef);
  // const realData = videosRef;
  console.log("Video ref2", realData)


  realData.map((item, index) => {
    if (item.viewRef) {
      measureView(item, index)
    }
    return null;
  });
};

export const connectionChecker = async () => {
  let x = false;
  await NetInfo.fetch().then((state) => {
    x = state.isConnected;
  });
  return x;
};

export const commentCounter = (comments) => {
  const activeComments = filter(comments, (cm) => cm.isActive);
  // console.log("activeComments :", activeComments)
  return activeComments.length;
};

export const timeLeft = (time) => {
  let timeLeftString = "";
  let dayLeft = moment(time)
    .startOf("day")
    .diff(moment().startOf("day"), "days");
  // let dayLeft = moment(time).diff(moment(), 'days')
  if (dayLeft > 0) {
    timeLeftString = dayLeft + " Days ";
  } else {
    const hoursLeft = moment(time).diff(moment(), "hours");
    if (hoursLeft > 0) {
      timeLeftString = hoursLeft + " Hours ";
    } else {
      const minutesLeft = moment(time).diff(moment(), "minutes");
      if (minutesLeft > 0) {
        timeLeftString = minutesLeft + " Minutes ";
      } else {
        const secondsLeft = moment(time).diff(moment(), "seconds");
        if (secondsLeft > 0) {
          timeLeftString = secondsLeft + " Seconds ";
        }
      }
    }
  }
  return timeLeftString;
};

export const contestSelectionProcess = (
  campaignEndDate,
  campaignStartDate,
  campaignUpcomingdays
) => {
  const finalistDate = moment(campaignEndDate).add(2, "weeks");
  const winnerDate = moment(campaignEndDate).add(4, "weeks");
  const todayDate = moment();
  const isFinalistAfter = moment(todayDate).isAfter(
    campaignEndDate,
    "datetime-local"
  );
  const isFinalistBefore = moment(todayDate).isBefore(
    winnerDate,
    "datetime-local"
  );
  const isWinnerAfter = moment(todayDate).isAfter(
    finalistDate,
    "datetime-local"
  );
  const isWinnerBefore = moment(todayDate).isSameOrBefore(
    winnerDate,
    "datetime-local"
  );
  const isCloseBefore = moment(todayDate).isSameOrBefore(
    winnerDate,
    "datetime-local"
  );

  let selectionProcess = "day";
  if (campaignUpcomingdays !== undefined && campaignStartDate !== undefined) {
    if (
      campaignUpcomingdays >= 0 &&
      moment().isBefore(moment(campaignStartDate))
    ) {
      selectionProcess = "upcoming";
      return selectionProcess;
    }
  }

  if (isWinnerAfter && isWinnerBefore) {
    selectionProcess = "winner";
  } else if (isFinalistAfter && isFinalistBefore) {
    selectionProcess = "finalist";
  } else if (isWinnerAfter) {
    selectionProcess = "closed";
  }
  return selectionProcess;
};

export const contentShuffler = (data) => {
  const x = shuffle(data, (dt) => dt.mediaPage);
  return x;
};

export const urlChanger = (data) => {
  const mediaUrl = data.mediaUrl;

  const n = mediaUrl.lastIndexOf(".");

  if (data.typeContent === "image") {
    return `${mediaUrl.substring(0, n)}-600Xauto${mediaUrl.substring(n)}`;
  } else {
    return `${mediaUrl.substring(0, n)}-screenshot.png`;
  }
};

// export const checkAndroidPermission = async () => {
//     const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
//     return "granted"
// }

export const checkIOSPermission = async () => {
  // status =[ "unavailable" ,"denied", "blocked",  "granted"]
  let permission = "";
  await check(PERMISSIONS.IOS.PHOTO_LIBRARY)
    .then((result) => {
      if (["unavailable", "denied", , "granted"].includes(result)) {
        permission = "granted";
      } else {
        permission = result;
      }
    })
    .catch((error) => {
      // …
    });

  return permission;
};

export const _alertForSetting = (msg = "") => {
  Alert.alert(
    '"Picstagraph" Would Like to Access YourPhotos ',
    "Picstagraph wants to access your Phone's Library for accessing Pictures and Videos for Uploading in the app",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          Linking.openSettings();
        },
      },
    ],
    { cancelable: false }
  );
};

export const _alertForSettingCamera = (msg = "") => {
  Alert.alert(
    '"Picstagraph" Would Like to Access Camera ',
    "Picstagraph wants to access your Camera for accessing Pictures and Videos for uploading in the app",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          Linking.openSettings();
        },
      },
    ],
    { cancelable: false }
  );
};

export const _alertForStorySetting = (msg = "") => {
  Alert.alert(
    '"Picstagraph" Would Like to Access Your' + msg,
    "Picstagraph wants to access your Phone's" +
      msg +
      " for accessing Pictures and Videos for uploading in the app",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          Linking.openSettings();
        },
      },
    ],
    { cancelable: false }
  );
};

export const checkIOSPermissionCamera = async () => {
  // status =[ "unavailable" ,"denied", "blocked",  "granted"]
  let permission = "";
  await check(PERMISSIONS.IOS.CAMERA)
    .then((result) => {
      if (["unavailable", "denied", , "granted"].includes(result)) {
        permission = "granted";
      } else {
        permission = result;
      }
    })
    .catch((error) => {
      // …
    });

  return permission;
};

export const checkIOSPermissionStory = async () => {
  // status =[ "unavailable" ,"denied", "blocked",  "granted"]
  let permission = {};
  await check(PERMISSIONS.IOS.CAMERA)
    // await check(PERMISSIONS.IOS.PHOTO_LIBRARY)
    .then((result) => {
      if (["unavailable", "denied", , "granted"].includes(result)) {
        permission["camera"] = "granted";
      } else {
        permission["camera"] = result;
      }
    })
    .catch((error) => {
      // …
    });

  await check(PERMISSIONS.IOS.MICROPHONE)
    .then((result) => {
      if (["unavailable", "denied", , "granted"].includes(result)) {
        permission["microphone"] = "granted";
      } else {
        permission["microphone"] = result;
      }
    })
    .catch((error) => {
      // …
    });
  return permission;
};

export const checkAndroidPermission = async () => {
  let permission = "";
  const firstCheckResult = await check(
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  );
  const requestResult = await request(
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  );
  const secondCheckResult = await check(
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  );

  if (
    firstCheckResult === "blocked" &&
    requestResult === "blocked" &&
    secondCheckResult === "blocked"
  ) {
    permission = "blocked";
  } else {
    permission = "granted";
  }
  return permission;
};

export const imagePreFetcher = (urlOfImages, fastUrls) => {
  // console.log("HeyImg", urlOfImages, fastUrls);

  if (fastUrls.length > 0) {
    FastImage.preload(fastUrls);
  } else {
    let preFetchTasks = [];

    urlOfImages.forEach((url) => {
      url === globals.userImageUrl
        ? null
        : preFetchTasks.push(Image.prefetch(url));
    });

    // if (preFetchTasks.length > 2) {
    //   const newPreFetch = chunk(
    //     preFetchTasks,
    //     Math.ceil(preFetchTasks.length / 2)
    //   );

    //   forEach(newPreFetch, async (pre, i) => {
    //     await Promise.all(pre).then((results) => {
    //       console.log("ResX ", results, i);
    //       try {
    //         let downloadedAll = true;

    //         results.forEach((result) => {
    //           if (!result) {
    //             //error occurred downloading a pic
    //             downloadedAll = false;
    //           }
    //         });
    //       } catch (e) {
    //         console.log("Image PreError ", e);
    //       }
    //     });
    //   });
    // } else {
    Promise.all(preFetchTasks).then((results) => {
      // console.log("Results", results);

      try {
        let downloadedAll = true;

        results.forEach((result) => {
          if (!result) {
            //error occurred downloading a pic
            downloadedAll = false;
          }
        });
      } catch (e) {
        console.log("Image PreError ", e);
      }
    });
    // }
  }
};

export const checkAndroidPermissionStory = async () => {
  // status =[ "unavailable" ,"denied", "blocked",  "granted"]
  let permission = {};

  const firstCheckResult = await check(PERMISSIONS.ANDROID.CAMERA);
  const requestResult = await request(PERMISSIONS.ANDROID.CAMERA);
  const secondCheckResult = await check(PERMISSIONS.ANDROID.CAMERA);

  if (
    firstCheckResult === "blocked" &&
    requestResult === "blocked" &&
    secondCheckResult === "blocked"
  ) {
    permission["camera"] = "blocked";
  } else {
    permission["camera"] = "granted";
  }

  return permission;
};

export const checkAndroidCameraPermissionStory = async () => {
  // status =[ "unavailable" ,"denied", "blocked",  "granted"]
  let permission = {};

  const firstCheckResult = await check(PERMISSIONS.ANDROID.CAMERA);
  const requestResult = await request(PERMISSIONS.ANDROID.CAMERA);
  const secondCheckResult = await check(PERMISSIONS.ANDROID.CAMERA);

  if (
    firstCheckResult === "blocked" &&
    requestResult === "blocked" &&
    secondCheckResult === "blocked"
  ) {
    permission = "blocked";
  } else {
    permission = "granted";
  }
  return permission;
};

export const checkAndroidAudioPermissionStory = async () => {
  // status =[ "unavailable" ,"denied", "blocked",  "granted"]
  let permission = {};

  const firstAudioCheckResult = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
  const requestAudioResult = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
  const secondAudioCheckResult = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);

  if (
    firstAudioCheckResult === "blocked" &&
    requestAudioResult === "blocked" &&
    secondAudioCheckResult === "blocked"
  ) {
    permission = "blocked";
  } else {
    permission = "granted";
  }

  return permission;
};

export const linkNavigator = (url) => {
  const splitUrl = url.split("://")[1];
  const task = splitUrl.split("/");

  // const contestShare = url.split("?")

  // if (
  //   contestShare.length > 0 &&
  //   contestShare[0].split("/").length > 1 &&
  //   contestShare[0].split("/")[1] ===
  // )
  switch (task[1]) {
    case globals.LINK_TASK.Profile:
      return task.length > 3
        ? {
            screen: globals.LINK_SCREENS.Profile,
            data: { username: task[2], userId: task[3] },
          }
        : null;
    case globals.LINK_TASK.Campaign:
      return {
        screen: globals.LINK_SCREENS.Campaign,
        data: { slug: task[4] },
      };
    case globals.LINK_TASK.Media:
      return {
        screen: globals.LINK_SCREENS.Media,
        data: { id: task[2], type: task[1].split("?")[1] },
      };
    case globals.LINK_TASK.Participant:
      return {
        screen: globals.LINK_SCREENS.Participant,
        data: { id: task[2], type: task[1].split("?")[1] },
      };

    default:
      return null;
  }
};

export const checkPermissionAndroid = async (checkfor) => {
  // status =[ "unavailable" ,"denied", "blocked",  "granted"]
  let permissioFor = await permissionString(checkfor);
  let permission = {};

  const firstAudioCheckResult = await check(permissioFor);
  const requestAudioResult = await request(permissioFor);
  const secondAudioCheckResult = await check(permissioFor);

  if (
    firstAudioCheckResult === "blocked" &&
    requestAudioResult === "blocked" &&
    secondAudioCheckResult === "blocked"
  ) {
    permission = "blocked";
  } else {
    permission = "granted";
  }

  return permission;
};

export const permissionString = async (checkfor) => {
  let permissionString = "";

  switch (checkfor) {
    case "camera":
      permissionString = await PERMISSIONS.ANDROID.CAMERA;
      break;
    case "microphone":
      permissionString = await PERMISSIONS.ANDROID.RECORD_AUDIO;
      break;
    case "storage":
      permissionString = await PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      break;
  }

  return permissionString;
};
export const colourNameToHex=(colour)=> {
  var colours = {
    "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
    "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
    "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
    "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
    "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
    "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
    "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
    "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
    "honeydew": "#f0fff0", "hotpink": "#ff69b4",
    "indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
    "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
    "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
    "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
    "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
    "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
    "navajowhite": "#ffdead", "navy": "#000080",
    "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
    "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
    "rebeccapurple": "#663399", "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
    "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
    "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
    "violet": "#ee82ee",
    "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
    "yellow": "#ffff00", "yellowgreen": "#9acd32"
  };

  if (typeof colours[colour.toLowerCase()] != 'undefined')
    return colours[colour.toLowerCase()];

  return false;
}
