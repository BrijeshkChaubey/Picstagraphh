import * as colors from "./colors";
import * as fonts from "./fontSizes";
//import { WINDOW_WIDTH } from "../libs/globals";
import { Dimensions, Platform } from "react-native";

export const sty = {
  w100: { width: "100%" },

  blockMd: { paddingVertical: 10, paddingHorizontal: 15 },
  blockMd7: {
    paddingVertical: Dimensions.get("window").width / 45,
    paddingHorizontal: Dimensions.get("window").width / 20,
  },
  blockLg: { paddingVertical: 15, paddingHorizontal: 20 },
  blockSm: { paddingVertical: 5, paddingHorizontal: 10 },
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

  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  flex4: { flex: 4 },
  flex5: { flex: 5 },
  flex6: { flex: 6 },
  flex7: { flex: 9 },
  flex8: { flex: 8 },

  fRow: { flexDirection: "row" },

  //Justify content and item
  aCenter: { alignItems: "center" },
  jCenter: { justifyContent: "center" },
  jSpace: { justifyContent: "space-between" },
  aStart: { alignItems: "flex-start" },
  jStart: { justifyContent: "flex-start" },
  aEnd: { alignItems: "flex-end" },
  jEnd: { justifyContent: "flex-end" },
  aSelfEnd: { alignSelf: "flex-end" },
  aSelfStart: { alignSelf: "flex-start" },

  //Text align
  tCenter: { textAlign: "center" },
  tRight: { textAlign: "right" },
  tLeft: { textAlign: "left" },

  //Paddings
  pad5: { padding: 5 },
  pad10: { padding: 10 },
  pad15: { padding: 15 },
  pad20: { padding: 20 },
  pad25: { padding: 25 },
  pad30: { padding: 30 },
  pad35: { padding: 35 },

  //Paddings Vertical
  padV5: { paddingVertical: 5 },
  padV10: { paddingVertical: 10 },
  padV15: { paddingVertical: 15 },
  padV20: { paddingVertical: 20 },
  padV25: { paddingVertical: 25 },
  padV30: { paddingVertical: 30 },
  padV35: { paddingVertical: 35 },
  padV40: { paddingVertical: 40 },
  padV45: { paddingVertical: 45 },
  padV50: { paddingVertical: 50 },
  padV55: { paddingVertical: 55 },

  //Paddings Horizontal
  padH5: { paddingHorizontal: 5 },
  padH10: { paddingHorizontal: 10 },
  padH15: { paddingHorizontal: 15 },
  padH20: { paddingHorizontal: 20 },
  padH25: { paddingHorizontal: 25 },
  padH30: { paddingHorizontal: 30 },

  //Padding Top
  padT5: { paddingTop: 5 },
  padT10: { paddingTop: 10 },
  padT15: { paddingTop: 15 },
  padT20: { paddingTop: 20 },
  padT25: { paddingTop: 25 },
  padT30: { paddingTop: 30 },

  //Padding Bottom
  padB5: { paddingBottom: 5 },
  padB10: { paddingBottom: 10 },
  padB15: { paddingBottom: 15 },
  padB20: { paddingBottom: 20 },
  padB25: { paddingBottom: 25 },
  padB30: { paddingBottom: 30 },

  //Margin Vertical
  mgV5: { marginVertical: 5 },
  mgV10: { marginVertical: 10 },
  mgV15: { marginVertical: 15 },
  mgV20: { marginVertical: 20 },
  mgV25: { marginVertical: 25 },
  mgV30: { marginVertical: 30 },

  //Margin Horizontal
  mgH5: { marginHorizontal: 5 },
  mgH10: { marginHorizontal: 10 },
  mgH15: { marginHorizontal: 15 },
  mgH20: { marginHorizontal: 20 },
  mgH25: { marginHorizontal: 25 },
  mgH30: { marginHorizontal: 30 },

  //Margin Top
  mgT5: { marginTop: 5 },
  mgT10: { marginTop: 10 },
  mgT15: { marginTop: 15 },
  mgT20: { marginTop: 20 },
  mgT25: { marginTop: 25 },
  mgT30: { marginTop: 30 },

  //Margin Bottom
  mgB5: { marginBottom: 5 },
  mgB10: { marginBottom: 10 },
  mgB15: { marginBottom: 15 },
  mgB20: { marginBottom: 20 },
  mgB25: { marginBottom: 25 },
  mgB30: { marginBottom: 30 },

  //Font weight
  fW400: { fontWeight: "400" },
  fW500: { fontWeight: "500" },
  fW600: { fontWeight: "600" },
  fW700: { fontWeight: "700" },
  fW800: { fontWeight: "800" },

  inputWrap: {
    border: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopColor: colors.lightDark,
    borderEndColor: colors.lightDark,
    borderBottomColor: colors.lightDark,
    width: "100%",
  },
  input: {
    height: 40,
    color: colors.text,
  },
  inputWrapSm: {
    borderRadius: 5,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.5,
    backgroundColor: "white",
    elevation: 2,
    paddingLeft: 10,
  },
  inputWrapNew: {
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.25,
    backgroundColor: "white",
    elevation: 5,
    borderBottomColor: colors.lightDark,
    borderBottomWidth:0,
    paddingLeft: 10,
    borderRadius: 5,
  },
  inputSm: {
    // height: 40,
    fontSize: fonts.small,
    color: colors.text,
    fontFamily: "Helvetica",
  },
  inputLabel: {
    marginBottom: 9,
    color: "#000",
    marginLeft: 3,
    fontFamily: "Helvetica-light",
    // fontFamily: "Helvetica",
    fontWeight: "300",
  },
  appBorder: {
    borderRadius: 5,
    borderColor: "#808080",
  },
  appBorder25: {
    borderRadius: 5,
    borderColor: "#808080",
  },
};
