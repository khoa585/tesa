// import React, { FunctionComponent } from 'react'
// import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { SCREEN_WIDTH } from '../../constants/index'
// import { items } from './Data'
// import { ItemType } from './model'
// import { useNavigation } from '@react-navigation/native';
// import * as screen from '../../constants/ScreenTypes'
// import isEqual from 'react-fast-compare';
// interface ItemProps {
//     item: ItemType;
// }

// const TabActionBar: FunctionComponent = () => {

//     const navigation = useNavigation();

//     const showItem = (): React.ReactNode => {
//         return items.map((item, index) => <Item item={item} key={index}></Item>)
//     }

//     const Item = ({ item: { icon, name } }: ItemProps): JSX.Element => {
//         return (
//             <TouchableOpacity
//                 onPress={() => navigation.navigate(screen.NOTERROR_SCREEN)}
//                 style={styles.contaiWrapper}>
//                 <Image source={icon} style={styles.imgIcon}></Image>
//                 <Text style={{
//                     paddingTop: 5,
//                     fontFamily: 'src_assets_fonts_barlowregular'
//                 }}>{name}</Text>
//             </TouchableOpacity>
//         )
//     }

//     return (
//         <>
//             <View style={styles.container}>
//                 <View style={styles.container_}>
//                     {
//                         showItem()
//                     }
//                 </View>
//             </View>
//         </>
//     );
// }
// export default React.memo(TabActionBar,isEqual)
// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     container_: {
//         backgroundColor: '#fff',
//         width: SCREEN_WIDTH - 40,
//         height: SCREEN_WIDTH / 5,
//         borderRadius: 10,
//         shadowOffset: { width: 12, height: 12 },
//         shadowColor: '#489dcf',
//         shadowOpacity: 1.0,
//         shadowRadius: 18,
//         elevation: 2,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 20,

//     },
//     logo: {
//         height: '100%',
//         width: '100%',
//         resizeMode: 'contain'
//     },
//     contaiWrapper: {
//         alignItems: 'center'
//     },
//     imgIcon: {
//         height: 30,
//         width: 25,
//         resizeMode: 'contain'
//     }
// })
import React from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native'
import Swiper from 'react-native-swiper'
import { SCREEN_WIDTH } from '../../constants/index'
const { height } = Dimensions.get('window');
export default function Slide() {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Swiper
                    showsButtons={false}
                    activeDotColor={'#fff'}
                    autoplay={true}
                    autoplayTimeout={5}
                    paginationStyle={{ bottom: 5 }}
                >
                    <View style={styles.slide1}>
                        <Image style={styles.img} source={{ uri: 'http://cn.e.pic.mangatoon.mobi/homepage-banners/642-034f.jpg' }}></Image>
                    </View>
                    <View style={styles.slide2}>
                        <Image style={styles.img} source={{ uri: 'http://cn.e.pic.mangatoon.mobi/homepage-banners/641-58a3.jpg' }}></Image>
                    </View>
                    <View style={styles.slide3}>
                        <Image style={styles.img} source={{ uri: 'http://cn.e.pic.mangatoon.mobi/homepage-banners/577-7b9a.jpg' }}></Image>
                    </View>
                </Swiper>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10
    },
    wrapper: {
        height: SCREEN_WIDTH / 4,
        width: SCREEN_WIDTH - 40,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: SCREEN_WIDTH - 40,
        height: "100%",
        resizeMode: 'cover',
        borderRadius: 10
    }
})
