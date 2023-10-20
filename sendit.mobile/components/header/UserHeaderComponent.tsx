import { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ConnectWallet, useDisconnect, useConnectionStatus, useAddress, useCreateWalletInstance, useSetConnectionStatus, useSetConnectedWallet, localWallet } from '@thirdweb-dev/react-native';
import { Ethereum, Mumbai } from '@thirdweb-dev/chains';

import { truncateEthAddress } from '@/utils';

const WALLET_PRIVATE_KEY = process.env.EXPO_PUBLIC_WALLET_PRIVATE_KEY;

export function UserHeaderComponent() {
    const createWalletInstance = useCreateWalletInstance();
    const setConnectionStatus = useSetConnectionStatus();
    const setConnectedWallet = useSetConnectedWallet();

    const address = useAddress();
    const onDisconnect = useDisconnect();
    const connectionStatus = useConnectionStatus();

    useEffect(() => {

    }, []);

    const onLocalWalletConnect = async () => {
        const walletConfig = localWallet();
        const wallet = createWalletInstance(walletConfig);

        await wallet.import({
            privateKey: WALLET_PRIVATE_KEY,
            encryption: false
        });

        try {
            setConnectionStatus('connecting');
            await wallet.connect({ chainId: Mumbai.chainId });
            setConnectedWallet(wallet);
        } catch (e) {
            setConnectionStatus('disconnected');
            console.error('failed to connect', e);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                {connectionStatus !== 'connected' && <>
                    {!WALLET_PRIVATE_KEY && <>
                        <ConnectWallet buttonTitle='Connect' />
                    </>}
                    {WALLET_PRIVATE_KEY && <>
                        <TouchableOpacity onPress={onLocalWalletConnect} style={styles.button}>
                            <Text style={styles.buttonText}>Connect Local</Text>
                        </TouchableOpacity>
                    </>}
                </>}
                {connectionStatus === 'connected' && <>
                    <TouchableOpacity onPress={() => onDisconnect()} style={styles.button}>
                        <Text style={styles.buttonText}>Disconnect</Text>
                        <Text style={{ ...styles.buttonText, fontSize: 12, fontWeight: 'normal' }}>{truncateEthAddress(address?.toString())}</Text>
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
        alignItems: 'center',
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
