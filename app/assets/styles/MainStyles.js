import { StyleSheet } from "react-native";
import { colors, fonts, sty } from "../../configs";
import { Dimensions, Platform } from "react-native";
//import { WINDOW_WIDTH } from "../../configs/libs/globals";

const mainStyles = StyleSheet.create({
  appLayout: {
    flex: 1,
    backgroundColor: "#DCDCDC", // App background color
  },
  innerLayout: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#808080",
    overflow: "hidden",
    marginBottom: 10,
    padding: 10,
  },
  rootView: {
    flex: 1,
  },
  roundBox: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#808080",
    flex: 1,
    marginBottom: 10 ,
    overflow: "hidden",
  },
  rootViewLight: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  rootViewDark: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  rootViewDarker: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  hitSlop10: { top: 10, left: 10, right: 10, bottom: 10 },
  tabWrap: {
    paddingVertical: 8,
    borderBottomColor: "#000",
  },
  tabItem: {
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 5,
    left: 5,
    padding: 10,
    zIndex: 10,
  },
  avRegular: {
    fontFamily: "AvenirNext-Regular",
  },
  avDemi: {
    fontFamily: "AvenirNext-Medium",
  },
  avBold: {
    fontFamily: "AvenirNext-DemiBold",
  },
  headingTxtWrap: {
    paddingBottom:10,
    paddingTop:20,
  },
  headingTxt: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Poppins-Regular",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#DCDCDC",
  },
  cardWhite: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    width: Dimensions.get("window").width - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    elevation: 3,
    marginVertical: 10,
    alignSelf: "center",
    paddingTop: 10,
  },
  cardProfile: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    elevation: 3,
    marginVertical: 5,
  },
  postListItem: {
    // flex:1,
    // backgroundColor: "#fff",
    // shadowColor: '#000',
    // shadowOffset: { width: 0.2, height: 0.2 },
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
    // elevation: 5,
    // marginHorizontal: 8,
    // marginTop: 2,
    // marginBottom:5

     marginHorizontal:10,
     marginVertical: 4,
    borderRadius: 7,
    elevation: 1,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  //App Theme
  headTxt: { color: "#000", fontFamily: "Poppins-Regular" }, // fontSize: 12
  boldHeadTxt: {
    color: "#000",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
  lightHeadTxt: {
    color: "#000",
    fontFamily: "Poppins-Light",
    fontWeight: "300",
  },
  head2Txt: { color:  "#9B9B9B", fontFamily: "Poppins-Regular" }, // fontSize: 12 ,
  head3Txt: {
    color: "#000",
    fontFamily: "Poppins-Light",
    fontWeight: "300",
  },
  appTxt: { color: "#000", fontFamily: "Poppins-Regular" }, // fontSize: 12
  appTxtBold: { color: "#000", fontFamily: "Poppins-ExtraBold" },
  appTxtLight: {
    color: "#000",
    fontFamily: "Poppins-Light",
    fontWeight: "300",
  },

  //Theme white
  appTxtWhite: { color: "#fff", fontFamily: "Poppins-Regular" },
  appTxtBoldWhite: { color: "#fff", fontFamily: "Poppins-ExtraBold" },
  appTxtBoldBlack: { color: "#000", fontFamily: "Poppins-ExtraBold" },
  appTxtLightWhite: {
    color: "#fff",
    fontFamily: "Poppins-Light",
    fontWeight: "300",
  },
  /** Flex Styles */
  flex1: {
    flex: 1,
  },
  flexWhite: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flex1Center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flexCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexCol: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  flexRowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flexRowSpaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexRowSpaceAround: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  flexRowSpaceEvenly: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  /** Text Styles */
  text16W500: {
    color: "#000",
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
  },
  textBold18: {
    color: "#000",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    fontSize: 18,
  },
  textBold22: {
    color: "#000",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    fontSize: 22,
  },
  textHeadingIcon: {
    color: "#000",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
    marginRight:10,
  },
  textLH24: {
    color: "#000",
    fontFamily: "Poppins-Regular",
    lineHeight: 28,
  },
  textLightLH24: {
    color: "#000",
    fontFamily: "Helvetica-light",
    lineHeight: 24,
  },
  jobTextHeadingIcon: {
    color: "#000",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 10
  },
  jobTextMidHeading: {
    color: "#000",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    fontSize: 16,
    paddingTop: 10
  },
  jobTextNonBold: {
    color: "#000",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    paddingTop: 10,
  },
  jobTextDetail: {
    // color: colors.heading1,
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    paddingTop: 10
  },
});
export default mainStyles;
