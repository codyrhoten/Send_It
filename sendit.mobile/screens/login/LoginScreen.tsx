import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
//import { useWalletAuth } from '@/hooks';

export function LoginScreen({ onCloseModal }) {
    //const { isConnecting, isConnected, connect, connectionError, wallet } = useWalletAuth();

    return (
        <View style={styles.container}>
            {/* <Text>isConnecting {isConnecting}</Text>
            <Text>wallet: {wallet?.getAddress()}</Text> */}
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
