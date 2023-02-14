import React, {createRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {styles} from './styles';
import {sty} from '../../../configs';
import {images, helpers, colors, fonts, globals} from '../../../configs';
import mainStyles from '../../../assets/styles/MainStyles';
import {_GradiantView, _Lang} from '..';

const NewUserFollowingCard = props => {
  return (
    <View style={mainStyles.rootView}>
      <View style={styles.emptyNews}>
        <View
          style={{
            ...sty.fRow,
            alignItems: 'center',
            marginLeft: 10,
            paddingBottom: 5,
          }}>
          <View style={styles.imgWrap}>
            <Image
              source={images.P_Logo}
              resizeMode={'contain'}
              style={styles.appLogo}
            />
          </View>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: fonts.medium,
              fontWeight: 'bold',
              paddingLeft: 6,
            }}>
            Picstagraph
          </Text>
        </View>
        <Image
          source={props.image}
          // resizeMode={"repeat"}
          style={[styles.emptyImg]}
        />
        <Text style={styles.Textstyle1}>{props.title}</Text>
        <Text style={styles.Textstyle2}>{props.subTitle}</Text>

        <View style={{...sty.aCenter, ...sty.mgT20}}>
          {props.whiteBtn ? (
            <TouchableOpacity style={{width: '90%'}}>
              <View
                style={{
                  width: '100%',
                  borderColor: '#000',
                  borderWidth: 2,
                  height: 45,
                  justifyContent: 'center',
                  borderRadius: 5,
                }}>
                <_Lang
                  style={[styles.uploadBtn, {color: '#000'}]}
                  text={props.btnText}
                />
              </View>
            </TouchableOpacity>
          ) : !props.hideBtn ? (
            <TouchableOpacity
              onPress={() => {
                props.onPress();
              }}
              style={{width: '90%'}}>
              <_GradiantView style={{borderRadius: 5, padding: 5}}>
                <_Lang style={styles.uploadBtn} text={props.btnText} />
              </_GradiantView>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default NewUserFollowingCard;
