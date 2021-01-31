import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const windowHeight = Dimensions.get('window').height;
const TabBarHeight = 120;
const HeaderHeight = windowHeight / 4;
function DescriptComic({ data }) {
    const [txtdescript, setDes] = React.useState<boolean>(false)
    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 20, color: '#5c6b73', fontWeight: 'bold' }}>Description</Text>
            <Text numberOfLines={txtdescript ? 1000 : 3} style={styles.name}>{data.description === '' ? 'Đọc sẽ rõ...' : data.description}</Text>
            {
                !txtdescript ? (<TouchableOpacity
                    onPress={() => setDes(!txtdescript)}
                    style={styles.txt}>
                    <Text style={{ color: '#3a9ebb' }}>Read full description</Text>
                </TouchableOpacity>) : (<TouchableOpacity
                    onPress={() => setDes(!txtdescript)}
                    style={styles.txt}>
                    <Text style={{ color: '#3a9ebb' }}>Collapse</Text>
                </TouchableOpacity>)
            }


        </View>
    )
}


export default React.memo(DescriptComic)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    name: {
        fontSize: 16,
        color: '#5c6b73'
    },
    txt: {
        paddingVertical: 10,

    }
})