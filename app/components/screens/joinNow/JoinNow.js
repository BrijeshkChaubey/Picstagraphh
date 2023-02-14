import { setLoginData, resetStore } from "../../../redux/actions/LoginAction";
import IconComp from "../../custom/ContentTypes/common/IconComponent.js";
import { setTranslation } from "../../../redux/actions/LocalizeAction";
import { globals, helpers, images, API, sty } from "../../../configs";
import { setAppData } from "../../../redux/actions/AppDataActions";
import { NavigationActions, StackActions } from "react-navigation";
import { setNavigation } from "../../../redux/actions/NavAction";
import mainStyles from "../../../assets/styles/MainStyles";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import * as RNLocalize from "react-native-localize";
import React, { useCallback, useEffect, useRef, useState } from 'react'
import FastImage from "react-native-fast-image";
import { bindActionCreators } from "redux";
import { mainLayoutHoc } from "../../hoc";
import { _Lang } from "../../custom";
import { styles } from "./styles";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from "@invertase/react-native-apple-authentication";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  TouchableOpacity,
  Platform,
  Text,
  SafeAreaView,
  Alert,
  ScrollView,
  Image,
  Linking,
  Modal, ActivityIndicator,
  AppState,
  Keyboard,
  StatusBar,
} from "react-native";
import analytics from '@react-native-firebase/analytics';
var jwtDecode = require("jwt-decode");


const creds = [
  { email: "", password: "" },
  { email: "BusinessAkash", password: "jspm123" },
];
const activeCred = creds[globals.live ? 0 : 1];

const JoinNow = (props) => {
  const dispatch = useDispatch();
  const localize = useSelector((state) => state.localize);
  const navigation = useNavigation();
  const [test, setTest] = useState("");
  const cbRef = useRef(null); 
  const [index, setIndex] = useState(0);
  const [load, setLoad] = useState(false);
  const [routes, setRoutes] = useState([
    { index: 0, key: "tab1" },
    { index: 1, key: "tab2" },
    { index: 2, key: "tab3" },
  ]);
  const [data, setData] = useState({
    username: [
      activeCred.email,
      "required|min-2",
      helpers.getLocale(localize, "login", "user_name_or_email"),
    ],
    password: [
      activeCred.password,
      "required|min-5",
      helpers.getLocale(localize, "login", "password"),
    ],
  });
  const [currentAppState, setCurrentAppState] = useState(AppState.currentState);

  const [googleSignInProgress, setGoogleSignInProgress] = useState(false);

  useEffect(() => {
    // Linking.addEventListener("url", handleOpenURL);
    // Linking.getInitialURL().then((url) => {
    //   navigate(url);
    // });
    _getActiveLanguage();
    return () => { }
  }, []);

  const _getActiveLanguage = async () => {
    try {
      const lang = await AsyncStorage.getItem("language");
      if (lang !== null) {
        setTranslation(
          lang.toLocaleLowerCase() === "english" ||
            lang.toLocaleLowerCase() === "en"
            ? "en"
            : "he",
        );
      } else if (RNLocalize.getCountry().toUpperCase() !== "DE") {
        setTranslation("en");
      }
    } catch (error) {
      if (RNLocalize.getCountry().toUpperCase() !== "DE") {
        setTranslation("en");
      } else {
        setTranslation("he");
      }
    }
  };
  const handleOpenURL = (event) => {
    navigate(event.url ? event.url : event);
  };

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
        navigate("Login");
       await  AsyncStorage.setItem("linkUrl", url);
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
  };

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
        return tabView(2);

      case "tab3":
        return tabView(3);

      case "tab4":
        return tabView(4);

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
   // const { routes, index } = this.state;

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

  /** Method to handle Facebook User login */
  const _loginWithFB = (result) => {

    const { loader } = props;
    // console.log( helpers._standardCb(loader));
    // dispatch(resetStore());
    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: async (res) => {
        analytics().logEvent("login", {});
        analytics().setUserId(res.data.id);
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("firebaseToken");
        await AsyncStorage.removeItem("secureFgp");
        var userInfo = jwtDecode(res.data.token);
        dispatch(setTranslation(globals.LANG_ARR[userInfo.language]));
        dispatch(setAppData);
        if (res.data.isProfilePicSkip) {
          _handleNotifications();
          await AsyncStorage.setItem("token", res.data.token);
          await AsyncStorage.setItem("secureFgp", res.data.secureFgp);
          dispatch(setLoginData(
            Object.assign({}, userInfo, {
              token: res.data.token,
              miniProfileUrl: res.data.miniProfileUrl,
              secureFgp: res.data.secureFgp,
            }),
          ));

          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "TabNav" })],
          });
          navigation.dispatch(resetAction);
        } else {
          Keyboard.dismiss;

          navigation.push("PostRegistration", {
            FBUser: true,
            userDetail: res.data,
            userInfo: userInfo,
            fbresult: result,
          });
        }
      },
    });
    API.fblogin(result, cb);
  };

  /** Method to handle Apple User login(only for iPhone user) */
  const _loginWithApple = (result) => {
    const { loader, resetStore } = props;
    dispatch(resetStore());
    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: async (res) => {
        analytics().logEvent("login", {});
        analytics().setUserId(res.data.id);

        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("firebaseToken");
        await AsyncStorage.removeItem("secureFgp");

        var userInfo = jwtDecode(res.data.token);
        dispatch(setTranslation(globals.LANG_ARR[userInfo.language]));
        dispatch(setApp);

        if (res.data.isProfilePicSkip) {
          _handleNotifications();
          await AsyncStorage.setItem("token", res.data.token);
          await AsyncStorage.setItem("secureFgp", res.data.secureFgp);

          dispatch(setLoginData(
            Object.assign({}, userInfo, {
              token: res.data.token,
              miniProfileUrl: res.data.miniProfileUrl,
              secureFgp: res.data.secureFgp,
            }),
          ));

          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "TabNav" })],
          });
          props.navigation.dispatch(resetAction);
        } else {
          Keyboard.dismiss;

          navigation.navigate("PostRegistration", {
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

  const _facebookLoginInit = async () => {
    const { loader } = props;
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
          console.log("Facebook login was cancelled");
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
  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        // requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [
          appleAuth.Scope.EMAIL,
          appleAuth.Scope.FULL_NAME,
        ],
      });
      console.log('appleAuthRequestResponse', appleAuthRequestResponse);
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
          if (localize.activeLanguage === "en") {
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
      // Alert.alert(" - " + a + " - " + JSON.stringify(err));
    }
  };

  /** Push notification handler */
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

  /** Facebook login backend API */
  // const _loginWithFB = (result) => {
  //   const { loader, resetStore } = props;
  //   resetStore();

  //   let cb = Object.assign({}, helpers._standardCb(loader), {
  //     success: async (res) => {
  //       fireAnalytics.logEvent("login", {});
  //       fireAnalytics.setUserId(res.data.id);

  //       await AsyncStorage.removeItem("token");
  //       await AsyncStorage.removeItem("firebaseToken");
  //       await AsyncStorage.removeItem("secureFgp");

  //       var userInfo = jwtDecode(res.data.token);
  //       props.setTranslation(globals.LANG_ARR[userInfo.language]);

  //       if (res.data.isProfilePicSkip) {
  //         this._handleNotifications();
  //         await AsyncStorage.setItem("token", res.data.token);
  //         await AsyncStorage.setItem("secureFgp", res.data.secureFgp);

  //         props.setLoginData(
  //           Object.assign({}, userInfo, {
  //             token: res.data.token,
  //             miniProfileUrl: res.data.miniProfileUrl,
  //             secureFgp: res.data.secureFgp,

  //           }),
  //         );

  //         const resetAction = StackActions.reset({
  //           index: 0,
  //           actions: [NavigationActions.navigate({ routeName: "TabNav" })],
  //         });
  //         props.navigation.dispatch(resetAction);
  //       } else {
  //         Keyboard.dismiss;
  //         props.navigation.push("PostRegistration", {
  //           FBUser: true,
  //           userDetail: res.data,
  //           userInfo: userInfo,
  //           fbresult: result,
  //         });
  //       }
  //     },
  //   });
  //   loader.load();
  //   API.fblogin(result, cb);
  // };

  /** Method to handle google user login */
  const _loginWithGoogle = (result) => {
    const { loader } = props;
    dispatch(resetStore());
    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: async (res) => {
        analytics().logEvent("login", {});
        analytics().setUserId(res.data.id);
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("firebaseToken");
        await AsyncStorage.removeItem("secureFgp");

        var userInfo = jwtDecode(res.data.token);
        dispatch(setTranslation(globals.LANG_ARR[userInfo.language]));
        dispatch(setAppData);
        console.log("userInfo" + userInfo);
        if (res.data.isProfilePicSkip) {
          // _handleNotifications();
          await AsyncStorage.setItem("token", res.data.token);
          await AsyncStorage.setItem("secureFgp", res.data.secureFgp);

          dispatch(setLoginData(
            Object.assign({}, userInfo, {
              token: res.data.token,
              miniProfileUrl: res.data.miniProfileUrl,
              secureFgp: res.data.secureFgp,
            }),
          ));

          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "TabNav" })],
          });
          //navigation.dispatch(resetAction);
        } else {
          Keyboard.dismiss;
          navigation.navigate("PostRegistration", {
            GoogleUser: true,
            userDetail: res.data,
            userInfo: userInfo,
            googleresult: result,
          });
        }
      },
    });
    // loader.load();
    API.googlelogin(result, cb);
  };


  const _googleSignIn = async () => {
    const { loader } = props;
    setGoogleSignInProgress(true);
    GoogleSignin.configure({
      webClientId: globals.SHA,
      offlineAccess: false,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { user } = userInfo;
      let language = "German";
      if (localize.activeLanguage === "en") {
        language = "English";
      }
      console.log("User", user);
      _loginWithGoogle({
        email: user.email,
        googleUsername: user.givenName + user.familyName,
        language,
        accessToken: user.id,
      });
      setGoogleSignInProgress(false);
    } catch (error) {
      setGoogleSignInProgress(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          helpers.getLocale(
            localize,
            "loadingModal",
            "google_services",
          ),
        );
      } else {
        // some other error happened
        Alert.alert(error.message);
        console.log(error.message);
      }
    }
  };

  const openBrowser = (url) => {
    url = globals.WEB_URL + url;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return globals.WINDOW_HEIGHT > 690 ? (
    <View style={mainStyles.flex1}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={{ marginTop: Platform.OS === "ios" ? 30 : 0 }}>
        <View style={styles.headerView}>
          <View style={{ flex: 0.4 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconComp name={"left"} size={24} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text
              allowFontScaling={false}
              style={[styles.socialText, { textAlign: "left" }]}>
              {helpers.getLocale(localize, "landingPage", "registration")}
            </Text>
          </View>
        </View>
        <View style={styles.imgWrap}>
          <Image
            source={images.P_Logo}
            resizeMode={"contain"}
            style={styles.appLogo}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.title}>
            {helpers.getLocale(localize, "landingPage", "createTitle")}
          </Text>
          <Text style={styles.subtitle}>
            {helpers.getLocale(localize, "landingPage", "welcomesubTitle")}
          </Text>
        </View>
        {Platform.OS === "ios" ? (
          <TouchableOpacity
            onPress={() => {
              onAppleButtonPress();
            }}>
            <View
              style={{
                ...sty.inputWrapNew,
                height: 45,
                justifyContent: "center",
                marginBottom: 20,
                width: "95%",
                alignSelf: "center",
                borderBottomWidth: 0,
              }}>
              <FastImage
                source={images.applelogo}
                style={styles.socialIcon}
                resizeMode={"cover"}
              />
              <Text allowFontScaling={false} style={styles.socialText}>
                {helpers.getLocale(localize, "landingPage", "applelogin")}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          disabled={googleSignInProgress}
          onPress={() => {
            _googleSignIn();
          }}>
          <View
            style={{
              ...sty.inputWrapNew,
              height: 45,
              justifyContent: "center",
              marginBottom: 20,
              width: "95%",
              alignSelf: "center",
              borderBottomWidth: 0,
            }}>
            <FastImage
              source={images.googlelogo}
              style={styles.socialIcon}
              resizeMode={"cover"}
            />
            <Text allowFontScaling={false} style={styles.socialText}>
              {helpers.getLocale(localize, "landingPage", "googlelogin")}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _facebookLoginInit()}>
          <View
            style={{
              ...sty.inputWrapNew,
              height: 45,
              justifyContent: "center",
              marginBottom: 20,
              width: "95%",
              alignSelf: "center",
              borderBottomWidth: 0,
            }}>
            <FastImage
              source={images.facebook_share}
              style={styles.socialIcon}
              resizeMode={"cover"}
            />

            <Text allowFontScaling={false} style={styles.socialText}>
              {helpers.getLocale(localize, "landingPage", "fblogin")}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}>
          <View
            style={{
              ...sty.inputWrapNew,
              height: 45,
              justifyContent: "center",
              marginBottom: 20,
              width: "95%",
              alignSelf: "center",
              borderBottomWidth: 0,
            }}>
            <FastImage
              source={images.mail_share}
              style={styles.socialIcon}
              resizeMode={"cover"}
            />
            <Text allowFontScaling={false} style={styles.socialText}>
              {helpers.getLocale(localize, "landingPage", "maillogin")}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={mainStyles.flexCenter}>
          <_Lang style={styles.termsTxtOld} text={"register.footer_text"} />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <_Lang
              style={styles.termsLink}
              text={"register.terms"}
              onPress={() => openBrowser("terms-conditions")}
            />
            <_Lang
              style={styles.termsLink}
              text={"register.data_protection"}
              onPress={() =>
                openBrowser("data-protection-and-privacy-policy")
              }
            />
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.bottomContainer}>
        <View style={mainStyles.flexCenter}>
          <_Lang
            style={styles.termsTxt}
            onPress={() => navigation.navigate("Login")}
            text={"landingPage.alreadyMember"}
          />
        </View>
      </View>
      {/* <Modal
            transparent={true}
            animationType={"none"}
            visible={this.state.googleSignInProgress}
            onRequestClose={() => {}}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "space-around",
                backgroundColor: "#rgba(0, 0, 0, 0.2)",
                zIndex: 1000,
              }}>
              <ActivityIndicator
                size={"large"}
                animating={this.state.googleSignInProgress}
                color="black"
              />
            </View>
          </Modal> */}
    </View>
  ) : (
    <ScrollView style={mainStyles.flex1}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={{ marginTop: Platform.OS === "ios" ? 30 : 0 }}>
        <View style={styles.headerView}>
          <View style={{ flex: 0.4 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconComp name={"left"} size={24} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text
              allowFontScaling={false}
              style={[styles.socialText, { textAlign: "left" }]}>
              {helpers.getLocale(localize, "landingPage", "registration")}
            </Text>
          </View>
        </View>
        <View style={styles.imgWrap}>
          <Image
            source={images.P_Logo}
            resizeMode={"contain"}
            style={styles.appLogo}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.title}>
            {helpers.getLocale(localize, "landingPage", "createTitle")}
          </Text>
          <Text style={styles.subtitle}>
            {helpers.getLocale(localize, "landingPage", "welcomesubTitle")}
          </Text>
        </View>
        {Platform.OS === "ios" ? (
          <TouchableOpacity
            onPress={() => {
              onAppleButtonPress();
            }}>
            <View
              style={{
                ...sty.inputWrapNew,
                height: 45,
                justifyContent: "center",
                marginBottom: 20,
                width: "95%",
                alignSelf: "center",
                borderBottomWidth: 0,
              }}>
              <FastImage
                source={images.applelogo}
                style={styles.socialIcon}
                resizeMode={"cover"}
              />
              <Text allowFontScaling={false} style={styles.socialText}>
                {helpers.getLocale(localize, "landingPage", "applelogin")}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            _googleSignIn();
          }}>
          <View
            style={{
              ...sty.inputWrapNew,
              height: 45,
              justifyContent: "center",
              marginBottom: 20,
              width: "95%",
              alignSelf: "center",
              borderBottomWidth: 0,
            }}>
            <FastImage
              source={images.googlelogo}
              style={styles.socialIcon}
              resizeMode={"cover"}
            />
            <Text allowFontScaling={false} style={styles.socialText}>
              {helpers.getLocale(localize, "landingPage", "googlelogin")}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _facebookLoginInit()}>
          <View
            style={{
              ...sty.inputWrapNew,
              height: 45,
              justifyContent: "center",
              marginBottom: 20,
              width: "95%",
              alignSelf: "center",
              borderBottomWidth: 0,
            }}>
            <FastImage
              source={images.facebook_share}
              style={styles.socialIcon}
              resizeMode={"cover"}
            />

            <Text allowFontScaling={false} style={styles.socialText}>
              {helpers.getLocale(localize, "landingPage", "fblogin")}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}>
          <View
            style={{
              ...sty.inputWrapNew,
              height: 45,
              justifyContent: "center",
              marginBottom: 20,
              width: "95%",
              alignSelf: "center",
              borderBottomWidth: 0,
            }}>
            <FastImage
              source={images.mail_share}
              style={styles.socialIcon}
              resizeMode={"cover"}
            />
            <Text allowFontScaling={false} style={styles.socialText}>
              {helpers.getLocale(localize, "landingPage", "maillogin")}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={mainStyles.flexCenter}>
          <_Lang style={styles.termsTxtOld} text={"register.footer_text"} />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <_Lang
              style={styles.termsLink}
              text={"register.terms"}
              onPress={() => openBrowser("terms-conditions")}
            />
            <_Lang
              style={styles.termsLink}
              text={"register.data_protection"}
              onPress={() =>
                openBrowser("data-protection-and-privacy-policy")
              }
            />
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.bottomContainer}>
        <View style={mainStyles.flexCenter}>
          <_Lang
            style={styles.termsTxt}
            onPress={() => navigation.navigate("Login")}
            text={"JoinNow.alreadyMember"}
          />
        </View>
      </View>
    </ScrollView>
  )
}
//export default JoinNow;
export default mainLayoutHoc({})(JoinNow);
