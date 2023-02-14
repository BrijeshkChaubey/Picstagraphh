import AsyncStorage from '@react-native-async-storage/async-storage';
import { helpers, API, globals } from "../../../configs";
import { map, find } from "lodash";

export const initiatePostView = async (refs, postsArr, { ...props }) => {
  let token = await AsyncStorage.getItem("token");
  let header = helpers.buildHeader({ authorization: token });
  let viewedPostsArr = globals.getUserData("viewedPostsArr");
  let postMediaTobeLoaded = globals.getUserData("postMediaTobeLoaded");

  refs.map((postx) => {
    const item = postx.item;
    const key = postx.item._id;
    let isViewed = false;
    
    if (item.isDelete) return;

    //isViewed = item.isViewed ? true : false;

    if (isViewed === false) {
      isViewed = viewedPostsArr.includes(key) ? true : false;
    }

    let typeCon = helpers.getBackendPostType(
      item,
      item.postType,
      globals.POST_TYPES
    );
    
    if (
       isViewed === false &&
      typeCon != "campaign" &&
      !helpers._isEmptyObject(item)
    ) {
      viewedPostsArr.push(key);
      globals.setUserData("viewedPostsArr", viewedPostsArr);

      let cb = {
        success: (res) => {
          let { data } = res;
          console.log('url',data)
          data = Object.assign({}, data, { isViewed: true });
          if (data && data.typeContent && data.viewCount) {
            let postType = helpers.getBackendPostType(
              data,
              data.postType,
              globals.POST_TYPES
            );
            const {
              home,
              profile,
              campaigns,
              setHomeDataProp,
              setProfileDataProp,
              setParticipantProp,
              companyParticipant,
              otherProfileNewsfeed,
              setOtherProfileNewsfeed,
            } = props;

            if (postType == globals.POST_TYPES.MediaPost) {
              let mediaViewChange = globals.getUserData("med" + data._id);

              if (mediaViewChange) {
                mediaViewChange.updateViews(data.viewCount);
              }

              find(home.news, (dt) => dt._id == data._id)
                ? setHomeDataProp({
                    prop: "news",
                    arr: map(home.news, (dt) =>
                      dt._id == data._id
                        ? Object.assign({}, dt, {
                            isViewed: true,
                            viewCount: data.viewCount,
                          })
                        : dt
                    ),
                  })
                : null;
              find(profile.newsFeedList, (dt) => dt._id == data._id)
                ? setProfileDataProp({
                    prop: "newsFeedList",
                    arr: map(profile.newsFeedList, (dt) =>
                      dt._id == data._id
                        ? Object.assign({}, dt, {
                            isViewed: true,
                            viewCount: data.viewCount,
                          })
                        : dt
                    ),
                  })
                : null;
              find(home.exploreList, (dt) => dt._id == data._id)
                ? setHomeDataProp({
                    prop: "exploreList",
                    arr: map(home.exploreList, (dt) =>
                      dt._id == data._id
                        ? Object.assign({}, dt, {
                            isViewed: true,
                            viewCount: data.viewCount,
                          })
                        : dt
                    ),
                  })
                : null;
              find(home.bestList, (dt) => dt._id == data._id)
                ? setHomeDataProp({
                  prop: "bestList",
                  arr: map(home.bestList, (dt) =>
                    dt._id == data._id
                      ? Object.assign({}, dt, {
                        isViewed: true,
                        viewCount: data.viewCount,
                      })
                      : dt
                  ),
                })
                : null;

              if (
                otherProfileNewsfeed &&
                otherProfileNewsfeed[data.createdBy._id]
              ) {
                setOtherProfileNewsfeed({
                  id: data.createdBy._id,
                  arr: map(otherProfileNewsfeed[data.createdBy._id].arr, (dt) =>
                    dt._id == data._id
                      ? Object.assign({}, dt, {
                          isViewed: true,
                          viewCount: data.viewCount,
                        })
                      : dt
                  ),
                  pagination:
                    otherProfileNewsfeed[data.createdBy._id].pagination || {},
                });
              }
            } else if (
              postType == globals.POST_TYPES.CompanyParticipantCampaign
            ) {
              let participantViewChange = globals.getUserData(
                "part" + data._id
              );

              if (participantViewChange) {
                participantViewChange.updateViews(data.viewCount);
              }

              find(home.participant, (dt) => dt._id == data._id)
                ? setHomeDataProp({
                    prop: "participant",
                    arr: map(home.participant, (dt) =>
                      dt._id == data._id
                        ? Object.assign({}, dt, {
                            isViewed: true,
                            viewCount: data.viewCount,
                          })
                        : dt
                    ),
                  })
                : null;
              find(home.news, (dt) => dt._id == data._id)
                ? setHomeDataProp({
                    prop: "news",
                    arr: map(home.news, (dt) =>
                      dt._id == data._id
                        ? Object.assign({}, dt, {
                            isViewed: true,
                            viewCount: data.viewCount,
                          })
                        : dt
                    ),
                  })
                : null;
              find(profile.newsFeedList, (dt) => dt._id == data._id)
                ? setProfileDataProp({
                    prop: "newsFeedList",
                    arr: map(profile.newsFeedList, (dt) =>
                      dt._id == data._id
                        ? Object.assign({}, dt, {
                            isViewed: true,
                            viewCount: data.viewCount,
                          })
                        : dt
                    ),
                  })
                : null;

              if (
                companyParticipant &&
                companyParticipant[data.campaignId._id]
              ) {
                setParticipantProp &&
                  setParticipantProp({
                    id: data.campaignId,
                    arr: map(
                      companyParticipant[data.campaignId].arr,
                      (cmp) => {
                        if (cmp.id == data.id) {
                          return Object.assign({}, cmp, {
                            isViewed: true,
                            viewCount: data.viewCount,
                          });
                        } else {
                          return cmp;
                        }
                      }
                    ),
                    pagination:
                      companyParticipant[data.campaignId.id].pagination,
                  });
              }

              if (
                otherProfileNewsfeed &&
                otherProfileNewsfeed[data.createdBy._id]
              ) {
                setOtherProfileNewsfeed({
                  id: data.createdBy._id,
                  arr: map(otherProfileNewsfeed[data.createdBy._id].arr, (dt) =>
                    dt._id == data._id
                      ? Object.assign({}, dt, {
                          isViewed: true,
                          viewCount: data.viewCount,
                        })
                      : dt
                  ),
                  pagination:
                    otherProfileNewsfeed[data.createdBy._id].pagination || {},
                });
              }
            } else if (postType == globals.POST_TYPES.Blog) {
              let blogViewChange = globals.getUserData("blog" + data._id);

              if (blogViewChange) {
                blogViewChange.updateViews(data.viewCount);
              }

              find(home.news, (dt) => dt._id == data._id)
                ? setHomeDataProp({
                    prop: "news",
                    arr: map(home.news, (dt) =>
                      dt._id == data._id
                        ? Object.assign({}, dt, {
                            isViewed: true,
                            viewCount: data.viewCount,
                          })
                        : dt
                    ),
                  })
                : null;
              find(profile.newsFeedList, (dt) => dt._id == data._id)
                ? setProfileDataProp({
                    prop: "newsFeedList",
                    arr: map(profile.newsFeedList, (dt) =>
                      dt._id == data._id
                        ? Object.assign({}, dt, {
                            isViewed: true,
                            viewCount: data.viewCount,
                          })
                        : dt
                    ),
                  })
                : null;

              if (
                otherProfileNewsfeed &&
                otherProfileNewsfeed[data.createdBy._id]
              ) {
                setOtherProfileNewsfeed({
                  id: data.createdBy._id,
                  arr: map(otherProfileNewsfeed[data.createdBy._id].arr, (dt) =>
                    dt._id == data._id
                      ? Object.assign({}, dt, {
                          isViewed: true,
                          viewCount: data.viewCount,
                        })
                      : dt
                  ),
                  pagination:
                    otherProfileNewsfeed[data.createdBy._id].pagination || {},
                });
              }
            }
          }
        },
          
        error: (err) => { console.log("url", err);},
        complete: () => {},
      };
      let typeContent = helpers.getBackendPostType(
        item,
        item.postType,
        globals.POST_TYPES
      );
      if (typeContent == "blog") {
        typeContent = "media";
      }
      API.postViews({}, cb, header, { type: typeContent, id: key });
    }
  });

  // for (let key in refs) {
  //     if (refs.hasOwnProperty(key) && refs[key]) {
  //         refs[key].measure((x, y, width, height, pageX, pageY) => {

  //             //This if to load media
  //             if(postMediaTobeLoaded[key]) {
  //                 if(pageY<globals.WINDOW_HEIGHT+50 && pageY>0) {
  //                     postMediaTobeLoaded[key].loadMedia();
  //                     postMediaTobeLoaded[key] = null;
  //                     globals.setUserData('postMediaTobeLoaded', postMediaTobeLoaded);
  //                 }
  //             }

  //             let activePost = {};
  //             console.log('PageY', pageY);
  //             if(pageY<150 && pageY>-10) {

  //                 let isViewed = false;
  //                 postsArr.map((item) => {
  //                     if(item._id === key) {

  //                         if(item.isDelete) return;

  //                         isViewed = item.isViewed ? true : false;
  //                         activePost = item
  //                     }
  //                 })
  //                 if(isViewed === false) {
  //                     isViewed = viewedPostsArr.includes(key) ? true : false;
  //                 }

  //                 let typeCon = helpers.getBackendPostType(activePost, activePost.postType, globals.POST_TYPES);

  //                 if(isViewed === false && typeCon != 'campaign' && !helpers._isEmptyObject(activePost)) {
  //                     viewedPostsArr.push(key);
  //                     globals.setUserData('viewedPostsArr', viewedPostsArr)

  //                     let cb = {
  //                         success: (res) => {
  //                             let {data} = res
  //                             data = Object.assign({}, data, {isViewed : true})
  //                             if(data && data.typeContent && data.viewCount){
  //                                 let postType = helpers.getBackendPostType(data, data.postType, globals.POST_TYPES);
  //                                 const {home, profile, campaigns, setHomeDataProp, setProfileDataProp, setParticipantProp, companyParticipant, otherProfileNewsfeed, setOtherProfileNewsfeed} = props

  //                                 if(postType == globals.POST_TYPES.MediaPost){
  //                                     find(home.news, dt => dt._id == data._id) ? setHomeDataProp({ prop: 'news', arr : map(home.news, dt => dt._id == data._id ? data : dt ) }) : null
  //                                     find(profile.newsFeedList, dt => dt._id == data._id) ? setProfileDataProp({ prop: 'newsFeedList', arr: map(profile.newsFeedList, dt => dt._id == data._id ? data : dt) }) : null
  //                                     find(home.exploreList, dt => dt._id == data._id) ? setHomeDataProp({ prop: 'exploreList', arr : map(home.exploreList, dt => dt._id == data._id ? data : dt) }) : null

  //                                     if(otherProfileNewsfeed && otherProfileNewsfeed[data.createdBy._id]){
  //                                         setOtherProfileNewsfeed({
  //                                             id: data.createdBy._id,
  //                                             arr: map(otherProfileNewsfeed[data.createdBy._id].arr, dt => dt._id == data._id ? data : dt),
  //                                             pagination: otherProfileNewsfeed[data.createdBy._id].pagination || {}
  //                                         })
  //                                     }
  //                                 }
  //                                 else if(postType == globals.POST_TYPES.CompanyParticipantCampaign) {
  //                                     find(home.participant, dt => dt._id == data._id) ? setHomeDataProp({ prop: 'participant', arr : map(home.participant, dt => dt._id == data._id ? Object.assign({},dt,{isViewed : true, viewCount : data.viewCount}) : dt) }) : null
  //                                     find(home.news, dt => dt._id == data._id) ? setHomeDataProp({ prop: 'news', arr : map(home.news, dt => dt._id == data._id ? Object.assign({},dt,{isViewed : true, viewCount : data.viewCount}) : dt ) }) : null
  //                                     find(profile.newsFeedList, dt => dt._id == data._id) ? setProfileDataProp({ prop: 'newsFeedList', arr: map(profile.newsFeedList, dt => dt._id == data._id ? Object.assign({},dt,{isViewed : true, viewCount : data.viewCount}) : dt) }) : null

  //                                     if(companyParticipant && companyParticipant[data.campaignId._id]){
  //                                         setParticipantProp && setParticipantProp({
  //                                             id: data.campaignId._id,
  //                                             arr: map(companyParticipant[data.campaignId._id].arr, cmp =>{

  //                                                 if(cmp.id == data.id){
  //                                                     return Object.assign({},cmp,{isViewed : true, viewCount : data.viewCount})
  //                                                 }
  //                                                 else{
  //                                                     return cmp
  //                                                 }
  //                                             }),
  //                                             pagination: companyParticipant[data.campaignId.id].pagination
  //                                         })
  //                                     }

  //                                     if(otherProfileNewsfeed && otherProfileNewsfeed[data.createdBy._id]){
  //                                         setOtherProfileNewsfeed({
  //                                             id: data.createdBy._id,
  //                                             arr: map(otherProfileNewsfeed[data.createdBy._id].arr, dt => dt._id == data._id ? Object.assign({},dt,{isViewed : true, viewCount : data.viewCount}) : dt),
  //                                             pagination: otherProfileNewsfeed[data.createdBy._id].pagination || {}
  //                                         })
  //                                     }
  //                                 }
  //                                 else if(postType == globals.POST_TYPES.Blog) {
  //                                     find(home.news, dt => dt._id == data._id) ? setHomeDataProp({ prop: 'news', arr : map(home.news, dt => dt._id == data._id ? data : dt ) }) : null
  //                                     find(profile.newsFeedList, dt => dt._id == data._id) ? setProfileDataProp({ prop: 'newsFeedList', arr: map(profile.newsFeedList, dt => dt._id == data._id ? data : dt) }) : null

  //                                     if(otherProfileNewsfeed && otherProfileNewsfeed[data.createdBy._id]){
  //                                         setOtherProfileNewsfeed({
  //                                             id: data.createdBy._id,
  //                                             arr: map(otherProfileNewsfeed[data.createdBy._id].arr, dt => dt._id == data._id ? data : dt),
  //                                             pagination: otherProfileNewsfeed[data.createdBy._id].pagination || {}
  //                                         })
  //                                     }
  //                                 }
  //                             }

  //                          },
  //                         error: (err) => { },
  //                         complete: () => { }
  //                     }
  //                     let typeContent = helpers.getBackendPostType(activePost, activePost.postType, globals.POST_TYPES);
  //                     if(typeContent == 'blog'){
  //                         typeContent = 'media'
  //                     }
  //                     API.postViews({}, cb, header, { type: typeContent, id: key });
  //                 }

  //             }
  //         })
  //     }
  // }
};
