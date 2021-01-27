import React from 'react';
import { Text, View, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import Item from '../Item';
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from '../../../constants/ScreenTypes';
const { width } = Dimensions.get('window');
const ComicHot = ({ listComic, loading ,children}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.headerTitle}>
                <Text style={styles.title}>{children}</Text>
                <TouchableOpacity
                    >
                    <Text style={styles.seenAll}>xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerItem}>
                {
                    loading ?
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="#000" />
                        </View> :
                        listComic.map((item: any) =>
                            <Item item={item} key={item._id}></Item>
                        )
                }
            </View>
        </View>

    )
}
export default React.memo(ComicHot)
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 10,
        flex: 1
    },
    containerItem: {
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    loading: {
        flex: 1,
        height: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {

        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
       
    },
    seenAll: {
        fontSize: 13,
 
    }
})