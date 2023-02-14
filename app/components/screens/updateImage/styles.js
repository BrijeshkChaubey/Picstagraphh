import { StyleSheet } from "react-native";
import { globals, colors, fonts, sty } from "../../../configs";
import { WINDOW_WIDTH } from "../../../configs/libs/globals";

export const styles = StyleSheet.create({
  profileImgWrap: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  profileImgView: {
    height: WINDOW_WIDTH / 2,
    width: WINDOW_WIDTH / 2,
    borderRadius: WINDOW_WIDTH / 4,
    borderWidth: 0.5,
    borderColor: colors.gray,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  headerContainer: {
    position: "absolute",
    top: 30,
    alignSelf: "center",
    alignItems: "center",
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
    height: WINDOW_WIDTH / 2,
    width: WINDOW_WIDTH / 2,
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
    color: colors.white,
    fontSize: fonts.medium,
    ...sty.padV5,
  },
  btnGallery: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.25,
    elevation: 2,
  },
});
