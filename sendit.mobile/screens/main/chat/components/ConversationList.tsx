import React, { } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ChatItemComponent } from './ChatItemComponent';
import { ChatData } from '../../data';

export function ConversationListComponent({ }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={ChatData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ChatItemComponent chat={item} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
