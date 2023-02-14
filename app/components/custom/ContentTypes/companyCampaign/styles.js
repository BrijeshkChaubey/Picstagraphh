import { StyleSheet } from "react-native";
import { globals, colors, fonts, sty } from "../../../../configs";

const styles = StyleSheet.create({
  userBox: {
    borderRadius: 300,
    borderWidth: 0.5,
    // borderColor: colors.light,
    overflow: "hidden",
    width: 35,
    backgroundColor: colors.light,
  },
  headWrap: {
    // ...sty.padH10,
    paddingHorizontal: globals.WINDOW_WIDTH * 0.025,
    ...sty.padV10,
  },
  itemRight: {
    flex: 1,
    ...sty.fRow,
    ...sty.jEnd,
  },
  wrap: {
    ...sty.padT10,
    paddingTop: 10,
    ...sty.padH10,
    ...sty.jCenter,
  },
  icoWrap2: {
    ...sty.fRow,
    ...sty.aCenter,
    width: 35,
    height: 24,
    ...sty.aCenter,
    ...sty.fRow,
    ...sty.jEnd,
  },
  shareIcon: {
    height: 40,
    width: 40,
  },
  moreIcon: {
    height: 22,
    width: 22,
  },
  headWrapPrice: {
    ...sty.fRow,
    ...sty.padH10,
  },
  headingTxtWrap: {
    ...sty.fRow,
    flexWrap: "wrap",
    ...sty.flex1,
  },
  titleWrapF: {
    ...sty.padH10,
    ...sty.padV5,
  },
  titleF: {
    color: colors.gray,
  },
  descWrapF: {
    ...sty.padH10,
    // ...sty.padV5,
    // ...sty.padB10,
    flexWrap: "wrap",
  },
  descF: {
    color: colors.gray,
    fontSize: 14,
    ...sty.mgV10,
  },
  userImgWrap: {
    borderRadius: 300,
    // borderWidth: 0.5,
    // borderColor: colors.light,
    overflow: "hidden",
    width: 35,
    backgroundColor: colors.light,
  },
  starImgWrap: {
    width: 25,
    backgroundColor: "#fff",
  },
  starImg: {
    height: 25,
    width: 25,
  },
  userImg: {
    height: 35,
    width: 35,
  },
  trophyImg: {
    height: 25,
    width: 25,
  },
  userImg1: {
    height: 35 * 0.6,
    width: 35 * 0.6,
  },
  appliedBtn: {
    ...sty.appBorder,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.primaryColor,
    backgroundColor: "#fff",
    ...sty.mgV10,
    ...sty.padV10,
    ...sty.padH10,
    ...sty.mgH10,
  },
  appliedTxt: {
    color: colors.primaryColor,
    fontSize: fonts.small,
    ...sty.tCenter,
  },
  applyTxt: {
    // ...sty.tCenter,
    backgroundColor: colors.black,
    ...sty.aCenter,
    ...sty.jCenter,
    // borderWidth: 1.5,
    height: 25,
    borderRadius: 3,
  },
  round: {
    ...sty.appBorder,
    overflow: "hidden",
  },
  video: {
    width: globals.WINDOW_WIDTH,
    height: globals.WINDOW_WIDTH / 2,
    left: 0,
  },
  centerButton: {
    zIndex: 1,
    position: "absolute",
    top: globals.WINDOW_WIDTH / 2 - 15,
    left: globals.WINDOW_WIDTH / 2 - 20,
  },
  closeButton: {
    zIndex: 1,
    position: "absolute",
    top: 20,
    right: 20,
  },
  timerOnPhoto: {
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  profilrOnPhoto: {
    zIndex: 1,
    position: "absolute",
    top: 0,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  titleOnPhoto: {
    zIndex: 1,
    position: "absolute",
    top: globals.WINDOW_WIDTH / 2 - 25,
  },
  leftButtons: {
    zIndex: 1,
    position: "absolute",
    top: globals.WINDOW_WIDTH / 2,
    left: 20,
  },
  rightButtons: {
    zIndex: 1,
    position: "absolute",
    top: globals.WINDOW_WIDTH / 2,
    right: 20,
  },
  priceTab: {
    // borderRadius: 5, //10,
    // overflow: "hidden",
    backgroundColor: colors.darkBg,
    width: "100%",
    height: globals.WINDOW_WIDTH,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 5,
  },
  priceTab1: {
    // borderRadius: 5, //10,
    // overflow: "hidden",
    backgroundColor: colors.darkBg,
    width: "100%",
    height: globals.WINDOW_WIDTH,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  //   tabWrap: {
  //     ...sty.flex1,
  //     ...sty.padH30,
  //     ...sty.jCenter
  // }
  description: {
    ...sty.padH10,
    // flexWrap: 'wrap',
    ...sty.fRow,
    marginBottom: 0,
    marginTop: 5,
  },
  readMore: {
    position: "absolute",
    bottom: 0,
    right: 10,
  },
  bgimagewrap: {
    width: "100%",
    // ...sty.appBorder,
    // overflow: "hidden",
    // height : 450,
    height: globals.WINDOW_WIDTH/1.1,
  },
  bgimagewrap1: {
    width: globals.WINDOW_WIDTH * 0.6,
    // ...sty.appBorder,
    // overflow: "hidden",
    // height : 450,
    height: globals.WINDOW_WIDTH * 0.7,
  },
  section4widthStyle1: { width: globals.WINDOW_WIDTH * 0.6 },
  section4widthStyle2: {},
});
export default styles;
