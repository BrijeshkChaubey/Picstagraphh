import { StyleSheet } from "react-native";
import {
  globals,
  helpers,
  validators,
  colors,
  fonts,
  images,
  sty,
  localize
} from "../../../../configs";

export const styles = StyleSheet.create({
  tabWrap: {
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.light,
    borderTopWidth: 0.5,
    borderTopColor: colors.light,
  },
  Textstyle2: {
    ...sty.padH10,
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 10,
    color: colors.gray, // colors.heading2,
    fontFamily: "Poppins-Regular",
  },
  tabStyle: {
    borderRightWidth: 1,
    borderRightColor: colors.light,
    ...sty.padV5,
  },
  tabLabel: {
    color: colors.darkGray,
  },
  notifWrap: {
    ...sty.fRow,
    ...sty.padH10,
    // ...sty.appBorder,
    // overflow: "hidden",
    // ...sty.mgT5
    // backgroundColor: '#fff'
    // borderBottomWidth: 2,
    // borderBottomColor: colors.appBg
  },
  item1: {
    ...sty.flex1,
    ...sty.fRow,
    ...sty.jStart,
  },
  item2: {
    ...sty.flex1,
    ...sty.fRow,
    ...sty.jEnd,
    borderRadius: 5,
    // ...sty.mgH10
  },
  readedNotif: {
    backgroundColor: "#fff",
  },
  unreadedNotif: {
    backgroundColor: "#ECECEC",
  },
  notifeUserImgViewWrap: {
    width: 55,
    ...sty.jCenter,
  },
  notifeUserImgView: {
    width: 45,
    borderRadius: 100,
    overflow: "hidden",
  },
  mediaImgViewWrap: {
    width: 45,
    ...sty.jCenter,
  },
  MediaImgView: {
    width: 45,
    borderRadius: 5, // 10,
    overflow: "hidden",
  },
  notyMediaView: {
    width: 45,
    height: 45,
  },
  notifeUserImg: {
    width: 45,
    height: 45,
  },
  notifInfoView: {
    //...sty.flex1,
    //width : globals.WINDOW_WIDTH - 150,
    //  width:500,
    height: "100%",
    minWidth: "75%",
    flexWrap: "wrap",
  },
  notifInfo_1: {
    color: colors.gray,
  },
  notifInfo_2: {
    color: colors.gray,
  },
  notifInfo_3: {
    color: colors.lightDark,
  },
  notifView3: {
    width: 90,
    ...sty.jCenter,
    ...sty.aEnd,
  },
  subscribeBtn: {
    minWidth: "90%",
    ...sty.aCenter,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftColor: colors.primaryColor,
    borderRightColor: colors.primaryColor,
  },
  subscribeBtnTxt: {
    ...sty.padV5,
    ...sty.padH5,
    ...sty.tCenter,
    fontSize: fonts.xSmall,
  },
  notifView3Img: {
    width: 50,
    height: 35,
  },

  //**==Likes style start==**/
  likeWrap: {
    ...sty.fRow,
    ...sty.jSpace,
    ...sty.padH10,
  },
  likeUserImgViewWrap: {
    width: 55,
    ...sty.jCenter,
  },
  likeUserImgView: {
    width: 45,
    borderRadius: 100,
    overflow: "hidden",
  },
  likeUserImg: {
    width: 45,
    height: 45,
  },
  likeInfoView: {
    ...sty.flex1,
  },
  likeInfo_1: {
    color: colors.gray,
  },
  likeInfo_2: {
    color: colors.gray,
  },
  likeInfo_3: {
    color: colors.lightDark,
  },
  likeView3: {
    width: 120,
    ...sty.jCenter,
    ...sty.aEnd,
  },

  //**==Request style start==**/
  requestView3: {
    ...sty.fRow,
    ...sty.aCenter,
  },
  requestAcceptBtn: {
    borderWidth: 0.5,
    borderColor: colors.lightDarker,
    height: 30,
    width: 30,
    marginLeft: 10,
    ...sty.jCenter,
    ...sty.aCenter,
  },
  Textstyle1: {
    ...sty.padH10,
    ...sty.padV10,
    textAlign: "center",
    fontSize: fonts.large,
    fontWeight: "bold",
    color: colors.black, // colors.heading2,
    fontFamily: "Poppins-Regular",
  },
  
  emptyNotification: {
    ...sty.appBorder,
    ...sty.mgB10,
    overflow: "hidden",
    width: "100%",
    paddingTop: globals.WINDOW_HEIGHT * 0.3,
  },
  uploadBtn: {
    color: "#fff",
    ...sty.tCenter,
    ...sty.padV5,
    fontSize: fonts.small,
  },
  applyTxt: {
    // ...sty.tCenter,
    backgroundColor: colors.primaryColor,
    ...sty.aCenter,
    ...sty.jCenter,
    ...sty.padH5,
    // borderWidth: 1.5,
    height: 25,
    ...sty.padV5,
    borderRadius: 3,
    overflow: "hidden",
  },
});
