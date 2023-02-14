import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    Text,
    FlatList,
    StyleSheet,
    Animated,
    Modal,
    Alert,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import React from 'react'
const DOUBLE_PRESS_DELAY = 250;

export default function _TapHandler(props) {
    let lastTap=null;
    let longPressDelay = props.longPressDelay || 1500;

    
   const handleTap = (e) => {
        if (props.storyTap) {
            props.singleTap(true, e)
        }
        else {
            const now = Date.now();
            if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
                if (props.doubleTap) props.doubleTap();
                lastTap = null;
            } else {
                lastTap = now;
                setTimeout(() => {
                    if (lastTap) {
                        if (props.singleTap) props.singleTap();
                    }
                }, DOUBLE_PRESS_DELAY);
            }
        }
    }
    const onLongPress = () => {
        // console.log('Long');
        if (props.onLongPress) props.onLongPress()
    }

   const  onPressOut = () => {
        if (props.onPressOut) props.onPressOut();
    }

  return (
            <TouchableWithoutFeedback
                onPress={(e) => { handleTap(e) }}
                onLongPress={(e) => { onLongPress() }}
                onPressOut={(e) => { onPressOut() }}
                delayLongPress={longPressDelay}
            >
                <View style={props.style || {}}>
                    {props.children}
                </View>
            </TouchableWithoutFeedback>
  )
}