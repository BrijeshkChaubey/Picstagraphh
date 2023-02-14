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
} from "../../../../configs";

const styles = StyleSheet.create({
  headWrap: {
    ...sty.fRow,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderLeftWidth: 2.5,
    // borderRightWidth: 2.5,
    borderTopWidth: 0.5,
    borderColor: "#F0F0F0",
    // borderRadius: 10,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10
  },
  headingWrap: {
    ...sty.fRow,
    flexWrap: "wrap",
  },
  titleWrapF: {
    ...sty.padH10,
    ...sty.padV5,
  },
  titleF: {
    color: colors.gray,
  },
  titleWrap: {
    paddingTop: 6,
    // paddingBottom: 5,
    // ...sty.padH10,
  },
  title: {
    color: colors.gray,
  },
  descWrapF: {
    ...sty.padH10,
    ...sty.padV5,
    ...sty.padB10,
  },
  descF: {
    color: colors.gray,
    fontSize: 14,
  },
  userImgWrap: {
    borderRadius: 300,
    borderWidth: 0.5,
    borderColor: colors.light,
    overflow: "hidden",
    width: 35,
    backgroundColor: colors.light,
  },
  userImg: {
    height: 35,
    width: 35,
  },
  description: {
    // ...sty.padH10,
    paddingTop: 7,
    ...sty.fRow,
  },
  descriptionTxt: {
    fontSize: 14,
    color: colors.text,
    fontFamily: "Poppins-Regular",
  },
  readLess: {
    ...sty.mgT5,
    ...sty.aSelfEnd,
    ...sty.tCenter,
  },
  readMore: {
    position: "absolute",
    bottom: 0,
    right: 0,
    // borderWidth: 1
  },
  headingLocation: {
    lineHeight: 18,
    marginTop: Platform.OS === "ios" ? 0 : -5,
    fontSize: 12,
  },
});
export default styles;
