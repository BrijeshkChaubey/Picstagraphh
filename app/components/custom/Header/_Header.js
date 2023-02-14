import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Platform } from "react-native";
import FastImage from "react-native-fast-image";
import { globals, helpers, colors, images, sty } from "../../../configs";
import { _Lang, _Icon } from "../../custom";
import mainStyles from "../../../assets/styles/MainStyles";
import styles from "./styles";
import {useSelector} from 'react-redux'

export default function _Header(props) {
  console.log(' _header props', props)
    const {appData}=useSelector((state)=>state.appData)
    const {header,children} = props

    const [wrapStyle,setWrapStyle] = useState(props.wrapStyle || { marginBottom: 0 });
    const [style,setStyle] = useState(props.style || {})

    useEffect(() => {
        helpers.pauseVideo();
        return () => {
            helpers.pauseVideo();
        }
    },[]);

    const _renderHeader = () => {
        switch (props.screen) {
          case "userSearch":
            return _userSearchHeader();
          case "newMessage":
            return _newMessageHeader();
          default:
            return _defaultHeader();
        }
      };
    
      const _userSearchHeader = () => {
        return (
          <View style={styles.searchHeaderWrap}>
            <View
              style={{
                width: (globals.WINDOW_WIDTH - 20) * 0.225,
                // ...sty.fRow,
                ...sty.jStart,
                paddingTop: 8,
                flex: 0.1,
              }}>
              {_defaultNewHeaderLeft()}
            </View>
            <View
              style={{
                width: (globals.WINDOW_WIDTH - 20) * 0.55,
                ...sty.jStart,
                flex: 0.9,
                // ...sty.fRow,
                // ...sty.jCenter,
              }}>
              {props.userSearchHeader}
            </View>
          </View>
        );
      };
    
      const _newMessageHeader = () => {

        return (
          <View style={{ ...sty.fRow, ...sty.padH15, ...sty.padV10 }}>
            <View
              style={{
                width: 25,
                ...sty.jCenter,
                marginRight: 10,
               
              }}>
              <TouchableOpacity
                onPress={() => {
                  header.leftCb();
                }}>
                <FastImage
                  source={images.leftBackArrow}
                  resizeMode={"contain"}
                  style={{ height: 20, width: 22 }}
                />
              </TouchableOpacity>
            </View>
            <View style={[{ width: 45, ...sty.jCenter }]}>
              <TouchableOpacity onPress={() => header.userProfileLink()}>
                <View style={{ width: 35, overflow: "hidden", borderRadius: 100 }}>
                  <FastImage
                    source={{ uri: header.userInfo.resizeProfileUrl }}
                    style={{ height: 35, width: 35 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={[
                { ...sty.flex1, ...sty.jCenter },
                // isIphoneXR ? styles.xrHeader : null,
              ]}>
              <_Lang
                onPress={() => header.userProfileLink()}
                text={header.userInfo.username}
                style={[mainStyles.appTxtBoldBlack, styles.headingNewTxt]}
                pureText
                isBold
              />
              {header.userInfo.name ? (
                <Text style={{ color: "#fff", fontSize: 15 }}>
                  {header.userInfo.name}
                </Text>
              ) : null}
            </View>
            <View
              style={{ width: 25, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  header.rightCb();
                }}>
                <FastImage
                  source={images.threeDots}
                  resizeMode={"contain"}
                  style={{ height: 20, width: 22 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      };
    
     const _defaultHeaderLeft = () => {
    
        if (header.hideLeft) return <View style={{ minWidth: 50 }} />;
    
        return (
          <View style={[{  ...sty.jCenter }]}>
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{
                width: 30, height: 30,
                justifyContent: 'center', alignItems: 'center'
              }}
              onPress={() => {
                header.leftCb();
              }}>
              {header.leftImg ? (
                <FastImage
                  source={header.leftImg}
                  resizeMode={"contain"}
                  style={
                    props.screen == "home"
                      ? { height: 22, width: 22 }
                      : { height: 19, width: 19 }
                  }
                />
              ) : (
                <_Icon
                  type={header.leftIconArr ? header.leftIconArr[1] : "Ionicons"}
                  icon={
                    header.leftIconArr
                      ? header.leftIconArr[0]
                      : "ios-arrow-back-outline"
                  }
                  color={"#fff"}
                  size={30}
                />
              )}
            </TouchableOpacity>
          </View>
        );
      };
    
    const _defaultHeaderRight = () => {
    
        if (header.hideRight)
          return <View style={[{ minWidth: 50, ...sty.aEnd }]} />;
        if (header.isRightComponent) {
          return <View style={styles.headerRight}>{header.rightComponent()}</View>;
        }
    
        return (
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => {
                header.rightCb();
              }}
              style={{}}>
              {header.rightIconArr ? (
                <_Icon
                  type={header.rightIconArr[1]}
                  icon={header.rightIconArr[0]}
                  color={"black"}
                  size={30}
                />
              ) : header.disableLang ? (
                <Text style={mainStyles.appTxtLightWhite}>{header.rightTxt}</Text>
              ) : (
                <_Lang style={mainStyles.appTxtLightWhite} text={header.rightTxt} />
              )}
            </TouchableOpacity>
          </View>
        );
      };
    
     const _defaultHeaderCenter = () => {

        const isIphoneXR = checkIphoneXR();
        return (
          <View
            style={[
              { ...sty.flex1, ...sty.aCenter, ...sty.jCenter },
              isIphoneXR ? styles.xrHeader : null,
            ]}>
            {header.titleImgUrl ? (
              <FastImage
                style={{ height: 35, width: "100%" }}
                source={header.titleImgUrl}
                resizeMode={"contain"}
              />
            ) : header.disableLang ? (
              <TouchableOpacity onPress={() => header.leftCb()}>
                <Text
                  style={[
                    mainStyles.appTxtBoldWhite,
                    styles.headingTxt,
                    { fontWeight: "bold" },
                  ]}>
                  {header.title}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => header.leftCb()}>
                <_Lang
                  style={[
                    mainStyles.appTxtBoldWhite,
                    styles.headingTxt,
                    { fontWeight: "bold" },
                  ]}
                  text={header.title}
                />
              </TouchableOpacity>
            )}
          </View>
        );
      };
    
     const _defaultHeader = () => {
    
        return true ? (
          <View>
            <View style={[styles.headerLeftWrap, style]}>
              <View
                style={{
                  width: (globals.WINDOW_WIDTH - 20) * 0.225,
                  ...sty.fRow,
                  ...sty.jStart,
                }}>
                {_defaultNewHeaderLeft()}
              </View>
              <View
                style={{
                  width: (globals.WINDOW_WIDTH - 20) * 0.55,
                  ...sty.fRow,
                  ...sty.jCenter,
                }}>
                {_defaultNewHeaderCenter()}
              </View>
              <View
                style={{
                  width: (globals.WINDOW_WIDTH - 20) * 0.225,
                  ...sty.fRow,
                  ...sty.jEnd,
                }}>
                {_defaultNewHeaderRight()}
              </View>
            </View>
            {props.bottomHeader ? (
              <View style={[styles.headerBottomWrap]}>
                {/* <View style={[{ ...sty.flex1, ...sty.fRow, ...sty.aCenter, ...sty.jStart },]}> */}
                {props.bottomHeader}
                {/* </View> */}
              </View>
            ) : null}
          </View>
        ) : (
          <View style={[styles.headerWrap, style]}>
            {_defaultHeaderLeft()}
            {_defaultHeaderCenter()}
            {_defaultHeaderRight()}
          </View>
        );
      };
    
     const _defaultNewHeaderLeft = () => {

        if (header.hideLeft) return <View style={{ minWidth: 0 }} />;
        return (
          <View style={{ paddingRight: 5, marginTop: 5 }}>
            <TouchableOpacity
              style={{
                width:50,
                height: 30,
                justifyContent: "center",
                alignItems: "flex-start",
             
              }}
              onPress={() => {
                header.leftCb();
              }}>
              {header.leftImg ? (
                <>
                  <FastImage
                    source={header.leftImg}
                    resizeMode={"contain"}
                    style={
                      props.screen === "home"
                        ? { height: 22, width: 22 }
                        : { height: 19, width: 19 }
                    }
                  />
                  {appData?.unreadMessages > 0 &&
                    props.screen === "notifications" && (
                      <View
                        style={{
                          position: "absolute",
                          top: -5,
                          right: 15,
                          height: 20,
                          width: 20,
                          backgroundColor: colors.red,
                          borderRadius: 1000,
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                        <Text
                          style={{
                            color: colors.white,
                            fontSize: 9,
                            fontWeight: "600",
                          }}>
                          {appData?.unreadMessages < 100
                            ? appData?.unreadMessages
                            : " 99+"}
                        </Text>
                      </View>
                    )}
                </>
              ) : header.leftTxt ? (
                <Text
                  style={[
                    mainStyles.appTxtLightWhite,
                    {
                      fontWeight: "bold",
                      paddingLeft: 10,
                      fontSize: 13,
                      color: "#000",
                    },
                  ]}>
                  {header.leftTxt}
                </Text>
              ) : (
                <_Icon
                  type={header.leftIconArr ? header.leftIconArr[1] : "Ionicons"}
                  icon={
                    header.leftIconArr
                      ? header.leftIconArr[0]
                      : "ios-arrow-back-outline"
                  }
                  color={"#fff"}
                  size={30}
                />
              )}
            </TouchableOpacity>
          </View>
        );
      };
    
     const _defaultNewHeaderCenter = () => {
        return (
          <View
            style={[{ ...sty.flex1, ...sty.fRow, ...sty.aCenter, ...sty.jCenter }]}>
            {header.titleImgUrl ? (
              <FastImage
                style={{ height: 30, width: 150 }}
                source={header.titleImgUrl}
                resizeMode={"cover"}
              />
            ) : header.disableLang ? (
              <TouchableOpacity>
                <Text
                  style={[
                    mainStyles.appTxtBoldBlack,
                    styles.headingNewTxt,
                    { fontWeight: "bold" },
                  ]}>
                  {header.title}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <_Lang
                  style={[
                    mainStyles.appTxtBoldBlack,
                    styles.headingNewTxt,
                    { fontWeight: "bold" },
                  ]}
                  text={header.title}
                />
              </TouchableOpacity>
            )}
            {header.verified ? (
              <FastImage
                source={images.verifiedUser}
                resizeMode={"contain"}
                style={{ height: 13, width: 13, ...sty.padH15 }}
              />
            ) : null}
          </View>
        );
      };
    
      // if (header.hideLeft) return <View style={headerLeftSide ? { minWidth: 0 } : { minWidth: 50 }} />
    
     const _defaultNewHeaderRight = () => {

        if (header.hideRight)
          return <View style={[{ minWidth: 50, ...sty.aEnd }]} />;
    
        return (
          <View style={[styles.headerRight, { ...sty.fRow, ...sty.jEnd }]}>
            {header.rightNewIconArr
              ? header.rightNewIconArr.map((t, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={header.rightNewCb[i]}
                    style={[{ paddingLeft: 10 }]}>
                    <FastImage
                      source={t}
                      resizeMode={"contain"}
                      style={{ height: 22, width: 22 }}
                    />
                  </TouchableOpacity>
                );
              })
              : null}
            {header.isRightComponent ? (
              <View style={styles.headerRight}>{header.rightComponent()}</View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  header.rightCb ? header.rightCb() : null;
                }}
                style={{}}>
                {header.rightIconArr ? (
                  header.rightIconArr[0] ? (
                    <FastImage
                      source={header.rightIconArr[0]}
                      resizeMode={"contain"}
                      style={{ height: 20, width: 20, marginLeft: 10 }}
                    />
                  ) : null
                ) : header.disableLang && header.rightTxt ? (
                  <Text
                    style={[
                      mainStyles.appTxtLightWhite,
                      {
                        fontWeight: "bold",
                        paddingLeft: 10,
                        fontSize: 13,
                        color: "#000",
                      },
                    ]}>
                    {header.rightTxt}
                  </Text>
                ) : header.rightTxt ? (
                  <_Lang
                    style={[
                      mainStyles.appTxtLightWhite,
                      {
                        fontWeight: "bold",
                        paddingLeft: 10,
                        fontSize: 13,
                        color: "#000",
                      },
                    ]}
                    text={header.rightTxt}
                  />
                ) : null}
              </TouchableOpacity>
            )}
          </View>
        );
      };
     const checkIphoneXR = () => {
        return (
          Platform.OS === "ios" &&
          (globals.WINDOW_HEIGHT == 812 || globals.WINDOW_WIDTH == 812)
        );
      };

      //const { wrapStyle } = this.state;
  
  return (
    <View
        style={[
          { zIndex: 1000,marginBottom:0 ,paddingTop: Platform.OS === "ios" ? 30 : 5 },
          wrapStyle,
        ]}>
        {_renderHeader()}
        {children ? children : null}
      </View>
  )
}