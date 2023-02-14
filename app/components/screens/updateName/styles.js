import { StyleSheet } from "react-native";
import { globals, colors, fonts, sty } from "../../../configs";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../configs/libs/globals";

export const styles = StyleSheet.create({
  profileImgWrap: {
    // ...sty.fRow,
    ...sty.aCenter,
    // ...sty.jCenter,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  profileImgView: {
    height: 180,
    width: 180,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.light,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  editProfileImgView: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    marginLeft: 10,
    paddingTop: 30,
  },
  editProfileImgTxt: {
    color: colors.gray,
  },
  profileImg: {
    height: 180,
    width: 180,
  },
  registerBtn: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    borderRadius: 5,
    width: globals.WINDOW_WIDTH - 40,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  registerBtnTxt: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: fonts.medium,
    ...sty.padV5,
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    width: WINDOW_WIDTH - 40,
    marginTop: 50,
    alignSelf: "center",
    paddingLeft: 10,
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.25,
    elevation: 2,
  },
});
