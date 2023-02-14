import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import LandingPage from '../screens/landingPage/LandingPage';
import Login from '../screens/login/Login';
import JoinNow from '../screens/joinNow/JoinNow';
import Register from '../screens/register/Register';
import PostRegistration from '../screens/PostRegistration';
import UpdateName from '../screens/updateName/UpdateName';
import UpdateUserInfo from '../screens/UpdateUserInfo';
import TabNav from './TabNavigation';
import ResetPassHome from '../screens/resetPassword/ResetPassHome';
import ResetPassFinal from '../screens/resetPassword/ResetPassFinal';
import ResetPassEmail from '../screens/resetPassword/ResetPassEmail';
// import UpdateImage from '../screens/updateImage/UpdateImage';

// import TabNav from "../navigations/TabNavigation";

const Stack = createStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="LandingPage" component={LandingPage} options={{headerShown:false}}/>
      <Stack.Screen name="JoinNow" component={JoinNow} options={{headerShown:false}}/>
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
      <Stack.Screen name="PostRegistration" component={PostRegistration} options={{headerShown:false}}/>
      <Stack.Screen name="UpdateName" component={UpdateName} options={{headerShown:false}}/>
      {/* <Stack.Screen name="UpdateImage" component={UpdateImage} options={{headerShown:false}}/> */}
      <Stack.Screen name="UpdateUserInfo" component={UpdateUserInfo} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="ResetPassHome" component={ResetPassHome} options={{headerShown:false}}/>
      <Stack.Screen name="ResetPassEmail" component={ResetPassEmail} options={{headerShown:false}}/>
      <Stack.Screen name="ResetPassFinal" component={ResetPassFinal} options={{headerShown:false}}/>
      <Stack.Screen name="TabNav" component={TabNav} options={{headerShown:false}}/>

    </Stack.Navigator>
  )
}