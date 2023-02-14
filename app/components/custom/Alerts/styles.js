import { StyleSheet, Platform } from "react-native";
import {
  globals,
  helpers,
  validators,
  colors,
  fonts,
  images,
  sty,
  localize
} from "../../../configs";

const styles = StyleSheet.create({
  modalWrapper: {
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#000000b0",
    ...sty.aCenter,
    ...sty.jCenter,
    ...sty.flex1
  },
  modalWrapperInner: {
    width: globals.WINDOW_WIDTH - 50,
    maxHeight: globals.WINDOW_HEIGHT - 200,
    backgroundColor: "#fff",
    borderRadius: 5, // 10,
    overflow: "hidden"
  },
  typeWrapper: {
    flexDirection: "row"
  },
  errorHeadWrap: {
    ...sty.fRow,
    ...sty.padH15,
    ...sty.padV10,
    ...sty.jCenter,
    ...sty.aCenter,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightDark,
    height: 50
  },
  errorHeadTxt: {
    fontSize: 15,
    paddingLeft: 10,
    color: colors.gray
  },
  errListWrap: {
    maxHeight: globals.WINDOW_HEIGHT - (200 + 80)
  },
  errListItem: {
    ...sty.padH20,
    ...sty.padV10,
    ...sty.fRow,
    ...sty.aCenter,
    borderBottomWidth: 1,
    borderBottomColor: colors.light
  },
  errListTxt: {
    color: colors.gray,
    paddingLeft: 10
  },
  okBtnWrap: {
    height: 50
  },
  okBtn: {
    ...sty.padH20,
    ...sty.padV10,
    borderTopWidth: 1,
    borderTopColor: colors.lightDark
  },
  okBtnTouch: {
    ...sty.w100
  },
  okBtnTxt: {
    ...sty.tCenter,
    color: colors.gray,
    fontSize: fonts.medium
  }
});
export default styles;
