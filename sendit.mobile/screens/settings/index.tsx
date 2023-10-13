import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', height: 42 }} >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text>GoBack</Text>
                    </TouchableOpacity>
                    <Text>settings information</Text>
                </View>
                <View style={{ margin: 24 }}>
                    <Text>settings</Text>
                    <Text>settings</Text>
                    <Text>settings</Text>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
