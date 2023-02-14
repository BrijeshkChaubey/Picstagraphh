import React, { Component, createRef, useCallback, useEffect, useRef, useState } from "react";
import {
    FlatList,
    View,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
    Dimensions,
} from "react-native";
import Indicator from "./Indicator";
import ChildItem from "./ChildItem";

export default CategorySlider = ({
    // data = [],
    imageKey = "image",
    local = false,
    width = Math.round(Dimensions.get("window").width),
    separatorWidth = 0,
    loop = true,
    indicator = true,
    indicatorStyle = {},
    indicatorContainerStyle = {},
    indicatorActiveColor = "#3498db",
    indicatorInActiveColor = "#bdc3c7",
    indicatorActiveWidth = 6,
    animation = true,
    autoscroll = true,
    timer = 500,
    onPress = {},
    contentContainerStyle = {},
    component = <ChildItem />,
    ...props }) => {

    const [index, setIndex] = useState(0);
    let sliderTimer;
    let ind = 0;
    const [data, setData] = useState(props.data);
    let slider = useRef();
    const totalItemWidth = width + separatorWidth;
    useEffect(() => {
        console.log('categorySlider props==>',props.data);
            startAutoPlay();
        return () => {
            if (autoscroll)
                stopAutoPlay();
        }
    }, []);

    useEffect(()=>{
        if(props.data != data)
        setData(props.data);
    },[props.data])

    const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        if (viewableItems.length > 0) {
            let currentIndex = viewableItems[0].index;
            if (
                currentIndex % data.length === data.length - 1 &&
                loop
            ) {
                setIndex(currentIndex);
                setData([...data, ...data])
            } else {
                setIndex(currentIndex);
                clearInterval(sliderTimer);
                sliderTimer = setInterval(
                    changeSliderListIndex,
                    timer,
                );
            }
            // if (currentIndexCallback) {
            //     currentIndexCallback(currentIndex);
            // }
        }
    }, [data]);

    const changeSliderListIndex = () => {
        if (animation) {
            LayoutAnimation.configureNext({duration:1000})
            // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeIn);
        }
        if(data.length > 0)
         {ind =  (data.length - 1 > ind) ? ind+1 : 0;
        slider.current.scrollToIndex({index:ind, animated: true})
        // setIndex(index + 1);
        console.log('index ==>',ind);
         }
    };
    const startAutoPlay = () => {
        sliderTimer = setInterval(
            changeSliderListIndex,
            timer,
        );
    };

    const stopAutoPlay = () => {
        if (sliderTimer) {
            clearInterval(sliderTimer);
            sliderTimer = null;
        }
    };

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
    return (
        <View>
            <FlatList
                ref={slider}
                horizontal
                pagingEnabled={true}
                snapToInterval={totalItemWidth}
                decelerationRate="fast"
                bounces={false}
                style={{ borderRadius: 5 }}
                contentContainerStyle={contentContainerStyle}
                data={data}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, id }) =>
                    React.cloneElement(component, {
                        style: { width: width },
                        item: item,
                        imageKey: imageKey,
                        onPress: onPress,
                        index: index % data.length,
                        active: id === index,
                        local: local,
                        height: 100,
                    })
                }
                ItemSeparatorComponent={() => {
                    <View style={{ width: props.separatorWidth }} />
                }}
                keyExtractor={(item, index) => item.toString() + index}
                //  onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewConfigRef.current}
                getItemLayout={(data, index) => ({
                    length: totalItemWidth,
                    offset: totalItemWidth * index,
                    index,
                })}
                windowSize={1}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                removeClippedSubviews={true}
            />

            {indicator && (
                <Indicator
                    itemCount={data.length}
                    currentIndex={index % data.length}
                    indicatorStyle={indicatorStyle}
                    indicatorContainerStyle={[
                        styles.indicatorContainerStyle,
                        indicatorContainerStyle,
                    ]}
                    indicatorActiveColor={indicatorActiveColor}
                    indicatorInActiveColor={indicatorInActiveColor}
                    indicatorActiveWidth={indicatorActiveWidth}
                    style={{ ...styles.indicator, ...indicatorStyle }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        resizeMode: "stretch",
        borderRadius: 5,
    },
    indicatorContainerStyle: {
        marginTop: 18,
    },
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.25,
                shadowRadius: 2,
            },
            android: {
                elevation: 5,
            },
        }),
    },
});