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

export const styles = StyleSheet.create({
  commentsBox: {
    ...sty.fRow,
    ...sty.pad10,
    // ...sty.appBorder,
    backgroundColor: "#fff",
    //  ...sty.mgB10,
    marginBottom: 2,
    overflow: "hidden",
    
  },
  userImgWrap: {
    borderRadius: 100,
    width: 40,
    height: 40,
    overflow: "hidden",
    marginRight: 10,
    marginTop:5
  },
  userImg: {
    width: 40,
    height: 40,
  },
  commentCredsWrap: {
    ...sty.fRow,
    ...sty.flex1,
    width: "80%",
  },
  commentCredsRight: {
    ...sty.aEnd,
    ...sty.pad10,
    position: "absolute",
    right: 10,
    zIndex: 10,
  },
  commentReadMore: {
    ...sty.aEnd,
    ...sty.pad10,
    position: "absolute",
    right: 10,
    zIndex: 10,
    bottom: 5,
  },
  commentCredsTxt1: {
    fontSize: fonts.xSmall,
    paddingRight: 10,
    color: colors.gray,
  },
  commentCredsTxt2: {
    fontSize: fonts.xSmall,
    paddingRight: 10,
    color: colors.lightDarker,
  },
  commentCredsTxt3: {
    fontSize: fonts.xSmall,
    color: colors.gray,
  },
  commentTxt: {
    fontSize: fonts.xSmall,
    color: colors.gray,
  },
  footerWrap: {
    //height: 150,
    ...sty.padH15,
    ...sty.padV10,
    width: "100%",
    backgroundColor: "#fff",
    ...sty.appBorder,
  },
  footerWrapInner: {
    ...sty.fRow,
    ...sty.aCenter,
  },
  inputWrap: {
    ...sty.flex1,
    ...sty.fRow,
    borderWidth: 1,
    borderColor: colors.light,
    borderRadius: 20,
    ...sty.padH10,
    ...sty.aCenter,
  },
  inputWrapInner: {
    ...sty.flex1,
    ...sty.jCenter,
    // height: 50,
  },
  input: {
    ...sty.flex1,
    ...sty.jStart,
    padding: 2,
    marginRight: 1,
    marginTop: 2,
    marginBottom: 2,
    fontSize: fonts.xxSmall,
  },
  sendWrap: {
    width: 65,
    ...sty.aEnd,
    ...sty.jCenter,
  },
  sendTxt: {
    color: colors.primaryColor,
    ...sty.fW700,
    marginRight: 10,
  },
  imojiIco: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  listItem: {
    ...sty.fRow,
    backgroundColor: "#fff",
    // ...sty.mgB10,
    // marginBottom: 2,
    // ...sty.appBorder
  },
});
