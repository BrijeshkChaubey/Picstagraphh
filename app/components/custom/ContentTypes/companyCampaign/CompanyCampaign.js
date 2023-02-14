import React, { useEffect, useLayoutEffect, useRef, useState,memo } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Text,
  Linking,
  Alert,
  ImageBackground,
  Modal,
  StatusBar,
  Pressable,
  Dimensions,
} from "react-native";
//import Video from "react-native-video";
import Video from "react-native-video"
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionSheet } from "native-base";
import Share from "react-native-share";
import {
  POST_TYPES,
  SHARE_URL,
  WEB_URL,
  CONTEST_TYPE,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from "../../../../configs/libs/globals";
import {
  globals,
  helpers,
  colors,
  fonts,
  images,
  sty,
  API,
} from "../../../../configs";
import {
  _Icon,
  _Button,
  _Lang,
  _GradiantView,
  _TapHandler,
} from "../../../custom";
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
import { TabView } from "react-native-tab-view";
import {
  setParticipantProp,
  setCompanyRefreshIndicator,
} from "../../../../redux/actions/CompanyParticipantAction";
import { setCampaignProp } from "../../../../redux/actions/CampaignsActions";
import { setAppData } from "../../../../redux/actions/AppDataActions";
import FastImage from "react-native-fast-image";
import FindmoreCamp from "../../../screens/afterLogin/campaign/companyCampaign/options/FindmoreCamp";
import RBSheet from "react-native-raw-bottom-sheet";
import HowTOWin from "../../../screens/afterLogin/campaign/companyCampaign/options/HowTOWin";
import ShareModal from "../common/ShareModal";
import MsgPopup from "../../MsgPopup/MsgPopup";
import {
  base64Converter,
  saveVideoToGallery,
  saveImageToGallery,
} from "./../common/InstaShare";
import TargetIcon from "../../../../assets/images/Icons/svgs/target.svg";
import TrophyIcon from "../../../../assets/images/Icons/svgs/trophy.svg";
import RocketIcon from "../../../../assets/images/Icons/svgs/rocket.svg";
import ListIcon from "../../../../assets/images/Icons/svgs/list.svg";
import EmailIcon from "../../../../assets/images/Icons/svgs/email.svg";
import DetailCard from "../../DetailCard";
import { Card } from "./Card";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
let chanceToWinArr1 = [
  { image: images.insta, text: "share_image_story", points: "+10" },
  { image: images.whatsup, text: "share_image_whatsapp", points: "+10" },
];

let chanceToWinArr2 = [
  { image: images.newsfeed, text: "visit_our_website", points: "+5" },
  { image: images.Group8, text: "visit_our_newsletter", points: "+5" },
  { image: images.insta, text: "visit_our_instagram_profile", points: "+5" },
  { image: images.tiktok, text: "visit_our_tiktok_profile", points: "+5" },
  { image: images.fb, text: "visit_our_facebook", points: "+5" },
  { image: images.youTube1, text: "visit_our_youtube", points: "+5" },
];

function CompanyCompaign(props) {
  console.log('companyCompaign props ==>',props);
  const [sharedActions, setSharedActions] = useState([]);
  const [contentId, setContentId] = useState(props.contentInfo._id);
  const [likeFlag, setLikeFlag] = useState(props.contentInfo.isSelfLike);
  const [commentCount, setCommentCount] = useState(props.contentInfo.commentCount);
  const [likeCount, setLikeCount] = useState(props.contentInfo.likeCount);
  const [videoPaused, setVideoPaused] = useState(true);
  const [surveyComplete, setSurveyComplete] = useState(false);
  const [disabled, setDisable] = useState(false);
  const [update, setUpdate] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [videoProgress, setVideoProgress] = useState({
    currentTime: 0,
    playableDuration: 0,
    seekableDuration: 0,
  });
  const [index, setIndex] = useState(0);
  const [aboutImgHeight, setAboutImgHeight] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [videoModal, setVideoModal] = useState(false);
  const [shareChanceErrorModal, setShareChanceErrorModal] = useState(false);
  const [timeDiff, setTimeDiff] = useState(0);
  const [timerRendered, setTimerRendered] = useState(false);
  const [moveToFavCon, setMoveToFavCon] = useState(false);
  const [videoMuted, setVideMuted] = useState(false);
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
    },
  ]);
  const [howToWinOPen, setHowToWinOPen] = useState(false);

  let postMetaRef = useRef(null);
  let videoWrapRef = useRef(null);
  let timer = useRef(null);
  const RBSheetRef = useRef(null);
  let position = useRef({
    start: null,
    end: null
  })

  const { navProps,
    companyParticipant,
    winnerParticipant,
    participantsPendingReducer,
    participantTop10,
    localize,
    appData,
    loginData,
    campaigns
  } = useSelector(state => state);

  useLayoutEffect(() => {
    const { contentInfo } = props;
    let arrIndex = 0;
    contentInfo.prizeImagesUrls &&
      contentInfo.prizeImagesUrls.forEach((value, indx) => {
        if (value !== "") {
          setRoutes((prevRoute) => [...prevRoute,
          { index: arrIndex, key: "tab" + (indx + 1) }]);
          ++arrIndex;
        }
      });
  }, []);

  useEffect(() => {
    const { contentInfo } = props;
    // const { setInfoRefresh, contentInfo } = props;
    // setInfoRefresh && setInfoRefresh(this._onRefresh);
    // if (this.props.fullView !== undefined && this.props.fullView === true)
    //   setRemoveTimer(this._setClearInterval);

    let arrIndex = 0;
    contentInfo.prizeImagesUrls &&
      contentInfo.prizeImagesUrls.forEach((value, indx) => {
        if (value !== "") {
          setRoutes((prevRoute) => [...prevRoute,
          { index: arrIndex, key: "tab" + (indx + 1) }])
          ++arrIndex;
        }
      });
    if (props.fullView !== undefined && props.fullView === true) {
      focusListener = props.navigation.addListener("didFocus", () => {
        if (moveToFavCon) {
          setMoveToFavCon(false);
        }
      });
    }
    return () => _setClearInterval();
  }, []);


  useEffect(() => {
    if (!moveToFavCon)
      startTimeInterval();
  }, [moveToFavCon]);

  const startTimeInterval = () => {
    const { contentInfo } = props;
    const timeDifference = moment(contentInfo.endDate).diff(moment());

    setTimeDiff(timeDifference);
    setTimerRendered(true);


    timer = setInterval(() => {
      if (timeDiff > 0) {
        setTimeDiff(timeDiff - 1000);
      } else {
        clearInterval(timer);
      }
    }, 1000);
  };


  const _stopTimer = () => {
    setMoveToFavCon(true);
    _setClearInterval();
  };


  const _setClearInterval = () => {
    if (timer !== null) {
      clearInterval(timer);
    }
  };

  useEffect(() => {
    if (
      props.contentInfo.likeCount !== likeCount &&
      !update
    ) {
      setUpdate(true)
    } else if (
      props.contentInfo.commentCount !==
      commentCount &&
      !update
    ) {
      setUpdate(true);
      setUpdate(true)
     
    }
  }, [props.contentInfo.likeCount, props.contentInfo.commentCount]);

  useEffect(() => {
    if (props.contentInfo._id !== contentId) {
      setLikeCount(props.contentInfo.likeCount);
      setLikeFlag(props.contentInfo.isSelfLike);
      setCommentCount(props, contentInfo.commentCount);

    } else if (
      props.contentInfo.likeCount !== likeCount &&
      props.contentInfo.likeCount !== undefined &&
      update
    ) {
      setLikeCount(props.contentInfo.likeCount);
      setLikeFlag(props.contentInfo.isSelfLike);
    } else if (
      props.contentInfo.commentCount !== commentCount &&
      props.contentInfo.commentCount !== undefined &&
      update
    ) {
      setCommentCount(props, props.contentInfo.commentCount);
    }
  }, [props.contentInfo._id, props.contentInfo.likeCount, props.contentInfo.commentCount])

  const _renderBottom = (value) => {
    console.log('renderBottom is called');
    const { contentInfo } = props;
    let { createdBy } = contentInfo;

    var userNav = (user) => {
      navProps.activeNav.navigate("OthersProfile", {
        userInfo: {
          username: user.username,
          userId: user._id,
        },
      });
    };

    let arr = [
      <Text
        key={`arrUserName`}
        onPress={() => {
          userNav(createdBy);
        }}
        allowFontScaling={false}
        style={[mainStyles.boldHeadTxt, { color: "black" }]}>
        {createdBy.username + " "}
      </Text>,
    ];
    let title =
      localize.activeLanguage !== "en" && contentInfo.titleDe
        ? contentInfo.titleDe
        : contentInfo.title;
    if (title === undefined) title = contentInfo.title ? contentInfo.title : "";
    return (
      <View
        style={{ ...sty.jCenter, ...{ alignItems: 'center' } }}>
        <View style={{ ...sty.fRow, ...{ justifyContent: 'center' } }}>
          <_Lang
            text={title}
            pureText
            adjustsFontSizeToFit
            numberOfLines={!props.favoriteView ? 1 : 1}
            style={[
              {
                fontWeight: "bold",
                fontSize: !props.favoriteView ? WINDOW_WIDTH / 18 : WINDOW_WIDTH / 25,
                textAlign: 'center',
              },
              !props.fullView ? { color: "black" } : null,
            ]}
          />

        </View>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: !props.favoriteView ? WINDOW_WIDTH / 27 : WINDOW_WIDTH / 40,
              maxWidth: 200,
              fontWeight: '500',
              color: '#999999'
            }}> 
            {contentInfo?.typeContent == "video" ? helpers.getLocale(localize, "contest", "video_contest") : helpers.getLocale(localize, "contentType", "photoContest")} by
          </Text>
          <Text
            style={{
              fontSize: !props.favoriteView ? WINDOW_WIDTH / 27 : WINDOW_WIDTH / 40,
              maxWidth: 200,
              marginLeft: 5,
              fontWeight: 'bold',
            }}>
            {arr}
          </Text>
        </View>
        {/* {value?null:this._renderTag()} */}
        {/* {value ? null : this._renderContestButton()}
        {value ? this.renderTimer() : null} */}

      </View>
    );
  }


  const _renderTopSection = () => {
    console.log('renderTopSection is called');
    const { contentInfo } = props;
    return (
      // <ImageBackground
      //   style={
      //     !this.props.favoriteView ? styles.bgimagewrap : styles.bgimagewrap1
      //   }
      //   source={{ uri: contentInfo.mediaUrl }}>
      //   <View
      //     style={{
      //       ...sty.flex1,
      //       ...sty.jSpace,
      //       backgroundColor: "rgba(0,0,0,0.3)",
      //     }}>
      //     {this.renederProfileOnPhoto()}
      //     {this.renederTimerOnPhoto()}
      //     {this.renderTitleOnPHoto()}
      //   </View>
      // </ImageBackground>
      <View
        style={{
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 1,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          margin: 10,
          height: WINDOW_WIDTH
        }}>
        <View style={{ width: '100%', height: '45%' }}>
        
          <FastImage source={{ uri: contentInfo.mediaUrl }} style={{ width: '100%', height: '100%', borderTopRightRadius: 7, borderTopLeftRadius: 7 }} />
        </View>
        <View style={{ width: '100%', height: '55%', justifyContent: 'center', alignItems: 'center', paddingTop: props.favoriteView ? 20 : WINDOW_WIDTH / 35 }}>
          {_renderBottom(true)}
        </View>
        {/* <View style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, width: this.props.favoriteView ? 45 : WINDOW_WIDTH / 4.5, height: this.props.favoriteView ? 45 : WINDOW_WIDTH / 4.5, borderRadius: 1000, position: 'absolute', bottom: '47%', zIndex: 10, overflow: 'visible'
        }} >
          {_renderUserImage()}
        </View> */}
      </View>
    )
  }

  const _renderUserImage = () => {
    const { contentInfo } = props;
    let { createdBy } = contentInfo;

    return (
      <FastImage
        source={
          createdBy.profileUrl
            ? { uri: createdBy.profileUrl }
            : images.user
        }
        style={
          { widht: '100%', height: '100%', borderRadius: 1000 }
        }
      />
    )
  }

  const handleScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const { start, end } = position;
    console.log("scrollPosition", scrollPosition);
    if (scrollPosition < 350 || scrollPosition >= 800) {
      console.log("Now pased the vidoe ");
      setVideoPaused(true)
     
    } else {
      console.log("Now Play the vidoe ");
      setVideoPaused(false);
      
    }
    // if (scrollPosition > start && scrollPosition < end && videoPaused) {
    //   this.setState({ videoPaused: false });
    // } else if (
    //   (scrollPosition > end || scrollPosition < start) &&
    //   videoPaused
    // ) {
    //   this.setState({ videoPaused: true });
    // }
  };
  const renderLeftButton = () => {
    return (
      <View style={styles.leftButtons}>
        <TouchableOpacity
          onPress={() => {
            if (index > 0) 
            setIndex(index - 1)
           
          }}>
          {index > 0 ? (
            <_Icon
              type={"Ionicons"}
              icon={"ios-arrow-back"}
              color="white"
              size={40}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  renderRightButton = () => {
   
    return (
      <View style={styles.rightButtons}>
        <TouchableOpacity
          onPress={() => {
            if (index < routes.length - 1)
            setIndex(index + 1);
              // this.setState((ps) => ({ index: ps.index + 1 }));
          }}>
          {index < routes.length - 1 ? (
            <_Icon
              type={"Ionicons"}
              icon={"ios-arrow-forward"}
              color="white"
              size={40}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

 const  _renderTabView = () => {
    return (
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={{index,routes}}
          onIndexChange={(index) => setIndex(index)}
          initialLayout={{ width: globals.WINDOW_WIDTH, height: 200 }}
          renderTabBar={() => null}
          renderScene={_renderTabs}
          swipeEnabled={true}
          animationEnabled={true}
        />
        {renderLeftButton()}
        {renderRightButton()}
      </View>
    );
  };

  const _renderTabs = ({ route }) => {
    const contentInfox = props.contentInfo;
    
    switch (route.key) {
      case "tab1":
        return (
          <View style={{ paddingHorizontal: 10 }}>
            <View
              style={
                contentInfox.actionLink ? styles.priceTab1 : styles.priceTab
              }
              ref={(ref) => (videoWrapRef = ref)}>
              <FastImage
                source={{
                  uri: props.contentInfo.prizeImagesUrls[0]
                    ? props.contentInfo.prizeImagesUrls[0]
                    : "",
                }}
                style={{ width: "100%", height: globals.WINDOW_WIDTH }}
              />
            </View>
          </View>
        );
      case "tab2":
        return (
          <View style={{ paddingHorizontal: 10 }}>
            <View
              style={
                contentInfox.actionLink ? styles.priceTab1 : styles.priceTab
              }
              ref={(ref) => (videoWrapRef = ref)}>
              <FastImage
                source={{
                  uri: props.contentInfo.prizeImagesUrls[1]
                    ? props.contentInfo.prizeImagesUrls[1]
                    : "",
                }}
                style={{ width: "100%", height: globals.WINDOW_WIDTH }}
              />
            </View>
          </View>
        );
      case "tab3":
        return (
          <View style={{ paddingHorizontal: 10 }}>
            <View
              style={
                contentInfox.actionLink ? styles.priceTab1 : styles.priceTab
              }
              ref={(ref) => (videoWrapRef = ref)}>
              <FastImage
                source={{
                  uri: props.contentInfo.prizeImagesUrls[2]
                    ? props.contentInfo.prizeImagesUrls[2]
                    : "",
                }}
                style={{ width: "100%", height: globals.WINDOW_WIDTH }}
              />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const _renderPriceSection = () => {
    const { campaignIcons } = props.contentInfo;
    const {contentInfo} = props;
    let priceTitle =
      localize.activeLanguage !== "en" && contentInfo.priceTitleDe
        ? contentInfo.priceTitleDe
        : contentInfo.priceTitle;

    if (priceTitle === undefined)
      priceTitle = contentInfo.priceTitle
        ? contentInfo.priceTitle
        : "Price Title";

    let priceDescription =
      localize.activeLanguage !== "en" && contentInfo.priceDescriptionDe
        ? contentInfo.priceDescriptionDe
        : contentInfo.priceDescription;

    if (priceDescription === undefined)
      priceDescription = contentInfo.priceDescription
        ? contentInfo.priceDescription
        : "";
    const contentInfox = contentInfo;

    return (
      <View style={[mainStyles.roundBox]}>
        <View style={[mainStyles.flexRow, sty.blockSm]}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: contentInfo?.themeColor ? contentInfo?.themeColor : colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
            <FastImage source={{ uri: campaignIcons.prize }} style={{ width: 20, height: 20 }} resizeMode={"contain"} />
          </View>
          <_Lang
            text={helpers.getLocale(localize, "campaign", "main_prize")}
            // isGradiant={true}
            style={mainStyles.textHeadingIcon}
            pureText
          />
        </View>
        <View style={[styles.headWrapPrice, {}]}>
          <View style={{ ...sty.flex1, ...sty.padV5 }}>
            <_Lang
              text={priceTitle}
              style={[mainStyles.textLH24, { fontWeight: "bold" }]}
              pureText
            />
          </View>
        </View>
        {contentInfo.priceDescription ? (
          <View style={[styles.descWrapF, { ...sty.fRow }]}>
            <Text
              style={[
                mainStyles.appTxt,
                { lineHeight: 28, fontSize: 14, marginBottom: 10 },
              ]}>
              {priceDescription.trim()}
            </Text>
          </View>
        ) : null}
        {contentInfo.prizeImagesUrls && contentInfo.prizeImagesUrls.length === 3
          ? _renderTabView()
          : null}
        {contentInfox.actionLink ? (
          <_Button
            text={
              contentInfox.callToAction ? contentInfox.callToAction : "More"
            }
            callback={() => {
              _navigateToUrl(contentInfox.actionLink);
              contestCallToActionApi();
            }}
            style={{
              height: 35,
              ...sty.jCenter,
              backgroundColor: contentInfo?.themeColor ? contentInfo?.themeColor: colors.primaryColor,
              marginHorizontal: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              marginBottom: 5,
            }}
            btnTxtStyle={{
              ...sty.padV5,
              fontSize: fonts.xSmall,
              fontWeight: "bold",
              color: "white",
            }}
          />
        ) : null}
      </View>
    );
  };

  const contestCallToActionApi = () => {
    const { contentInfo } = props;
    let cb = {
      success: (res) => {},
      error: (e) => {},
      complete: () => {},
    };
    let apiData = {
      id: contentInfo._id,
    };
    let header = helpers.buildHeader({ authorization: loginData.token });
    API.companyCampaginCallToAction({}, cb, header, apiData);
  };


  const _navigateToUrl = (item) => {
    console.log("point 1");
    fetchPoints(props.contentInfo, item.name);
    console.log("point 2");
    let newURL = item.url ? item.url : item;
    console.log("point 3");
    Linking.canOpenURL(newURL)
      .then((supported) => {
        if (supported) {
          Linking.openURL(newURL).catch((err) =>
            console.log("An error occurred", err),
          );
        } else {
          console.log("Don't know how to open URI: " + newURL);
        }
      })
      .catch((e) => {});
    console.log("point 4");
  };

  const  handleVideoLayout = (e) => {
    position.start = Math.abs(
      e.nativeEvent.layout.y - WINDOW_HEIGHT + 300,
    );
    this.position.end =
      e.nativeEvent.layout.y + e.nativeEvent.layout.height - 100;
  };

  const chance2share = (item) => {
    if (props.contentInfo.userParticipateCount == 0) {
      _toggleShareChanceErrorModal(); 
    } else {
      item.url ? _navigateToUrl(item) : _navigate();
    }
  };

  const _renderView = () => {
    const { contentInfo, campaignInfo } = props;
    let socialShare = campaignInfo ? campaignInfo.socialShare : [];
    // const contentInfox = find(campaigns, cam => cam.id == contentInfo.id) ? find(campaigns, cam => cam.id == contentInfo.id) : contentInfo
    const contentInfox = contentInfo;
    // let isApplied = contentInfox ? contentInfox.participateBy.includes(loginData.id) : false
    const contestUrl = contentInfox && contentInfox.contestUrl;
    let { createdBy, campaignIcons } = contentInfo;
    // const { videoMuted } = this.state;

    var userNav = () => {
      navProps.activeNav.navigate("OthersProfile", {
        userInfo: {
          username: createdBy.username,
          userId: createdBy._id,
        },
      });
    };

    let category = contentInfo.category
      ? helpers.getLocale(localize, "contentType", "in") + " "
      : " ";
    if (category !== "") {
      category +=
        contentInfo.category instanceof Array
          ? contentInfo.category[0].categoryName
          : contentInfo.category;
    }
    let locationTxt = helpers.getPostLocation(contentInfo.location);
    let description =
      localize.activeLanguage !== "en" && contentInfo.descriptionDe
        ? contentInfo.descriptionDe
        : contentInfo.description;
    if (description === undefined)
      description = contentInfo.description ? contentInfo.description : "";

    const showSocialShare =
      contentInfo.isPrivate ||
        (contentInfo.isSocialShare && postType != POST_TYPES.Ad)
        ? true
        : true;

    let isClose = false;
    let is;
    let timeLeftString = "";
    let dayLeft = moment(contentInfo.endDate)
      .startOf("day")
      .diff(moment().startOf("day"), "days");
    if (dayLeft > 0) timeLeftString = dayLeft + " Days left";
    else {
      // if (dayLeft <= 0) {
      const hoursLeft = moment(contentInfo.endDate).diff(moment(), "hours");
      if (hoursLeft > 0) timeLeftString = hoursLeft + " Hours left";
      else {
        const minutesLeft = moment(contentInfo.endDate).diff(
          moment(),
          "minutes",
        );
        if (minutesLeft > 0) timeLeftString = minutesLeft + " Minutes left";
        else {
          const secondsLeft = moment(contentInfo.endDate).diff(
            moment(),
            "seconds",
          );
          timeLeftString = secondsLeft + " Seconds left";
          if (secondsLeft <= 0) isClose = true;
        }
      }
    }

    if (props.fullView) {
      console.log('fullView is executed',contentInfo);
      let claculatedclockText = helpers.contestSelectionProcess(
        contentInfo.endDate,
        contentInfo.startDate,
        contentInfo.upcomingDays,
      );
      let dayLeftString =
        claculatedclockText === "upcoming"
          ? ""
          : !contentInfo.isClosed && contentInfo.endDate && !isClose
            ? timeLeftString
            : "Contest Closed";

      const shadowStyleIOS =
        Platform.OS === "ios"
          ? {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
          }
          : {
            elevation: 0,
          };

      const contestTitle =
        contentInfo.typeContent === CONTEST_TYPE.IMAGE_CONTEST
          ? "contest.photo_contest"
          : "contest.video_contest";
      return (
        <ScrollView onScroll={handleScroll}>
          <View
            style={[mainStyles.roundBox, { borderRadius: 0, marginBottom: 0 }]}>
            {_renderTopSection()}
            <View style={mainStyles.cardWhite}>
              <View style={[styles.description, { flexDirection: "column" }]}>
                <View style={mainStyles.flexRow}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: contentInfo?.themeColor ? contentInfo?.themeColor : colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
                    <FastImage source={{ uri: campaignIcons.challege }} style={{ width: 20, height: 20 }} resizeMode={"contain"} />
                  </View>
                  <_Lang
                    text={helpers.getLocale(
                      localize,
                      "campaign",
                      "challenge_contest",
                    )}
                    style={mainStyles.textHeadingIcon}
                    pureText
                  />
                </View>
                {contentInfo.description ? (
                  <View>
                    <Text
                      style={[
                        mainStyles.appTxt,
                        {
                          lineHeight: 28,
                          fontSize: 14,
                          marginTop: 10,
                          marginBottom: campaignInfo.contestUrl ? 0 : 10,
                        },
                      ]}>
                      {description.trim()}
                    </Text>
                  </View>
                ) : null}
              </View>
              {campaignInfo.contestUrl && (
                <View
                  style={{
                    alignSelf: "center",
                    margin: 10,
                    borderRadius: 10,
                    backgroundColor: "black",
                   
                  }}
                  onLayout={handleVideoLayout}>
              <_TapHandler
                    singleTap={() => {setVideMuted(!videoMuted);
                    }}>
                    <Video
                      paused={videoPaused}
                      controls={false}
                      source={{ uri: campaignInfo.contestUrl }}
                      muted={videoMuted}
                      repeat
                      style={[
                        styles.video,
                        {
                          width: WINDOW_WIDTH - 40,
                          borderRadius: 10,
                        },
                      ]}
                      resizeMode={"cover"}
                    />
                    <View
                      style={{
                        height: 24,
                        width: 24,
                        borderRadius: 12,
                        position: "absolute",
                        top: "6%",
                        right: "7%",
                        backgroundColor: colors.grayDark,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setVideMuted(!videoMuted);
                        }}
                        style={{
                          ...sty.flex1,
                          ...sty.jCenter,
                          ...sty.aCenter,
                        }}>
                        <_Icon
                          type={"MaterialIcons"}
                          icon={videoMuted ? "volume-off" : "volume-up"}
                          size={15}
                          color={"#fff"}
                        />
                      </TouchableOpacity>
                    </View>
                </_TapHandler>
               </View>  
               )} 
            </View>

          </View>

          <View style={mainStyles.cardWhite}>
            {contentInfox.priceDescription && _renderPriceSection()}
          </View>
          {contentInfo.juryImages.length > 0 &&
            contentInfo.juryImages[0] !== "" && (
              <DetailCard
                isJury
                icon={campaignIcons?.jury}
                themeColor={contentInfo?.themeColor ? contentInfo?.themeColor : colors.primaryColor}
                title={helpers.getLocale(localize, "campaign", "the_jury")}
                description={localize.activeLanguage !== "en" ? contentInfo.juryDescriptionDe : contentInfo.juryDescription}
                imgArr={contentInfo.juryImagesUrls.filter(function (el) {
                  return el !== "" && el !== null;
                })}
              />
            )}
          {contentInfo.companyImgUrl && (
            < View style={mainStyles.cardWhite}>
              {contentInfo.companyImgUrl && _renderAboutSection()}
            </View>
          )}

          <View style={[mainStyles.cardWhite]}>
            <View style={[mainStyles.flexRow, { ...sty.padH10 }]}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: contentInfo?.themeColor ? contentInfo?.themeColor : colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
                <FastImage source={{ uri: campaignIcons.increase }} style={{ width: 20, height: 20 }} resizeMode={"contain"} />
              </View>
              <_Lang
                text={"campaign.increase_your_chance_to_win"}
                style={mainStyles.textHeadingIcon}
              />
            </View>

            <_Lang
              text={"campaign.share_participation"}
              style={{ ...mainStyles.textHeadingIcon, fontSize: 16, width: '90%', marginLeft: 10, marginTop: 20 }}
            />
             <View
              style={{
                ...sty.mgT10,
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around'

              }}>

              {socialShare.slice(0, 3).map((item, index) => {
                return chanceTowin(item, () => {
                  if (index === 0 || index === 1 || index === 2) {
                    console.log("00000000");
                    if (props.contentInfo.userParticipateCount == 0) {
                      _toggleShareChanceErrorModal();
                    } else {
                      shareItem(item, index);
                    }

                  } else {
                    console.log("hfhjshfushfu");
                    chance2share(item);
                  }
                });
              })}
          </View>
           {socialShare.length > 3 ? <_Lang
              text={"campaign.visit_channel"}
              style={{ ...mainStyles.textHeadingIcon, fontSize: 16, width: '90%', marginLeft: 10, marginTop: 20, marginBottom: 10 }}
            /> : null} 
           <ScrollView horizontal showsHorizontalScrollIndicator={false}
              style={{
                flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10
              }}>
              {socialShare.slice(3, socialShare.length).map((item, index) => {
                return chanceTowin(item, () => {
                  if (index === 0 || index === 1 || index === 2) {
                    console.log("00000000");
                    if (props.contentInfo.userParticipateCount == 0) {
                      _toggleShareChanceErrorModal();
                    } else {
                      shareItem(item, index);
                    }
                  } else {
                    console.log("hfhjshfushfu");
                    chance2share(item);
                  }
                });
              })}
            </ScrollView> 
          </View> 

          <View style={mainStyles.cardWhite}>
            <View style={[mainStyles.flexRow, { ...sty.padH10 }]}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: contentInfo?.themeColor ? contentInfo?.themeColor : colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
                <FastImage source={{ uri: campaignIcons.faq }} style={{ width: 20, height: 20 }} resizeMode={"contain"} />
              </View>
              <_Lang
                text={"campaign.more_information"}
                style={mainStyles.textHeadingIcon}
              />
            </View>
            <View style={{ width: '98%' }}>
              <HowTOWin campaignInfo={contentInfo} />
            </View>
          </View>
          {!contentInfo?.isSurveyFilled ? contentInfo.surveyQuestions.length > 0 ? <View style={mainStyles.cardWhite}>
            {_renderSurveySection()}
          </View> : null : null}


          <View style={mainStyles.cardWhite}>
            {_renderOrganizerSection()}
          </View>

          {/* {this.challengeFriend()} */}
          <View style={mainStyles.cardWhite}>
            <FindmoreCamp
              campaignInfo={contentInfo}
              navigation={props.navigation}
              stoptimer={_stopTimer}
            />
          </View>
          <RBSheet
            ref={RBSheetRef}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height={globals.WINDOW_HEIGHT / 5}
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
              list={socialShareArr}
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
                        this.props.localize,
                        "errorModal",
                        "write_permission",
                      ),
                    );
                  }
                } else {
                  share(ind);
                }
                RBSheet.close();
              }}
              closeSheet={() => RBSheet.close()}
            />
          </RBSheet>
          <MsgPopup
            showModal={shareChanceErrorModal}
            msg={helpers.getLocale(
              props.localize,
              "campaign",
              "do_no_applied",
            )}
            popUpAction={() => {
              _toggleShareChanceErrorModal();
            }}
          />
        </ScrollView>
      );
    } else {
      return (
        <View style={{ paddingHorizontal: 10 }}>
          <Pressable
            disabled={disabled}
            onPress={() => {
              setDisable(true);
              // this.setState({ disabled: true })
              setTimeout(() => setDisable(false), 2000);
              if (contentInfo.navigateToFullView) {
                contentInfo.navigateToFullView(contentInfo);
                contestClickApi();
              }
            }
            }
            style={[
              {
                marginVertical: 10,
                borderRadius: 7,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 1,
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,

              },
              !props.favoriteView
                ? styles.bgimagewrap
                : styles.bgimagewrap1
            ]}>
            <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
              <FastImage source={{ uri: contentInfo.mediaUrl }} style={{ width: '100%', height: '100%', borderTopRightRadius: 7, borderTopLeftRadius: 7 }} />
            </View>
            <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', paddingTop: props.favoriteView ? 20 : 35 }}>
              {_renderBottom()}
            </View>
            <View style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5, width: props.favoriteView ? WINDOW_WIDTH / 7.5 : WINDOW_WIDTH / 4.5, height: props.favoriteView ? WINDOW_WIDTH / 7.5 : WINDOW_WIDTH / 4.5, borderRadius: 1000, position: 'absolute', bottom: '38%', zIndex: 10, overflow: 'visible'
            }} >
              {_renderUserImage()}
            </View>
            {_renderFloatTag()}
          </Pressable>
        </View>
      );
    }
  };

  const share = async (item) => {
    console.log("share");
    const { contentInfo } = props;
    const shareObj = item;
    if (item) {
      let url = "";
      let postType = helpers.buildPostType(item.postType, item.userType || "");
      // const middleUrl = find(SHARE_URL, (shr) => shr.type === postType);
       const middleUrl = SHARE_URL.find((shr) => shr.type === postType);
      let lang = props.localize.activeLanguage === "en" ? "/en" : "/de";
      let claculatedclockText = helpers.contestSelectionProcess(
        contentInfo.endDate,
        contentInfo.startDate,
        contentInfo.upcomingDays,
      );
      let contestType = "";
      if (
        claculatedclockText === "winner" ||
        claculatedclockText === "finalist"
      )
        contestType = "/finalist";
      else if (claculatedclockText === "closed") contestType = "/winner";

      if (middleUrl) {
        url = WEB_URL + middleUrl.url + item.slug + contestType + lang;
      }

      const realContent = Object.assign({}, shareObj.contentObj, {
        title: "Share via",
        message: "",
        url: url,

        social: Share.Social.WHATSAPP,
      });

      await Share.open(realContent)
        .then((res) => {
          if (res.message == "net.whatsapp.WhatsApp.ShareExtension") {
            this.fetchPoints(item, "whatsapp");
          }
        })
        .catch((err) => {
          err && console.log(err);
        });
    } else {
      ActionSheet.hide();
    }
  };

  const _renderOrganizerSection = () => {
    const { contentInfo } = props;
    const { campaignIcons } = contentInfo;
    let addressString1 =
      (contentInfo.organizerDetails.street
        ? contentInfo.organizerDetails.street
        : "") +
      (contentInfo.organizerDetails.streetNo
        ? " " + contentInfo.organizerDetails.streetNo
        : "");
    let addressString2 =
      (contentInfo.organizerDetails.postalCode
        ? contentInfo.organizerDetails.postalCode
        : "") +
      (contentInfo.organizerDetails.city
        ? " " + contentInfo.organizerDetails.city
        : "");

    return (
      <View style={mainStyles.roundBox}>
        <View style={styles.headWrapPrice}>
          <View style={mainStyles.flexRow}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: contentInfo?.themeColor ? contentInfo?.themeColor : colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
              <FastImage source={{ uri: campaignIcons.organizer }} style={{ width: 20, height: 20 }} resizeMode={"contain"} />
            </View>
            <_Lang
              text={helpers.getLocale(localize, "campaign", "organizer")}
              style={mainStyles.textHeadingIcon}
              pureText
            />
          </View>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
          {contentInfo.organizerDetails.name ? (
            <View style={{ flex: 1, paddingBottom: 3 }}>
              <Text style={mainStyles.textLH24}>
                {contentInfo.organizerDetails.name}{" "}
              </Text>
            </View>
          ) : null}
          {addressString1 !== "" ? (
            <View style={{ flex: 1, paddingBottom: 3 }}>
              <Text style={mainStyles.textLH24}>
                {addressString1 + "\n" + addressString2}
              </Text>
            </View>
          ) : null}
          {contentInfo.organizerDetails.country ? (
            <View style={{ flex: 1, paddingBottom: 3 }}>
              <Text style={mainStyles.textLH24}>
                {contentInfo.organizerDetails.country}
              </Text>
            </View>
          ) : null}
          {contentInfo.organizerDetails.email ? (
            <View style={{ flex: 1, paddingBottom: 3 }}>
              <Text style={mainStyles.textLH24}>
                {contentInfo.organizerDetails.email}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const _renderSurveySection = () => {
    // const {currentQuestion,selectedAnswers,surveyComplete}=this.state;
    const { contentInfo} = props;
    const { campaignIcons } = contentInfo;
    let addressString1 =
      (contentInfo.organizerDetails.street
        ? contentInfo.organizerDetails.street
        : "") +
      (contentInfo.organizerDetails.streetNo
        ? " " + contentInfo.organizerDetails.streetNo
        : "");
    let addressString2 =
      (contentInfo.organizerDetails.postalCode
        ? contentInfo.organizerDetails.postalCode
        : "") +
      (contentInfo.organizerDetails.city
        ? " " + contentInfo.organizerDetails.city
        : "");
    var currentLang=localize.activeLanguage;
    return (
      <View style={mainStyles.roundBox}>
        <View style={styles.headWrapPrice}>
          <View style={mainStyles.flexRow}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: contentInfo?.themeColor ? contentInfo?.themeColor : colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
              <FastImage source={{ uri: campaignIcons?.survey?campaignIcons?.survey:"https://stagingassets.picstagraph.com/campaign/icons/Survey_White.png"}} style={{ width: 20, height: 20 }} resizeMode={"contain"} />
            </View>
            <_Lang
              text={helpers.getLocale(localize, "campaign", "survey")}
              style={mainStyles.textHeadingIcon}
              pureText
            />
          </View>
        </View>
        <View style={{display:surveyComplete?'flex':'none'}}>
        <_Lang
              text={helpers.getLocale(localize, "campaign", "Success")}
              style={{ ...mainStyles.textHeadingIcon,fontSize:16,marginVertical:10,marginRight:5}}  
              pureText
             />
            <_Lang
              text={helpers.getLocale(localize, "campaign", "Succcess_desc")}
              style={[mainStyles.textLH24,{marginLeft:10}]} 
              pureText
             />
          </View>   
        
        {contentInfo?.surveyQuestions && contentInfo.surveyQuestions.map((e,i)=>
          <View style={{display:i==currentQuestion?'flex':'none'}}>
             <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
           <_Lang
              text={helpers.getLocale(localize, "campaign", "Question")}
              style={{ ...mainStyles.textHeadingIcon,fontSize:16,marginVertical:5,marginRight:5}}  
              pureText
             />
              <Text style={{fontSize:16,color:'black',fontWeight:'bold'}}>{i+1}/{contentInfo?.surveyQuestions.length}</Text>
             </View>
             <Text style={[mainStyles.textLH24,{marginLeft:10}]}>

                {currentLang=="en"?e.questionEn:e.questionDe}
            </Text>
            <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-evenly'}}>
             {contentInfo.surveyQuestions[i]?.options.map((ans,index)=><TouchableOpacity
             onPress={()=>_onAnswerClicked(e,ans,i+1)}
             style={{
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              width:i!=2?i==0?'42%':'95%':'10%',
              alignItems: 'center',
              borderRadius:5, 
              backgroundColor:selectedAnswers.find(function(ele, index) {
                if(ele.answerId == ans._id)
                  return true;
              })?'black':'white',paddingVertical:5,margin:10,justifyContent:'center',alignItems:'center'}}
             >
               <Text style={[mainStyles.textLH24]}>
                {currentLang=="en"?ans.valueEn:ans.valueDe}
            </Text>
             </TouchableOpacity>)}  
            </View>
           

          </View>
        )}
      
       
      </View>
    );
  };

  const _onAnswerClicked=(question,ans,index)=>{
    // const {selectedAnswers}=this.state;
    const {contentInfo}= props;
    setCurrentQuestion(index);
    setSelectedAnswers([...selectedAnswers,{
      questionId:question?._id,
      answerId:ans?._id    
    }])
   
    if(contentInfo?.surveyQuestions.length==index){
      let cb = {
        success: (res) => {
          console.log("Success",res)
        },
        error: (e) => {},
        complete: () => {},
      };
      let apiData = {
        id: contentInfo._id,
      };
      let payload={
        answers:[...selectedAnswers,{
          questionId:question?._id,
          answerId:ans?._id    
        }]
      }
      console.log(payload)
      let header = helpers.buildHeader({ authorization: loginData.token });
      API.submitSurvey(payload, cb, header, apiData);
      setSurveyComplete(true);
    }
  }

  const _toggleShareChanceErrorModal = () => {
    setShareChanceErrorModal(!shareChanceErrorModal);
  };

  const filterItem = (dataArray, id) => {
    return dataArray.filter((item) => item.createdBy === id);
  };

  const shareItem = async (socialUsed, indexz) => {
    console.log("shareItem");
    const {
      contentInfo,
      companyParticipant,
      campaignInfo,
      loginData,
    } = props;
    console.log("PRIYANK ", campaignInfo);
    let dataArray =
      campaignInfo && companyParticipant[campaignInfo.id]
        ? filterItem(companyParticipant[campaignInfo.id].arr, loginData.id)
        : [];
    const shareObj = contentInfo;
    const postUrl =
      dataArray.length && dataArray[0].watermarkUrl
        ? dataArray[0].watermarkUrl
        : dataArray[0].mediaUrl;
    let convertedMedia = "";

    if (
      indexz === 0 &&
      contentInfo.typeContent === globals.CONTEST_TYPE.IMAGE_CONTEST
    ) {
      convertedMedia = await base64Converter(postUrl);
    } else if (indexz === 0 && Platform.OS === "ios") {
      contentInfo.typeContent === globals.CONTEST_TYPE.IMAGE_CONTEST
        ? await saveImageToGallery(postUrl)
        : await saveVideoToGallery(postUrl);
    }

    if (shareObj) {
      let url = "";
      const item = contentInfo;

      let postType = helpers.buildPostType(item.postType, item.userType || "");
      // const middleUrl = SHARE_URL.map((shr, index) => {
      //   if (shr.type === "participant") {
      //     return shr;
      //   }
      // });
      // console.log("middleUrl", middleUrl);
      // return;
      // const middleUrl = find(SHARE_URL, (shr) => shr.type === "participant");
      const middleUrl = SHARE_URL.find((shr) => shr.type === "participant");
      console.log("middleUrl", middleUrl);
      if (middleUrl) {
        let firstImageURL =
          dataArray.length && dataArray[0].id ? dataArray[0].id : item.id;
        url =
          POST_TYPES.CompanyCampaign === item.postType
            ? WEB_URL + middleUrl.url + item.slug
            : WEB_URL + middleUrl.url + firstImageURL;
      }

      let realContent = shareObj.contentObj;
      if (
        indexz == 0 &&
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
      } else {
        realContent = Object.assign({}, shareObj.contentObj, {
          url,
        });
      }
      realContent =
        Platform.OS === "android" &&
        contentInfo.typeContent === globals.CONTEST_TYPE.IMAGE_CONTEST &&
        indexz === 0
          ? Object.assign({}, realContent, { forceDialog: true })
          : realContent;
      realContent.social =
        indexz === 0 &&
        props.contentInfo.typeContent ===
          globals.CONTEST_TYPE.IMAGE_CONTEST
          ? Share.Social.INSTAGRAM_STORIES
          : indexz === 0 &&
            props.contentInfo.typeContent ===
              globals.CONTEST_TYPE.VIDEO_CONTEST
          ? Share.Social.INSTAGRAM
          : indexz === 1
          ? Share.Social.WHATSAPP
          : Share.Social.FACEBOOK;
      realContent.title = "Picstagraph";
      realContent.message = "";
      realContent.method =
        props.contentInfo.typeContent ===
        globals.CONTEST_TYPE.IMAGE_CONTEST
          ? Share.Social.INSTAGRAM_STORIES.SHARE_BACKGROUND_IMAGE
          : null;
      fetchPoints(socialUsed, socialUsed.name);

      await Share.shareSingle(realContent);
      
    }
  };

  const fetchPoints = (item, socialKey) => {
    console.log("fetchPoints");
    const {  contentInfo } = props;
    item = contentInfo;
    console.log(
      "props.contentInfo.socialShare",
      props.contentInfo.socialShare,
      "socialKey",
      socialKey,
    );

    let shareObj = props.contentInfo.socialShare.map((shr, index) => {
      if (
        shr.name === socialKey &&
        !props.contentInfo.socialShare[index].userSharestatus
      ) {
        props.contentInfo.socialShare[index].userSharestatus = true;
        let cb = {
          success: (res) => {},
          error: (e) => {},
          complete: () => {},
        };
        let header = helpers.buildHeader({
          authorization: loginData.token,
        });
        console.log("MAKING API CALL");
        API.fetchActionPoints({ [socialKey]: true }, cb, header, {
          campId: item.id,
        });
      }
    });
  };

  const chanceTowin = (item, onpress) => {
    return (
      <TouchableOpacity
        onPress={onpress}
        style={{
        width: WINDOW_WIDTH/4, height: WINDOW_WIDTH/3.2, backgroundColor: 'white', marginHorizontal: WINDOW_WIDTH/40,marginVertical:10, shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
        alignItems: 'center',
        borderRadius:5
      }}>
        <FastImage
            allowFontScaling={false}
            source={{ uri: item.iconUrl }}
            style={{ height: '65%', width: '90%',borderRadius:5 }}
            resizeMode={"cover"}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center',flexDirection:'row',marginTop:10 }}>
          <_Lang
            text={"+" + item.points}
            pureText
            style={[{ fontWeight: "bold", fontSize: 16 }]}
          />
          <FastImage source={images.likeBtn} style={{width:18,height:18,marginLeft:5}} resizeMode="contain"/>
        </View>  
      </TouchableOpacity>
    );
  };

  const _renderAboutSection = () => {
    const { contentInfo } = props;
    console.log("showData", contentInfo)
    const { campaignIcons } = contentInfo;
    const contentInfox = contentInfo;
    
    return (
      <View style={[mainStyles.roundBox]}>
        <View style={[mainStyles.flexRow, sty.blockSm]}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: contentInfo?.themeColor
                ? contentInfo?.themeColor
                : colors.primaryColor,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <FastImage
              source={{ uri: campaignIcons?.about }}
              style={{ width: 20, height: 20 }}
              resizeMode={"contain"}
            />
          </View>
          <_Lang
            text={helpers.getLocale(localize, "campaign", "about")}
            // isGradiant={true}
            style={mainStyles.textHeadingIcon}
            pureText
          />
        </View>

        <View style={[styles.descWrapF, { ...sty.fRow }]}>
          <Text
            style={[
              mainStyles.appTxt,
              { lineHeight: 28, fontSize: 14, marginBottom: 10 },
            ]}>
            {localize.activeLanguage !== "en"
              ? contentInfo.companyDescriptionDe
              : contentInfo.companyDescription}
          </Text>
        </View>
        <View
          themeColor={
            contentInfo?.themeColor
              ? contentInfo?.themeColor
              : colors.primaryColor
          }
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}>
          <FastImage
            source={{ uri: contentInfo.companyImg }}
            style={{
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              width: "100%",
              height: aboutImgHeight,
            }}
            resizeMode={"stretch"}
            onLoad={(evt) =>
              setAboutImgHeight((evt.nativeEvent.height / evt.nativeEvent.width) * WINDOW_WIDTH)
//               this.setState({
// aboutImgHeight :(evt.nativeEvent.height / evt.nativeEvent.width) * WINDOW_WIDTH,
              
//               })
                
            }
          />
        </View>

        {contentInfox.actionLink ? (
          <_Button
            text={
              contentInfox.callToAction ? contentInfox.callToAction : "More"
            }
            callback={() => {
              _navigateToUrl(contentInfox.orgInfoUrl);
              contestCallToActionApi();
            }}
            style={{
              height: 35,
              ...sty.jCenter,
              backgroundColor: contentInfo?.themeColor
                ? contentInfo?.themeColor
                : colors.primaryColor,
              marginHorizontal: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              marginBottom: 5,
            }}
            btnTxtStyle={{
              ...sty.padV5,
              fontSize: fonts.xSmall,
              fontWeight: "bold",
              color: "white",
            }}
          />
        ) : null}
      </View>
    );
  };

  const _renderFloatTag = () => {
    const { contentInfo } = props;
    let { createdBy } = contentInfo;

    var userNav = (user) => {
      navProps.activeNav.navigate("OthersProfile", {
        userInfo: {
          username: user.username,
          userId: user._id,
        },
      });
    };

    let category = contentInfo.category
      ? helpers.getLocale(localize, "contentType", "in") + " "
      : " ";
    if (category !== "") {
      category +=
        contentInfo.category instanceof Array
          ? contentInfo.category[0].categoryName
          : contentInfo.category;
    }

    let arr = [
      <Text
        key={`arrUserName`}
        onPress={() => {
          userNav(createdBy);
        }}
        allowFontScaling={false}
        style={[mainStyles.boldHeadTxt, { color: "white" }]}>
        {createdBy.username + " "}
      </Text>,
    ];

    let withElement = (
      <Text
        key={`arrWith`}
        allowFontScaling={false}
        style={[{ color: "white" }]}>
        {helpers.getLocale(localize, "campaign", "with")}
      </Text>
    );

    if (
      contentInfo.corporatePartner &&
      contentInfo.corporatePartner.length >= 1 &&
      !props.favoriteView
    ) {
      arr.push(withElement);
      contentInfo.corporatePartner.forEach((value, index) => {
        let partnerName =
          index !== contentInfo.corporatePartner.length - 1
            ? value.username + " , "
            : value.username;
        let partnerElement = (
          // <TouchableOpacity onPress={() => userNav(value)}>
          <Text
            key={`arrPartner_${index}`}
            onPress={() => {
              userNav(value);
            }}
            allowFontScaling={false}
            style={[mainStyles.boldHeadTxt, { color: "white" }]}>
            {partnerName}
          </Text>
          // </TouchableOpacity>
        );
        arr.push(partnerElement);
      });
    }
    let widthstyle = !props.favoriteView
      ? styles.section4widthStyle2
      : styles.section4widthStyle1;
    let userImgstyle = !props.favoriteView
      ? styles.userImg
      : styles.userImg1;

    let dayLeft =
      moment(contentInfo.endDate)
        .startOf("day")
        .diff(moment().startOf("day"), "days") + " Days";
    // .diff(moment().startOf("day"), "days") + " Days left";

    let isClosed =
      moment(contentInfo.endDate).diff(moment(), "days") < 0 ||
      contentInfo.isClosed;

    let claculatedclockText = helpers.contestSelectionProcess(
      contentInfo.endDate,
      contentInfo.startDate,
      contentInfo.upcomingDays,
    );
    let clockText = "";
    let clockColor = "#000";
    switch (claculatedclockText) {
      case "winner":
        clockText = helpers.getLocale(
          localize,
          "campaign",
          "winners",
        );
        clockColor = '#000'
        break;
      case "finalist":
        clockText = helpers.getLocale(
          localize,
          "campaign",
          "finalist",
        );
        clockColor = "#000";
        break;
      case "closed":
        clockText = "Closed";
        clockColor = "red";
        break;
      case "upcoming":
        clockText =
          helpers.getLocale(
            localize,
            "campaign",
            "application_is_able_after",
          ) + helpers.timeLeft(contentInfo.startDate);
        clockColor = "#000";
        break;
      case "day":
        clockText = !isClosed ? dayLeft : "Closed";
        clockColor = "green";
        break;
      default:
        return !isClosed ? dayLeft : "Closed";
    }

    return (
      // <_GradiantView>

      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: 'absolute',
        top: 30,
        left: 0,
        // marginTop: this.props.favoriteView ? WINDOW_WIDTH / 35 : WINDOW_WIDTH / 25
      }}>

        <View
          style={[
            !props.favoriteView ? sty.blockMd7 : sty.blockSm,
            {
              backgroundColor: colors.white, borderTopRightRadius: 1000, borderBottomEndRadius: 1000,
              elevation: 5,
              backgroundColor: "white",
              shadowColor: '#000',
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: 0.25
            },
          ]}>
          <Text
            style={[
              {
                fontSize: !props.favoriteView ? WINDOW_WIDTH / 25 : WINDOW_WIDTH / 35,
                fontWeight: 'bold', color: clockColor
              },
            ]}>
            {clockText}
          </Text>
        </View>
      </View>
    );
  };


  const contestClickApi = () => {
    console.log('contestClickApi is called');
    const { contentInfo } = props;
    let cb = {
      success: (res) => {

        console.log('CompanyCampaginPostClick response ==>', res);
      },
      error: (e) => { console.log('CompanyCampaginPostClick error==>', e) },
      complete: () => { },
    };
    let apiData = {
      id: contentInfo._id,
    };
    let header = helpers.buildHeader({ authorization: loginData.token });
    API.companyCampaginPostClick({}, cb, header, apiData);
  };
  var borderStyle = props.NewsList
    ? { borderTopWidth: 0, borderBottomWidth: 0, borderColor: "#F0F0F0" }
    : {
      borderTopWith: 0,
      borderBottomWith: 0,
      borderColor: colors.black,
    };
  return (
    // <View>
      <View style={[mainStyles.rootView, { marginBottom: 0 }, borderStyle]}>
    
        {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
        {_renderView()}
      </View>
    // </View>
  )
}

export default memo(CompanyCompaign)