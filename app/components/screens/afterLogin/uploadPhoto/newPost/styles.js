import { StyleSheet } from "react-native";
import { globals, colors, sty } from "../../../../../configs";

export const styles = StyleSheet.create({
  postImgWrap: {
    ...sty.flex1,
    marginTop: 45,
  },
  postImg: {
    width: globals.WINDOW_WIDTH,
    height: globals.WINDOW_HEIGHT - 200,
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    margin: 10,
  },
  userImageWrap: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 100,
    overflow: "hidden",
  },
  userImage: {
    height: 50,
    width: 50,
  },
  username: {
    color: colors.gray,
    ...sty.fW700,
  },
  name: {
    color: colors.gray,
    ...sty.fW700,
  },
  media: {
    height: 80,
    width: 80,
    ...sty.appBorder,
    overflow: "hidden",
  },
  mediaBig: {
    height: 100,
    width: 100,
    ...sty.appBorder,
    overflow: "hidden",
  },
  titleInput: {
    borderWidth: 0,
    padding: 0,
  },
  descWrapLarge: {
    backgroundColor: colors.appBg,
  },
  descWrapLargeInner: {
    ...sty.fRow,
  },
  advertiseWrap: {
    ...sty.fRow,
    ...sty.jSpace,
    ...sty.aCenter,
  },
  listItem: {
    ...sty.fRow,
    backgroundColor: "white",
    shadowOpacity: 0.15,
    elevation: 2,
    shadowOffset: { height: 1, width: 1 },
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 15,
    // borderBottomColor: colors.appBg,
    // borderBottomWidth: 2,
  },
  desc: {
    ...sty.flex1,
  },
  descItem: {
    ...sty.fRow,
    backgroundColor: "#fff",
    ...sty.padV15,
    ...sty.padH15,
    overflow: "hidden",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "grey",
    borderBottomColor: "grey",
  },
  checkBox: {
    height: 20,
    width: 20,
  },
  shareGradient: {
    ...sty.padH10,
    ...sty.padV10,
    overflow: "hidden",
  },
});
