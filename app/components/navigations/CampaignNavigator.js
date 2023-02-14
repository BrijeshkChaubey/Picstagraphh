import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";
import CampaignHome from "../screens/afterLogin/campaign/campaignHome/CampaignHome";
import CategoryDetails from '../screens/afterLogin/campaign/categoryDetails';
import ExploreList from '../screens/afterLogin/home/explore/ExploreList';
import _Comments from '../screens/afterLogin/comments/_Comments';
import CompanyCampaign from '../screens/afterLogin/campaign/companyCampaign/CompanyCampaign';


const Stack = createStackNavigator();
export default function CampaignNav(props){
return(
    <Stack.Navigator>
        <Stack.Screen name={"CampaignHome"} component={CampaignHome} options={{headerShown:false}}/>
        {/* <Stack.Screen name='CompanyCampaign' component={CompanyCampaign} options={{headerShown:false}}/> */}
        <Stack.Screen name={"CategoryDetails"} component={CategoryDetails} options={{headerShown:false}}/>
        <Stack.Screen name={"ExploreList"} component={ExploreList} options={{headerShown:false}}/>
        <Stack.Screen name={"Comments"} component={_Comments} options={{headerShown:false}}/>
        <Stack.Screen name={"CompanyCampaign"} component={CompanyCampaign} options={{headerShown:false}}/>
    </Stack.Navigator>
)
}

// import { View, Text } from 'react-native'
// import React from 'react'

// export default function CampaignNavigator() {
//   return (
//     <View>
//       <Text>CampaignNavigator</Text>
//     </View>
//   )
// }