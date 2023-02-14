import { setLoginData, resetStore } from "../../../redux/actions/LoginAction";
import { setTranslation } from "../../../redux/actions/LocalizeAction";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Waterfall from "../../../components/custom/Waterfall/index";
import { setAppData } from "../../../redux/actions/AppDataActions";
import { setNavigation } from "../../../redux/actions/NavAction";
import { useSelector,useDispatch } from 'react-redux';
import mainStyles from "../../../assets/styles/MainStyles";
import { useNavigation } from '@react-navigation/native';
import * as RNLocalize from "react-native-localize";
import React, { useEffect, useState } from 'react';
import { _Lang } from "../../custom";
import { styles } from "./styles";
import {
  globals,
  helpers,
  images,
  API
} from "../../../configs";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  AppState,
  Alert
} from 'react-native';

var jwtDecode = require("jwt-decode");
const creds = [
  { email: "", password: "" },
  { email: "BusinessAkash", password: "jspm123" },
];
//const fireAnalytics = firebase.analytics(); // should be enable later
const activeCred = creds[globals.live ? 0 : 1];


const LandingPage = (props) => {
  const dispatch = useDispatch();
  const localize = useSelector((state) => state.localize);
  const navigation = useNavigation();
  const [index, setIndex] = useState();
  const [routes, setRoutes] = useState([
    { index: 0, key: "tab1" },
    { index: 1, key: "tab2" },
    { index: 2, key: "tab3" },
  ]);
  const [iswaterFall,setIsWaterFall] = useState(true);
  const [data, setData] = useState({
    username: [
      activeCred.email,
      "required|min-2",
      "user_name_or_email",
      helpers.getLocale(localize, "login", "user_name_or_email"),
    ],
    password: [
      activeCred.password,
      "required|min-5",
      "password",
      helpers.getLocale(localize, "login", "password"),
    ],
  });
  const [currentAppState, setCurrentAppState] = useState(AppState.currentState);
  const [googleSignInProgress, setGoogleSignInProgress] = useState(false);

  useEffect(() => {

    // Linking.addEventListener("url", handleOpenURL);
    // Linking.getInitialURL().then((url) => {
    //   navigation.navigate(url);
    // });
    _getActiveLanguage();

    return () => {
      // Linking.removeEventListener("url", handleOpenURL);
    }
  }, []);

  const handleOpenURL = (event) => {
    navigate(event.url ? event.url : event);
  }

  const navigate = async(url) => {
    const { loader } = props;
    // const { navigate } = props.navigation;
    // console.log("Urlx", url);
    if (url) {
      const routeName = url.split("://")[0];
      if (
        routeName.toLocaleLowerCase() !==
        globals.CREDS.LINKING_APP_NAME.toLocaleLowerCase()
      ) {
        navigation.navigate("Login");
       await AsyncStorage.setItem("linkUrl", url);
      } else {
        const token = url.split("://")[1];
        const type = url.split("?")[1];
        const task = type.split("=")[1];
        const realtoken = token.split("?")[0];

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
          navigate("Login");
        }
      }
    }
  }

  const _getActiveLanguage = async () => {
    try {
      // const lang = await AsyncStorage.getItem("language");
      const lang = "en";
      if (lang !== null) {
        dispatch(setTranslation(
          lang.toLocaleLowerCase() === "english" ||
            lang.toLocaleLowerCase() === "en"
            ? "en"
            : "he",
        ));
      } else if (RNLocalize.getCountry().toUpperCase() !== "DE") {
       dispatch(setTranslation("en"));
      }
    } catch (error) {
      if (RNLocalize.getCountry().toUpperCase() !== "DE") {
        dispatch(setTranslation("en"));
      } else {
        dispatch(setTranslation("he"));
      }
    }
  }

  const _renderTabs = ({ route }) => {
    switch (route.key) {
      case "tab1":
        return (
          <View
            style={[
              styles.slideWrapText,
              { paddingTop: globals.WINDOW_HEIGHT / 6 },
            ]}
          />
        );
      case "tab2":
        return this.tabView(2);

      case "tab3":
        return this.tabView(3);

      case "tab4":
        return this.tabView(4);

      default:
        return null;
    }
  };

  const tabView = (index) => {
    return (
      <View>
        {/* <Image
          source={
            images[
            "intro" +
            (index - 1).toString() +
            props.localize.activeLanguage
            ]
          }
          style={{ height: 350, width: "100%" }}
          resizeMode={"contain"}
        /> */}
      </View>
    );
  };

  const renderDots = () => {
    const { routes, index } = this.state;

    return (
      <View style={[styles.circleWrap]}>
        {routes.map((item, active) => {
          let backgroundColor = index === active ? "#fff" : "#ffffffad";
          return (
            <View
              key={"active" + active}
              style={[styles.circle, { backgroundColor }]}
            />
          );
        })}
      </View>
    );
  };

  const checkIphoneXR = () => {
    return (
      Platform.OS === "ios" &&
      (globals.WINDOW_HEIGHT === 812 || globals.WINDOW_WIDTH === 812)
    );
  };

  _loginWithFB = (result) => {
    const { loader, resetStore } = props;
    resetStore();

    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: async (res) => {
        // fireAnalytics.logEvent("login", {});
        // fireAnalytics.setUserId(res.data.id);

        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("firebaseToken");
        await AsyncStorage.removeItem("secureFgp");
        // this._handleNotifications();
        // await AsyncStorage.setItem("token", res.data.token);
        var userInfo = jwtDecode(res.data.token);
        // props.setLoginData(
        //   Object.assign({}, userInfo, {
        //     token: res.data.token,
        //     miniProfileUrl: res.data.miniProfileUrl
        //   })
        // );
        setTranslation(globals.LANG_ARR[userInfo.language]);
        props.setApp;

        if (res.data.isProfilePicSkip) {
          this._handleNotifications();
          await AsyncStorage.setItem("token", res.data.token);
          await AsyncStorage.setItem("secureFgp", res.data.secureFgp);
          props.setLoginData(
            Object.assign({}, userInfo, {
              token: res.data.token,
              miniProfileUrl: res.data.miniProfileUrl,
              secureFgp: res.data.secureFgp,
            }),
          );

          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "TabNav" })],
          });
          props.navigation.dispatch(resetAction);
        } else {
          Keyboard.dismiss;

          props.navigation.push("PostRegistration", {
            FBUser: true,
            userDetail: res.data,
            userInfo: userInfo,
            fbresult: result,
          });
        }
      },
    });
    loader.load();
    API.fblogin(result, cb);
  };

  /** Method to handle Apple User login(only for iPhone user) */
  _loginWithApple = (result) => {
    const { loader, resetStore } = props;
    resetStore();

    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: async (res) => {
        // fireAnalytics.logEvent("login", {});
        // fireAnalytics.setUserId(res.data.id);

        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("firebaseToken");
        await AsyncStorage.removeItem("secureFgp");


        var userInfo = jwtDecode(res.data.token);
        setTranslation(globals.LANG_ARR[userInfo.language]);
        props.setApp;

        if (res.data.isProfilePicSkip) {
          this._handleNotifications();
          await AsyncStorage.setItem("token", res.data.token);
          await AsyncStorage.setItem("secureFgp", res.data.secureFgp);

          setLoginData(
            Object.assign({}, userInfo, {
              token: res.data.token,
              miniProfileUrl: res.data.miniProfileUrl,
              secureFgp: res.data.secureFgp,

            }),
          );

          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "TabNav" })],
          });
          props.navigation.dispatch(resetAction);
        } else {
          Keyboard.dismiss;

          props.navigation.push("PostRegistration", {
            AppleUser: true,
            userDetail: res.data,
            userInfo: userInfo,
            appleresult: result,
          });
        }
      },
    });
    loader.load();
    API.applelogin(result, cb);
  };

  _facebookLoginInit = async () => {
    if (Platform.OS === "android") {
      LoginManager.setLoginBehavior("web_only");
    }

    LoginManager.logInWithPermissions([
      "email",
      "public_profile",
      "user_friends",
      "user_link",
    ]).then(
      (result) => {
        if (result.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const infoRequest = new GraphRequest(
              "/me?fields=name,email,link,id",
              null,
              (error, result) => {
                if (error) {
                  console.log(
                    "Facebook error fetching data: " + error.toString(),
                  );
                } else {
                  console.log("Facebook success fetching data: ", result);
                  let language = "German";
                  if (localize.activeLanguage === "en") {
                    language = "English";
                  }
                  _loginWithFB(
                    Object.assign({}, result, {
                      language: language,
                    }),
                  );
                }
              },
            );

            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      (error) => {
        console.log("Facebook login failed with error: " + error);
      },
    );
  };

  /** Apple login button handler */
  onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });
      const { user: newUser, identityToken } = appleAuthRequestResponse;
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        var jwtdecodeToken = jwtDecode(identityToken);

        let firstName = appleAuthRequestResponse.fullName.givenName
          ? appleAuthRequestResponse.fullName.givenName
          : "";
        let lastName = appleAuthRequestResponse.fullName.familyName
          ? appleAuthRequestResponse.fullName.familyName
          : "";

        if (jwtdecodeToken.sub) {
          let language = "German";
          if (props.localize.activeLanguage === "en") {
            language = "English";
          }

          let appleUserinfo = {
            email: jwtdecodeToken.email || "",
            name: firstName + lastName,
            appleId: jwtdecodeToken.sub,
            language,
          };
          _loginWithApple(appleUserinfo);
        }
      }
    } catch (err) {
      console.log("err :", err);
    }
  };

  /** Push notification handler */
  _handleNotifications = async () => {
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
              success: async() => {
               await AsyncStorage.setItem("firebaseToken", fcmToken);
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
                success: async() => {
                await  AsyncStorage.setItem("firebaseToken", fcmToken);
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

  /** Facebook login backend API */
  _loginWithFB = (result) => {
    const { loader, resetStore } = props;
    resetStore();

    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: async (res) => {
        // fireAnalytics.logEvent("login", {});
        // fireAnalytics.setUserId(res.data.id);

        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("firebaseToken");
        await AsyncStorage.removeItem("secureFgp");

        var userInfo = jwtDecode(res.data.token);
        setTranslation(globals.LANG_ARR[userInfo.language]);

        if (res.data.isProfilePicSkip) {
          this._handleNotifications();
          await AsyncStorage.setItem("token", res.data.token);
          await AsyncStorage.setItem("secureFgp", res.data.secureFgp);

          setLoginData(
            Object.assign({}, userInfo, {
              token: res.data.token,
              miniProfileUrl: res.data.miniProfileUrl,
              secureFgp: res.data.secureFgp,

            }),
          );

          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "TabNav" })],
          });
          props.navigation.dispatch(resetAction);
        } else {
          Keyboard.dismiss;
          props.navigation.push("PostRegistration", {
            FBUser: true,
            userDetail: res.data,
            userInfo: userInfo,
            fbresult: result,
          });
        }
      },
    });
    loader.load();
    API.fblogin(result, cb);
  };

  /** Method to handle google user login */
  _loginWithGoogle = (result) => {
    const { loader, resetStore } = props;
    resetStore();

    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: async (res) => {
        // fireAnalytics.logEvent("login", {});
        // fireAnalytics.setUserId(res.data.id);

        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("firebaseToken");
        await AsyncStorage.removeItem("secureFgp");

        var userInfo = jwtDecode(res.data.token);
        setTranslation(globals.LANG_ARR[userInfo.language]);
        props.setApp;

        if (res.data.isProfilePicSkip) {
          this._handleNotifications();
          await AsyncStorage.setItem("token", res.data.token);
          await AsyncStorage.setItem("secureFgp", res.data.secureFgp);


          setLoginData(
            Object.assign({}, userInfo, {
              token: res.data.token,
              miniProfileUrl: res.data.miniProfileUrl,
              secureFgp: res.data.secureFgp,

            }),
          );

          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "TabNav" })],
          });
          props.navigation.dispatch(resetAction);
        } else {
          Keyboard.dismiss;

          props.navigation.push("PostRegistration", {
            GoogleUser: true,
            userDetail: res.data,
            userInfo: userInfo,
            googleresult: result,
          });
        }
      },
    });
    loader.load();
    API.googlelogin(result, cb);
  };

  _googleSignIn = async () => {
    this.setState({ googleSignInProgress: true });

    GoogleSignin.configure({
      webClientId: globals.SHA,
      offlineAccess: false,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const { user } = userInfo;

      let language = "German";
      if (props.localize.activeLanguage === "en") {
        language = "English";
      }

      this._loginWithGoogle({
        email: user.email,
        googleUsername: user.givenName + user.familyName,
        language,
        accessToken: user.id,
      });
      this.setState({ googleSignInProgress: false });
    } catch (error) {
      this.setState({ googleSignInProgress: false });
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          helpers.getLocale(
            props.localize,
            "loadingModal",
            "google_services",
          ),
        );
      } else {
        Alert.alert(error);
      }
    }
  };

  openBrowser = (url) => {
    url = globals.WEB_URL + url;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <SafeAreaView style={[mainStyles.flex1, { backgroundColor: "#000" }]}>
      <StatusBar barStyle="light-content" backgroundColor='#000' />
      <Waterfall waterfall={iswaterFall} />
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>
          {helpers.getLocale(localize, "landingPage", "welcomeTitle")}
        </Text>
        <Text style={styles.subtitle}>
          {helpers.getLocale(localize, "landingPage", "welcomesubTitle")}
        </Text>
      </View>
      <View >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("JoinNow");
            setIsWaterFall(false);
          }}>
          <View style={[styles.appleBtn]}>
            <Text allowFontScaling={false} style={styles.socialText}>
              {helpers.getLocale(localize, "landingPage", "join_now")}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={[mainStyles.flexCenter, { paddingBottom: 30 }]}>
          <_Lang
            style={styles.termsTxt}
            onPress={() => {navigation.navigate("Login");
            setIsWaterFall(false);
            
          }}
            text={"landingPage.alreadyMember"}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LandingPage;