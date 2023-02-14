import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    Text,
    Modal
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Item } from 'native-base';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../configs';
import { _Spacer, _Icon, _ListView, _B, _Button } from '../../custom';
import { mainLayoutHoc } from '../../hoc';
import mainStyles from '../../../assets/styles/MainStyles';
import { styles } from './styles';



const _PostVideo = (props) => {

    const { contentInfo } = props;

    const [state, setstate]= useState({
        videoModal: false,
        duration: 0
    })
    let seekToValue=0

  const  _toggleModal = (status) => {
        setstate({
            ...state, 
            videoModal: status
        }, ()=>{
            if(!status){
                videoSmall.toggleFS();
                videoSmall.pause();
                //this.videoSmall.onSeekRelease(this.seekToValue / this.state.duration);
                //this.videoSmall.seek(this.seekToValue);
            }
            else{
                videoFull.play();
                setTimeout(() => {
                    //this.videoFull.onSeekRelease(this.seekToValue / this.state.duration);
                    //this.videoFull.seekTo(this.seekToValue);
                }, 2000);
            }
        });
    }

    const _renderPostVideo = () => {
        
        const mediaUrl = globals.live ? contentInfo.mediaUrl : "https://www.radiantmediaplayer.com/media/bbb-360p.mp4";
        //return <View />
        return (
            <View>
                {/* {
                    mediaUrl ?
                        <Video 
                            url={mediaUrl} 
                            ref={(ref) => { this.videoSmall = ref }}
                            onFullScreen={(value) => { if(value) this._toggleModal(true) }} 
                            logo={images.logoUrl}
                            rotateToFullScreen={false}
                            onLoad={(data) => this.setState({ duration: data.duration }) }
                            onProgress={(value)=>{
                                this.seekToValue = value.target
                            }}
                        /> : null
                } */}
            </View>
        )
    }
   const _renderFullScreenVideo = () => {
        const { videoModal } = this.state;

        const mediaUrl = globals.live ? contentInfo.mediaUrl : "https://www.radiantmediaplayer.com/media/bbb-360p.mp4"
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={state.videoModal}
                supportedOrientations={['landscape']}
                resizeMode={'stretch'}
                onRequestClose={() => { }}>
                <View style={{...sty.flex1}}>
                    {/* <Video 
                        url={mediaUrl} 
                        ref={(ref) => { this.videoFull = ref }}
                        onFullScreen={(value)=> { if(!value) this._toggleModal(false)} }
                        fullScreenOnly={videoModal || false}
                        logo={images.logoUrl}
                        fullscreen={true}
                        onProgress={(value)=>{
                            this.seekToValue = value.target
                        }}
                    />     */}
                </View>
            </Modal>
        )
    }
  return (
    <View style={{width: '100%', height: 200, ...sty.mgB20}}>
    {_renderPostVideo()}
    {_renderFullScreenVideo()}
</View>
  )
}

export default _PostVideo
