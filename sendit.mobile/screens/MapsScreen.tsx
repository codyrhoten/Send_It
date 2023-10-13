import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import MapView from 'react-native-maps';
import { BlurView } from 'expo-blur';

import { Text, View } from '../components/Themed';
import MenuIcon from '../components/MenuIcon';
import { useEffect } from 'react';

export default function MapsScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            title: 'Send It!',
            headerBackground: () => (
                <BlurView tint="light" intensity={30} style={StyleSheet.absoluteFill} />
            ),
            headerLeft: (props: StackHeaderProps) => (<MenuIcon />)
        } as DrawerNavigationOptions);
    });

    return (
        <View style={styles.centered}>
            <MapView style={styles.map} />
        </View>
    )
};

const styles = StyleSheet.create({
    centered: {
        flex: 1
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
