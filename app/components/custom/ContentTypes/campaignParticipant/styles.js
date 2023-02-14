import { StyleSheet } from "react-native";
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
  headerstyle: {
    ...sty.fRow,
    paddingHorizontal: 7.5,
    paddingVertical: 7.5,
    // borderLeftWidth: 2.5,
    // borderRightWidth: 2.5,
    // borderTopWidth: 1,
    borderColor: "#F0F0F0",
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10
  },
  userBox: {
    borderRadius: 300,
    borderWidth: 0.5,
    borderColor: colors.light,
    overflow: "hidden",
    width: 35,
    backgroundColor: colors.light,
  },
  userImgWrap: {
    borderRadius: 300,
    // borderWidth: 0.5,
    // borderColor: colors.light,
    overflow: "hidden",
    width: 35,
    backgroundColor: colors.light,
  },
  userImgWrapSmall: {
    borderRadius: 300,
    borderWidth: 0.5,
    borderColor: colors.light,
    overflow: "hidden",
    width: 25,
    height: 25,
    backgroundColor: colors.light,
    position: "absolute",
    right: 5,
    top: -5,
    zIndex: 20,
  },
  titleWrap: {
    // ...sty.padH10,
    paddingTop: 6,
    // ...sty.fRow,
    // ...sty.jSpace
  },
  description: {
    ...sty.fRow,
    ...sty.padH10,
    paddingTop: 5,
    // flexWrap: 'wrap',
  },
  descriptionTxt: {
    color: colors.gray,
    fontSize: 14,
  },
  readLess: {
    ...sty.mgT5,
    ...sty.aSelfEnd,
    ...sty.tCenter,
  },
  readLessTxt: {
    color: colors.lightDarker,
  },
  readMore: {
    position: "absolute",
    bottom: 0,
    right: 10,
  },
  readMoreTxt: {
    color: colors.lightDarker,
  },
  winnerStarCnt: {
    position: "absolute",
    alignContent: "center",
    zIndex: 2,
    top: 11,
  },
  starImg: {
    position: "relative",
    zIndex: 1,
  },
  btnContainer: {
    borderColor: colors.black,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  starCnt: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.black,
  },
  starCss: {
    height: 31,
    width: 31,
  },
  headingLocation: {
    lineHeight: 18,
    marginTop: Platform.OS === "ios" ? 0 : -5,
    fontSize: 12,
  },
});
export default styles;
