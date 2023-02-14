import { StyleSheet } from "react-native";
import { globals, colors, fonts, sty } from "../../../../../configs";
import { WINDOW_WIDTH } from "../../../../../configs/libs/globals";

export const styles = StyleSheet.create({
  userBox: {
    ...sty.aCenter,
    borderRadius: 0,
    ...sty.mgB10,
    backgroundColor: "#fff",
    width: globals.WINDOW_WIDTH / 2 - 15,
  },
  uploadBtn: {
    color: "#fff",
    ...sty.tCenter,
    ...sty.padV5,
    fontSize: fonts.medium,
    fontWeight: "bold",
  },
  userImageOuter: {
    borderColor: colors.lightDark,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  userBoxOuter: {
    borderColor: colors.lightDark,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  userImgWrap: {
    width: globals.WINDOW_WIDTH / 2 - 18,
    ...sty.appBorder,
    // overflow: "hidden"
  },
  userImg: {
    width: "100%",
    height: globals.WINDOW_WIDTH / 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  username: {
    ...sty.tCenter,
    ...sty.padT5,
    color: colors.black,
  },
  btn: {
    borderColor: colors.primaryColor,
    marginVertical: 10,
    borderRadius: 5,
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
    borderRadius: 5,
    width: '75%',
    marginBottom: 5,
    marginTop: 5,
  },
  iconCancel: {
    color: 'grey',
    fontSize: 20,
  },
  btnInvite: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  inviteFriendsView: {
    position: "relative",
    bottom: 0,
    backgroundColor: "white",
    width: "100%",
    height: 70,
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 5,
  },
  inviteFriendsButton: {
    width: "95%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
});
