import { ActionSheet } from "native-base";
import {  ActionSheetIOS } from "react-native";
import albums from "../../../screens/aferLogin/uploadPhoto/albums/Albums";
import { colors, globals } from "../../../../configs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default (UploadSheet = async (navigation) => {
  const language = await AsyncStorage.getItem("language");

  // const menu =
  //   language.toLocaleLowerCase() == "german" ||
  //   language.toLocaleLowerCase() == "he"
  //     ? ["Story", "Bild", "Video", "Blog", "Abbrechen"]
  //     : ["Story", "Image", "Video", "Blog", "Cancel"];

  /** Bottom Tab Add Post Array */
  const menu =
    language.toLocaleLowerCase() === "german" ||
    language.toLocaleLowerCase() === "he"
      ? ["Bild", "Video", "Abbrechen"]
      : ["Image", "Video", "Cancel"];
  ActionSheet.show(
    {
      options: [...menu],
      // title: 'Select',
      cancelButtonIndex: [...menu].length - 1,
      containerStyle: { padding: 10, justifyContent: "flex-end", flex: 1 },
      innerStyle: {
        backgroundColor: colors.light,
        minHeight: globals.WINDOW_HEIGHT / 3,
        maxHeight: (globals.WINDOW_HEIGHT / 4) * 3,
        padding: 5,
        elevation: 1,
        borderRadius: 5,
      },
      itemStyle: {
        flex: 1,
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderBottomWidth: 1,
      },
      listStyle: { marginLeft: -18 },
      seperatorStyle: { height: 4 },
    },
    (buttonIndex) => {
      console.log("buttonIndex :", buttonIndex);
      buttonIndex != 4 && albums({ navigation, index: buttonIndex });
    }
  );
});
