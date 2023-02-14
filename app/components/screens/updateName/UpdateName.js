import React, { Component, useEffect, useState } from "react";
import { View, BackHandler, AsyncStorage } from "react-native";
import { useSelector } from "react-redux";
import { Input, Item } from "native-base";
import { globals, helpers, colors, fonts, sty, API } from "../../../configs";
import { _Lang, _Button } from "../../custom";
import { mainLayoutHoc } from "../../hoc";
import mainStyles from "../../../assets/styles/MainStyles";
import { styles } from "./styles";
import { setNavigation } from "../../../redux/actions/NavAction";
import { setLoginProp } from "../../../redux/actions/LoginAction";
import { setLoginData } from "../../../redux/actions/LoginAction";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import analytics from '@react-native-firebase/analytics';
import { WINDOW_WIDTH } from "../../../configs/libs/globals";
var jwtDecode = require("jwt-decode");

const UpdateName = ( props ) => {
  // const {
  //   isFBUser,
  //   isAppleUser,
  //   userDetail,
  //   userInfo,
  //   fbresult,
  //   appleresult,
  //   isGoogleUser,
  //   googleresult,
  // } = props;
  const localize = useSelector((state) => state.localize);
  const [userName,setUserName] = useState("");
  const [isFBUser,setIsFBUser] = useState(isFBUser);
  const [isAppleUser,setIsAppleUser] = useState(isAppleUser);
  const [isGoogleUser,setIsGoogleUser] = useState(isGoogleUser);
  const [userDetail,setUserDetail] = useState(userDetail);
  const [userInfo,setUserInfo] = useState(userInfo);
  const [fbresult,setFbresult] = useState(fbresult);
  const [appleresult,setAppleresult] = useState(appleresult);
  const [googleresult,setGoogleresult] = useState(googleresult);


  useEffect(() =>{
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    }
  },[]);


  const handleBackButton = () => {
    return true;
  }

  const saveUserData = async () => {
    const { loader } = props;
    let validator = helpers._validateData({
      username: [
        this.state.userName,
        "required|max-20|space|emoji",
        helpers.getLocale(localize, "editProfile", "user_name"),
      ],
    });

    if (validator.status === false) {
      errorModal.show(validator.data);
    } else {
      let cb = Object.assign({}, helpers._standardCb(loader), {
        success: async (res) => {
          loginAgain(res.data.username);
        },
        error: (err) => {
          // console.log("err :", err)
          loader.error(
            "Error",
            !err.success && err.message
              ? err.message
              : "Error in profile update",
          );
        },
      });

      let header = helpers.buildHeader({
        authorization: userDetail.token,
      });
      const data = {};

      // if (this.state.isFBUser || this.state.isAppleUser)
      //   data.username = this.state.userName;

      data.username = userName;
      // data.isProfilePicSkip = true;

      //loader.load();
      API.userInfoUpdate(data, cb, header);
    }
  };

  const loginAgain = (username) => {
    const { loader } = props;

    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: async (res) => {
        const newToken = res.data.token;
        loader.hideLoader();

        moveToNext();

        _handleNotifications();
        await AsyncStorage.setItem("token", newToken);
        await AsyncStorage.setItem("secureFgp", res.data.secureFgp);
        globals.setUserData("loginValidated", true);

        dispatch(setLoginData(
          Object.assign({}, userInfo, {
            token: newToken, // userDetail.token
            miniProfileUrl: userDetail.miniProfileUrl,
            username: username,
            secureFgp: res.data.secureFgp,
          }),
        ));
      },
      error: (err) => {
        console.log("err :", err);
        loader.error(
          "Error",
          !err.success && err.message
            ? err.message
            : "Error in  fblogin agin after update user name",
        );
      },
    });

    if (isFBUser) {
      API.fblogin(fbresult, cb);
    } else if (isAppleUser) {
      API.applelogin(appleresult, cb);
    } else {
      API.googlelogin(googleresult, cb);
    }
  };

  const _handleNotifications = async () => {
    try {
      const enabled = await analytics().messaging().hasPermission();
      if (enabled) {
        const firebaseToken = await AsyncStorage.getItem("firebaseToken");
        if (firebaseToken) {
          globals.fcmToken = firebaseToken;
        } else {
          const fcmToken = await analytics().messaging().getToken();
          if (fcmToken) {
            const token = await AsyncStorage.getItem("token");
            let userInfo = jwtDecode(token);

            let cb = {
              success: () => {
                AsyncStorage.setItem("firebaseToken", fcmToken);
              },
              error: () => {},
            };
            let header = helpers.buildHeader({ authorization: token });
            let data = {
              id: userInfo.id,
              token: fcmToken,
            };
            API.deviceFirebaseTokenSave(data, cb, header);
            globals.fcmToken = fcmToken;
          } else {
            const fcmToken = await analytics().messaging().getToken();
            if (fcmToken) {
              const token = await AsyncStorage.getItem("token");
              let userInfo = jwtDecode(token);

              let cb = {
                success: () => {
                  AsyncStorage.setItem("firebaseToken", fcmToken);
                },
                error: () => {},
              };
              let header = helpers.buildHeader({ authorization: token });
              let data = {
                id: userInfo.id,
                token: fcmToken,
              };
              API.deviceFirebaseTokenSave(data, cb, header);
              globals.fcmToken = fcmToken;
            }
          }
        }
      } else {
        await analytics().messaging().requestPermission();
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const skipPress = () => {
    const { loader } = props;
    if (userName !== "") {
      saveUserData();
    } else {
      loader.error(
        helpers.getLocale(localize, "loadingModal", "error"),
        helpers.getLocale(localize, "errorModal", "enter_username"),
      );
    }
  };

  const  moveToNext = () => {
    props.changeTab(props.index + 1);
  };


  return (
    <>
        <View style={mainStyles.flex1}>
          <View style={styles.headerContainer}>
            <_Lang style={mainStyles.textBold22} text={"login.your_user"} />
            <_Lang style={mainStyles.textLightLH24} text={"login.user_desc"} />
          </View>
          {/* <Item regular style={styles.inputContainer}> */}
            <Input
              style={{ ...sty.input, width: "100%" }}
              onChangeText={(t) => this.setState({ userName: t })}
              value={userName}
              autoCapitalize={"none"}
              keyboardType={"ascii-capable"}
              contextMenuHidden={true}
              placeholder={helpers.getLocale(
                localize,
                "login",
                "your_user",
              )}
            />
         {/* </Item> */} 
          {/* Need to resolve */}
        </View>
        <_Button
          text={helpers.getLocale(localize, "login", "skip")}
          callback={() => {
            this.skipPress();
          }}
          gradiant={true}
          style={styles.registerBtn}
          btnTxtStyle={[styles.registerBtnTxt, { fontSize: fonts.medium }]}
        />
      </>
  )
}

export default mainLayoutHoc({})(UpdateName);