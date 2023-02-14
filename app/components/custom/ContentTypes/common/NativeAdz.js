// import NativeAdView, {
//   CallToActionView,
//   HeadlineView,
//   TaglineView,
//   AdvertiserView,
//   AdBadge,
//   MediaView,
// } from "react-native-admob-native-ads";
import React, {useState, memo} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {globals, colors} from '../../../../configs';
import FastImage from 'react-native-fast-image';
import {styles} from './NativeAd';

const NativeAd = memo(props => {
  const {adId} = props;
  const [height, setHeight] = useState((globals.WINDOW_WIDTH * 10) / 7.5);
  const [showAd, changeAd] = useState(true);
  const [isImage, changeIsImage] = useState(true);
  const [image, changeImageUrl] = useState(false);

  return showAd ? (
    <>
      <View style={{paddingVertical: 5}}>
        <View style={[styles.mainWrap, {height: height}]}>
          {isImage && image ? (
            <FastImage
              source={{uri: image[0].url}}
              // style={{ height: "50%", width: "100%" }}
              style={styles.mediaImage}
              resizeMode={'cover'}
            />
          ) : isImage ? (
            <View style={styles.mediaImage} />
          ) : null}

          {/* <NativeAdView
            adUnitID="ca-app-pub-3940256099942544/2247696110"
            refreshInterval={600000}
            onUnifiedNativeAdLoaded={(data) => {
              if (!data.video) {
                changeImageUrl(data.images);
              } else {
                changeIsImage(false);
                setHeight((globals.WINDOW_WIDTH / 10) * 9);
              }
            }}
            onAdLoaded={(d) => {
              console.log("AdLoad", d);
            }}
            onAdFailedToLoad={(err) => {
              changeAd(false);
              console.log("AdErr", err.nativeEvent);
            }}>
            <View style={styles.main}>
              {!isImage && <MediaView style={styles.mediaVideo} />}

              <View style={{ paddingHorizontal: 5 }}>
                <View style={[styles.viewWrap, { paddingTop: 5 }]}>
                  <HeadlineView
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                    numberOfLines={1}
                    allowFontScaling={false}
                  />
                </View>

                <View style={[styles.viewWrap]}>
                  <View style={{ flex: 0.12, height: 30 }}>
                    <AdBadge style={styles.badge} textStyle={styles.badgeTxt} />
                  </View>
                  <View style={{ flex: 0.88, justifyContent: "center" }}>
                    <AdvertiserView
                      style={{
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                      allCaps={true}
                      allowFontScaling={false}
                    />
                  </View>
                </View>

                <View style={styles.viewWrap}>
                  <TaglineView
                    style={{ fontSize: 12 }}
                    numberOfLines={3}
                    allowFontScaling={false}
                    onTextLayout={({ nativeEvent: { lines } }) => {
                      const changer = Platform.OS === "ios" ? 10 : 5;

                      lines.length === 1
                        ? setHeight(height - changer)
                        : lines.length > 2
                        ? setHeight(height + changer)
                        : null;
                    }}
                  />
                </View>

                <View style={{ paddingTop: 8 }}>
                  <CallToActionView
                    style={styles.button}
                    textStyle={styles.buttonTxt}
                  />
                </View>
              </View>
            </View>
          </NativeAdView> */}
        </View>

        {/* {isImage && (
          <View style={{ paddingHorizontal: 10 }}>
            <View style={styles.seperator} />
          </View>
        )} */}
      </View>
    </>
  ) : null;
});

export default NativeAd;
