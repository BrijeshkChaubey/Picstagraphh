import React,{memo} from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    Text,
    Animated,
    Modal,
    Dimensions,
  } from "react-native";
  import { Input, Toast } from "native-base";
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
    Spacer,
    Icon,
    ListView,
    B,
    Button,
    _TapHandler,
    _Icon,
    _MediaLoading,
  } from "../../../custom";
  import { mainLayoutHoc } from "../../../hoc";
  import mainStyles from "../../../../assets/styles/MainStyles";
  import styles from "./styles";
  import { find, map, uniqBy } from "lodash";
  import { PinchGestureHandler, State } from "react-native-gesture-handler";
  import { black, gray } from "../../../../configs/utils/colors";
  import AutoHeightImage from "react-native-auto-height-image";
  import FastImage from "react-native-fast-image";
  import _AutoHeightImage from "./_AutoHeightImage";
  import { setOtherProfileNewsfeed } from '../../../../redux/actions/OtherProfileActions';
  import { setAppData } from '../../../../redux/actions/AppDataActions';

  import { useState,useEffect } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { setHomeDataProp } from '../../../../redux/actions/HomeActions';
import { setProfileDataProp } from '../../../../redux/actions/ProfileAction';
import { setCampaignProp } from '../../../../redux/actions/CampaignsActions';
import { setParticipantListProp } from '../../../../redux/actions/CompanyParticipantListAction';
import { setParticipantWinners} from '../../../../redux/actions/WinnersActions'
import {setParticipantTop10List} from '../../../../redux/actions/ParticipantTop10ListAction'

  const deviceWidth = Dimensions.get("window").width;
  
  const SCALES = [1.2, 0.8, 1];

const _ImageWrap = (props) => {

    const dispatch = useDispatch();
    const { contentInfo, fullViewNav } = props;
    const otherProfileNewsfeed= useSelector(state => state.otherProfile.otherProfileNewsfeed)
    const loginData = useSelector(state => state.loginData)
    const appData = useSelector(state => state.appData)
    const home = useSelector(state => state.home)
    const profile=useSelector(state => state.profile)
    const campaigns = useSelector(state => state.campaigns)
    const companyParticipant = useSelector(state => state.companyParticipant)
    const companyParticipantList = useSelector(state => state.companyParticipantList)
    const winnerParticipant = useSelector(state => state.winnerParticipant)
    const participantTop10List = useSelector(state => state.participantTop10List)
    const localize = useSelector(state => state.localize)

    let ismounted=false

    const [state,setstate]=useState({
        opacity: new Animated.Value(0),
        loadingImage: false,
        imageModal: false,
        errorView: false,
        loaded: false,
        mediaPortLoaded: false,
        likeAnimationScale: new Animated.Value(1),
        showLikeOverlay: false,
        like: props.contentInfo.isSelfLike,
        calcImgHeight: 300,
        aspectRatio: [1, 1],
        apectRatio:
          props.contentInfo.postType === globals.POST_TYPES.Blog
            ? [16, 9]
            : [1, 1],
        loadAgain: false,
        showOriginal: true,
        pinchActive: false,
        
      })
      let baseScale = new Animated.Value(1);
    let pinchScale = new Animated.Value(1);
    let scale = Animated.multiply(baseScale, pinchScale);
    let lastScale = 1;
    let onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: pinchScale } }],
      { useNativeDriver: true },
    );
 useEffect(() => {
    ismounted=true
 },[])

//  const loadMedia = () => {
//     if (contentInfo.listMediaUrl) {
//       Image.getSize(
//         contentInfo.listMediaUrl,
//         (width, height) => {
//           if (width && height) {
//             setstate({
//                 ...state,
//               apectRatio: helpers.aspect_ratio(width / height, 50),
//               loaded: true,
//               mediaPortLoaded: true,
//             });
//           } else {
//             setstate({
//                 ...state,
//               errorView: true,
//               loaded: true,
//               mediaPortLoaded: true,
//             });
//           }
//         },
//         (err) => {
//           // setState({loadAgain : true})
//         },
//       );
//     } else {
//       setstate({
//           ...state,
//         loaded: true,
//         mediaPortLoaded: true,
//       });
//     }
//   };
//  const _toggleModal = () => setstate({ ...state,imageModal: !state.imageModal });

// const  _imageModal = () => {


//     if (!ismounted) return;
//     return (
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={state.imageModal}
//         onRequestClose={() => {}}>
//         <View style={styles.imgModalWrap}>
//           <TouchableOpacity
//             onPress={() => _toggleModal()}
//             style={styles.imgClose}>
//             <_Icon
//               type={"Ionicons"}
//               icon={"ios-close-outline"}
//               color={"#fff"}
//               size={30}
//             />
//           </TouchableOpacity>
//           <Image
//             source={{ uri: contentInfo.listMediaUrl }}
//             style={styles.imgModal}
//           />
//         </View>
//       </Modal>
//     );
//   };
//  const onPinchHandlerStateChange = (event) => {
//     if (event.nativeEvent.state === State.ACTIVE && !state.pinchActive) {
//       setstate({ ...state,pinchActive: true });
//     }

//     setstate({ ...state, showOriginal: false });
//     if (event.nativeEvent.oldState === State.ACTIVE) {
//       lastScale *= event.nativeEvent.scale;
//       baseScale.setValue(lastScale);
//       pinchScale.setValue(1);
//     }

//     if (event.nativeEvent.state === State.END) {
//       setstate({...state, showOriginal: true, pinchActive: false });

//       baseScale = new Animated.Value(1);
//       pinchScale = new Animated.Value(1);
//       scale = Animated.multiply(baseScale, pinchScale);
//       lastScale = 1;
//       onPinchGestureEvent = Animated.event(
//         [{ nativeEvent: { scale: pinchScale } }],
//         { useNativeDriver: true },
//       );
//     }
//   };

//   function renderImage() {

//     const windowWidth = Dimensions.get("window").width;
//     const windowHeight = Dimensions.get("window").height;
//     return (
//       <AutoHeightImage
//         width={windowWidth}
//         maxHeight={windowHeight}
//         // progressiveRenderingEnabled={true}
//         source={{
//           uri: contentInfo.fileName.includes("https")
//             ? contentInfo.fileName
//             : contentInfo.listMediaUrl,
//         }}
       
//       />
//     );
//   }
//  function onLoad() {
//     Animated.timing(state.opacity, {
//       toValue: 0,
//       duration: 250,
//     }).start();
//   }

  const _renderImageView = () => {

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    // console.log("Media URl", contentInfo.fileName.includes("https"));

    // if (!loaded) return;
    // console.log("AspImg", apectRatio);

    return (
      // <View>
      //   <Text>renderImageView</Text>
      // </View>
      <_TapHandler
        style={{ width: "100%", height: "auto" }}
        singleTap={() => {
          if (!props.companyCampaign && fullViewNav) {
            contentInfo.navigateToFullView(contentInfo);
          }
        }}
        doubleTap={() =>
          props.companyCampaign || props.navigateToFullView
            ? null
            : _likeToggle()
        }
        >
        <Animated.View style={{ width: "100%", height: "auto" }}>
          <PinchGestureHandler
            // onGestureEvent={onPinchGestureEvent}
            // onHandlerStateChange={onPinchHandlerStateChange}
            >
            {contentInfo.listMediaUrl ? (
              <Animated.View style={{ flex: 1 }} collapsable={false}>
                
                <View style={{ width: "100%", minHeight: 150 }}>
                  
                  <_AutoHeightImage contentInfo={contentInfo} />
                  
                </View>
              </Animated.View>
            ) : (
              null
              // _renderErrorView()
            )}
          </PinchGestureHandler>
        </Animated.View>
      </_TapHandler>
    );
  };

//   const _renderErrorView = () => {
//     return (
//       <View style={styles.imgError}>
//         <_Icon
//           type={"MaterialIcons"}
//           icon={"broken-image"}
//           size={40}
//           color={"#fff"}
//         />
//       </View>
//     );
//   };
//   const _renderLoader = () => {

//     if (state.loaded) return;

//     return (
//       <View style={styles.imgLoading}>
//         <_Icon
//           type={"Ionicons"}
//           icon={"ios-image-outline"}
//           size={40}
//           color={"#fff"}
//         />
//       </View>
//     );
//   };
  const otherProfileManipulator = (data) => {
   
    try {
      let newData = map(otherProfileNewsfeed[data.createdBy].arr, (dt) =>
        dt._id == data._id
          ? Object.assign({}, dt, {
              likeCount: data.likeCount,
              isSelfLike: find(data.likes, (lk) => lk.createdBy == loginData.id)
                ? true
                : false,
              likes: data.likes,
            })
          : dt,
      );

     dispatch(setOtherProfileNewsfeed({
        id: data.createdBy,
        arr: newData,
        pagination: otherProfileNewsfeed[data.createdBy].pagination || {},
      }));
    } catch (e) {
      console.log("urlerr", e);
    }
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
        console.log("urllike", res.data);
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

          let campId = contentInfo.campaignId.id;

          // if (companyParticipant[campId]?.arr) {
          //   let test = uniqBy(companyParticipant[campId]?.arr, (cp) => cp._id);
          //   test.map((cmp, index) => {
          //     if (cmp._id == data._id) {
          //       test[index].likeCount = data.likeCount;
          //       (test[index].isSelfLike = find(
          //         data.likes,
          //         (lk) => lk.createdBy == loginData.id,
          //       )
          //         ? true
          //         : false),
          //         (test[index].likes = data.likes);
          //     }
          //   });

          //   setParticipantProp({
          //     id: campId,
          //     arr: test,
          //     pagination: companyParticipant[campId].pagination,
          //   });
          // }
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

          // if (companyParticipant && companyParticipant[campId]) {
          //     setParticipantProp({
          //         id: campId,
          //         arr: map(companyParticipant[campId].arr, cmp => {

          //             if (cmp.id == contentInfo.id) {
          //                 return Object.assign({}, cmp, {
          //                     likeCount: data.likeCount,
          //                     isSelfLike: find(data.likes, lk => lk.createdBy == loginData.id) ? true : false,
          //                     likes: data.likes
          //                 })
          //             }
          //             else {
          //                 return cmp
          //             }
          //         }),
          //         pagination: companyParticipant[campId].pagination
          //     })
          // }
          // find(home.participant, dt => dt._id == data._id) ? setHomeDataProp({ prop: 'participant', arr: map(home.participant, dt => dt._id == data._id ? Object.assign({}, dt, { likeCount: data.likeCount, isSelfLike: find(data.likes, lk => lk.createdBy == loginData.id) ? true : false, likes: data.likes }) : dt) }) : null

          if (otherProfileNewsfeed && otherProfileNewsfeed[data.createdBy]) {
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

          if (otherProfileNewsfeed && otherProfileNewsfeed[data.createdBy]) {
            otherProfileManipulator(data);
          }
        } else if (postType == globals.POST_TYPES.Blog) {
          find(home.news, (dt) => dt._id == data._id)
            ?dispatch(setHomeDataProp({
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
        : setstate({ ...state,showLikeOverlay: false });
    });
  };
  const renderLikeOverlay = () => {
    if (!state.showLikeOverlay) return;

    const scaleAnimation = {
      transform: [{ scale: state.likeAnimationScale }],
    };

    return (
      <View style={styles.imgLikeOverlay}>
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

  return (
    <View 
    style={{ flex: 1, zIndex: state.pinchActive ? 100 : 1 }}
    >
      {/* <Text>ImageWrap</Text> */}
         {_renderImageView()}
        {renderLikeOverlay()} 
      </View>
  )
}

export default memo(_ImageWrap)