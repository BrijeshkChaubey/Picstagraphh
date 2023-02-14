import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  Text,
  Animated,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
  PermissionsAndroid,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionSheet } from "native-base";
import {
  globals,
  helpers,
  colors,
  images,
  sty,
  API,
} from "../../../../configs";
import { _Loading } from "../../../custom";
import mainStyles from "../../../../assets/styles/MainStyles";
import {
  pushProfileDataProp,
  setProfileDataProp,
} from "../../../../redux/actions/ProfileAction";
import { setHomeDataProp } from "../../../../redux/actions/HomeActions";
import { setCampaignProp } from "../../../../redux/actions/CampaignsActions";
import { setParticipantTop10 } from "../../../../redux/actions/ParticipantTop10";
import { setParticipantTop10List } from "../../../../redux/actions/ParticipantTop10ListAction";
import { setParticipantProp } from "../../../../redux/actions/CompanyParticipantAction";
import { setParticipantListProp } from "../../../../redux/actions/CompanyParticipantListAction";
import { setParticipantWinners } from "../../../../redux/actions/WinnersActions";
import RBSheet from "react-native-raw-bottom-sheet";
import { reject, find, map, concat } from "lodash";
import RNFetchBlob from "rn-fetch-blob";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import {
  POST_TYPES,
  SHARE_URL,
  WEB_URL,
} from "../../../../configs/libs/globals";
import Share from "react-native-share";
import ShareModal from "./ShareModal";
import {
  base64Converter,
  saveVideoToGallery,
  saveImageToGallery,
} from "./InstaShare";
import { useDispatch, useSelector} from "react-redux";
import { useState,useRef } from "react";
import { setUserInfo } from "../../../../redux/actions/UserInfoAction";

const SCALES = [1.2, 0.8, 1];


const _PostMeta = (props) => {
  const { contentInfo,loader,CompanyCampaignFullView  } = props;
  const RBSheetRef = useRef();

  const dispatch = useDispatch();
  const navProps = useSelector(state => state.navProps)
  const filtersData = useSelector(state => state.filterWrapperReducer)
  const filtersApiData = useSelector(state => state.filtersApiData)
  const loginData = useSelector(state => state.loginData)
  const userInfo = useSelector(state => state.userInfo)
  const localize = useSelector(state => state.localize)
  const homeNews = useSelector(state => state.home.news)
  const homeExplore=useSelector(state => state.home.explore)
  const participants = useSelector(state => state.participant)
  const ownNewsfeed = useSelector(state => state.profile.newsFeedList)
  const campaigns = useSelector(state => state.campaigns)

  const companyParticipant = useSelector(state => state.companyParticipant)
  const companyParticipantList = useSelector(state => state.companyParticipantList)
  const winnerParticipant = useSelector(state => state.winnerParticipant)
  const participantTop10 = useSelector(state => state.participantTop10)
  const participantTop10List=useSelector(state => state.participantTop10List)

  const otherProfileNewsfeed = useSelector(state => state.otherProfile.otherProfileNewsfeed)
  const otherProfileNewsfeedList = useSelector(state => state.otherProfile.otherProfileNewsfeedList)
  const appData = useSelector(state => state.appData)
  const profile = useSelector(state => state.profile)
  const home = useSelector(state => state.home)

  const [state, setstate]=useState({
    commentCount: props.commentCount,
    likeAnimationScale: new Animated.Value(1),
    like: false,
    modalVisible: false,
    likeCount: props.likeCount,
    load: false,
    isPostSaved: props.contentInfo.isSavedPost || false,
    isReported: props.contentInfo.isReported || false,
    socialShareArr:
      props.contentInfo.typeContent === globals.CONTEST_TYPE.IMAGE_CONTEST
        ? [
            {
              label: "Whatsapp",
              image: "whatsapp",
              contentObj: {
                title: "Share via",
                message: "",
                url: "",
                social: Share.Social.WHATSAPP,
                whatsAppNumber: "",
              },
            },
            {
              label: "Instagram",
              image: "instagram",
              contentObj: {
                title: "Share via",
                message: "",
                url: "",
                social: Share.Social.INSTAGRAM,
              },
            },
            {
              label: "Story",
              image: "story_share",
              contentObj: {
                // method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE,
                backgroundImage: "",
                backgroundBottomColor: "#fefefe",
                backgroundTopColor: "#906df4",
                attributionURL: "",
                social: Share.Social.INSTAGRAM_STORIES,
              },
              // {
              //     method: Share.InstagramStories.SHARE_BACKGROUND_VIDEO,
              //     backgroundVideo: "",
              //     backgroundBottomColor: "#fefefe",
              //     backgroundTopColor: "#906df4",
              //     attributionURL: "",
              //     social: Share.Social.INSTAGRAM_STORIES,
              //   },
            },
            {
              label: "Facebook",
              image: "facebook_share",
              contentObj: {
                title: "Share via",
                message: "",
                url: "",
                social: Share.Social.FACEBOOK,
              },
            },
            {
              label: "Twitter",
              image: "twitter",
              contentObj: {
                title: "Share via",
                message: "",
                url: "",
                social: Share.Social.TWITTER,
              },
            },
            {
              label: "Email",
              image: "mail_share",
              contentObj: {
                title: "Share via",
                message: "",
                url: "",
                social: Share.Social.EMAIL,
              },
            },
          ]
        : [
            {
              label: "Whatsapp",
              image: "whatsapp",
              contentObj: {
                title: "Share via",
                message: "",
                url: "",
                social: Share.Social.WHATSAPP,
                whatsAppNumber: "",
              },
            },
            {
              label: "Instagram",
              image: "instagram",
              contentObj: {
                title: "Share via",
                message: "",
                url: "",
                social: Share.Social.INSTAGRAM,
              },
            },
            // {
            //   label: "Story",
            //   image: "story_share",
            //   contentObj:
            //   {
            //       method: Share.InstagramStories.SHARE_BACKGROUND_VIDEO,
            //       backgroundVideo: "",
            //       backgroundBottomColor: "#fefefe",
            //       backgroundTopColor: "#906df4",
            //       attributionURL: "",
            //       social: Share.Social.INSTAGRAM_STORIES,
            //     },
            // },
            {
              label: "Facebook",
              image: "facebook_share",
              contentObj: {
                title: "Share via",
                message: "",
                url: "",
                social: Share.Social.FACEBOOK,
              },
            },
            {
              label: "Twitter",
              image: "twitter",
              contentObj: {
                title: "Share via",
                message: "",
                url: "",
                social: Share.Social.TWITTER,
              },
            },
            {
              label: "Email",
              image: "mail_share",
              contentObj: {
                title: "Share via",
                message: "",
                url: "",
                social: Share.Social.EMAIL,
              },
            },
          ],
  })

  const commentRef = useRef(null);
    const likeListRef = useRef(null);
    const postMetaRef = useRef();
    const loaderRef = useRef('loader');


    // static getDerivedStateFromProps(nextProps, state) {
    //   if (nextProps.commentCount !== state.commentCount) {
    //     return {
    //       commentCount: nextProps.commentCount,
    //     };
    //   }
    //   if (nextProps.contentInfo.isSavedPost !== state.isPostSaved) {
    //     return {
    //       isPostSaved: nextProps.contentInfo.isSavedPost,
    //     };
    //   }
    //   if (nextProps.contentInfo.isReported !== state.isReported) {
    //     return {
    //       isReported: nextProps.contentInfo.isReported,
    //     };
    //   }
    //   if (nextProps.likeCount !== state.likeCount) {
    //     return {
    //       likeCount: nextProps.likeCount,
    //     };
    //   }
  
    //   return null;
    // }
    const commentCounterSet = (flag = true) => {
      setstate({ ...state,commentCount: flag ? ++state.commentCount : --state.commentCount });
    };

  const  pulseAnimation = (index) => {

      Animated.parallel([
        Animated.timing(state.likeAnimationScale, {
          toValue: SCALES[index],
          duration: 200,
        }),
      ]).start(() => (SCALES[index + 1] ? pulseAnimation(index + 1) : null));
    };
// FIXME: ref.loader
   const  _apiAction = (selection) => {
  
      let postType = helpers.getBackendPostType(
        contentInfo,
        contentInfo.postType,
        globals.POST_TYPES,
      );
      if (contentInfo.postType === "blog") postType = "media";
  
      if ((contentInfo.createdBy?._id || contentInfo.users?._id )!== loginData.id) {
        if (selection === 0) {
          let cb = {
            success: (res) => {
              let appDataCount = 0;
              let reportedPostIdArr = globals.getUserData("reportedPosts");
              reportedPostIdArr = reportedPostIdArr.map((item) => {
                if (item.id === contentInfo.id) {
                  appDataCount++;
                  setstate({ ...state,isReported: !item.flag });
                  return {
                    id: item.id,
                    flag: !item.flag,
                  };
                }
              });
              if (appDataCount === 0) {
                globals.setUserData("reportedPosts", [
                  {
                    id: contentInfo.id,
                    flag: !state.isReported,
                  },
                ]);
                setstate({ ...state,isReported: !state.isReported });
              } else {
                globals.setUserData("reportedPosts", reportedPostIdArr);
              }
  
              loader.success(
                "Success",
                state.isReported ? "Post unreported" : "Post reported",
              );
            },
            error: (e) => {
              loader.error(
                "Error",
                state.isReported ? "Post unreport failed" : "Post report failed",
              );
            },
          };
          let data = {
            typeId: contentInfo._id,
            typeContent: [
              globals.POST_TYPES.MediaPost,
              globals.POST_TYPES.Blog,
            ].includes(postType)
              ? contentInfo.typeContent
              : postType,
            title: contentInfo.title || "",
          };
          //refs.loader.load();
          let header = helpers.buildHeader({ authorization: loginData.token });
          API.reportPost(data, cb, header);
        }
  
        if (selection === 1) {
          let cb = {
            success: (res) => {
              let appDataCount = 0;
              if (profile.saved != null) {
                state.isPostSaved
                  ? dispatch(setProfileDataProp({
                      prop: "saved",
                      arr: reject(
                        profile.saved,
                        (pos) => pos.id == contentInfo._id,
                      ),
                    }))
                  : dispatch(setProfileDataProp({
                      prop: "saved",
                      arr: concat([contentInfo], profile.saved),
                    }));
              }
  
              let savedPostIdArr = globals.getUserData("savedPosts");
              savedPostIdArr = savedPostIdArr.map((item) => {
                if (item.id === contentInfo.id) {
                  appDataCount++;
                  setstate({...state, isPostSaved: !item.flag });
                  if (profile.saved !== null) {
                    if (item.flag) {
                      let savedPostsArr = profile.saved;
                      savedPostsArr = savedPostsArr.filter((postItem) => {
                        return postItem.id !== contentInfo.id ? true : false;
                      });
                      // setProfileDataProp({ prop: 'saved', arr: savedPostsArr });
                    } else {
                      // pushProfileDataProp({ prop: 'saved', bindActionCreators: contentInfo })
                    }
                  }
                  return {
                    id: item.id,
                    flag: !item.flag,
                  };
                }
              });
              if (appDataCount === 0) {
                if (profile.saved !== null) {
                  if (state.isPostSaved) {
                    let savedPostsArr = profile.saved;
                    savedPostsArr = savedPostsArr.filter((postItem) => {
                      return postItem.id !== contentInfo.id ? true : false;
                    });
                    // setProfileDataProp({ prop: 'saved', arr: savedPostsArr });
                  } else {
                    // pushProfileDataProp({ prop: 'saved', arr: contentInfo })
                  }
                }
  
                globals.setUserData("savedPosts", [
                  {
                    id: contentInfo.id,
                    flag: !state.isPostSaved,
                  },
                ]);
                setstate({ ...state,isPostSaved: !state.isPostSaved });
              } else {
                globals.setUserData("savedPosts", savedPostIdArr);
              }
  
              loader.success(
                "Success",
                state.isPostSaved ? "Post status changed" : "Post saved",
              );
            },
            error: (e) => {
              loader.error(
                "Error",
                state.isPostSaved ? "Post status failed" : "Post save failed",
              );
            },
          };
          let data = {
            post: contentInfo._id,
            postType,
          };
          // refs.loader.load();
          let header = helpers.buildHeader({ authorization: loginData.token });
          API.saveOwnSaved(data, cb, header);
        }
  
        if (contentInfo.approveParticipantFlag && selection === 2) {
          if (contentInfo.isActive) {
            removeParticipant();
          } else {
            approveParticipant();
          }
        }
      } else {
        let isMedia = [
          globals.POST_TYPES.MediaPost,
          globals.POST_TYPES.CompanyParticipantCampaign,
          globals.POST_TYPES.Blog,
        ].includes(contentInfo.postType);
        let isEditPost = isMedia && selection === 0 ? true : false;
        let isDeletePost = false;
        let isApproveParticipant = false;
        if (isMedia && selection === 1) isDeletePost = true;
        if (!isMedia && selection === 0) isDeletePost = true;
  
        if (isMedia && selection === 2) isApproveParticipant = true;
        if (!isMedia && selection === 1) isApproveParticipant = true;
  
        if (isEditPost) {
          navProps.activeNav.navigate("NewPost", {
            editPostInfo: contentInfo,
            ...props,
          });
        }
  
        if (isDeletePost) {
          Alert.alert(
            _trans("moreOption", "warning"), //  'Warning',
            _trans("moreOption", "do_you_want_to_delete_post"), //'Do you want to delete post?',
            [
              {
                text: _trans("moreOption", "no"), //'No',
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: _trans("moreOption", "yes"),
                onPress: () => _deletePost(),
              },
            ],
            { cancelable: false },
          );
        }
  
        if (contentInfo.approveParticipantFlag && isApproveParticipant) {
          if (contentInfo.isActive) {
            removeParticipant();
          } else {
            approveParticipant();
          }
        }
      }
    };

  const  approveParticipant = () => {

      let cb = {
        success: (res) => {
          loader.hideLoader();
          setTimeout(() => {
            Alert.alert("Success", "Post is approved");
          }, 400);
        },
        error: (e) => {
          loader.hideLoader();
          setTimeout(() => {
            Alert.alert("Error", "Post is not approved");
          }, 400);
        },
      };
      let data = {
        isActive: true,
      };
      //refs.loader.load();
      let header = helpers.buildHeader({ authorization: loginData.token });
      let postType = helpers.getBackendPostType(
        contentInfo,
        contentInfo.postType,
        globals.POST_TYPES,
      );
      API.postUpdate(data, cb, header, { id: contentInfo._id, type: postType });
    };
   const  removeParticipant = () => {

      let postType = helpers.getBackendPostType(
        contentInfo,
        contentInfo.postType,
        globals.POST_TYPES,
      );
      let cb = {
        success: (res) => {
          loader.hideLoader();
          setTimeout(() => {
            Alert.alert("Success", "Participant is removed");
          }, 400);
        },
        error: (e) => {
          loader.hideLoader();
          setTimeout(() => {
            Alert.alert("Error", "Participant is removed");
          }, 400);
        },
      };
      let urlData = {
        postType,
        id: contentInfo._id,
      };
      //refs.loader.load();
      let header = helpers.buildHeader({ authorization: loginData.token });
      API.deleteOwnPost({}, cb, header, urlData);
    };

   function profileNewsUpdater(contentInfo) {

      find(profile.newsFeedList, (dt) => dt._id == contentInfo._id)
        ? dispatch(setProfileDataProp({
            prop: "newsFeedList",
            arr: reject(profile.newsFeedList, (dt) => dt._id == contentInfo._id),
          }))
        : null;
      find(profile.newsFeed, (dt) => dt._id == contentInfo._id)
        ?dispatch(setProfileDataProp({
            prop: "newsFeed",
            arr: reject(profile.newsFeed, (dt) => dt._id == contentInfo._id),
          }))
        : null;
    }
   function homeNewsUpdater(contentInfo) {
      find(home.news, (dt) => dt._id == contentInfo._id)
        ? dispatch(setHomeDataProp({
            prop: "news",
            arr: reject(home.news, (dt) => dt._id == contentInfo._id),
          }))
        : null;
    }

   function homeExploreUpdater(contentInfo) {

      find(home.explore, (dt) => dt._id == contentInfo._id)
        ? dispatch(setHomeDataProp({
            prop: "explore",
            arr: reject(home.explore, (dt) => dt._id == contentInfo._id),
          }))
        : null;
      find(home.exploreList, (dt) => dt._id == contentInfo._id)
        ? dispatch(setHomeDataProp({
            prop: "exploreList",
            arr: reject(home.exploreList, (dt) => dt._id == contentInfo._id),
          }))
        : null;
    }
   function homeBestUpdater(contentInfo) {

      find(home.best, (dt) => dt._id == contentInfo._id)
        ? dispatch(setHomeDataProp({
            prop: "best",
            arr: reject(home.explore, (dt) => dt._id == contentInfo._id),
          }))
        : null;
      find(home.bestList, (dt) => dt._id == contentInfo._id)
        ? dispatch(setHomeDataProp({
            prop: "bestList",
            arr: reject(home.bestList, (dt) => dt._id == contentInfo._id),
          }))
        : null;
    }
   function participantUpdater() {

      find(home.participant, (dt) => dt._id == contentInfo._id)
        ?dispatch(setHomeDataProp({
            prop: "participant",
            arr: reject(home.participant, (dt) => dt._id == contentInfo._id),
          }))
        : null;
    }
  function  otherProfileUpdater() {
     
      dispatch(setOtherProfileNewsfeed({
        id: contentInfo.createdBy._id,
        arr: reject(
          otherProfileNewsfeed[contentInfo.createdBy._id].arr,
          (dt) => dt._id === contentInfo._id,
        ),
        pagination:
          otherProfileNewsfeed[contentInfo.createdBy._id].pagination || {},
      }));
  
     dispatch(setOtherProfileNewsfeed({
        list: true,
        id: contentInfo.createdBy._id,
        arr: reject(
          otherProfileNewsfeedList[contentInfo.createdBy._id].arr,
          (dt) => dt._id === contentInfo._id,
        ),
        pagination:
          otherProfileNewsfeed[contentInfo.createdBy._id].pagination || {},
      }));
    }
   function contestUpdater() {
      const { contentInfo, campaigns, setCampaignProp } = props;
      // find(campaigns, dt => dt._id == contentInfo._id) ? setCampaignProp(reject(campaigns, dt => dt._id == contentInfo._id)) : null
  
      find(campaigns["apply"], (dt) => dt._id == contentInfo._id)
        ? dispatch(setCampaignProp({
            prop: "apply",
            arr: reject(campaigns["apply"], (dt) => dt._id == contentInfo._id),
          }))
        : null;
      find(campaigns["finalist"], (dt) => dt._id == contentInfo._id)
        ? dispatch(setCampaignProp({
            prop: "finalist",
            arr: reject(campaigns["finalist"], (dt) => dt._id == contentInfo._id),
          }))
        : null;
      find(campaigns["closed"], (dt) => dt._id == contentInfo._id)
        ? dispatch(setCampaignProp({
            prop: "closed",
            arr: reject(campaigns["closed"], (dt) => dt._id == contentInfo._id),
          }))
        : null;
      find(campaigns["extra"], (dt) => dt._id == contentInfo._id)
        ? dispatch(setCampaignProp({
            prop: "extra",
            arr: reject(campaigns["extra"], (dt) => dt._id == contentInfo._id),
          }))
        : null;
      find(campaigns["upcoming"], (dt) => dt._id == contentInfo._id)
        ? dispatch(setCampaignProp({
            prop: "upcoming",
            arr: reject(campaigns["upcoming"], (dt) => dt._id == contentInfo._id),
          }))
        : null;
    }
   function tabsPartRemover(campId, val, action) {

  
      if (val && val[campId]) {
        action({
          id: campId,
          arr: reject(val[campId].arr, (cmp) => cmp._id === contentInfo._id),
          pagination: val[campId].pagination,
        });
      }
    }
   const _deletePost = () => {
      // setState({ load: true });
      loader.load();
      let postType = helpers.getBackendPostType(
        contentInfo,
        contentInfo.postType,
        globals.POST_TYPES,
      );
      if (postType === "blog") postType = "media";
      let cb = {
        success: (res) => {
          loader.success("Success", "Post deleted", {
            ok: () => {},
          });
  
          if (postType === globals.POST_TYPES.MediaPost) {
            homeNewsUpdater(contentInfo);
            profileNewsUpdater(contentInfo);
            homeExploreUpdater(contentInfo);
  
            if (
              otherProfileNewsfeed &&
              otherProfileNewsfeed[contentInfo.createdBy._id]
            ) {
              otherProfileUpdater(contentInfo);
            }
          } else if (postType === globals.POST_TYPES.CompanyParticipantCampaign) {
            let campId = contentInfo.campaignId.id;
  
            tabsPartRemover(campId, companyParticipant, setParticipantProp);
            tabsPartRemover(
              campId,
              companyParticipantList,
              setParticipantListProp,
            );
            tabsPartRemover(
              campId,
              winnerParticipant,
              setParticipantWinners,
            );
            tabsPartRemover(campId, participantTop10, setParticipantTop10);
            tabsPartRemover(
              campId,
              participantTop10List,
              setParticipantTop10List,
            );
  
            homeExploreUpdater(contentInfo);
            homeNewsUpdater(contentInfo);
            profileNewsUpdater(contentInfo);
  
           dispatch(setCampaignProp({
              prop: "apply",
              arr: map(campaigns["apply"], (cam) => {
                if (cam._id === campId) {
                  return Object.assign({}, cam, {
                    participateBy: reject(
                      cam.participateBy,
                      (dt) => dt._id === loginData.id,
                    ),
                    userParticipateCount: cam.userParticipateCount - 1,
                  });
                } else return cam;
              }),
            }));
  
            dispatch(setCampaignProp({
              prop: "finalist",
              arr: map(campaigns["finalist"], (cam) => {
                if (cam._id === campId) {
                  return Object.assign({}, cam, {
                    participateBy: reject(
                      cam.participateBy,
                      (dt) => dt._id === loginData.id,
                    ),
                    userParticipateCount: cam.userParticipateCount - 1,
                  });
                } else return cam;
              }),
            }));
  
            dispatch(setCampaignProp({
              prop: "closed",
              arr: map(campaigns["closed"], (cam) => {
                if (cam._id === campId) {
                  return Object.assign({}, cam, {
                    participateBy: reject(
                      cam.participateBy,
                      (dt) => dt._id === loginData.id,
                    ),
                    userParticipateCount: cam.userParticipateCount - 1,
                  });
                } else return cam;
              }),
            }));
  
            dispatch(setCampaignProp({
              prop: "extra",
              arr: map(campaigns["extra"], (cam) => {
                if (cam._id === campId) {
                  return Object.assign({}, cam, {
                    participateBy: reject(
                      cam.participateBy,
                      (dt) => dt._id === loginData.id,
                    ),
                    userParticipateCount: cam.userParticipateCount - 1,
                  });
                } else return cam;
              }),
            }));
  
            dispatch(setCampaignProp({
              prop: "upcoming",
              arr: map(campaigns["upcoming"], (cam) => {
                if (cam._id == campId) {
                  return Object.assign({}, cam, {
                    participateBy: reject(
                      cam.participateBy,
                      (dt) => dt._id === loginData.id,
                    ),
                    userParticipateCount: cam.userParticipateCount - 1,
                  });
                } else return cam;
              }),
            }));
  
            const deletedData = reject(
              home.news,
              (dt) => dt._id === contentInfo._id,
            );
  
            let data = deletedData.map((cam) => {
              if (campId === cam.id) {
                let count = 0;
                cam.userParticipateCount
                  ? (count = cam.userParticipateCount)
                  : (count = 0);
                return Object.assign({}, cam, {
                  participateBy: reject(
                    cam.participateBy,
                    (dt) => dt._id === loginData.id,
                  ),
                  userParticipateCount: cam.userParticipateCount - 1,
                });
              } else {
                return cam;
              }
            });
            dispatch(setHomeDataProp({ prop: "news", arr: data }));
  
            if (
              otherProfileNewsfeed &&
              otherProfileNewsfeed[contentInfo.createdBy._id]
            ) {
              otherProfileUpdater(contentInfo);
            }
          } else if (postType === "campaign") {
            homeNewsUpdater(contentInfo);
            profileNewsUpdater(contentInfo);
            contestUpdater(contentInfo);
  
            if (
              otherProfileNewsfeed &&
              otherProfileNewsfeed[contentInfo.createdBy._id]
            ) {
              otherProfileUpdater(contentInfo);
            }
          } else if (postType === globals.POST_TYPES.Blog) {
            homeNewsUpdater(contentInfo);
            profileNewsUpdater(contentInfo);
            homeExploreUpdater(contentInfo);
  
            if (
              otherProfileNewsfeed &&
              otherProfileNewsfeed[contentInfo.createdBy._id]
            ) {
              otherProfileUpdater(contentInfo);
            }
          }
  
          if (userInfo && userInfo.postCount) {
            dispatch(setUserInfo(
              Object.assign({}, userInfo, { postCount: --userInfo.postCount }),
            ));
          }
        },
        error: (e) => {
          // setState({ load: false });
          refs.loader.error("Error", "Error in post deleted");
        },
        complete: () => {
          // setState({ load: false });
        },
      };
      let urlData = {
        postType: postType === "blog" ? "media" : postType,
        id: contentInfo._id,
      };
      //refs.loader.load();
      // setState({ load: true });
      let header = helpers.buildHeader({ authorization: loginData.token });
      API.deleteOwnPost({}, cb, header, urlData);
    };

  const _trans = (str1, str2) => helpers.getLocale(localize, str1, str2);

 const  _toggleMoreList = (ref) => {


    const { createdBy, users } = contentInfo;
    console.log("check11", contentInfo)
    console.log("check11", loginData.id)
    var menu = [];
    if ((createdBy?._id || users?._id)=== loginData.id) {
      let menuArr = [
        _trans("moreOption", "deletePost"),
        _trans("moreOption", "cancel"),
      ];
      if (
        [
          globals.POST_TYPES.MediaPost,
          globals.POST_TYPES.CompanyParticipantCampaign,
          globals.POST_TYPES.Blog,
        ].includes(contentInfo.postType)
      ) {
        menuArr.splice(0, 0, _trans("moreOption", "editPost"));
      }
      menu = [...menuArr];
    } else {
      let reportTxt = state.isReported
        ? _trans("moreOption", "unreportPost")
        : _trans("moreOption", "reportPost");
      let savedTxt = state.isPostSaved
        ? _trans("moreOption", "unsavePost")
        : _trans("moreOption", "savePost");

      let reportedPostIdArr = globals.getUserData("reportedPosts");
      reportedPostIdArr = reportedPostIdArr.map((item) => {
        if (item.id === contentInfo.id) {
          setstate({...state, isReported: item.flag });
          reportTxt = item.flag
            ? _trans("moreOption", "unreportPost")
            : _trans("moreOption", "reportPost");
        }
      });

      let savedPostIdArr = globals.getUserData("savedPosts");
      savedPostIdArr = savedPostIdArr.map((item) => {
        if (item.id === contentInfo.id) {
          setstate({ ...state,isPostSaved: item.flag });
          savedTxt = item.flag
            ? _trans("moreOption", "unsavePost")
            : _trans("moreOption", "savePost");
        }
      });
      menu = [reportTxt, savedTxt, _trans("moreOption", "cancel")];
    }

    if (contentInfo.approveParticipantFlag) {
      menu.splice(
        menu.length - 1,
        0,
        contentInfo.isActive
          ? _trans("moreOption", "removePartcipant")
          : _trans("moreOption", "approvePost"),
      );
    }

    ActionSheet.show(
      {
        options: [...menu],
        title: _trans("moreOption", "selectAction"),
        cancelButtonIndex: [...menu].length - 1,
      },
      (buttonIndex) => {
        _apiAction(buttonIndex);
      },
    );
  };
 const _openComments = () => {

console.log('openComments function is called');
    navProps.activeNav.navigate("Comments", {
      postInfo: contentInfo,
      commentCounterSet: (flag) => props.commentCountSet(flag),
      loader: loader,
    });
  };
 const _openLikeList = () => {
    navProps.activeNav.navigate("LikeList", {
      postInfo: contentInfo,
    });
  };
 const _socialShare = () => {
    // const shareOptions = {
    //     title: 'Share via',
    //     message: 'some message',
    //     url: 'some share url',
    //     social: Share.Social.WHATSAPP
    // };
    // Share.shareSingle(shareOptions);
  };
  const share = async (indexz) => {

    const shareObj = find(
      state.socialShareArr,
      (shr, index) => index === indexz,
    );

    const postUrl = contentInfo.watermarkUrl
      ? contentInfo.watermarkUrl
      : contentInfo.mediaUrl;

    let convertedMedia = "";
    if (
      indexz === 2 &&
      contentInfo.typeContent === globals.CONTEST_TYPE.IMAGE_CONTEST
    ) {
      convertedMedia = await base64Converter(postUrl);
    } else if (indexz === 1 && Platform.OS === "ios") {
      if (contentInfo.typeContent === globals.CONTEST_TYPE.IMAGE_CONTEST) {
        const urlArr = postUrl.split(".");
        await Share.shareSingle({
          social: Share.Social.INSTAGRAM,
          url:
            `data:image/${urlArr[urlArr.length - 1]};base64,` +
            (await base64Converter(postUrl)),
          type: "image/*",
        });
      } else {
        const urlArr = postUrl.split(".");
        const cache = await RNFetchBlob.config({
          fileCache: true,
          appendExt: `${urlArr[urlArr.length - 1]}`,
        }).fetch("GET", postUrl, {});
        const gallery = await CameraRoll.save(cache.path(), "video");
        cache.flush();
        await Share.shareSingle({
          social: Share.Social.INSTAGRAM,
          url: gallery,
          type: "video/*",
        });
        // await Share.shareSingle({
        //   social: Share.Social.INSTAGRAM,
        //   url:
        //     `data:video/;base64,` +
        //     (await base64Converter(postUrl)),
        //   type: "video/*",
        // });
      }
    } else if (indexz === 1 && Platform.OS === "android") {
      if (contentInfo.typeContent === globals.CONTEST_TYPE.IMAGE_CONTEST) {
        const urlArr = postUrl.split(".");
        await Share.shareSingle({
          social: Share.Social.INSTAGRAM,
          url:
            `data:image/${urlArr[urlArr.length - 1]};base64,` +
            (await base64Converter(postUrl)),
          type: "image/*",
        });
      } else {
        const urlArr = postUrl.split(".");
        await Share.shareSingle({
          social: Share.Social.INSTAGRAM,
          url:
            `data:video/${urlArr[urlArr.length - 1]};base64,` +
            (await base64Converter(postUrl)),
          type: "video/*",
        });
      }

    }
    if (shareObj) {
      let url = "";
      const item = contentInfo;

      let postType = helpers.buildPostType(item.postType, item.userType || "");
      const middleUrl = find(SHARE_URL, (shr) => shr.type === postType);

      if (middleUrl) {
        url =
          POST_TYPES.CompanyCampaign === item.postType
            ? WEB_URL + middleUrl.url + item.slug
            : WEB_URL + middleUrl.url + item.id;
      }

      let realContent = shareObj.contentObj;
      if (
        indexz === 2 &&
        contentInfo.typeContent === globals.CONTEST_TYPE.IMAGE_CONTEST
      ) {
        const urlArr = postUrl.split(".");
        realContent = Object.assign(
          {},
          shareObj.contentObj,
          props.contentInfo.typeContent ===
            globals.CONTEST_TYPE.IMAGE_CONTEST
            ? {
                backgroundImage: `data:image/${
                  urlArr[urlArr.length - 1]
                };base64,${convertedMedia}`,
                attributionURL: url,
                appId: globals.CREDS.FACEBOOK_ID,
              }
            : {
                backgroundVideo: `data:video/${
                  urlArr[urlArr.length - 1]
                };base64,${convertedMedia}`,
                attributionURL: url,
                appId: globals.CREDS.FACEBOOK_ID,
              },
        );
      }
      // else if (indexz === 1 && Platform.OS === "ios") {
      //   realContent = Object.assign({}, shareObj.contentObj, {
      //     url: convertedMedia,
      //   });
      // }
      else {
        realContent = Object.assign({}, shareObj.contentObj, { url });
      }
      realContent =
        Platform.OS === "android" &&
        contentInfo.typeContent === globals.CONTEST_TYPE.IMAGE_CONTEST &&
        indexz === 2
          ? Object.assign({}, realContent, { forceDialog: true })
          : realContent;

      await Share.shareSingle(realContent);
    } else {
      ActionSheet.hide();
    }
  };
 const _showSocialShare = () => {
  

    let url = "";
    const item = contentInfo;

    let postType = helpers.buildPostType(item.postType, item.userType || "");
    const middleUrl = find(SHARE_URL, (shr) => shr.type === postType);

    if (middleUrl) {
      url =
        POST_TYPES.CompanyCampaign === item.postType
          ? WEB_URL + middleUrl.url + item.slug
          : WEB_URL + middleUrl.url + item.id;
    }

  };
  let postType = helpers.buildPostType(
    contentInfo.postType,
    contentInfo.userType || "",
  );
  const showSocialShare =
    contentInfo.isPrivate ||
    (contentInfo.isSocialShare && postType != POST_TYPES.Ad)
      ? true
      : true;

  const scaleAnimation = {
    transform: [{ scale: state.likeAnimationScale }],
  };
  return (
    <View>
        <View style={styles.wrap}>
          {!CompanyCampaignFullView ? (
            <View style={styles.item1}>
              <TouchableOpacity
                style={styles.icoWrap1}
                onPress={() => _openLikeList()}>
                <Animated.View style={[scaleAnimation]}>
                  <Image
                    allowFontScaling={false}
                    source={
                      props.likeFlag ? images.likeBtn : images.unlike
                    }
                    style={[
                      styles.likeIconBottom,
                      {
                        height: 20,
                        width: 20,
                        marginBottom: 3,
                        borderWidth: 0,
                        marginRight: 6,
                      },
                    ]}
                    resizeMode={"contain"}
                  />
                </Animated.View>
                <Text allowFontScaling={false} style={styles.icoTxt}>
                  {state.likeCount > 0 ? state.likeCount : 0}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.icoWrap1, { paddingLeft: 8 }]}
                onPress={() => _openComments()}>
                <Image
                  allowFontScaling={false}
                  source={images.comment}
                  style={[styles.commentIcon, { marginRight: 6 }]}
                  resizeMode={"contain"}
                />
                <Text allowFontScaling={false} style={styles.icoTxt}>
                  {state.commentCount > 0 ? state.commentCount : 0}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  paddingLeft: 8,
                  display: "flex",
                  flexDirection: "row",
                  // width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                  // marginBottom: Platform.OS == "ios" ? 6 : 0,
                }}>
                <Image
                  style={{
                    height: 22,
                    width: 22,
                    resizeMode: "contain",
                    tintColor: "grey",
                    marginRight: 6,
                  }}
                  source={require("../../../../assets/images/Icons/views.png")}
                />
                {/* {contentInfo.title &&
                contentInfo.typeContent.toLocaleLowerCase() !== "image" ? (
                  <Text
                    style={[
                      mainStyles.boldHeadTxt,
                      styles.titleWrap,
                      {
                        fontSize: 14,
                        lineHeight: 18,
                        paddingBottom: Platform.OS !== "ios" ? 4 : 0,
                      },
                    ]}
                  >
                    {contentInfo.title || ""}
                  </Text>
                ) : null} */}
                <Text
                  key={`viewcount_${contentInfo._id}`}
                  style={[
                    mainStyles.boldHeadTxt,
                    styles.headingLocation,
                    {
                      color: colors.heading2,
                      // paddingTop:
                      //   contentInfo.title &&
                      //   contentInfo.typeContent.toLocaleLowerCase() !== "image"
                      //     ? 1
                      //     : Platform.OS !== "ios"
                      //     ? 9
                      //     : 5,
                      fontWeight: "normal",
                      fontSize: 12,
                      alignSelf: "center",
                    },
                  ]}>
                  {props.viewCount || 0}
                </Text>
              </View>
            </View>
          ) : null}

          <View style={styles.item2}>
            <TouchableOpacity
              onPress={() => {
                RBSheetRef.current.open();
                // _showSocialShare()
              }}
              style={[
                styles.icoWrap2,
                { display: showSocialShare ? "flex" : "none" },
              ]}>
              <Image
                allowFontScaling={false}
                source={images.share_post}
                style={styles.shareIcon}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
            <View style={{ width: 10 }} />
            <TouchableOpacity
              style={styles.icoWrap2}
              onPress={() => _toggleMoreList()}>
              {/* <_Icon 
                                allowFontScaling={false}
                                type={'Ionicons'} 
                                icon={'ios-more'} 
                                color={colors.gray} 
                                size={25} 
                            /> */}
              <Image
                allowFontScaling={false}
                source={images.threeDots}
                style={styles.moreIcon}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <RBSheet
          ref={RBSheetRef}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={
            Platform.OS === "ios"
              ? globals.WINDOW_HEIGHT / 7
              : globals.WINDOW_HEIGHT / 5
          }
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            container: {
              backgroundColor: colors.black,
            },
            draggableIcon: {
              backgroundColor: colors.white,
            },
          }}>
          <ShareModal
            list={state.socialShareArr}
            shareCb={async (ind) => {
              if (ind === 2 && Platform.OS === "android") {
                const result = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                );

                if (result === "granted") {
                  share(ind);
                } else {
                  Alert.alert(
                    helpers.getLocale(
                      localize,
                      "errorModal",
                      "write_permission",
                    ),
                  );
                }
              } else {
                share(ind);
              }
              RBSheetRef.current.close();
            }}
            closeSheet={() => RBSheetRef.current.close()}
          />
        </RBSheet>

        <_Loading Ref={loaderRef} />
        <Modal
          transparent={true}
          animationType={"none"}
          visible={state.load}
          onRequestClose={() => {}}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-around",
              backgroundColor: "#rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
            }}>
            <ActivityIndicator
              size={"large"}
              animating={state.load}
              color="black"
            />
          </View>
        </Modal>
      </View>
  )
}

export default _PostMeta

const styles = StyleSheet.create({
  wrap: {
    // paddingHorizontal: 7.5,
    ...sty.fRow,
    // ...sty.jCenter,
    paddingTop: 6,
    paddingBottom: 12,
    // marginBottom: 5,
    // borderLeftWidth: 2.5,
    // borderRightWidth: 2.5,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
    // borderRadius: 10,
    // borderWidth: 0.3
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    marginTop: 5,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    // backgroundColor: "white",
    // shadowOffset: { height: 5, width: 2 },
    // shadowOpacity: 0.15,
    paddingHorizontal: 15,
  },
  item1: {
    flex: 1,
    ...sty.fRow,
  },
  item2: {
    flex: 1,
    ...sty.fRow,
    ...sty.jEnd,
  },
  icoWrap1: {
    // flex: 1,
    ...sty.fRow,
    ...sty.aCenter,
    // minWidth: 50,
    height: 24,
  },
  icoWrap2: {
    ...sty.fRow,
    ...sty.aCenter,
    width: 28,
    height: 24,
    ...sty.aCenter,
    ...sty.fRow,
    ...sty.jEnd,
    // borderWidth: 1
  },
  icoTxt: {
    color: colors.black,
    paddingRight: 5,
    fontSize: 12,
    fontWeight: "bold",
    // borderWidth: 1
  },
  commentIcon: {
    height: 18,
    width: 18,
  },
  likeIcon: {
    height: 30,
    width: 30,
  },
  likeIconBottom: {
    height: 30,
    width: 30,
    marginBottom: 3,
  },
  shareIcon: {
    height: 20,
    width: 20,
  },
  moreIcon: {
    height: 20,
    width: 20,
  },
});