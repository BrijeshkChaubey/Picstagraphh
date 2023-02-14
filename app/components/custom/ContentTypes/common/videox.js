import React from 'react';
import {View, StyleSheet, Platform, Text, FlatList} from 'react-native';
//import Video from 'react-native-video';
import Video from 'react-native-video';
import {_Layout} from '../../../custom';
import stylex from '../../../custom/ContentTypes/common/styles';
import RecyclerDemo from '../../../custom/ContentTypes/common/RecyclerList';
import {find} from 'lodash';
import {ScrollView} from 'react-native-gesture-handler';
import {globals} from '../../../../configs';

import {useState} from 'react';

const videox = props => {
  const [state, setstate] = useState({
    url: [
      'file:///data/user/0/com.picstagraph/cache/Camera/3d139a68-9a36-4b50-87a6-c58ba2d849a7.mp4',
      'http://d1y6wtrppxfxq.cloudfront.net/media/1574146410467-3d139a68-9a36-4b50-87a6-c58ba2d849a7.mp4',
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    ],
  });
  const renderVideo = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={stylex.videoWrap}>
          <Video
            source={{uri: item}}
            repeat={true}
            onEnd={() => {
              console.log('end', true);
            }}
            onError={() => {
              console.log('error', true);
            }}
            onLoad={() => {
              console.log('load', true);
            }}
            onProgress={() => {
              console.log('progress', true);
            }}
            resizeMode={'contain'}
            style={styles.backgroundVideo}
            useTextureView={true}
          />
        </View>
      </View>
    );
  };
  return (
    // <RecyclerDemo />
    <View style={styles.container}>
      {/* // <View style={stylex.videoWrap}> */}
      {/* <Video source={{uri: this.state.url[1]}}
    repeat={true}
    onEnd={()=>{console.log('end',true)}}
    onError={()=>{console.log('error',true)}}
    onLoad={()=>{console.log('load', true)}}
    onProgress={()=>{console.log('progress', true)}}
    resizeMode={'contain'}
    style={stylex.videoWrap}
    useTextureView={true}
    /> */}
      {/* // </View>
// </View>
// <View style={{flex : 1}}>
// <FlatList
// data={this.state.url}
// renderItem={(item)=>{this.renderVideo(item)}}
// /> */}
    </View>
  );
};

export default videox;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  backgroundVideo: {
    position: 'absolute',
    top: 10,
    left: 10,
    bottom: 0,
    right: 10,
  },
});