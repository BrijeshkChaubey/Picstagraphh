import { View, Text, AsyncStorage } from 'react-native'
import React, { useState } from 'react'
import { sty, API, helpers } from "../../configs";
import LandingPage from './landingPage/LandingPage';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from '../navigations/MainNavigation';
import RootNavigation from '../navigations/RootNavigation';

import { setNavigation } from "../../redux/actions/NavAction";
import { _InlineLoader, _Loading } from "../custom";
import NetInfo from "@react-native-community/netinfo";
import NavigationService from "../navigations/NavigationService";
//import firebase from "react-native-firebase";
import * as globals from "../../configs/libs/globals";
//import Loading from '../custom/Loading/Loading';
//import Orientation from "react-native-orientation";
import { useEffect } from 'react';
var jwtDecode = require("jwt-decode");


export default function Main(props) {

  const [loading, setLoadig] = useState(false);
  const [autoLogin, setAutoLogin] = useState(true);
  //const { loading, autoLogin } = this.state;
  const netInfoComputed = async () => {
    NetInfo.fetch().then((state) => {
      let cb = {
        ok: () => { },
      };

      if (!state.isConnected)
        body: notification.body,
          // this.refs.loader.error('Error', "Please Connect to the Internet", cb);
          this.refs.loader.error(
            "Error",
            helpers.getLocale(
              localize,
              "internet",
              "Please_connect_to_the_Internet"
            ),
            cb
          );
    });

    this.unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected)
        this.refs.loader.error(
          "Error",
          helpers.getLocale(
            localize,
            "internet",
            "Please_connect_to_the_Internet"
          ),
          { ok: () => { } }
        );
    });
    await _checkAuth();

    // const channel = new firebase.notifications.Android.Channel(
    //   "foregroundNotification",
    //   "ForegroundNotification",
    //   firebase.notifications.Android.Importance.Max
    // ).setDescription("A natural description of the channel");
    // firebase.notifications().android.createChannel(channel);

    // this.notificationAppOpenedListener = firebase
    //   .notifications()
    //   .getInitialNotification()
    //   .then(function (notificationOpen) {
    //     if (notificationOpen != null) {
    //       if (
    //         notificationOpen.type_of_notification === "SUBSCRIBED" ||
    //         notificationOpen.type_of_notification === "SUBSCRIBED"
    //       )
    //         globals.setUserData("notificationData", {
    //           acitivity_owner: {
    //             type_of_notification:
    //               notificationOpen.notification._data.type_of_notification,
    //             username: notificationOpen.notification._data.type_of_activity,
    //             id: notificationOpen.notification._data.postId,
    //           },
    //         });
    //       else
    //         globals.setUserData("notificationData", {
    //           type_of_notification:
    //             notificationOpen.notification._data.type_of_notification,
    //           type_of_activity:
    //             notificationOpen.notification._data.type_of_activity,
    //           activity_id: { id: notificationOpen.notification._data.postId },
    //         });

    //       NavigationService.navigate("tabNav", "NotificationsNavigator");
    //     } else {
    //     }
    //   });

    // this.notificationDisplayedListener = firebase
    //   .notifications()
    //   .onNotificationDisplayed((notification) => { });

    // this.notificationListener = firebase
    //   .notifications()
    //   .onNotification((notification) => {
    //     this.displayNotification(notification);
    //   });

    // this.notificationOpenedListener = firebase
    //   .notifications()
    //   .onNotificationOpened((notificationOpen) => {
    //     let item = this._getItemObject(notificationOpen);
    //     if (
    //       props.navProps.activeNav.state.routeName !== "NotificationsHome"
    //     ) {
    //       globals.setUserData("notificationData", item);
    //       NavigationService.navigate("tabNav", "NotificationsNavigator");
    //     } else {
    //       props.navProps.activeNav.push("NotificationScreen", {
    //         item: item,
    //       });
    //     }
    //   });
    // this.messageListener = firebase.messaging().onMessage((message) => { });
  }

  const _getItemObject = (notificationOpen) => {
    let item = {
      type_of_notification:
        notificationOpen.notification._data.type_of_notification,
      type_of_activity: notificationOpen.notification._data.type_of_activity,
      activity_id: { id: notificationOpen.notification._data.postId },
    };
    if (
      item.type_of_notification === "MENTIONED" ||
      item.type_of_notification === "COMMENT" ||
      item.type_of_notification === "LIKE" ||
      item.type_of_notification === "APPLY" ||
      item.type_of_notification === "PARTICIPANT_WINNER"
    ) {
      if (item.type_of_activity === "campaign") {
        item = {
          type_of_notification:
            notificationOpen.notification._data.type_of_notification,
          type_of_activity:
            notificationOpen.notification._data.type_of_activity,
          activity_id: { id: notificationOpen.notification._data.postId },
        };
      } else if (item.type_of_activity === "media") {
        item = {
          type_of_notification:
            notificationOpen.notification._data.type_of_notification,
          type_of_activity:
            notificationOpen.notification._data.type_of_activity,
          activity_id: { id: notificationOpen.notification._data.postId },
        };
      } else if (item.type_of_activity === "participant") {
        item = {
          type_of_notification:
            notificationOpen.notification._data.type_of_notification,
          type_of_activity:
            notificationOpen.notification._data.type_of_activity,
          activity_id: { id: notificationOpen.notification._data.postId },
        };
      }
    } else if (
      item.type_of_notification === "SUBSCRIBED" ||
      item.type_of_notification === "SUBSCRIBED"
    ) {
      item = {
        acitivity_owner: {
          type_of_notification:
            notificationOpen.notification._data.type_of_notification,
          username: notificationOpen.notification._data.type_of_activity,
          id: notificationOpen.notification._data.postId,
        },
      };
    } else if (item.type_of_notification === "VIDEO_UPLOAD") {
      if (item.type_of_activity === "media") {
        item = {
          type_of_notification:
            notificationOpen.notification._data.type_of_notification,
          type_of_activity:
            notificationOpen.notification._data.type_of_activity,
          activity_id: { id: notificationOpen.notification._data.postId },
        };
      }
      if (item.type_of_activity === "participant") {
        item = {
          type_of_notification:
            notificationOpen.notification._data.type_of_notification,
          type_of_activity:
            notificationOpen.notification._data.type_of_activity,
          activity_id: { id: notificationOpen.notification._data.postId },
        };
      }
    }
    return item;
  };

  const _orientationDidChange = (orientation) => {
    // if (orientation === 'LANDSCAPE') {
    //     // Orientation.lockToLandscapeLeft()
    //     Orientation.lockToPortrait()
    // } else {
    //   Orientation.lockToPortrait()
    // }
  };

  const displayNotification = (notification) => {
    // console.log("displayNotification :", notification)
    const { localize } = props;
    const localNotification = new firebase.notifications.Notification({
      data: notification.data,
      sound: "default",
      show_in_foreground: true,
      title: notification.title,
      // body: notification.body,
    });

    let title =
      helpers.getLocale(localize, "pushNotification", notification.title) !==
        "Not found"
        ? helpers.getLocale(localize, "pushNotification", notification.title)
        : notification.title;
    let subtitle =
      helpers.getLocale(localize, "pushNotification", notification.subtitle) !==
        "Not found"
        ? helpers.getLocale(localize, "pushNotification", notification.subtitle)
        : notification.subtitle;
    let body =
      helpers.getLocale(localize, "pushNotification", notification.body) !==
        "Not found"
        ? helpers.getLocale(localize, "pushNotification", notification.body)
        : notification.body;
    let data =
      helpers.getLocale(localize, "pushNotification", notification.data) !==
        "Not found"
        ? helpers.getLocale(localize, "pushNotification", notification.data)
        : notification.data;

    if (Platform.OS == "android") {
      localNotification
        .setNotificationId(notification.notificationId)
        .setTitle(title)
        .setSubtitle(subtitle)
        // .setBody(body)
        // .setData(data)
        .android.setChannelId("foregroundNotification") // e.g. the id you chose above
        .android.setSmallIcon("ic_launcher") // create this icon in Android Studio
        .android.setColor("#000000") // you can set a color here
        .android.setAutoCancel(true)
        .android.setPriority(firebase.notifications.Android.Priority.High);

      // console.log("localNotification :", localNotification)
      firebase
        .notifications()
        .displayNotification(localNotification)
        .catch((err) => console.error(err));
    } else if (Platform.OS === "ios") {
      // const localNotification = new firebase.notifications.Notification()
      // .setNotificationId(notification.notificationId)
      // .setTitle(notification.title)
      // .setSubtitle(notification.subtitle)
      // .setBody(notification.body)
      // .setData(notification.data)
      // .ios.setBadge(notification.ios.badge);
      localNotification
        .setNotificationId(notification.notificationId)
        .setTitle(title)
        .setSubtitle(subtitle)
        // .setBody(body)
        // .setData(data)
        .ios.setBadge(notification.ios.badge);

      firebase
        .notifications()
        .displayNotification(localNotification)
        .catch((err) => console.error(err));
    }
  };



  useEffect(() => {
   // netInfoComputed();
    return () => {
      this.messageListener && this.messageListener();
      this.notificationListener && this.notificationListener();
      this.notificationOpenedListener && this.notificationOpenedListener();
      this.notificationDisplayedListener && this.notificationDisplayedListener();
      // // Orientation.removeOrientationListener(this._orientationDidChange);
      // // this.notificationAppOpenedListener && this.notificationAppOpenedListener();
      this.unsubscribe && this.unsubscribe();
    }
  }, []);

  const handleConnectivityChange = (isConnected) => {
    if (isConnected == true) {
      // console.log("you are online")
    } else {
      // console.log("you are offline")
    }
  };

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  const getToken = async () => {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
  }

  //2
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
    }
  }

  const _handleNotifications = async () => {
    try {
      const enabled = await firebase.messaging().hasPermission();

      if (enabled) {
        const firebaseToken = await AsyncStorage.getItem("firebaseToken");
        if (firebaseToken) {
          globals.fcmToken = firebaseToken;
        } else {
          const fcmToken = await firebase.messaging().getToken();
          if (fcmToken) {
            const token = await AsyncStorage.getItem("token");
            let userInfo = jwtDecode(token);

            let cb = {
              success: () => {
                AsyncStorage.setItem("firebaseToken", fcmToken);
              },
              error: () => { },
            };
            let header = helpers.buildHeader({ authorization: token });
            let data = {
              id: userInfo.id,
              token: fcmToken,
            };
            API.deviceFirebaseTokenSave(data, cb, header);
            globals.fcmToken = fcmToken;
          } else {
            const fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
              const token = await AsyncStorage.getItem("token");
              let userInfo = jwtDecode(token);

              let cb = {
                success: () => {
                  AsyncStorage.setItem("firebaseToken", fcmToken);
                },
                error: () => { },
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
        await firebase.messaging().requestPermission();
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const _checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");

    let autoLogin = token === null ? false : true;
    if (autoLogin) {
      console.log("above handle notification");
      // await _handleNotifications();
    }

    setLoadig(false);
    setAutoLogin(true);
  };



  //const { loading, autoLogin } = this.state;
  return (
    <View style={{ flex: 1 }}>
      {/* <Text>Hello its main page</Text> */}
      <NavigationContainer>
        {loading ? 
        (<><View><Text style={{
          fontSize:50,
          color:'red'
        }}>Hello Pictagraph</Text></View></>) 
        : autoLogin ? (<MainNavigation />) : (<RootNavigation />)} 
      </NavigationContainer> 
      {/* {<_Loading ref={"loader"} />} */}
    </View>
  )
}

// const mapStateToProps = (state) => ({
//   localize: state.localize,
//   navProps: state.navProps,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       setNavigation: setNavigation,
//     },
//     dispatch
//   );

// const MainRedux = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Main);