import React, { memo } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  Text,
  Modal,
  AppState,
  Animated,
  Slider,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setActiveVideo } from "../../../../redux/actions/VideoAction";
import { Input, Item, Toast } from "native-base";
import {
  globals,
  helpers,
  validators,
  colors,
  fonts,
  images,
  sty,
  localize,
  API,
} from "../../../../configs";
import {
  _Spacer,
  _Icon,
  _ListView,
  _B,
  _Button,
  _TapHandler,
  _MediaLoading,
} from "../../../custom";
import { mainLayoutHoc } from "../../../hoc";
import mainStyles from "../../../../assets/styles/MainStyles";
import styles from "./styles";
import { find, map, uniqBy } from "lodash";

import Orientation from "react-native-orientation";

//import Video from "react-native-video";
import Video from "react-native-video";
import {
  LongPressGestureHandler,
  TapGestureHandler,
  State,
} from "react-native-gesture-handler";
import Videox from "./videox";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../../configs/libs/globals";
import VideoComponent from "./VideoComponent";
import { useState,useRef,useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { setAppData } from "../../../../redux/actions/AppDataActions";
import { setOtherProfileNewsfeed } from "../../../../redux/actions/OtherProfileActions";
import { setHomeDataProp } from '../../../../redux/actions/HomeActions';
import { setProfileDataProp } from '../../../../redux/actions/ProfileAction';
import { setCampaignProp } from '../../../../redux/actions/CampaignsActions';
import { setParticipantListProp } from '../../../../redux/actions/CompanyParticipantListAction';
import { setParticipantWinners} from '../../../../redux/actions/WinnersActions'
import {setParticipantTop10List} from '../../../../redux/actions/ParticipantTop10ListAction'

const SCALES = [1.2, 0.8, 1];

const PostVideo=(props)=>{

        
        const { contentInfo, preview, contestUrl, viewableItems,customVideoStyles, } = props;
    

    const dispatch= useDispatch();
    const video=useSelector(state => state.video)
    const appData =useSelector(state => state.appData)
    const otherProfileNewsfeed= useSelector(state => state.otherProfile.otherProfileNewsfeed)
    const loginData = useSelector(state => state.loginData)
    const home = useSelector(state => state.home)
    const profile=useSelector(state => state.profile)
    const campaigns = useSelector(state => state.campaigns)
    const companyParticipant = useSelector(state => state.companyParticipant)
    const companyParticipantList = useSelector(state => state.companyParticipantList)
    const winnerParticipant = useSelector(state => state.winnerParticipant)
    const participantTop10List = useSelector(state => state.participantTop10List)
    const localize = useSelector(state => state.localize)

    const [state, setstate]=useState({
        videoModal: false,
        videoPaused: false,
        flag: true,
        currentTime: 0,
        curTime: 0,
        lastProgress: 0,
        playBtn: false,
        loadAgain: false,
        fullscreen: false,
        playTime: 0,
        duration: 0,
        vidDuration: 0,
        loaded: true,
        key: 1000,
        bufferVisible: true,
        videoBuffering: true,
        videoLoaded: false,
        errorView: false,
        mediaPortLoaded: false,
        loadAgain: false,
        likeAnimationScale: new Animated.Value(1),
        showLikeOverlay: false,
        like: false,
        videoOrientation: "landscape",
        // originalWidth : globals.WINDOW_WIDTH,
        videoProps: Object.assign({}, globals.DEFAULT_VIDEO_PROPS, {
          muted: props.autoVideo
            ? false
            : props.appData
            ? props.appData.muted
            : true,
          fullscreen: props.autoVideo ? true : false,
          paused: props.autoVideo ? false : true,
        }),
        videoData: null,
        videoProgress: {
          currentTime: 0,
          playableDuration: 0,
          seekableDuration: 0,
        },
        controlsPosition: new Animated.Value(1),
        thumbnail: props.preview
          ? null
          : props.contentInfo.mediaUrl
          ? props.contentInfo.thumbnailMediaUrl
          : "https://picsum.photos/700",
        videoX: false,
        muteVideo: false,
      })
    const focusListener = useRef(null);
    const focusListener2 = useRef(null);
    const blurSubscription = useRef(null);
    const sliderOffset = useRef(0);
    const componentId = useRef(null);
    const videoPlayFlag = useRef(false);
    const tempPauseFlag = useRef(false);
    const controllerLineWidth = useRef(0);
    const controlsTimeout = useRef(null);
    const isMounted=useRef(null)

    useEffect(async()=>{
   
        isMounted.current = true;
   
    focusListener.current = props.navigation.addListener("didFocus", () => {
      if (isMounted.current) {
        _setVideoControl("muted");
        setstate({ ...state,videoPaused: false,flag: true  });

      }
       
    });
    focusListener2.current = props.navigation.addListener("didBlur", () => {
      if (isMounted.current) {
        _setVideoControl("muted");
      setstate({ ...state,videoPaused: true,flag: true  });
      }
      })

      return ()=>{
        try {
            focusListener?.remove();
              focusListener2?.remove();
              isMounted.current=false
            } catch (e) {
              console.log(e)
            }
      }
    },[])

    // static getDerivedStateFromProps(nextProps, state) {
    //     if (nextProps.likeFlag !== state.like) {
    //       return {
    //         like: nextProps.likeFlag,
    //       };
    //     }
    
    //     if (nextProps.appData) {
    //       if (
    //         nextProps.appData.muted !== state.videoProps.muted &&
    //         !nextProps.autoVideo
    //       ) {
    //         return {
    //           videoProps: Object.assign({}, state.videoProps, {
    //             muted: nextProps.appData.muted,
    //           }),
    //         };
    //       }
    //     }
    
    //     return null;
    //   }
   const loadMedia = () => {
        setstate({
            ...state,
          loaded: true,
          mediaPortLoaded: true,
        });
      };
    const  _loadVideo = () => setstate({ ...state,loaded: true });
   const _toggleModal = (status) => {
        setstate({
            ...state,
          videoModal: status,
        });
      };
    const  _onVideoLoad = (data) => {
        

        setstate({
            ...state,
        vidDuration: data.duration,
          videoData: data,
          videoLoaded: true,
          videoX: true,
          videoOrientation:
            Platform.OS === "ios"
              ? data?.naturalSize?.height >= data?.naturalSize?.width
                ? "portrait"
                : "landscape"
              : data?.naturalSize?.orientation,
        });
      };
     const _setSliderProgress = (val) => {

        sliderOffset.current = val;
        if (state.videoProps.paused === false) {
          tempPauseFlag.current = false;
        }
      };
    const  _setSliderComplete = (val) => {
    
        sliderOffset.current = val;
    
        let seek = (state.videoData.duration / 100) * sliderOffset.current;
        video.seek(seek);
    
        if (tempPauseFlag.current === false) {
        }
      };
     const  pausVideo = (mute = false) => {
        let obj = { ...state.videoProps, paused: true };
        setstate({
            ...state,
          videoProps: obj,
        });
        mute ? dispatch(setAppData({ prop: "muted", value: true })) : null;
      };
      const startVideo = () => {
        globals.setUserData("activeVideoPost", {
          id: componentId,
          component: self,
        });
    
        let obj = { ...state.videoProps, paused: false };
        setstate({
            ...state,
          videoProps: obj,
        });
      };
  const _toggleErrorView = (err) => setstate({ ...state,errorView: true });

  const _setVideoControl = (prop, flag) => {

    if (prop == "paused") {
      globals.setUserData("activeVideoPost", {
        id: componentId,
        component: self,
      });
    }

    if (
      !props.preview &&
      prop === "paused" &&
      state.videoProps.paused === true
    ) {
      let activeVideoPost = globals.getUserData("activeVideoPost");

      if (activeVideoPost !== null) {
        if (activeVideoPost.id !== componentId) {
          activeVideoPost.component.pausVideo();
        }
      }
      globals.setUserData("activeVideoPost", {
        id: componentId,
        component: self,
      });
    }

    let obj = {
      ...state.videoProps,
      [prop]: flag !== undefined ? flag : !state.videoProps[prop],
    };

    setstate(
      {
          ...state,
        videoProps: obj,
      },
      () => {
        if (state.videoData !== null) {
          if (
            state.videoData.duration.toFixed(0) ===
              state.videoProgress.currentTime.toFixed(0) &&
            prop === "paused" &&
            state.videoProps[prop] === false
          ) {
            video.seek(0);
          }
        }
      },
    );
    // console.log('kkf', props.appData.muted);

    if (prop == "muted" && props.setAppData) {
      dispatch(setAppData({
        prop: "muted",
        value: !appData.muted,
      }));
    }
  };
 const _VideoProgress = (data) => {
    let time = state.vidDuration - Math.round(data.currentTime);
    setstate({...state, playTime: data.currentTime });
    setstate({
        ...state,
      currentTime: time,
    });
   if (state.videoData === null) return;

   if (data.currentTime === 0 || data.currentTime <= 1) {
     globals.setUserData("activeVideoPost", {
       id: componentId,
       component: self,
     });
   }

 };
 const _onVideoEnd = (data) => {
    // console.log('VidEnd', data);
    // video.seek(0);
    // pausVideo()
    // _setVideoControl("paused"); // COMMENTED BY PRIYANK< AS THESE WERE CAUSING THE VIDEOPAUSE EVEN IF THEY WERE SUPPOSED TO BE LOOPING
  };

 const _renderPostVideo = () => {
    
    const { videoProps, videoLoaded, videoData, muteVideo } = state;

    const mediaUrl = preview
      ? props.url
      : contestUrl
      ? contentInfo.contestUrl.trim()
      : contentInfo.mediaUrl.trim();
    if (!mediaUrl) {
      _renderErrorView();
      return;
    }

     let videosRef = globals.getUserData('videosRef');
  

    return (
      <_TapHandler
        singleTap={() => {
          setstate({...state, playBtn: true,videoPaused: !state.videoPaused });
          setTimeout(() => setstate({ ...state,playBtn: false }), 1500);
        }}
        doubleTap={() => (preview ? null : _likeToggle())}>
        <View
          style={{
           
            backgroundColor: "black",
          }}
      
        >
         
          {!videoLoaded ? (
            <View
              style={[
                styles.videoLoadOverlay,
                contentInfo &&
                contentInfo.videoHeight &&
                contentInfo.videoHeight >= contentInfo.videoWidth
                  ? { height: globals.WINDOW_WIDTH }
                  : {},
                {
                  backgroundColor: "rgba(0,0,0,0.1)",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}>
              <ActivityIndicator
                size={"large"}
                color={"gray"}
                animating={!videoLoaded}
              />
            </View>
          ) : null}
    <VideoComponent
            mediaUrl={mediaUrl}
            style={
              customVideoStyles
                ? { height: "100%", borderRadius: 10 }
                : state.videoOrientation == "landscape"
                ? [styles.video, { height: "100%" }]
                : {
                    width: "100%",
                    height: "100%",
                  }
            }
            fullscreen={
              preview && !props.autoVideo ? false : videoProps.fullscreen
            }
            poster={state.thumbnail}
            // paused={
            //   !state.videoPaused &&
            //   props.contentInfo.id == props.video.activeVideoId
            //     ? false
            //     : true
            // }
            _onVideoEnd={(data)=>_onVideoEnd(data)}
            _VideoProgress={(data) => _VideoProgress(data)}
            _onVideoLoad={(data) => _onVideoLoad(data)}
            muted={customVideoStyles ? false : videoProps.muted}
          />
        
          {!customVideoStyles && (
            <View
              style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                position: "absolute",
                bottom: "5%",
                left: "3%",
                backgroundColor: colors.grayDark,
              }}>
              <TouchableOpacity
                onPress={() => {
                  _setVideoControl("muted");
                }}
                style={{ ...sty.flex1, ...sty.jCenter, ...sty.aCenter }}>
                <_Icon
                  type={"MaterialIcons"}
                  icon={videoProps.muted ? "volume-off" : "volume-up"}
                  size={15}
                  color={"#fff"}
                />
              </TouchableOpacity>
            </View>
          )}
          {state.videoLoaded ? (
            <View
              style={{
                height: 24,
                width: 30,
                borderRadius: 12,
                position: "absolute",
                top: "5%",
                right: "3%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.grayDark,
              }}>
              <Text style={{ color: "#fff", fontSize: 10 }}>
                {parseInt(state.currentTime) < 10
                  ? "0:0" + parseInt(state.currentTime)
                  : parseInt(state.currentTime) < 60
                  ? "0:" + parseInt(state.currentTime)
                  : parseInt(state.currentTime) >= 60
                  ? parseInt(parseInt(state.currentTime) / 60) +
                    ":" +
                    (parseInt(state.currentTime) -
                      parseInt(parseInt(state.currentTime) / 60) * 60)
                  : null}
              </Text>
            </View>
          ) : null}

          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              position: "absolute",
              bottom: "5%",
              right: "3%",
              backgroundColor: colors.grayDark,
            }}>
            <TouchableOpacity
              onPress={() => {
                //_setVideoControl("muted");
                setstate({ ...state,videoPaused: true });
                props.navigation.navigate("FullScreenVideo", {
                  mediaUrl: mediaUrl,
                  playTime: state.playTime,
                });
              }}
              style={{ ...sty.flex1, ...sty.jCenter, ...sty.aCenter }}>
              <_Icon
                type={"MaterialIcons"}
                icon={"fullscreen"}
                size={20}
                color={"#fff"}
              />
            </TouchableOpacity>
          </View>
          {state.playBtn ? (
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                position: "absolute",
                top: "50%",
                alignSelf: "center",
                backgroundColor: colors.grayDark,
              }}>
              <TouchableOpacity
                onPress={() => {
                  //_setVideoControl("muted");
                }}
                style={{ ...sty.flex1, ...sty.jCenter, ...sty.aCenter }}>
                <_Icon
                  type={"MaterialIcons"}
                  icon={state.videoPaused ? "pause" : "play-arrow"}
                  size={24}
                  color={"#fff"}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </_TapHandler>
    );
  };
 const  _renderErrorView = () => {
    return (
      <TouchableOpacity onPress={() => this.setstate({ ...state,loadAgain: true })}>
        <View
          style={[
            styles.videoError,
            this.state.videoOrientation == "landscape"
              ? {}
              : {
                  height:
                    state.videoData.naturalSize.height >= globals.WINDOW_WIDTH
                      ? globals.WINDOW_WIDTH
                      : state.videoData.naturalSize.height,
                },
          ]}>
          <_Icon
            type={"MaterialCommunityIcons"}
            icon={"reload"}
            size={40}
            color={"#fff"}
          />
        </View>
      </TouchableOpacity>
    );
  };
 const otherProfileManipulator = (data) => {
  
    
    dispatch(setOtherProfileNewsfeed({
      id: data.createdBy,
      arr: map(otherProfileNewsfeed[data.createdBy].arr, (dt) =>
        dt._id == data._id
          ? Object.assign({}, dt, {
              likeCount: data.likeCount,
              isSelfLike: find(data.likes, (lk) => lk.createdBy == loginData.id)
                ? true
                : false,
              likes: data.likes,
            })
          : dt,
      ),
      pagination: otherProfileNewsfeed[data.createdBy].pagination || {},
    }));
  }; 
 function tabsLikeAdder(campId, val, action, data) {
   
  
    if (val && val[campId]) {
      action({
        id: campId,
        arr: map(val[campId].arr, (cmp) => {
          if (cmp.id == contentInfo.id) {
            return Object.assign({}, cmp, {
              likeCount: data.likeCount,
              isSelfLike: find(data.likes, (lk) => lk.createdBy == loginData.id)
                ? true
                : false,
              likes: data.likes,
            });
          } else {
            return cmp;
          }
        }),
        pagination: val[campId].pagination,
      });
    }
  }
  const _likeToggle = async () => {

    let cb = {
      success: (res) => {
        const { data } = res;
        let postType = helpers.getBackendPostType(
          data,
          data.postType,
          globals.POST_TYPES,
        );
       

        if (
          postType == globals.POST_TYPES.MediaPost ||
          postType == globals.POST_TYPES.Blog
        ) {
          find(home.news, (dt) => dt._id == data._id)
            ? dispatch(setHomeDataProp({
                prop: "news",
                arr: map(home.news, (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;
          find(profile.newsFeedList, (dt) => dt._id == data._id)
            ? dispatch(setProfileDataProp({
                prop: "newsFeedList",
                arr: map(profile.newsFeedList, (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;
          find(home.exploreList, (dt) => dt._id == data._id)
            ? dispatch(setHomeDataProp({
                prop: "exploreList",
                arr: map(home.exploreList, (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;
          console.log("hi", home.exploreList);
          find(home.explore, (dt) => dt._id == data._id)
            ?dispatch(setHomeDataProp({
                prop: "explore",
                arr: map(home.explore, (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;
          find(home.bestList, (dt) => dt._id == data._id)
            ? dispatch(setHomeDataProp({
                prop: "bestList",
                arr: map(home.bestList, (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;

          if (otherProfileNewsfeed && otherProfileNewsfeed[data.createdBy]) {
            otherProfileManipulator(data);
          }
        } else if (postType == globals.POST_TYPES.CompanyParticipantCampaign) {
          find(home.news, (dt) => dt._id == data._id)
            ? dispatch(setHomeDataProp({
                prop: "news",
                arr: map(home.news, (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;
          find(profile.newsFeedList, (dt) => dt._id == data._id)
            ? dispatch(setProfileDataProp({
                prop: "newsFeedList",
                arr: map(profile.newsFeedList, (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;
          find(home.exploreList, (dt) => dt._id == data._id)
            ? dispatch(setHomeDataProp({
                prop: "exploreList",
                arr: map(home.exploreList, (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;
          find(home.explore, (dt) => dt._id == data._id)
            ? dispatch(setHomeDataProp({
                prop: "explore",
                arr: map(home.explore, (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;
          find(home.bestList, (dt) => dt._id == data._id)
            ? setHomeDataProp({
                prop: "bestList",
                arr: map(home.bestList, (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              })
            : null;

          let campId = contentInfo.campaignId.id;

         
          tabsLikeAdder(
            campId,
            companyParticipantList,
            setParticipantListProp,
            data,
          );
          tabsLikeAdder(
            campId,
            winnerParticipant,
            setParticipantWinners,
            data,
          );
          tabsLikeAdder(
            campId,
            participantTop10List,
            setParticipantTop10List,
            data,
          );

        


          if (otherProfileNewsfeed && otherProfileNewsfeed[data.createdBy._id]) {
            otherProfileManipulator(data);
          }
        } else if (postType == "campaign") {
          find(home.news, (dt) => dt._id == data._id)
            ? dispatch(setHomeDataProp({
                prop: "news",
                arr: map(home.news, (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;
          find(profile.newsFeed, (dt) => dt._id == data._id)
            ? dispatch(setProfileDataProp({
                prop: "newsFeed",
                arr: map(profile.newsFeed, (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;
          // find(campaigns, dt => dt._id == data._id) ? setCampaignProp(map(campaigns, dt => dt._id == data._id ? Object.assign({}, dt, { likeCount: data.likeCount, isSelfLike: find(data.likes, lk => lk.createdBy == loginData.id) ? true : false, likes: data.likes }) : dt)) : null

          find(campaigns["apply"], (dt) => dt._id == data._id)
            ? dispatch(setCampaignProp({
                prop: "apply",
                arr: map(campaigns["apply"], (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;
          find(campaigns["finalist"], (dt) => dt._id == data._id)
            ? dispatch(setCampaignProp({
                prop: "finalist",
                arr: map(campaigns["finalist"], (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;
          find(campaigns["closed"], (dt) => dt._id == data._id)
            ?dispatch(setCampaignProp({
                prop: "closed",
                arr: map(campaigns["closed"], (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;
          find(campaigns["extra"], (dt) => dt._id == data._id)
            ? dispatch(setCampaignProp({
                prop: "extra",
                arr: map(campaigns["extra"], (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;
          find(campaigns["upcoming"], (dt) => dt._id == data._id)
            ? dispatch(setCampaignProp({
                prop: "upcoming",
                arr: map(campaigns["upcoming"], (dt) =>
                  dt._id == data._id
                    ? Object.assign({}, dt, {
                        likeCount: data.likeCount,
                        isSelfLike: find(
                          data.likes,
                          (lk) => lk.createdBy == loginData.id,
                        )
                          ? true
                          : false,
                        likes: data.likes,
                      })
                    : dt,
                ),
              }))
            : null;

          if (otherProfileNewsfeed && otherProfileNewsfeed[data.createdBy._id]) {
            otherProfileManipulator(data);
          }
        } 

        !appData.recentLiked &&
          dispatch(setAppData({ prop: "recentLiked", value: true }));
      },
      error: (err) => {},
    };
    let header = helpers.buildHeader({ authorization: loginData.token });
    let postType = helpers.getBackendPostType(
      contentInfo,
      contentInfo.postType,
      globals.POST_TYPES,
    );
    if (postType === "blog") postType = "media";
    let data = {
      id: contentInfo._id,
      type: postType,
    };

    if (await helpers.connectionChecker()) {
      props.likeCountSet();
      API.likesPostApi({}, cb, header, data);
      setstate(
        {
            ...state,
          showLikeOverlay: true,
        },
        () => {
          pulseAnimation(0);
        },
      );
    } else {
      Toast.show({
        text: helpers.getLocale(
          localize,
          "internet",
          "Please_connect_to_the_Internet",
        ),
      });
    }
  };

 const pulseAnimation = (index) => {

    Animated.parallel([
      Animated.timing(state.likeAnimationScale, {
        toValue: SCALES[index],
        duration: 200,
      }),
    ]).start(() => {
      SCALES[index + 1]
        ? pulseAnimation(index + 1)
        : setstate({...state, showLikeOverlay: false });
    });
  };
 const likeOverlay = () => {
  

    if (!state.showLikeOverlay) return;

    const scaleAnimation = {
      transform: [{ scale: state.likeAnimationScale }],
    };

    return (
      <View style={styles.videoLikeOverlay}>
        <Animated.View style={[scaleAnimation]}>
          <Image
            source={images.likeBtn}
            style={styles.likeIcon}
            resizeMode={"contain"}
          />
        </Animated.View>
      </View>
    );
  };
  let vidHeight = globals.WINDOW_WIDTH / (16 / 9);
    vidHeight = !state.videoLoaded
      ? contentInfo &&
        contentInfo.videoHeight &&
        contentInfo.videoHeight >= contentInfo.videoWidth
        ? globals.WINDOW_WIDTH
        : globals.WINDOW_WIDTH
      : state.videoData.naturalSize.height >= state.videoData.naturalSize.width
      ? globals.WINDOW_WIDTH
      : globals.WINDOW_WIDTH/ (16/9) 

    return(
        <View
        style={{
          width: "100%",
          height: customVideoStyles ? "100%" : vidHeight,
          borderRadius: customVideoStyles ? 10 : 0,
        }}>
      
        {_renderPostVideo()}
        {likeOverlay()}
      </View>
    )
}
export default memo(PostVideo)