import React,{memo} from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Text,
} from "react-native";
import { setActiveVideo } from "../../../../redux/actions/VideoAction";
// import VisibilitySensor from "@svanboxel/visibility-sensor-react-native";
import {
  globals,
  helpers,
  colors,
  images,
  sty,
  API,
} from "../../../../configs";
import { _Spacer, _Icon, _ListView, _B, _Button, _Lang } from "../../../custom";
import mainStyles from "../../../../assets/styles/MainStyles";
import styles from "./styles";
import moment from "moment";
import {
  _ImageWrap,
  _Like,
  _PostVideo,
  _PostMeta,
  _DescriptionLink,
} from "../common"; //create components WIP
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useState,useEffect,useRef } from "react";
import { useDispatch,useSelector } from "react-redux";

const MediaPost = (props) => {

  const { contentInfo} =props;


  const dispatch = useDispatch();
  const video=useSelector(state =>state.video)
  const localize = useSelector(state => state.localize)
  const navProps = useSelector(state => state.navProps)
  const loginData = useSelector(state => state.loginData)

  const [state, setstate]= useState({
    contentId: props.contentInfo._id,
    likeFlag: props.contentInfo.isSelfLike,
    likeCount: props.contentInfo.likeCount,
    commentCount: props.contentInfo.commentCount,
    viewCount: props.contentInfo.viewCount,
    update: true,
  })
  const postMetaRef= useRef(null)

  useEffect((prevProps,prevState) => {
    // globals.setUserData("med" + props.contentInfo._id, this);
    globals.setUserData("med" + props.contentInfo._id,  {...props});//need attention
    if (
      props.contentInfo.likeCount !== state.likeCount &&
      !update
    ) {
      setstate({...state, update: true });
    } else if (
      props.contentInfo.commentCount !==
        state.commentCount &&
      !update
    ) {
      setstate({...state, update: true });
    }

  },[])

  // static getDerivedStateFromProps(nextProps, state) {
  //   if (nextProps.contentInfo._id !== state.contentId) {
  //     // globals.setUserData('med' + nextProps.contentInfo._id, this);
  //     return {
  //       likeCount: nextProps.contentInfo.likeCount,
  //       likeFlag: nextProps.contentInfo.isSelfLike,
  //       commentCount: nextProps.contentInfo.commentCount,
  //       viewCount: nextProps.contentInfo.viewCount,
  //       contentId: nextProps.contentInfo._id,
  //     };
  //   } else if (
  //     nextProps.contentInfo.likeCount !== state.likeCount &&
  //     nextProps.contentInfo.likeCount != undefined &&
  //     state.update
  //   ) {
  //     return {
  //       likeCount: nextProps.contentInfo.likeCount,
  //       likeFlag: nextProps.contentInfo.isSelfLike,
  //     };
  //   } else if (
  //     nextProps.contentInfo.viewCount > state.viewCount &&
  //     nextProps.contentInfo.viewCount != undefined
  //   ) {
  //     return {
  //       viewCount: nextProps.contentInfo.viewCount,
  //     };
  //   } else if (
  //     nextProps.contentInfo.commentCount !== state.commentCount &&
  //     nextProps.contentInfo.commentCount != undefined &&
  //     state.update
  //   ) {
  //     return {
  //       commentCount: nextProps.contentInfo.commentCount,
  //     };
  //   }
  //   return null;
  // }

  function updateViews(val) {
    setstate({ ...state,viewCount: val });
  }
  const setPostMetaRef = (ref) => (postMetaRef.current = ref);

  const _renderSection1 = () => {
   

    let { createdBy, users, campaingsUsers} = contentInfo;
    var userNav = () => {
      navProps.activeNav.navigate("OthersProfile", {
        userInfo: {
          username: createdBy?.username || users?.username,
          userId: createdBy?._id || users?._id
        },
      });
    };

    let isAdvertiseLabel = contentInfo.isAdvertiseLabel;

    let category = contentInfo.category
      ? helpers.getLocale(localize, "contentType", "in")
      : "";
    if (category != "") {
      category +=
        contentInfo.category instanceof Array
          ? " " + contentInfo.category[0].categoryName
          : " " + contentInfo.category;
    }
    let locationTxt = helpers.getPostLocation(contentInfo.location);

    return (
      <View
        style={{
          ...sty.fRow,
          paddingHorizontal: 7.5,
          paddingVertical: 7.5,
        }}>
        <View style={{ width: 45, ...sty.jCenter }}>
          <View style={styles.userBox}>
            <TouchableOpacity onPress={userNav}>
              <FastImage
                key={`ImgMediaPost_${contentInfo._id}`}
                source={
                  createdBy?.resizeProfileUrl
                    ? {
                        uri: createdBy?.resizeProfileUrl,
                      }
                    : users?.profileImage
                    ? {
                        uri:
                          globals.live == false
                            ? "https://stagingassets.picstagraph.com/" +
                              users?.profileImage
                            : "https://assets.picstagraph.com/" +
                              users?.profileImage,
                      }
                    : images.user
                }
                style={{ height: 35, width: 35 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ ...sty.flex1 }}>
          <TouchableOpacity onPress={userNav}>
            <View style={[styles.headingTxtWrap, { borderWidth: 0 }]}>
              <_Lang
                text={createdBy?.username || users?.username}
                pureText
                style={[
                  mainStyles.boldHeadTxt,
                  {
                    lineHeight: 18,
                    fontSize: 12,
                    paddingBottom: Platform.OS !== "ios" ? 3 : 0,
                  },
                ]}
              />
            </View>
            {locationTxt ? (
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={[
                  mainStyles.appTxt,
                  styles.headingLocation,
                  { paddingBottom: Platform.OS !== "ios" ? 3 : 0 },
                ]}>
                {locationTxt}
              </Text>
            ) : null}
            {isAdvertiseLabel ? (
              <Text
                allowFontScaling={false}
                style={[mainStyles.head2Txt, styles.headingLocation]}>
                {helpers.getLocale(localize, "contentType", "advertisement") +
                  category}
              </Text>
            ) : (
              <Text
                allowFontScaling={false}
                style={[mainStyles.head2Txt, styles.headingLocation]}>
                {moment(contentInfo.createdAt).format("DD.MM.YYYY") +
                  " " +
                  category}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <_Like
          key={`like_${contentInfo._id}`}
          contentInfo={contentInfo}
          likeFlag={state.likeFlag}
          likeToggle={() => likeToggle()}
          likeCountSet={() => likeCountSet()}
          {...props}
        />
      </View>
    );
  };
  const likeToggle = () => {

    setstate({ ...state,likeFlag: !state.likeFlag });
  };

  const commentCountSet = (flag = true) => {
    setstate({
      ...state,
      commentCount: flag
        ? ++state.commentCount
        : --state.commentCount,
      update: false,
    });
  };

  const _renderSection2 = () => {

    if (contentInfo.typeContent.toLocaleLowerCase() === "image") {
      return (
        <VisibilitySensor
          onChange={(visible) =>
            visible ? props.setActiveVideo(contentInfo?.id) : null
          }>
          <_ImageWrap
            key={`ImageWrap_${contentInfo._id}`}
            contentInfo={contentInfo}
            index={props.index}
            likeFlag={state.likeFlag}
            likeToggle={() => likeToggle()}
            likeCountSet={() => likeCountSet()}
            {...props}
          />
        </VisibilitySensor>
      );
    } else {
      return (
        <VisibilitySensor onChange={(visible)=>visible?props.setActiveVideo(contentInfo?.id):null}>
          <_PostVideo
            key={`PostVideo_${contentInfo._id}`}
            vidKey={props.itemKey + contentInfo._id}
            contentInfo={contentInfo}
            likeFlag={state.likeFlag}
            index={props.index}
            likeToggle={() => likeToggle()}
            likeCountSet={() => likeCountSet()}
            {...props}
          />
        </VisibilitySensor>
      );
    }
  };
  const likeCountSet = () => {

    setstate({ ...state,likeFlag: !state.likeFlag, update: false });
    // setState({ likeCount: likeFlag ? --state.likeCount : ++state.likeCount, likeFlag: !likeFlag, update: false })
  };
  const _renderSection3 = () => {

    let isVideo =
      contentInfo.typeContent.toLocaleLowerCase() === "image" ? false : true;
    let display = { display: isVideo ? "flex" : "none" };

    return (
      <View style={{ ...sty.padH10, borderWidth: 0 }}>
        {_renderDescription()}
      </View>
    );
  };

  const _getUserInfo = (user) => {

    let cb = {
      success: (res) => {
        navProps.activeNav.navigate("OthersProfile", {
          userInfo: {
            username: user,
            userId: res.data.id,
          },
        });
      },
      error: (err) => {},
      complete: () => {},
    };
    let header = helpers.buildHeader({ authorization: loginData.token });
    API.getUserInfo({}, cb, header, user);
  };
  const _hashPress = (item) => {
    helpers.hashtagExploreNavigate(item);
  };

 const  _renderDescription = () => {


    let isVideo =
      contentInfo.typeContent.toLocaleLowerCase() === "image" ? false : true;
    let readMoreText = helpers.getLocale(
      localize,
      "contentType",
      "readMore",
    );
    let readLessText = helpers.getLocale(
      localize,
      "contentType",
      "readLess",
    );
    if (!contentInfo.description && !contentInfo.title) return;
    let lenghtcut = (globals.WINDOW_WIDTH * 2) / 5.55;

    if (contentInfo.description.length < lenghtcut) {
      return (
        <View
          style={
            ([styles.description], { flexDirection: "column", paddingTop: 7 })
          }>
          {contentInfo.typeContent == "video" && contentInfo.title ? (
            <Text
              allowFontScaling={false}
              style={{ fontWeight: "bold", color: "black" }}>
              {contentInfo.title}
            </Text>
          ) : null}
          {contentInfo.description ? (
            <View>
              {contentInfo.description.split("\n").map((dt, i) => {
                return (
                  <Text key={i} allowFontScaling={false}>
                    <_DescriptionLink
                      onUserNamePress={_getUserInfo}
                      // onHashPress={_hashPress}
                      text={dt}
                    />
                  </Text>
                );
              })}
            </View>
          ) : null}
        </View>
      );
    } else {
      var trimmedDescription = contentInfo.description.substr(
        0,
        lenghtcut - 45,
      );
      trimmedDescription = trimmedDescription.substr(
        0,
        Math.min(
          trimmedDescription.length,
          trimmedDescription.lastIndexOf(" "),
        ),
      );
      const textData = state.readMore
        ? contentInfo.description.trim()
        : trimmedDescription;

      return (
        <View>
          <View
            style={
              ([styles.description], { flexDirection: "column", paddingTop: 7 })
            }>
            {contentInfo.typeContent == "video" && contentInfo.title ? (
              <Text
                allowFontScaling={false}
                style={{
                  fontWeight: "bold",
                  color: "black",
                  paddingTop: 7,
                }}>
                {contentInfo.title}
              </Text>
            ) : null}
            {contentInfo.description ? (
              <View>
                {textData.split("\n").map((dt, i) => {
                  return state.readMore ? (
                    <Text key={i} allowFontScaling={false}>
                      <_DescriptionLink
                        onUserNamePress={_getUserInfo}
                        // onHashPress={_hashPress}
                        text={dt}
                      />
                      <Text>{"\n"}</Text>
                    </Text>
                  ) : (
                    <Text key={i} allowFontScaling={false} numberOfLines={2}>
                      <_DescriptionLink
                        onUserNamePress={_getUserInfo}
                        // onHashPress={_hashPress}
                        text={dt}
                      />
                    </Text>
                  );
                })}
              </View>
            ) : null}
          </View>

          <View style={{ flex: 1, alignContent: "flex-end" }}>
            {
              <TouchableOpacity
                onPress={() => {
                  setstate({ ...state,readMore: !state.readMore });
                }}
                style={state.readMore ? styles.readMore : styles.readMore}>
                <Text
                  allowFontScaling={false}
                  style={[
                    mainStyles.appTxtLight,
                    styles.headingLocation,
                    { color: colors.icons },
                  ]}>
                  {state.readMore ? readLessText : readMoreText}
                </Text>
                {/* <Text style={[mainStyles.appTxtLight, { color: colors.primastyles.headingLocationryColor }]}>{readMore ? 'Read less' : 'Read more'}</Text> */}
              </TouchableOpacity>
            }
          </View>
        </View>
      );
    }
  };
 const _renderSection4 = () => {

    return (
      <_PostMeta
        key={`post_meta_${contentInfo._id}`}
        setPostMetaRef={setPostMetaRef}
        contentInfo={contentInfo}
        likeFlag={state.likeFlag}
        viewCount={state.viewCount}
        commentCount={state.commentCount}
        commentCountSet={(flag) => commentCountSet(flag)}
        likeCount={state.likeCount}
        {...props}
      />
    );
  };
  const _renderView = () => {

    if (props.fullView) {
      return (
        <ScrollView>
          <View
            style={[
              mainStyles.postListItem,
              {
                ...sty.flex1,
                ...sty.appBorder,
               // shadowOpacity: 25,
                marginVertical: 5,
              },
            ]}>
            {_renderSection1()}
            {/* {_renderSection2()} */}
            {_renderSection3()}
            {_renderSection4()}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={mainStyles.postListItem}>
          {/* <Text>Media post2</Text> */}
          {_renderSection1()}
          {/* <MediaSection1 props={props}/> */}
          {/* {_renderSection2()} */}
          {_renderSection3()}
          {_renderSection4()}
        </View>
      );
    }
  };

  return (
    <View style={[mainStyles.rootView]}>
      <View style={{ overflow: 'hidden', paddingBottom: 10 }}>
        {_renderView()}
      </View>
      </View>
  )
}

export default memo(MediaPost)