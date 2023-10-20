import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { useAddress, useSigner } from '@thirdweb-dev/react-native';

import MenuIcon from '@/components/MenuIcon';
import { ConversationListComponent } from './components';

export function ChatScreen() {
    const navigation = useNavigation();
    const address = useAddress();
    const signer = useSigner();

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Chat',
            headerLeft: (props: StackHeaderProps) => (<MenuIcon />)
        } as DrawerNavigationOptions);
    });

    return (
        <View style={styles.centered}>
            <View style={styles.header}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Search'
                    returnKeyType='done'
                    onChangeText={(text) => setSearchQuery(text)}
                    value={searchQuery.toString()}
                />
            </View>
            <ConversationListComponent></ConversationListComponent>
        </View>
    )
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
    },
    header: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        backgroundColor: 'white',
    },
    searchInput: {
        height: 40,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        borderRadius: 20,
    },
});
