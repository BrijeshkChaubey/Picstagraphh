// import { createStackNavigator } from '@react-navigation/stack';
// import react from 'react';


// import MessagesHome from "../screens/aferLogin/messages/messagesHome/MessagesHome";
// import MessageUser from "../screens/aferLogin/messages/messageUser/MessageUser";
// import NewMessage from "../screens/aferLogin/messages/newMessage/NewMessage";
// import Subscribe from "../screens/aferLogin/subscribe/Subscribe";
// import Upload from "../screens/aferLogin/uploadPhoto/upload/Upload";
// import CompanyCampaign from "../screens/aferLogin/campaign/comapnyCampaign/CompanyCampaign";
// import CreatorCampaign from "../screens/aferLogin/campaign/creatorCampaign/CreatorCampaign";
// import MediaPosts from "../screens/aferLogin/mediaPosts/MediaPosts";
// import MediaPost from "../screens/aferLogin/mediaPosts/MediaPost";
// import Advertise from "../screens/aferLogin/advertise/Advertise";
// import CampaignParticipant from "../screens/aferLogin/campaign/campaignParticipant/CampaignParticipant";
// import CampaignParticipantList from "../screens/aferLogin/campaign/comapnyCampaign/tabs/ParticipantsList";
// import NotificationsHome from "../screens/aferLogin/notifications/NotificationsHome";
// import Comments from "../screens/aferLogin/comments/_Comments";
// import LikeList from "../screens/aferLogin/likeList/_LikeList";
// import UploadStory from "../screens/aferLogin/uploadPhoto/Stories/UploadStory";
// import ViewStory from "../screens/aferLogin/uploadPhoto/Stories/ViewStory";
// import StoryTabs from "../screens/aferLogin/uploadPhoto/Stories/StoryTabs";
// import NotificationScreen from "../screens/aferLogin/notifications/tabs/NotificationScreen";

// import LandingPage from "../screens/landingPage/LandingPage";

// import Albums from "../screens/aferLogin/uploadPhoto/albums/Albums";
// import PostMediaView from "../screens/aferLogin/uploadPhoto/albums/PostMediaView";
// import NewPost from "../screens/aferLogin/uploadPhoto/newPost/NewPost";
// import ProfileNav from "./ProfileNavigator";
// // setting
// import Settings from "../screens/aferLogin/profile/settings/settingsHome/Settings";
// import EditProfile from "../screens/aferLogin/profile/settings/editProfile/EditProfile";
// import Privacy from "../screens/aferLogin/profile/settings/privacy/Privacy";
// import Language from "../screens/aferLogin/profile/settings/language/Language";
// import Information from "../screens/aferLogin/profile/settings/information/Information";
// import Service from "../screens/aferLogin/profile/settings/service/Service";
// import Top10List from "../screens/aferLogin/campaign/comapnyCampaign/tabs/Top10List";
// import categoryDetails from "../screens/aferLogin/campaign/categoryDetails";
// import NewMessage from "../screens/aferLogin/messages/newMessage/NewMessage";
// import FullScreenVideo from "../screens/aferLogin/campaign/comapnyCampaign/tabs/FullScreenVideo";

// const Stack= createStackNavigator();

// export default function HomeNavigator(){
    
//     return(
//         <Stack.Navigator 
//             // screenOptions={({ navigation }) => {
//             //     let { routeName } = navigation.state.routes[navigation.state.index];
//             //     let navigationOptions = {};
              
//             //     if (
//             //       routeName === "OthersProfileNewsFeedList" ||
//             //       routeName === "ExploreList"
//             //     ) {
//             //       navigationOptions.tabBarVisible = true;
//             //     } else if (navigation.state.index > 0) {
//             //       navigationOptions.tabBarVisible = false;
//             //     }
//             //     return navigationOptions;
//             //   }}
//         >
//             <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
//             {/* <HomeNav.Screen name="MessagesHome" component={MessagesHome} options={{headerShown:false}}/> */}
//             {/* <HomeNav.Screen name="MessageUser" component={MessageUser} options={{headerShown:false}}/> */}
//             {/* <HomeNav.Screen name="NewMessage" component={NewMessage} options={{headerShowNewMessage:false}}/>
//             <HomeNav.Screen name="OthersProfile" component={OthersProfile} options={{headerShown:false}}/>
//             <HomeNav.Screen name="OtherProfileNewsFeedList" component={OtherProfileNewsFeedList} options={{headerShown:false}}/>

//             <HomeNav.Screen name="CompanyCampaign" component={CompanyCampaign} options={{headerShown:false}}/>
//             <HomeNav.Screen name="CreatorCampaign" component={CreatorCampaign} options={{headerShown:false}}/>
//             <HomeNav.Screen name="CategoryDetails" component={CategoryDetails} options={{headerShown:false}}/>
//             <HomeNav.Screen name="MediaPosts" component={MediaPosts} options={{headerShown:false}}/>
//             <HomeNav.Screen name="ProfileNav" component={ProfileNav} options={{headerShown:false}}/>
//             <HomeNav.Screen name="MediaPost" component={MediaPost} options={{headerShown:false}}/>
//             <HomeNav.Screen name="FullScreenVideo" component={FullScreenVideo} options={{headerShown:false}}/>
//             <HomeNav.Screen name="CampaignParticipant" component={CampaignParticipant} options={{headerShown:false}}/>
//             <HomeNav.Screen name="CampaignParticipantList" component={CampaignParticipantList} options={{headerShown:false}}/>
//             <HomeNav.Screen name="Top10List" component={Top10List} options={{headerShown:false}}/>
//             <HomeNav.Screen name="Advertise" component={Advertise} options={{headerShown:false}}/>
//             <HomeNav.Screen name="Subscribe" component={Subscribe} options={{headerShown:false}}/>
//             <HomeNav.Screen name="NotificationsHome" component={NotificationsHome} options={{headerShown:false}}/>

//             <HomeNav.Screen name="Upload" component={Upload} options={{headerShown:false}}/>
//             <HomeNav.Screen name="UploadStory" component={UploadStory} options={{headerShown:false}}/>
//             <HomeNav.Screen name="ViewStory" component={ViewStory} options={{headerShown:false}}/>
//             <HomeNav.Screen name="StoryTabs" component={StoryTabs} options={{headerShown:false}}/>
//             <HomeNav.Screen name="Albums" component={Albums} options={{headerShown:false}}/>
//             <HomeNav.Screen name="PostMediaView" component={PostMediaView} options={{headerShown:false}}/>
//             <HomeNav.Screen name="NewPost" component={NewPost} options={{headerShown:false}}/>
//             <HomeNav.Screen name="Comments" component={Comments} options={{headerShown:false}}/>
//             <HomeNav.Screen name="LikeList" component={LikeList} options={{headerShown:false}}/>
//             <HomeNav.Screen name="User" component={User} options={{headerShown:false}}/>
//             <HomeNav.Screen name="Settings" component={Settings} options={{headerShown:false}}/>
//             <HomeNav.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}}/>
//             <HomeNav.Screen name="Privacy" component={Privacy} options={{headerShown:false}}/>
//             <HomeNav.Screen name="Language" component={Language} options={{headerShown:false}}/>
//             <HomeNav.Screen name="Information" component={Information} options={{headerShown:false}}/>

//             <HomeNav.Screen name="Service" component={Service} options={{headerShown:false}}/>
//             <HomeNav.Screen name="ExploreList" component={ExploreList} options={{headerShown:false}}/>
//             <HomeNav.Screen name="BestList" component={BestList} options={{headerShown:false}}/>
//             <HomeNav.Screen name="NotificationScreen" component={NotificationScreen} options={{headerShown:false}}/>
//             <HomeNav.Screen name="LandingPage" component={LandingPage} options={{headerShown:false,gestureEnabled:false}}/> */}

//         </Stack.Navigator>

//     )
// }

import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/afterLogin/home/Home';
import OthersProfile from "../screens/afterLogin/othersProfile/OthersProfile";
import OtherProfileNewsFeedList from "../screens/afterLogin/othersProfile/tabs/NewsFeedList";
import User from '../screens/afterLogin/home/user/User';
import ExploreList from "../screens/afterLogin/home/explore/ExploreList";
import BestList from "../screens/afterLogin/home/best/BestList";





const HomeNav= createStackNavigator();

export default function HomeNavigator(props) {
  return (
    <HomeNav.Navigator
          // screenOptions={({ navigation,routes }) => {
          //       let { routeName } = routes.name;
          //       let navigationOptions = {};
              
          //       if (
          //         routeName === "OthersProfileNewsFeedList" ||
          //         routeName === "ExploreList"
          //       ) {
          //         navigationOptions.tabBarVisible = true;
          //       } else if (navigation.state.index > 0) {
          //         navigationOptions.tabBarVisible = false;
          //       }
          //       return navigationOptions;
          //     }}
    >
       <HomeNav.Screen name="Home" component={Home} options={{headerShown:false}} />
       <HomeNav.Screen name="OtherProfileNewsFeedList" component={OtherProfileNewsFeedList} options={{headerShown:false}}/>
       <HomeNav.Screen name="OthersProfile" component={OthersProfile} options={{headerShown:false}}/>
       <HomeNav.Screen name="User" component={User} options={{headerShown:false}}/>

       <HomeNav.Screen name="ExploreList" component={ExploreList} options={{headerShown:false}}/>
        <HomeNav.Screen name="BestList" component={BestList} options={{headerShown:false}}/>
    </HomeNav.Navigator>
 
  )
}
