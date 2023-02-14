import React from 'react';
import {
  Text,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  Platform,
  StatusBar,
  View,
  SafeAreaView,
} from "react-native";
import { Provider } from "react-redux";
import { name as appName } from "../app.json";
import store from "./redux/configureStore";
import * as colors from "./configs/utils/colors";
import messaging from '@react-native-firebase/messaging';
import { globals } from "./configs";
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import { API } from "./configs/index.js";
import Main from "./components/screens/Main";
import { useEffect } from 'react';
import { NativeBaseProvider} from "native-base";
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

const App = () => {
  // if (
  //   globals.WEB_URL === "https://app.picstagraph.com/" &&
  //   globals.live === true
  // ) {
  //   console.log("app here");
  // }

  useEffect(() => {
    checkPermission();
    _requestPermissions();
    // return () => { }
  }, []);

  const handleOpenURL = (event) => {
    navigate(event.url);
  };

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermissionFirebase();
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
    } else {
      console.log("error");
    }
  };

  const requestPermissionFirebase = async () => {
    try {
      await messaging().requestPermission();
    } catch (error) {
      console.log("error firebase", error);
    }
  };

  const createNotificationListeners = async () => {
    notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        const { title, body } = notification;
        showAlert(title, body);
      });

    notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
      });


    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
    }

    messageListener = firebase.messaging().onMessage((message) => {

      console.log(JSON.stringify(message));
    });
  }

  const showAlert = (title, body) => {
    Alert.alert(
      title,
      body,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false },
    );
  }

  const messageListener = async () => {
    notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        const { title, body } = notification;
        showAlert(title, body);
      });

    notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        showAlert(title, body);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      showAlert(title, body);
    }

    messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  };

  const navigate = (url) => {
    const { loader } = props;
   // const { navigate } = props.navigation;

    if (url) {
      const token = url.split("://")[1];
      const routeName = url.split("://")[0];
      const type = url.split("?")[1];
      const task = type.split("=")[1];
      const realtoken = token.split("?")[0];

      if (
        routeName.toLocaleLowerCase() ===
        globals.CREDS.LINKING_APP_NAME.toLocaleLowerCase()
      ) {
        if (
          task.toLocaleLowerCase() ===
          globals.CREDS.RESET_PASS_TASK.toLocaleLowerCase()
        ) {
          let cb = Object.assign({}, helpers._standardCb(loader), {
            success: (res) => {
              navigate("ResetPassFinal", { token: realtoken });
              loader.hideLoader();
            },
          });
          loader.load();
          API.validateResetPassword({}, cb, { token: realtoken });
        } else if (
          task.toLocaleLowerCase() ===
          globals.CREDS.LOGIN_TASK.toLocaleLowerCase()
        ) {
          let cb = Object.assign({}, helpers._standardCb(loader), {
            success: (res) => {
              navigate("Login");
              loader.hideLoader();
            },
          });
          loader.load();
          API.validateRegister({}, cb, { token: realtoken });
        }
      }
    }
  };

  const _requestPermissions = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
    else {
      const trackingStatus = await requestTrackingPermission();
      console.log("tracking status", trackingStatus)
    }


   }
   console.log('store', store)

  return (
    <NativeBaseProvider>
    <SafeAreaView style={styles.rootView}>
    {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
    <Provider store={store}>
      <Main />
    </Provider>
  </SafeAreaView>
  </NativeBaseProvider>
  );
};


const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});
export default App;
