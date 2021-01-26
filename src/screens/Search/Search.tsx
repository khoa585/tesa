import React from 'react'
import isEqual from 'react-fast-compare';
import { StyleSheet, Text, View } from "react-native";
import Header from './Header';

const Search = () => {
    return (
        <View style={styles.container}>
            <Header></Header>
            <Text style={styles.title}>Đang phát triển chức năng</Text>
        </View>
    );
}
export default React.memo(Search, isEqual)
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    title: {
        fontSize: 18,
        margin: 20,
        textAlign:'center'
    },
})