import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThirdwebProvider, localWallet, metamaskWallet, rainbowWallet } from '@thirdweb-dev/react-native';
import { Ethereum, Mumbai } from '@thirdweb-dev/chains';

import { useLoadedAssets } from './hooks/useLoadedAssets';
import Routes from './navigation/Routes';

export default function App() {
    const activeChain = Mumbai;
    const isLoadingComplete = useLoadedAssets();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <ThirdwebProvider
                activeChain={activeChain}
                supportedChains={[activeChain]}
                clientId='15a50beb120642e4b6f7c5b62c9dbfe9'
                supportedWallets={[metamaskWallet(), rainbowWallet(), localWallet()]}
            >
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                    <SafeAreaProvider>
                        <Routes colorScheme={'light'} />
                        <StatusBar />
                    </SafeAreaProvider>
                </KeyboardAvoidingView>
            </ThirdwebProvider>
        );
    }
}
