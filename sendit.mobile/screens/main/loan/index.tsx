import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerNavigationOptions } from '@react-navigation/drawer';

import MenuIcon from '../../../components/MenuIcon';

export default function LoanScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Loan',
            headerLeft: (props: StackHeaderProps) => (<MenuIcon />)
        } as DrawerNavigationOptions);
    });

    return (
        <View style={styles.centered}>
            <Text>
                {/* This is FileSystem Screen */}
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
