import React from "react";
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Switch,
} from "react-native";
const { width, height } = Dimensions.get('window')
import { SCREEN_HEIGHT, } from './../../constants'
import Orientation from 'react-native-orientation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { color } from "react-native-reanimated";


const Modals = ({ modalVisible, _setModalVisible, isEnabled, _toggleSwitch }) => {
    const [isTurn, setTurn] = React.useState<number>(0)

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => _setModalVisible(false)}
        >
            <TouchableOpacity
                style={styles.centeredView}
                activeOpacity={1}
                onPress={() => _setModalVisible(false)}
            >
            </TouchableOpacity>
            <View style={{
                position: 'absolute',
                width: '100%',
                height: SCREEN_HEIGHT / 5,
                right: '0%',
                bottom: '0%',
                backgroundColor: '#fff',
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20
            }}>
                <View style={styles.modalView}>
                    <View style={styles.iconTurn}>
                        <Text style={styles.txt}>Turn</Text>
                        <View style={[styles.Touchable]}>
                            <TouchableOpacity
                                onPress={() => {
                                    Orientation.lockToPortrait()
                                    setTurn(0)
                                }}
                            >
                                <Ionicons style={[styles.icon]} color={isTurn === 0 ? '#e63946' : '#000'} name="phone-portrait-outline" size={30}></Ionicons>
                            </TouchableOpacity>
                            <Text style={[{ color: isTurn === 0 ? '#e63946' : '#000' }]}>Vertical</Text>
                        </View>
                        <View style={styles.Touchable}>
                            <TouchableOpacity
                                onPress={() => {
                                    Orientation.lockToLandscapeLeft()
                                    setTurn(1)
                                }}
                            >
                                <Ionicons style={styles.icon} color={isTurn === 1 ? '#e63946' : '#000'}  name="phone-landscape-outline" size={30}></Ionicons>
                            </TouchableOpacity>
                            <Text style={[{ color: isTurn === 1 ? '#e63946' : '#000' }]}>Horizontal</Text>
                        </View>
                    </View>
                    <View style={styles.iconAuto}>
                        <Text style={styles.txt}>Auto Scroll</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#e63946" }}
                            thumbColor={isEnabled ? "#e63946" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={_toggleSwitch}
                            value={isEnabled}
                        />

                    </View>
                </View>
            </View>
        </Modal >

    );
};
export default React.memo(Modals);
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#000000AA'
    },
    modalView: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    iconTurn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconAuto: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    txt: {
        fontSize: 18,
        paddingRight: 15
    },
    icon: {
        paddingHorizontal: 25
    },
    Touchable: {

        alignItems: 'center',
    }
});