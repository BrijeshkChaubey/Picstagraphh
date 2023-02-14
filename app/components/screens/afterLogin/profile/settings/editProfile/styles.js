import { StyleSheet } from "react-native";
import { colors, fonts, sty } from "../../../../../../configs";

export const styles = StyleSheet.create({
  profileImgWrap: {
    ...sty.fRow,
    ...sty.aCenter,
    ...sty.jCenter,
    ...sty.padV20,
  },
  switchView: {
    position: "absolute",
    bottom: 10,
    right: 0,
  },
  switchBtn: {
    height: 20,
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
  btnsave: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 5,
  },
  profileImgView: {
    height: 120,
    width: 120,
    borderRadius: 100,
    // borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.light,
    overflow: "hidden",
    backgroundColor: colors.light,
  },
  profileImg: {
    height: 120,
    width: 120,
  },
  editProfileImgView: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightDarker,
    marginLeft: 10,
  },
  editProfileImgTxt: {
    color: colors.gray,
  },
  dateSelectWrap: {
    ...sty.fRow,
    ...sty.jSpace,
    ...sty.mgT5,
    paddingHorizontal: 3,
  },
  dateItem: {
    ...sty.flex1,
  },
  dateItemInner: {
    width: "90%",
    borderWidth: 0.5,
    borderColor: colors.lightDark,
    ...sty.appBorder,
    height: 40,
    ...sty.jCenter,
    ...sty.padH10,
  },
  dateItemTxt: {
    fontSize: fonts.medium,
  },
  dateIconWrap: {
    position: "absolute",
    right: 5,
    top: 0,
  },
  dateIconUp: {
    top: 5,
    color: colors.lightDark,
  },
  dateIconDown: {
    bottom: 5,
    color: colors.lightDark,
  },
  radioLeft: {
    width: "95%",
    borderWidth: 0.5,
    borderColor: colors.primaryColor,
    ...sty.appBorder,
  },
  radioRight: {
    ...sty.aSelfEnd,
    width: "95%",
    borderWidth: 0.5,
    borderColor: colors.primaryColor,
    ...sty.appBorder,
  },
  radioTxtLeft: {
    width: "100%",
    ...sty.tCenter,
    ...sty.padV10,
    fontSize: fonts.small,
    borderRadius: 15,
  },
  radioTxtRight: {
    width: "100%",
    ...sty.tCenter,
    ...sty.padV10,
    fontSize: fonts.small,
    borderRadius: 5, //10
  },
  readioTxtSelected: {
    backgroundColor: colors.primaryColor,
    color: "#fff",
  },
  dropdownWrap: {
    ...sty.fRow,
    ...sty.jSpace,
    ...sty.padH10,
    ...sty.padV10,
    ...sty.appBorder,
    backgroundColor: colors.white,
    // backgroundColor: colors.appBg
  },
  textCenter: {
    ...sty.fRow,
    ...sty.jSpace,
    ...sty.aCenter,
    ...sty.padH10,
    ...sty.padV10,
  },
  bigDropdownWrap: {
    ...sty.fRow,
    ...sty.jSpace,
    ...sty.padH15,
    ...sty.padV10,
    borderWidth: 1,
    borderColor: colors.light,
    ...sty.appBorder,
    backgroundColor: colors.appBg,
  },
  bigDropdownItemsWrap: {
    ...sty.flex1,
    ...sty.fRow,
    flexWrap: "wrap",
  },
  bigDropdownItem: {
    borderRadius: 5, //10,
    overflow: "hidden",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.light,
    backgroundColor: colors.light,
    marginHorizontal: 5,
    marginVertical: 2,
  },
  socialInputWrap: {
    ...sty.fRow,
    borderWidth: 1,
    borderColor: colors.lightDark,
  },
  line: {
    borderTopWidth: 1,
    borderTopColor: colors.lightDark,
    marginTop: 30,
  },

  dot: {
    height: 10,
    width: 10,
    borderRadius: 10,
    marginTop: 6,
    backgroundColor: colors.black,
  },
  socialInputLinkWrap: {
    ...sty.flex1,
    backgroundColor: colors.light,
    ...sty.jCenter,
    ...sty.padH5,
  },
  socialInputConnetWrap: {
    width: 80,
    ...sty.padV10,
    ...sty.jCenter,
  },
  socialInputChangeWrap: {
    width: 70,
    ...sty.padV10,
    ...sty.jCenter,
  },
  socialInputDeleteWrap: {
    width: 35,
    ...sty.aCenter,
    ...sty.padV10,
    ...sty.jCenter,
  },
  socialInputTbnTxt: {
    color: "#fff",
    ...sty.tCenter,
    fontSize: fonts.small,
  },
  disconnectSocialBtn: {
    width: 120,
    borderWidth: 0.5,
    borderColor: "#707070",
    borderRadius: 5, //10
  },
  disconnectSocialBtnTxt: {
    ...sty.tCenter,
    paddingVertical: 7,
    color: colors.heading1,
  },
  connectSocialBtnTxt: {
    ...sty.tCenter,
    paddingVertical: 7,
    color: "#fff",
  },
});
