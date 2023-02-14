import { StyleSheet } from "react-native";
import { colors, fonts, sty } from "../../../configs";

const styles = StyleSheet.create({
  searchHeaderWrap: {
    ...sty.fRow,
    ...sty.padH10,
    paddingTop: 10,
    minHeight: 50,
    ...sty.jSpace,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.light,
  },
  headerWrap: {
    ...sty.fRow,
    ...sty.padH15,
    ...sty.aCenter,
    minHeight: 50,
    ...sty.jCenter,
  },
  headerBottomWrap: {
    ...sty.padH10,
    minHeight: 50,
  },
  headerLeftWrap: {
    ...sty.fRow,
    ...sty.padH10,
    ...sty.aCenter,
    minHeight: 50,
    ...sty.jSpace,
  },
  headingTxt: {
    fontSize: fonts.medium,
    width: "100%",
    ...sty.tCenter,
  },
  headingNewTxt: {
    fontSize: 16, //18, // 22
    // width: '100%',
  },
  headerRight: {
    // minWidth: 50,
    // paddingLeft: 10,
    ...sty.aEnd,
    ...sty.jCenter,
  },
  xrHeader: {
    ...sty.mgT10,
  },
  item1: {
    flex: 1,
    ...sty.fRow,
    ...sty.jStart,
    ...sty.padH10,
  },
  item2: {
    flex: 1,
    ...sty.fRow,
    ...sty.jEnd,
  },
});
export default styles;
