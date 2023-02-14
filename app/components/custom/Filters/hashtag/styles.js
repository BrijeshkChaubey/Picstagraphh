import { StyleSheet } from "react-native";
import { colors, sty } from "../../../../configs";
import { WINDOW_WIDTH } from "../../../../configs/libs/globals";

export const styles = StyleSheet.create({

  listItem: {
    ...sty.fRow,
    ...sty.jSpace,
    // ...sty.appBorder,
    ...sty.aCenter,
    backgroundColor: "#fdfdfd",
    marginVertical: 8,
    shadowColor: "#000",
     marginHorizontal: 8,
    // marginVertical: 5,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    ...sty.padH15,
    height: 40,
    backgroundColor: colors.white,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.15,
    elevation: 2,
    borderRadius: 25,
    width: WINDOW_WIDTH - 20,
    alignSelf: "center",
    marginVertical: 5,
  },
  selectedList: {
    borderRadius: 30,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
