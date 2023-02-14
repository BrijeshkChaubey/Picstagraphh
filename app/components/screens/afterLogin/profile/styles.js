import { StyleSheet } from "react-native";
import { globals, colors, fonts, sty } from "../../../../configs";

export const styles = StyleSheet.create({
  profileInfoWrap: {
    // ...sty.fRow,
    ...sty.padV5,
    overflow: "visible",
    backgroundColor: "#fff",
    borderRadius: 10,
    height:210,
    //  marginBottom: 10,
    ...sty.aCenter,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 10,
    marginTop: 6,
    backgroundColor: colors.black,
  },
  gradiantWrap: {
    borderRadius: 100,
    borderColor: "#fff",
    padding: 1.5,
    width: 88,
  },
  userImgWrap: {
    width: 85,
    ...sty.appBorder,
    overflow: "hidden",
  },
  userImg: {
    width: "100%",
    height: 85,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 100,
  },
  profilewrapper: {
    // ...sty.f,
    // ...sty.padV5,
    overflow: "visible",
    backgroundColor: "#fff",
    // borderRadius: 5, //10,
    //  marginBottom: 10,
    // overflow: "hidden"
  },
  profileImgWrap: {
    width: 85,
    paddingBottom: 15,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  profileImgWrapInnter: {
    height: 85,
    width: 85,
    // ...sty.appBorder,
    borderRadius: 44.5,
    overflow: "hidden",
  },
  profileImg: {
    height: 85,
    width: 85,
    backgroundColor: colors.light,
  },
  profileStatsWrap: {
    width: globals.WINDOW_WIDTH - 90,
    paddingLeft: 5,
    paddingRight: 5,
    ...sty.jEnd,
    borderWidth: 0,
    marginTop: 10,
  },
  profileStat: {
  
    marginBottom: 7,
    // borderWidth: 1
  },
  profileStatCount: {
    ...sty.tCenter,
    fontSize: fonts.medium,
    fontWeight: "bold",
  },
  profileStatTxt: {
    ...sty.tCenter,
    color: colors.lightDarker,
    // fontWeight: "bold"
  },
  uploadBtn: {
    color: "#fff",
    ...sty.tCenter,
    ...sty.padV5,
    paddingTop:7,
    fontSize: fonts.xSmall,
    fontWeight: "bold",
    height: 35,
  },
  tabWrap: {
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.light,
    borderTopWidth: 0.5,
    borderTopColor: colors.light,
  },
  tabStyle: {
    ...sty.padV5,
  },
  tabLabel: {
    color: colors.darkGray,
  },
  aboutTabWrap: {
    ...sty.padH15,
    ...sty.padB15,
  },
  aboutGeneralInfoWrap: {},
  aboutGeneralInfoItem: {
    ...sty.fRow,
    ...sty.padV15,
  },
  aboutInfoItems: {
    ...sty.fRow,
    ...sty.padV10,
    paddingLeft: 10,
    
  },
  skillView: {
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.15,
    paddingHorizontal: 10,
    marginLeft: 12,
    elevation: 2,
  },
  aboutGeneralInfoItem_1: {
    width: 130,
  },
  aboutGeneralInfoItem_2: {
    ...sty.flex1,
  },
  aboutGeneralInfoItem_1Txt: {
    color: colors.gray,
  },
  aboutGeneralInfoItem_2Txt: {
    color: colors.gray,
  },
  aboutLabelHead: {
    color: colors.gray,
    ...sty.mgT15,
  },
  aboutPersonalIntWrap: {
    ...sty.fRow,
    flexWrap: "wrap",
  },
  line: {
    borderTopWidth: 1,
    borderTopColor: colors.lightDark,
    marginLeft: 30,
    marginTop: 15,
  },
  aboutOfferTagWrap: {},
  aboutOfferTag: {
    ...sty.mgV10,
    paddingRight: 10,
  },
  imageDim: {
    height: 20,
    width: 20,
    
  },
  aboutOfferTagTxt: {
    ...sty.padH25,
    ...sty.tCenter,
    paddingVertical: 8,
    backgroundColor: colors.primaryColor,
    color: "#fff",
    width: "auto",
    ...sty.appBorder,
    overflow: "hidden",
  },
  aboutSocialItem: {
    ...sty.fRow,
    ...sty.mgV10,
  },
  aboutSocialItem_1: {
    width: 50,
  },
  aboutSocialItem_1_Img: {
    height: 25,
    width: 25,
  },
  aboutSocialItem_2: {
    ...sty.flex1,
    ...sty.jCenter,
  },
  aboutSocialItem_3: {
    ...sty.jCenter,
  },
  visitProfileBtn: {
    width: 100,
    borderWidth: 0.5,
    borderColor: colors.primaryColor,
    overflow: "hidden",
    ...sty.appBorder,
  },
  visitProfileBtnTxt: {
    ...sty.tCenter,
    ...sty.padV5,
    color: colors.primaryColor,
  },
  modalWarp: {
    justifyContent: "center",
    minHeight: globals.WINDOW_HEIGHT / 3,
    backgroundColor: colors.light,
    borderRadius: 10,
  },
  modalImgWrap: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  modalTextWrap: {
    alignItems: "center",
    paddingBottom: 10,
  },
  modalSeperator: {
    height: 1,
    backgroundColor: colors.lightDark,
  },
  modalBtnWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBtnText: {
    fontSize: 20,
    textAlign: "center",
  },
  modalHead: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalDesc: {
    fontSize: 16,
    textAlign: "center",
  },
});
