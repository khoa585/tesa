import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Easing, Image, Dimensions, ActivityIndicator, Animated, FlatList, StatusBar } from 'react-native';

const { height, width } = Dimensions.get("window");
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function ListImage({ _setIsEnabled, imagesList, scrollY, scrollYFooter, isEnabled, isOffset, _setisOffset }: any) {

    const [offset_, setisOffset_] = useState(0);
    let offset = new Animated.Value(offset_)

    let carousel = React.useRef<any>(null);
    let scrollX = offset_

    let scrollTo = React.useCallback((e) => {
        if (carousel.current && isOffset) {
            carousel.current.scrollToOffset({ offset: e.value });
        }
    }, [])

    let _scroller = () => {
        let animation = Animated.timing(
            offset,
            {
                toValue: scrollX + 100,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        );
        animation.start(() => _scroller());
    }

    useEffect(() => {
        if (isEnabled && isOffset) {
            _scroller();
            var _scrollTo = offset.addListener(scrollTo);
        }
        return () => offset.removeListener(_scrollTo)
    }, [isEnabled, isOffset])

    const onhandlerPause = () => {
        _setisOffset(false)
    }
    const onhandlernext = () => {
        _setisOffset(true)
        _setIsEnabled(true)
    }

    return (
        <View style={styles.content}>
            <FlatList
                style={{ paddingTop: height / 12 }}
                showsHorizontalScrollIndicator={false}
                initialNumToRender={10}
                showsVerticalScrollIndicator={false}
                data={imagesList ? imagesList : []}

                maxToRenderPerBatch={5}
                windowSize={5}
                keyExtractor={(item: any, index) => item + index}
                renderItem={({ item }) => <ImageFullWith url={item} />}
                ref={ref => {
                    carousel.current = ref;
                }}
                scrollEventThrottle={16}
                onMomentumScrollEnd={(e) => {
                    if (!isOffset) {
                        setisOffset_(e.nativeEvent.contentOffset.y)
                    }
                }}
                onScroll={(e) => {
                    if (isEnabled) {
                        scrollX = e.nativeEvent.contentOffset.y;
                    }
                    if (!isOffset) {
                        setisOffset_(e.nativeEvent.contentOffset.y)
                    }
                    scrollY.setValue(e.nativeEvent.contentOffset.y);
                    scrollYFooter.setValue(e.nativeEvent.contentOffset.y)

                }}
            />
            {
                isEnabled ? isOffset ? (
                    <TouchableOpacity style={styles.pause}
                        onPress={onhandlerPause}
                        activeOpacity={0.9}
                    >
                        <Ionicons name="pause-outline" size={20} color="#fff"></Ionicons>
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity style={styles.pause}
                            onPress={onhandlernext}
                            activeOpacity={0.9}
                        >
                            <Ionicons name="play-sharp" size={20} color="#fff"></Ionicons>
                        </TouchableOpacity>
                    ) : null


            }

        </View>
    );

}
const ImageFullWith = React.memo(({ url }: any) => {
    const [heightImage, setHeightImage] = useState<any>(null);
    useEffect(() => {
        (() => {
            Image.getSizeWithHeaders(url, {
                Referer: "https://manganelo.com/"
            }, (withdata, heightdata) => {

                if (heightdata) {
                    setHeightImage(width * (heightdata / withdata))
                }

            }, (error) => { })
        })()
        return () => setHeightImage(null)
    }, [])

    return <Image style={{ width: "100%", height: heightImage ? heightImage : (width * 3) / 2.5, flex: 1 }}
        source={{
            uri: url,
            headers: {
                Referer: "https://manganelo.com/"
            }
        }} resizeMode="stretch" onError={({ nativeEvent: { error } }) => { console.log(error) }}
    />
})

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    containers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    Header: {
        position: "absolute",
        top: 0,
        left: 0,
        elevation: 1,
        width: '100%',
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "center",
        height: height / 9.5,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#404042',
        backgroundColor: '#404042',
        paddingTop: 30,
        zIndex: 10,

    },
    name: {
        textTransform: 'uppercase',
        fontSize: 15,
        flex: 1,
        textAlign: "center",
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1
    },
    Img: {
        width: "100%",
        alignSelf: "center",
        flexDirection: "row",
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 0.9,
        elevation: 5,
    },
    endchap: {
        textAlign: 'center'
    },
    Footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        height: height / 13,
        paddingHorizontal: 10,
        elevation: 6,
        width: width,
        backgroundColor: '#404042',
        justifyContent: "center",
        opacity: 0.8,
        zIndex: 10
    },
    textChapter: {
        fontSize: 14,
        color: "#b8b4b4"
    },
    pause: {
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        zIndex: 999,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#161a1d',
        borderRadius: 10
    }
})
