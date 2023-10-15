import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

export function LoginScreen({ onCloseModal }) {

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={undefined} style={styles.comethButton}>
                    <Text style={styles.comethButtonText}>Cometh</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 500
    },
    comethButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: 'black',
    },
    comethButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});
