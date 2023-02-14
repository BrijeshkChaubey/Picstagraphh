// import React from "react";
// import { View, Text, Image, Platform, Dimensions, AsyncStorage, } from "react-native";
// import { createAppContainer } from "react-navigation";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { globals, colors, images } from "../../configs";
// import { _Lang } from "../custom";
// import HomeNavigator from "./HomeNavigator";
// import CampaignNavigator from "./CampaignNavigator";
// import ParticipantNavigator from "./ParticipantNavigator";
// // import NotificationNav from "./NotificationsNavigator";
// // import JobNav from "./JobNavigator";
// // import MessageNav from "./MessageNavigator";
// var jwtDecode = require("jwt-decode");
// // import ProfileNav from "./ProfileNavigator";
// // import TabBarIconWithBadge from "./TabBarIconWithBadge";
// import NavigationService from "./NavigationService";
// // import UploadSheet from "../custom/ContentTypes/common/UploadModal";
// // import configureStore from "../../redux/configureStore";
// import * as messageSocket from "../custom/ContentTypes/common/MessageSocket";
// import { Label } from "native-base";
// const WINDOW_HEIGHT = Dimensions.get("window").height;
// const WINDOW_WIDTH = Dimensions.get("window").width;

// // const store = configureStore();
// const getInitialRoute = () => {
//   const initialRouteName = globals.getUserData("initialRouteName");
//   // console.log("RouteXXX", initialRouteName);
//   return initialRouteName;
// };
// const checkIphoneXR = () => {
//   return Platform.OS === "ios" && (WINDOW_HEIGHT >= 812 || WINDOW_WIDTH >= 812);
// };

// const _TabIcon = (props) => {
//   // console.log(props);
//   const { focused, image1, image2, badgeCount} = props;
//   // console.log(`${focused} image1 : ${image1} image2 : ${image2} , badgeCount : ${badgeCount} ${props}`)
//   return (
//     <View style={[{ marginBottom: 10 }, Platform.OS === 'android' ? { alignItems: 'center', width: 60 } : null]}>
//       <Image
//       // source ={images.campaign3}
//         source={focused ? image2 : image1}
//         style={{
//           height: checkIphoneXR() ? 25 : 22.5,
//           width: checkIphoneXR() ? 50 : 45,
//           // marginBottom:5
//         }}
//         resizeMode="contain"
//       />
//       <View style={{ height: 5 }}>

//       </View>
//       {/* <Label style={{}}>{label}</Label> */}
//       {badgeCount > 0 && (
//         <View
//           style={{
//             position: "absolute",
//             right: -12,
//             top: -6,
//             backgroundColor: "red",
//             borderRadius: 5, //10,
//             width: 50,
//             height: 20,
//             justifyContent: "center",
//             alignItems: "center",
//           }}>
//           {badgeCount < 9 ? (
//             <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
//               {badgeCount}
//             </Text>
//           ) : null}
//           {badgeCount <= 99 ? (
//             <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
//               {badgeCount}
//             </Text>
//           ) : null}
//           {badgeCount > 99 ? (
//             <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
//               {"99+"}
//             </Text>
//           ) : null}
//         </View>
//       )}
//     </View>
//   );
// };

// const _UploadIcon = (props) => {
//   const { focused, image1, image2, badgeCount, label } = props;

//   return (
//     <View style={{ marginBottom: 20 }}>
//       <Image
//         source={image1}
//         style={{
//           height: checkIphoneXR() ? 46 : 42,
//           width: checkIphoneXR() ? 50 : 45,
//           // marginBottom:
//           paddingBottom: 0
//         }}
//       // resizeMode="contain"
//       />
//       {/* <View style={{height:100}}></View> */}

//     </View>
//   );
// };
// const Tab = createMaterialBottomTabNavigator();
// export default function TabNav() {
//   return (
//     <Tab.Navigator
//       initialRouteName='CampaignNavigator'
//       screenOptions={({ route }) => ({
//         style: {
//           backgroundColor: "white", //"rgba(74,74,74,100)",
//           height: checkIphoneXR() ? 85 : 68,
//           borderTopLeftRadius: 10,
//           borderTopRightRadius: 10,
//           paddingTop: 5,
//           shadowColor: '#000',
//           shadowOffset: { width: 2, height: 2 },
//           shadowOpacity: 0.15,
//           shadowRadius: 3,
//           elevation: 5,
//         },
//         tabBarActiveTintColor: colors.primiaryColor,
//         tabBarInactiveTintColor: colors.grayDarker,
//       })}>

//       <Tab.Screen name='Home' component={HomeNavigator} options={{
//         // Label: ({ focused, colors }) => <_Lang style={{ fontSize: 10, color: focused ? "black" : "gray" }}
//         //   text= 'home' />,
//         tabBarIcon: ({ focused, colors }) =>
//           <_TabIcon
//             image1={images.campaign3}
//             image2={images.campaignB1}
//             focused={focused}
//             label={<_Lang style={{ width: 50, fontSize: 9.5, color: focused ? "black" : "gray", justifyContent: "center", textAlign: "center" }} text="tabs.home" />}
//           />

//       }} />
//       <Tab.Screen name='Campaign' component={CampaignNavigator} options={{
//         // Label: ({ focused, colors }) => <_Lang style={{ fontSize: 10, color: focused ? "black" : "gray" }}
//         //   text={"tabs.campaign"} />,
//         tabBarIcon: ({ focused, colors }) =>
//           <_TabIcon
//             image1={images.trofy1}
//             image2={images.trofyB1}
//             focused={focused}
//             badgeCount={0}
//             label={<_Lang style={{ width: 50, fontSize: 9.5, color: focused ? "black" : "gray", justifyContent: "center", textAlign: "center" }}
//               text={"tabs.campaign"} />}
//           />
//       }} />
//       <Tab.Screen name='Participant' component={ParticipantNavigator} options={{
       
//         // Label: ({ focused, colors }) => <_Lang style={{ fontSize: 10, color: focused ? "black" : "gray" }}
//         //   text={"tabs.upload"} />,
//         tabBarIcon: ({ focused, colors }) =>
//           <_UploadIcon
//             image1={images.newUploadBold}
//           />
//       }} />
//       {/* <Tab.Screen name='NotificationsNavigator' component={NotificationNav} options={{
//         Label: ({ focused, colors }) => <_Lang style={{ fontSize: 10, color: focused ? "black" : "gray" }}
//           text={"tabs.notification"} />,
//         tabBarIcon: ({ focused, colors }) =>
//           <TabBarIconWithBadge
//             image1={images.notification1}
//             image2={images.notificationB1}
//             focused={focused}
//             badgeCount={155}
//             label={<_Lang style={{ width: 50, fontSize: 9.5, color: focused ? "black" : "gray", justifyContent: "center", textAlign: "center" }} text={"tabs.notification"} />}
//           />
//       }} /> */}
//       {/* <Tab.Screen name='JobNavigator' component={JobNav} options={{
//         Label: ({ focused, colors }) => <_Lang style={{ fontSize: 10, color: focused ? "black" : "gray" }}
//           text={"tabs.job"} />,
//         tabBarIcon: ({ focused, colors }) =>
//           <_TabIcon
//             image1={images.lap}
//             image2={images.lapB1}
//             focused={focused}
//             badgeCount={0}
//             label={<_Lang style={{ width: 50, fontSize: 9.5, color: focused ? "black" : "gray", justifyContent: "center", textAlign: "center" }} text={"tabs.job"} />}
//           // label={<_Lang style={labelStyle} text={"tabs.job"} />}
//           />
//       }} /> */}

//     </Tab.Navigator>
//   )
// }





// //just for check


// // import { View, Text, Dimensions, Platform, Image } from 'react-native'
// // import React from 'react'
// // import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// // import HomeNavigator from './HomeNavigator';
// // import CampaignNavigator from "./CampaignNavigator";
// // import ParticipantNavigator from "./ParticipantNavigator";
// // //import { Label } from "native-base";
// // const WINDOW_HEIGHT = Dimensions.get("window").height;
// // const WINDOW_WIDTH = Dimensions.get("window").width;
// // import { globals, colors, images } from "../../configs";
// // import { _Lang } from "../custom";
// // const Tab = createMaterialBottomTabNavigator();



// // export default function TabNav() {
// //   const checkIphoneXR = () => {
// //     return Platform.OS === "ios" && (WINDOW_HEIGHT >= 812 || WINDOW_WIDTH >= 812);
// //   };

// //   const _TabIcon = (props) => {
// //     const { focused, image1, image2, badgeCount, label } = props;
// //     console.log("tabicon");
// //     console.log(props);
// //     return (
// //       <View style={[{ marginBottom: 10 }, Platform.OS === 'android' ? { alignItems: 'center', width: 60 } : null]}>
// //         <Image
// //           source={focused ? image2 : image1}
// //           style={{
// //             height: checkIphoneXR() ? 25 : 22.5,
// //             width: checkIphoneXR() ? 50 : 45,
// //             // marginBottom:5
// //           }}
// //           resizeMode="contain"
// //         />
// //         <View style={{ height: 5 }}>

// //         </View>
// //         <Text style={{}}>{label.props.text}</Text>
// //         {badgeCount > 0 && (
// //           <View
// //             style={{
// //               position: "absolute",
// //               right: -12,
// //               top: -6,
// //               backgroundColor: "red",
// //               borderRadius: 5, //10,
// //               width: 50,
// //               height: 20,
// //               justifyContent: "center",
// //               alignItems: "center",
// //             }}>
// //             {badgeCount < 9 ? (
// //               <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
// //                 {badgeCount}
// //               </Text>
// //             ) : null}
// //             {badgeCount <= 99 ? (
// //               <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
// //                 {badgeCount}
// //               </Text>
// //             ) : null}
// //             {badgeCount > 99 ? (
// //               <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
// //                 {"99+"}
// //               </Text>
// //             ) : null}
// //           </View>
// //         )}
// //       </View>
// //     );
// //   };
// //   return (
// //     <Tab.Navigator
// //       labeled={false}
// //       barStyle={{
// //         backgroundColor: "white",
// //         height: checkIphoneXR() ? 85 : 68,
// //         borderTopLeftRadius: 10,
// //         borderTopRightRadius: 10,
// //         paddingTop: 5,
// //         shadowColor: '#000',
// //         shadowOffset: { width: 2, height: 2 },
// //         shadowOpacity: 0.15,
// //         shadowRadius: 3,
// //         elevation: 5,
// //       }}
// //       //initialRouteName='HomeNavigator'
// //       screenOptions={({ route }) => ({
// //         tabBarActiveTintColor: colors.primiaryColor,
// //         tabBarInactiveTintColor: colors.grayDarker,
// //       })}
// //     >
// //       <Tab.Screen name="HomeNavigator" component={HomeNavigator}
// //         options={{
// //           Label: ({ focused, colors }) => <_Lang style={{ fontSize: 10, color: focused ? "black" : "gray" }}
// //             text={"Home"} />,
// //           tabBarIcon: ({ focused, colors }) =>
// //             <_TabIcon
// //               image1={images.campaign3}
// //               image2={images.campaignB1}
// //               focused={focused}
// //               label={<_Lang style={{ width: 50, fontSize: 9.5, color: focused ? "black" : "gray", justifyContent: "center", textAlign: "center" }} text={"Home"} />}
// //             />
// //         }}
// //       />
// //       <Tab.Screen name="CampaignNavigator" component={CampaignNavigator}
// //         options={{
// //           Label: ({ focused, colors }) => <_Lang style={{ fontSize: 10, color: focused ? "black" : "gray" }}
// //             text={"campaign"} />,
// //           tabBarIcon: ({ focused, colors }) =>
// //             <_TabIcon
// //               image1={images.trofy1}
// //               image2={images.trofyB1}
// //               focused={focused}
// //               badgeCount={0}
// //               label={<_Lang style={{ width: 50, fontSize: 9.5, color: focused ? "black" : "gray", justifyContent: "center", textAlign: "center" }} text={"Campaign"} />}
// //             />
// //         }}
// //       />
// //       <Tab.Screen name="ParticipantNavigator" component={ParticipantNavigator}
// //         options={{
// //           Label: ({ focused, colors }) => <_Lang style={{ fontSize: 10, color: focused ? "black" : "gray" }}
// //             text={"upload"} />,
// //           tabBarIcon: ({ focused, colors }) =>
// //             <_TabIcon
// //               image1={images.upload}
// //               image2={images.uploadB}
// //               focused={focused}
// //               badgeCount={0}
// //               label={<_Lang style={{ width: 50, fontSize: 9.5, color: focused ? "black" : "gray", justifyContent: "center", textAlign: "center" }} text={"upload"} />}
// //             />
// //         }}
// //       />
// //       {/* <Tab.Screen name="NotificationsNavigator" component={NotificationsNavigator} />
// //       <Tab.Screen name="JobNavigator" component={JobNavigator} /> */}
// //     </Tab.Navigator>
// //   )
// // }

import { View, Text, Dimensions, Platform, Image } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeNavigator from './HomeNavigator';
// import CampaignNavigator from "./CampaignNavigator";
import ParticipantNavigator from "./ParticipantNavigator";
import TabShape from './TabShape';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CampaignHome from '../screens/afterLogin/campaign/campaignHome/CampaignHome'
import CampaignNav from './CampaignNavigator';

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return(<Tab.Navigator initialRouteName='CampaignNavigator'
  tabBar = {(props)=> <TabShape {...props}/> } 
  >
    <Tab.Screen name='HomeNavigator' component={HomeNavigator} options={{headerShown:false}}/>
    
    <Tab.Screen name='CampaignNavigator' component={CampaignNav} options={{headerShown:false}}/>
    <Tab.Screen name='ParticipantNavigator' component={ParticipantNavigator} options={{headerShown:false}}/>
  </Tab.Navigator>)
}
