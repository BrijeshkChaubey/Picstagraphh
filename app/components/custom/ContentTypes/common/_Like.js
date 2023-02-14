import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  Text,
  Animated,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
import { _Spacer, _Icon, _ListView, _B, _Button } from "../../../custom";
import { find, map,uniqBy } from "lodash";
import { mainLayoutHoc } from "../../../hoc";
import mainStyles from "../../../../assets/styles/MainStyles";

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

// import SvgUri from 'react-native-svg-uri';

const SCALES = [1.2, 0.8, 1];

const { POST_TYPES } = globals;




const _Like = (props) => {

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

    const [state, setstate]= useState({
        like: props.likeFlag,
        likeAnimationScale: new Animated.Value(1),
        loading:false
      })

    const  otherProfileManipulator = (data) => {
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

       const _toggleLike = async () => {

        let cb = {
          success: (res) => {
            console.log("urllike", res.data);
            const { data } = res;
            let postType = helpers.getBackendPostType(
              data,
              data.postType,
              globals.POST_TYPES,
            );
           pulseAnimation(0)

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
              find(home.bestList, (dt) => dt._id == data._id)
                ?dispatch(setHomeDataProp({
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
            } 
            setstate({...state,loading:false});
            !appData.recentLiked &&
              dispatch(setAppData({ prop: "recentLiked", value: true }));
          },
          error: (err) => {setstate({...state,loading:false});},
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
          setstate({...state,loading:true});
          API.likesPostApi({}, cb, header, data);
          
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
        var { likeAnimationScale } = this.state;
        Animated.parallel([
          Animated.timing(likeAnimationScale, {
            toValue: SCALES[index],
            duration: 200,
          }),
        ]).start(() => (SCALES[index + 1] ? pulseAnimation(index + 1) : null));
      };
      const scaleAnimation = {
        transform: [{ scale: state.likeAnimationScale }],
      };

  return (
    <View style={{ width: 50, ...sty.aEnd, ...sty.jCenter }}>
        <Animated.View style={[scaleAnimation]}>
          <TouchableOpacity disabled={state.loading} onPress={() => _toggleLike()}>
            <Image
              source={state.like ? images.likeBtn : images.unlike}
              style={styles.likeIcon}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
  )
}

export default _Like;

const styles = StyleSheet.create({
    likeIcon: {
      height: 26,
      width: 26,
      marginBottom: 7,
      marginRight: 5,
    },
  });
