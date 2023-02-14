
import { helpers } from "../../../../configs";
import { Platform } from "react-native";

export const editImage = async (data) => {
    const imgData = data.uri ? data.uri : data.path;
    let permission =
      Platform.OS === "android"
        ? await helpers.checkPermissionAndroid("storage")
        : await helpers.checkIOSPermission();
    if (permission === "granted") {
      // const editedData = await PESDK.openEditor(imgData);
      // const editedData = await PESDK.openEditor(imgData);
      // return editedData;
    } else {
      helpers._alertForSetting();
    }
  };
  
  export const editVideo = async (data) => {
    const videoData = data.uri ? data.uri : data.path;
    let permission =
      Platform.OS === "android"
        ? await helpers.checkPermissionAndroid("storage")
        : await helpers.checkIOSPermission();
    if (permission === "granted") {
      // const editedData = await VESDK.openEditor(videoData);
      // return editedData;
    } else {
      helpers._alertForSetting();
    }
  };