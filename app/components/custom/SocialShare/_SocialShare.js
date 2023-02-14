import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    Text,
    StyleSheet,
    Modal,
    FlatList,
    Animated,
    Easing,
  } from "react-native";
 
  import { Input, Item } from "native-base";
  import {
    globals,
    helpers,
    validators,
    colors,
    fonts,
    images,
    sty,
    localize,
  } from "../../../configs";
  //import { mainLayoutHoc } from "../../hoc";
  import mainStyles from "../../../assets/styles/MainStyles";
  import { find } from "lodash";
  
  import Share, { ShareSheet, Button } from "react-native-share";
  import { WEB_URL, SHARE_URL, POST_TYPES } from "../../../configs/libs/globals";
  import { useSelector } from "react-redux";
  
import React, { useEffect,useState } from 'react';


export default function _SocialShare(props) {

    const [isVisible,setIsVisible] = useState(false);
    const [socialShareArr,setSocialShareArr] = useState([{
        label: "Twitter",
        image: images.twitter,
        contentObj: {
          title: "Share via",
          message: "",
          url: "",
          social: Share.Social.TWITTER,
        },
      },
      {
        label: "Facebook",
        image: images.facebook,
        contentObj: {
          title: "Share via",
          message: "",
          url: "",
          social: Share.Social.FACEBOOK,
        },
      },
      {
        label: "Whatsapp",
        image: images.whatsapp,
        contentObj: {
          title: "Share via",
          message: "",
          url: "",
          social: Share.Social.WHATSAPP,
          whatsAppNumber: "",
        },
      },
      {
        label: "Email",
        image: images.email,
        contentObj: {
          title: "Share via",
          message: "",
          url: "",
          social: Share.Social.EMAIL,
        },
      },]);
      const [shareAnim,setshareAnim ]= useState(new Animated.Value(0));

      useEffect(() => {
        props.setShareRef();
      },[]);

      let shareStyle = {
        transform: [
          {
            translateY: shareAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 1],
            }),
          },
        ],
      };

     const cancelShare = () => {
        const { appData } = props;
        if (appData.socialShareHandler) {
          appData.socialShareHandler(false);
        }
      };
    
      const toggleModal = (flag) => animateSocialShare(flag);
    
      const share = (shareObj) => {
        const { loginData } = props;
        let url = WEB_URL + "news-feed/" + loginData.username;
    
        // let postType = helpers.buildPostType(item.postType, item.userType || '');
        // const middleUrl = find(SHARE_URL, shr => shr.type == postType)
    
        // if(middleUrl){
        //     url =  POST_TYPES.CompanyCampaign == item.postType ? WEB_URL+middleUrl.url+item.slug : WEB_URL+middleUrl.url+item.id
        // }
        const realContent = Object.assign({}, shareObj.contentObj, {
          url: url,
        });
    
        Share.shareSingle(realContent);
      };
    
      const animateSocialShare = (flag) => {
        if (flag) {
          setIsVisible(true);
        }
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(shareAnim, {
              toValue: flag ? 1 : 0,
              duration: 150,
              easing: Easing.inOut(Easing.cubic),
              useNativeDriver: true,
            }),
          ]).start(() => {
            if (!flag) setIsVisible(false);
          });
        }, 150);
      };

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        animationType={"none"}
        onRequestClose={() => { }}
      >
        <View style={styles.overlayWrapper}>
          <TouchableOpacity
            onPress={() => {
              cancelShare(false);
            }}
            style={styles.overlayArea}
          />
          <View style={{ height: 250 }}>
            <Animated.View style={[styles.socialShareWrap, shareStyle]}>
              <FlatList
                data={socialShareArr}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.socialShareItem}
                    onPress={() => {
                      share(item);
                    }}
                  >
                    <View style={{ ...sty.flex1, ...sty.fRow, ...sty.jCenter }}>
                      <Image
                        source={item.image}
                        style={{ height: 22, width: 22, marginRight: 25 }}
                      />
                      <Text style={styles.socialShareItemTxt}>
                        {item.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) =>
                  index + "_socialShare" + Math.random()
                }
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 1,
                      width: "100%",
                      backgroundColor: "rgba(52, 52, 52, 0.1)",
                    }}
                  />
                )}
              />
            </Animated.View>
          </View>
        </View>
      </Modal>
  )
}
const styles = StyleSheet.create({
  overlayWrapper: {
    ...sty.flex1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  overlayArea: {
    ...sty.flex1,
  },
  socialShareWrap: {
    backgroundColor: "#fff",
    ...sty.padV15,
    ...sty.flex1,
    borderRadius: 5, //10,
    margin: 10,
  },
  socialShareItem: {
    ...sty.padV15,
    ...sty.padH25,
    ...sty.fRow,
  },
  socialShareItemTxt: {
    color: colors.grayDark,
    fontWeight: "600",
    fontSize: fonts.medium,
  },
});