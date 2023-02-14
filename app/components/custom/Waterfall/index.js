import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Image
} from 'react-native'

const animationVariable = new Animated.Value(0);

export default function Waterfall(props) {
  const [waterfallObjectsArray, setWaterfallObjectsArray] = useState(
    [
      { uri: require("./images/image1.jpeg"), height: 100 },
      { uri: require("./images/image2.jpeg"), height: 190 },
      { uri: require("./images/image3.jpeg"), height: 180 }
    ]
  );
  const [waterfallObjectsArray2, setWaterfallObjectsArray2] = useState(
    [
      { uri: require("./images/image4.jpeg"), height: 100 },
      { uri: require("./images/image5.jpeg"), height: 190 },
      { uri: require("./images/image6.jpeg"), height: 180 }
    ]
  );
  const [waterfallObjectsArray3, setWaterfallObjectsArray3] = useState(
    [
      { uri: require("./images/image7.jpeg"), height: 100 },
      { uri: require("./images/image8.jpeg"), height: 190 },
      { uri: require("./images/image9.jpeg"), height: 180 }
    ]
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const [index, setIndex] = useState(0);
  


  useEffect(() => {
   if(props.waterfall == true){
    setInterval(() => {
      var joined = waterfallObjectsArray.concat(
        waterfallObjectsArray[index],
      );
      var joined2 = waterfallObjectsArray2.concat(
        waterfallObjectsArray2[index],
      );
      var joined3 = waterfallObjectsArray3.concat(
        waterfallObjectsArray3[index],
      );
      setWaterfallObjectsArray(joined);
      setWaterfallObjectsArray2(joined2);
      setWaterfallObjectsArray3(joined3);
      setScrollPosition(scrollPosition + 30);
      index == 2 ? setIndex(0) : setIndex(index + 1)
      Animated.timing(animationVariable, {
        toValue: scrollPosition,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, 1000);
   }
  
  }, [index]);  // index animation should be resolve
  return (
    <View style={styles.container}>
      <View style={styles.objectsOuterView}>
        <Animated.View
          key={"-"}
          style={[
            styles.objectsInnerView,
            { transform: [{ translateY: animationVariable }] },
          ]}>
          {waterfallObjectsArray.map((obj, index) => (
            <View style={{ flexDirection: "row" }} key={index}>
              <Image
                source={obj.uri}
                style={{
                  width: "31%",
                  borderColor: "white",
                  borderWidth: 2,
                  borderRadius: 5,
                  height: obj.height,
                  margin: 5,
                }}
              />
            </View>
          ))}
        </Animated.View>
        <Animated.View
          key={"+"}
          style={[
            styles.objectsInnerView,
            {
              transform: [{ translateY: animationVariable }],
              left: "33%",
            },
          ]}>
          {waterfallObjectsArray2.map((obj, index) => (
            <View style={{ flexDirection: "row" }} key={index}>
              <Image
                source={obj.uri}
                style={{
                  width: "31%",
                  borderRadius: 5,
                  height: obj.height,
                  margin: 5,
                  borderColor: "white",
                  borderWidth: 2,
                }}
              />
            </View>
          ))}
        </Animated.View>
        <Animated.View
          key={"--"}
          style={[
            styles.objectsInnerView,
            {
              transform: [{ translateY: animationVariable }],
              left: "66%",
            },
          ]}>
          {waterfallObjectsArray3.map((obj, index) => (
            <View style={{ flexDirection: "row" }} key={index}>
              <Image
                source={obj.uri}
                style={{
                  width: "31%",
                  borderRadius: 5,
                  height: obj.height,
                  margin: 5,
                  borderColor: "white",
                  borderWidth: 2,
                }}
              />
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  objectsOuterView: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    height: "90%",
    width: "100%",
    overflow: "hidden",

    bottom: "40%",
  },
  objectsInnerView: {
    position: "absolute",
    overflow: "hidden",
    width: "100%",
    bottom: 0,
    flexDirection: "column-reverse",
  },
});
