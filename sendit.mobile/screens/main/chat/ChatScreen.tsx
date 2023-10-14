import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerNavigationOptions } from '@react-navigation/drawer';

import MenuIcon from '../../../components/MenuIcon';
import navigationNames from '../../../constants/navigationNames';
import { ConversationListComponent } from './components';

export function ChatScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Chat',
            headerLeft: (props: StackHeaderProps) => (<MenuIcon />)
        } as DrawerNavigationOptions);
    });

    return (
        <View style={styles.centered}>
            <Text>
                This is Chat Screen
            </Text>
            <Button
                title="Go to Conversation"
                onPress={() => navigation.navigate(navigationNames.SCREEN_CHAT_CONVERSATION as never)}
            />
            <ConversationListComponent navigation={navigation}></ConversationListComponent>
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
