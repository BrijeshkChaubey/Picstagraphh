import React, { Component, useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  BackHandler,
} from "react-native";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { mainLayoutHoc } from "../../hoc";
import { Input, Item } from "native-base";
import { _Lang, _Button } from "../../custom";
import CropPicker from "react-native-image-crop-picker";
import mainStyles from "../../../assets/styles/MainStyles";
import { setNavigation } from "../../../redux/actions/NavAction";
import { setLoginProp } from "../../../redux/actions/LoginAction";
import { globals, helpers, colors, images, sty, API } from "../../../configs";


const UpdateImage = (props) => {
  console.log("UpdateImage");
  console.log(props);
  const localize = useSelector((state) => state.localize);
  const [profileImg,setProfileImg] = useState({});
  const [profileImgFileName,setProfileImgFileName] = useState("");
  const [userName,setUserName] = useState("");

  useEffect(() =>{
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return() => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    }
  },[]);

  const handleBackButton = () => {
    return true;
  }

  const _uploadImg = async () => {
    let permission =
      Platform.OS === "android"
        ? await helpers.checkPermissionAndroid("storage")
        : await helpers.checkIOSPermission();
    if (permission === "granted") {
      CropPicker.openPicker({
        width: 1000,
        height: 1000,
        cropping: true,
        mediaType: "photo",
        compressImageQuality: 0.6,
        smartAlbums: [
          "PhotoStream",
          "Generic",
          "Panoramas",
          "Videos",
          "Favorites",
          "Timelapses",
          "AllHidden",
          "RecentlyAdded",
          "Bursts",
          "SlomoVideos",
          "UserLibrary",
          "SelfPortraits",
          "Screenshots",
          "DepthEffect",
          "LivePhotos",
          "Animated",
          "LongExposure",
        ],
      }).then((response) => {
        _uploadImgApi(response);
      });
      return;
    } else {
      helpers._alertForSetting();
    }
  };

  const _uploadImgApi = (imageData) => {
    const { loader } = props;

    let cb = Object.assign(
      {},
      {
        success: (res) => {
          console.log({ res });
          // this._userDataUpdate(res.data.fileName)
          dispatch(setLoginProp({ prop: "profileUrl", value: res.data.mediaUrl }));
          dispatch(setLoginProp({
            prop: "miniProfileUrl",
            value: res.data.mediaUrl ? res.data.mediaUrl : res.data.mediaUrl,
          }));

          if (res.data.fileName)
          setProfileImgFileName(res.data.fileName);
          setProfileImg(res.data.mediaUrl); 
          saveUserData();
            
        },
        error: (err) => {
          console.log("err :", err);
          loader.error("Error", "Unable to upload profile Photo");
        },
        complete: () => {},
      },
    );
    const fileNameArr = (imageData.path ? imageData.path : imageData.uri).split(
      "/",
    );
    const fileName = fileNameArr[fileNameArr.length - 1];

    const data = new FormData();
    data.append("media", {
      uri: imageData.path ? imageData.path : imageData.uri,
      type: imageData.mime ? imageData.mime : "image/jpeg",
      name: fileName,
    });

    let header = {
      "Content-type": "multipart/form-data",
      authorization: props.userDetail.token,
    };
    data.append("typeImage", "crop");
    data.append("typeContent", "image");
    data.append("coordinate", 50);
    data.append("postType", "profile");
    loader.load();
    API.profileImageSave(
      data,
      cb,
      helpers.buildHeader(header),
      globals.MEDIA_TYPE.PROFILE,
    );
  };

  const  saveUserData = () => {
    const { loader, userDetail } = props;
    if (profileImgFileName) {
      let cb = Object.assign(
        {},
        {
          success: (res) => {
          },
          error: (err) => {
            console.log("err :", err);
            loader.error(
              "Error",
              !err.success && err.message
                ? err.message
                : "Error in profile update"
            );
          },
          complete: () => loader.hideLoader(),
        }
      );

      let header = helpers.buildHeader({ authorization: userDetail.token });
      const data = {};

      if (profileImgFileName)
        data.profileImage = profileImgFileName;
      API.userInfoUpdate(data, cb, header);
    }
  };

  const setProfilePicSkipTrue = () => {
    const { loader, userDetail } = props;
    let cb = Object.assign(
      {},
      {
        success: (res) => {
        },
        error: (err) => {
          console.log("err :", err);
          loader.error(
            "Error",
            !err.success && err.message
              ? err.message
              : "Error in profile update"
          );
        },
        complete: () => loader.hideLoader(),
      }
    );

    let header = helpers.buildHeader({ authorization: userDetail.token });
    const data = {};
    data.isProfilePicSkip = true;
    API.userInfoUpdate(data, cb, header);
  };

  const skipPress = () => {
    saveUserData();
  };

  const moveToNext = () => {
   
    changeTab(index + 1);
  };

  const _setProp = (prop, value) => {
    setUserName(value);
  };

  const _renderNewSection1 = () => {
    return (
      <View style={{ paddingTop: 40, ...sty.aCenter }}>
        {isFBUser ? (
          <View style={{ width: "100%" }}>
            <_Lang
              style={{ ...sty.inputLabel, color: "white" }}
              pureText
              text={"UserName"}
            />
            {/* <Item
              regular
              style={{ ...sty.mgB10, ...sty.inputWrapmM, ...sty.appBorder }}
            > */}
              <Input
                placeholder={"Enter user Name"}
                onChangeText={(userName) => setUserName(userName)}
                style={{ ...sty.padV5, color: "white" }}
              />
            {/* </Item> */}
          </View> //checked
        ) : (
            <_Lang
              text={props.loginData.username}
              style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
              pureText
            />
          )}
      </View>
    );
  };

  const _renderNewSection2 = () => {
    return (
      <View style={mainStyles.flex1Center}>
        <View style={styles.profileImgView}>
          {helpers._isEmptyObject(profileImg) ? (
            <Image source={images.user} style={styles.profileImg} />
          ) : (
            <Image source={{ uri: profileImg }} style={styles.profileImg} />
          )}
        </View>
        <View style={styles.editProfileImgView}>
          <TouchableOpacity
            style={styles.btnGallery}
            onPress={() => {
              _uploadImg();
            }}>
            <_Lang
              style={{
                color: colors.black,
                fontSize: 16,
                fontWeight: "bold"
              }}
              text={"login.upload_profile_image"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const  _renderNewSection3 = () => {
   // const { localize } = props;
    return (
      <>
        <_Button
          text={helpers.getLocale(localize, "login", "skip")}
          callback={() => {
            moveToNext();
          }}
          gradiant={true}
          style={styles.registerBtn}
          btnTxtStyle={styles.registerBtnTxt}
        />
      </>
    );
  };


  return (
    <View style={mainStyles.flex1}>
        <View style={styles.headerContainer}>
          <_Lang style={mainStyles.textBold22} text={"login.your_pic"} />
          <_Lang style={mainStyles.textLightLH24} text={"login.pic_desc"} />
        </View>
        {_renderNewSection2()}
        {_renderNewSection3()}
      </View>
  )
}

export default mainLayoutHoc({})(UpdateImage);