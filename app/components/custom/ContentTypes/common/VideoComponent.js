import React, { memo, useState } from "react";
import { View, Text } from "react-native";
import Video from "react-native-video";

const VideoComponent = (props) => {
  const [key, setKey] = useState(1000);
  return (
    <Video
      source={{ uri: props.mediaUrl }}
      playInBackground={false}
      paused={props.paused}
      muted={props.muted}
      repeat={true}
      onLoad={(data) => {
        props._onVideoLoad(data);
      }}
      onProgress={(data) => {
        props._VideoProgress(data);
      }}
      onEnd={(data) => {
        props._onVideoEnd(data);
      }}
      onBuffer={(buf) => {}}
      onError={(err) => {}}
      bufferConfig={{
        minBufferMs: 10000,
        maxBufferMs: 30000,
        bufferForPlaybackMs: 2500,
        bufferForPlaybackAfterRebufferMs: 5000,
        maxHeapAllocationPercent: 1,
        minBackBufferMemoryReservePercent: 0.2,
        minBufferMemoryReservePercent: 0.8,
      }}
      style={props.style}
      resizeMode={"cover"}
      fullscreen={props.fullscreen}
      useTextureView={true}
      poster={props.poster}
      posterResizeMode={"cover"}
    />
  );
};

export default memo(VideoComponent);