import { StyleSheet } from "react-native";
import { colors, sty } from "../../../configs";

export const styles = StyleSheet.create({
  filterTab: {
    ...sty.padH5,
    paddingVertical: 8,
    ...sty.appBorder,
    marginHorizontal: 10,
    backgroundColor: colors.appBg,
  },
  filterTabTxt: {
    color: colors.text,
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Poppins-ExtraBold",
  },
  textStyle: {
    color: colors.text,
    fontSize: 15,
    fontWeight:'600',
    fontFamily: "Poppins-ExtraBold",
  },
  itemStyle: {
    borderColor: colors.black,
    borderRadius: 25,
    // borderWidth: 1,
    backgroundColor: colors.white,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.25,
    elevation: 2,
    marginBottom: 5,
    paddingHorizontal: 7.5,
    paddingVertical: 2.5,
    marginHorizontal: 5,
    marginTop: 5,
  },
  textStyle: {
    color: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: "500",
  },
  filterHeaderWrap: {
    // ...sty.appBorder,
    backgroundColor: "#fff",
    // overflow: "hidden",
    ...sty.padV10,
    // ...sty.mgB10,
  },
});
