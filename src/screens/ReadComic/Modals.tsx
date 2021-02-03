import React from "react";
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Switch,
    TouchableWithoutFeedback
} from "react-native";
const { width, height } = Dimensions.get('window')
import Orientation from 'react-native-orientation';
import Ionicons from 'react-native-vector-icons/Ionicons'


const Modals = ({ modalVisible, _setModalVisible }) => {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        _setModalVisible(false)
    }
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
                height: '20%',
                right: '0%',
                bottom: '0%',
                backgroundColor: "white",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5
            }}>
                <View style={styles.modalView}>
                    <View style={styles.iconTurn}>
                        <Text style={styles.txt}>Turn</Text>
                        <View style={styles.Touchable}>
                            <TouchableWithoutFeedback
                                onPress={() =>    Orientation.lockToPortrait()}
                            >
                                <Ionicons style={styles.icon} name="phone-portrait-outline" size={30}></Ionicons>
                            </TouchableWithoutFeedback>
                            <Text >Vertical</Text>
                        </View>
                        <View style={styles.Touchable}>
                            <TouchableWithoutFeedback
                                 onPress={() => Orientation.lockToLandscapeLeft()}
                            >
                                <Ionicons style={styles.icon} name="phone-landscape-outline" size={30}></Ionicons>

                            </TouchableWithoutFeedback>
                            <Text >Horizontal</Text>
                        </View>
                    </View>
                    <View style={styles.iconAuto}>
                        <Text style={styles.txt}>Auto Scroll</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />

                    </View>
                </View>
            </View>
        </Modal>

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