import React,{memo, useLayoutEffect} from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  Text,
} from "react-native";
import { connect } from "react-redux";
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
import {
  _Spacer,
  _Icon,
  _ListView,
  _B,
  _Button,
  _Lang,
  _Loading,
  _GradiantView,
} from "../../../custom";
import { mainLayoutHoc } from "../../../hoc";
import mainStyles from "../../../../assets/styles/MainStyles";
import styles from "./styles";
import { map, find } from "lodash";

import {
  _ImageWrap,
  _Like,
  _PostVideo,
  _PostMeta,
  _DescriptionLink,
} from "../common";
import { setAppData } from "../../../../redux/actions/AppDataActions";
import {
  setCampaignProp,
  pushCampaignProp,
} from "../../../../redux/actions/CampaignsActions";
import { setActiveVideo } from '../../../../redux/actions/VideoAction';
import moment from "moment";
import NavigationService from "../../../navigations/NavigationService";
import FastImage from "react-native-fast-image";

// import VisibilitySensor from "@svanboxel/visibility-sensor-react-native";
import { useState,useEffect ,useRef} from 'react';
import { useDispatch, useSelector} from 'react-redux';

const CampaignParticipant=(props)=> {
  
  const { contentInfo,loader} = props
  
  const dispatch = useDispatch();

  const localize = useSelector(state => state.localize);

  const home = useSelector(state => state.home);
  const campaigns = useSelector(state => state.campaigns);
  const appData = useSelector(state => state.appData);
  const loginData = useSelector(state => state.loginData);
  const navProps = useSelector(state => state.navProps);
  const videoProps = useSelector(state => state.video)
  

  const [state, setstate]= useState({
    showMore: false,
    contentId: props.contentInfo._id,
    likeFlag: props.contentInfo.isSelfLike,
    likeCount: props.contentInfo.likeCount,
    commentCount: props.contentInfo.commentCount,
    viewCount: props.contentInfo.viewCount,
    readMore: false,
    update: true,
  })
  let postMetaRef=useRef(null)
  let _isMounted=useRef(null)
  const loaderRef = useRef('loader');

  useEffect(()=>{
    _isMounted.current=true;
    globals.setUserData("part" + props.contentInfo._id);
  },[]);

  useLayoutEffect(()=>{
    _isMounted.current=false
  });
  
  useEffect(() =>{
    if (
      props.contentInfo.likeCount  &&
      !state.update
    ) {
      if (_isMounted) {
        setstate({ ...state,update: true });
      }
    } else if (
      props.contentInfo.commentCount  &&
      !state.update
    ) {
      if (_isMounted) {
        setstate({ ...state,update: true });
      }
    }
  },[props.contentInfo.likeCount,props.contentInfo.commentCount]);


const  setPostMetaRef = (ref) => (postMetaRef.current = ref);

const getCampaignInfo = (campaignSlug) => {
 
  let cb = {
    success: (res) => {
      if (find(campaigns["extra"], (dt) => dt._id == res.data._id)) {
        dispatch(setCampaignProp({
          prop: "extra",
          arr: map(campaigns["extra"], (dt) =>
            dt._id == res.data._id ? Object.assign({}, dt, res.data) : dt,
          ),
        }));
      } else if (campaigns["extra"] === null) {
        dispatch(setCampaignProp({ prop: "extra", arr: [res.data] }));
      } else {
        dispatch(pushCampaignProp({ prop: "extra", arr: [res.data] }));
      }

      navProps.activeNav.navigate("CompanyCampaign", {
        campaignInfo: res.data,
        apiType: "extra",
      });
    },
    error: (err) => {},
    complete: () => loader.hideLoader(),
  };
  let header = helpers.buildHeader({ authorization: loginData.token });

  //refs.loader.load();

  API.getCamapignInfo({}, cb, header, campaignSlug);
};
function updateViews(val) {
  if (_isMounted) {
    setstate({ ...state,viewCount: val });
  }
}
const _renderSection1 = () => {

  const { createdBy ,users} = contentInfo;

  var userNav = () => {
    navProps.activeNav.navigate("OthersProfile", {
      userInfo: {
        username: createdBy?.username || users?.username,
        userId: createdBy?._id || users?._id
      },
    });
  };

  let category = contentInfo.category
    ? helpers.getLocale(localize, "contentType", "in")
    : "";
  if (category !== "") {
    category +=
      contentInfo.category instanceof Array
        ? " " + contentInfo.category[0].categoryName
        : " " + contentInfo.category;
  }
  let locationTxt = helpers.getPostLocation(contentInfo.location);
  // if (locationTxt.length > 25) {
  //     locationTxt = locationTxt.substr(0, 25);
  //     locationTxt = locationTxt + "...";
  // }

  let campaignOwner = (
    <FastImage
      source={images.user}
      style={{ height: 35, width: 35, backgroundColor: "white" }}
    />
  );
  if (contentInfo.campaignId) {
    if (contentInfo.campaignId.createdBy) {
      campaignOwner = (
        <FastImage
          source={
            contentInfo.campaignId.createdBy.miniProfileUrl
              ? { uri: contentInfo.campaignId.createdBy.miniProfileUrl }
              : images.user
          }
          style={{ height: 35, width: 35, backgroundColor: "red" }}
        />
      );
    }
  }
  let userImg = (
    <Image
      source={
        createdBy?.resizeProfileUrl || users?.profileImage
          ? {
              uri:
                createdBy?.resizeProfileUrl || globals.live == false
                  ? "https://stagingassets.picstagraph.com/" +
                    users?.profileImage
                  : "https://assets.picstagraph.com/" + users?.profileImage,
            }
          : images.user
      }
      style={{ height: 35, width: 35 }}
    />
  );

  return (
    <View style={styles.headerstyle}>
      <View style={{ width: 45, ...sty.jCenter }}>
        <View style={styles.userBox}>
          <TouchableOpacity onPress={userNav}>
            <FastImage
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
              style={{ height: 35, width: 35, backgroundColor: "white" }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ ...sty.flex1 }}>
        {/* <TouchableOpacity onPress={() => { if (contentInfo.navigateToFullView) contentInfo.navigateToFullView(contentInfo) }}> */}
        <TouchableOpacity onPress={userNav}>
          <View style={{ ...sty.fRow, flexWrap: "wrap" }}>
            {/* </View> */}
            <_Lang
              text={createdBy?.username || users?.username}
              onPress={userNav}
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
            {/* <_Lang text={"contentType.in_the"} style={mainStyles.headTxt} />
                          <_Lang text={"contentType.contest_space"} style={mainStyles.boldHeadTxt} onPress={campaignNav} />
                          <_Lang text={"contentType.of"} style={mainStyles.headTxt} /> 
                          <_Lang text={' '+campaignCreator} style={mainStyles.boldHeadTxt} pureText onPress={campaignUserNav} /> */}
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
          <Text
            allowFontScaling={false}
            style={[mainStyles.head2Txt, styles.headingLocation]}>
            {moment(contentInfo.createdAt).format("DD.MM.YYYY") +
              " " +
              category}
          </Text>
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
const _setVideoPlay = (visible, id) => {

  if (_isMounted == true) {
    visible ? dispatch(setActiveVideo(id)) : null;
  }
};

const _renderSection2 = () => {


  if (contentInfo.typeContent.toLocaleLowerCase() === "image") {
    return (
      // <VisibilitySensor
      //   onChange={(visible) =>
      //     visible ? dispatch(setActiveVideo(contentInfo?.id)) : null
      //   }>
        <_ImageWrap
          key={`ImageWrap_${contentInfo._id}`}
          contentInfo={contentInfo}
          likeFlag={state.likeFlag}
          likeToggle={() => likeToggle()}
          likeCountSet={() => likeCountSet()}
          index={props.index}
          {...props}
        />
      // </VisibilitySensor>
    );
  } 
  // else {
  //   return (
      // <VisibilitySensor
      //   onChange={(visible) => {
      //     if (_isMounted) {
      //       _setVideoPlay(visible, contentInfo?.id);
      //     }
      //   }}>
        // <_PostVideo
        //   key={`PostVideo_${contentInfo._id}`}
        //   vidKey={props.itemKey + contentInfo._id}
        //   contentInfo={contentInfo}
        //   likeFlag={state.likeFlag}
        //   likeToggle={() => likeToggle()}
        //   likeCountSet={() => likeCountSet()}
        //   index={props.index}
        //   {...props}
        // />
      // </VisibilitySensor>
    // );
  // }
};
const contestClickApi = (contentInfo) => {
 
  let cb = {
    success: (res) => {
      // console.log("res :", res)
    },
    error: (err) => {},
    complete: () => {},
  };
  // let postType = helpers.getBackendPostType(contentInfo, contentInfo.postType, globals.POST_TYPES);
  let apiData = {
    id: contentInfo._id,
  };
  let header = helpers.buildHeader({ authorization: loginData.token });
  API.companyCampaginPostClick({}, cb, header, apiData);
};

const _renderGradiantSection = () => {


  const { createdBy } = contentInfo;

  var campaignNav = () => {
    if (contentInfo?.campaignId || contentInfo?.campaigns) {
      // let campaignObj = appData.campaignPosts[contentInfo.campaignId._id];
      let campaignObj = undefined;
      if (
        campaigns !== undefined &&
        campaigns["extra"] !== undefined &&
        campaigns["extra"] !== null
      )
        campaignObj = find(
          campaigns["extra"],
          (dt) => dt._id == contentInfo.campaignId._id,
        );

      helpers.pauseVideo(true);

      if (campaignObj !== undefined) {
        navProps.activeNav.navigate("CompanyCampaign", {
          campaignInfo: campaignObj,
          apiType: "extra",
        });
      } else {
        getCampaignInfo(
          contentInfo?.campaignId?.slug || contentInfo?.campaigns[0]?.slug,
        );
        contestClickApi(contentInfo);
      }
    }
  };

  var campaignUserNav = () => {
    if (contentInfo.campaignId) {
      navProps.activeNav.navigate("OthersProfile", {
        userInfo: {
          username:
            contentInfo.campaignId &&
            contentInfo.campaignId.createdBy &&
            contentInfo.campaignId.createdBy.username
              ? contentInfo.campaignId.createdBy.username
              : "",
          userId:
            contentInfo.campaignId &&
            contentInfo.campaignId.createdBy &&
            contentInfo.campaignId.createdBy._id
              ? contentInfo.campaignId.createdBy._id
              : "",
        },
      });
    }
  };

  let campaignName = "";
  let campaignOwner = (
    <FastImage
      source={images.user}
      style={{ height: 40, width: 40, backgroundColor: "white" }}
    />
  );
  if (contentInfo?.campaignId || contentInfo?.campaigns) {
    if (
      contentInfo?.campaignId?.createdBy ||
      contentInfo?.campaingsUsers[0]?.profileImage
    ) {
      campaignOwner = (
        <FastImage
          source={
            contentInfo?.campaignId?.createdBy?.resizeProfileUrl
              ? { uri: contentInfo.campaignId.createdBy.resizeProfileUrl }
              : contentInfo?.campaingsUsers[0]?.profileImage
              ? {
                  uri:
                    globals.live == false
                      ? "https://stagingassets.picstagraph.com/" +
                        contentInfo?.campaingsUsers[0]?.profileImage
                      : "https://assets.picstagraph.com/" +
                        contentInfo?.campaingsUsers[0]?.profileImage,
                }
              : images.user
          }
          style={{ height: 35, width: 35, backgroundColor: "white" }}
          resizeMode="cover"
        />
      );
    }
    campaignName =
      (localize.activeLanguage !== "en" &&
        contentInfo?.campaignId?.titleDe || contentInfo?.campaigns)
     
        ? contentInfo?.campaignId?.titleDe || contentInfo?.campaigns[0]?.titleDe
        : contentInfo?.campaignId?.title || contentInfo?.campaigns[0]?.title;
  }

  let campaignCreator =
    contentInfo?.campaignId || contentInfo?.campaingsUsers &&
      contentInfo?.campaignId?.createdBy || contentInfo?.campaingsUsers[0]?.username &&
        contentInfo?.campaignId?.createdBy?.username || contentInfo?.campaingsUsers[0]?.username
      ? contentInfo?.campaignId?.createdBy?.username || contentInfo?.campaingsUsers[0]?.username
        : ""

  const _TabIcon = (props) => {
    const { focused, image1, image2, text } = props;
    return (
      <View style={{ marginBottom: 10 }}>
        <Image
          source={focused ? image2 : image1}
          style={{ height: 25, width: 25 }}
        />
      </View>
    );
  };

  return (
    // <_GradiantView  }>
    <TouchableOpacity
      style={{
        ...sty.fRow,
        ...sty.padV10,
        paddingRight: 10,
        backgroundColor: "#f7f7f7",
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
      }}
      onPress={campaignNav}>
      <View style={{ width: 50, ...sty.jCenter, ...sty.aCenter }}>
        <View style={styles.userImgWrap}>
          {/* <TouchableOpacity onPress={campaignUserNav}>{campaignOwner}</TouchableOpacity> */}
          {campaignOwner}
        </View>
      </View>
      <View style={{ ...sty.flex1 }}>
        <View style={{ ...sty.fRow, flexWrap: "wrap" }}>
          <_Lang
            // onPress={campaignNav}
            text={campaignName}
            style={[
              {
                color: "black",
                fontFamily: "Poppins-ExtraBold",
                paddingTop: Platform.OS !== "ios" ? 4 : 0,
                paddingBottom: Platform.OS !== "ios" ? 4 : 0,
              },
              styles.headingLocation,
            ]}
            pureText
          />
        </View>
        <_Lang
          // onPress={campaignUserNav}
          text={campaignCreator}
          style={[
            {
              color: "black",
              fontFamily: "Poppins-Light",
              fontWeight: "300",
            },
            styles.headingLocation,
          ]}
          pureText
        />
      </View>

      {/* {contentInfo.winnerRank ? (
        <View style={{ ...sty.jCenter, ...sty.aCenter }}>
          <View style={styles.winnerStarCnt}>
            <Text
              allowFontScaling={false}
              style={[styles.starCnt, { color: colors.black }]}>
              {contentInfo.winnerRank}
            </Text>
          </View>
          <View style={styles.starImg}>
            <Image
              source={require("../../../../assets/images/whiteStar.png")}
              style={styles.starCss}
            />
          </View>
        </View>
      ) : null} */}
      {contentInfo.winnerRank ? (
        <View style={styles.btnContainer}>
          <Text allowFontScaling={false} style={styles.starCnt}>
            {helpers.getLocale(localize, "campaign", "winner")}
          </Text>
        </View>
      ) : props.finalist ? (
        <View style={styles.btnContainer}>
          <Text allowFontScaling={false} style={styles.starCnt}>
            {helpers.getLocale(localize, "campaign", "popular")}
          </Text>
        </View>
      ) : (
        <View style={styles.btnContainer}>
          <Text allowFontScaling={false} style={styles.starCnt}>
            {helpers.getLocale(
              localize,
              "campaign",
              "participant",
            )}
          </Text>
        </View>
      )}
    </TouchableOpacity>
    // </_GradiantView>
  );
};

const _renderSection3 = () => {


  let titleStyle = {
    display:
      contentInfo.typeContent.toLocaleLowerCase() !== "image"
        ? "flex"
        : "none",
  };

  return (
    <View>
      {_renderGradiantSection()}

      <View style={{ ...sty.padH10, borderWidth: 0 }}>
        {_renderDescription()}
      </View>
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
const likeToggle = () => {

  if (_isMounted) {
    setstate({ ...state,likeFlag: !state.likeFlag });
  }
};

const likeCountSet = () => {

  if (_isMounted) {
    setstate({ ...state,likeFlag: !state.likeFlag, update: false });
  }
  // setState({ likeCount: likeFlag ? --state.likeCount : ++state.likeCount, likeFlag: !likeFlag, update: false })
};

const _hashPress = (item) => {
  // helpers.hashtagParticipantNavigate(item)
  helpers.hashtagExploreNavigate(item);
};
const _renderDescription = () => {



  let isVideo =
    contentInfo?.typeContent.toLocaleLowerCase() === "image" ? false : true;
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
  if (!contentInfo?.description && !contentInfo?.title) return;
  let lenghtcut = (globals.WINDOW_WIDTH * 2) / 5.55;

  if (contentInfo?.description?.length < lenghtcut) {
    return (
      <View
        style={
          ([styles.description], { flexDirection: "column", paddingTop: 7 })
        }>
        {contentInfo?.typeContent == "video" && contentInfo?.title ? (
          <Text
            allowFontScaling={false}
            style={{ fontWeight: "bold", color: "black" }}>
            {contentInfo?.title}
          </Text>
        ) : null}
        {contentInfo?.description ? (
          <View>
            {contentInfo?.description.split("\n").map((dt, i) => {
              return (
                <Text key={i} allowFontScaling={false}>
                  <_DescriptionLink
                    key={i}
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
    var trimmedDescription = contentInfo?.description?.substr(
      0,
      lenghtcut - 45,
    );
    trimmedDescription = trimmedDescription?.substr(
      0,
      Math.min(
        trimmedDescription.length,
        trimmedDescription.lastIndexOf(" "),
      ),
    );
    const textData = state.readMore
      ? contentInfo?.description.trim()
      : trimmedDescription;

    return (
      <View>
        <View
          style={
            ([styles.description], { flexDirection: "column", paddingTop: 7 })
          }>
          {contentInfo?.typeContent == "video" && contentInfo?.title ? (
            <Text
              allowFontScaling={false}
              style={{
                fontWeight: "bold",
                color: "black",
                paddingTop: 7,
              }}>
              {contentInfo?.title}
            </Text>
          ) : null}
          {contentInfo?.description ? (
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

        {contentInfo?.description ? (
          <View style={{ flex: 1, alignContent: "flex-end" }}>
            {
              <TouchableOpacity
                onPress={() => {
                  if (_isMounted) {
                    setstate({ ...state,readMore: !state.readMore });
                  }
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
        ) : null}
      </View>
    );
  }
};
const commentCountSet = (flag = true) => {
  if (_isMounted) {
    setstate({
      ...state,
      commentCount: flag
        ? ++state.commentCount
        : --state.commentCount,
      update: false,
    });
  }
};
const _renderSection4 = () => {

  return (
    <_PostMeta
      key={`post_meta_${contentInfo._id}`}
      setPostMetaRef={setPostMetaRef}
      contentInfo={contentInfo}
      viewCount={state.viewCount}
      likeFlag={state.likeFlag}
      likeCount={state.likeCount}
      commentCount={state.commentCount}
      commentCountSet={(flag) => commentCountSet(flag)}
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
            { ...sty.flex1, ...sty.appBorder },
          ]}>
          {_renderSection1()}
          {_renderSection2()}
          {_renderSection3()}
          {_renderSection4()}
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={mainStyles.postListItem}>
        {_renderSection1()}
        {_renderSection2()}
        {_renderSection3()}
        {_renderSection4()}
      </View>
    );
  }
};

  return (
    <View style={[mainStyles.rootView]}>
        <View style={{ paddingBottom: 10 }}>{_renderView()}</View>
        <_Loading 
        Ref={loaderRef} 
        />
      </View>
  )
}

export default memo(CampaignParticipant)