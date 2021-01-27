import React, { FunctionComponent } from 'react'
import isEqual from 'react-fast-compare';
import { StyleSheet, View } from "react-native";
import { SCREEN_WIDTH } from '../../constants'
const Background: FunctionComponent = () => {
    return (
        <>
            <View style={styles.background}></View>
        </>
    );
}
export default React.memo(Background, isEqual)
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: 1000,
        height: 1000,
        top: -(1000 - (SCREEN_WIDTH / 2) + (SCREEN_WIDTH / 8) / 2),
        alignSelf: 'center',
        borderRadius: 1000,
        overflow: 'hidden',
        backgroundColor: '#e63946',
        zIndex:-1
    },
})