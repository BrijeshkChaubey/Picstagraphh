import { StyleSheet, Platform } from "react-native";
import { colors, fonts, sty } from "../../../configs";
import { WINDOW_HEIGHT } from "../../../configs/libs/globals";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    ...sty.flex1,
  },
  appLogo: {
    height: 35,
    width: 35,
  },
  bottomContainer: {
    position: WINDOW_HEIGHT<690? "relative":'relative',
    bottom: WINDOW_HEIGHT<690?0:30,
    width: "90%",
    alignSelf: "center",
    marginBottom:10
  },
  title: {
    ...sty.tCenter,
    fontSize: fonts.large,
    fontWeight: "bold",
    color: colors.black,
    paddingTop: 10,
    textAlign: "justify",
    paddingHorizontal: 12,
    // alignSelf: "center",
  },
  imgWrap: {
    backgroundColor: colors.white,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.5,
    elevation: 2,
    margin: 10,
    borderRadius: 30,
    height: 50,
    width: 50,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "center", //to show logo in center
  },
  socialIcon: {
    height: 25,
    width: 25,
    alignSelf: "center",
    position: "absolute",
    left: 15,
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
  socialText: {
    ...sty.tCenter,
    color: colors.black,
    fontSize: fonts.small,
    fontWeight: "700",
  },
  shadowContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    shadowOffset: { width: 1, height: 2 },
    elevation: 3,
    shadowOpacity: 0.15,
    backgroundColor: "white",
    paddingVertical: 25,
    marginBottom: 10,
  },
  logoWrap: {
    height: Platform.OS === "ios" ? 65 : 100,
    ...sty.jEnd,
    ...sty.aCenter,
  },
  logoImg: {
    height: 60,
    width: "60%",
  },
  forgotPassTxt: {
    ...sty.tCenter,
    fontSize: fonts.small,
    marginTop: 10,
    fontWeight:'bold'
  },
  btnTxt: {
    ...sty.padV5,
    ...sty.tCenter,
    fontSize: 16,
    color: colors.primaryColor,
  },
  loginBtn: {
    backgroundColor: "transparent",
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 45,
    marginVertical: 7,
    width: "95%",
    alignSelf: "center",
  },
  loginBtnTxt: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: fonts.small,
    ...sty.padV5,
  },
  fbBtn: {
    backgroundColor: "#3F51B5",
    padding: 3,
    borderColor: "#3F51B5",
    ...sty.mgV5,
    borderRadius: 5,
    overflow: "hidden",
    marginHorizontal: 30,
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
  },
  footerWrap: {
    ...sty.fRow,
    ...sty.jCenter,
    flexWrap: "wrap",
  },
  termsLink: {
    ...sty.tCenter,
    fontSize: fonts.xxSmall,
    paddingVertical: 3,
  },
  termsTxt: {
    ...sty.tCenter,
    fontSize: fonts.xxSmall,
    
    paddingVertical: 3,
    paddingTop: 20,
  },
  inputText: {
    height: 40,
    color: colors.text,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    // marginTop: 10,
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 14,
  },
  closeBtn: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 10,
    zIndex: 10,
  },
});