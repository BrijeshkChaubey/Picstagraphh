import { Platform, StyleSheet } from "react-native";
import { globals, colors, fonts, sty } from "../../../configs";

export const styles = StyleSheet.create({
  Textstyle1: {
    ...sty.padH10,
    ...sty.padV10,
    fontSize: fonts.large,
    fontWeight: "bold",
    marginLeft: 10,
    color: colors.black, // colors.heading2,
    fontFamily: "Poppins-Regular",
  },
  imgWrap: {
    backgroundColor: colors.white,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.5,
    elevation: 2,
    margin: 10,
    borderRadius: 30,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  Textstyle2: {
    ...sty.padH10,
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 10,
    color: colors.gray, // colors.heading2,
    fontFamily: "Poppins-Regular",
  },
  emptyImg: {
    height:globals.WINDOW_HEIGHT<690 ?globals.WINDOW_HEIGHT / 3.4:globals.WINDOW_HEIGHT/2.4,
    width: "100%",
    marginBottom: 10,
  },
  appLogo: {
    height: 30,
    width: 30,
  },
  emptyNews: {
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "95%",
    paddingVertical: 10,
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 7,
  },
  registerBtn: {
    ...sty.mgT10,
    borderRadius: 10,
    overflow: "hidden",
  },
  uploadBtn: {
    color: "#fff",
    ...sty.tCenter,
    ...sty.padV5,
    fontSize: fonts.small,
    fontWeight: "700",
    paddingTop:7,
    justifyContent:'center',
    height:40
  },
});
