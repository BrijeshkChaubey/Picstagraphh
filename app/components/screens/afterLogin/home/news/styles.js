import { StyleSheet } from 'react-native';
import { globals, colors, fonts, sty } from '../../../../../configs';

export const styles = StyleSheet.create({
  Textstyle1: {
    ...sty.padH10,
    ...sty.padV10,
    fontSize: fonts.large,
    fontWeight: "bold",
    marginLeft: 20,
    color: colors.black, // colors.heading2,
    fontFamily: "Poppins-Regular",
  },
  imgWrap: {
    backgroundColor: colors.white,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.5,
    elevation: 2,
    margin: 10,
    borderRadius: 30,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  Textstyle2: {
    ...sty.padH10,
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 20,
    color: colors.gray, // colors.heading2,
    fontFamily: "Poppins-Regular",
  },
  emptyImg: {
    height: 350,
    marginHorizontal: 20,
    borderRadius: 10,
    width: 350,
    marginBottom: 10,
  },
  appLogo: {
    height: 30,
    width: 30,
  },
  emptyNews: {
    ...sty.appBorder,
    ...sty.mgB10,
    overflow: "hidden",
    width: "100%",
    paddingTop: globals.WINDOW_HEIGHT * 0.03,
  },
  registerBtn: {
    ...sty.mgT10,
    borderRadius: 10,
    overflow: "hidden",
  },
  uploadBtn: {
    color: "#fff",
    ...sty.tCenter,
    ...sty.padV5,
    fontSize: fonts.small,
    fontWeight: "700",
  },
});