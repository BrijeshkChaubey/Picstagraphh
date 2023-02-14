import { StyleSheet } from "react-native";
import { colors, fonts, sty } from "../../../configs";

export const styles = StyleSheet.create({
  listItem: {
    ...sty.flex1,
    ...sty.fRow,
    ...sty.padH20,
    paddingVertical: 12,
    ...sty.jSpace,
    ...sty.aCenter,
    borderBottomColor: colors.appBg,
    backgroundColor: colors.white,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.15,
    elevation: 2,
    margin: 10,
    borderRadius: 5,
  },
  settingsListItem: {
     ...sty.flex1,
    ...sty.fRow,
    ...sty.padH20,
    paddingVertical: 12,
    ...sty.jSpace,
    ...sty.aCenter,
    borderBottomColor: colors.appBg,
    backgroundColor: colors.white,
    margin: 10,
  },
  itemTxt: {
    fontSize: fonts.medium,
    width: "100%",
  },
  sectionLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightDark,
    marginLeft:82
  },
  line: {
    ...sty.flex1,
    width: "100%",
    height: 1,
  },
  imgWrap: {
    height: 36,
    width: 36,
    borderRadius:18,
    marginRight: 20,
    ...sty.jCenter,
    ...sty.aCenter,
    backgroundColor: colors.white,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.5,
    elevation: 2,
  },
  imgDimen: {
    height: 20,
    width: 20,
  },
  flatListStyle: {
    paddingTop: 10,
  },
});
