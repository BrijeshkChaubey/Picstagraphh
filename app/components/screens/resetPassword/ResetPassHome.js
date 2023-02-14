import {
  Text,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {Input, Item} from 'native-base';
import {globals, helpers, sty, API} from '../../../configs';
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
import {mainLayoutHoc} from '../../hoc';
import {styles} from './styles';
import mainStyles from '../../../assets/styles/MainStyles';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const ResetPassHome = props => {
  const localize = useSelector(state => state.localize);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loader} = props;

  const [data, setdata] = useState({
    email: [
      globals.live ? '' : 'vishalr261.neo@yopmail.com',
      'required|email',
      helpers.getLocale(localize, 'forgotPass', 'email'),
    ],
  });

  const _setProp = (prop, value) => {
    var newData = helpers._setStateData(data, prop, value);
    setdata(newData);
  };

  const _send = () => {
    let validator = helpers._validateData(data);
    if (validator.status == false) {
      props.errorModal.show(validator.data);
    } else {
      let cb = Object.assign({}, helpers._standardCb(loader), {
        success: res => {
          loader.success(
            'Success',
            'Please open the email and click the link',
            {
              ok: () => {
                navigation.navigate('LandingPage');
              },
            },
          );
        },
        complete: () => {
          loader.hideLoader();
        },
      });
      loader.load();
      let Data = helpers._getData(data);
      API.forgotPassEmailSend(Data, cb);
    }
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
  return (
    <KeyboardAvoidingView
      styles={styles.container}
      keyboardShouldPersistTaps={'handled'}>
      <ScrollView
        style={{backgroundColor: '#fff'}}
        keyboardShouldPersistTaps={'handled'}>
        <View
          style={
            Platform.OS === 'ios'
              ? {height: globals.WINDOW_HEIGHT}
              : {height: globals.WINDOW_HEIGHT - 25}
          }>
          <View style={styles.headingWrap}>
            <_Lang
              style={styles.headingTxt}
              text={'forgotPass.reset_password'}
            />
            <_Lang
              style={styles.headingSubTxt}
              text={
                'forgotPass.we_will_send_you_an_email_to_resetting_your_password'
              }
            />
          </View>
          <View>
              {/* //FIXME: this below Item component from native-base causing error */}
            {/* <Item regular style={{...sty.mgB10, ...sty.inputWrap}}> */}
              <Input
                placeholder={helpers.getLocale(localize, 'forgotPass', 'email')}
                style={{...sty.input,}}
                onChangeText={t =>
                  setdata(prevState => ({...prevState, email: {[0]: t}}))
                }
                value={data.email[0]}
                keyboardType={'ascii-capable'}
                contextMenuHidden={true}
              />
            {/* </Item> */}
            <_Button
              text={helpers.getLocale(localize, 'forgotPass', 'send')}
              callback={() => {
                if (data.email[0].includes(' ')) {
                  setdata(prevState => ({
                    ...prevState,
                    email: {[0]: data.email[0].replace(/\s+/g, '')},
                  }));
                }
                _send();
              }}
              style={{...sty.mgV10}}
              gradiant
            />
          </View>
          <View style={{...sty.flex1, ...sty.jEnd}}>
            <_Button
              text={helpers.getLocale(localize, 'forgotPass', 'back_to_log_in')}
              callback={() => {
                navigation.goBack();
              }}
              style={{...sty.mgV10}}
              fontWeight={'500'}
            />
            <View
              style={{
                ...sty.mgV10,
                ...sty.mgB20,
                ...sty.fRow,
                ...sty.jCenter,
                flexWrap: 'wrap',
              }}>
              <_Lang
                style={styles.termsTxt}
                text={'forgotPass.legal_notice'}
                onPress={() =>
                  openBrowser('host/terms-conditions?isMobile/English')
                }
              />
              <_Lang style={styles.termsTxt} text={' / '} pureText />
              <_Lang
                style={styles.termsTxt}
                text={'forgotPass.terms_and_condition'}
                onPress={() =>
                  openBrowser('host/terms-conditions?isMobile/English')
                }
              />
              <_Lang style={styles.termsTxt} text={' / '} pureText />
              <_Lang
                style={styles.termsTxt}
                text={'forgotPass.netzDG'}
                onPress={() =>
                  openBrowser('host/terms-conditions?isMobile/English')
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default mainLayoutHoc({})(ResetPassHome)
// export default ResetPassHome;
