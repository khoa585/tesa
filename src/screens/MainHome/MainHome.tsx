import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import TabActionBar from './TabActionBar'
import Header from './Header';
import Background from './Background';
import isEqual from 'react-fast-compare';
import ComicHot from './ComicHot';
import { getListTypeCommic } from './../../api/comic';
import ComicNews from './ComicNews';

type listComicProps = {
    listComicHot: [],
    listComicHUpdate: []
}

const MainHome = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [listComic, setListComic] = React.useState<listComicProps | null>(null);
   
    React.useEffect(() => {
        (async () => {
            fetchData()
        })()
        return () => {
            setListComic({
                listComicHot: [],
                listComicHUpdate: []
            })
            setRefreshing(false)
            setLoading(false)
        }
    }, [])

    const fetchData = async () => {
        setLoading(true);
        const [resultListHot, resultListUpdate] = await Promise.all([getListTypeCommic(1, 10, 0), getListTypeCommic(1, 10, 1)])

        if (resultListHot.data.status === "success" && resultListHot.data.code === 200) {
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
                <ComicHot {...{ listComic: listComic ? listComic.listComicHot : [], loading }}>Truyện đọc nhiều nhất</ComicHot>
                <ComicNews {...{ listComic: listComic ? listComic.listComicHUpdate : [], loading }}>Truyện mới nhất</ComicNews>
            </ScrollView>
        </View>
    )
}
export default React.memo(MainHome, isEqual)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    distant: {
        height: 10,
        backgroundColor: '#ccc7c7',
        marginVertical: 10
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
})