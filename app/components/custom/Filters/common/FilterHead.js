import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../../configs';

export const FilterHead = props => {
    let title = props.title;

    if(!title) return <View />;
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionHeaderText: {
        fontWeight: '700',
        color: colors.darkGray,
        ...sty.padV10,
        ...sty.padH10,
        backgroundColor: colors.lighter,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightDarker
    }
})