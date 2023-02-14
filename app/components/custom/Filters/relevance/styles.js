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
} from "../../../../configs";

export const styles = StyleSheet.create({
  listItem: {
    ...sty.fRow,
    ...sty.jSpace,
    // ...sty.appBorder,
    ...sty.aCenter,
    backgroundColor: "#fdfdfd",
    marginVertical: 8,
    shadowColor: "#000",
    // marginHorizontal: 10,
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
  selectedList: {
    borderRadius: 30,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
