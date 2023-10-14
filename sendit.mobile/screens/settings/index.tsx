import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { StackHeaderProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export function SettingsScreen({ navigation }) {

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Settings',
            headerLeft: (props: StackHeaderProps) =>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} style={{ marginLeft: 25 }} />
                </TouchableOpacity>
        } as DrawerNavigationOptions);
    });

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
        padding: 25
    },
});
