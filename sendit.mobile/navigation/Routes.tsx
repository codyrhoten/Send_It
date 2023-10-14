import { createDrawerNavigator } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import navigationNames from '../constants/navigationNames';
import TabRoutes from './TabRoutes';
import SettingsScreen from '../screens/settings';

const Drawer = createDrawerNavigator();

function Routes({ colorScheme }) {
    return (
        <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Drawer.Navigator screenOptions={{ headerShown: false }} >
                <Drawer.Screen
                    component={TabRoutes}
                    name={navigationNames.DRAWER_MAIN}
                    options={{
                        title: 'Cash flow',
                        drawerIcon: ({ focused }) => <AntDesign name="swap" size={24} color={focused ? 'black' : 'grey'} />
                    }}
                />
                <Drawer.Screen
                    component={SettingsScreen}
                    name={navigationNames.DRAWER_SETTINGS}
                    options={{
                        title: 'Settings',
                        drawerIcon: ({ focused }) => <AntDesign name="setting" size={24} color={focused ? 'black' : 'grey'} />
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default Routes;
