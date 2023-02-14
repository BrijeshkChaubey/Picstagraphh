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
} from "../../../../../configs";

export const styles = StyleSheet.create({
  inputWrap: {
    ...sty.padH15,
    width: "100%",
    backgroundColor: "#fff",
    // height: 60,
    // ...sty.padV5,
    paddingTop: 5,
    paddingBottom:3,
    ...sty.jCenter,
  },
  imojiIco: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  sendBtn: {
    color: colors.primaryColor,
    ...sty.fW700,
    marginRight: 15,
  },
  imojiWrap: {
    height: 250,
  },
  msgBoxStyle: {
    maxWidth: "90%",
    minWidth: 150,
    width: "auto",
    borderRadius: 10, //10,
    ...sty.padH10,
    ...sty.padV10,
    ...sty.mgB10,
    ...sty.mgT10,
    paddingBottom: 25,

  },
  msgItem: {
    ...sty.padH15,
  },
  backgroundWhite: {
    backgroundColor: "#fff",
  },
});
