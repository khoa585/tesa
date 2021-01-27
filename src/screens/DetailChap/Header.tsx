import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get("window");
const Header = () => {

    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
                {/* <MaterialCommunityIcons name="dots-vertical" size={25} color="#fff" /> */}
            </TouchableOpacity>

        </View>
    )
}
export default Header;
const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 10,
        backgroundColor: '#e63946',

        height: (height / 3) - (height / 4),
    }
})