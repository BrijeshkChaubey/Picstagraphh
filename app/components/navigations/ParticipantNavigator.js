import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Participant from '../screens/afterLogin/participant/Participant';
// import CampaignParticipant from "../screens/aferLogin/campaign/campaignParticipant/CampaignParticipant";
// import CampaignParticipantList from "../screens/aferLogin/campaign/comapnyCampaign/tabs/ParticipantsList";
import Albums from '../screens/afterLogin/uploadPhoto/albums/Albums';
import PostMediaView from '../screens/afterLogin/uploadPhoto/albums/PostMediaView';
import NewPost from '../screens/afterLogin/uploadPhoto/newPost/NewPost'
import OthersProfile from '../screens/afterLogin/othersProfile/OthersProfile';
import OthersProfileNewsFeedList from '../screens/afterLogin/othersProfile/tabs/NewsFeedList';
import Subscribe from '../screens/afterLogin/subscribe/Subscribe';
import NotificationsHome from '../screens/afterLogin/notifications/NotificationsHome';
import MessagesHome from '../screens/afterLogin/messages/messagesHome/MessagesHome';
import Comments from '../screens/afterLogin/comments/_Comments';
import LikeList from '../screens/afterLogin/likeList/_LikeList';
import LandingPage from '../screens/landingPage/LandingPage';
//import Top10List from "../screens/aferLogin/campaign/comapnyCampaign/tabs/Top10List";
//import ProfileNav from "./ProfileNavigator";
//import FullScreenVideo from "../screens/aferLogin/campaign/comapnyCampaign/tabs/FullScreenVideo";
const Stack = createStackNavigator();

export default function ParticipantNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Albums" component={Albums} options={{headerShown:false}}/>
      <Stack.Screen name="Participant" component={Participant} options={{headerShown:false}}/>
      <Stack.Screen name="LandingPage" component={LandingPage} options={{headerShown:false}}/>
      <Stack.Screen name="Comments" component={Comments} options={{headerShown:false}}/>
      <Stack.Screen name="LikeList" component={LikeList} options={{headerShown:false}}/>
      <Stack.Screen name="MessagesHome" component={MessagesHome} options={{headerShown:false}}/>
      <Stack.Screen name="NotificationsHome" component={NotificationsHome} options={{headerShown:false}}/>
      <Stack.Screen name="Subscribe" component={Subscribe} options={{headerShown:false}}/>
      <Stack.Screen name="OthersProfileNewsFeedList" component={OthersProfileNewsFeedList} options={{headerShown:false}}/>
      <Stack.Screen name="OthersProfile" component={OthersProfile} options={{headerShown:false}}/>
      <Stack.Screen name="NewPost" component={NewPost} options={{headerShown:false}}/>
      <Stack.Screen name="PostMediaView" component={PostMediaView} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}