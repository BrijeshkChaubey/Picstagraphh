import React, { useState, createRef ,useEffect} from "react";
import {
  View,
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
// import Video from "react-native-video";
import Video from "react-native-video";
import { globals, colors, sty } from "../../../../../../configs";
import { _Icon } from "../../../../../custom";
const FullScreenVideo = ({ navigation, route }) => {
  let videoRef = createRef(null);
  const { mediaUrl } = navigation?.state?.params;
  const { playTime } = navigation?.state?.params;
  console.log("timecurrent", playTime);
  const [loading, setLoading] = useState(true);
  const [curTime, setCurTime] = useState(0);
  const [lastProgress, setlastprogress] = useState(0);
  const loadingFunc = () => {
     setLoading(false);
     videoRef.seek(parseInt(playTime));
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
      }}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
   
        <Video
          ref={(ref) => (videoRef = ref)}
          source={{ uri: mediaUrl }} // Can be a URL or a local file.
          style={{ width: "100%", height: globals.WINDOW_HEIGHT-150 }}
          resizeMode={"contain"}
          controls={true}
          onSeek={(data) => console.log("seek", data)}
          onLoad={(load) => {
            loadingFunc();
          }}
          onBuffer={(data) => console.log(data)}
          onProgress={(data) => {
            setlastprogress(curTime);
            setCurTime(data.currentTime);

            if (lastProgress == data.currentTime) {
              setLoading(true);
            } else {
              setLoading(false);
            }
          }}
        />
     
      <View
        style={{
          height: 30,
          width: 30,
          borderRadius: 15,
          position: "absolute",
          top:Platform.OS=='ios'? "7%":"3%",
          left: "3%",
          backgroundColor: colors.grayDark,
        }}>
        <TouchableOpacity
          onPress={() => {
            //this._setVideoControl("muted");
            navigation.pop();
          }}
          style={{ ...sty.flex1, ...sty.jCenter, ...sty.aCenter }}>
          <_Icon
            type={"MaterialIcons"}
            icon={"arrow-back"}
            size={24}
            color={"#fff"}
          />
        </TouchableOpacity>
      </View>
      <ActivityIndicator
        style={{ position: "absolute" }}
        size={"large"}
        animating={loading}
        color={"#fff"}
      />
    </SafeAreaView>
  );
};

export default FullScreenVideo;
