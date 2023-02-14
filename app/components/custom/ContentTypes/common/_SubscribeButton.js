import { TouchableOpacity ,Text} from "react-native";
import {
	colors,
	images,
	helpers,
	globals,
	ApiCall,
	API
} from "../../../../configs";
import React, { Component } from "react";
import { _Lang } from "../..";
import { WINDOW_WIDTH } from "../../../../configs/libs/globals";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../../redux/actions/UserInfoAction";

export const _SubcribeButton = (props) => {
	const {loginData} = useSelector(state => state);
	const dispatch = useDispatch();
	
	const [subscribe, setSubscribe] = React.useState(props?.isSubscribe);
	console.log("loginData ==>", loginData, subscribe);
	const _call = () => {
		
		const {loader } = props;
		setSubscribe(!subscribe);
		let header = helpers.buildHeader({ authorization: loginData.token });
		let cb = Object.assign({}, helpers._standardCb(loader), {
			success: (res) => {
				
				console.log("Response User", res);
			 	dispatch(setUserInfo(res.data));
				let callback = Object.assign({}, helpers._standardCb(loader), {
					success: (res) => {
						console.log("Respnse User", res)
						props?.onSubscribe(res?.data?.count)
						// this._getUserInfo(true)
					},
					error: (err) => {
					
					},
				});
				API.getSubscriberCount({ category: subscribe ? "" : props.category }, callback, header)
				// this._getUserInfo(true)
			},
			error: (err) => {
				loader.error(
					"Error",
					!err.success && err.message
						? err.message
						: "Error in profile update",
				);
			},
		});
		let apiData = { category:subscribe?"":props.category}
		API.userInfoUpdate(apiData, cb, header);

	}
	
	return (
		<>
		{subscribe ? <TouchableOpacity
			// onPress={() => _call()}
			// disabled={true}
			style={{
			width: '85%', justifyContent: 'center', alignItems: 'center', shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
				shadowRadius: 3.84,
			backgroundColor:'white',
				elevation: 5, height: WINDOW_WIDTH / 10, borderRadius: 30
		}}>
			<_Lang
				style={{
					fontSize: WINDOW_WIDTH / 28, color: colors.black, fontFamily: 'Poppins-ExtraBold' }}
				text={`profile.subscribed`}
			/>
		</TouchableOpacity>
		:
			<TouchableOpacity
				onPress={()=>_call()}
				style={{
			width: '85%', justifyContent: 'center', alignItems: 'center', shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,

			elevation: 5, height: WINDOW_WIDTH/10, backgroundColor: colors.primaryColor, borderRadius: 30
		}}>
				<_Lang
					style={{
						fontSize: WINDOW_WIDTH / 28, color: colors.white, fontFamily: 'Poppins-ExtraBold'
					}}
					text={`profile.subscribe`}
				/>
			</TouchableOpacity>
				}
				</>
	);
}