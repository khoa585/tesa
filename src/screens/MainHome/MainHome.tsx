import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import TabActionBar from './TabActionBar'
import Header from './Header';
import Background from './Background';
import isEqual from 'react-fast-compare';
import ComicHot from './ComicHot';
import { getListHotCommic, getListCommicNew } from './../../api/comic';
const MainHome = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [listComic, setListComic] = React.useState({
        listComicHot: [],
        listComicHUpdate: []
    });

    React.useEffect(() => {
        (async () => {
            fetchData()
        })()
        return () => {
            setListComic({
                listComicHot: [],
                listComicHUpdate: []
            })
        }
    }, [])
    const fetchData = async () => {
        setLoading(true);
        const [resultListHot, resultListUpdate] = await Promise.all([getListHotCommic(1, 12), getListCommicNew(1, 12)])
        if (resultListHot.status == 201 || resultListHot.data?.code == 200) {
            setListComic({
                listComicHot: resultListHot.data?.data,
                listComicHUpdate: resultListUpdate.data?.data
            })
            setLoading(false);
        }
    }
    const onRefresh = () => {
        setRefreshing(true);
        setListComic({
            listComicHot: [],
            listComicHUpdate: []
        })
        fetchData()
        setRefreshing(false)
    }
    return (
        <View style={styles.container}>
            <ScrollView
                scrollEventThrottle={1}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Header></Header>
                <Background></Background>
                <TabActionBar></TabActionBar>
                <ComicHot {...{ listComic: listComic.listComicHot, loading }}>Truyện đọc nhiều nhất</ComicHot>
                <ComicHot {...{ listComic: listComic.listComicHUpdate, loading }}>Truyện mới nhất</ComicHot>
                <ComicHot {...{ listComic: listComic.listComicHUpdate, loading }}>Truyện đề xuất</ComicHot>
            </ScrollView>
        </View>
    )
}
export default React.memo(MainHome, isEqual)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    distant: {
        height: 10,
        backgroundColor: '#ccc7c7',
        marginVertical: 10
    }
})