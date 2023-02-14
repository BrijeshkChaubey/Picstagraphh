import {Text, View, Alert} from 'react-native';
import React, {useEffect} from 'react';

import {Input, Item} from 'native-base';
import {helpers, sty, API} from '../../../configs';
import {_Lang, _Button} from '../../custom';
import {mainLayoutHoc} from '../../hoc';
import mainStyles from '../../../assets/styles/MainStyles';
import {styles} from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setNavigation} from '../../../redux/actions/NavAction';
import {setLoginData, resetStore} from '../../../redux/actions/LoginAction';
import {setTranslation} from '../../../redux/actions/LocalizeAction';

const ResetpassFinal = props => {
  const localize = useSelector(state => state.localize);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loader} = props;

  const [data, setdata] = useState({
    password: [
      '',
      'required|min-5',
      helpers.getLocale(localize, 'forgotPass', 'new_password'),
      _passwordValidate,
    ],
    repeatPassword: [
      '',
      'required|min-5',
      helpers.getLocale(localize, 'forgotPass', 'repeat_password'),
    ],
  });

  /** Method to validate the password */
  const _passwordValidate = () => {
    if (data.password[0] != data.repeatPassword[0]) {
      return {
        status: false,
        data: 'Password and repeat-password do not match',
      };
    } else {
      return {status: true};
    }
  };

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
          loader.hideLoader();
          setTimeout(() => {
            Alert.alert('Success', 'Password changed', [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('Login');
                },
              },
            ]);
          }, 500);
        },
      });
      loader.load();
      let Data = helpers._getData(data);
      Data.token = props.navigation.state.params.token;
      API.resetPassword(Data, cb);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={mainStyles.rootView}
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={styles.container}
      scrollEnabled={false}>
      <View style={styles.headingWrap}>
        <_Lang style={styles.headingTxt} text={'forgotPass.reset_password'} />
        <_Lang
          style={styles.headingSubTxt}
          text={
            'forgotPass.we_will_send_you_an_email_to_resetting_your_password'
          }
        />
      </View>
      <View>
        <Item regular style={{...sty.mgB10, ...sty.inputWrap}}>
          <Input
            placeholder={helpers.getLocale(
              localize,
              'forgotPass',
              'enter_new_password',
            )}
            style={{...sty.input}}
            secureTextEntry={true}
            onChangeText={t => setdata(prevState => ({...prevState, password: {[0]: t}}))}
          />
        </Item>
        <Item regular style={{...sty.mgV10, ...sty.inputWrap}}>
          <Input
            placeholder={helpers.getLocale(
              localize,
              'forgotPass',
              'repeat_password',
            )}
            style={{...sty.input}}
            secureTextEntry={true}
            onChangeText={t => setdata(prevState => ({...prevState, repeatPassword: {[0]: t}}))}
          />
        </Item>
        <_Button
          text={helpers.getLocale(localize, 'forgotPass', 'change_password')}
          callback={() => {
            _send();
          }}
          style={{...sty.mgV10}}
          gradiant
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default mainLayoutHoc({})(ResetpassFinal);
// export default ResetpassFinal
