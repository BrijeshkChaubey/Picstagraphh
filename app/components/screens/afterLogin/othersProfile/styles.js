import { StyleSheet } from "react-native";
import { globals, colors, fonts, sty } from "../../../../configs";

export const styles = StyleSheet.create({
  profileInfoWrap: {
    ...sty.padV5,
    // ...sty.fRow,
    backgroundColor: "#fff",
    // borderRadius: 10,
    // overflow: 'hidden',
    ...sty.aCenter,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 10,
    marginTop: 6,
    backgroundColor: colors.black,
  },
  skillView: {
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.15,
    paddingHorizontal: 10,
    marginLeft: 12,
    elevation: 2,
  },
  imageDim: {
    height: 20,
    width: 20,
  },
  aboutInfoItems: {
    ...sty.fRow,
    ...sty.padV10,
    paddingLeft: 10,
  },
  line: {
    borderTopWidth: 1,
    borderTopColor: colors.lightDark,
    marginLeft: 30,
    marginTop: 15,
  },
  _renderTabBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
  },
  profileImgWrap: {
    width: 85,
    // paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 15,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  gradiantWrap: {
    borderRadius: 100,
    borderColor: "#fff",
    padding: 1.5,
    width: 88,
  },
  userImgWrap: {
    width: 85,
    ...sty.appBorder,
    overflow: "hidden",
  },
  userImg: {
    width: "100%",
    height: 85,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 100,
  },
  profileImgWrapInnter: {
    height: 85,
    width: 85,
    // ...sty.appBorder,
    borderRadius: 42.5,
    overflow: "hidden",
  },
  profileImg: {
    height: 85,
    width: 85,
    backgroundColor: colors.lighter,
  },
  profileStatsWrap: {
    width: globals.WINDOW_WIDTH - 90,
    paddingRight: 5,
    paddingLeft: 5,
    ...sty.jEnd,
    marginTop: 10,
  },
  msgBtn2: {
    width: 160,
    borderWidth: 2,
  },
  btnProfile: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 35,
    overflow: "hidden",
  },
  profileStat: {
    marginBottom: 7,
  },
  profileStatCount: {
    ...sty.tCenter,
    fontSize: fonts.medium,
    fontWeight: "bold",
  },
  profileStatTxt: {
    ...sty.tCenter,
    color: colors.lightDarker,
    // fontWeight: "bold"
  },
  tabWrap: {
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.light,
    borderTopWidth: 0.5,
    borderTopColor: colors.light,
  },
  tabStyle: {
    ...sty.padV5,
  },
  tabLabel: {
    color: colors.darkGray,
  },
  aboutTabWrap: {
    ...sty.padH15,
    ...sty.padB15,
  },
  aboutGeneralInfoWrap: {},
  aboutGeneralInfoItem: {
    ...sty.fRow,
    ...sty.padV15,
  },
  aboutGeneralInfoItem_1: {
    width: 130,
  },
  aboutGeneralInfoItem_2: {
    ...sty.flex1,
  },
  aboutGeneralInfoItem_1Txt: {
    color: colors.gray,
  },
  aboutGeneralInfoItem_2Txt: {
    color: colors.gray,
  },
  aboutLabelHead: {
    color: colors.gray,
    ...sty.mgT15,
  },
  aboutPersonalIntWrap: {
    ...sty.fRow,
    flexWrap: "wrap",
  },
  aboutOfferTagWrap: {},
  aboutOfferTag: {
    ...sty.mgV10,
    paddingRight: 10,
  },
  aboutOfferTagTxt: {
    ...sty.padH25,
    ...sty.tCenter,
    paddingVertical: 8,
    backgroundColor: colors.primaryColor,
    color: "#fff",
    width: "auto",
    ...sty.appBorder,
    overflow: "hidden",
  },
  aboutSocialItem: {
    ...sty.fRow,
    ...sty.mgV10,
  },
  aboutSocialItem_1: {
    width: 50,
  },
  aboutSocialItem_1_Img: {
    height: 25,
    width: 25,
  },
  aboutSocialItem_2: {
    ...sty.flex1,
    ...sty.jCenter,
  },
  aboutSocialItem_3: {
    ...sty.jCenter,
  },
  visitProfileBtn: {
    width: 100,
    borderWidth: 0.5,
    borderColor: colors.primaryColor,
    overflow: "hidden",
    ...sty.appBorder,
  },
  visitProfileBtnTxt: {
    ...sty.tCenter,
    ...sty.padV5,
    color: colors.primaryColor,
  },
  subscribeBtn: {
    ...sty.w100,
    ...sty.flex2,
    // borderWidth: 1,
    borderColor: colors.primaryColor,
    ...sty.appBorder,
    overflow: "hidden",
  },
  subscribeGradianBtn: {
    ...sty.flex1,
    ...sty.jCenter,
    ...sty.appBorder,
    overflow: "hidden",
  },
  msgBtn: {
    ...sty.w100,
    ...sty.padH5,
    ...sty.padV5,
    ...sty.flex1,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: colors.light,
    ...sty.appBorder,
    overflow: "hidden",
  },
  uploadBtn: {
    color: "#fff",
    ...sty.tCenter,
    ...sty.padV5,
    paddingTop:7,
    fontSize: fonts.xSmall,
    fontWeight: "bold",
    height: 35,
  },
});
