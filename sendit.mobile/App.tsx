import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Routes from "./navigation/Routes";

export default function App() {
    const isLoadingComplete = useLoadedAssets();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <Routes colorScheme={colorScheme} />
                    <StatusBar />
                </SafeAreaProvider>
            </KeyboardAvoidingView>
        );
    }
}
