import { StyleSheet } from "react-native";
import { globals, colors, sty } from "../../../../configs";

export const styles = StyleSheet.create({
  userBox: {
    ...sty.aCenter,
    borderRadius: 0,
    ...sty.mgB10,
    backgroundColor: "#fff",
    width: globals.WINDOW_WIDTH / 2 - 15,
  },
  userBoxImage: {
    width: "100%",
    height: globals.WINDOW_WIDTH / 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  userImageOuter: {
    borderColor: colors.lightDark,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  username: {
    ...sty.tCenter,
    ...sty.padT5,
    color: colors.gray,
  },
  userBoxName: {
    ...sty.tCenter,
    ...sty.padT5,
    color: colors.lightDarker,
  },
  userBtn: {
    borderWidth: 0.5,
    borderColor: colors.primaryColor,
    borderRadius: 5,
    marginVertical: 10,
  },

  userImgWrap: {
    width: globals.WINDOW_WIDTH / 2 - 18,
    ...sty.appBorder,
  },
  userImgWrapInner: {
    width: globals.WINDOW_WIDTH / 2 - 4,
    overflow: "hidden",
  },
});
