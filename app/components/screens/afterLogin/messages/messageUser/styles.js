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
  userWrap: {
    ...sty.fRow,
    ...sty.padH10,
    backgroundColor: "#fff",
    ...sty.mgB10,
    ...sty.appBorder,
    overflow: "hidden",
  },
  userItem1: {
    width: 55,
    ...sty.jCenter,
  },
  userImgWrap: {
    borderRadius: 100,
    width: 45,
    overflow: "hidden",
  },
  userImg: {
    height: 45,
    width: 45,
  },
  userItem2: {
    ...sty.flex1,
    ...sty.jCenter,
  },
  iconCancel: {
    color: 'grey',
    fontSize: 20,
  },
  inputWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 40,
    borderWidth: 0,
    borderColor: '#F5F5F5',
    backgroundColor: "#F5F5F5",
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.15,
    // elevation: 2,
    borderRadius: 1000,
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
  },
});
