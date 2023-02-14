import {
  View,
  Text,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Input} from 'native-base';
import IconComp from '../../custom/ContentTypes/common/IconComponent';
import {globals, images, helpers, sty, API} from '../../../configs/index';
import {
  _ErrorModal,
  _GradiantView,
  _Lang,
  _ListBox,
  _Loading,
  _Spacer,
  _Icon,
  _Button,
  _Layout,
  _ListView,
} from '../../custom/index';
import {mainLayoutHoc} from '../../hoc/index';
import mainStyles from '../../../assets/styles/MainStyles';
import {styles} from './styles';
import analytics from '@react-native-firebase/analytics';
import {setNavigation} from '../../../redux/actions/NavAction';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {setTranslation} from '../../../redux/actions/LocalizeAction';
import {setLoginData, resetStore} from '../../../redux/actions/LoginAction';
var jwtDecode = require('jwt-decode');

import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Register = props => {
  const localize = useSelector(state => state.localize);
  const navProps = useSelector(state => state.navProps);
  const {loader, errModal} = props;
  const navigation = useNavigation();

  const [data, setdata] = useState({
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
    // password: ['', 'required|min-5|max-16', helpers.getLocale(props.localize, 'register', 'password'), _passwordValidate],
    password: [
      '',
      'required|min-5',
      helpers.getLocale(localize, 'register', 'password'),
      // _passwordValidate,
    ],
    confirm_password: [
      '',
      'required',
      helpers.getLocale(localize, 'register', 'repeat_password'),
    ],
    gender: ['', '', helpers.getLocale(localize, 'register', 'gender')],
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
      // _passwordValidate,
    ],
    confirm_password: [
      '',
      'required',
      helpers.getLocale(localize, 'register', 'repeat_password'),
    ],
    gender: ['', '', helpers.getLocale(localize, 'register', 'gender')],
  });
  // const [reCaptchaToken, setreCaptchaToken] = useState('');

  const _register = () => {
    // loader.load();
    // let cb = {
    //   ok: () => {},
    // };
    // loader.success('Success', "Success Message", cb);
    // return;
    let validator = helpers._validateData(regData);
    if (!validator.status) {
      loader.error('', validator.data[0]);
    } else if (regData.password[0] != regData.confirm_password[0]) {
      loader.error('', 'Password and Confirm password must be same');
    } else {
      let cb = Object.assign({}, helpers._standardCb(loader), {
        success: res => {
          analytics().logEvent('sign_up', {});
          let cb = {
            ok: () => {},
          };
          loader.success(
            helpers.getLocale(localize, 'register', 'your_registration'),
            helpers.getLocale(localize, 'register', 'msg'),
            cb,
          );
          loader.success('Success', res.message, cb)
          navigation.navigate('Login');
          // setTimeout(() => {
          //   props.navigation.navigate('Login')
          // },(1500))
        },
      });
      loader.load();
      let data = helpers._getData(regData);
      data.userType = 'creator';

      let language = 'German';
      if (localize.activeLanguage === 'en') {
        language = 'English';
      }
      data.captchaToken = data.reCaptchaToken;
      API.registerSave(Object.assign({}, data, {language: language}), cb);
    }
  };

  /** Registration Input handler */
  const _setRegProp = (prop, value) => {
    var newData = helpers._setStateData(data.regData, prop, value);
    setregData(newData);
  };

  const checkIphoneXR = () => {
    return (
      Platform.OS === 'ios' &&
      (globals.WINDOW_HEIGHT == 812 || globals.WINDOW_WIDTH == 812)
    );
  };
  const isIphoneXR = checkIphoneXR();

  return (
    <View>
      {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
      <SafeAreaView style={{marginTop: Platform.OS === 'ios' ? 30 : 0}}>
        <View style={styles.headerView}>
          <View style={{flex: 0.4}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconComp name={'left'} size={24} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.7}}>
            <Text
              allowFontScaling={false}
              style={[styles.socialText, {textAlign: 'left'}]}>
              {helpers.getLocale(localize, 'landingPage', 'registration')}
            </Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <View
            style={{
              width: '95%',
              height: 45,
              alignSelf: 'center',
              marginTop: 16,
            }}>
            <Input
              placeholder={helpers.getLocale(localize, 'register', 'user_name')}
              style={{
                ...sty.inputWrapNew,
                borderBottomWidth: 0,
              }}
              onChangeText={t =>
                setregData(prevState => ({...prevState, username: {[0]: t}}))
              }
              value={regData.username[0]}
              autoCapitalize={'none'}
              keyboardType={'ascii-capable'}
              contextMenuHidden={true}
              textContentType={'username'}
            />
          </View>
          <View
            style={{
              width: '95%',
              height: 45,
              alignSelf: 'center',
              marginTop: 16,
            }}>
            <Input
              placeholder={helpers.getLocale(localize, 'register', 'email')}
              style={{
                ...sty.inputWrapNew,
                borderBottomWidth: 0,
              }}
              onChangeText={t =>
                setregData(prevState => ({...prevState, email: {[0]: t}}))
              }
              autoCapitalize={'none'}
              keyboardType={'ascii-capable'}
              contextMenuHidden={true}
              secureTextEntry={false}
            />
          </View>
          <View
            style={{
              width: '95%',
              height: 45,
              alignSelf: 'center',
              marginTop: 16,
            }}>
            <Input
              placeholder={helpers.getLocale(localize, 'register', 'password')}
              style={{
                ...sty.inputWrapNew,
                borderBottomWidth: 0,
              }}
              ref={ref =>
                ref && ref.setNativeProps({style: {fontFamily: 'Helvetica'}})
              }
              secureTextEntry={true}
              value={regData.password[0]}
              textContentType={'password'}
              onChangeText={t =>
                setregData(prevState => ({...prevState, password: {[0]: t}}))
              }
            />
          </View>
          <View
            style={{
              width: '95%',
              height: 45,
              alignSelf: 'center',
              marginVertical: 16,
            }}>
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
              style={{
                ...sty.inputWrapNew,
                borderBottomWidth: 0,
              }}
              secureTextEntry={true}
              value={regData.confirm_password[0]}
              onChangeText={t =>
                setregData(prevState => ({
                  ...prevState,
                  confirm_password: {[0]: t},
                }))
              }
            />
          </View>

          <View style={{alignItems: 'center', height: 180}}>
            <View style={{width: '95%'}}>
              <_Button
                gradiant
                color={'blue'}
                text={helpers.getLocale(
                  localize,
                  'register',
                  'register_for_free',
                )}
                callback={() => {
                  if (regData.email[0].includes(' ')) {
                    setregData(prevState => ({
                      ...prevState,
                      username: {[0]: regData.email[0].replace(/\s+/g, '')},
                    }));
                  }
                  if (regData.username[0].includes(' ')) {
                    setregData(prevState => ({
                      ...prevState,
                      username: {[0]: regData.username[0].replace(/\s+/g, '')},
                    }));
                  }
                  _register();
                }}
                style={[styles.loginBtn]}
                btnTxtStyle={styles.loginBtnTxt}
              />
            </View>

            <_Lang style={styles.termsTxtOld} text={'register.footer_text'} />
            <View style={mainStyles.flexRow}>
              <_Lang
                style={styles.termsLink}
                text={'register.terms'}
                onPress={() => openBrowser('terms-conditions')}
              />
              <_Lang
                style={styles.termsLink}
                text={'register.data_protection'}
                onPress={() =>
                  openBrowser('data-protection-and-privacy-policy')
                }
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default mainLayoutHoc({})(Register);
