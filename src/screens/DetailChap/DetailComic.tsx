import React, { useRef } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_No } from '../../constants'
import { formatViews } from '../../common/stringHelper'
const DetailComic = ({ dataMemo }) => {

    const navigation = useNavigation();
    const [isDown, setDown] = React.useState<boolean>(false);
    const showCategory = React.useCallback(() => {
        return dataMemo.category.map((item, index) => {
            return (
                <Text key={index} style={styles.normal}>{item} - </Text>
            )
        })
    }, [])

    const gradColors = isDown ? ['#4da7db', '#5bc6ff'] : ['#5bc6ff', '#4da7db'];
    return (
        <View style={styles.containerComic}>

            <Header></Header>
            <View style={styles.container_}>
                <View style={styles.containerImage}>
                    <Image source={{ uri: dataMemo.image }}
                        style={styles.img} />
                </View>
            </View>
            <View style={styles.contai}>
                <Text style={styles.nameComic}>{dataMemo.name}</Text>
                <Text style={styles.nameAuthor}>{dataMemo.author.split(/\n/)}</Text>
                <View style={styles.action}>
                    <View style={styles.icon}>
                        <LinearGradient
                            colors={['#4da7db', '#5bc6ff']}
                            useAngle={true}
                            angle={145}
                            angleCenter={{ x: 0.5, y: 0.5 }}
                            style={[styles.icon]}
                        >
                            <EvilIcons name="heart" size={30} color="#FFF" />
                        </LinearGradient>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.read]}>

                            <LinearGradient
                                colors={gradColors}
                                useAngle={true}
                                angle={145}
                                angleCenter={{ x: 0.5, y: 0.5 }}
                                style={[styles.read]}
                            >

                                <Text style={styles.txtRead}>READ NOW</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.icon}>
                        <LinearGradient
                            colors={['#4da7db', '#5bc6ff']}
                            useAngle={true}
                            angle={145}
                            angleCenter={{ x: 0.5, y: 0.5 }}
                            style={[styles.icon]}
                        >
                            <EvilIcons name="comment" size={30} color="#FFF" />
                        </LinearGradient>
                    </View>
                </View>
                <View style={styles.wrap}>
                    <Text style={styles.status}>Status: <Text style={styles.normal}>{dataMemo.manga_status === 0 ? 'Continue' : 'Full'}</Text></Text>
                    <View style={styles.wrapViews}>
                        <EvilIcons name="eye" size={35} color="#5bc6ff" />
                        <Text style={styles.normal}>{formatViews(dataMemo.views)}</Text>
                    </View>
                </View>
                {/* <Text numberOfLines={2} style={styles.category}>Thể Loại : {showCategory()}</Text> */}
            </View>
        </View>
    )
}
export default DetailComic;
const styles = StyleSheet.create({
    containerComic: {
        flex: 1,
    },
    container_: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 15,
    },
    containerImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH / 2,
        height: SCREEN_WIDTH / 1.7,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 15,
        top: 0,
        position: 'absolute',
        zIndex: 99999,
    },

    img: {
        width: "100%",
        height: "100%",
        borderRadius: 15,

    },
    action: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 200,
        backgroundColor: '#F92C2C',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,

    },
    contai: {
        marginTop: 170,
        width: '100%',
        borderRadius: 40,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,

    },
    nameAuthor: {
        color: '#000',
        fontSize: 14,
        marginBottom: 10,
        marginTop: 5,
        textAlign: 'center',
    },
    status: {
        color: '#5bc6ff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    category: {
        color: '#000',
        fontSize: 14,
    },
    normal: {
        fontWeight: 'normal',
        color: '#000',
        fontSize: 14,
    },
    nameComic: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 80,
        marginHorizontal: 10
    },
    wrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderColor: '#F4F6FD',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,

    },
    wrapViews: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 2,
        width: '50%',
        paddingVertical: 10,
        borderColor: '#F4F6FD'
    },
    read: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    txtRead: {
        color: '#fff'
    }
})
