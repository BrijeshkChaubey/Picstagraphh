import React, {Component, useEffect, useState} from 'react';
import {Dimensions, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
const deviceWidth = Dimensions.get('window').width;

const _AutoHeightImage = ({contentInfo}) => {
  const [calcImgHeight, setImageHeight] = useState(0);
  useEffect(() => {
    // Image.getSize(contentInfo.listMediaUrl, (width, height) => {
    // 	// use aspect ratio to set the size of the image relative to react-native pixels.
    // 	// setImageSize({ width: w, height: height / width * dims.width });
    // 	setImageHeight(height / width * deviceWidth)
    // });
    // ImageSize.getSize(contentInfo.listMediaUrl).then(size => {
    // 	setImageHeight(size.height / size.width * deviceWidth)
    // 	// size.height
    // 	// size.width
    // })
  }, []);
  return (
    <FastImage
      style={{width: '100%', height: calcImgHeight}}
      source={{
        uri: contentInfo.fileName.includes('https')
          ? contentInfo.fileName
          : contentInfo.listMediaUrl,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.stretch}
      onLoad={evt =>
        setImageHeight(
          (evt.nativeEvent.height / evt.nativeEvent.width) * deviceWidth,
        )
      }
    />
  );
};
export default _AutoHeightImage;
