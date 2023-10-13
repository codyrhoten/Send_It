import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Feather as DefaultFeather } from '@expo/vector-icons';

import { useThemeColor } from './Themed';

export default function MenuIcon() {
    const navigation = useNavigation();

    const openDrawer = useCallback(() => {
        navigation.dispatch(DrawerActions.openDrawer());
    }, []);

    return (
        <TouchableOpacity onPress={openDrawer}>
            <Feather name="menu" size={24} style={{ marginLeft: 25 }} />
        </TouchableOpacity>
    );
};

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
};

type DefaultIconProps = {
    name: string;
    size: number;
    style: object | [object];
}

type IconProps = ThemeProps & DefaultIconProps;
function Feather(props: IconProps) {
    const { lightColor, darkColor, name, size, style } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return <DefaultFeather name={name as any} size={size} color={color} style={style} />
}