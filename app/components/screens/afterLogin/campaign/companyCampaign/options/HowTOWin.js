import React, { useState } from "react";
import {
  View,
  Text,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { globals, colors, images, sty, helpers } from "../../../../../../configs";
import { _B } from "../../../../../custom";
import mainStyles from "../../../../../../assets/styles/MainStyles";
import moment from "moment";
import TextComponent from "../../../../../custom/ContentTypes/common/TextComponent";
import Collapsible from "react-native-collapsible";
import EntypoIcons from "react-native-vector-icons/Entypo";

const HowTOWin = (props) => {
  const { campaignInfo } = props;
  const localize = useSelector((state) => state.localize);
  const [showInsta, setShowInsta] = useState(true);
  const [showVote, setShowVote] = useState(true);
  const [showCountry, setShowCountry] = useState(true);
  const [showTerm, setShowTerm] = useState(true);
  const [showTime, setShowTime] = useState(true);
  const [showPostAppear, setShowPostAppear] = useState(true);
  const [showFAndWinners, setshowFAndWinners] = useState(true);
  const [showParticipation, setshowParticipation] = useState(true);
  const [showImageRight, setshowImageRight] = useState(true);
  const [showAppVersion, setshowAppVersion] = useState(true);
  const [showAnyQuestion, setshowAnyQuestion] = useState(true);


  const _getTranslatedTest = (text) => {
    var txtArr = text.split(".");
    let lang = localize.translations[localize.activeLanguage];
    return lang[txtArr[0]][txtArr[1]];
  };

  const _runningTime = () => {
    const conteststartDate = moment(campaignInfo.createdAt).format(
      "DD.MMM.YYYY",
    );
    const contestEndDate = moment(campaignInfo.endDate).format("DD.MMM.YYYY");
    const contestFinalistEndDate = moment(campaignInfo.endDate)
      .add(2, "weeks")
      .format("DD.MMM.YYYY");
    const contestWinnerEndDate = moment(campaignInfo.endDate)
      .add(4, "weeks")
      .format("DD.MMM.YYYY");

    const textStyle = [mainStyles.textLH24, styles.alignFaq];
    return (
      <View
        style={[
          {
            padding: 10,
            borderRadius: 5,
            backgroundColor: getThemeColor(),
            marginBottom: 10,
            paddingBottom: 10,
          }]}>
        <View style={mainStyles.flexRow}>
          <EntypoIcons
            color={"black"}
            name={showTime ? "plus" : "minus"}
            size={18}
            style={{ marginRight: 10 }}
          />
          <TouchableOpacity
            onPress={() => setShowTime(!showTime)}
            style={styles.itemWrapper}>
            <_B>{_getTranslatedTest("termCondition.running_time")}</_B>
          </TouchableOpacity>
        </View>
        <Collapsible collapsed={showTime}>
          <View style={styles.containerCollapse}>
            {
              <TextComponent style={textStyle}>{`${_getTranslatedTest(
                "termCondition.application_Period",
              )} ${conteststartDate} - ${contestEndDate}`}</TextComponent>
            }
            {
              <TextComponent style={textStyle}>{`${_getTranslatedTest(
                "termCondition.finalist_Period",
              )}  ${contestEndDate} - ${contestFinalistEndDate}`}</TextComponent>
            }
            {
              <TextComponent style={textStyle}>{`${_getTranslatedTest(
                "termCondition.winner_Selection",
              )}  ${contestFinalistEndDate} - ${contestWinnerEndDate}`}</TextComponent>
            }
          </View>
        </Collapsible>
      </View>
    );
  };

  const handleCollapse = (e) => {
    switch (true) {
      case e === 1:
        setShowInsta(!showInsta);
        break;
      case e === 2:
        setShowVote(!showVote);
        break;
      case e === 3:
        setShowCountry(!showCountry);
        break;
      case e === 4:
        setShowTerm(!showTerm);
        break;
      case e === 5:
        setShowPostAppear(!showPostAppear);
        break;
      case e === 6:
        setshowFAndWinners(!showFAndWinners);
        break;
      case e === 7:
        setshowParticipation(!showParticipation);
        break;
      case e === 8:
        setshowImageRight(!showImageRight);
        break;
      case e === 9:
        setshowAppVersion(!showAppVersion);
        break;
      case e === 10:
        setshowAnyQuestion(!showAnyQuestion);
        break;
      default:
        break;
    }
  };
 const getThemeColor = () => {
    const { themeColor } = campaignInfo;
    if (themeColor) {
      if (themeColor.includes("#")) {
        return themeColor+"20"
      }
      else {
        let col = helpers.colourNameToHex(themeColor);
        return col + "20";
      }
    }
    return colors.primaryColor+"20"
 }
  const _infoItem = (item) => {
    return (
      <View
        style={[
          {
            padding: 10,
            borderRadius:5,
           backgroundColor: getThemeColor(),
            marginBottom: item.terms ? 10 : 10,
            paddingBottom: item.terms ? 10 : 10,
        }]}>
        <TouchableOpacity
          onPress={() => handleCollapse(item.id)}
          style={styles.itemWrapper}>
          <View style={mainStyles.flexRow}>
            <EntypoIcons
              color={"black"}
              name={item.collapsedState ? "plus" : "minus"}
              size={18}
              style={{ marginRight: 10 }}
            />
            <_B style={{width:'90%'}}>{item.title}</_B>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={item.collapsedState}>
          <View style={styles.containerCollapse}>
            {item.terms ? (
              <>
                <Text
                  allowFontScaling={false}
                  style={[mainStyles.textLH24, styles.alignFaq]}>
                  {_getTranslatedTest("termCondition.Terms_Con_desc1")}
                  <Text
                    allowFontScaling={false}
                    onPress={() => {
                      Linking.canOpenURL(
                        "https://app.picstagraph.com/branded-content-guildelines",
                      ).then((supported) => {
                        if (supported) {
                          Linking.openURL(
                            "https://app.picstagraph.com/branded-content-guildelines",
                          );
                        } else {
                          console.log("Don't know how to open URI: ");
                        }
                      });
                    }}
                    style={[mainStyles.textLH24, styles.textUnderLine]}>
                    {_getTranslatedTest("termCondition.Terms_Con_Clik")}
                  </Text>
                  {_getTranslatedTest("termCondition.Terms_Con_desc2")}
                </Text>
              </>
            ) : (
              <Text style={[mainStyles.textLH24, styles.alignFaq]}>
                {item.content}
              </Text>
            )}
            {item.version ? (
              <>
                <Text
                  allowFontScaling={false}
                  style={[mainStyles.textLH24, styles.alignFaq]}>
                  {_getTranslatedTest("termCondition.App_Version_desc")}
                  <Text
                    allowFontScaling={false}
                    onPress={() => {
                      Linking.canOpenURL(
                        "https://play.google.com/store/apps/details?id=com.picstagraph",
                      ).then((supported) => {
                        if (supported) {
                          Linking.openURL(
                            "https://play.google.com/store/apps/details?id=com.picstagraph",
                          );
                        } else {
                          console.log("Don't know how to open URI: ");
                        }
                      });
                    }}
                    style={[mainStyles.textLH24, styles.textUnderLine]}>
                    {_getTranslatedTest("termCondition.App_Version_playstore")}
                  </Text>
                  {_getTranslatedTest("termCondition.App_Version_desc1")}
                  <Text
                    allowFontScaling={false}
                    onPress={() => {
                      Linking.canOpenURL(
                        "https://apps.apple.com/in/app/picstagraph/id1478106689"
                      ).then((supported) => {
                        if (supported) {
                          Linking.openURL(
                          "https://apps.apple.com/in/app/picstagraph/id1478106689"
                          );
                        } else {
                          console.log("Don't know how to open URI: ");
                        }
                      });
                    }}
                    style={[mainStyles.textLH24, styles.textUnderLine]}>
                    {_getTranslatedTest("termCondition.App_Version_appstore")}
                  </Text>
                  {_getTranslatedTest("termCondition.App_Version_desc2")}
                  <Text
                    allowFontScaling={false}
                    onPress={() => {
                      Linking.canOpenURL(
                        "https://app.picstagraph.com/",
                      ).then((supported) => {
                        if (supported) {
                          Linking.openURL(
                            "https://app.picstagraph.com/",
                          );
                        } else {
                          console.log("Don't know how to open URI: ");
                        }
                      });
                    }}
                    style={[mainStyles.textLH24, styles.textUnderLine]}>
                    {_getTranslatedTest("termCondition.App_Version_Url")}
                  </Text>
                </Text>
              </>
            ) : null}
            {item.anyQuestion ? (
              <>
                <Text
                  allowFontScaling={false}
                  style={[mainStyles.textLH24, styles.alignFaq]}>
                  {_getTranslatedTest("termCondition.Any_Question_desc")}
                  <Text
                    allowFontScaling={false}
                    onPress={() => {
                      Linking.canOpenURL(
                        "mailto:support@picstagraph.com",
                      ).then((supported) => {
                        if (supported) {
                          Linking.openURL(
                            href = "mailto:support@picstagraph.com",
                          );
                        } else {
                          console.log("Don't know how to open URI: ");
                        }
                      });
                    }}
                    style={[mainStyles.textLH24, styles.textUnderLine]}>
                    {_getTranslatedTest("termCondition.Any_Question_support")}
                  </Text>
                </Text>
              </>
            ) : null}
          </View>
        </Collapsible>
      </View>
    );
  };

  let ResInstagram = {
    id: 1,
    icon: images.ResInsta,
    title: _getTranslatedTest("termCondition.Res_Insta"),
    content: _getTranslatedTest("termCondition.Res_Insta_desc"),
    collapsedState: showInsta,
  };

  let VotePhoto = {
    id: 2,
    icon: images.VotePhoto,
    title: _getTranslatedTest("termCondition.Vote_Photo"),
    content: _getTranslatedTest("termCondition.Vote_Photo_desc"),
    collapsedState: showVote,
  };

  let TermsCon = {
    id: 4,
    icon: images.TermsCondition,
    title: _getTranslatedTest("termCondition.Terms_Con"),
    terms: true,
    collapsedState: showTerm,
  };

  let PostAppear = {
    id: 5,
    icon: images.VotePhoto,
    title: _getTranslatedTest("termCondition.Post_Appear"),
    content: _getTranslatedTest("termCondition.Post_Appear_desc"),
    collapsedState: showPostAppear,
  };

  let FAndWinners = {
    id: 6,
    icon: images.VotePhoto,
    title: _getTranslatedTest("termCondition.F_And_Winners"),
    content: _getTranslatedTest("termCondition.F_And_Winners_desc"),
    collapsedState: showFAndWinners,
  };

  let Participation = {
    id: 7,
    icon: images.VotePhoto,
    title: _getTranslatedTest("termCondition.Participation_"),
    content: _getTranslatedTest("termCondition.Participation_desc"),
    collapsedState: showParticipation,
  };

  let ImageRight = {
    id: 8,
    icon: images.VotePhoto,
    title: _getTranslatedTest("termCondition.Image_Right"),
    content: _getTranslatedTest("termCondition.Image_Right_desc"),
    collapsedState: showImageRight,
  };

  let AppVersion = {
    id: 9,
    icon: images.VotePhoto,
    title: _getTranslatedTest("termCondition.App_Version"),
    version: true,
    collapsedState: showAppVersion,
  };

  let AnyQuestion = {
    id: 10,
    icon: images.VotePhoto,
    title: _getTranslatedTest("termCondition.Any_Question"),
    anyQuestion:true,
    collapsedState: showAnyQuestion,
  };

  var txtCountries = "";
  let Countries = campaignInfo.venueList;
  Countries.forEach((item) => {
    if (item.value) {
      txtCountries =
        txtCountries == "" ? item.value : item.value + ", " + txtCountries;
    }
  });
  let applictaion_countries = {
    id: 3,
    icon: images.OrgContest,
    title: _getTranslatedTest("termCondition.countries_of_application"),
    content: txtCountries,
    collapsedState: showCountry,
  };

  return (
    <View style={[styles.wrap,{marginTop:10}]}>
      {/* {_infoItem(ResInstagram)}
      {_infoItem(VotePhoto)} */}
      {_infoItem(PostAppear)}
      {_infoItem(FAndWinners)}
      {_infoItem(Participation)}
      {_infoItem(ImageRight)}
      {_infoItem(AppVersion)}
      {_infoItem(TermsCon)}
      {_runningTime()}
      {_infoItem(applictaion_countries)}
      {_infoItem(AnyQuestion)}
    </View>
  );
};

export default HowTOWin;

const styles = StyleSheet.create({
  wrap: {
    ...sty.padT10,
    ...sty.padV10,
    ...sty.padH10,
    ...sty.jCenter,
  },
  itemWrapper: {
    ...sty.flex1,
    borderRadius: 5,
    ...sty.mgT5,
    ...sty.mgB5,
  },
  item1: {
    ...sty.flex1,
    ...sty.fRow,
    ...sty.jStart,
  },
  mainWrap: {
    width: globals.WINDOW_WIDTH,
    alignSelf: "center",
    borderColor: "#F0F0F0",
    borderWidth: 3,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  main: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  media: {
    width: globals.WINDOW_WIDTH,
    height: globals.WINDOW_WIDTH / 2 - 2,
    marginTop: 10,
  },
  mediaImage: {
    width: "globals.WINDOW_WIDTH",
    height: globals.WINDOW_WIDTH - 22,
  },
  button: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    elevation: 10,
  },
  buttonTxt: { color: "white", fontSize: 16, fontWeight: "bold" },
  viewWrap: { flexDirection: "row", justifyContent: "center", paddingTop: 5 },
  badge: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.primaryColor,
    padding: 5,
  },
  flexBorder: {
    borderBottomWidth: 0.5,
    marginBottom: 20,
    paddingBottom: 20,
    paddingRight:10
  },
  containerCollapse: {
    flex: 1,
    marginBottom: 15,
  },
  alignFaq: {
    marginLeft: 25,
    marginRight: 5,
  },
  textUnderLine: {
    textDecorationLine: "underline",
    textDecorationColor: colors.primaryColor,
    color: colors.primaryColor,
  },
  badgeTxt: { fontSize: 14, color: colors.primaryColor },
});
