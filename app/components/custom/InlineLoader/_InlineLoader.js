import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
    ActivityIndicator,
    Animated,
    Image,
    FlatList,
  } from "react-native";
import React from 'react'
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
  import {
    _ErrorModal,
    _GradiantView,
    _Lang,
    _ListBox,
    _Loading,
    _Spacer,
    _Icon,
    _Button,
  } from "../../custom";
  import mainStyles from "../../../assets/styles/MainStyles";
   import styles from "./styles";
import { useState } from "react";
import { useEffect } from "react";

const COLORS_ARR = ["#f5f5f5", "#ddd"];

export default function _InlineLoader(props) {
  
  const { fullViewNav } = props;

    const [size,setSize] = useState('medium');
    const [bgColor,setBgColor] = useState(new Animated.Value(0));
    const [type,setType] = useState(props.type || "medium");
    const [scale,setScale] = useState(new Animated.Value(1));
    // const [size,setSize] = useState("medium")
   let stopAnimation = false;

   useEffect(() => {
    if (props.type) {
        stopAnimation = false;
        _postLoaderAnimate();
      }

      return () => {
        stopAnimation = true;
      }
   },[]);

   const _renderLoader = (wrapStyle) => {
    const { type } = props;
    switch (type) {
      case "post":
        return (
          <ScrollView style={styles.postContainer}>
            {_postLoaderItem()}
            {_postLoaderItem()}
          </ScrollView>
        );
        break;
      case "singlePost":
        return (
          <View
            style={{ width: "100%", ...sty.flex1, backgroundColor: "#fff" }}
          >
            {_postLoaderItem()}
          </View>
        );
        break;
      case "singleImage":
        return (
          <View
            style={{ width: "100%", ...sty.flex1, backgroundColor: "#fff" }}
          >
            {_imageLoaderItem()}
          </View>
        );
        break;
      case "comment":
        return (
          <View style={{ width: "100%", ...sty.flex1 }}>
            {_commentLoaderItem()}
            {_commentLoaderItem()}
          </View>
        );
        break;
      case "list":
        return (
          <View style={{ width: "100%", ...sty.flex1 }}>
            {_listLoaderItem()}
            {_listLoaderItem()}
          </View>
        );
        break;
      case "userBox":
        return (
          <ScrollView style={{ ...sty.flex1, backgroundColor: "#fff" }}>
            <View
              style={[
                {
                  height: 50,
                  backgroundColor: "white",
                },
              ]}
            />
            <View style={{ ...sty.fRow, height: 250, ...sty.jSpace }}>
              {_userBox(0)}
              {_userBox(1)}
            </View>
            <View style={{ ...sty.fRow, height: 250, ...sty.jSpace }}>
              {_userBox(0)}
              {_userBox(1)}
            </View>
          </ScrollView>
        );
      case "userStories":
        return (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ ...sty.flex1, borderWidth: 0 }}
          >
            <View
              style={{
                ...sty.fRow,
                height: globals.WINDOW_WIDTH / 4 + 41,
                ...sty.jSpace,
                backgroundColor: "#fff",
              }}
            >
              {_userStory(0)}
              {_userStory(1)}
              {_userStory(2)}
              {_userStory(3)}
              {_userStory(4)}
            </View>
          </ScrollView>
        );
      case "homeScreen":
        return (
          <View style={mainStyles.rootView}>
            {/* <View style={[{ height: 38, borderBottomWidth: 1, borderBottomColor: colors.appBg, backgroundColor: "white" }]} /> */}
            {/* <View
              style={{
                height: globals.WINDOW_WIDTH / 4 + 41,
                borderBottomWidth: 1,
                borderBottomColor: colors.appBg,
                backgroundColor: "white",
              }}
            /> */}
            <ScrollView style={styles.postContainer}>
              {_postLoaderItem()}
              {_postLoaderItem()}
            </ScrollView>
          </View>
        );
      case "homeScreenExplore":
        return (
          <View style={mainStyles.rootView}>
            <View
              style={[
                {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appBg,
                  backgroundColor: "white",
                },
              ]}
            />
            {/* <View style={{ height: globals.WINDOW_WIDTH / 4 + 37, borderBottomWidth: 0, borderBottomColor: colors.appBg, backgroundColor: "white" }} /> */}
            <ScrollView style={styles.postContainer}>
              <FlatList
                data={[
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ]}
                renderItem={_renderGridItems}
                numColumns={3}
              />
            </ScrollView>
          </View>
        );
      case "homeScreenBest":
        return (
          <View style={mainStyles.rootView}>
            <View
              style={[
                {
                  height: 50,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appBg,
                  backgroundColor: "white",
                },
              ]}
            />
            {/* <View style={{ height: globals.WINDOW_WIDTH / 4 + 37, borderBottomWidth: 0, borderBottomColor: colors.appBg, backgroundColor: "white" }} /> */}
            <ScrollView style={styles.postContainer}>
              <FlatList
                data={[
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ]}
                renderItem={_renderGridItems}
                numColumns={3}
              />
            </ScrollView>
          </View>
        );
      case "gridWith3Item":
        return (
          <FlatList
            data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
            renderItem={_renderGridItems}
            numColumns={3}
          />
        );
      case "contest":
        return (
          <ScrollView style={styles.postContainer}>
             {_contestLoaderItem()}
            {_contestLoaderItem()}
          </ScrollView>
        );
      case "favContest":
        return (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.postContainer}
          >
            <View
              style={{
                ...sty.fRow,
                height: globals.WINDOW_WIDTH * 0.6 + 65,
                ...sty.jSpace,
                backgroundColor: "#fff",
              }}
            >
              {_favContestLoaderItem()}
              {_favContestLoaderItem()}
              {_favContestLoaderItem()}
            </View>
          </ScrollView>
        );
      case "grid":
        return (
          <View
            style={[
              { ...sty.aCenter, ...sty.jCenter, ...sty.w100, ...sty.padV20 ,marginBottom:60},
              wrapStyle,
            ]}
          >
            <ActivityIndicator color={colors.primaryColor} size={"small"} />
          </View>
        )
      default:
        return (
          <View
            style={[
              { ...sty.aCenter, ...sty.jCenter, ...sty.w100, ...sty.padV20 },
              wrapStyle,
            ]}
          >
            <ActivityIndicator color={colors.primaryColor} size={"small"} />
          </View>
        );
    }
  };

  const _userStory = (index) => {


    var bg = bgColor.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.lighter, "#dedede"],
    });
    return (
      <View style={[styles.userStory, { marginLeft: index === 0 ? 10 : 0 }]}>
        {/* <View style={{ ...sty.flex1 }}>
                        <Animated.View style={{ ...sty.flex1, backgroundColor: bg, borderRadius: 100, borderWidth: 1 }}></Animated.View>
                    </View> */}
        <Animated.View
          style={{
            height: globals.WINDOW_WIDTH / 4 + 28,
            width: (globals.WINDOW_WIDTH - 40) / 3.5,
            backgroundColor: bg,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <Text style={{
            color:'green',
            fontSize:40
          }}>Filters Home</Text>
        </Animated.View>
        {/* <Animated.View style={{ height: 25, backgroundColor: bg, borderRadius: 0, borderWidth: 1 }}></Animated.View> */}
      </View>
    );
  };

  const _postLoaderAnimate = () => {

    Animated.parallel([
      Animated.timing(bgColor, {
        toValue: bgColor._value === 0 ? 1 : 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: scale._value === 1 ? 0.8 : 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      stopAnimation === false ? _postLoaderAnimate() : null;
    });
  };

 const  _imageLoaderItem = () => {

    var bg = bgColor.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.lighter, "#dedede"],
    });
    const heightimage = fullViewNav ? globals.WINDOW_WIDTH : 200;

    return (
      <View style={styles.postWrap}>
        {/* <Image source={images.loadingMedia} style={[styles.loadingImage, { height: heightimage }]} /> */}
        {/* <View style={styles.postFooter}>
                    <Animated.View style={[styles.line, {backgroundColor: bg, width: '90%'}]} />
                    <Animated.View style={[styles.line, {backgroundColor: bg, width: '60%'}]} />
                </View> */}
        <View style={{ height: 200, width: "100%" }} />
      </View>
    );
  };

  const _renderGridItems = ({ item, index }) => {
    return (
      <View
        key={"GridItems" + index.toString()}
        style={{
          paddingHorizontal: 0.5,
          paddingBottom: 1,
          width: globals.WINDOW_WIDTH / 3,
          height: globals.WINDOW_WIDTH / 3,
          borderWidth: 0.5,
          borderColor: colors.appBg,
        }}
      />
    );
  };

 const _contestLoaderItem = () => {

    var bg = bgColor.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.lighter, "#dedede"],
    });
    const scaleAnimation = {
      transform: [{ scale }],
    };
    return (
      <View style={styles.contestWrap}>
        <View style={styles.postHead}>
          <Animated.View style={[styles.circleBox, { backgroundColor: bg }]} />
          <View style={{ flex: 1 }}>
            <Animated.View
              style={[styles.line, { backgroundColor: bg, width: "40%" }]}
            />
            <Animated.View
              style={[styles.line, { backgroundColor: bg, width: "70%" }]}
            />
          </View>
          {/* <Animated.View style={[scaleAnimation]}>
                        <_Icon type={'Ionicons'} icon={'ios-heart'} size={35} color={colors.light} />
                    </Animated.View> */}
        </View>
        {/* <Image source={images.loadingMedia} style={styles.loadingImage} /> */}
        {/* <View style={{ height: 200 }} /> */}
        {/* <View style={styles.postFooter}>
                    <Animated.View style={[styles.line, { backgroundColor: bg, width: '90%' }]} />
                    <Animated.View style={[styles.line, { backgroundColor: bg, width: '60%' }]} />
                </View> */}
      </View>
    );
  };

 const  _favContestLoaderItem = () => {

    var bg = bgColor.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.lighter, "#dedede"],
    });
    const scaleAnimation = {
      transform: [{ scale }],
    };
    return (
      <View style={styles.contestWrap1}>
        <View style={[styles.postHead, { ...sty.aCenter, ...sty.padH10 }]}>
          <Animated.View style={[styles.circleBox1, { backgroundColor: bg }]} />
          <View style={{ flex: 1 }}>
            <Animated.View
              style={[styles.line, { backgroundColor: bg, width: "40%" }]}
            />
            <Animated.View
              style={[styles.line, { backgroundColor: bg, width: "70%" }]}
            />
          </View>
        </View>
      </View>
    );
  };

  const _postLoaderItem = () => {

    var bg = bgColor.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.lighter, "#dedede"],
    });
    const scaleAnimation = {
      transform: [{ scale }],
    };
    return (
        <View style={styles.postWrap}>
          <View style={styles.postHead}>
            <Animated.View style={[styles.circleBox, { backgroundColor: bg }]} />
            <View style={{ flex: 1 }}>
              <Animated.View
                style={[styles.line, { backgroundColor: bg, width: "40%" }]}
              />
              <Animated.View
                style={[styles.line, { backgroundColor: bg, width: "70%" }]}
              />
            </View>
            {/* <Animated.View style={[scaleAnimation]}>
                          <_Icon type={'Ionicons'} icon={'ios-heart'} size={35} color={colors.light} />
                      </Animated.View> */}
          </View>
          {/* <Image source={images.loadingMedia} style={styles.loadingImage} /> */}
          <View style={{ height: 200 }} />
          <View style={styles.postFooter}>
            <Animated.View
              style={[styles.line, { backgroundColor: bg, width: "90%" }]}
            />
            <Animated.View
              style={[styles.line, { backgroundColor: bg, width: "60%" }]}
            />
          </View>
        </View>
      );
    };
  

  
   const _userBox = (index) => {
  
      var bg = bgColor.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.lighter, "#fff"],
      });
      return (
        <View style={styles.userBox}>
          <View style={{ ...sty.pad20, ...sty.flex1 }}>
            <Animated.View
              style={{ ...sty.flex1, backgroundColor: bg, borderRadius: 10 }}
            />
          </View>
          <View style={{ ...sty.padH20, ...sty.padB20 }}>
            <Animated.View
              style={{
                height: 15,
                backgroundColor: bg,
                borderRadius: 0,
                ...sty.mgB10,
              }}
            />
            <Animated.View
              style={{ height: 15, backgroundColor: bg, borderRadius: 0 }}
            />
          </View>
        </View>
      );
    };
  
    const _commentLoaderItem = () => {
  
      var bg = bgColor.interpolate({
        inputRange: [0, 1],
        outputRange: ["#f5f5f5", "#efeeee"],
      });
      return (
        <View style={styles.commentWrap}>
          <View style={{ flexDirection: "row" }}>
            <Animated.View
              style={{
                height: 50,
                width: 50,
                backgroundColor: bg,
                borderRadius: 100,
                marginRight: 20,
              }}
            />
            <View style={{ flex: 1 }}>
              <Animated.View
                style={{
                  backgroundColor: bg,
                  height: 12,
                  width: "40%",
                  marginVertical: 5,
                }}
              />
              <Animated.View
                style={{
                  backgroundColor: bg,
                  height: 12,
                  width: "70%",
                  marginVertical: 5,
                }}
              />
            </View>
          </View>
        </View>
      );
    };
  
   const _listLoaderItem = () => {
  
      var bg = bgColor.interpolate({
        inputRange: [0, 1],
        outputRange: ["#f5f5f5", "#fff"],
      });
      return (
        <View style={styles.listWrap}>
          <Animated.View
            style={{
              backgroundColor: bg,
              height: 12,
              width: "40%",
              marginVertical: 5,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: bg,
              height: 12,
              width: "70%",
              marginVertical: 5,
            }}
          />
        </View>
      );
    };
    var wrapStyle = {};

    if (size == "xsmall") wrapStyle = { paddingVertical: 5 };
    if (size == "small") wrapStyle = { paddingVertical: 10 };
    if (size == "medium") wrapStyle = { paddingVertical: 20 };
    if (size == "large") wrapStyle = { paddingVertical: 40 };

  return (
    _renderLoader(wrapStyle)
  )
}