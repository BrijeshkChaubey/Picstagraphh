import { StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../../configs';

export const styles = StyleSheet.create({
	sectionHeader: {
		backgroundColor: 'white',
		padding: 20,
		paddingTop: 15,
		paddingBottom: 0,
		marginBottom: 10
	},
	sectionHeaderText: {
		color: colors.darkGray,
		fontWeight: '600'
	},
	listItem: {
		...sty.fRow,
		...sty.jSpace,
		...sty.appBorder,
		marginBottom: 10,
		backgroundColor: '#fff',
	},
})