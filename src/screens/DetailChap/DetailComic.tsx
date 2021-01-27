import React, { useRef } from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
const HEADER_MIN_HEIGHT = 50;
const Space = 35;
const HEADER_HEIGHT = 0;
const { height, width } = Dimensions.get("window");
const DetailComic = ({ dataMemo }) => {

    const navigation = useNavigation();
    const showCategory = React.useCallback(() => {
        return dataMemo.category.map((item, index) => {
            return (
                <Text key={index} style={styles.normal}>{item} - </Text>
            )
        })
    }, [])
    return (
        <View style={styles.Container}>
            <View style={styles.header}>
                <View style={styles.containerInfo}>
                    <View style={styles.imageLeft}>
                        <Image source={{ uri: dataMemo.image }} style={styles.img} />
                    </View>
                    <View style={styles.contairight}>
                        <Text numberOfLines={1} style={styles.nameAuthor}>Tác Giả : <Text style={styles.normal}> {dataMemo.author}</Text></Text>
                        <Text numberOfLines={1} style={styles.status}>Trạng Thái : <Text style={styles.normal}>Hoàn Thành</Text></Text>
                        <Text numberOfLines={2} style={styles.category}>Thể Loại : {showCategory()}</Text>
                    </View>
                </View>
            </View>

        </View>
    )
}
export default DetailComic;
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#e63946',
        height: (height / 4),
    },
    containerInfo: {
        flexDirection: "row",

    },
    tabs: {
        margin: 0,
        backgroundColor: 'pink'
    },
    header: {
        paddingHorizontal: 10,
        backgroundColor: '#e63946',
    },
    nameComic: {
        textAlign: "center",
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    imageLeft: {
        height: height / 4.5,
        width: width / 3,
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
        borderRadius: 5
    },
    nameAuthor: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14
    },
    status: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14
    },
    category: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    normal: {
        fontWeight: 'normal',

    },
    contairight: {
        width: width - (width / 3) - 30,
        marginLeft: 10,
        marginVertical: 20,
        justifyContent: 'space-between',
    },
    appButtonContainer: {
        elevation: 3,
        backgroundColor: "#fff",
        borderRadius: 150,
        paddingVertical: 10,
        width: '60%'
    },
    appButtonText: {
        fontSize: 12,
        color: "#e63946",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contai: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#e63946'
    },
    contai_: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 999,
        backgroundColor: '#fff',
        elevation: 999,
        alignSelf: "center",
        borderTopColor: '#f1faee',
        justifyContent: 'center',
        borderTopWidth: 1
    },
    tab_: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#eea71d',
        justifyContent: 'space-between'
    },
    description_comic: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    Chap_comic: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        fontSize: 16,
        color: '#fff'
    },

    appButtonContainer_: {
        elevation: 2,
        backgroundColor: "#e63946",
        borderRadius: 150,
        paddingVertical: 10,
        width: width / 1.5
    },
    appButtonText_: {
        fontSize: 12,
        color: "#fff",
        textAlign: 'center',
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
})