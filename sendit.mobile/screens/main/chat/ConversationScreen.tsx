import { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';

export function ConversationScreen({ route, navigation }) {
    const { id } = route.params;

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
            <Text>
                {id}
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
