import { TouchableOpacity } from "react-native"
import styles from "./styles";
import React from "react";

export const Card = (props) => {
	return (
		<TouchableOpacity
			style={[
				{
					marginVertical: 10,
					borderRadius: 5,
					justifyContent: 'center',
					alignItems: 'center',
					elevation: 1,
					backgroundColor: "white",
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3.84,
					elevation: 5,
					padding: 10,
					margin: 10

				},
				{...props?.style}
			]}>

		</TouchableOpacity>
	)
}