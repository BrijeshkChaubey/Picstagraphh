import { StyleSheet } from "react-native";
import {
  globals,
  helpers,
  validators,
  colors,
  fonts,
  images,
  sty,
  localize,
} from "../../../../configs";

const styles = StyleSheet.create({
  imgLoading: {
    width: "100%",
    height: globals.WINDOW_WIDTH / (16 / 9),
    backgroundColor: colors.darkBg,
    ...sty.jCenter,
    ...sty.aCenter,
  },
  imgError: {
    width: "100%",
    height: globals.WINDOW_WIDTH / (16 / 9),
    backgroundColor: colors.darkBg,
    ...sty.jCenter,
    ...sty.aCenter,
  },
  imgModalWrap: {
    ...sty.flex1,
    backgroundColor: colors.darkBg,
    justifyContent: "center",
    alignItems: "center",
  },
  imgClose: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  imgModal: {
    width: globals.WINDOW_WIDTH,
    height: globals.WINDOW_WIDTH * 0.95,
    backgroundColor: colors.gray,
  },
  postImg: {
    width: globals.WINDOW_WIDTH,
    height: 220,
    backgroundColor: colors.darkBg,
  },
  imgLikeOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#2f2f2f59",
    zIndex: 1,
    ...sty.jCenter,
    ...sty.aCenter,
  },
  likeIcon: {
    height: 50,
    width: 50,
  },
  statsView: {
    height: 80,
    width: 112,
    backgroundColor: colors.lighter,
    paddingVertical: 16,
    paddingHorizontal:8,
    marginRight: 10,
    borderRadius:10
  },
  statsTitle: {
    fontWeight: 'bold',
    fontSize: 12,
   
  },
  statsCount: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop:10
  },
  //Video
  videoWrap: {
    width: "100%",
    height: globals.WINDOW_WIDTH / (16 / 9),
  },
  videoOverlay: {
    position: "absolute",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    // backgroundColor: '#00000066'
    backgroundColor: "transparent",
  },
  videoLoadOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    // backgroundColor: colors.lightDark,
    backgroundColor: "white",
    ...sty.jCenter,
    ...sty.aCenter,
    zIndex: 20,
  },
  video: {
    width: '100%',
    height: globals.WINDOW_WIDTH / (16 / 9),
    // left: 0
    // position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   bottom: 0,
    //   right: 0,
  },
  videoControlWrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "transparent",
    ...sty.padH5,
    // ...sty.padV5,
    zIndex: 10000,
  },
  videoLoader: {
    width: "100%",
    height: globals.WINDOW_WIDTH / (16 / 9),
    backgroundColor: colors.lightDark,
    ...sty.jCenter,
    ...sty.aCenter,
  },
  videoError: {
    width: "100%",
    height: globals.WINDOW_WIDTH / (16 / 9),
    backgroundColor: colors.darkBg,
    ...sty.jCenter,
    ...sty.aCenter,
  },
  videoLikeOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#19181859",
    zIndex: 10,
    ...sty.jCenter,
    ...sty.aCenter,
  },
  shareModalInnerLayout: {
    backgroundColor: "white",
    height: (globals.WINDOW_HEIGHT / 5) * 3,
    borderRadius: 5, // 10,
  },
  shareModalOuterLayout: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  shareModalHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  shareModalHeadline: {
    color: colors.white,
    fontWeight: "500",
    fontSize: 21,
  },
  modalWrap: {
    minHeight: globals.WINDOW_HEIGHT / 5,
    justifyContent: "center",
  },
});
export default styles;
