// import NativeAdView, {
//   CallToActionView,
//   HeadlineView,
//   TaglineView,
//   AdvertiserView,
//   AdBadge,
//   MediaView,
// } from "react-native-admob-native-ads";
import React, {useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {globals, colors} from '../../../../configs';

const changer = Platform.OS === 'ios' ? 15 : 10;

const NativeAd = props => {
  const {adId} = props;
  const [height, setHeight] = useState(
    (globals.WINDOW_WIDTH / 10) * 9 + changer,
  );
  const [showAd, changeAd] = useState(true);

  return showAd ? (
    <>
      <View style={{paddingTop: 5, paddingBottom: 8}}>
        <View style={[styles.mainWrap, {height: height}]}>
          {/* <NativeAdView
            adUnitID="ca-app-pub-3940256099942544/2247696110"
            onUnifiedNativeAdLoaded={(data) => {
              // console.log("AdData", data);
            }}
            onAdLoaded={(d) => {
              // console.log("AdLoaded", d);
            }}
            refreshInterval={600000}
            onAdFailedToLoad={(e) => {
              changeAd(false);
              // console.log("AdErr", err.nativeEvent);
            }}>
            <View style={styles.main}>
              <MediaView style={styles.media} />
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

                <View style={[styles.viewWrap]}>
                  <TaglineView
                    style={{ fontSize: 12 }}
                    numberOfLines={3}
                    allowFontScaling={false}
                    onTextLayout={({ nativeEvent: { lines } }) => {
                      lines.length === 1
                        ? setHeight(height - changer)
                        : lines.length > 2
                        ? setHeight(height + changer)
                        : null;
                    }}
                  />
                </View>

                <View style={{ paddingVertical: 2 }}>
                  <CallToActionView
                    style={styles.button}
                    textStyle={styles.buttonTxt}
                  />
                </View>
              </View>
            </View>
          </NativeAdView> */}
        </View>
      </View>
    </>
  ) : null;
};

export default NativeAd;

export const styles = StyleSheet.create({
  mainWrap: {
    width: globals.WINDOW_WIDTH,
    alignSelf: 'center',
    borderColor: '#F0F0F0',
    borderWidth: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  media: {
    width: globals.WINDOW_WIDTH,
    height: globals.WINDOW_WIDTH / 2 - 10,
    marginTop: 10,
  },
  mediaVideo: {
    width: globals.WINDOW_WIDTH,
    height: globals.WINDOW_WIDTH / 2 - 2,
    marginTop: 5,
  },
  mediaImage: {
    width: 'globals.WINDOW_WIDTH',
    height: globals.WINDOW_WIDTH - 22,
  },
  button: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 10,
  },
  buttonTxt: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  viewWrap: {flexDirection: 'row', justifyContent: 'center', paddingTop: 5},
  badge: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.primaryColor,
    padding: 5,
  },
  badgeTxt: {fontSize: 14, color: colors.primaryColor},
  seperator: {
    height: 1,
    backgroundColor: colors.lightDark,
  },
});
