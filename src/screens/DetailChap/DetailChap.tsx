import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getDetialComic } from './../../api/comic';
import * as screen from './../../constants/ScreenTypes';
import { TabView, TabBar } from 'react-native-tab-view';
import Header from './Header';
import DetailComic from './DetailComic'

import { SCREEN_HEIGHT, SCREEN_WIDTH_No } from '../../constants'
import DescriptComic from './DescriptComic'
import TabScene from './TabScene'
import { RouteProp } from '@react-navigation/native';

export const HeaderHeight = SCREEN_HEIGHT / 3

export type RootStackParamList = {
    DETIAL_COMIC_SCREEN: { id: 'id' };
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
const DetailChap: FunctionComponent = () => {
    const [offset, setOffset] = React.useState(0)
    let scrollY = React.useRef<any>(new Animated.Value(offset)).current;
    const [tabIndex, setIndex] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(true);
    let listRefArr = React.useRef<any>([]);
    let listOffset = React.useRef<any>({});
    let isListGliding = React.useRef<any>(false);
    const [data, setData] = React.useState<any>([]);
    const [tab1Data] = React.useState(Array(40).fill(0));
    const [tab2Data] = React.useState(Array(30).fill(0));
    const dataMemo = React.useMemo(() => data, [data])
    const [routes] = React.useState([
        { key: 'tab1', title: 'Chi tiết' },
        { key: 'tab2', title: 'Chappter' },
    ]);
    const router = useRoute<RootRouteProps<'DETIAL_COMIC_SCREEN'>>();
    const { id } = router.params;

    React.useEffect(() => {
        setLoading(true);
        getDetialComic(id).then(result => {
            if (result?.data?.status == "success") {
                setData(result?.data?.data);
                setLoading(false);
            }
        })
        return () => setData([])
    }, [])

    React.useEffect(() => {
        (() => {
            scrollY.addListener(({ value }) => {
                const curRoute = routes[tabIndex].key;
                listOffset.current[curRoute] = value;
            });
            Animated.timing(scrollY, {
                toValue: 0,
                duration: 0,
                useNativeDriver:true
            }).start();
        })()
        return () => {
            scrollY.removeAllListeners();
        };
    }, [routes, tabIndex]);

    const syncScrollOffset = () => {
        const curRouteKey = routes[tabIndex].key;
        listRefArr.current.forEach((item: { key: string; value: { scrollToOffset: (arg0: { offset: any; animated: boolean; }) => void; }; }) => {
            if (item.key !== curRouteKey) {

                if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
                    if (item.value) {
                        item.value.scrollToOffset({
                            offset: scrollY._value,
                            animated: false,
                        });
                        listOffset.current[item.key] = scrollY._value;
                    }
                } else if (scrollY._value >= HeaderHeight) {
                    if (
                        listOffset.current[item.key] < HeaderHeight ||
                        listOffset.current[item.key] == null
                    ) {
                        if (item.value) {
                            item.value.scrollToOffset({
                                offset: HeaderHeight,
                                animated: false,
                            });
                            listOffset.current[item.key] = HeaderHeight;
                        }
                    }
                }
            }
        });
    };

    const onMomentumScrollBegin = () => {
        isListGliding.current = true;
    };

    const onMomentumScrollEnd = () => {
        isListGliding.current = false;
        syncScrollOffset();
    };

    const onScrollEndDrag = () => {
        syncScrollOffset();
    };

    const renderHeader = () => {
        const y = scrollY.interpolate({
            inputRange: [0, HeaderHeight],
            outputRange: [0, -HeaderHeight],
            extrapolateRight: 'clamp',
        });
        return (
            <Animated.View style={[styles.header, { transform: [{ translateY: y }] }]}>
                <Header></Header>
                <DetailComic {...{ dataMemo }}></DetailComic>
            </Animated.View>
        );
    }

    const renderScene = ({ route }: RouterProps) => {
        switch (route.key) {
            case 'tab1':

                break;
            case 'tab2':
                // scrollY = 0
                break;
            default:
                return null;
        }
        return (
            <>
                {
                    route.key === 'tab1' ? <>
                        <DescriptComic {...{ data: dataMemo.description }}></DescriptComic>
                    </> : (
                            <TabScene
                                id={id}
                                scrollY={scrollY}
                                onMomentumScrollBegin={onMomentumScrollBegin}
                                onScrollEndDrag={onScrollEndDrag}
                                onMomentumScrollEnd={onMomentumScrollEnd}
                                onGetRef={(ref: any) => {
                                    if (ref) {
                                        const found = listRefArr.current.find((e: { key: string; }) => e.key === route.key);
                                        if (!found) {
                                            listRefArr.current.push({
                                                key: route.key,
                                                value: ref,
                                            });
                                        }
                                    }
                                }}
                            />
                        )
                }
            </>
        );
    };

    const renderTabBar = (props: any) => {
        const y = scrollY.interpolate({
            inputRange: [0, HeaderHeight],
            outputRange: [HeaderHeight, 0],
            extrapolateRight: 'clamp',
        });
        return (
            <Animated.View
                style={{
                    top: 0,
                    zIndex: 1,
                    position: 'absolute',
                    transform: [{ translateY: y }],
                    width: '100%',
                }}>
                <TabBar
                    {...props}
                    style={styles.tab}
                    renderLabel={renderLabel}
                    indicatorStyle={styles.indicator}
                />
            </Animated.View>
        );
    };

    const renderLabel = ({ route, focused }: any) => {
        return (
            <Text style={[styles.label, { opacity: focused ? 1 : 0.5 }]}>
                {route.title}
            </Text>
        );
    };

    const renderTabView = () => {
        return (
            <TabView
                onIndexChange={(index) => setIndex(index)}
                navigationState={{ index: tabIndex, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                initialLayout={{
                    height: 0,
                    width: SCREEN_WIDTH_No,
                }}
            />
        );
    };

    return (
        <>
            {
                loading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#bf0603" />
                    </View>
                ) : (
                        <View style={styles.container}>
                            {renderTabView()}
                            {renderHeader()}
                        </View>
                    )

            }
        </>
    )
}

export default React.memo(DetailChap);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        top: 0,
        height: HeaderHeight,
        width: '100%',
        backgroundColor: '#e63946',
        position: 'absolute',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: { fontSize: 16, color: '#fff' },
    tab: { elevation: 0, shadowOpacity: 0, backgroundColor: '#e63946' },
    indicator: { backgroundColor: '#fff' },
})


