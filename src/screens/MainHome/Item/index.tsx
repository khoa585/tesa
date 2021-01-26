import React from 'react';
import { Text, View, StatusBar, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { formatViews } from '../../../common/stringHelper';
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from './../../../constants/ScreenTypes';
import isEqual from 'react-fast-compare';
import { RectButton } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');
const Item = ({ item }) => {
    const navigation = useNavigation();
    const goToDetialComic = (id) => {
        // navigation.navigate(SCREEN.DETIAL_COMIC_SCREEN,{id:id})
    }
    return (
        <RectButton style={styles.container} onPress={() => goToDetialComic(item._id)} >
            <View style={styles.imageLeft}>
                <Image source={{ uri: item.image }} style={styles.imageRecommend}></Image>
            </View>
            <View style={styles.contaiItem}>
                <Text numberOfLines={2} style={styles.nameComic}>{item.name}</Text>
                <View style={styles.inforComic}>
                    <Feather name="eye" size={10} style={{ marginRight: 5 }}></Feather>
                    <Text style={styles.nameChap}> {formatViews(item.views)}</Text>
                </View>
            </View>
        </RectButton>
    )
}
export default React.memo(Item, isEqual)
const styles = StyleSheet.create({
    container: {
        width: ((width / 3)) - 20,
        height: (width * 0.5),
        marginBottom: 10,
    },
    imageRecommend: {
        resizeMode: 'cover',
        width: "100%",
        height: "100%",
        borderRadius: 5,

    },
    contaiItem: {
        justifyContent: 'space-between',
        height: '30%',
        paddingVertical:5
    },
    imageLeft: {
        justifyContent: 'center',
        height: '70%',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
  
    },
    nameComic: {
        paddingVertical: 0,
        textAlign: "center",
        fontSize: 12
    },
    nameChap: {
        textAlign: "center",
        fontSize: 10
    },
    inforComic: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,

    }
})