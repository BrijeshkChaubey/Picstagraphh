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
} from "../../../../../configs";

export const styles = StyleSheet.create({
  userBox: {
    /*  width: globals.WINDOW_WIDTH/2, 
        borderBottomWidth: 0.5, 
        borderRightColor: colors.light, 
        borderBottomColor: colors.light  */

    ...sty.aCenter,
    borderRadius: 5, //10,
    ...sty.mgB10,
    backgroundColor: "#fff",
    width: globals.WINDOW_WIDTH / 2 - 4
  },
  userImgWrap: {
    width: globals.WINDOW_WIDTH / 2 - 4,
    ...sty.appBorder,
    overflow: "hidden"
  },
  userBoxImgWrap: {
    width: "100%",
    height: 150,
    overflow: "hidden"
  },
  userBoxImg: {
    width: "auto",
    height: undefined,
    aspectRatio: 1 / 1
  },
  userBoxUsername: {
    ...sty.tCenter
  },
  userBoxBtn: {
    ...sty.padV10,
    ...sty.padH15
  },
  loadingWrap: {
    ...sty.flex1,
    ...sty.jCenter,
    ...sty.aCenter,
    backgroundColor: colors.darkBg
  },
  closeBtn: {
    position: "absolute",
    top: 35,
    right: 20
  },
  picsModal: {
    height: globals.WINDOW_HEIGHT,
    backgroundColor: "#000",
    marginTop: -17,
    height: globals.WINDOW_HEIGHT + 19
  },
  modalHeader: {
    ...sty.fRow,
    ...sty.jSpace,
    ...sty.padH20,
    position: "absolute",
    top: 20,
    left: 0,
    width: "100%",
    zIndex: 100
  },
  modalUserImg: {
    height: 40,
    width: 40,
    borderRadius: 100,
    overflow: "hidden",
    marginRight: 10
  },
  indicatorWrap: {
    ...sty.fRow,
    ...sty.jSpace,
    ...sty.padH10,
    position: "absolute",
    top: 40,
    left: 0,
    width: "100%",
    zIndex: 100
  },
  indicatorItem: {
    marginHorizontal: 3,
    height: 4,
    backgroundColor: colors.gray,
    flex: 1,
    borderRadius: 5,
    overflow: "hidden"
  },
  indicator: {
    height: 4,
    backgroundColor: "#fff"
  },
  footerWrap: {
    width: "100%",
    height: 60,
    marginTop: -70
  },
  footerWrapInner: {
    ...sty.jSpace,
    ...sty.fRow,
    ...sty.aEnd,
    height: 40,
    ...sty.padH15
  },
  footerInputWrap: {
    ...sty.fRow,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    ...sty.flex1,
    ...sty.padH15,
    ...sty.jSpace,
    ...sty.aCenter,
    marginRight: 15
  },
  footerInput: {
    color: "#fff",
    ...sty.flex1,
    height: 40
  },
  footerMore: {
    width: 30,
    ...sty.aEnd
  },
  footerMore: {
    width: 40,
    ...sty.jCenter,
    ...sty.aEnd
  },
  videoLoading: {
    position: "absolute",
    top: 0,
    left: 0,
    height: globals.WINDOW_HEIGHT,
    width: globals.WINDOW_WIDTH,
    backgroundColor: colors.darkBg,
    ...sty.jCenter,
    ...sty.aCenter,
    zIndex: 10
  },
  storyMeta: {
    ...sty.fRow,
    ...sty.jSpace,
    ...sty.aCenter,
    position: "absolute",
    bottom: 20,
    left: 0,
    width: "100%"
  }
});
