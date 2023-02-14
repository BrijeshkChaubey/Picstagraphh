import React, { useEffect, useState } from 'react'
import debounce from 'lodash.debounce';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";
import FastImage from "react-native-fast-image";
import { Searchbar } from 'react-native-paper';
// CAUTION: Item component removed in latest versions of nativebase
import { Input, Item ,Box} from "native-base";
import {
  globals,
  helpers,
  validators,
  colors,
  fonts,
  images,
  sty,
  localize,
  ApiCall,
  API,
} from "../../../../configs";
import { styles } from "./styles";
import { useDispatch, useSelector } from 'react-redux';

function TopHeader(props) {
  console.log('TopHeader called');
  const { navigation } = props;

  const dispatch = useDispatch();
  const loginData = useSelector(state => state.loginData)
  const navProps = useSelector(state => state.navProps)
  const userInfo = useSelector(state => state.userInfo)

  const [profileUrl, setprofileUrl] = useState("")
  useEffect(()=>{
    getProfilePhoto();
  },[props]);
  const getProfilePhoto = () => {
    console.log('getProfilePhoto loginData ===> ',loginData);
    if (profileUrl == "") {
      let cb = {
        success: (res) => {
          console.log('success==>',res);
          setprofileUrl(res?.data?.resizeProfileUrl);
        },
        error: (err) => {console.log('Error ==>',err); },
        complete: () => { },
      };
      let header = helpers.buildHeader({ authorization: loginData.token });
      API.getUserInfo({}, cb, header, loginData.username);
    }
  }

  const searchUser = () => {
    navigation.navigate("User", { forceRedirect: false });
  };
  const debouncedOnPress = () => {
    console.log("hi")
    props?.navigation?.navigate("Profile");
    // props.onPress && props.onPress();
  }
  const onPress = debounce(debouncedOnPress, 300, { leading: true, trailing: false });

  const navProfile = () => {
    props?.navigation?.navigate("Profile");
  };
  return (
    <View
      style={{
        marginTop: Platform.OS == "android" ? 20 : 40,
        marginBottom: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        width: "100%",
      }}>
      {getProfilePhoto()}
      <View
        style={{
          borderwidth: 1,
        }} >
        <TouchableOpacity {...props} onPress={onPress}>
          <FastImage
            source={
              profileUrl != ""
                ? { uri: profileUrl }
                : images.user
            }
            defaultSource={images.user}
            style={{
              height: 40,
              width: 40,
              margin: 5,
              resizeMode: "cover",
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      </View>
      {/* TODO: Item component gives error as it is removed from latest versions 
     
     Box component may be used intead of Item
     */}
     <Searchbar placeholder='User search'
     style={styles.searchBar}
     />
      {/* <TouchableOpacity style={[styles.searchBar,{
        flexDirection:'row',
        alignItems:'center'
      }]} onPress={() => searchUser()}>
        <FastImage
          resizeMode="contain"
          style={{ height: 15, width: 15 }}
          source={images.iconSearchGrey}
        />
        <Text
          style={{
            ...sty.padV5,
            marginLeft: 10,
            color: "grey",
            fontSize: 15,
          }}>
          {" "}
          User search
        </Text>
      </TouchableOpacity> */}
    </View>
  )
}

export default TopHeader

