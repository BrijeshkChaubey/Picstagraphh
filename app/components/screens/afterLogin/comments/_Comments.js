import React, { Component, createRef, useEffect, useRef, useState } from "react";
import { _DescriptionLink } from "../../../../components/custom/ContentTypes/common";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Text,
  FlatList,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  RefreshControl,
  Alert,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, ActionSheet, useTheme } from "native-base";
import {
  globals,
  helpers,
  colors,
  sty,
  API,
  images,
} from "../../../../configs";
import {
  _Icon,
  _B,
  _Lang,
  _ListWrap,
  _InlineLoader,
  _Layout,
} from "../../../custom";
import mainStyles from "../../../../assets/styles/MainStyles";
import { styles } from "./styles";
import moment from "moment";
import { set, uniqBy } from "lodash";
import _HashtagList from "./_HashtagList";
import _UsersList from "./_UsersList";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import Emoji from "react-native-emoji";
import {
  setComments,
  pushComment,
} from "../../../../redux/actions/CommentsAction";
import { setOtherProfileNewsfeed } from "../../../../redux/actions/OtherProfileActions";
import { setProfileDataProp } from "../../../../redux/actions/ProfileAction";
import { setHomeDataProp } from "../../../../redux/actions/HomeActions";
import FastImage from "react-native-fast-image";

export default function _Comments(props) {

  const [refreshing, setRefreshing] = useState(false);
  const [commentsArr, setCommentsArr] = useState([]);
  const [expandedComment, setExpandedComment] = useState([]);
  const [comment, setComment] = useState('');
  const [hashtagModal, setHashtagModal] = useState(false);
  const [usersModal, setUsersModal] = useState(false);
  const [commentListTop, setCommentListTop] = useState(new Animated.Value(0));
  const [postInfo, setPostInfo] = useState({});
  // const [listLoaded,setListLoaded] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [inputRows, setInputRows] = useState(1);
  const [sendLoad, setSendLoad] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});
  const [showEmojiInput, setShowEmojiInput] = useState(false);
  const [commentCounterSet, setCommentCounterSet] = useState(props.route.params.commentCounterSet);

  let moreRef = useRef();
  let commentRef = useRef();
  const userListRef = useRef(null);
  const hashtagListRef = useRef(null);
  let mentionedUserArr = useRef();
  let mentionedHashTagArr = useRef();

  let listEnded = false;
  let listRef = useRef();

  const dispatch = useDispatch();

  const {
    navProps,
    loginData,
    localize,
    comments,
    userInfo,
  } = useSelector(state => state);
  const otherProfileNewsfeed = useSelector(state => state.otherProfile.otherProfileNewsfeed);
  const { homeNews, homeExplore, participant } = useSelector(state => state.home);
  const ownNewsfeed = useSelector(state => state.profile.newsFeedList);


  useEffect(() => {
    const postInfo = props.route.params.postInfo;
    console.log("infoo", postInfo);
    load(postInfo);
  }, []);

  const load = (data) => {
    let arr = [];

    //TODO: Uncomment following two lines and comment 2 lines after that
    // let listLoaded = this.props.comments[data._id] ? true :
    //                  data.comments ? true : false;
    let listLoaded = comments[data._id]
      ? true
      : data.comments
        ? false
        : false;

    // arr = listLoaded ? data.comments || this.props.comments[data._id].arr : [];
    arr = listLoaded ? comments[data._id].arr : [];

    if (data.comments) {
      dispatch(setComments({
        id: data._id,
        // arr: data.comments,
        arr: arr,
        pagination: globals.DEFAULT_PAGINATION,
      }));
    }

    setCommentsArr(arr);
    setPostInfo(data);
    setListLoading(listLoaded);
  };

  useEffect(() => {
    if (listLoading || refreshing)
      _getComments(props.route.params.postInfo);
  }, [listLoading, refreshing]);

  const _getComments = (postInfo) => {
    console.log('postInfo==>', postInfo);
    let cb = {
      success: (res) => {
        let newarr = res.data;
        if (
          res.data.length < 10 &&
          res.pagination.pages > 1 &&
          res.pagination.page === 1
        ) {
          let cb2 = {
            success: (res) => {
              setCommentsArr(newarr.concat(res.data));


              dispatch(setComments({
                id: postInfo.id,
                arr: newarr.concat(res.data),
                pagination: res.pagination,
              }));
            },
            error: () => {
              dispatch(setComments({
                id: postInfo.id,
                arr: [],
                pagination: globals.DEFAULT_PAGINATION,
              }));
            },
            complete: () => {
              setRefreshing(false);
              setListLoading(true);
            },
          };
          API.commentsGetApi({}, cb2, header, {
            id: postInfo.id,
            type:
              postType == globals.POST_TYPES.Blog
                ? globals.POST_TYPES.MediaPost
                : postType,
            page: 2,
            limit: globals.PAGINATION.comments,
          });
        } else {
          setCommentsArr(res.data);

          dispatch(setComments({
            id: postInfo.id,
            arr: res.data,
            pagination: res.pagination,
          }));
        }
      },
      error: () => {
        dispatch(setComments({
          id: postInfo.id,
          arr: [],
          pagination: globals.DEFAULT_PAGINATION,
        }));
      },
      complete: () => {
        setRefreshing(false);
        setListLoading(false);
      },
    };
    let postType = helpers.getBackendPostType(
      postInfo,
      postInfo.postType,
      globals.POST_TYPES,
    );
    let header = helpers.buildHeader({
      authorization: loginData.token,
    });
    API.commentsGetApi({}, cb, header, {
      id: postInfo.id,
      type:
        postType === globals.POST_TYPES.Blog
          ? globals.POST_TYPES.MediaPost
          : postType,
      page: 1,
      limit: globals.PAGINATION.comments,
    });
  };

  let header = {
    leftCb: () => {
      props.navigation.pop();
    },
    leftImg: images.leftBackArrow,
    title: "customComment.comments",
    hideRight: true,
  };

  let inputStyle = Platform.OS === "ios" ? { marginTop: 5 } : {};

  useEffect(() => {
    if (comments != undefined) {
      dispatch(setComments({ id: postInfo.id, data: commentsArr }));
      dispatch(setComments({
        id: postInfo.id,
        arr: commentsArr,
        pagination: comments[postInfo._id]?.pagination,
      }));
    }
  }, [commentsArr]);

  const _commentCounterUpdate = (counterType = "minus") => {
    commentCounterSet(counterType === "add" ? true : false);
    if (homeNews) {
      let data = homeNews.map((item) => {
        if (postInfo._id === item._id) {
          return Object.assign({}, item, {
            commentCount:
              counterType === "add"
                ? item.commentCount + 1
                : item.commentCount - 1,
          });
        } else {
          return item;
        }
      });
      dispatch(setHomeDataProp({ prop: "news", arr: data }));
    }
    if (homeExplore) {
      let data = homeExplore.map((item) => {
        if (postInfo._id === item._id) {
          return Object.assign({}, item, {
            commentCount:
              counterType === "add"
                ? item.commentCount + 1
                : item.commentCount - 1,
          });
        } else {
          return item;
        }
      });
      dispatch(setHomeDataProp({ prop: "exploreList", arr: data }));
    }
    if (participant) {
      let data = participant.map((item) => {
        if (postInfo._id === item._id) {
          return Object.assign({}, item, {
            commentCount:
              counterType === "add"
                ? item.commentCount + 1
                : item.commentCount - 1,
          });
        } else {
          return item;
        }
      });
      dispatch(setHomeDataProp({ prop: "participant", arr: data }));
    }
    if (ownNewsfeed) {
      let data = ownNewsfeed.map((item) => {
        if (postInfo._id === item._id) {
          return Object.assign({}, item, {
            commentCount:
              counterType === "add"
                ? item.commentCount + 1
                : item.commentCount - 1,
          });
        } else {
          return item;
        }
      });
      dispatch(setProfileDataProp({ prop: "newsFeedList", arr: data }));
    }
    if (
      otherProfileNewsfeed &&
      postInfo.createdBy &&
      otherProfileNewsfeed[postInfo.createdBy._id]
    ) {
      let data = otherProfileNewsfeed[postInfo.createdBy._id].arr.map(
        (item) => {
          if (postInfo._id === item._id) {
            return Object.assign({}, item, {
              commentCount:
                counterType === "add"
                  ? item.commentCount + 1
                  : item.commentCount - 1,
            });
          } else {
            return item;
          }
        },
      );
      dispatch(setOtherProfileNewsfeed({
        id: postInfo.createdBy._id,
        arr: data,
        pagination:
          otherProfileNewsfeed[postInfo.createdBy._id].pagination || {},
      }));
    }
  };

  const _commentActions = (selection, commentInfo) => {
    let loader = props.navigation.getParam("loader");
    const { commentCounterSet } = props;

    if (loginData.id === commentInfo.createdBy._id) {
      if (selection === 0) {
        let commentsArrTemp = commentsArr.filter((item) => {
          return item._id !== commentInfo._id;
        });
        setCommentsArr(commentsArrTemp);
        let cb = {
          success: (res) => {
            _commentCounterUpdate();
          },
          error: () => {
            setCommentsArr(commentsArr);
            //commentCounterSet()
          },
        };
        //commentCounterSet(false)
        console.log('_CommentActions postInfo==>', postInfo);
        let header = helpers.buildHeader({ authorization: loginData.token });
        let postType = helpers.getBackendPostType(
          postInfo,
          postInfo.postType,
          globals.POST_TYPES,
        );
        if (postType === "blog") postType = "media";

        API.commentsDeleteApi({}, cb, header, {
          id: postInfo.id,
          commentId: commentInfo._id,
          type: postType,
        });
      } else if (selection == 1) {
        setEditComment(true);
        setComment(commentInfo.comment);
        setSelectedComment(commentInfo);
      }
    } else {
      if (postInfo.createdBy._id === loginData.id) {
        if (selection === 0) {
          let commentsArrTemp = commentsArr.filter((item) => {
            return item._id !== commentInfo._id;
          });
          setCommentsArr(commentsArrTemp);
          let cb = {
            success: (res) => {
              _commentCounterUpdate();
            },
            error: () => {
              setCommentsArr(commentsArr);
              //commentCounterSet()
            },
          };
          //commentCounterSet(false)
          let header = helpers.buildHeader({ authorization: loginData.token });
          let postType = helpers.getBackendPostType(
            postInfo,
            postInfo.postType,
            globals.POST_TYPES,
          );
          if (postType === "blog") postType = "media";
          API.commentsDeleteApi({}, cb, header, {
            id: postInfo.id,
            commentId: commentInfo._id,
            type: postType,
          });
        } else if (selection === 1) {
          let cb = {
            success: (res) => {
              let appDataCount = 0;
              let reportedCommentIdArr = globals.getUserData(
                "reportedComments",
              );
              reportedCommentIdArr = reportedCommentIdArr.map((item) => {
                if (item.id === commentInfo._id) {
                  appDataCount++;
                  return {
                    id: item._id,
                    flag: !item.flag,
                  };
                }
              });

              if (appDataCount === 0) {
                globals.setUserData("reportedComments", [
                  {
                    id: commentInfo._id,
                    flag: !commentInfo.isReported,
                  },
                ]);
              } else {
                globals.setUserData("reportedComments", reportedCommentIdArr);
              }

              loader.success("Success", "Comment report status updated!");
            },
            error: () => {
              loader.error("Error", "Comment report status not updated!");
            },
          };
          let data = {
            typeId: commentInfo._id,
            typeContent: globals.REPORT_TYPES.COMMENT,
            title: commentInfo.comment,
            postType: postInfo.postType,
            postId: postInfo.id,
          };
          //loader.load();
          let header = helpers.buildHeader({ authorization: loginData.token });
          API.reportPost(data, cb, header);
        }
      } else if (selection === 0) {
        let cb = {
          success: (res) => {
            let appDataCount = 0;
            let reportedCommentIdArr = globals.getUserData("reportedComments");
            reportedCommentIdArr = reportedCommentIdArr.map((item) => {
              if (item.id === commentInfo._id) {
                appDataCount++;
                return {
                  id: item._id,
                  flag: !item.flag,
                };
              }
            });

            if (appDataCount === 0) {
              globals.setUserData("reportedComments", [
                {
                  id: commentInfo._id,
                  flag: !commentInfo.isReported,
                },
              ]);
            } else {
              globals.setUserData("reportedComments", reportedCommentIdArr);
            }

            loader.success("Success", "Comment report status updated!");
          },
          error: () => {
            loader.error("Error", "Comment report status not updated!");
          },
        };
        let data = {
          typeId: commentInfo._id,
          typeContent: globals.REPORT_TYPES.COMMENT,
          title: commentInfo.comment,
          postType: postInfo.postType,
          postId: postInfo.id,
        };
        //loader.load();
        let header = helpers.buildHeader({ authorization: loginData.token });
        API.reportPost(data, cb, header);
      }
    }
  };


  const _trans = (str1, str2) => helpers.getLocale(localize, str1, str2);

  const _toggleMoreList = (commentInfo) => {
    if (loginData.id === commentInfo.createdBy._id) {
      ActionSheet.show(
        {
          options: [
            _trans("moreOption", "deleteComment"),
            _trans("moreOption", "editComment"),
            _trans("moreOption", "cancel"),
          ],
          title: _trans("moreOption", "selectCommentAction"),
          cancelButtonIndex: 2,
        },
        (buttonIndex) => {
          setTimeout(() => {
            _commentActions(buttonIndex, commentInfo);
          }, 500);
        },
      );
    } else {
      let reportTxt = commentInfo.isReported
        ? _trans("moreOption", "unreportComment")
        : _trans("moreOption", "reportComment");
      let reportedCommentIdArr = globals.getUserData("reportedComments");
      reportedCommentIdArr = reportedCommentIdArr.map((item) => {
        if (item.id === commentInfo._id) {
          reportTxt = item.flag
            ? _trans("moreOption", "unreportComment")
            : _trans("moreOption", "reportComment");
        }
      });
      ActionSheet.show(
        {
          options:
            postInfo.createdBy._id == loginData.id
              ? [
                _trans("moreOption", "deleteComment"),
                reportTxt,
                _trans("moreOption", "cancel"),
              ]
              : [reportTxt, _trans("moreOption", "cancel")],
          title: _trans("moreOption", "selectCommentAction"),
          cancelButtonIndex: 2,
        },
        (buttonIndex) => {
          setTimeout(() => {
            _commentActions(buttonIndex, commentInfo);
          }, 500);
        },
      );
    }
  };

  const userNav = (item) => {
    navProps.activeNav.push("OthersProfile", {
      userInfo: {
        username: item.createdBy.username,
        userId: item.createdBy._id,
      },
    });
  };


  const _renderCommentsList = ({ item, index }) => {
    let { createdBy } = item;
    const isExpanded = expandedComment.includes(index);
    let readMoreText = helpers.getLocale(
      localize,
      "contentType",
      "readMore",
    );
    let comment = item.comment;
    // if (comment && comment.length > 100 && !isExpanded) {
    //   comment = comment.substr(0, 100);
    //   comment = comment + "...";
    // }

    let createdTime = moment(item.createdAt).format("MMM DD YY, h:mm a");
    let createdTimeMoment = moment(item.createdAt);
    if (moment().diff(createdTimeMoment, "days") < 1) {
      createdTime = moment(item.createdAt).format("h:mm a");
    }

    return (
      <View
        ref={(ref) => (listRef[item._id] = ref)}
        renderToHardwareTextureAndroid={true}>
        <TouchableOpacity
          onPress={() => _toggleMoreList(item)}
          style={styles.commentCredsRight}>
          <_Icon
            type={"Ionicons"}
            icon={"ellipsis-horizontal"}
            color={colors.grayDark}
            size={20}
          />
        </TouchableOpacity>
        <_ListWrap style={styles.commentsBox}>
          <View style={styles.userImgWrap}>
            <TouchableOpacity onPress={() => userNav(item)}>
              <FastImage
                source={
                  createdBy.miniProfileUrl
                    ? {
                      uri: createdBy.miniProfileUrl,
                      priority: FastImage.priority.high,
                    }
                    : images.user
                }
                style={styles.userImg}
                defaultSource={images.user}
              />
            </TouchableOpacity>
          </View>
          <View style={{ ...sty.flex1, ...sty.mgT5 }}>
            <View style={styles.commentCredsWrap}>
              <TouchableOpacity
                onPress={() => {
                  userNav(item);
                }}>
                <_B style={styles.commentCredsTxt1}>{createdBy.username}</_B>
              </TouchableOpacity>
              <Text style={styles.commentCredsTxt2}>{createdTime}</Text>
            </View>
            {/* <Text style={styles.commentTxt}>{comment}</Text> */}
            <View style={[styles.description]}>
              <View>
                <Text allowFontScaling={false} style={{ textAlignVertical: 'bottom' }}>
                  <_DescriptionLink
                    onUserNamePress={(item) => _getUserInfo(item)}
                    onHashPress={_hashPress}
                    text={comment}
                  />
                </Text>
              </View>
            </View>
            {/* <View style={{...sty.fRow, marginTop:3}}>
                         <_DescriptionLink  onUserNamePress={(item)=>this._getUserInfo(item)}  onHashPress={this._hashPress} text={comment} />
                        </View> */}
          </View>
        </_ListWrap>
        {/* {isExpanded || (comment && comment.length < 100) ? null : (
          <TouchableOpacity
            onPress={() => {
              expandedComment.push(index);
              this.setState({ expandedComment });
            }}
            style={styles.commentReadMore}>
            <Text style={[mainStyles.appTxtLight, { color: colors.icons }]}>
              {readMoreText}
            </Text>
          </TouchableOpacity>
        )} */}
      </View>
    );
  };

  const _getUserInfo = (user) => {

    let loader = props.navigation.getParam("loader");
    user = user.replace("@", "");
    let cb = {
      success: (res) => {
        loader.hideLoader();
        console.log("lala", res.data.id);
        navProps.activeNav.navigate("OthersProfile", {
          userInfo: {
            username: user,
            userId: res.data.id,
          },
        });
      },
      error: (err) => {
        console.log("hi", err);
      },
      complete: () => {
        loader.hideLoader();
      },
    };
    //loader.load();
    let header = helpers.buildHeader({ authorization: loginData.token });
    API.getUserInfo({}, cb, header, user);
  };

  const _hashPress = (item) => {
    navProps.activeNav.pop();
    helpers.hashtagExploreNavigate(item);
  };


  const _onRefresh = () => setRefreshing(true);


  const _renderComments = () => {

    // if (!listLoaded) return <_InlineLoader type={"comment"} />;
    let createdTime2 = moment(
      props?.route?.params?.postInfo?.createdAt,
    ).format("MMM DD YY, h:mm a");
    let createdTimeMoment2 = moment(
      props?.route?.params?.postInfo?.createdAt,
    );
    if (moment().diff(createdTimeMoment2, "days") < 1) {
      createdTime2 = moment(
        props?.route?.params?.postInfo?.createdAt,
      ).format("h:mm a");
    }
    return (
      <View style={{ ...sty.flex1 }}>
        <Animated.View style={{ marginTop: commentListTop, ...sty.flex1 }}>
          <FlatList
            data={uniqBy(commentsArr, (cm) => cm._id)}
            extraData={commentsArr}
            ListHeaderComponent={() =>

              props?.route?.params?.postInfo?.description ? (

                <>
                  <_ListWrap style={styles.commentsBox}>
                    <View style={styles.userImgWrap}>
                      <TouchableOpacity
                        onPress={() =>
                          userNav(
                            props?.route?.params?.postInfo,
                          )
                        }>
                        <FastImage
                          source={
                            props?.route?.params?.postInfo
                              ?.createdBy?.miniProfileUrl
                              ? {
                                uri: props?.route?.params
                                  ?.postInfo?.createdBy?.miniProfileUrl,
                              }
                              : images.user
                          }
                          style={styles.userImg}
                          defaultSource={images.user}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{ ...sty.flex1, ...sty.mgT5 }}>
                      <View style={styles.commentCredsWrap}>
                        <TouchableOpacity
                          onPress={() => {
                            userNav(
                              props?.route?.params?.postInfo,
                            );
                          }}>
                          <_B style={styles.commentCredsTxt1}>
                            {
                              props?.route?.params?.postInfo
                                ?.createdBy?.username
                            }
                          </_B>
                        </TouchableOpacity>

                        <Text style={styles.commentCredsTxt2}>{createdTime2}</Text>
                      </View>

                      <View style={[styles.description]}>
                        <View>
                          <Text allowFontScaling={false}>
                            <_DescriptionLink
                              onUserNamePress={(item) =>
                                _getUserInfo(item)
                              }
                              onHashPress={_hashPress}
                              text={
                                props?.route?.params?.postInfo
                                  ?.description
                              }
                            />
                          </Text>
                        </View>
                      </View>
                      {/* <View style={{...sty.fRow, marginTop:3}}>
                         <_DescriptionLink  onUserNamePress={(item)=>this._getUserInfo(item)}  onHashPress={this._hashPress} text={comment} />
                        </View> */}
                    </View>
                  </_ListWrap>
                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      borderBottomColor: "gray",
                      marginHorizontal: 12,
                    }}
                  />
                </>
              ) : null
            }
            renderItem={_renderCommentsList}
            keyExtractor={_keyExtractor}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh}
              />
            }
            // onScroll={(e) => {
            //     if (!this.listLoading && !this.listEnded) this._renderMore();
            // }}
            onEndReachedThreshold={0.5}
            onEndReached={() => _renderMore()}
            // ListFooterComponent={() => {
            //   return <View>{listLoading ? <_InlineLoader /> : null}</View>;
            // }}
            ListEmptyComponent={<View />}
          />
        </Animated.View>
      </View>
    );
  };

  const _renderMore = () => {
    let pagination = comments[postInfo.id]?.pagination;
    if (listLoading === false) {
      setListLoading(true);
    }
  };

  useEffect(() => {
    if (listLoading) {
      if (comments[postInfo.id]?.pagination.page + 1 > comments[postInfo.id]?.pagination.pages) {
        listEnded = true;
        setListLoading(false);

      } else {
        let cb = {
          success: (res) => {
            setCommentsArr(commentsArr.concat(res.data))

            dispatch(pushComment({
              id: postInfo.id,
              arr: res.data,
              pagination: res.pagination,
            }));
          },
          error: (err) => { },
          complete: () => {
            listLoading = false;
            setListLoading(false);
          },
        };
        console.log('useEffect postInfo==>', postInfo);
        let postType = helpers.getBackendPostType(
          postInfo,
          postInfo.postType,
          globals.POST_TYPES,
        );
        let header = helpers.buildHeader({
          authorization: loginData.token,
        });
        API.commentsGetApi({}, cb, header, {
          id: postInfo.id,
          type: postType,
          page: ++pagination.page,
          limit: globals.PAGINATION.comments,
        });
      }
    }
  }, { listLoading });


  const _keyExtractor = (item, index) => "Comments_" + index.toString();

  const _selectEmoji = (emoji) => {
    _toggleEmojiInput();
    let comment = comment + "" + emoji;
    // setComment(comment);
  };

  const _toggleEmojiInput = () => {
    Keyboard.dismiss();
    setShowEmojiInput(!showEmojiInput);
  };

  const _setComment = (comment) => {
    console.log('setComment listloading==>', listLoading);
    let oldStr = comment;
    let newStr = comment;
    oldStr += " ";
    newStr += " ";

    // this.userListRef.hide();
    setHashtagModal(false);
    setUsersModal(false);

    if (newStr.match(/@ +/)) {
      setUsersModal(true);
      userListRef.current.show(newStr);
      /** Condition for the search user*/
      hashtagListRef.current.hide();
      _setCommentData(comment);
      let lastWord = comment.split(" ").pop();
      userListRef.current.searchUser(lastWord.replace("@", ""));
    } else if (newStr.match(/# +/)) {
      setHashtagModal(true);

      _setCommentData(comment);
      hashtagListRef.current.show(newStr);
      userListRef.current.hide();
      let lastWord = comment.split(" ").pop();
      hashtagListRef.current.searchHashTag(lastWord.replace("#", ""));
    } else {
      if ((oldStr.match(/@/g) || []).length > 1) {
        if (
          (oldStr.match(/@/g) || []).length > (newStr.match(/@/g) || []).length
        ) {
          userListRef.current.hide();
        }
      }
      if ((oldStr.match(/#/g) || []).length > 1) {
        if (
          (oldStr.match(/#/g) || []).length > (newStr.match(/#/g) || []).length
        ) {
          hashtagListRef.current.hide();
        }
      }
      if (!comment.includes("@")) {
        userListRef.current.hide();
      }
      if (!comment.includes("#")) {
        hashtagListRef.current.hide();
      }
      let lastWord = comment.split(" ").pop();
      userListRef.current.searchUser(lastWord.replace("@", "").trim());
      hashtagListRef.current.searchHashTag(lastWord.replace("#", "").trim());

      let oldUserMentions = oldStr.match(/@[a-zA-z]\w+/g);
      let newUserMentions = newStr.match(/@[a-zA-z]\w+/g);

      let oldHashMentions = oldStr.match(/#[a-zA-z]\w+/g);
      let newHashMentions = newStr.match(/#[a-zA-z]\w+/g);

      let isUserMentionNull =
        oldUserMentions === null || newUserMentions === null ? true : false;
      let isHashMentionNull =
        oldHashMentions === null || newHashMentions === null ? true : false;

      if (isUserMentionNull && isHashMentionNull) {
        _setCommentData(comment);
        return;
      }

      if (newStr.length < oldStr.length) {
        newUserMentions = isUserMentionNull
          ? []
          : newUserMentions.filter((x) => !oldUserMentions.includes(x));
        newHashMentions = isHashMentionNull
          ? []
          : newHashMentions.filter((x) => !oldHashMentions.includes(x));
        if (newUserMentions.length > 0) {
          newStr = newStr.replace(newUserMentions[0], "");
          _setCommentData(newStr.trim());
        } else if (newHashMentions.length > 0) {
          newStr = newStr.replace(newHashMentions[0], "");
          _setCommentData(newStr.trim());
        } else {
          _setCommentData(comment);
        }
      }
      if (newStr.length > oldStr.length) {
        oldUserMentions = isUserMentionNull
          ? []
          : oldUserMentions.filter((x) => !newUserMentions.includes(x));
        oldHashMentions = isHashMentionNull
          ? []
          : oldHashMentions.filter((x) => !newHashMentions.includes(x));
        _setCommentData(comment);
        // }
      }
    }
  };

  const _setCommentData = (data) => {
    setComment(data);
    setUsersModal(false);
    setHashtagModal(false);
  };

  // const setUserList = (ref) => (userListRef = ref);
  // const setHashtagList = (ref) => (hashtagListRef = ref);

  const _selectHashtag = (hashtag, str) => {
    mentionedHashTagArr.push(hashtag);
    let comment = str.replace("# ", "#" + hashtag.hashTagName + " ");
    _setCommentData(comment.trim());
  };

  const _selectUser = (user, str) => {
    mentionedUserArr.push(user);
    let comment = str.replace("@ ", "@" + user.username + " ");
    _setCommentData(comment.trim());
  };

  const _updateCommentAction = () => {
    var commentsArr = commentsArr;

    if (comment == "") {
      Alert.alert("Error", "Please enter comment");
      return;
    }

    let mentionedUserArr = [];
    let mentionedHashTagArr = [];
    let usernameArr = comment.match(/@[a-zA-Z]\w+/g);
    let hashArr = comment.match(/#[a-zA-Z]\w+/g);

    if (!usernameArr) usernameArr = [];
    if (!hashArr) hashArr = [];

    usernameArr = usernameArr.map((item) => item.substr(1));
    mentionedUserArr.map((item) => {
      if (usernameArr.includes(item.username)) {
        mentionedUserArr.push(item._id);
      }
    });

    hashArr = hashArr.map((item) => item.substr(1));
    mentionedHashTagArr.map((item) => {
      if (hashArr.includes(item.hashTagName)) {
        mentionedHashTagArr.push(item._id);
      }
    });

    if (!editComment) {
      _saveComment(mentionedUserArr, mentionedHashTagArr);
    } else {
      _editComment(mentionedUserArr, mentionedHashTagArr);
    }
  };

  const _saveComment = (mentionedUserArr, mentionedHashTagArr) => {
    var commentsArr = commentsArr;

    let pagination = comments[postInfo.id]
      ? comments[postInfo.id].pagination
      : globals.DEFAULT_PAGINATION;

    let cb = {
      success: (res) => {
        let commentObj = res.data;
        commentObj = Object.assign({}, commentObj, {
          createdBy: {
            _id: loginData.id,
            id: loginData.id,
            username: loginData.username,
            profileUrl: loginData.profileUrl,
            miniProfileUrl: loginData.miniProfileUrl
              ? loginData.miniProfileUrl
              : loginData.profileUrl,
          },
        });
        commentsArr.unshift(commentObj);
        // commentsArr.push(commentObj);

        setComment("");
        setCommentsArr(commentsArr);
        // this.setState({
        //   comment: "",
        //   commentsArr: commentsArr,
        // });
        dispatch(pushComment({
          id: postInfo.id,
          arr: commentObj,
          pagination,
        }));
        _commentCounterUpdate("add");
      },
      error: (err) => {
        //commentCounterSet(false)
      },
      complete: () => {
        setSendLoad(false);
        setListLoading(true);
      }
    };
    let header = helpers.buildHeader({ authorization: loginData.token });
    let data = {
      mentionedUserId: mentionedUserArr,
      comment,
    };
    //commentCounterSet();
    setSendLoad(true);
    setListLoading(false);
    let postType = helpers.getBackendPostType(
      postInfo,
      postInfo.postType,
      globals.POST_TYPES,
    );

    API.commentsSaveApi(data, cb, header, {
      id: postInfo.id,
      type: postType === "blog" ? "media" : postType,
    });
  };

  const _editComment = (mentionedUserArr, mentionedHashTagArr) => {
    var commentsArr = commentsArr;

    let pagination = comments[postInfo.id]
      ? comments[postInfo.id].pagination
      : globals.DEFAULT_PAGINATION;

    let commentsArrTemp = commentsArr.map((item) => {
      if (item._id === selectedComment._id) {
        item.comment = comment;
      }
      return item;
    });
    setCommentsArr(commentsArrTemp);
    dispatch(setComments({
      id: postInfo.id,
      arr: commentsArrTemp,
      pagination,
    }));
    let cb = {
      success: (res) => {
        setSendLoad(false);
        setComment("");
        setEditComment(false);
        setSelectedComment({});
      },
      error: (err) => {
        setSendLoad(false);
        setEditComment(false);
        setSelectedComment({});
        setCommentsArr(commentsArr);
      },
    };
    let header = helpers.buildHeader({ authorization: loginData.token });
    let data = {
      // id: selectedComment._id,
      // comment
      mentionedUserId: mentionedUserArr,
      comment,
    };
    setSendLoad(true);
        let postType = helpers.getBackendPostType(
          postInfo,
          postInfo.postType,
          globals.POST_TYPES,
        );
        if (postType === "blog") postType = "media";
        API.commentsEditApi(data, cb, header, {
          id: postInfo.id,
          commentId: selectedComment._id,
          type: postType,
        });
  };

  return (
    <_Layout
      screen={"home"}
      header={header}
      renderSocialShare={true}
      style={{ backgroundColor: "#fff" }}
      headerWrapStyle={{
        borderBottomWidth: 1,
        borderBottomColor: colors.appBg,
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ ...sty.flex1 }}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? (globals.WINDOW_HEIGHT >= 812 ? 80 : 70) : 0
        }
        enabled>
        <View style={{ ...sty.flex1 }}>
          {!usersModal && !hashtagModal ? _renderComments() : null}

          {!listLoading ? (
            <>
              <_HashtagList
                // setHashtagList={setHashtagList}
                cb={_selectHashtag}
                ref={hashtagListRef}
              />
              <_UsersList
                ref={userListRef}
                // setUserList={setUserList}
                cb={_selectUser}
              />
            </>
          ) : null}

          {/* <_UsersList
            ref ={userListRef}
              // setUserList={setUserList}
              cb={_selectUser}
            /> */}
        </View>
        <View style={styles.footerWrap}>
          <View
            style={{
              flexDirection: "row",
              height: 50,
              alignItems: "center",
              borderTopColor: "gray",
              borderTopWidth: 0.2,
              justifyContent: "center",
            }}>
            <TouchableOpacity onPress={() => _selectEmoji("❤️")}>
              <Emoji
                name="heart"
                style={{
                  fontSize: 24,
                  width: globals.WINDOW_WIDTH / 8 - 5,
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _selectEmoji("🔥")}>
              <Emoji
                name="fire"
                style={{ fontSize: 24, width: globals.WINDOW_WIDTH / 8 - 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _selectEmoji("👏")}>
              <Emoji
                name="clap"
                style={{ fontSize: 24, width: globals.WINDOW_WIDTH / 8 - 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _selectEmoji("😍")}>
              <Emoji
                name="heart_eyes"
                style={{ fontSize: 24, width: globals.WINDOW_WIDTH / 8 - 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _selectEmoji("😂")}>
              <Emoji
                name="joy"
                style={{ fontSize: 24, width: globals.WINDOW_WIDTH / 8 - 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _selectEmoji("😡")}>
              <Emoji
                name="rage"
                style={{ fontSize: 24, width: globals.WINDOW_WIDTH / 8 - 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _selectEmoji("😢")}>
              <Emoji
                name="cry"
                style={{ fontSize: 24, width: globals.WINDOW_WIDTH / 8 - 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _selectEmoji("😃")}>
              <Emoji
                name="smiley"
                style={{ fontSize: 24, width: globals.WINDOW_WIDTH / 8 - 5 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.footerWrapInner}>
            <View style={styles.userImgWrap}>
              <FastImage
                source={
                  loginData.profileUrl
                    ? {
                      uri: loginData.profileUrl,
                      priority: FastImage.priority.high,
                    }
                    : images.user
                }
                style={styles.userImg}
              />
            </View>
            <View style={[styles.inputWrap, { backgroundColor: "#fff" }]}>
              {/* <TouchableOpacity onPress={()=>{ this._toggleEmojiInput() }}>
                                    <Image source={images.smiley} style={styles.imojiIco} resizeMode={'contain'} />
                                </TouchableOpacity> */}
              <View style={styles.inputWrapInner}>
                <Input
                  ref={(ref) => (commentInput = ref)}
                  style={[styles.input, inputStyle]}
                  placeholder={helpers.getLocale(
                    localize,
                    "customComment",
                    "write_a_message",
                  )}
                  value={comment}
                  onChangeText={(text) => {
                    _setComment(text);
                    // userListRef.current.show();
                  }}
                  onKeyPress={(e) => {
                    if (
                      e.nativeEvent.key === " " ||
                      e.nativeEvent.key === "Enter"
                    ) {
                      userListRef.current.hide();
                      hashtagListRef.current.hide();
                    }
                  }}
                  multiline={true}
                  numberOfLines={3}
                //   textAlignVertical={'center'}
                />
              </View>
              <View style={styles.sendWrap}>
                {sendLoad ? (
                  <ActivityIndicator color={colors.grayDark} size={"small"} />
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      _updateCommentAction();
                    }}>
                    <_Lang
                      style={styles.sendTxt}
                      text={"customComment.send"}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </_Layout>
  )
}