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
} from "../../../configs";
import { WINDOW_WIDTH } from "../../../configs/libs/globals";
export const styles = StyleSheet.create({
  wrapper: {
    ...sty.flex1,
    backgroundColor: "#fff",
  },
  termsTxtOld: {
    ...sty.tCenter,
    fontSize: fonts.xxSmall,
    fontFamily: "Helvetica-light",
    color: colors.black,
    paddingVertical: 3,
    paddingTop:10
  },
  headerView: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    borderBottomColor: colors.black,
    borderBottomWidth: 0.5,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  loginBtn: {
    backgroundColor: "transparent",
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 45,
    marginVertical: 7,
    width: "100%",
    alignSelf: "center",
  },
  loginBtnTxt: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: fonts.small,
    ...sty.padV5,
  },
  socialText: {
    ...sty.tCenter,
    fontSize: fonts.small,
    fontWeight: "700",
  },
  logoWrap: {
    // ...sty.aCenter,
    // ...sty.mgT25,
    // ...sty.mgB5
    height: 140,
    ...sty.jEnd,
    ...sty.aCenter,
  },
  logoImg: {
    height: 80,
    width: "70%",
  },
  forgotPassTxt: {
    ...sty.tCenter,
    fontSize: fonts.small,
    color: colors.white, //colors.primaryColor
  },
  wrap2: {
    ...sty.flex1,
    ...sty.jEnd,
  },
  termsTxt: {
    ...sty.tCenter,
    fontSize: fonts.xxSmall,
    color: colors.white, // colors.heading2
    fontFamily: "Helvetica-light",
    // fontWeight: "300",
    paddingVertical: 3,
  },
  termsLink: {
    ...sty.tCenter,
    fontSize: fonts.xxSmall,
    fontFamily: "Helvetica",
    color: colors.black,
    fontWeight: "bold",
    paddingBottom: 15,
  },
  radioLeft: {
    width: "95%",
    borderWidth: 0.5,
    borderColor: colors.primaryColor,
  },
  radioRight: {
    ...sty.aSelfEnd,
    width: "95%",
    borderWidth: 0.5,
    borderColor: colors.primaryColor,
  },
  radioTxtLeft: {
    width: "100%",
    ...sty.tCenter,
    ...sty.padV10,
    fontSize: fonts.small,
  },
  radioTxtRight: {
    width: "100%",
    ...sty.tCenter,
    ...sty.padV10,
    fontSize: fonts.small,
  },
  readioTxtSelected: {
    backgroundColor: colors.primaryColor,
    color: "#fff",
  },
  footerWrap: {
    ...sty.fRow,
    ...sty.jCenter,
    flexWrap: "wrap",
    ...sty.padH20,
    ...sty.padB20,
  },
  item: {
    backgroundColor: "white",
  },
  itemFirst: {
    backgroundColor: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  itemLast: {
    backgroundColor: "white",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  registerButton: {
    ...sty.mgV10,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#fff",
    ...sty.mgH10,
    padding: 3,
    // ...sty.padV5
  },
  registerBtnTxt: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: fonts.medium,
    ...sty.padV5,
  },
  fbBtn: {
    backgroundColor: "#3F51B5",
    padding: 3,
    borderColor: "#fff",
    borderWidth: 2,
    ...sty.mgV5,
    borderRadius: 5,
  },
  facebookBtn: {
    ...sty.appBorder,
    overflow: "hidden",
    backgroundColor: "#4267B2",
    padding: 3,
    borderColor: "#fff",
    borderWidth: 0,
    ...sty.mgV5,
    borderRadius: 5,
    ...sty.mgT30,
    ...sty.aCenter,
    ...sty.mgH10,
  },
  appleBtn: {
    ...sty.appBorder,
    overflow: "hidden",
    backgroundColor: "#FFF",
    padding: 3,
    borderColor: "#fff",
    borderWidth: 0,
    ...sty.mgV5,
    borderRadius: 5,
    ...sty.mgT15,
    ...sty.aCenter,
    ...sty.mgH10,
  },
});
