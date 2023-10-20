import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationPaths, navigate } from '@/navigation';
import { truncateEthAddress } from '@/utils';

export const ChatItemComponent = ({ chat }) => {
    return (
        <TouchableOpacity onPress={() => navigate(NavigationPaths.SCREEN_CHAT_CONVERSATION, { id: chat.id })} style={styles.container}>
            <Image source={chat.avatar} style={styles.avatar} />
            <View style={styles.chatInfo}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={styles.chatName}>{chat.title}</Text>
                    <Text style={{ fontSize: 12 }}>{truncateEthAddress(chat.address)}</Text>
                </View>

                <Text style={styles.lastMessage}>{chat.id}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#bbb8',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    chatInfo: {
        marginLeft: 10,
    },
    chatName: {
        flexGrow: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastMessage: {
        fontSize: 14,
        color: 'gray',
    },
});
