import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;
const TabBarHeight = 160;
const HeaderHeight = windowHeight / 4;
function DescriptComic({ data }) {

    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 20, color: '#5c6b73', fontWeight: 'bold' }}>Tóm tắt</Text>
            <Text style={styles.name}>{data === '' ? 'Đọc sẽ rõ...' : data}</Text>
        </View>
    )
}


export default React.memo(DescriptComic)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: TabBarHeight + HeaderHeight,
        backgroundColor: '#fff',

    },
    name: {
        fontSize: 16,
        color: '#5c6b73'
    }
})