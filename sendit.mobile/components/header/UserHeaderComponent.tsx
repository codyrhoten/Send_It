import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BottomModalComponent } from '../BottomModalComponent';
import { LoginScreen } from '@/screens';

export function UserHeaderComponent() {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

    return (
        <>
            <BottomModalComponent isVisible={isLoginModalVisible} onClose={() => setIsLoginModalVisible(false)}>
                <LoginScreen onCloseModal={() => setIsLoginModalVisible(false)}></LoginScreen>
            </BottomModalComponent>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => setIsLoginModalVisible(true)} style={styles.connectButton}>
                    <Text style={styles.connectButtonText}>Connect</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    connectButton: {
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: 'black',
    },
    connectButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
    },
});
