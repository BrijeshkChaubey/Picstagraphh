import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Text,
  Animated,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionSheet } from "native-base";
import {
  globals,
  helpers,
  colors,
  fonts,
  images,
  sty,
  API,
  ApiCall,
} from "../../../../configs";
import { _GradiantView, _Lang, _Layout, _InlineLoader } from "../../../custom";
import { mainLayoutHoc } from "../../../hoc";
import mainStyles from "../../../../assets/styles/MainStyles";
import { styles } from "./styles";
import Newsfeed from "./tabs/Newsfeed";
import About from "./tabs/About";
import Contest from "./tabs/Contest";
import { upperFirst, reject, find, map } from "lodash";
import {
  setOtherProfileNewsfeed,
  setOtherProfileUserInfo,
  setOtherSocialConnect,
  setOtherProfileContest,
  setOtherProfileRefreshIndicator,
} from "../../../../redux/actions/OtherProfileActions";
import {
  setPicsUserHomeData,
  pushPicsUserHomeData,
  addStoryData,
} from "../../../../redux/actions/PicsHomeActions";
import { setNavigation } from "../../../../redux/actions/NavAction";
import { setTimestampData } from "../../../../redux/actions/TimestampAction";
import {
  setAppData,
  pushAppData,
} from "../../../../redux/actions/AppDataActions";
import {
  setHomeDataProp,
  setRefreshIndicator,
} from "../../../../redux/actions/HomeActions";
import { setPagination } from "../../../../redux/actions/PaginationActions";
import {
  setSubscribedList,
  pushSubscribedList,
  pushSubscribersList,
  setSubscribersList,
} from "../../../../redux/actions/SubscribeActions";
import { setUserInfoProp } from "../../../../redux/actions/UserInfoAction";
import {
  setCampaignProp,
  pushCampaignProp,
} from "../../../../redux/actions/CampaignsActions";
import { getTabWidth } from "../../../../configs/libs/helpers";
import Share from "react-native-share";
import { WEB_URL } from "../../../../configs/libs/globals";
import * as messageSocket from "../../../custom/ContentTypes/common/MessageSocket";
import TabHeader from "../../../custom/ContentTypes/common/TabHeader";
// import PointsBarDesign from "../../../custom/ContentTypes/common/PointsBarDesign";
import FastImage from "react-native-fast-image";

import {useDispatch, useSelector} from 'react-redux'
import { useState,useEffect,useRef } from "react";

const POST_TYPES = globals.POST_TYPES;
const SUBSCRIBE_TYPE = globals.SUBSCRIBE_TYPE;

let userIndex = [
  { index: 0, key: "newsFeedList", text: "profile.posts", icon: images.grid },
  { index: 1, key: "about", text: "profile.about", icon: images.info },
  // { index: 2, key: 'saved', text: 'profile.saved' }
];

let BusinessUserIndex = [
  { index: 0, key: "newsFeedList", text: "profile.posts", icon: images.grid },
  // { index: 1, key: "contest", text: "profile.contest", icon: images.campaign3 },
  { index: 1, key: "about", text: "profile.about", icon: images.info },
];
let BusinessUserIndex2 = [
  { index: 0, key: "contest", text: "profile.contest", icon: images.campaign3 },
  { index: 1, key: "about", text: "profile.about", icon: images.info },
];

const OthersProfile=(props)=> {

  console.log('otherProfile props', props)

  const {loader,navigation}=props;
  const dispatch= useDispatch();
  const navProps = useSelector(state => state.navProps);
  const loginData = useSelector(state => state.loginData)
  const localize = useSelector(state => state.localize)
  const subscribeList = useSelector(state => state.subscribeList)
  const otherProfileNewsfeed= useSelector((state)=>state.otherProfile.otherProfileNewsfeed)
  const otherProfileUserInfo= useSelector(state => state.otherProfile.otherProfileUserInfo)
  const appData = useSelector(state => state.appData)
  const otherProfile= useSelector(state => state.otherProfile)
  const users = useSelector(state => state.picsHomeReducer.users)
  const campaigns = useSelector(state => state.campaigns)


  const [state, setstate]= useState({
    showHeader: true,
    newsfeedLoading: true,
    userInfo: props.route.params.userInfo,
    isNewsShow: true,
    index: 0,
    load: true,
    // routes: [
    //     { index: 0, key: 'newsFeed', text: 'profile.newsFeed' },
    //     { index: 1, key: 'about', text: 'profile.about' }
    // ],
    routes: [...userIndex],
    companyUser: false,
    subHeaderHeight: new Animated.Value(160),
    socialShareArr: [
      {
        label: "Twitter",
        image: images.twitter,
        contentObj: {
          title: "Share via",
          message: "",
          url: "",
          social: Share.Social.TWITTER,
        },
      },
      {
        label: "Facebook",
        image: images.facebook,
        contentObj: {
          title: "Share via",
          message: "",
          url: "",
          social: Share.Social.FACEBOOK,
        },
      },
      {
        label: "Whatsapp",
        image: images.whatsapp,
        contentObj: {
          title: "Share via",
          message: "",
          url: "",
          social: Share.Social.WHATSAPP,
          whatsAppNumber: "",
        },
      },
      {
        label: "Email",
        image: images.email,
        contentObj: {
          title: "Share via",
          message: "",
          url: "",
          social: Share.Social.EMAIL,
        },
      },
    ],
  })
  if (!window.location) {
    // App is running in simulator
    window.navigator.userAgent = "ReactNative";
  }
  const newsFeedEndTrigger=useRef(null);
  const newsFeedRefresh= useRef(null);
  const aboutRefresh= useRef(null);
  const contestTop= useRef(null);
  const moreMenuRef= useRef('moreMenu');

  useEffect(()=>{
    globals.setUserData("videosRef", []);
    _profileApis(0);
    StatusBar.setHidden(false);
  _getUserInfo(true);

  },[])

 const  setNewsFeedEndTrigger = (ref) => (newsFeedEndTrigger.current = ref);

 const  setNewsFeedRefresh = (ref) => (newsFeedRefresh.current = ref);

  const setContestTop = (ref) => (contestTop.current = ref);

 const  checkPostScroll = () => {

    if (state.index === 0) {
      newsFeedEndTrigger && newsFeedEndTrigger();
    }
  };

 const _getUserStory = (userId) => {
   
    let cb = {
      success: (res) => {
        // *loader.hideLoader()
        if (res.data.length > 0) {
          users.singleUser === null
            ? dispatch(setPicsUserHomeData(res.data, "singleUser", loginData.id))
            : dispatch(pushPicsUserHomeData(res.data, "singleUser", loginData.id));
        }
      },
      error: (e) => {},
      complete: () => {
        // *loader.hideLoader()
      },
    };
    // *loader.load();
    let header = helpers.buildHeader({ authorization: loginData.token });
    API.getUserStory({}, cb, header, { id: userId });
  };

 const _onRefresh = () => {
    const { index } = state;
    if (state.index === 0) {
      newsFeedRefresh();
    }
  };

 const  _getUserInfo = (callApi = false) => {
  

    if (
      otherProfileUserInfo[state.userInfo.userId] === undefined ||
      otherProfileUserInfo[state.userInfo.userId] === null ||
      callApi
    ) {
      let cb = {
        success: (res) => {
          console.log("User info", res);
          // if (res.data.adminApprovals) {
          if (res.data.isCompanyUser && res.data.isNewsShow) {
            console.log("companyUser-true");
            setstate({
              ...state,
              routes: [...BusinessUserIndex],
              companyUser: true,
              isNewsShow: true,
            });
          } else if (res.data.isCompanyUser && !res.data.isNewsShow) {
            console.log("companyUser-true");
            setstate({
              ...state,
              routes: [...BusinessUserIndex2],
              companyUser: true,
              isNewsShow: false,
            });
            _profileApis(0)
          } else {
            console.log("companyUser-false");
            setstate({
              ...state,
              routes: [...userIndex],
              companyUser: false,
              isNewsShow: true,
            });
          }
         dispatch(setOtherProfileUserInfo({ userId:state.userInfo.userId, data: res.data }));
          //_getUserStory(userInfo.userId);
          dispatch(setOtherSocialConnect({
            prop: state.userInfo.userId,
            data: res.data.socialNetworks,
          }));
          loader.hideLoader();
          setstate({ ...state,load: false });
        },
        error: (e) => {
          dispatch(setOtherProfileUserInfo({ userId: state.userInfo.userId, data: null }));
          dispatch(setOtherSocialConnect({ prop: state.userInfo.userId, data: [] }));
          setstate({ ...state,load: false });
        },
        complete: () => {
          loader.hideLoader();
          setstate({...state, load: false });
        },
      };
      // loader.load();
      let header = helpers.buildHeader({ authorization: loginData.token });
      API.getUserInfo({}, cb, header, state.userInfo.username);
    } else {
      if (
        otherProfileUserInfo[state.userInfo.userId].isCompanyUser &&
        otherProfileUserInfo[state.userInfo.userId].isNewsShow
      ) {
        setstate({
          ...state,
          routes: [...BusinessUserIndex],
          companyUser: true,
          isNewsShow: true,
        });
      } else if (
        otherProfileUserInfo[state.userInfo.userId].isCompanyUser &&
        !otherProfileUserInfo[state.userInfo.userId].isNewsShow
      ) {
        setstate({
          ...state,
          routes: [...BusinessUserIndex2],
          companyUser: true,
          isNewsShow: false,
        });
      } else {
        setstate({
          ...state,
          routes: [...userIndex],
          companyUser: false,
        });
      }
    }
  };

 const _showSocialShare = () => {


    let url =
      WEB_URL + "news-feed/" + state.userInfo.username + "/" + state.userInfo.userId;

    Share.open({
      title: "Picstagraph",
      message: "",
      url,
    });

    // ActionSheet.show(
    //   {
    //     options: ["Twitter", "Facebook", "Whatsapp", "Email", "Cancel"],
    //     title: "Select action",
    //     cancelButtonIndex: 6,
    //   },
    //   (buttonIndex) => {
    //     share(buttonIndex);
    //   }
    // );

    // const { appData } = props;
    // if (appData.socialShareHandler) {
    //     appData.socialShareHandler(true)
    // }
  };

const  share = (indexz) => {

    const shareObj = find(
      state.socialShareArr,
      (shr, index) => index == indexz,
    );
    let url =
      WEB_URL + "news-feed/" + state.userInfo.username + "/" + state.userInfo.userId;

    if (shareObj) {
      // let url = ''
      // const item = contentInfo

      // let postType = helpers.buildPostType(item.postType, item.userType || '');
      // const middleUrl = find(SHARE_URL, shr => shr.type == postType)

      // if (middleUrl) {
      //     url = POST_TYPES.CompanyCampaign == item.postType ? WEB_URL + middleUrl.url + item.slug : WEB_URL + middleUrl.url + item.id
      // }

      const realContent = Object.assign({}, shareObj.contentObj, {
        url: url,
      });

      Share.shareSingle(realContent);
    } else {
      ActionSheet.hide();
    }
  };

const  _trans = (str1, str2) => helpers.getLocale(localize, str1, str2);

const _toggleMoreList = () => {

  let isBlocked = otherProfileUserInfo[state.userInfo.userId].isBlocked;
  let isReported = otherProfileUserInfo[state.userInfo.userId].isReported;

  let blockTxt = isBlocked
    ? _trans("moreOption", "unblockUser")
    : _trans("moreOption", "blockUser");
  let blockedUserIdArr = appData.blockedUsers;
  blockedUserIdArr = blockedUserIdArr.map((item) => {
    if (item.id === state.userInfo.userId) {
      blockTxt = item.flag
        ? _trans("moreOption", "unblockUser")
        : _trans("moreOption", "blockUser");
    }
  });

  let reportTxt = isReported
    ? _trans("moreOption", "unreportUser")
    : _trans("moreOption", "reportUser");
  let reportedUserIdArr = appData.reportedUsers;
  reportedUserIdArr = reportedUserIdArr.map((item) => {
    if (item.id === state.userInfo.userId) {
      reportTxt = item.flag
        ? _trans("moreOption", "unreportUser")
        : _trans("moreOption", "reportUser");
    }
  });

  ActionSheet.show(
    {
      options: [blockTxt, reportTxt, _trans("moreOption", "cancel")],
      title: _trans("moreOption", "selectAction"),
      cancelButtonIndex: 2,
    },
    (buttonIndex) => {
      setTimeout(() => {
        _moreBtnApi(buttonIndex);
      }, 100);
    },
  );
};

const _moreBtnApi = (index) => {
  
  let otherUserInfo = otherProfileUserInfo[state.userInfo?.userId];

  let isBlocked = otherUserInfo.isBlocked;
  let flag = isBlocked === undefined ? true : !isBlocked;
  let blockedUserIdArr = appData.blockedUsers;
  blockedUserIdArr = blockedUserIdArr.map((item) => {
    if (item.id === state.userInfo.userId) {
      isBlocked = item.flag ? false : true;
      flag = isBlocked;
    }
  });

  let header = helpers.buildHeader({ authorization: loginData.token });
  if (index === 0) {
    let data = flag
      ? { idToBlock: state.userInfo.userId }
      : { idToUnblock: state.userInfo.userId };
    var cb = {
      success: (res) => {
        let appDataCount = 0;
        let blockedUserIdArr = appData.blockedUsers;
        blockedUserIdArr = blockedUserIdArr.map((item) => {
          if (item.id === state.userInfo.userId) {
            appDataCount++;
            return {
              id: item.id,
              flag: !item.flag,
            };
          }
        });
        if (appDataCount === 0) {
         dispatch(setAppData({
            prop: "blockedUsers",
            value: [
              {
                id: state.userInfo.userId,
                flag: !isBlocked,
              },
            ],
          }));
        } else {
         dispatch(setAppData({ prop: "blockedUsers", value: blockedUserIdArr }));
        }
        loader.success(
          "Success",
          data["idToBlock"] ? "User Blocked" : "User Unblocked",
        );
      },
      error: (e) => {
        loader.error(
          "Error",
          data["idToBlock"] ? "User Block Failed" : "User Unblock Failed",
        );
      },
    };

    // loader.load();
    if (flag) {
      API.blockOtherUser(data, cb, header, state.userInfo.userId);
    } else {
      API.unblockOtherUser(data, cb, header, state.userInfo.userId);
    }
  } else if (index === 1) {
    var cb = {
      success: (res) => {
        let appDataCount = 0;
        let reportedUserIdArr = appData.reportedUsers;
        reportedUserIdArr = reportedUserIdArr.map((item) => {
          if (item.id === state.userInfo.userId) {
            appDataCount++;
            return {
              id: item.id,
              flag: !item.flag,
            };
          }
        });
        if (appDataCount === 0) {
          dispatch(setAppData({
            prop: "reportedUsers",
            value: [
              {
                id: state.userInfo.userId,
                flag: !otherUserInfo.isReported,
              },
            ],
          }));
        } else {
          dispatch(setAppData({ prop: "reportedUsers", value: reportedUserIdArr }));
        }
        loader.success("Success", " User status reported");
      },
      error: (e) => {
        loader.error("Error", "Report user status not updated!");
      },
    };
    let data = {
      typeId: state.userInfo.userId,
      typeContent: globals.REPORT_TYPES.USER,
      title: state.userInfo.comment,
    };
    //loader.load();
    API.reportPost(data, cb, header);
  }
};

const _renderTabBar = (props) => {

  const { getLocale } = helpers;
  const currentIndex = props.navigationState.index;
  return (
    <View style={{ paddingVertical: 5 }}>
      <View style={styles._renderTabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color =
            currentIndex == i ? colors.darkGray : colors.lightDark;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => setState({ index: i })}>
              <View style={mainStyles.tabWrap}>
                <View
                  style={[
                    mainStyles.tabItem,
                    {
                      flex: 1,
                      width: getTabWidth(state.routes.length) - 5,
                    },
                  ]}>
                  <Text allowFontScaling={false} style={{ color }}>
                    {upperFirst(getLocale(localize, "profile", route.key))}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const _renderTabs = ({ route }) => {

  switch (route.key) {
    case "newsFeed":
      return (
        <Newsfeed
          navigation={props.navigation}
          userInfo={state.userInfo}
          newsfeedLoading={state.newsfeedLoading}
          setNewsFeedEndTrigger={setNewsFeedEndTrigger}
          setNewsFeedRefresh={setNewsFeedRefresh}
        />
      );
    case "about":
      if (otherProfileUserInfo[state.userInfo.userId]) {
        return (
          <About userInfo={state.userInfo} navigation={props.navigation} />
        );
      } else {
        return <_InlineLoader type={"list"} />;
      }
    default:
      return null;
  }
};

const getTabLabels = (route, color) => {

  const { getLocale } = helpers;

  let label = null;
  if (route.key === "newsFeedList")
    label = getLocale(localize, "profile", "newsfeed");
  if (route.key === "about") label = getLocale(localize, "profile", "about");

  return (
    <View style={mainStyles.tabItem}>
      <Text style={{ color, ...sty.padV5, ...sty.padH15 }}>{label}</Text>
    </View>
  );
};

const _messageUser = () => {

  if (otherProfileUserInfo[state.userInfo.userId]) {
    let info = otherProfileUserInfo[state.userInfo.userId];

    messageSocket.join(state.userInfo.userId, loginData.id, loginData.id);

    // props.navigation.navigate("NewMessage", {
    //   userInfo: Object.assign({}, item, { id: item._id }),
    // });

    props.navigation.navigate("NewMessage", {
      userInfo: {
        id: state.userInfo.userId,
        profileUrl: info.resizeProfileUrl,
        username: info.username,
        name: info.name,
      },
    });
  }
};

const _changeTab = (index) => {

  helpers.pauseVideo(appData, setAppData);
  setstate({ ...state,index }, () => _profileApis(index));
};

const _profileApis = (index) => {
  

  let apiType = state.routes[index].key;
  console.log("check",state.routes[index].value)
  if (apiType === "newsFeedList" && otherProfileNewsfeed[state.userInfo.userId]) {
    setstate({ ...state,newsfeedLoading: false });
    return;
  }

  ApiCall.getOtherProfileData(apiType, props, state)
    .then((res) => {
      const updatedData = map(res.data, (mx) => {
        return Object.assign({}, mx, { page: res.pagination.page });
      });
      console.log("check23",res)
      if (apiType === "newsFeedList") {
        dispatch(setTimestampData("newsfeed" + state.userInfo.username, res.timestamp));
        dispatch(setOtherProfileNewsfeed({
          id: state.userInfo.userId,
          arr: updatedData,
          pagination: res.pagination || {},
        }));
        setstate({...state, newsfeedLoading: false });
      } else if (apiType === "contest") {
        dispatch(setOtherProfileContest({
          id: state.userInfo.userId,
          arr: updatedData,
          pagination: res.pagination || {},
        }));
      }
    })
    .catch((e) => {
      if (apiType === "newsFeedList") {
       dispatch( setOtherProfileNewsfeed({
          id: state.userInfo.userId,
          arr: [],
          pagination: {},
        }));
        setstate({ ...state,newsfeedLoading: false });
      } else if (apiType === "contest") {
        dispatch(setOtherProfileContest({
          id: state.userInfo.userId,
          arr: [],
          pagination: {},
        }));
      }
    });
};
const _navigateToSubscribe = (type) => {

  props.navigation.push("Subscribe", {
    username: state.userInfo.username,
    type: type,
    userId: state.userInfo.userId,
  });
};

const _subscribeApi = (type, item) => {


  //loader.load();
  ApiCall.setSubscribe(type, { user: loginData.id }, item._id)
    .then((res) => {
      var count = 0;
      let subscribedArr = appData.subscribedArr;
      appData.subscribedArr.map((subscribeItem, index) => {
        if (subscribeItem.id === item.id) {
          subscribedArr[index]["isSubscribe"] =
            type === SUBSCRIBE_TYPE.SUBSCRIBED ? false : true;
          count++;
        }
      });
      if (count === 0) {
        dispatch(pushAppData({
          prop: "subscribedArr",
          value: {
            id: item.id,
            isSubscribe: type === SUBSCRIBE_TYPE.SUBSCRIBED ? false : true,
          },
        }));
      } else {
        dispatch(setAppData({ prop: "subscribedArr", value: subscribedArr }));
      }

      //Update current counter
      if (SUBSCRIBE_TYPE.SUBSCRIBE === type) {
        dispatch(setOtherProfileUserInfo({
          userId: item._id,
          data: Object.assign({}, otherProfileUserInfo[item._id], {
            subscribersCount:
              otherProfileUserInfo[item._id].subscribersCount + 1,
          }),
        }));
      } else {
        dispatch(setOtherProfileUserInfo({
          userId: item._id,
          data: Object.assign({}, otherProfileUserInfo[item._id], {
            subscribersCount:
              otherProfileUserInfo[item._id].subscribersCount - 1,
          }),
        }))
      }

      //Update other user subscribed list
      if (SUBSCRIBE_TYPE.SUBSCRIBE === type) {
        var list = subscribeList.subscribersList[item._id];
        if (list) {
          var arr = subscribeList.subscribersList[item._id].arr;
          var pagination = subscribeList.subscribersList[item._id].pagination;
          var count = 0;
          arr.map((subscribedItem) => {
            if (subscribedItem.id === loginData.id) count++;
          });
          if (count === 0) {
            item.subscribeId = res.data.id;
            dispatch(pushSubscribersList({ id: item._id, arr: item, pagination }));
          }
        }
      } else {
        var list = subscribeList.subscribersList[item._id];
        if (list) {
          var arr = subscribeList.subscribersList[item._id].arr;
          var pagination = subscribeList.subscribersList[item._id].pagination;
          const newArr = reject(
            arr,
            (subscribedItem) => subscribedItem._id == loginData.id,
          );
         dispatch(setSubscribersList({ id: item._id, arr: newArr, pagination }));
        }
      }

      //Update own subscribed list
      if (SUBSCRIBE_TYPE.SUBSCRIBE === type) {
        var list = subscribeList.subscribedList[loginData.id];
        if (list) {
          var arr = subscribeList.subscribedList[loginData.id].arr;
          var pagination =
            subscribeList.subscribedList[loginData.id].pagination;
          var count = 0;
          arr.map((subscribedItem) => {
            if (subscribedItem.id === item._id) count++;
          });
          if (count === 0) {
            item.subscribeId = res.data.id;
            dispatch(pushSubscribedList({ id: loginData.id, arr: item, pagination }));
          }
        }
      } else {
        var list = subscribeList.subscribedList[loginData.id];
        if (list) {
          var arr = subscribeList.subscribedList[loginData.id].arr;
          var pagination =
            subscribeList.subscribedList[loginData.id].pagination;
          const newArr = reject(
            arr,
            (subscribedItem) => subscribedItem._id == item._id,
          );
          dispatch(setSubscribedList({ id: loginData.id, arr: newArr, pagination }));
        }
      }

      //Change counter on own profile
      if (SUBSCRIBE_TYPE.SUBSCRIBE === type) {
        if (!helpers._isEmptyObject(userInfo)) {
          let subscribedCount = parseInt(userInfo.subscribedCount);
          dispatch(setUserInfoProp({
            prop: "subscribedCount",
            value: ++subscribedCount,
          }));
        }
      } else {
        if (!helpers._isEmptyObject(userInfo)) {
          let subscribedCount = parseInt(userInfo.subscribedCount);
          dispatch(setUserInfoProp({
            prop: "subscribedCount",
            value: --subscribedCount,
          }));
        }
      }
      updateNews();

      const storyRef = globals.getUserData("storyRef");
      if (storyRef) {
        storyRef.viewRef._homeApis(storyRef.viewRef.state.index);
      }

      loader.hideLoader();
    })
    .catch((err) => {
      loader.hideLoader();
      console.log({ err });
    });
};

const updateNews = () => {

  ApiCall.getHomeData("news", 1, "").then((res) => {
    dispatch(setHomeDataProp({ prop: "news", arr: res.data }));
    dispatch(setPagination(res.pagination, "newsfeed"));
    dispatch(setRefreshIndicator(false));
  });
};

const _naviagteCampagin = (postInfo) => {
  const campaignSlug = postInfo.slug;
  

  let cb = {
    success: (res) => {
      if (find(campaigns["extra"], (dt) => dt._id === res.data._id)) {
       dispatch(setCampaignProp({
          prop: "extra",
          arr: map(campaigns["extra"], (dt) =>
            dt._id === res.data._id ? Object.assign({}, dt, res.data) : dt,
          ),
        }));
      } else if (campaigns["extra"] === null) {
       dispatch(setCampaignProp({ prop: "extra", arr: [res.data] }));
      } else {
       dispatch(pushCampaignProp({ prop: "extra", arr: [res.data] }));
      }
      props.navigation.navigate("CompanyCampaign", {
        campaignInfo: res.data,
        apiType: "extra",
        OthersProfileUser: state.userInfo,
      });
    },
    error: (e) => {},
    complete: () => loader.hideLoader(),
  };
  let header = helpers.buildHeader({ authorization: loginData.token });
  // props.loader.load();
  API.getCamapignInfo({}, cb, header, campaignSlug);
};

const _postNavigate = (obj) => {
  let postType = helpers.buildPostType(
    obj.postType || null,
    obj.userType || "",
  );
  let nav;
  if (postType === POST_TYPES.CompanyParticipantCampaign) {
    nav = (postInfo) => {
      props.navigation.navigate("CampaignParticipant", {
        postInfo: postInfo,
      });
    };
  }
  if (postType === POST_TYPES.Campaign) {
    nav = (postInfo) => {
      _naviagteCampagin(postInfo);
    };
  }
  if (
    postType === POST_TYPES.CreatorCampaign ||
    postType === POST_TYPES.Blog
  ) {
    nav = (postInfo) => {
      props.navigation.navigate("CreatorCampaign", {
        campaignInfo: postInfo,
      });
    };
  }
  if (postType === POST_TYPES.MediaPost || postType === POST_TYPES.Userpost) {
    nav = (postInfo) => {
      props.navigation.navigate("MediaPost", {
        postInfo: postInfo,
      });
    };
  }
  if (postType === POST_TYPES.Advertise) {
    nav = (postInfo) => {
      props.navigation.navigate("Advertise", {
        postInfo: postInfo,
      });
    };
  }
  obj = Object.assign({ navigateToFullView: nav }, obj);
  return obj;
};
const _likeUser = () => {



  let usrDetails = otherProfileUserInfo[state.userInfo.userId];

  let cb = {
    success: (res) => {
      let appDataCount = 0;
      let likedUserIdArr = appData.likedUsers;
      likedUserIdArr = likedUserIdArr.map((item) => {
        if (item.id === state.userInfo.userId) {
          appDataCount++;
          return {
            id: item.id,
            flag: !item.flag,
          };
        }
      });
      if (appDataCount === 0) {
        dispatch(setAppData({
          prop: "likedUsers",
          value: [
            {
              id: state.userInfo.userId,
              flag: !usrDetails.isLike,
            },
          ],
        }));
      } else {
        dispatch(setAppData({ prop: "likedUsers", value: likedUserIdArr }));
      }
      loader.success("Success", "Like status updated");
    },
    error: (e) => {
      loader.error("Error", "Like status not updated");
    },
  };
  let data = {
    typeContent: "User",
    typeId: state.userInfo.userId,
  };
  //loader.load();
  let header = helpers.buildHeader({ authorization: loginData.token });
  API.likeOtherUser(data, cb, header);
};

const _onScroll = (event) => {
  const currentOffset = event.nativeEvent.contentOffset.y;
  if (currentOffset < 1) {
    if (!state.showHeader) setstate({ ...state,showHeader: true });
  } else {
    if (state.showHeader) setState({ ...state,showHeader: false });
  }
};

const _joinMessageRoom = () => {


  // messageSocket.join(otherProfileUserInfo[userInfo.userId]._id, loginData.id, loginData.id);
  messageSocket.connect("Other Profile", (data) => {

    if (props.loginData.id !== data.senderId) {
      setAppData({
        prop: "unreadMessages",
        value: appData?.unreadMessages + 1,
      });
    }
  });
};

const _navigateToMessage = async () => {

  let user = {
    id: otherProfileUserInfo[state.userInfo.userId]._id,
    profileUrl: otherProfileUserInfo[state.userInfo.userId].miniProfileUrl,
    resizeProfileUrl: otherProfileUserInfo[state.userInfo.userId].resizeProfileUrl,
    username: otherProfileUserInfo[state.userInfo.userId].username,
    name: otherProfileUserInfo[state.userInfo.userId].name,
  };
  // _joinMessageRoom();

  messageSocket.join(null, null, loginData.id);
  props.navigation.navigate("NewMessage", { userInfo: user });
};

const aboveTab = () => {

 

  if (otherProfileUserInfo[state.userInfo.userId]) {
    var item = otherProfileUserInfo[state.userInfo.userId];

    var profileUrl = item.resizeProfileUrl
      ? item.resizeProfileUrl
      : images.user;
    var subscribersCount = item.subscribersCount;
    var subscribedCount = item.subscribedCount;
    var postCount = item.postCount && item.postCount > 0 ? item.postCount : 0;

    let isSubscribe = item.isSubscribe;
    appData.subscribedArr.map((subscribeItem) => {
      if (subscribeItem.id === item.id) {
        isSubscribe = subscribeItem.isSubscribe;
      }
    });
    var btnTxt = helpers.getLocale(
      localize,
      "subscribe",
      isSubscribe ? "subscribed" : "subscribe",
    );
    var btnColor = isSubscribe ? "white" : "blue";
    var type = isSubscribe
      ? SUBSCRIBE_TYPE.SUBSCRIBED
      : SUBSCRIBE_TYPE.SUBSCRIBE;

    var likedFlag = item.isLike;
    let likedUserIdArr = appData.likedUsers;
    likedUserIdArr = likedUserIdArr.map((item) => {
      if (item.id === state.userInfo.userId) {
        likedFlag = item.flag;
      }
    });
  } else {
    var item = {
      id: state.userInfo.userId,
      subscribeId: false,
    };
    var profileUrl = "";
    var subscribersCount = 0;
    var subscribedCount = 0;
    var postCount = 0;

    var btnTxt = helpers.getLocale(localize, "subscribe", "subscribe");
    var btnColor = "blue";
    var type = SUBSCRIBE_TYPE.SUBSCRIBE;

    var likedFlag = false;
  }
  const currentStory = find(
    users.singleUser,
    (st) => st.userId === state.userInfo.userId,
  );
  let bgColor =
    currentStory && currentStory.allStoriesViewed ? "fullGray" : "blue";
  return (
    <View>
      <View
        style={[
          {
            display: state.showHeader ? "flex" : "none",
            paddingTop: !state.showHeader ? (Platform.OS === "ios" ? 20 : 5) : 0,
          },
          { marginTop: 0 },
        ]}>
        <View style={styles.profileInfoWrap}>
          {currentStory ? (
            <View style={styles.profileImgWrap}>
              <_GradiantView color={bgColor} style={styles.gradiantWrap}>
                <TouchableOpacity
                  style={styles.userImgWrap}
                  onPress={() => {
                    addStoryData(
                      currentStory.userPics[currentStory.currentIndex],
                    );
                    navigation.push("StoryTabs", {
                      userType: "singleUser",
                      navigation,
                      userId: currentStory.userId,
                    });
                  }}>
                  <FastImage
                    source={
                      profileUrl !== "" ? { uri: profileUrl } : images.user
                    }
                    style={[styles.userImg, { backgroundColor: "gray" }]}
                    resizeMode={"cover"}
                  />
                </TouchableOpacity>
              </_GradiantView>
            </View>
          ) : (
            <View style={styles.profileImgWrap}>
              <View style={styles.profileImgWrapInnter}>
                <FastImage
                  source={
                    profileUrl !== "" ? { uri: profileUrl } : images.user
                  }
                  style={styles.profileImg}
                />
              </View>
            </View>
          )}
          <View style={styles.profileStatsWrap}>
            <View
              style={{
                ...sty.fRow,
                paddingBottom: 5,
                alignItems: "center",
                justifyContent: "space-evenly",
              }}>
              <View style={styles.profileStat}>
                <Text
                  style={styles.profileStatCount}
                  onPress={() =>
                    _navigateToSubscribe(SUBSCRIBE_TYPE.SUBSCRIBERS)
                  }>
                  {subscribersCount}
                </Text>
                <_Lang
                  style={styles.profileStatTxt}
                  text={"profile.subscribers"}
                  onPress={() =>
                    _navigateToSubscribe(SUBSCRIBE_TYPE.SUBSCRIBERS)
                  }
                />
              </View>
              <View style={styles.profileStat}>
                <Text
                  style={styles.profileStatCount}
                  onPress={() =>
                    _navigateToSubscribe(SUBSCRIBE_TYPE.SUBSCRIBED)
                  }>
                  {subscribedCount}
                </Text>
                <_Lang
                  style={styles.profileStatTxt}
                  text={"profile.subscribed"}
                  onPress={() =>
                    _navigateToSubscribe(SUBSCRIBE_TYPE.SUBSCRIBED)
                  }
                />
              </View>
              <View style={{ marginBottom: 7 }}>
                <Text style={styles.profileStatCount}>{postCount}</Text>
                <_Lang style={styles.profileStatTxt} text={"profile.posts"} />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 5,
              }}>
              {loginData.id != item.id ? (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      _subscribeApi(type, item);
                    }}
                    style={[
                      styles.btnProfile,
                      {
                        borderColor:
                          type === SUBSCRIBE_TYPE.SUBSCRIBE
                            ? colors.black
                            : colors.gray,
                        backgroundColor:
                          type === SUBSCRIBE_TYPE.SUBSCRIBE
                            ? colors.black
                            : colors.white,
                        borderWidth: 1,
                        width: globals.WINDOW_WIDTH / 2.8,
                      },
                    ]}>
                    <Text
                      style={{
                        color:
                          type === SUBSCRIBE_TYPE.SUBSCRIBE
                            ? "#fff"
                            : colors.grayDarker,
                        ...sty.tCenter,
                        ...sty.padV5,
                        fontSize: fonts.xSmall,
                        fontWeight: "bold",
                      }}>
                      {btnTxt}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    ...sty.fRow,
                    ...sty.jSpace,
                    paddingBottom: 5,
                    flex: 1,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      _showSocialShare();
                    }}
                    style={{ flex: 0.5 }}>
                    <_GradiantView
                      bgColor={"#000000"}
                      style={{ ...sty.appBorder, borderRadius: 5 }}>
                      <_Lang
                        style={styles.uploadBtn}
                        text={"profile.profile_share"}
                      />
                    </_GradiantView>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 0.5, marginLeft: 10 }}
                    onPress={() => {
                      props.navigation.navigate("Settings");
                    }}>
                    <_GradiantView
                      bgColor={"#ffffff"}
                      style={{
                        ...sty.jCenter,
                        ...sty.aCenter,
                        padding: 8,
                        borderRadius: 5,
                        borderColor: "#000",
                        borderWidth: 2,
                        height: 35,
                      }}>
                      <_Lang
                        style={[styles.uploadBtn, { color: colors.black }]}
                        text={"profile.settings"}
                      />
                    </_GradiantView>
                  </TouchableOpacity>
                </View>
              )}
              {loginData.id != item.id ? (
                <TouchableOpacity
                  onPress={() => {
                    _navigateToMessage();
                  }}
                  style={[
                    styles.btnProfile,
                    {
                      borderColor: colors.black,
                      backgroundColor: colors.white,
                      borderWidth: 1,
                      width: globals.WINDOW_WIDTH / 2.8,
                    },
                  ]}>
                  <Text
                    style={{
                      color: colors.grayDarker,
                      ...sty.tCenter,
                      ...sty.padV5,
                      fontSize: fonts.xSmall,
                      fontWeight: "bold",
                    }}>
                    {"Message"}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
        {/* <PointsBarDesign
          userInfo={item}
          levelDiff={appData.levelDiff}
          levelPoints={appData.levelPoints}
        /> */}
      </View>

      
      <View style={{ paddingTop: 5 }}>
        <TabHeader
          routes={state.routes}
          index={state.index}
          changeTab={(i) => _changeTab(i)}
          // showIcon={true}
          onProfile
          itemStyle={{ paddingTop: 0 }}
        />
      </View>
    </View>
  );
};

if (otherProfileUserInfo[state.userInfo.userId]) {
  var item = otherProfileUserInfo[state.userInfo.userId];

  var profileUrl = item.resizeProfileUrl
    ? item.resizeProfileUrl
    : images.user;
  var subscribersCount = item.subscribersCount;
  var subscribedCount = item.subscribedCount;
  var postCount = item.postCount && item.postCount > 0 ? item.postCount : 0;

  let isSubscribe = item.isSubscribe;
  appData.subscribedArr.map((subscribeItem) => {
    if (subscribeItem.id === item.id) {
      isSubscribe = subscribeItem.isSubscribe;
    }
  });
  var btnTxt = helpers.getLocale(
    localize,
    "subscribe",
    isSubscribe ? "subscribed" : "subscribe",
  );
  var btnColor = isSubscribe ? "white" : "blue";
  var type = isSubscribe
    ? SUBSCRIBE_TYPE.SUBSCRIBED
    : SUBSCRIBE_TYPE.SUBSCRIBE;

  var likedFlag = item.isLike;
  let likedUserIdArr = appData.likedUsers;
  likedUserIdArr = likedUserIdArr.map((item) => {
    if (item.id === state.userInfo.userId) {
      likedFlag = item.flag;
    }
  });
} else {
  var item = {
    id: state.userInfo.userId,
    subscribeId: false,
  };
  var profileUrl = "";
  var subscribersCount = 0;
  var subscribedCount = 0;
  var postCount = 0;

  var btnTxt = helpers.getLocale(localize, "subscribe", "subscribe");
  var btnColor = "blue";
  var type = SUBSCRIBE_TYPE.SUBSCRIBE;

  var likedFlag = false;
}
console.log("Compno", state.companyUser);
console.log("Nes", state.isNewsShow);
const header = {
  //hideLeft: true,
  leftCb: () => {
    props.navigation.pop();
  },
  leftImg: images.leftBackArrow,
  title: state.userInfo.username,
  verified: otherProfileUserInfo[state.userInfo.userId]
    ? otherProfileUserInfo[state.userInfo.userId].isVerifiedUser
    : false,
  //titleImgUrl: images.icon192x,
  hideRight: otherProfileUserInfo[state.userInfo.userId] ? false : true,
  rightNewCb:
    loginData.id != item.id
      ? [
          () => {
            _showSocialShare();
          },
          () => {
            _toggleMoreList();
          },
        ]
      : [
          () => {
            _showSocialShare();
          },
        ],
  rightNewIconArr:
    loginData.id != item.id ? [images.shareArrow, images.threeDots] : [],
  // rightIconArr: ['ios-more', 'Ionicons'],
  //rightTxt: 'Save',
  disableLang: true,
};

return state.load == false ? (
  state.companyUser ? (
    state.isNewsShow ? (
      <_Layout
        header={header}
        headerWrapStyle={{ margin: 0 }}
        style={{ backgroundColor: "#fff" }}>
        <View ref={moreMenuRef} style={{ ...sty.aSelfEnd }} />
        {state.index == 0 ? (
          <Newsfeed
            refreshProfile={() => _getUserInfo(true)}
            navigation={navigation}
            userInfo={state.userInfo}
            newsfeedLoading={state.newsfeedLoading}
            header={aboveTab()}
            getStories={() => {
              _getUserStory(state.userInfo.userId);
            }}
            // setNewsFeedEndTrigger={setNewsFeedEndTrigger}
            // setNewsFeedRefresh={setNewsFeedRefresh}
            {...props}
          />
        ) : null}
        {/* {state.index == 1 ? (
          <Contest
            postNavigate={_postNavigate}
            userInfo={userInfo}
            // setSavedEndTrigger={setSavedEndTrigger}
            // setSavedRefresh={setSavedRefresh}
            refreshProfile={() => _getUserInfo(true)}
            getStories={() => {
              _getUserStory(loginData.id);
            }}
            setContestTop={setContestTop}
            header={aboveTab()}
          />
        ) : null} */}
        {state.index == 1 ? (
          otherProfileUserInfo[state.userInfo.userId] ? (
            <About
              userInfo={state.userInfo}
              header={aboveTab()}
              navigation={navigation}
            />
          ) : (
            <_InlineLoader type={"list"} />
          )
        ) : null}
      </_Layout>
    ) : (
      <_Layout
        header={header}
        headerWrapStyle={{ margin: 0 }}
        style={{ backgroundColor: "#fff" }}>
        <View ref={moreMenuRef} style={{ ...sty.aSelfEnd }} />
        {state.index == 0 ? (
          <Contest
            postNavigate={_postNavigate}
            userInfo={state.userInfo}
            // setSavedEndTrigger={setSavedEndTrigger}
            // setSavedRefresh={setSavedRefresh}
            refreshProfile={() => _getUserInfo(true)}
            getStories={() => {
              _getUserStory(loginData.id);
            }}
            setContestTop={setContestTop}
            header={aboveTab()}
          />
        ) : null}
        {state.index == 1 ? (
          otherProfileUserInfo[state.userInfo.userId] ? (
            <About
              userInfo={state.userInfo}
              header={aboveTab()}
              navigation={navigation}
            />
          ) : (
            <_InlineLoader type={"list"} />
          )
        ) : null}
      </_Layout>
    )
  ) : (
    <_Layout
      header={header}
      headerWrapStyle={{ margin: 0 }}
      style={{ backgroundColor: "#fff" }}>
      <View ref={moreMenuRef} style={{ ...sty.aSelfEnd }} />
      {state.index == 0 ? (
        <Newsfeed
          refreshProfile={() => _getUserInfo(true)}
          navigation={navigation}
          userInfo={state.userInfo}
          newsfeedLoading={state.newsfeedLoading}
          header={aboveTab()}
          getStories={() => {
            _getUserStory(state.userInfo.userId);
          }}
          // setNewsFeedEndTrigger={setNewsFeedEndTrigger}
          // setNewsFeedRefresh={setNewsFeedRefresh}
          {...props}
        />
      ) : null}
      {state.index == 1 ? (
        otherProfileUserInfo[state.userInfo.userId] ? (
          <About
            userInfo={state.userInfo}
            header={aboveTab()}
            navigation={navigation}
          />
        ) : (
          <_InlineLoader type={"list"} />
        )
      ) : null}
    </_Layout>
  )
) : (
  <_Layout
    screen={"profile"}
    header={header}
    renderSocialShare={true}
    headerWrapStyle={{ margin: 0 }}
    style={{ backgroundColor: colors.gridListBG }}>
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        size={"large"}
        animating={state.load}
        color="black"
      />
    </View>
  </_Layout>
);

}

export default mainLayoutHoc({})(OthersProfile);
