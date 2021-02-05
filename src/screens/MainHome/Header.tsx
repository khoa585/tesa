import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Text, Platform } from "react-native";

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import * as screen from '../../constants/ScreenTypes'
import { STATUS_BAR_HEIGHT } from '../../constants'
export const logo = require('../../assets/image/logo.png');
import { useNavigation } from '@react-navigation/native';
import isEqual from 'react-fast-compare';

const Header: FunctionComponent = () => {
    const navigation = useNavigation<any>();
    return (
        <>
            <View style={styles.container}>
                <View style={styles.wrapperIcon}>
                    <View style={[styles.bgimage,
                        Platform.OS === 'ios' && styles.shadowOs,
                        Platform.OS === 'android' && styles.shadowAndroid
                        ]}>
                        <Image source={logo} style={styles.logo}></Image>
                    </View>
                    <Text style={styles.title}>Manga Vip</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.icon}
                    onPress={() => navigation.navigate(screen.SEARCH_SCREEN)}
                >
                    <EvilIcons name="search" size={30} color="#000" />
                </TouchableOpacity>
            </View>
        </>
    );
}
export default React.memo(Header,isEqual)
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginTop: STATUS_BAR_HEIGHT
    },
    wrapperIcon: {
        alignContent: "center",
        flexDirection: 'row',
        alignItems: 'center',
    },
    bgimage: {
        backgroundColor:'#fff',
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: "center",
        flexDirection: 'row',
        alignItems: 'center',
    },
    shadowOs:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    shadowAndroid: {
        shadowOffset: { width: 12, height: 12 },
        shadowColor: '#fff',
        shadowOpacity: 1.0,
        shadowRadius: 18,
        elevation:2
    },

    logo: {
        height: '70%',
        width: '70%',
        resizeMode: 'contain'
    },
    title: {
        textTransform: "uppercase",
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color:'#fff'
    },
    icon:{
        justifyContent:'center',
        aspectRatio:1,
        padding:2,
        backgroundColor:'#fff',
        borderRadius:2
    }
})