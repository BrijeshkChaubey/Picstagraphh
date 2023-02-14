import { StyleSheet } from "react-native";
import { colors, sty } from "../../../../configs";

const styles = StyleSheet.create({
  userBox: {
    borderRadius: 300,
    // borderWidth: 0.5,
    borderColor: colors.light,
    overflow: "hidden",
    width: 35,
    backgroundColor: colors.light,
  },
  headingTxtWrap: {
    ...sty.fRow,
    flexWrap: "wrap",
    ...sty.flex1,
  },
  titleWrap: {
    // ...sty.padH10,
    paddingTop: 6,
    // ...sty.padV10,
    // ...sty.fRow,
    // ...sty.jSpace
  },
  description: {
    paddingTop: 7,
    ...sty.fRow,
    //  ...sty.mgT10
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
  },
  headingLocation: {
    lineHeight: 18,
    marginTop: Platform.OS === "ios" ? 0 : -5,
    fontSize: 12,
  },
});
export default styles;
