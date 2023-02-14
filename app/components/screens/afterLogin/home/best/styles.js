import { StyleSheet ,Platform} from "react-native";
import { globals, helpers, images, ApiCall } from "../../../../../configs";
export const styles = StyleSheet.create({
	explorListItem: {
		// paddingVertical: 2,
		padding:2,
		// paddingHorizontal:1,
		borderRadius: 5,
		backgroundColor: "white",
		width:Platform.OS==='android'? globals.WINDOW_WIDTH/2-1:'50%',
	},
	explorImageItem: {

		width:'100%',
		padding: 2,
		borderRadius: 5,
		height: globals.WINDOW_WIDTH / 2 - 1,
		backgroundColor: "white",
	},
	explorIndicator: { zIndex: 1, position: "absolute", top: 10, right: 10 },
	indicator: { height: 20, width: 20 },
});
