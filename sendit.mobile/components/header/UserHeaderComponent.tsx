import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { ConnectWallet, useWallet, useDisconnect, useConnectionStatus } from '@thirdweb-dev/react-native';

export function UserHeaderComponent() {
    const [walletAddress, setWalletAddress] = useState<string>();

    const navigation = useNavigation();
    const onDisconnect = useDisconnect();
    const connectionStatus = useConnectionStatus();
    const wallet = useWallet();

    useEffect(() => {
        async function getWalletAddress() {
            setWalletAddress(await wallet.getAddress());
        };

        if (connectionStatus === 'connected') {
            getWalletAddress();
        }
    }, [connectionStatus]);

    return (
        <View style={styles.container}>
            <View>
                {connectionStatus !== 'connected' && <>
                    <ConnectWallet
                        buttonTitle='Connect'
                        detailsButton={() => {
                            return <Button title="My Button" />;
                        }}
                    />
                </>}
                {connectionStatus === 'connected' && <>
                    <Text>{walletAddress}</Text>
                    <TouchableOpacity onPress={() => onDisconnect()} style={styles.button}>
                        <Text style={styles.buttonText}>Disconnect</Text>
                    </TouchableOpacity>
                </>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    button: {
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: 'black',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
    },
});
