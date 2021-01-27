
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Animated,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const TabBarHeight = 160;
const HeaderHeight = windowHeight / 4;
import { getListChapter } from '../../api/comic';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler'
const TabScene = ({
    onGetRef,
    scrollY,
    onScrollEndDrag,
    onMomentumScrollEnd,
    onMomentumScrollBegin,
    id
}: any) => {
    const [loading, setLoading] = React.useState(true);
    const [dataChap, setDataChap] = React.useState();
    const dataChapMemo = React.useMemo(() => dataChap, [dataChap])
    const navigation = useNavigation();

    React.useEffect(() => {
        getListChapter(id).then(result => {
            if (result?.data?.status == "success") {
                setDataChap(result?.data?.data)
                setLoading(false);
            }
        }).then(error => console.log(error))
    }, [])
    const renderItem = ({ item, index }) => {

        return (
            <RectButton key={item._id} >
                <View style={styles.Chapter_}>
                    <Text style={styles.name} >Chapter {item.index}</Text>
                    <Text>{item.createdAt.split(/T.*/)[0]}</Text>
                </View>
            </RectButton>
        )
    }
    return (
        <Animated.FlatList
            scrollToOverflowEnabled={true}
            ref={onGetRef}
            scrollEventThrottle={1}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                useNativeDriver: true,
            })}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingTop: HeaderHeight + TabBarHeight,
                paddingHorizontal: 10,
                minHeight: windowHeight - TabBarHeight,
            }}
            data={dataChapMemo}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item._id.toString()}
        />
    );
};
export default React.memo(TabScene)

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#fff'
    },
    name: {
        fontSize: 16,
        color: '#5c6b73'
    },
    Chapter_: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#5c6b73'
    },
    loading: {

        alignItems: 'center',
        justifyContent: 'center'
    }
})


