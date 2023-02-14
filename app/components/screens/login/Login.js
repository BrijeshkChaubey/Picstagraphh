import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Text,
  Keyboard,
  SafeAreaView,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from 'native-base';
import mainStyles from '../../../assets/styles/MainStyles';
import {styles} from './styles';
import {globals, images, helpers, sty, API} from '../../../configs/index';
import IconComp from '../../custom/ContentTypes/common/IconComponent';
import FastImage from 'react-native-fast-image';
import ReCaptchaV3 from '@haskkor/react-native-recaptchav3';
import {_Lang, _Icon, _Button} from '../../custom/index';
import {useSelector, useDispatch} from 'react-redux';
import {mainLayoutHoc} from '../../hoc'; //need attention

import {setTranslation} from '../../../redux/actions/LocalizeAction';
import {setLoginData, resetStore} from '../../../redux/actions/LoginAction';
import {setAppData} from '../../../redux/actions/AppDataActions';
import { useNavigation } from '@react-navigation/native';
//setNavigation is an  action to look at

//social login imports required
// import firebase from 'react-native-firebase';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import analytics from '@react-native-firebase/analytics';

import {NavigationActions, StackActions} from 'react-navigation';

var jwtDecode = require('jwt-decode');

const creds = [
  {email: '', password: ''},
  {email: '', password: ''},
  {email: '', password: ''},
];
const activeCred = creds[globals.live ? 0 : 2];
// TODO: Navigation to be updated  to latest module

const Login = props => {
  const localize = useSelector(state => state.localize);
  
  const {loader} = props;

  const navigation= useNavigation();


  const dispatch = useDispatch();

  const [data, setdata] = useState({
    username: [
      activeCred.email,
      'required', //|min-2
      helpers.getLocale(localize, 'login', 'user_name_or_email'),
    ],
    password: [
      activeCred.password,
      'required|password-5',
      helpers.getLocale(localize, 'login', 'password'),
    ],
  });
  const [regData, setregData] = useState({
    username: [
      '',
      'required|max-20|space|emoji', //min-2
      helpers.getLocale(localize, 'register', 'user_name'),
    ],
    email: [
      '',
      'required|email|emoji',
      helpers.getLocale(localize, 'register', 'email'),
    ],
    password: [
      '',
      'required|password-8',
      helpers.getLocale(localize, 'register', 'password'),
      // this._passwordValidate,
    ],
    confirm_password: [
      '',
      'required',
      helpers.getLocale(localize, 'register', 'repeat_password'),
    ],
    gender: ['', '', helpers.getLocale(localize, 'register', 'gender')],
  });
  const [index, setindex] = useState(0);
  const [reCaptchaToken, setreCaptchaToken] = useState('');
  const [routes, setroutes] = useState([
    {index: 0, key: 'LogIn', text: 'login.log_in'},
    {index: 1, key: 'Register', text: 'login.Register'},
  ]);
  const [googleSignInProgress, setGoogleSignInProgress] = useState(false);

  const _login = () => {
    console.log('loader:  ', loader)
    // navigation.navigate('TabNav');

    dispatch(resetStore());

    let validator = helpers._validateData(data);
    if (!validator.status) {
      loader.error('', validator.data[0]);
    } else {
      let cb = Object.assign({}, helpers._standardCb(loader), {
        success: async res => {
          console.log('PRIYANK LOGIN', res);

          analytics().logEvent('login', {});
          analytics().setUserId(res.data.id);

          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('secureFgp');
          await AsyncStorage.removeItem('firebaseToken');

          // _handleNotifications();
          await AsyncStorage.setItem('token', res.data.token);
          await AsyncStorage.setItem('secureFgp', res.data.secureFgp);

          var userInfo = jwtDecode(res.data.token);
          dispatch(
            setLoginData(
              Object.assign({}, userInfo, {
                token: res.data.token,
                miniProfileUrl: res.data.miniProfileUrl,
                isSocialShare: res.data.isSocialShare,
                isNewsShow: res.data.isNewsFeedVisible,
                secureFgp: res.data.secureFgp,
              }),
            ),
          );
          dispatch(setTranslation(globals.LANG_ARR[userInfo.language]));

          if (res.data.isProfilePicSkip) {
             navigation.navigate('TabNav');

             StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'TabNav'})],
            });
            console.log("in profile");
            //navigation.navigate('HomeNavigator');
            // should be resolve - anamika
            // props.navigation.dispatch(resetAction);
            // props.navigation.navigate('HomeNavigator');

          } else {
            Keyboard.dismiss;
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'PostRegistration',
                  params: {
                    FBUser: false,
                    AppleUser: false,
                    userDetail: res.data,
                    userInfo: userInfo,
                  },
                }),
              ],
            });
            props.navigation.dispatch(resetAction);
          }

          // props.resetToView('tabNav', 'TabNav')
          // props.navigation.navigate('TabNav');
        },
      });
      loader.load();

      let reqData;
      const reg = /\S+@\S+\.\S+/;
      if (reg.test(data.username[0]) === false) {
        reqData = {
          username: data.username[0],
          password: data.password[0],
          captchaToken: reCaptchaToken,
        };
      } else {
        reqData = {
          email: data.username[0],
          password: data.password[0],
          captchaToken: reCaptchaToken,
        };
      }

      API.login(reqData, cb);
    }
  };

  const _handleNotifications = async () => {
    try {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        const firebaseToken = await AsyncStorage.getItem('firebaseToken');
        if (firebaseToken) {
          globals.fcmToken = firebaseToken;
        } else {
          const fcmToken = await firebase.messaging().getToken();
          if (fcmToken) {
            const token = await AsyncStorage.getItem('token');
            let userInfo = jwtDecode(token);

            let cb = {
              success: () => {
                AsyncStorage.setItem('firebaseToken', fcmToken);
              },
              error: () => {},
            };
            let header = helpers.buildHeader({authorization: token});
            let data = {
              id: userInfo.id,
              token: fcmToken,
            };
            API.deviceFirebaseTokenSave(data, cb, header);
            globals.fcmToken = fcmToken;
          } else {
            const fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
              const token = await AsyncStorage.getItem('token');
              let userInfo = jwtDecode(token);

              let cb = {
                success: () => {
                  AsyncStorage.setItem('firebaseToken', fcmToken);
                },
                error: () => {},
              };
              let header = helpers.buildHeader({authorization: token});
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
      console.log({err});
    }
  };
  const _changeTab = index => {
    setindex(index);
  };

  const headerTab = () => {
    return (
      <View style={{}}>
        <TabHeader
          login
          routes={routes}
          index={index}
          onProfile
          changeTab={i => _changeTab(i)}
          tabWidth={(globals.WINDOW_WIDTH - 60) / 2}
        />
      </View>
    );
  };
  const _loginWithApple = result => {
    const {loader} = props;
    dispatch(resetStore());

    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: async res => {
        analytics().logEvent('login', {});
        analytics().setUserId(res.data.id);

        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('secureFgp');
        await AsyncStorage.removeItem('firebaseToken');

        var userInfo = jwtDecode(res.data.token);
        dispatch(setTranslation(globals.LANG_ARR[userInfo.language]));
        props.setApp; // need attention

        if (res.data.isProfilePicSkip) {
          _handleNotifications();
          await AsyncStorage.setItem('token', res.data.token);
          await AsyncStorage.setItem('secureFgp', res.data.secureFgp);
          dispatch(
            setLoginData(
              Object.assign({}, userInfo, {
                token: res.data.token,
                miniProfileUrl: res.data.miniProfileUrl,
                secureFgp: res.data.secureFgp,
              }),
            ),
          );

          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'TabNav'})],
          });
          props.navigation.dispatch(resetAction);
        } else {
          Keyboard.dismiss;

          props.navigation.push('PostRegistration', {
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
  const onAppleButtonPress = async () => {
    // console.log("ButPress");

    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });
      // console.log('appleAuthRequestResponse', appleAuthRequestResponse);
      const {user: newUser, identityToken} = appleAuthRequestResponse;
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        var jwtdecodeToken = jwtDecode(identityToken);

        let firstName = appleAuthRequestResponse.fullName.givenName
          ? appleAuthRequestResponse.fullName.givenName
          : '';
        let lastName = appleAuthRequestResponse.fullName.familyName
          ? appleAuthRequestResponse.fullName.familyName
          : '';

        if (jwtdecodeToken.sub) {
          let language = 'German';
          if (localize.activeLanguage === 'en') {
            language = 'English';
          }

          let appleUserinfo = {
            email: jwtdecodeToken.email || '',
            name: firstName + lastName,
            appleId: jwtdecodeToken.sub,
            language,
          };
          _loginWithApple(appleUserinfo);
        }
      }
    } catch (err) {
      console.log('err :', err);
      // Alert.alert(" - " + a + " - " + JSON.stringify(err));
    }
  };
  const _facebookLoginInit = async () => {
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }

    LoginManager.logInWithPermissions([
      'email',
      'public_profile',
      'user_friends',
      'user_link',
    ]).then(
      result => {
        if (result.isCancelled) {
          // console.log("Facebook login was cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            // facebook.accessToken = data.accessToken.toString();
            // this.setState({
            //     socialMedia: { ...this.state.socialMedia, facebook }
            // })
            //Graph api

            const infoRequest = new GraphRequest(
              '/me?fields=name,email,link,id',
              null,
              (error, result) => {
                // console.log("result :", result);
                if (error) {
                  console.log(
                    'Facebook error fetching data: ' + error.toString(),
                  );
                } else {
                  // let res = {
                  //   accessToken: result.id,
                  //   email:result.email,
                  //   name:result.name
                  // }
                  console.log('Facebook success fetching data: ', result);

                  let language = 'German';
                  if (localize.activeLanguage === 'en') {
                    language = 'English';
                  }

                  _loginWithFB(
                    Object.assign({}, result, {
                      language: language,
                      accessToken: data.accessToken,
                    }),
                  );
                }
              },
            );

            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      error => {
        console.log('Facebook login failed with error: ' + error);
      },
    );
  };
  //need attention => this.setState({googleSignInProgress...})
  const _googleSignIn = async () => {
    setGoogleSignInProgress(true);

    GoogleSignin.configure({
      webClientId: globals.SHA,
      offlineAccess: false,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const {user} = userInfo;

      let language = 'German';
      if (localize.activeLanguage === 'en') {
        language = 'English';
      }

      console.log('User', user);
      _loginWithGoogle({
        email: user.email,
        googleUsername: user.givenName + user.familyName,
        language,
        accessToken: userInfo.idToken,
      });
      this.setState({googleSignInProgress: false});
    } catch (error) {
      this.setState({googleSignInProgress: false});
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        // console.log("Cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        // console.log("Progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        // console.log("Unavailable or Outdated");
        Alert.alert(
          helpers.getLocale(localize, 'loadingModal', 'google_services'),
        );
      } else {
        // some other error happened
        Alert.alert(error);
      }
    }
  };
  const _loginWithGoogle = result => {
    const {loader} = props;
    dispatch(resetStore());

    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: async res => {
        analytics().logEvent('login', {});
        analytics().setUserId(res.data.id);

        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('secureFgp');
        await AsyncStorage.removeItem('firebaseToken');

        var userInfo = jwtDecode(res.data.token);
        dispatch(setTranslation(globals.LANG_ARR[userInfo.language]));
        props.setApp;

        if (res.data.isProfilePicSkip) {
          _handleNotifications();
          await AsyncStorage.setItem('token', res.data.token);
          await AsyncStorage.setItem('secureFgp', res.data.secureFgp);
          console.log('secureFgp', res.data.secureFgp);
          dispatch(
            setLoginData(
              Object.assign({}, userInfo, {
                token: res.data.token,
                miniProfileUrl: res.data.miniProfileUrl,
                secureFgp: res.data.secureFgp,
              }),
            ),
          );

          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'TabNav'})],
          });
          props.navigation.dispatch(resetAction);
        } else {
          Keyboard.dismiss;

          props.navigation.push('PostRegistration', {
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
  const registerScreen = () => {
    // const { username, password, confirm_password } = this.state.regData;

    return (
      <>
        <Input
          placeholder={helpers.getLocale(localize, 'register', 'user_name')}
          style={[styles.inputText, {marginTop: 30}]}
          onChangeText={t => _setRegProp('username', t)}
          value={regData.username[0]}
          autoCapitalize={'none'}
          keyboardType={'ascii-capable'}
          contextMenuHidden={true}
          textContentType={'username'}
        />
        <Input
          placeholder={helpers.getLocale(localize, 'register', 'email')}
          style={styles.inputText}
          onChangeText={t => _setRegProp('email', t)}
          autoCapitalize={'none'}
          keyboardType={'ascii-capable'}
          contextMenuHidden={true}
          secureTextEntry={false}
        />
        <Input
          placeholder={helpers.getLocale(localize, 'register', 'password')}
          style={[styles.inputText]}
          ref={ref =>
            ref && ref.setNativeProps({style: {fontFamily: 'Helvetica'}})
          }
          secureTextEntry={true}
          value={regData.password[0]}
          textContentType={'password'}
          onChangeText={t => _setRegProp('password', t)}
        />

        <Input
          placeholder={helpers.getLocale(
            localize,
            'register',
            'repeat_password',
          )}
          textContentType={'password'}
          ref={ref =>
            ref && ref.setNativeProps({style: {fontFamily: 'Helvetica'}})
          }
          style={[styles.inputText]}
          secureTextEntry={true}
          value={regData.confirm_password[0]}
          onChangeText={t => _setRegProp('confirm_password', t)}
        />
        <_Button
          gradiant
          color={'blue'}
          text={helpers.getLocale(localize, 'register', 'register_for_free')}
          callback={() => {
            if (helpers._spaceChecker(regData.email[0])) {
              _setRegProp('email', helpers._emailCorrector(regData.email[0]));
            }
            if (helpers._spaceChecker(regData.username[0])) {
              _setRegProp(
                'username',
                helpers._emailCorrector(regData.username[0]),
              );
            }
            _register();
          }}
          style={[styles.loginBtn]}
          btnTxtStyle={styles.loginBtnTxt}
        />
        <View onPress={() => {}} style={[styles.footerWrap]}>
          <_Lang style={styles.termsTxt} text={'register.footer_text'} />
          <_Lang
            style={styles.termsLink}
            text={'register.terms'}
            onPress={() => openBrowser('terms-conditions')}
          />
          <_Lang
            style={styles.termsLink}
            text={'register.data_protection'}
            onPress={() => openBrowser('data-protection-and-privacy-policy')}
          />
        </View>
      </>
    );
  };
  const _loginWithFB = result => {
    const {loader} = props;
    dispatch(resetStore());

    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: async res => {
        analytics().logEvent('login', {});
        analytics().setUserId(res.data.id);

        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('secureFgp');
        await AsyncStorage.removeItem('firebaseToken');

        // this._handleNotifications();
        // await AsyncStorage.setItem("token", res.data.token);
        var userInfo = jwtDecode(res.data.token);
        // props.setLoginData(
        //   Object.assign({}, userInfo, {
        //     token: res.data.token,
        //     miniProfileUrl: res.data.miniProfileUrl
        //   })
        // );
        dispatch(setTranslation(globals.LANG_ARR[userInfo.language]));
        props.setApp;

        if (res.data.isProfilePicSkip) {
          _handleNotifications();
          await AsyncStorage.setItem('token', res.data.token);
          await AsyncStorage.setItem('secureFgp', res.data.secureFgp);

          dispatch(
            setLoginData(
              Object.assign({}, userInfo, {
                token: res.data.token,
                miniProfileUrl: res.data.miniProfileUrl,
                secureFgp: res.data.secureFgp,
              }),
            ),
          );

          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'TabNav'})],
          });
          props.navigation.dispatch(resetAction);
        } else {
          Keyboard.dismiss;

          props.navigation.push('PostRegistration', {
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
  const openBrowser = url => {
    url = globals.WEB_URL + url;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };
  const checkIphoneXR = () => {
    return (
      Platform.OS === 'ios' &&
      (globals.WINDOW_HEIGHT === 812 || globals.WINDOW_WIDTH === 812)
    );
  };
  const isIphoneXR = checkIphoneXR();

  /** Login Input handler */
  //FIXME: This is just for attention: _setProp and helper function is not used here
  //TODO:   instead use ==> setdata(prevState=>({...prevState,username:{[0]:t}})) , this is an example for OnchangeTxt in input for username ...
  // similarly you can use for other by changing variables required..

  const _setProp = (prop, value) => {
    var newData = helpers._setStateData(data, prop, value);
    setdata(newData);
  };

  return globals.WINDOW_HEIGHT < 690 ? (
    <ScrollView style={mainStyles.rootView}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
      <SafeAreaView
        style={{flex: 1, marginTop: Platform.OS === 'ios' ? 30 : 0}}>
        <View style={styles.headerView}>
          <View style={{flex: 0.4}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconComp name={'left'} size={24} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.6}}>
            <Text
              allowFontScaling={false}
              style={[styles.socialText, {textAlign: 'left'}]}>
              {helpers.getLocale(localize, 'login', 'log_in')}
            </Text>
          </View>
        </View>
        <View style={styles.imgWrap}>
          <Image
            source={images.P_Logo}
            resizeMode={'contain'}
            style={styles.appLogo}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={styles.title}>
            {helpers.getLocale(localize, 'landingPage', 'welcome')}
          </Text>
        </View>
        <View>
          <View
            style={{
              height: 45,
              width: '95%',
              alignSelf: 'center',
            }}>
            <Input
              placeholder={helpers.getLocale(
                localize,
                'login',
                'user_name_or_email',
              )}
              style={{
                ...sty.inputWrapNew,
                borderBottomWidth: 0,
              }}
              onChangeText={t =>
                setdata(prevState => ({...prevState, username: {[0]: t}}))
              }
              value={data.username[0]}
              autoCapitalize={'none'}
              keyboardType={'ascii-capable'}
              contextMenuHidden={true}
              textContentType={'username'}
              allowFontScaling={false}
            />
          </View>
          <View
            style={{
              width: '95%',
              height: 45,
              alignSelf: 'center',
              marginVertical: 20,
            }}>
            <Input
              placeholder={helpers.getLocale(localize, 'login', 'password')}
              style={{
                ...sty.inputWrapNew,
                borderBottomWidth: 0,
              }}
              secureTextEntry={true}
              ref={ref =>
                ref && ref.setNativeProps({style: {fontFamily: 'Helvetica'}})
              }
              onChangeText={t =>
                setdata(prevState => ({...prevState, password: {[0]: t}}))
              }
              value={data.password[0]}
              textContentType={'password'}
              allowFontScaling={false}
            />
          </View>
          <_Button
            gradiant
            color={'blue'}
            text={helpers.getLocale(localize, 'login', 'log_in')}
            callback={() => {
              if (data.username[0].includes(" ")) {
                setdata(prevState => ({
                  ...prevState,
                  username: {[0]: data.username[0].replace(/\s+/g, '')},
                }));
              }
              _login();
            }}
            style={[styles.loginBtn]}
            btnTxtStyle={styles.loginBtnTxt}
          />
        </View>
        <_Lang
          style={[
            styles.forgotPassTxt,
            {fontWeight: '400', marginBottom: 30, marginTop: 20},
          ]}
          text={'landingPage.login_mail'}
        />
        {Platform.OS === 'ios' ? (
          <TouchableOpacity
            onPress={() => {
              onAppleButtonPress();
            }}>
            <View
              style={{
                ...sty.inputWrapNew,
                height: 45,
                justifyContent: 'center',
                marginBottom: 20,
                width: '95%',
                alignSelf: 'center',
                borderBottomWidth: 0,
              }}>
              <FastImage
                source={images.applelogo}
                style={styles.socialIcon}
                resizeMode={'cover'}
              />
              <Text allowFontScaling={false} style={styles.socialText}>
                {helpers.getLocale(localize, 'landingPage', 'applelogin')}
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
              justifyContent: 'center',
              marginVertical: 20,
              width: '95%',
              borderBottomWidth: 0,
              alignSelf: 'center',
            }}>
            <FastImage
              source={images.googlelogo}
              style={styles.socialIcon}
              resizeMode={'cover'}
            />
            <Text allowFontScaling={false} style={styles.socialText}>
              {helpers.getLocale(localize, 'landingPage', 'googlelogin')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _facebookLoginInit()}>
          <View
            style={{
              ...sty.inputWrapNew,
              height: 45,
              justifyContent: 'center',
              marginBottom: 20,
              width: '95%',
              alignSelf: 'center',
              borderBottomWidth: 0,
            }}>
            <FastImage
              source={images.facebook_share}
              style={styles.socialIcon}
              resizeMode={'cover'}
            />

            <Text allowFontScaling={false} style={styles.socialText}>
              {helpers.getLocale(localize, 'landingPage', 'fblogin')}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <View style={mainStyles.flexCenter}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ResetPassHome');
              }}
              style={{...sty.w100}}>
              <_Lang
                style={styles.forgotPassTxt}
                text={'login.forgot_password'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ReCaptchaV3
          captchaDomain={globals.BASE_URL}
          siteKey={globals.RE_CAPTCHA_SITE_KEY}
          onReceiveToken={token => setreCaptchaToken(token)}
        />
       
      </SafeAreaView>
    </ScrollView>
  ) : (
    <View style={mainStyles.rootView}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
      <SafeAreaView
        style={{flex: 1, marginTop: Platform.OS === 'ios' ? 30 : 0}}>
        <View style={styles.headerView}>
          <View style={{flex: 0.4}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconComp name={'left'} size={24} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.6}}>
            <Text
              allowFontScaling={false}
              style={[styles.socialText, {textAlign: 'left'}]}>
              {helpers.getLocale(localize, 'login', 'log_in')}
            </Text>
          </View>
        </View>
        <View style={styles.imgWrap}>
          <Image
            source={images.P_Logo}
            resizeMode={'contain'}
            style={styles.appLogo}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={styles.title}>
            {helpers.getLocale(localize, 'landingPage', 'welcome')}
          </Text>
        </View>
        <View>
          <View
            style={{
              height: 45,
              width: '95%',
              alignSelf: 'center',
            }}>
            <Input
              placeholder={helpers.getLocale(
                localize,
                'login',
                'user_name_or_email',
              )}
              style={{
                ...sty.inputWrapNew,
                borderBottomWidth: 0,
              }}
              onChangeText={t =>
                setdata(prevState => ({...prevState, username: {[0]: t}}))
              }
              value={data.username[0]}
              autoCapitalize={'none'}
              keyboardType={'ascii-capable'}
              contextMenuHidden={true}
              textContentType={'username'}
              allowFontScaling={false}
            />
          </View>
          <View
            style={{
              width: '95%',
              height: 45,
              alignSelf: 'center',
              marginVertical: 20,
            }}>
            <Input
              placeholder={helpers.getLocale(localize, 'login', 'password')}
              style={{
                ...sty.inputWrapNew,
                borderBottomWidth: 0,
              }}
              secureTextEntry={true}
              ref={ref =>
                ref && ref.setNativeProps({style: {fontFamily: 'Helvetica'}})
              }
              onChangeText={t =>
                setdata(prevState => ({...prevState, password: {[0]: t}}))
              }
              value={data.password[0]}
              textContentType={'password'}
              allowFontScaling={false}
            />
          </View>
          <_Button
            gradiant
            color={'blue'}
            text={helpers.getLocale(localize, 'login', 'log_in')}
            callback={() => {
              if (data.username[0].includes(" ")) {
                setdata(prevState => ({
                  ...prevState,
                  username: {[0]: data.username[0].replace(/\s+/g, '')},
                }));
              }
              _login();
            }}
            style={[styles.loginBtn]}
            btnTxtStyle={styles.loginBtnTxt}
          />
        </View>
        <_Lang
          style={[
            styles.forgotPassTxt,
            {fontWeight: '400', marginBottom: 30, marginTop: 20},
          ]}
          text={'landingPage.login_mail'}
        />
        {Platform.OS === 'ios' ? (
          <TouchableOpacity
            onPress={() => {
              onAppleButtonPress();
            }}>
            <View
              style={{
                ...sty.inputWrapNew,
                height: 45,
                justifyContent: 'center',
                marginBottom: 20,
                width: '95%',
                alignSelf: 'center',
                borderBottomWidth: 0,
              }}>
              <FastImage
                source={images.applelogo}
                style={styles.socialIcon}
                resizeMode={'cover'}
              />
              <Text allowFontScaling={false} style={styles.socialText}>
                {helpers.getLocale(localize, 'landingPage', 'applelogin')}
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
              justifyContent: 'center',
              marginBottom: 20,
              width: '95%',
              borderBottomWidth: 0,
              alignSelf: 'center',
            }}>
            <FastImage
              source={images.googlelogo}
              style={styles.socialIcon}
              resizeMode={'cover'}
            />
            <Text allowFontScaling={false} style={styles.socialText}>
              {helpers.getLocale(localize, 'landingPage', 'googlelogin')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            _facebookLoginInit();
          }}>
          <View
            style={{
              ...sty.inputWrapNew,
              height: 45,
              justifyContent: 'center',
              marginBottom: 20,
              width: '95%',
              alignSelf: 'center',
              borderBottomWidth: 0,
            }}>
            <FastImage
              source={images.facebook_share}
              style={styles.socialIcon}
              resizeMode={'cover'}
            />

            <Text allowFontScaling={false} style={styles.socialText}>
              {helpers.getLocale(localize, 'landingPage', 'fblogin')}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{height: 100}} />
        <View style={styles.bottomContainer}>
          <View style={mainStyles.flexCenter}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ResetPassHome');
              }}
              style={{...sty.w100}}>
              <_Lang
                style={styles.forgotPassTxt}
                text={'login.forgot_password'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ReCaptchaV3
          captchaDomain={globals.BASE_URL}
          siteKey={globals.RE_CAPTCHA_SITE_KEY}
          onReceiveToken={token => setreCaptchaToken(token)}
        />
        {/* </_GradiantView> */}
      </SafeAreaView>
    </View>
  );
};
export default mainLayoutHoc({})(Login);
