import React from 'react';
import { Text, View, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import Item from './Item';
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from '../../../constants/ScreenTypes';
import { SCREEN_WIDTH } from '../../../constants'
const { width } = Dimensions.get('window');
const ComicHot = ({ listComic, loading, children }) => {
    const navigation = useNavigation();
    const renderItem = React.useCallback(({ item }) => <Item item={item} key={item._id}></Item>, [])
    const keyExtractor = React.useCallback((item) => item._id.toString(), [])

    const getItemLayout = React.useCallback((_, index: number) => ({
        length: SCREEN_WIDTH * 0.6,
        offset: (SCREEN_WIDTH * 0.6) * index,
        index
    }), [])
    
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
                        (
                            <FlatList
                                horizontal
                                onEndReachedThreshold={1}
                                showsHorizontalScrollIndicator={false}
                                data={listComic}
                                maxToRenderPerBatch={5}
                                windowSize={5}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                getItemLayout={getItemLayout}
                            >

                            </FlatList>
                        )
                }
            </View>
        </View>

    )
}
export default React.memo(ComicHot)
const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
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

        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,

    },
    seenAll: {
        fontSize: 13,
        marginRight: 20
    }
})