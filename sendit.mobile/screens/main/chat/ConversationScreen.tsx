import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { useKeyboardHeight } from '@/hooks';
import { ChatData } from '../data';
import { MainConstants } from '../MainConstants';

export function ConversationScreen({ route, navigation }) {
    const { id } = route.params;
    const chatData = ChatData.find(p => p.id === id);

    const insets = useSafeAreaInsets();
    const keyboardHeight = useKeyboardHeight();
    const scrollViewRef = useRef<ScrollView>();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Conversation',
            headerLeft: (props: StackHeaderProps) =>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={24} style={{ marginLeft: 25 }} />
                </TouchableOpacity>
        } as DrawerNavigationOptions);

        setMessages(chatData.messages);
    }, []);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);


    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, { text: newMessage, isMe: true }]);
            setNewMessage('');
        }
    };

    return (
        <View style={{
            ...styles.container,
            marginBottom: keyboardHeight ? insets.bottom : MainConstants.TAB_BAR_HEIGHT + insets.bottom
        }}>
            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
                {messages.map((message, index) => (
                    <MessageItem key={index} message={message} />
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Message'
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <FontAwesome name='send' size={18} color='white' />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const MessageItem = ({ message }) => {
    return (
        <View style={message.isMe ? styles.myMessage : styles.otherMessage}>
            <Text>{message.text}</Text>
            {/* <View>
                <Text>14:00</Text>
            </View> */}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    input: {
        flexGrow: 1,
        backgroundColor: '#fffa',
        borderColor: '#cccc',
        padding: 12,
        borderRadius: 5,
        borderWidth: 1,
        marginRight: 8,
        height: 40
    },
    sendButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 5,
        elevation: 5,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
});
