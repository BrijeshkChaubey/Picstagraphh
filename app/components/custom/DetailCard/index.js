import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { _Lang } from "..";
import mainStyles from "../../../assets/styles/MainStyles";
import { sty } from "../../../configs";
import { WINDOW_WIDTH } from "../../../configs/libs/globals";
import AboutIcon from "../../../assets/images/Icons/svgs/lightBulb.svg";
import JuryIcon from "../../../assets/images/Icons/svgs/star.svg";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FastImage from "react-native-fast-image";

function DetailCard({ title, description, img, imgArr, isJury, icon, themeColor, timer = false }){
  // const [activeSlide, ActiveSlide] = useState(0);



  const _renderItem = ({ item, index }) => {
    return (
      <Image
        source={{ uri: item }}
        style={{ height: WINDOW_WIDTH - 50, width: "100%", borderRadius: 10 }}
      />
    );
  };


  return (
    <View style={[mainStyles.cardWhite, { padding: 10 }]}>
      <View style={mainStyles.flexRow}>
        
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: themeColor, justifyContent: 'center', alignItems: 'center' }}>
            <FastImage source={{ uri:icon }} style={{ width: 20, height: 20 }} resizeMode={"contain"} />
          </View>
        
        <_Lang text={title} style={mainStyles.textHeadingIcon} pureText />
      </View>
      <Text style={[mainStyles.textLH24, { ...sty.mgV10 }]}>
        {description?.trim()}
      </Text>
      {timer && timer}

      {img && (
        <Image
          source={{ uri: img }}
          style={{ height: WINDOW_WIDTH - 50, width: "100%", borderRadius: 10 }}
        />
      )}
      {imgArr && (
        <View>
        <Carousel
          // firstItem={1}
          data={imgArr}
            renderItem={_renderItem}
            // onSnapToItem={(index) => ActiveSlide({ activeSlide: index })}
          sliderWidth={WINDOW_WIDTH -40}
          itemWidth={WINDOW_WIDTH -40}
          />
          
       </View>
      )}
    </View>
  );
};

export default DetailCard;
