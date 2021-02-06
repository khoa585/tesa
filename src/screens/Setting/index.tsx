import React from 'react';
import { StatusBar, Text, View } from 'react-native';
export default function Setting(){
    return(
        <View>
            <StatusBar barStyle="light-content" translucent={false}/>
            <Text>Phong</Text>
        </View>
    )
}