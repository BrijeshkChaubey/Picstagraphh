import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	StatusBar,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import FastImage from 'react-native-fast-image';
import { images } from '../../../configs';
import { WINDOW_WIDTH } from '../../../configs/libs/globals';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 45 : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 70 : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const IMAGE_HEIGHT = WINDOW_WIDTH/1.7;



export const HeaderImage = (props) => {
	const renderNavBar = () => (
		<View style={styles.navContainer}>
			<View style={styles.statusBar} />
			<View style={styles.navBar}>
				<TouchableOpacity style={styles.iconLeft} onPress={() => { props.navigation.pop() }}>
					<FastImage
						source={images.leftWhite}
						resizeMode={"contain"}
						style={{ height: 25, width: 25,marginLeft:10 }}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.iconRight} onPress={() => { }}>
				</TouchableOpacity>
			</View>
		</View>
	);


	
	return (
		<>
			{/* <StatusBar barStyle="light-content" /> */}
			
			<FastImage source={{ uri: props.image }} resizeMode="cover" style={{ width: '100%', height: IMAGE_HEIGHT }} />
			<View style={{ width: '100%', height: IMAGE_HEIGHT,backgroundColor:'#00000040',position:'absolute'}}/>
			<View style={{ position: "absolute",zIndex:5 }}>
				{renderNavBar()}
			</View>
			
			<View style={{ position: "absolute", height: IMAGE_HEIGHT,alignItems:'center', width: '100%', justifyContent: 'center' }}>
				<Text style={{ color: 'white', marginTop: STATUS_BAR_HEIGHT, textAlign: 'center', fontSize: 25, fontWeight: 'bold', fontFamily: 'Poppins-ExtraBold' }}>{props.title}</Text>

			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		flexGrow: 1,
	},
	navContainer: {
		height: HEADER_HEIGHT,
		marginHorizontal: 10,
	},
	statusBar: {
		height: STATUS_BAR_HEIGHT,
		backgroundColor: 'transparent',
	},
	navBar: {
		height: NAV_BAR_HEIGHT,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: 'transparent',
	},
	titleStyle: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 18,
	},
});
