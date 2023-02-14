import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Modal,
  Image,
  Easing,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { styles } from './style';
import { _GradiantView, _Spacer, _Icon, _Button, _Layout, _ListView, _ListWrap, _Lang } from '../../custom/index';
import { colors, images, sty } from '../../../configs/index'
import React, { useEffect, useRef, useState } from 'react';
//import { interpolate, useAnimatedStyle, withSpring } from 'react-native-reanimated';


const _Loading = (props) => {

  const [test, setTest] = useState("");
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('loader');
  const [loaderAnimated, setLoaderAnimated] = useState(new Animated.Value(0));
  const [successAnimation, setSuccessAnimation] = useState(new Animated.Value(0));
  const [errorAnimation, setErrorAnimation] = useState(new Animated.Value(0));
  const [loaderAnimation, setLoaderAnimation] = useState(new Animated.Value(0));
  const translation = useRef(new Animated.Value(0)).current;
  const [confirmAnimation, setConfirmAnimation] = useState(new Animated.Value(0));
  const [optionsAnimation, setOptionsAnimation] = useState(new Animated.Value(0))

  const [loader1ScaleAnimation, setLoader1ScaleAnimation] = useState(new Animated.Value(0));
  const [loader1OpacityAnimation, setLoader1OpacityAnimation] = useState(new Animated.Value(1));
  const [loader2ScaleAnimation, setLoader2ScaleAnimation] = useState(new Animated.Value(1));

  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successTitle, setSuccessTitle] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [optionsTitle, setOptionsTitle] = useState('');
  const [optionsMessage, setOptionsMessage] = useState('');

  const [optionsArr, setOptionsArr] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  //functions and state had same names so added 's' to state variables to differentiate them
  const [confirmCB, setConfirmCB] = useState({ yes: () => { }, no: () => { }, noButton: false });
  const [successCB, setSuccessCB] = useState({ ok: () => { } });
  const [errorCB, setErrorCB] = useState({ ok: () => { } });
  const [optionsCB, setOptionsCB] = useState({ select: () => { }, cancel: () => { } });



  const pulseAnimation = () => {
    Animated.parallel([
      Animated.timing(loader1ScaleAnimation, {
        toValue: loader1ScaleAnimation._value == 0 ? 4 : 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(loader1OpacityAnimation, {
        toValue: loader1OpacityAnimation._value == 1 ? 0 : 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(loader2ScaleAnimation, {
        toValue: loader2ScaleAnimation._value == 1 ? 2 : 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => visible ? pulseAnimation() : null);
    //console.log(visible);
  }

  const animate = (type = 'loader') => {
    var success = type == 'success' ? 1 : 0;
    var error = type == 'error' ? 1 : 0;
    var loader = type == 'loader' ? 1 : 0;
    var confirm = type == 'confirm' ? 1 : 0;
    var options = type == 'options' ? 1 : 0;

    var successDuration = type == 'success' ? 500 : 0;
    var errorDuration = type == 'error' ? 500 : 0;
    var loaderDuration = type == 'loader' ? 500 : 0;
    var confirmDuration = type == 'confirm' ? 500 : 0;
    var optionsDuration = type == 'options' ? 500 : 0;
    Animated.parallel([
      Animated.timing(
        loaderAnimation,
        {
          toValue: loader,
          duration: loaderDuration,
          useNativeDriver: true,
        }
      ),
      Animated.timing(
        successAnimation,
        {
          toValue: success,
          duration: successDuration,
          useNativeDriver: true,
        }
      ),
      Animated.timing(
        errorAnimation,
        {
          toValue: error,
          duration: errorDuration,
          useNativeDriver: true,
        }
      ),
      Animated.timing(
        confirmAnimation,
        {
          toValue: confirm,
          duration: confirmDuration,
          useNativeDriver: true,
        }
      ),
      Animated.timing(
        optionsAnimation,
        {
          toValue: options,
          duration: optionsDuration,
          useNativeDriver: true,
        }
      )
    ]).start();
  }


  const success = (title = 'Success', message = 'Tranaction successful', successCBs = successCB) => {
    setVisible(true);
    setType('success');
    setSuccessTitle(title);
    setSuccessMessage(message);
    setSuccessAnimation(new Animated.Value(0));
    setSuccessCB(successCBs);
    animate('success');
  }


  const confirm = (title = 'Confirm', message = 'Are you sure?', confirmCBs = confirmCB) => {
    setVisible(true);
    setType('confirm');
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmAnimation(new Animated.Value(0));
    setConfirmCB(confirmCBs);
    animate('confirm');
  }

  const error = (title = 'Error', message = 'Tranaction failed', errorCBs = errorCB) => {
    setVisible(true);
    setType('error');
    setErrorTitle(title);
    setErrorMessage(message);
    setErrorAnimation(new Animated.Value(0));
    setErrorCB(errorCBs);
    animate('error');
  }
  const options = (title = 'Options', message = 'Select media type', optionsCBs = optionsCB, optionsArr = []) => {
    setVisible(true);
    setType('error');
    setOptionsTitle(title);
    setOptionsMessage(message);
    setOptionsAnimation(new Animated.Value(0));
    setOptionsCB(optionsCBs);
    setOptionsArr(optionsArr);
    animate('options');
  }

  const load = () => {
    setVisible(true);
    setType('loader');
    setLoaderAnimation(new Animated.Value(0));
  }

  const hideLoader = (callback, msg) => {
    setVisible(false);
    if (callback != undefined) {
      setTimeout(() => {
        msg != undefined ? callback(msg) : callback();
      }, 200);
    }
  }

  props.Ref.current = {
    success: success,
    confirm: confirm,
    error: error,
    options: options,
    load: load,
    hideLoader: hideLoader
  }

  const successCBss = () => {
    hideLoader();
    successCB.ok()
  }

  const errorCBss = () => {
    hideLoader();
    errorCB.ok()
  }
  const confirmCBss = () => {
    hideLoader();
    confirmCB.yes()
  }

  const optionCBss = (type, data) => {
    hideLoader();
    if (type == 'option') optionsCB.select(data)
    else optionsCB.cancel()
  }

  //const { type } = this.state;

  let display = visible ? true : false;


  const loaderAnimation1 = {
    opacity: loaderAnimation.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0, 1]
    }),
    transform: [
      {
        translateY: loaderAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 1]
        })
      }
    ]
  }

  let successAnimation1 = {
    opacity: successAnimation.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0, 1]
    }),
    transform: [
      {
        translateY: successAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 1]
        })
      }
    ]
  }

  let errorAnimation1 = {
    opacity: errorAnimation.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0, 1]
    }),
    transform: [
      {
        translateY: errorAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 1]
        })
      }
    ]
  }

  let confirmAnimation1 = {
    opacity: confirmAnimation.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0, 1]
    }),
    transform: [
      {
        translateY: confirmAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 1]
        })
      }
    ]
  }

  let optionsAnimation1 = {
    opacity: optionsAnimation.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0, 1]
    }),
    transform: [
      {
        translateY: optionsAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 1]
        })
      }
    ]
  }

  const loader1Scale = {
    opacity: loader1OpacityAnimation,
    transform: [{ scale: loader1ScaleAnimation }]
  }
  const loader2Scale = {
    transform: [{ scale: loader2ScaleAnimation }]
  }

  // const restyle = useAnimatedStyle(() => ({
  //   transform: [
  //     {
  //       translateY: withSpring("50%"),
  //     },
  //   ],
  // }));
  useEffect(() => {
    if (visible == true) {
     // animate(type);
      pulseAnimation();
    }
  }, [visible]);
  return (
    <Modal
      visible={display}
      animationType={"fade"}
      transparent={true}
      onRequestClose={() => { }}>
      <View
        style={[
          styles.modalWrap,
          {
            backgroundColor:
              type === "loader" ? "rgba(0,0,0,0.6)" : "#90909090",
          },
        ]}>

        <Animated.View
          style={[
            styles.centerView,
            styles.loadingView,
            {
              backgroundColor: 'transparent',
              opacity: loaderAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [500, 1]
              }),
            //  restyle,
            }
            //loaderAnimation1,
          ]}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 10,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Animated.Image
              source={images.loaderImg1}
              style={[loader1Scale, { height: 30, width: 30 }]}
            />
          </View>
          <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Animated.Image
            source={images.loaderImg2}
            style={[loader2Scale, { height: 30, width: 30 }]}
          />
        </View>
        </Animated.View>

       { type == 'success' && <Animated.View
        style={[
          styles.animationView,
          styles.successView,
          styles.centerView,
        //  successAnimation1,
        ]}>
        <Text style={styles.modalHeading}>
          {successTitle}
        </Text>
        <View style={{ padding: 10 }}>
          <Text style={styles.bodyTxt}>
            {successMessage}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => successCBss()}
          style={styles.okBtnWrap}>
          <_GradiantView color={"appColor"} style={styles.okBtn}>
            <_Lang style={styles.okBtnTxt} text="loadingModal.ok" />
          </_GradiantView>
        </TouchableOpacity>
      </Animated.View>}
    {/*  { type == 'confirm' && <Animated.View
        style={[
          styles.animationView,
          styles.confirmView,
          styles.centerView,
         // confirmAnimation1,
        ]}>
        <Text
          style={[
            styles.modalHeading,
            { textAlign: "center", paddingHorizontal: 8 },
          ]}>
          {confirmTitle}
        </Text>
        {confirmMessage != "" ? (
          <View style={{ padding: 10 }}>
            <Text style={styles.bodyTxt}>
              {confirmMessage}
            </Text>
          </View>
        ) : null}

        <View
          style={{ flexDirection: "row", alignItems: "space-around" }}>
          <View>
            <TouchableOpacity
              onPress={() => confirmCBss()}
              style={[styles.okBtnWrap, { marginHorizontal: 8 }]}>
              <_GradiantView
                color={"appColor"}
                style={[styles.yesBtn, { borderColor: "#000" }]}>
                <_Lang
                  style={styles.yesBtnTxt}
                  text="loadingModal.ok"
                />
              </_GradiantView>
            </TouchableOpacity>
          </View>
          {confirmCB.noButton ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  confirmCB.no();
                }}
                style={[styles.okBtnWrap, { marginHorizontal: 8 }]}>
                <View style={styles.noBtn}>
                  <_Lang
                    style={styles.noBtnTxt}
                    text="loadingModal.cancel"
                  />
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </Animated.View>}

      { type == 'options' &&  <Animated.View
        style={[
          styles.animationView,
          styles.successView,
          styles.centerView,
       //   optionsAnimation1,
        ]}>
        <Text style={styles.modalHeading}>
          {optionsTitle}
        </Text>
        <Text style={styles.bodyTxt}>{optionsMessage}</Text>
        <_Spacer size={10} />
        <ScrollView style={{ maxHeight: 200, ...sty.w100 }}>
          {optionsArr.map((item, index) => {
            return (
              <View key={"Options_" + index} style={{ ...sty.w100 }}>
                <TouchableOpacity
                  onPress={() => optionCBss("option", item)}
                  style={{ ...sty.w100 }}>
                  <_ListWrap style={{ ...sty.fRow }}>
                    <_Icon
                      type={"Ionicons"}
                      icon={"ios-arrow-dropright"}
                      color={colors.primaryColor}
                      size={20}
                    />
                    <Text
                      style={{ paddingLeft: 15, color: colors.gray }}>
                      {item}
                    </Text>
                  </_ListWrap>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            optionCBss("ok", {});
          }}
          style={styles.okBtnWrap}>
          <_GradiantView color={"appColor"} style={styles.okBtn}>
            <_Lang style={styles.okBtnTxt} text="loadingModal.cancel" />
          </_GradiantView>
        </TouchableOpacity>
      </Animated.View> } */}

    { type == 'error' && <Animated.View
        style={[
          styles.animationView,
          styles.errorView,
          styles.centerView,
        //  errorAnimation1,
        ]}>
        <Text style={[styles.modalHeading, styles.errorHeading]}>
          {errorTitle}
        </Text>
        <View style={{ padding: 10 }}>
          <Text style={styles.bodyTxt}>{errorMessage}</Text>
        </View>
        <TouchableOpacity
          onPress={() => errorCBss()}
          style={styles.okBtnWrap}>
          <_GradiantView color={"appColor"} style={styles.okBtn}>
            <_Lang style={styles.okBtnTxt} text="loadingModal.ok" />
          </_GradiantView>
        </TouchableOpacity>
      </Animated.View>} 
      </View>
    </Modal>
  )
}

export default _Loading;