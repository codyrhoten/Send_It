import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { ConnectWallet, darkTheme, lightTheme, useConnectionStatus, WalletButton } from '@thirdweb-dev/react-native';

const darkThemeCustom = lightTheme();

export function UserHeaderComponent() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View>
                <ConnectWallet
                    buttonTitle='Connect'
                    theme={{
                        ...darkThemeCustom,

                    }}
                    detailsButton={() => {
                        return <Button title="My Button" />;
                    }}

                />
            </View>

            {/*<TouchableOpacity onPress={() => setIsLoginModalVisible(true)} style={styles.connectButton}>
                    <Text style={styles.connectButtonText}>Connect</Text>
                </TouchableOpacity>*/}
        </View>
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
