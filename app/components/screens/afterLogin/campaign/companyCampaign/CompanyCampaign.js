import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  Text,
  Animated,
  Linking,
  Alert,
  Modal,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  globals,
  helpers,
  colors,
  images,
  sty,
  ApiCall,
  API,
} from "../../../../../configs";
import {
  _GradiantView,
  _Icon,
  _Layout,
  _Filter,
  _InlineLoader,
  _Lang,
  _Loading,
} from "../../../../custom";
import mainStyles from "../../../../../assets/styles/MainStyles";
import { reject, map } from "lodash";
import { styles } from "./styles";
import { find } from "lodash";
import moment from "moment";
// import {
//   POST_TYPES,
//   SHARE_URL,
//   WEB_URL,
// } from "../../../../../configs/libs/globals";
import { ActionSheet } from "native-base";
import { setOtherProfileContest } from "../../../../../redux/actions/OtherProfileActions";
import { setNavigation } from "../../../../../redux/actions/NavAction";
import { setTimestampData } from "../../../../../redux/actions/TimestampAction";
import { setUserInfo } from "../../../../../redux/actions/UserInfoAction";
import {
  setParticipantProp,
  setCompanyRefreshIndicator,
  pushParticipantProp,
} from "../../../../../redux/actions/CompanyParticipantAction";
import { setParticipantWinners } from "../../../../../redux/actions/WinnersActions";
import { setPendingParticipantProp } from "../../../../../redux/actions/PendingParticipantAction";
import { setParticipantTop10 } from "../../../../../redux/actions/ParticipantTop10";
import { setAppData } from "../../../../../redux/actions/AppDataActions";
import {
  pushProfileDataProp,
  setProfileDataProp,
} from "../../../../../redux/actions/ProfileAction";
import { setHomeDataProp } from "../../../../../redux/actions/HomeActions";
import {
  saveSingleContest,
  setCampaignProp,
} from "../../../../../redux/actions/CampaignsActions";
import Information from "./tabs/Information";
import Participants from "./tabs/Participants";
import Pending from "./tabs/Pending";
// import Top10 from "./tabs/Top10";
import Finalist from "./tabs/finalist";
// import Winners from "./tabs/Winners";
import Share from "react-native-share";
import albums from "../../uploadPhoto/albums/Albums";
import TabHeader from "../../../../custom/ContentTypes/common/TabHeader";
import { _ImageWrap, _PostVideo } from "../../../../custom/ContentTypes/common";

let ownerRoutes = [
  {
    index: 0,
    text: "campaign.information",
    key: "information",
    icon: images.infoContest,
  },
  {
    index: 1,
    text: "campaign.participant",
    key: "participants",
    icon: images.gridContest,
  },
  {
    index: 2,
    text: "campaign.finalist",
    key: "finalist",
    icon: images.finalistContest,
  },
  {
    index: 3,
    text: "campaign.winners",
    key: "winners",
    icon: images.campaign3,
  },
];
let userRoutes = [
  {
    index: 0,
    text: "campaign.information",
    key: "information",
    icon: images.infoContest,
  },
  {
    index: 1,
    text: "campaign.participant",
    key: "participants",
    icon: images.gridContest,
  },
  {
    index: 2,
    text: "campaign.popular",
    key: "finalist",
    icon: images.finalistContest,
  },
  {
    index: 3,
    text: "campaign.winners",
    key: "winners",
    icon: images.campaign3,
  },
];
let userRoutesWithoutPopular = [
  {
    index: 0,
    text: "campaign.information",
    key: "information",
    icon: images.infoContest,
  },
  {
    index: 1,
    text: "campaign.participant",
    key: "participants",
    icon: images.gridContest,
  },

  {
    index: 3,
    text: "campaign.winners",
    key: "winners",
    icon: images.campaign3,
  },
];
export default function CompanyCampaign(props) {
  console.log('after Login companyCampaign props ==>',props);
  let dataArr = [];
  const campaignInf = props.route.params.campaignInfo;
  
  const { news, apiType } = props.route.params;
  const {navProps,
    companyParticipant,
    companyParticipantList,
    winnerParticipant,
    participantsPendingReducer,
    participantTop10,
    localize,
    appData,
    loginData,
    profile,
    home,
    campaigns,
    userInfo,
    timestamp,
   } = useSelector(state => state);
  const otherProfileContest = useSelector(state => state.otherProfile.otherProfileContest);

  
  const [constructorHasRun,setConstructorHasRun] = useState(false)
  const [index, setIndex] = useState();
  const [routes, setRoutes] = useState(...userRoutes);
  // const [campaignInfo, setCampaignInfo] = useState(newdata);
  // const [apiType, setApiType] = useState(apiType);
  const [loaded, setLoaded] = useState(false);
  const [campaignInfo, setCampaignInfo] = useState(campaignInf);
  const [isPostSaved, setIsPostSaved] = useState();
  const [isReported, setIsReported] = useState();
  const [participantLoaded, setParticipantLoaded] = useState(false);
  const [pendingParticipantLoaded, setpendingParticipantLoaded] = useState(false);
  const [top10Loaded, setTop10Loaded] = useState(false);
  const [winnersLoaded, setWinnersLoaded] = useState(false);
  const [subHeaderHeight, setSubHeaderHeight] = useState(new Animated.Value(68));
  const [videoModal, setVideoModal] = useState(false);
  const [pauseVideo,setPauseVideo] = useState(true);
  const [socialShareArr, setSocialShareArr] = useState([
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
  ]);

  const isCampaignOwner = false;
  const participantEndTrigger = null;
  const topEndTrigger = null;
  const winnerEndTrigger = null;
  const infoRefresh = null;
  const participantRefresh = null;
  const topRefresh = null;
  const winnerRefresh = null;
  const scrollListRef = null;
  const winnerClearInterval = null;
  const infoClearInterval = null;
  const FinalistClearInterval = null;
  const participantTop = null;
  const finalistTop = null;
  const winnerTop = null;

  const constructor=()=>{
    console.log('constructor has run ==>',constructorHasRun);
    if(constructorHasRun)return;
    else{
      const data = find(
        campaigns[apiType ? apiType : ""],
        (dt) => dt._id === campaignInf._id,
      );
      const newdata = news ? campaignInf : data;
       let focusListener;
      // newdata = news && find(props.home.news, dt => dt._id == campaignInfo._id)
      let claculatedclockText = helpers.contestSelectionProcess(
        newdata.endDate,
        newdata.startDate,
        newdata.upcomingDays,
      );
      let initialIndex = 0;
      if (claculatedclockText === "closed") {
        _participantApi(3, true, false, newdata);
        initialIndex = 3;
      } else if (
        claculatedclockText === "winner" ||
        claculatedclockText === "finalist"
      ) {
        _participantApi(2, true, false, newdata);
        initialIndex = 2;
      } else {
        console.log('newData==>',newdata);
        _participantApi(1, true, false, newdata);
        initialIndex = 0;
      }
       setCampaignInfo(newdata);
       setIsPostSaved(newdata.isSavedPost || false);
       setIsReported(newdata.isReported || false);
       setIndex(initialIndex)
       setConstructorHasRun(true);
    }
  }
  
  // setCampaignInfo(newdata);
  constructor();
  const [campId, setCampId] = useState(campaignInfo?._id);
  const dispatch = useDispatch();


  useEffect(()=>{
    let data = find(
      campaigns[apiType ? apiType : ""],
      (dt) => dt._id === campId,
    );
    if (data === undefined) {
      data = find(home.news, (dt) => dt._id === campId);
    }
    // if (data !== state.campaignInfo && !nextProps.navigation.state.params.news) {
    if (data !== undefined && data !== campaignInfo) {
       setCampaignInfo(data);
       setIsPostSaved(data.isSavedPost || false);
       setIsReported(data.isReported || false);
    }
  },[props.route.params.campaignInfo]);

  useEffect(()=>{
    setTimeout(() => {
      helpers.pauseVideo(true);
    }, 1000);

    let isCampaignOwner =
      loginData.id === campaignInfo.createdBy._id ? true : false;
    isCampaignOwner = isCampaignOwner;
    _participantApi(1, true);
    if (isCampaignOwner) {
      setRoutes([...ownerRoutes]);
    }
    // this._participantApi(1, true, false)
    globals.setUserData("campaignRef", { viewRef: this });
    focusListener = props.navigation.addListener("didFocus", () => {
      // StatusBar.setHidden(true);

      if (props.navigation.getParam("applied")) {
        // this.setState({ campaignInfo: Object.assign({}, this.state.campaignInfo, { userParticipateCount: this.state.campaignInfo.userParticipateCount + 1 }) })
        _changeTab(1, true);
      }
    });
  },[])

  // useEffect(()=>{
  //   _participantApi(index, true, forceCall);
  // },index);

// useEffect(()=>{
//   return ()=>{
//     focusListener.remove();
//   }
// },[]);
  // _showSocialShare = () => {

  //   let url = "";
  //   const item = campaignInfo;

  //   let postType = helpers.buildPostType(item.postType, item.userType || "");
  //   const middleUrl = find(SHARE_URL, (shr) => shr.type == postType);
  //   let lang = props.localize.activeLanguage === "en" ? "/en" : "/de";
  //   let calculatedclockText = helpers.contestSelectionProcess(
  //     campaignInfo.endDate,
  //     campaignInfo.startDate,
  //     campaignInfo.upcomingDays,
  //   );
  //   let contestType = "";
  //   if (calculatedclockText === "winner" || calculatedclockText === "finalist")
  //     contestType = "/finalist";
  //   else if (calculatedclockText === "closed") contestType = "/winner";

  //   if (middleUrl) {
  //     url = WEB_URL + middleUrl.url + item.slug + contestType + lang;
  //   }

  //   Share.open({
  //     title: "Picstagraph",
  //     message: "",
  //     url,
  //   });
  // };

  // _trans = (str1, str2) => helpers.getLocale(props.localize, str1, str2);


  // const _toggleMoreList = (ref) => {
  //   let contentInfo = campaignInfo;
  //   var menu = [];
  //   if (contentInfo.createdBy._id === loginData.id) {
  //     let menuArr = [
  //       _trans("moreOption", "deletePost"),
  //       _trans("moreOption", "cancel"),
  //     ];
  //     if (
  //       [
  //         globals.POST_TYPES.MediaPost,
  //         globals.POST_TYPES.CompanyParticipantCampaign,
  //       ].includes(contentInfo.postType)
  //     ) {
  //       menuArr.splice(0, 0, _trans("moreOption", "editPost"));
  //     }
  //     menu = [...menuArr];
  //   } else {
  //     let reportTxt = isReported
  //       ? _trans("moreOption", "unreportPost")
  //       : _trans("moreOption", "reportPost");
  //     let savedTxt = isPostSaved
  //       ? _trans("moreOption", "unsavePost")
  //       : _trans("moreOption", "savePost");

  //     let reportedPostIdArr = globals.getUserData("reportedPosts");
  //     reportedPostIdArr = reportedPostIdArr.map((item) => {
  //       if (item.id === contentInfo.id) {
  //         setIsReported(item.flag);
      
  //         reportTxt = item.flag
  //           ? _trans("moreOption", "unreportPost")
  //           : _trans("moreOption", "reportPost");
  //       }
  //     });

  //     let savedPostIdArr = globals.getUserData("savedPosts");
  //     savedPostIdArr = savedPostIdArr.map((item) => {
  //       if (item.id === contentInfo.id) {
  //         setIsPostSaved(item.flag);
  //         savedTxt = item.flag
  //           ? _trans("moreOption", "unsavePost")
  //           : _trans("moreOption", "savePost");
  //       }
  //     });
  //     menu = [reportTxt, savedTxt, _trans("moreOption", "cancel")];
  //   }

  //   if (contentInfo.approveParticipantFlag) {
  //     menu.splice(
  //       menu.length - 1,
  //       0,
  //       contentInfo.isActive
  //         ? _trans("moreOption", "removePartcipant")
  //         : _trans("moreOption", "approvePost"),
  //     );
  //   }

  //   ActionSheet.show(
  //     {
  //       options: [...menu],
  //       title: _trans("moreOption", "selectAction"),
  //       cancelButtonIndex: [...menu].length - 1,
  //     },
  //     (buttonIndex) => {
  //       _apiAction(buttonIndex);
  //     },
  //   );
  // };

  // _apiAction = (selection) => {
  //   // const { loginData, pushProfileDataProp, profile, navProps } = props;
  //   // const { isPostSaved, isReported, campaignInfo } = this.state;
  //   let contentInfo = campaignInfo;
  //   let postType = helpers.getBackendPostType(
  //     contentInfo,
  //     contentInfo.postType,
  //     globals.POST_TYPES,
  //   );
  //   if (contentInfo.postType === "blog") postType = "media";
  //   if (contentInfo.createdBy._id !== loginData.id) {
  //     if (selection === 0) {
  //       let cb = {
  //         success: (res) => {
  //           let appDataCount = 0;
  //           let reportedPostIdArr = globals.getUserData("reportedPosts");
  //           reportedPostIdArr = reportedPostIdArr.map((item) => {
  //             if (item.id === contentInfo.id) {
  //               appDataCount++;
  //               setIsReported( !item.flag);
               
  //               return {
  //                 id: item.id,
  //                 flag: !item.flag,
  //               };
  //             }
  //           });
  //           if (appDataCount === 0) {
  //             globals.setUserData("reportedPosts", [
  //               {
  //                 id: contentInfo.id,
  //                 flag: !isReported,
  //               },
  //             ]);
  //             setIsReported(!isReported);
            
  //           } else {
  //             globals.setUserData("reportedPosts", reportedPostIdArr);
  //           }

  //           this.refs.loader.success(
  //             "Success",
  //             isReported ? "Post unreported" : "Post reported",
  //           );
  //         },
  //         error: (e) => {
  //           this.refs.loader.error(
  //             "Error",
  //             isReported ? "Post unreport failed" : "Post report failed",
  //           );
  //         },
  //       };
  //       let data = {
  //         typeId: contentInfo._id,
  //         typeContent: [
  //           globals.POST_TYPES.MediaPost,
  //           globals.POST_TYPES.Blog,
  //         ].includes(postType)
  //           ? contentInfo.typeContent
  //           : postType,
  //         title: contentInfo.title || "",
  //       };
  //       // this.refs.loader.load();
  //       let header = helpers.buildHeader({ authorization: loginData.token });
  //       API.reportPost(data, cb, header);
  //     }

  //     if (selection === 1) {
  //       let cb = {
  //         success: (res) => {
  //           let appDataCount = 0;
  //           let savedPostIdArr = globals.getUserData("savedPosts");
  //           savedPostIdArr = savedPostIdArr.map((item) => {
  //             if (item.id === contentInfo.id) {
  //               appDataCount++;
  //               setIsPostSaved(!item.flag);
              
  //               if (profile.saved !== null) {
  //                 if (item.flag) {
  //                   let savedPostsArr = profile.saved;
  //                   savedPostsArr = savedPostsArr.filter((postItem) => {
  //                     return postItem.id !== contentInfo.id ? true : false;
  //                   });
  //                   dispatch(setProfileDataProp({ prop: "saved", arr: savedPostsArr }));
  //                 } else {
  //                   dispatch(pushProfileDataProp({
  //                     prop: "saved",
  //                     bindActionCreators: contentInfo,
  //                   }));
  //                 }
  //               }
  //               return {
  //                 id: item.id,
  //                 flag: !item.flag,
  //               };
  //             }
  //           });
  //           if (appDataCount === 0) {
  //             if (profile.saved !== null) {
  //               if (isPostSaved) {
  //                 let savedPostsArr = profile.saved;
  //                 savedPostsArr = savedPostsArr.filter((postItem) => {
  //                   return postItem.id !== contentInfo.id ? true : false;
  //                 });
  //                dispatch(setProfileDataProp({ prop: "saved", arr: savedPostsArr }));
  //               } else {
  //                 dispatch(pushProfileDataProp({ prop: "saved", arr: contentInfo }));
  //               }
  //             }

  //             globals.setUserData("savedPosts", [
  //               {
  //                 id: contentInfo.id,
  //                 flag: !isPostSaved,
  //               },
  //             ]);
  //             setIsPostSaved(!isPostSaved);
             
  //           } else {
  //             globals.setUserData("savedPosts", savedPostIdArr);
  //           }

  //           this.refs.loader.success(
  //             "Success",
  //             isPostSaved ? "Post unsaved" : "Post saved",
  //           );
  //         },
  //         error: (e) => {
  //           this.refs.loader.error(
  //             "Error",
  //             isPostSaved ? "Post unsave failed" : "Post save failed",
  //           );
  //         },
  //       };
  //       let data = {
  //         post: contentInfo._id,
  //         postType,
  //       };
  //       //this.refs.loader.load();
  //       let header = helpers.buildHeader({ authorization: loginData.token });
  //       API.saveOwnSaved(data, cb, header);
  //     }

  //     if (contentInfo.approveParticipantFlag && selection === 2) {
  //       if (contentInfo.isActive) {
  //         this.removeParticipant();
  //       } else {
  //         this.approveParticipant();
  //       }
  //     }
  //   } else {
  //     let isMedia = [
  //       globals.POST_TYPES.MediaPost,
  //       globals.POST_TYPES.CompanyParticipantCampaign,
  //     ].includes(contentInfo.postType);
  //     let isEditPost = isMedia && selection === 0 ? true : false;
  //     let isDeletePost = false;
  //     let isApproveParticipant = false;
  //     if (isMedia && selection === 1) isDeletePost = true;
  //     if (!isMedia && selection === 0) isDeletePost = true;

  //     if (isMedia && selection === 2) isApproveParticipant = true;
  //     if (!isMedia && selection === 1) isApproveParticipant = true;

  //     if (isEditPost) {
  //       navProps.activeNav.navigate("NewPost", {
  //         editPostInfo: contentInfo,
  //       });
  //     }

  //     if (isDeletePost) {
  //       Alert.alert(
  //         "Warning",
  //         "Do you want to delete post?",
  //         [
  //           {
  //             text: "No",
  //             onPress: () => console.log("Cancel Pressed"),
  //             style: "cancel",
  //           },
  //           { text: "Yes", onPress: () => _deletePost() },
  //         ],
  //         { cancelable: false },
  //       );
  //     }

  //     if (contentInfo.approveParticipantFlag && isApproveParticipant) {
  //       if (contentInfo.isActive) {
  //         removeParticipant();
  //       } else {
  //         approveParticipant();
  //       }
  //     }
  //   }
  // };

  // const profileNewsUpdater = (contentInfo) => {
  //   find(profile.newsFeed, (dt) => dt._id == contentInfo._id)
  //     ? dispatch(setProfileDataProp({
  //         prop: "newsFeed",
  //         arr: reject(profile.newsFeed, (dt) => dt._id == contentInfo._id),
  //       }))
  //     : null;
  // } 

//  const profileContestUpdater = (contentInfo) => {
//     find(profile.contest, (dt) => dt._id == contentInfo._id)
//       ? dispatch(setProfileDataProp({
//           prop: "contest",
//           arr: reject(profile.contest, (dt) => dt._id == contentInfo._id),
//         }))
//       : null;
//   }

//  const homeNewsUpdater=(contentInfo) =>{
   
//     find(home.news, (dt) => dt._id == contentInfo._id)
//       ? dispatch(setHomeDataProp({
//           prop: "news",
//           arr: reject(home.news, (dt) => dt._id == contentInfo._id),
//         }))
//       : null;
//   }

//  const homeExploreUpdater=(contentInfo)=> {
    
//     find(home.explore, (dt) => dt._id == contentInfo._id)
//       ? dispatch(setHomeDataProp({
//           prop: "explore",
//           arr: reject(home.explore, (dt) => dt._id == contentInfo._id),
//         }))
//       : null;
//   }

  // const participantUpdater = () =>{
    
  //   find(home.participant, (dt) => dt._id == contentInfo._id)
  //     ? dispatch(setHomeDataProp({
  //         prop: "participant",
  //         arr: reject(home.participant, (dt) => dt._id == contentInfo._id),
  //       }))
  //     : null;
  // }

//  const otherProfileUpdater=(contentInfo) =>{
   
//     if (otherProfileContest[contentInfo.createdBy._id] !== undefined) {
//       find(
//         otherProfileContest[contentInfo.createdBy._id].arr,
//         (dt) => dt._id == contentInfo._id,
//       )
//         ? dispatch(setOtherProfileContest({
//             id: contentInfo.createdBy._id,
//             arr: reject(
//               otherProfileContest[contentInfo.createdBy._id].arr,
//               (dt) => dt._id == contentInfo._id,
//             ),
//             pagination:
//               otherProfileContest[contentInfo.createdBy._id].pagination || {},
//           }))
//         : null;
//     }
//   }

//  const contestUpdater = () => {
 
//     let contentInfo = campaignInfo;
//     find(campaigns[apiType ? apiType : ""], (dt) => dt._id == contentInfo._id)
//       ? dispatch(setCampaignProp({
//           prop: apiType,
//           arr: reject(
//             campaigns[apiType ? apiType : ""],
//             (dt) => dt._id == contentInfo._id,
//           ),
//         }))
//       : null;
//   }
  // const  _deletePost = () => {
   
  //   let contentInfo = campaignInfo;
  //   let postType = helpers.getBackendPostType(
  //     contentInfo,
  //     contentInfo.postType,
  //     globals.POST_TYPES,
  //   );
  //   let cb = {
  //     success: (res) => {
  //       if (postType == globals.POST_TYPES.MediaPost) {
  //         homeNewsUpdater(contentInfo);
  //         profileNewsUpdater(contentInfo);
  //         homeExploreUpdater(contentInfo);
  //       } else if (postType == globals.POST_TYPES.CompanyParticipantCampaign) {
  //         participantUpdater(contentInfo);
  //         homeNewsUpdater(contentInfo);
  //         profileNewsUpdater(contentInfo);
  //       } else if (postType == "campaign") {
  //         homeNewsUpdater(contentInfo);
  //         profileNewsUpdater(contentInfo);
  //         profileContestUpdater(contentInfo);
  //         otherProfileUpdater(contentInfo);
  //         contestUpdater(contentInfo);
  //         props.navigation.pop();
  //       } else if (postType == globals.POST_TYPES.Blog) {
  //         homeNewsUpdater(contentInfo);
  //         profileNewsUpdater(contentInfo);
  //       }
  //       refs.loader.success("Success", "Post deleted");
  //     },
  //     error: (e) => refs.loader.error("Error", "Error in post deleted"),
  //     complete: () => {},
  //   };
  //   let urlData = {
  //     postType,
  //     id: contentInfo._id,
  //   };
  //   //this.refs.loader.load();
  //   let header = helpers.buildHeader({ authorization: loginData.token });
  //   API.deleteOwnPost({}, cb, header, urlData);
  // };

  // const _onPostAdded = () => {
  //  dispatch(setCompanyRefreshIndicator(true));
  //   ApiCall.getCampaignParticipants(
  //     "Participant",
  //     campaignInfo.slug,
  //     globals.PARTICIPANT_TYPE.APPROVED,
  //     1,
  //     { timestamp: timestamp["approved" + campaignInfo.id] },
  //   )
  //     .then((res) => {
  //       if (res.data.length > 0) {
  //         const updatedData = map(res.data, (mx) => {
  //           return Object.assign({}, mx, { page: 1, newPost: true });
  //         });
  //        dispatch(pushParticipantProp(
  //           {
  //             id: campaignInfo.id,
  //             arr: updatedData,
  //             pagination: companyParticipant[campaignInfo.id].pagination,
  //           },
  //           true,
  //         ));
  //       }

  //       if (
  //         companyParticipant[campaignInfo.id] &&
  //         companyParticipant[campaignInfo.id].arr.length === 0 &&
  //         !timestamp["approved" + campaignInfo.id]
  //       ) {
  //        dispatch(setParticipantProp({
  //           id: campaignInfo.id,
  //           arr: [],
  //           pagination: res.pagination,
  //         }));
  //       }

  //       dispatch(setTimestampData("approvedNew" + campaignInfo.id, res.timestamp));
  //       dispatch(setCompanyRefreshIndicator(false));
  //     })
  //     .catch((e) => {
  //       !companyParticipant[campaignInfo.id] &&
  //         dispatch(setParticipantProp({
  //           id: campaignInfo.id,
  //           arr: [],
  //           pagination: {},
  //         }));
  //       dispatch(setCompanyRefreshIndicator(false));
  //     });
  // };

  async function _participantApi(
    index,
    topScroll = true,
    forceCall = false,
    tempCampaignInfo,
  ){
    console.log('participantApi is called',tempCampaignInfo);
    let campaignInfo;
    if (tempCampaignInfo) campaignInfo = tempCampaignInfo;
    else campaignInfo = campaignInfo;
   
    await ApiCall.getCampaignParticipants(
      "Participant",
      campaignInfo.slug,
      globals.PARTICIPANT_TYPE.FINALIST,
    )
      .then((res) => {
       dispatch(setTimestampData("finalist" + campaignInfo.id, res.timestamp));

        const updatedData = map(res.data, (mx) => {
          return Object.assign({}, mx, { page: res.pagination.page });
        });

        dispatch(setParticipantTop10({
          id: campaignInfo.id,
          arr: updatedData,
          pagination: res.pagination,
        }));
        const {navigation } = props;
        this.dataArr = participantTop10[campaignInfo.id]
          ? participantTop10[campaignInfo.id].arr
          : [];
        if (this.dataArr.length < 1) {
          setRoutes([...userRoutesWithoutPopular]);
        }
        topScroll && finalistTop();
        dispatch(setCompanyRefreshIndicator(false));
        setLoaded(true);
      })
      .catch((e) => {
        dispatch(setCompanyRefreshIndicator(false));
        setLoaded(true);
      });

    if (index === (isCampaignOwner ? 1 : 1)) {
      if (!companyParticipant[campaignInfo.id]) {
       dispatch(setCompanyRefreshIndicator(true));

      await  ApiCall.getCampaignParticipants(
          "Participant",
          campaignInfo.slug,
          globals.PARTICIPANT_TYPE.APPROVED,
        )
          .then((res) => {
            dispatch(setTimestampData("approved" + campaignInfo.id, res.timestamp));
            const updatedData = map(res.data, (mx) => {
              return Object.assign({}, mx, { page: res.pagination.page });
            });

            dispatch(setParticipantProp({
              id: campaignInfo.id,
              arr: updatedData,
              pagination: res.pagination,
            }));
            topScroll && participantTop();
            dispatch(setCompanyRefreshIndicator(false));
          })
          .catch((e) => {
            dispatch(setCompanyRefreshIndicator(false));
          });
      } else if (forceCall) {
        _onPostAdded();
      } else {
        participantRefresh && participantRefresh();
      }
    }

    if (index === (isCampaignOwner ? 2 : 2)) {
      if (!participantTop10[campaignInfo.id]) {
        dispatch(setCompanyRefreshIndicator(true));

       await ApiCall.getCampaignParticipants(
          "Participant",
          campaignInfo.slug,
          globals.PARTICIPANT_TYPE.FINALIST,
        )
          .then((res) => {
           dispatch(setTimestampData("finalist" + campaignInfo.id, res.timestamp));

            const updatedData = map(res.data, (mx) => {
              return Object.assign({}, mx, { page: res.pagination.page });
            });

            dispatch(setParticipantTop10({
              id: campaignInfo.id,
              arr: updatedData,
              pagination: res.pagination,
            }));
            topScroll && finalistTop();
            dispatch(setCompanyRefreshIndicator(false));
          })
          .catch((e) => {
           dispatch(setCompanyRefreshIndicator(false));
          });
      } else {
        topRefresh && topRefresh();
      }
    }

    if (index === (this.isCampaignOwner ? 3 : 3)) {
      if (!winnerParticipant[campaignInfo.id]) {
       dispatch(setCompanyRefreshIndicator(true));
      await  ApiCall.getCampaignParticipants(
          "Participant",
          campaignInfo.slug,
          globals.PARTICIPANT_TYPE.WINNER,
          1,
          { text: "full-response" },
        )
          .then((res) => {
            dispatch(setParticipantWinners({
              id: campaignInfo.id,
              arr: res.data,
              pagination: res.pagination,
            }));
            topScroll && winnerTop();
            dispatch(setCompanyRefreshIndicator(false));
          })
          .catch((e) => {
           dispatch(setCompanyRefreshIndicator(false));
          });
      } else {
        winnerRefresh && winnerRefresh();
      }
    }
  };

  const _changeTab = (index, forceCall = false) => {
    let lastIndex = index;
    // if (lastIndex == 0 && this.infoClearInterval) infoClearInterval();
    // if (lastIndex == 3 && this.winnerClearInterval) winnerClearInterval();
    // if (lastIndex == 2 && this.FinalistClearInterval)
    //   FinalistClearInterval();

    helpers.pauseVideo();
    setIndex(index);
    _participantApi(index, true, forceCall);
  };

  const _renderTab = (props) => {
    return (
      <View>
        <TabHeader
          routes={routes}
          index={index}
          changeTab={(i) => _changeTab(i)}
          contest
          color={campaignInfo?.themeColor}
          // showIcon={true}
        />
        {/* {this._renderVideoModal()} */}
      </View>
    );
  };

 const checkIphoneXR = () => {
    return (
      Platform.OS === "ios" &&
      (globals.WINDOW_HEIGHT == 812 || globals.WINDOW_WIDTH == 812)
    );
  };

  const renderFooterButton = () => {
    // const { index, campaignInfo } = this.state;
    // const { localize, campaigns, loginData } = props;
    // const contentInfox = find(campaigns, cam => cam.id == campaignInfo.id) ? find(campaigns, cam => cam.id == campaignInfo.id) : campaignInfo
    // let isApplied = contentInfox ? contentInfox.participateBy.includes(loginData.id) : false
    let isApplied =
      campaignInfo.userParticipateCount >=
      campaignInfo.multipleApplicationAllowed;
    let dayLeft = moment(campaignInfo.endDate).diff(moment(), "days");
    let secondsLeft = moment(campaignInfo.endDate).diff(moment(), "seconds");
    let isClose = secondsLeft <= 0;
    let isMaxTimeApplied =
      campaignInfo.userParticipateCount <
      campaignInfo.multipleApplicationAllowed;
    let isMaxParticipant =
      campaignInfo.participantCount >= campaignInfo.maxApplicantCount;

    let calculatedclockText = helpers.contestSelectionProcess(
      campaignInfo.endDate,
      campaignInfo.startDate,
      campaignInfo.upcomingDays,
    );
    let clockText = "";

    switch (calculatedclockText) {
      case "winner":
        clockText = helpers.getLocale(
          props.localize,
          "campaign",
          "winner_selecction",
        );
        break;
      case "finalist":
        clockText = helpers.getLocale(
          props.localize,
          "campaign",
          "finalist_selection",
        );
        break;
      case "closed":
        clockText = "Contest Closed";
        break;
      case "upcoming":
        clockText =
          helpers.getLocale(
            props.localize,
            "campaign",
            "application_is_able_after",
          ) + helpers.timeLeft(campaignInfo.startDate);
        break;
      case "day":
        // clockText = !isClosed ? dayLeft : 'Contest Closed'
        break;
      default:
        return "Contest Closed";
    }

    return calculatedclockText == "upcoming" ? (
      <View
        style={{
          paddingHorizontal: 10,
          // borderTopWidth: 0.5,
        }}>
        <_GradiantView
          bgColor={campaignInfo?.themeColor ? campaignInfo?.themeColor : null}
          style={{
            ...sty.mgV10,
            height: 50,
            borderRadius: 5,
            marginBottom: checkIphoneXR() ? 20 : 10,
          }}
          isRound>
          <View
            style={{
              ...sty.flex1,
              ...sty.padV10,
              ...{ justifyContent: "center", alignItems: "center" },
            }}
            onPress={() => {}}>
            <Text
              style={[styles.applyTxt, { fontSize: 16, fontWeight: "bold" }]}>
              {clockText}
            </Text>
          </View>
        </_GradiantView>
      </View>
    ) : calculatedclockText == "day" ? (
      isClose ? (
        <View
          style={{
            paddingHorizontal: 10,
            // borderTopWidth: 0.5,
          }}>
          <_GradiantView
            bgColor={campaignInfo?.themeColor ? campaignInfo?.themeColor : null}
            style={{
              ...sty.mgV10,
              height: 50,
              borderRadius: 5,
              marginBottom: checkIphoneXR() ? 20 : 10,
            }}
            isRound>
            <View
              style={{
                ...sty.flex1,
                ...sty.padV10,
                ...{ justifyContent: "center", alignItems: "center" },
              }}
              onPress={() => {}}>
              <Text
                style={[styles.applyTxt, { fontSize: 16, fontWeight: "bold" }]}>
                {helpers.getLocale(
                  localize,
                  "contentType",
                  "contest_is_closed",
                )}
              </Text>
            </View>
          </_GradiantView>
        </View>
      ) : isMaxParticipant ? (
        <View
          style={{
            paddingHorizontal: 10,
            // borderTopWidth: 0.5,
          }}>
          <_GradiantView
            bgColor={campaignInfo?.themeColor ? campaignInfo?.themeColor : null}
            style={{
              ...sty.mgV10,
              height: 50,
              borderRadius: 5,
              marginBottom: checkIphoneXR() ? 20 : 10,
            }}
            isRound>
            <View
              style={{
                ...sty.flex1,
                ...sty.padV10,
                ...{ justifyContent: "center", alignItems: "center" },
              }}
              onPress={() => {}}>
              <Text
                style={[styles.applyTxt, { fontSize: 16, fontWeight: "bold" }]}>
                {helpers.getLocale(
                  localize,
                  "contentType",
                  "maximum_applicant_reached",
                )}
              </Text>
            </View>
          </_GradiantView>
        </View>
      ) : isApplied ? (
        <View
          style={{
            paddingHorizontal: 10,
            // borderTopWidth: 0.5,
          }}>
          <View
            style={[
              styles.appliedBtn,
              { marginBottom: checkIphoneXR() ? 20 : 10 },
            ]}>
            <Text
              style={[styles.appliedTxt, { fontSize: 17, fontWeight: "bold" }]}>
              {helpers.getLocale(localize, "contentType", "already_applied")}
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            paddingHorizontal: 10,
            // borderTopWidth: 0.5,
          }}>
          <_GradiantView
            style={{
              ...sty.mgV10,
              height: 50,
              borderRadius: 5,
              marginBottom: 20,
            }}
            bgColor={campaignInfo?.themeColor ? campaignInfo?.themeColor : null}
            isRound
            //
          >
            <TouchableOpacity
              style={{
                ...sty.flex1,
                ...sty.padV10,
                ...{ justifyContent: "center", alignItems: "center" },
              }}
              onPress={() => {
                // helpers.pauseVideo(true);
                console.log("clicked");
                uploadPost();
              }}>
              <Text
                style={[styles.applyTxt, { fontSize: 17, fontWeight: "bold" }]}>
                {helpers.getLocale(
                  localize,
                  "contentType",
                  "apply_for_this_contest",
                ) +
                  " (" +
                  campaignInfo.userParticipateCount +
                  "/" +
                  campaignInfo.multipleApplicationAllowed +
                  ")"}
              </Text>
            </TouchableOpacity>
          </_GradiantView>
        </View>
      )
    ) : (
      <View
        style={{
          paddingHorizontal: 10,
          // borderTopWidth: 0.5,
        }}>
        <_GradiantView
          style={{
            ...sty.mgV10,
            height: 50,
            borderRadius: 5,
            marginBottom: 20,
          }}
          bgColor={campaignInfo?.themeColor ? campaignInfo?.themeColor : null}
          isRound
          //
        >
          <View
            style={{
              ...sty.flex1,
              ...sty.padV10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {}}>
            <Text
              style={[styles.applyTxt, { fontSize: 16, fontWeight: "bold" }]}>
              {clockText}
            </Text>
          </View>
        </_GradiantView>
      </View>
    );
  };

 const uploadPost = () => {
    const { navigation} = props;
    // this._stopTimer()
    helpers.pauseVideo();

    setPauseVideo(true);
    // this.setState({ pauseVideo: true });
    dispatch(saveSingleContest(campaignInfo));

    /** Select Photo Or video from the library (0-photo, 1-video)(older 1-photo, 2-video) */
    albums(
      {
        campaignInfo,
        loader: refs.loader,
        loginData,
        navigation,
        index:
          campaignInfo.typeContent === "image" ||
          campaignInfo.typeContent === "blog"
            ? 0
            : 1,
      },
      () =>  setPauseVideo(false),
      "contest",
    );
  };

//  const  setParticipantEndTrigger = (ref) => (this.participantEndTrigger = ref);

//  const setTopEndTrigger = (ref) => (this.topEndTrigger = ref);

//  const setWinnerEndTrigger = (ref) => (this.winnerEndTrigger = ref);

//  const setInfoRefresh = (ref) => (this.infoRefresh = ref);

//  const setParticipantRefresh = (ref) => (this.participantRefresh = ref);

//  const setTopRefresh = (ref) => (this.topRefresh = ref);

//  const setWinnerRefresh = (ref) => (this.winnerRefresh = ref);

//  const setInfoRemoveTimer = (ref) => (this.infoClearInterval = ref);

//  const setWinnerRemoveTimer = (ref) => (this.winnerClearInterval = ref);

//  const setFinalistRemoveTimer = (ref) => (this.FinalistClearInterval = ref);

//  const setParticipantTop = (ref) => (this.participantTop = ref);

//  const setFinalistTop = (ref) => (this.finalistTop = ref);

//  const setWinnerTop = (ref) => (this.winnerTop = ref);

//  const _showFilter = () => this.refs.filter.show();

  const header = {
    leftCb: () => {
      _navigateBack();
    },
    leftImg: images.leftBackArrow,
    title:
      campaignInfo?.typeContent == "video"
        ? "contentType.videoContest"
        : "contentType.photoContest", 
    rightNewIconArr: [
      images.shareArrowBlack,
    ],
    rightNewCb: [
      () => {
        _showSocialShare();
      },
      () => {
        _toggleMoreList();
      },
    ],
  };

//  const _navigateBack = () => {
//     props.navigation.pop();
//   };

//   this.dataArr = participantTop10[campaignInfo.id]
//   ? participantTop10[campaignInfo.id]?.arr
//   : [];

// const contentInfox = find(
//   campaigns[apiType ? apiType : ""],
//   (cam) => cam.id === campaignInfo.id,
// )
//   ? find(
//       campaigns[apiType ? apiType : ""],
//       (cam) => cam.id === campaignInfo.id,
//     )
//   : campaignInfo;

  return (
    <_Layout
      screen={"campaign"}
      header={header}
      renderSocialShare={true}
      headerWrapStyle={{ margin: 0, backgroundColor: "#fff" }}>
      
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {loaded ? (
        <View style={{ flex: 1, backgroundColor: colors.white }}>

          {_renderTab()}
          {dataArr.length > 0 ? (
            <>
              {index === 0 ? (
                <Information
                  navigation={props.navigation}
                  campaignInfo={campaignInfo}
                  // setInfoRefresh={setInfoRefresh}
                  activeTab={index}
                  // setRemoveTimer={setInfoRemoveTimer}
                  // header={_renderTabBar()}
                  tabView={true}
                  // {...this.state}
                />
              ) : null}
              {/* {index === 1 ? (
                <Participants
                  navigation={navigation}
                  campaignInfo={campaignInfo}
                  isCampaignOwner={isCampaignOwner}
                  // header={this._renderTabBar()}
                  setParticipantTop={setParticipantTop}
                  // setParticipantEndTrigger={this.setParticipantEndTrigger}
                  setParticipantRefresh={setParticipantRefresh}
                  activeTab={index}
                  {...props}
                  footerButton={renderFooterButton}
                />
              ) : null}
              {index === 2 ? (
                <Top10
                  navigation={navigation}
                  campaignInfo={campaignInfo}
                  // header={this._renderTabBar()}
                  setFinalistTop={setFinalistTop}
                  // setTopEndTrigger={this.setTopEndTrigger}
                  setTopRefresh={setTopRefresh}
                  activeTab={index}
                  setRemoveTimer={setFinalistRemoveTimer}
                  {...props}
                  footerButton={renderFooterButton}
                />
              ) : null}
              {index === 3 ? (
                <Winners
                  navigation={navigation}
                  campaignInfo={campaignInfo}
                  // header={this._renderTabBar()}
                  setWinnerTop={setWinnerTop}
                  // setWinnerEndTrigger={this.setWinnerEndTrigger}
                  setWinnerRefresh={setWinnerRefresh}
                  activeTab={index}
                  setRemoveTimer={setWinnerRemoveTimer}
                  {...props}
                />
              ) : null} */}
            </>
          ) : (
            <>
              {index === 0 ? (
                <Information
                  navigation={props.navigation}
                  campaignInfo={campaignInfo}
                  // setInfoRefresh={setInfoRefresh}
                  activeTab={index}
                  // setRemoveTimer={setInfoRemoveTimer}
                  // header={this._renderTabBar()}
                  tabView={true}
                  // {...this.state}
                // {...props}
                />
              ) : null}
              {/* {index === 1 ? (
                <Participants
                  navigation={navigation}
                  campaignInfo={campaignInfo}
                  isCampaignOwner={isCampaignOwner}
                  // header={this._renderTabBar()}
                  setParticipantTop={setParticipantTop}
                  // setParticipantEndTrigger={this.setParticipantEndTrigger}
                  setParticipantRefresh={setParticipantRefresh}
                  activeTab={index}
                  {...props}
                  footerButton={renderFooterButton}
                />
              ) : null}
              {index === 3 ? (
                <Winners
                  navigation={navigation}
                  campaignInfo={campaignInfo}
                  // header={this._renderTabBar()}
                  setWinnerTop={setWinnerTop}
                  // setWinnerEndTrigger={this.setWinnerEndTrigger}
                  setWinnerRefresh={setWinnerRefresh}
                  activeTab={tindex}
                  setRemoveTimer={setWinnerRemoveTimer}
                  {...props}
                />
              ) : null} */}
            </>
          )}

          <View style={{ bottom: 0, position: "absolute", width: "100%" }}>
            {renderFooterButton()}
          </View>
          <_Filter
            // ref={"filter"}
            filterFor={globals.FILTERS_FOR.PARTICIPANT}
            // filterDataApi={filterDataApi}
          />
          {/* <_Loading 
          // ref={"loader"} 
          /> */}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
            backgroundColor: "#fff",
          }}>
          <ActivityIndicator
            size={"large"}
            animating={!loaded}
            color="black"
          />
        </View>
      )}
    </_Layout>
  );
}

// import React from "react";
// import {View,Text} from 'react-native';

// export default function CompanyCampaign(props){
//   return(<View><Text>Company Campaign after Login</Text></View>)
// }