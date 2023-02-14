import React, { Component, useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  Text,
} from "react-native";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Item } from "native-base";
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
import { _Spacer, _Icon, _ListView, _B, _Button, _Lang } from "../../../custom";
import { mainLayoutHoc } from "../../../hoc";
import mainStyles from "../../../../assets/styles/MainStyles";
import styles from "./styles";

import moment from "moment";
import {
  _ImageWrap,
  _Like,
  _PostVideo,
  _PostMeta,
  _DescriptionLink,
} from "../common";
import NavigationService from "../../../navigations/NavigationService";
import FastImage from "react-native-fast-image";
import { setActiveVideo } from "../../../../redux/actions/VideoAction";
// import VisibilitySensor from "@svanboxel/visibility-sensor-react-native";

export default function CreatorCampaign(props){

  const [contentId,setContentId] = useState(props.contentInfo._id);
  const [likeFlag,setLikeFlag] = useState(props.contentInfo.isSelfLike);
  const [likeCount,setLikeCount]= useState(props.contentInfo.likeCount);
  const [commentCount,setCommentCount] = useState(props.contentInfo.commentCount);
  const [viewCount,setViewCount] = useState(props.contentInfo.viewCount);
  const [update,setUpdate] = useState(true);
  const [readMore,setReadMore] = useState(false);
  const postMetaRef = useRef(null);
  
  const video = useSelector(state => state.video);
  const localize = useSelector(state => state.localize);

  const home = useSelector(state => state.home);
  // const campaigns = useSelector(state => state.campaigns);
  // const appData = useSelector(state => state.appData);
  // const loginData = useSelector(state => state.loginData);
  const navProps = useSelector(state => state.navProps);
  // const videoProps = useSelector(state => state.video)

  useEffect(()=>{
    globals.setUserData("blog" + props.contentInfo._id, this);
  },[]);

  useEffect(()=>{
    if (
      props.contentInfo.likeCount !== likeCount &&
      !update
    ) {
      setUpdate(true);
    } else if (
      props.contentInfo.commentCount !==
        commentCount &&
      !update
    ) {
      setUpdate(true);
    }
  },[props.contentInfo.likeCount,props.contentInfo.commentCount]);

  useEffect(()=>{
    if (props.contentInfo._id !== contentId) {
        setLikeCount(props.contentInfo.likeCount);
        setLikeFlag(props.contentInfo.isSelfLike);
        setCommentCount(props.contentInfo.commentCount);
        setViewCount(props.contentInfo.viewCount);
        setContentId(props.contentInfo._id);
    }else if( props.contentInfo.likeCount !== likeCount &&
      props.contentInfo.likeCount != undefined &&
      update){
     setLikeCount(props.contentInfo.likeCount);
     setLikeFlag(props.contentInfo.isSelfLike);
    }else if( props.contentInfo.viewCount > viewCount &&
      props.contentInfo.viewCount != undefined){
     setViewCount(props.contentInfo.viewCount);
    } else if( props.contentInfo.commentCount !== commentCount &&
      props.contentInfo.commentCount != undefined &&
      update){
      setCommentCount(props.contentInfo.commentCount)
    }
  },[props.contentInfo._id,props.contentInfo.likeCount,props.contentInfo.viewCount,props.contentInfo.commentCount])

  const setPostMetaRef = (ref) => (postMetaRef = ref);


  const _renderSection1 = () => {
    const { contentInfo} = props;
    console.log("1212121", contentInfo)
    let { createdBy } = contentInfo;

    var userNav = () => {
      navProps.activeNav.push("OthersProfile", {
        userInfo: {
          username: createdBy.username,
          userId: createdBy._id,
        },
      });
    };

    let category = contentInfo.category
      ? helpers.getLocale(localize, "contentType", "in")
      : "";
    if (category != "") {
      category +=
        contentInfo.category instanceof Array
          ? " " + contentInfo.category[0].categoryName
          : " " + contentInfo.category;
    }

    if (contentInfo.location) {
      contentInfo.location = JSON.parse(JSON.stringify(contentInfo.location));
    }

    let locationTxt = helpers.getPostLocation(contentInfo.location);
    // if(locationTxt.length>25) {
    //     locationTxt = locationTxt.substr(0, 25);
    //     locationTxt = locationTxt+"...";
    // }

    return (
      <View style={styles.headWrap}>
        <View style={{ width: 45, ...sty.jCenter }}>
          <View style={styles.userImgWrap}>
            <TouchableOpacity onPress={userNav}>
              <FastImage
                source={
                  createdBy.resizeProfileUrl
                    ? { uri: createdBy.resizeProfileUrl } 
                    : images.user
                }
                style={styles.userImg}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ ...sty.flex1 }}>
          <TouchableOpacity onPress={userNav}>
            <View style={styles.headingWrap}>
              <_Lang
                text={createdBy.username + " "}
                style={[
                  mainStyles.boldHeadTxt,
                  {
                    lineHeight: 18,
                    fontSize: 12,
                    paddingBottom: Platform.OS !== "ios" ? 3 : 0,
                  },
                ]}
                pureText
              />
              <_Lang
                text="contentType.published_a"
                style={[mainStyles.headTxt, { lineHeight: 18, fontSize: 12 }]}
              />
              <_Lang
                text={"contentType.blog"}
                style={[mainStyles.headTxt, { lineHeight: 18, fontSize: 12 }]}
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
                ]}
              >
                {locationTxt}
              </Text>
            ) : null}
            <Text
              allowFontScaling={false}
              style={[mainStyles.head2Txt, styles.headingLocation]}
            >
              {moment(contentInfo.createdAt).format("DD.MM.YYYY") +
                " " +
                category}
            </Text>
          </TouchableOpacity>
        </View>
        <_Like
          key={`like_${contentInfo._id}`}
          contentInfo={contentInfo}
          likeFlag={likeFlag}
          likeToggle={() => likeToggle()}
          likeCountSet={() => likeCountSet()}
          {...props}
        />
      </View>
    );
  };

  const likeToggle = () => {
    setLikeFlag(!likeFlag);
  };

   const likeCountSet = () => {
     setLikeFlag(!likeFlag);
     setUpdate(false);
  };

  const _renderSection3 = () => {
    const { contentInfo } = props;
    let realDisplay = { display: contentInfo.title ? "flex" : "none" };
    let display = { display: "flex" };
    return (
      <View style={{ ...sty.padH10 }}>
        <View style={[styles.titleWrap, realDisplay, { borderWidth: 0 }]}>
          <_Lang
            onPress={() => contentInfo.navigateToFullView(contentInfo)}
            style={[
              mainStyles.boldHeadTxt,
              {
                fontSize: 14,
                lineHeight: 18,
                paddingBottom: Platform.OS !== "ios" ? 4 : 0,
              },
            ]}
            text={contentInfo.title}
            pureText
          />
        </View>
        {/* <Text
          key={`viewcount_${contentInfo._id}`}
          style={[
            mainStyles.head2Txt,
            styles.headingLocation,
            { color: colors.heading2, paddingTop: 1, fontWeight: "bold" },
            contentInfo.title === ""
              ? { paddingBottom: Platform.OS !== "ios" ? 9 : 5 }
              : null,
          ]}
        >
          {this.state.viewCount || 0}
          {this.state.viewCount == 0 || this.state.viewCount == 1
            ? " View"
            : " Views"}
        </Text> */}
        {_renderDescription()}
      </View>
    );
  };

  const _renderDescription = () => {
    const { contentInfo } = props;
    
    let isVideo =
      contentInfo.typeContent.toLocaleLowerCase() === "image" ? false : true;
    let readMoreText = helpers.getLocale(
      localize,
      "contentType",
      "readMore"
    );
    if (!contentInfo.description) return;
    let lenghtcut = (globals.WINDOW_WIDTH * 2) / 5.55;

    if (contentInfo.description.length < lenghtcut) {
      return (
        <View style={[styles.description, { flexDirection: "column" }]}>
          <View>
            {contentInfo.description
              .trim()
              .split("\n")
              .map((dt, i) => {
                return (
                  <Text key={i} allowFontScaling={false}>
                    <_DescriptionLink
                      onUserNamePress={_getUserInfo}
                      onHashPress={_hashPress}
                      text={dt}
                    />
                  </Text>
                );
              })}
          </View>
        </View>
      );
    } else {
      var trimmedDescription = contentInfo.description.substr(
        0,
        lenghtcut - 45
      );
      trimmedDescription = trimmedDescription.substr(
        0,
        Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" "))
      );
      const textData = readMore
        ? contentInfo.description.trim()
        : trimmedDescription.trim();

      return (
        <View>
          <View
            style={[
              styles.description,
              { borderWidth: 0, flexDirection: "column" },
            ]}
          >
            <View>
              {textData.split("\n").map((dt, i) => {
                return readMore ? (
                  <Text key={i} allowFontScaling={false}>
                    <_DescriptionLink
                      onUserNamePress={_getUserInfo}
                      onHashPress={_hashPress}
                      text={dt}
                    />
                  </Text>
                ) : (
                  <Text key={i} allowFontScaling={false} numberOfLines={2}>
                    <_DescriptionLink
                      onUserNamePress={_getUserInfo}
                      onHashPress={_hashPress}
                      text={dt}
                    />
                  </Text>
                );
              })}
            </View>
          </View>

          <View style={{ flex: 1, alignContent: "flex-end" }}>
            {
              <TouchableOpacity
                onPress={() => {
                  setReadMore(!readMore);
                }}
                style={readMore ? styles.readMore : styles.readMore}
              >
                <Text
                  style={[
                    mainStyles.appTxtLight,
                    styles.headingLocation,
                    { color: colors.icons },
                  ]}
                >
                  {readMore ? null : readMoreText}
                </Text>
                {/* <Text style={[mainStyles.appTxtLight, { color: colors.primaryColor}]}>{readMore ? 'Read less' : 'Read more'}</Text> */}
              </TouchableOpacity>
            }
          </View>
        </View>
      );
    }
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

  const commentCountSet = (flag = true) => {
    setCommentCount(flag ? ++commentCount : --commentCount);
    setUpdate(false);
  };

  const _renderSection4 = () => {
    const { contentInfo } = props;
    return (
      <_PostMeta
        key={`post_meta_${contentInfo._id}`}
        setPostMetaRef={setPostMetaRef}
        contentInfo={contentInfo}
        viewCount={viewCount}
        likeFlag={likeFlag}
        likeCount={likeCount}
        commentCount={commentCount}
        commentCountSet={(flag) => commentCountSet(flag)}
        {...props}
      />
    );
  };

  const _renderView = () => {
    const { contentInfo} =props;
    if (props.fullView) {
      let { createdBy } = contentInfo;
      var messageNav = () => {
        navProps.activeNav.navigate("NewMessage", {
          userInfo: {
            username: createdBy.username,
            userId: createdBy._id,
            profileUrl: createdBy.profileUrl,
          },
        });
      };
      return (
        <ScrollView>
          <View
            style={{
              ...sty.flex1,
              backgroundColor: "#fff",
              ...sty.appBorder,
              overflow: "hidden",
            }}
          >
            {_renderSection1()}
            {/* {_renderSection2()} */}
            {_renderSection3()}
            {_renderSection4()}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View>
          {_renderSection1()}
          {/* {_renderSection2()} */}
          {_renderSection3()}
          {_renderSection4()}
        </View>
      );
    }
  };

  _renderSection2 = () => {
    const { contentInfo } = props;
    let mediaWrap = props.fullView
      ? { ...sty.pad5, backgroundColor: "#fff" }
      : {};
    if (contentInfo.typeContent.toLocaleLowerCase() === "image") {
      return (
        // <View style={mediaWrap}>
        <VisibilitySensor
          onChange={(visible) =>
            visible ? props.setActiveVideo(contentInfo?.id) : null
          }>
          <_ImageWrap
            key={`ImageWrap_${contentInfo._id}`}
            contentInfo={contentInfo}
            likeFlag={likeFlag}
            likeToggle={() => likeToggle()}
            likeCountSet={() => likeCountSet()}
            index={props.index}
            {...props}
            fullViewNav={false}
          />
        </VisibilitySensor>
      );
    } else {
      return (
        // <View style={mediaWrap}>
        <VisibilitySensor
          onChange={(visible) =>
            visible ? props.setActiveVideo(contentInfo?.id) : null
          }>
          <_PostVideo
            key={`PostVideo_${contentInfo._id}`}
            contentInfo={contentInfo}
            likeFlag={likeFlag}
            likeToggle={() =>likeToggle()}
            likeCountSet={() => likeCountSet()}
            index={props.index}
            {...props}
          />
        </VisibilitySensor>
      );
    }
  };

  return(
    <View style={[mainStyles.rootView]}>{_renderView()}</View>
  )
}