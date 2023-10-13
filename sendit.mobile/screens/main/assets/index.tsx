import { useEffect } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerNavigationOptions } from '@react-navigation/drawer';

import navigationNames from '../../../constants/navigationNames';
import MenuIcon from '../../../components/MenuIcon';

export default function AssetsScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Assets',
            headerLeft: (props: StackHeaderProps) => (<MenuIcon />)
        } as DrawerNavigationOptions);
    });

    return (
        <View style={styles.centered}>
            {/* <Text>
                This is Clients Screen
            </Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate(navigationNames.TAB_MAIN_SWAP)}
            /> */}
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
