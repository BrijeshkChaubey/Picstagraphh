import { StyleSheet, Platform } from "react-native";
import {
  globals,
  helpers,
  validators,
  colors,
  fonts,
  images,
  sty,
  localize,
} from "../../../../../configs";

const isIphoneXR = helpers.checkIphoneXR();

export const styles = StyleSheet.create({
  inputWrap: {
    // ...sty.padH15,
    width: "100%",
    backgroundColor: "#fff",
    // height: 80,
    ...sty.jCenter,
  },
  preview: {
    ...sty.w100,
    ...sty.flex1,
  },
  bottomControls: {
    // ...sty.w100,
    ...sty.fRow,
    ...sty.jSpace,
    // ...sty.aCenter,
    ...sty.padH30,
    // backgroundColor: "transparent",
    position: "absolute",
    top: isIphoneXR
      ? globals.WINDOW_HEIGHT * 0.83
      : Platform.OS === "android"
      ? globals.WINDOW_HEIGHT * 0.9
      : globals.WINDOW_HEIGHT * 0.88,
    width: "100%",
    // height: 100,
    zIndex: 100,
  },
  leftControls: {
    ...sty.jCenter,
    ...sty.flex1,
    // position: "absolute",
    // top: 90,
    // left: 20,
  },
  albumImg: {
    height: 40,
    width: 40,
  },
  centerControls: {
    ...sty.fRow,
    ...sty.jCenter,
    ...sty.flex1,
  },
  captureWrap: {
    borderWidth: 1,
    borderColor: "#fff",
    ...sty.fRow,
    borderRadius: 20,
    ...sty.jCenter,
  },
  captureVideoView: {
    borderRightWidth: 1,
    borderRightColor: "#fff",
    ...sty.aCenter,
    ...sty.jCenter,
    ...sty.padH20,
  },
  captureImgView: {
    ...sty.aCenter,
    ...sty.padH20,
    ...sty.padV5,
    ...sty.jCenter,
  },
  rightControls: {
    ...sty.jCenter,
    ...sty.flex1,
    ...sty.aEnd,
  },
  topControls: {
    ...sty.w100,
    ...sty.padV20,
    ...sty.fRow,
    ...sty.jSpace,
    ...sty.padH30,
    // ...sty.padT70,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    width: "100%",
    height: 70,
    zIndex: 100,
  },
  topLeftControls: {
    ...sty.flex1,
  },
  topRightControls: {
    ...sty.flex1,
    ...sty.aEnd,
  },

  mediaHeadWrap: {
    ...sty.w100,
    // ...sty.padV10,
    ...sty.fRow,
    ...sty.jSpace,
    ...sty.padH20,
    // ...sty.padT15,
    ...sty.aCenter,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    width: "100%",
    height: 100,
    zIndex: 10,
  },
  mediaUserWrap: {
    ...sty.fRow,
    ...sty.flex1,
    ...sty.aCenter,
  },
  mediaUserImgWrap: {
    height: 45,
    width: 45,
    borderRadius: 100,
    overflow: "hidden",
    marginRight: 10,
  },
  mediaUserImg: {
    height: 45,
    width: 45,
  },
  mediaUserContentWrap: {
    ...sty.jCenter,
  },
  mediaUserContentTxt1: {
    color: "#fff",
    fontSize: fonts.small,
    fontWeight: "500",
  },
  mediaUserContentTxt2: {
    color: "#fff",
    fontSize: fonts.small,
  },
  mediaUserContentTxt3: {
    color: "#fff",
    fontSize: fonts.small,
  },
  mediaHeadRight: {
    justifyContent: "space-between",
    flexDirection: "column",
    ...sty.aCenter,
    // marginTop : 15
    // width: 50
  },
  mediaFooterWrap: {
    // ...sty.w100,
    ...sty.padV10,
    ...sty.fRow,
    ...sty.jSpace,
    ...sty.padH20,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    // width: '100%',
    // height: 60,
    zIndex: 10,
  },
  mediaFooterLeft: {
    ...sty.fRow,
  },
  mediaFooterRight: {
    ...sty.aEnd,
    paddingLeft: 5,
  },
  mediaPostBtn: {
    width: globals.WINDOW_WIDTH / 5,
    height: 45,
    alignContent: "center",
    borderRadius: 5,
    overflow: "hidden",
    ...sty.padV10,
  },
  mediaPostBtnTxt: {
    color: "#fff",
    ...sty.tCenter,
    fontWeight: "500",
    fontSize: 20,
  },
  recordProgress: {
    ...sty.jCenter,
    ...sty.aCenter,
  },
  recordProgressInner: {
    marginTop: -70,
  },
  inputWrap: {
    // ...sty.pad20,
    // paddingVertical: globals.WINDOW_HEIGHT * 0.01,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    position: "absolute",
    justifyContent: "center",
    bottom: 15,
    width: "100%",
    zIndex: 10,
  },
  videoStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  sendBtn: {
    color: colors.primaryColor,
    ...sty.fW700,
    marginLeft: 10,
    height: globals.WINDOW_HEIGHT * 0.06,
    width: globals.WINDOW_HEIGHT * 0.06,
  },
  listItem: {
    ...sty.fRow,
    backgroundColor: "#fff",
    // ...sty.mgB10,
    marginBottom: 2,
    // ...sty.appBorder
  },
});
