import React, { useRef } from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from "@react-native-community/blur";
import Header from './Header';
import isEqual from 'react-fast-compare';
import { SCREEN_HEIGHT } from '../../constants'
const { height, width } = Dimensions.get("window");
const Background = ({ dataMemo }) => {

    return (
        <View style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }}>
            <View style={styles.container}>
                <Image
                    key={'blurryImage'}
                    source={{ uri: dataMemo.image }}
                    style={styles.absolute}
                    resizeMode='cover'
                />
                <BlurView
                    style={styles.absolute}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                />
            </View>
            <View style={styles.contai}>

            </View>
        </View >
    )
}
export default React.memo(Background, isEqual);
const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT / 3,
        width: '100%',
        zIndex: -1,
        position: "absolute",

    },
    absolute: {
        position: "absolute",
        height: SCREEN_HEIGHT / 3,
        width: '100%',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    contai: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        top: (SCREEN_HEIGHT / 3) - 40,
        zIndex: -1,
    },
})
