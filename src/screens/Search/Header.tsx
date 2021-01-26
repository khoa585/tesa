import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from "react-native";

import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
export default () => {
    const navigation = useNavigation();
    return (
        <View
            style={styles.container}>
            <TouchableOpacity
                style={styles.icon}
                onPress={() => navigation.goBack()}>
                <Entypo name="chevron-thin-left" size={20} color="#fff"></Entypo>
            </TouchableOpacity>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#55b9f3',
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    icon: {

    },
    title: {
        textAlign: 'center',
        color: '#fff',
        marginHorizontal:30,
        fontSize:15
    }
})