import { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';

export function ConversationScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Conversation',
            headerLeft: (props: StackHeaderProps) =>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} style={{ marginLeft: 25 }} />
                </TouchableOpacity>
        } as DrawerNavigationOptions);
    });

    return (
        <View style={styles.centered}>
            <Text>
                This is Conversation Screen
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
