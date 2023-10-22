import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ConnectWallet, useDisconnect, useConnectionStatus, useAddress, useCreateWalletInstance, useSetConnectionStatus, useSetConnectedWallet, localWallet } from '@thirdweb-dev/react-native';
import { Ethereum, Mumbai } from '@thirdweb-dev/chains';
import { AntDesign, Entypo } from '@expo/vector-icons';

import { LoginScreen } from '@/screens';
import { truncateEthAddress } from '@/utils';
import { BottomModalComponent } from '../BottomModalComponent';

const WALLET_PRIVATE_KEY = process.env.EXPO_PUBLIC_WALLET_PRIVATE_KEY;

export function UserHeaderComponent() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const createWalletInstance = useCreateWalletInstance();
    const setConnectionStatus = useSetConnectionStatus();
    const setConnectedWallet = useSetConnectedWallet();

    const address = useAddress();
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

    return (<>
        <BottomModalComponent title={truncateEthAddress(address?.toString())} isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} blurIntensity={100}>
            <LoginScreen onCloseModal={() => setIsModalVisible(false)} />
        </BottomModalComponent>

        <View style={styles.container}>
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
                <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.button}>
                    <Text style={{ ...styles.buttonText, fontSize: 12, fontWeight: 'normal' }}>{truncateEthAddress(address?.toString())}</Text>
                    <Entypo name="chevron-down" size={18} color="white" />
                </TouchableOpacity>
            </>}
        </View>
    </>);
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingRight: 10
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 6,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: 'black',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
        marginHorizontal: 5,
    },
});
