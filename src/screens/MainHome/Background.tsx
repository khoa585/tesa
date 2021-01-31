import React, { FunctionComponent } from 'react'
import isEqual from 'react-fast-compare';
import { StyleSheet, View } from "react-native";
import { SCREEN_WIDTH } from '../../constants'
import LinearGradient from 'react-native-linear-gradient';
const Background: FunctionComponent = () => {
    return (
        <>
            <LinearGradient
                colors={['#4da7db', '#5bc6ff']}
                useAngle={true}
                angle={145}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={styles.background}
            >
                <View style={styles.background}></View>
            </LinearGradient>
        </>
    );
}
export default React.memo(Background, isEqual)
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: 1000,
        height: 1000,
        top: -(1000 - (SCREEN_WIDTH / 2) + (SCREEN_WIDTH / 9) / 3),
        alignSelf: 'center',
        borderRadius: 1000,
        overflow: 'hidden',
        // backgroundColor: '#e63946',
        zIndex: -1,
    },
})