import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Easing, Image, Dimensions, ActivityIndicator, Animated, FlatList, StatusBar } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get("window");
import { getDetailChapter } from './../../api/comic'
import { makeUserName } from './../../common/stringHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation';
import * as SCREEN from './../../constants/ScreenTypes';
import { useRoute, RouteProp } from '@react-navigation/native';
import Modals from './Modals';
import Footer from './Footer';

export type RootStackParamList = {
    DETIAL_CHAPTER: { id: 'id' };
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>
export type RouterProps = {
    route: {
        key: string,
        title: string
    }
}
export default function ReadComic() {

    const router = useRoute<RootRouteProps<'DETIAL_CHAPTER'>>();
    const { id } = router.params;
    const [modalVisible, setModalVisible] = React.useState(false);
    const navigation = useNavigation<any>();
    const [name, setName] = useState<any>(null);
    const [imagesList, setImagesList] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [beforeChapter, setBeforeChapter] = useState(null);
    const [afterChapter, setAfterChapter] = useState(null);
    const scrollY = new Animated.Value(0);
    const scrollYFooter = new Animated.Value(0);
    const [currentOrientation, setCurrentOrientation] = useState('');
    let offset = new Animated.Value(0)
    const diffClamp = Animated.diffClamp(scrollY, 0, height / 9.5)
    const translateY = diffClamp.interpolate({
        inputRange: [0, height / 9.5],
        outputRange: [0, -(height / 9.5)]
    })
    const diffClampFooter = Animated.diffClamp(scrollYFooter, 0, height / 12)
    const translateYFooter = diffClampFooter.interpolate({
        inputRange: [0, height / 12],
        outputRange: [0, height / 12]
    })
    let FlatListRef = React.useRef<any>(null);
    let scrollX =100
    let _setModalVisible = (e: boolean) => {
        setModalVisible(e)
    }
    let CurrentSlide = 0;
    let IntervalTime = 2000;
    useEffect(() => {
        (() => {

            offset.addListener((e: { value: any; }) => {
        
                if( FlatListRef.current){
                    FlatListRef.current.scrollToOffset({ offset: e.value + 100 })
                }
     
            })
            _goToNextPage();
        })()
    })


    let _goToNextPage = () => {
        let toValue = scrollX + 10
        Animated.timing(
            offset, {
            toValue: toValue,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false
        }
        ).start(() => _startAutoPlay())
        // FlatListRef.current.scrollToOffset({
        //     offset: 100,
        //     animated: true
        // })


    };
    let _startAutoPlay = () => {

        let _timerId = setInterval(_goToNextPage, IntervalTime);

    }


    useEffect(() => {
        (async () => {
            try {
                let resultData = await getDetailChapter(id)
                if (resultData?.data?.status == "success") {
                    setName("Chapter : " + resultData.data.data.index);
                    setAfterChapter(resultData.data?.data?.after);
                    setBeforeChapter(resultData.data?.data?.before);
                    setImagesList(resultData.data?.data?.images);
                    setIsLoading(false)
                }

            } catch (error) {
                console.log(error)
            }
        })()
        return () => {
            setName(null)
            setAfterChapter(null)
            setBeforeChapter(null)
            setImagesList(null)
            setIsLoading(true)
            scrollY.setValue(0);
            scrollYFooter.setValue(0)
        }
    }, [])


    if (isLoading) {
        return (
            <View style={styles.containers}>
                <ActivityIndicator
                    animating={isLoading}
                    color='#bc2b78'
                    size="large"
                    style={styles.activityIndicator} />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <Animated.View style={[styles.Header, {
                    transform: [
                        { translateY: translateY }
                    ]
                }]}>
                    <TouchableOpacity
                        onPress={() => {
                            Orientation.lockToPortrait()
                            navigation.goBack()
                        }}

                    >
                        <Entypo name="chevron-thin-left" color="#fff" size={20} style={{ paddingLeft: 5 }} />
                    </TouchableOpacity>
                    <Text style={styles.name}>{name}</Text>
                    <View style={{ flexBasis: 20 }}></View>
                </Animated.View>
                {/* <ScrollView style={styles.content} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                onScroll={(e)=>{
                    scrollY.setValue(e.nativeEvent.contentOffset.y) 
                }}
                >
                    {ViewImagesALl()}
                </ScrollView> */}
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
                            FlatListRef.current = ref;
                        }}
                        onScroll={(e) => {
                            scrollX = e.nativeEvent.contentOffset.y

                            scrollY.setValue(e.nativeEvent.contentOffset.y);
                            scrollYFooter.setValue(e.nativeEvent.contentOffset.y)
                        }}
                    />
                </View>
                <Footer {...{ translateYFooter, beforeChapter, afterChapter, _setModalVisible }}></Footer>
                <Modals {...{ modalVisible, _setModalVisible }}></Modals>
            </View>
        );
    }
}
const ImageFullWith = React.memo(({ url }: any) => {
    const [heightImage, setHeightImage] = useState<any>(null);
    // useEffect(() => {
    //     (() => {
    //         Image.getSizeWithHeaders(url, {
    //             Referer: "https://manganelo.com/"
    //         }, (withdata, heightdata) => {
    //             console.log(withdata, heightdata)
    //             if (heightdata) {
    //                 setHeightImage(width * (heightdata / withdata))
    //             }

    //         }, (error) => { })
    //     })()
    //     return () => setHeightImage(null)
    // }, [])

    return <Image style={{ width: "100%", height: heightImage ? heightImage : (width * 3) / 2.5, flex: 1, marginBottom: 20 }}
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
    }
})
