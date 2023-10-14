import { createDrawerNavigator } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

import { MainTabRoutes, SettingsScreen, SwapScreen } from '@/screens';
import { navigationRef, NavigationPaths } from './RootNavigation';

const Drawer = createDrawerNavigator();

function Routes({ colorScheme }) {
    return (
        <NavigationContainer ref={navigationRef} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Drawer.Navigator screenOptions={{ headerShown: false }} >
                <Drawer.Screen
                    component={MainTabRoutes}
                    name={NavigationPaths.DRAWER_MAIN}
                    options={{
                        title: 'Cash flow',
                        drawerIcon: ({ focused }) => <AntDesign name="swap" size={24} color={focused ? 'black' : 'grey'} />
                    }}
                />
                <Drawer.Screen
                    component={SwapScreen}
                    name={NavigationPaths.DRAWER_SWAP}
                    options={{
                        drawerIcon: ({ focused }) => <FontAwesome5 name="coins" size={24} color={focused ? 'black' : 'grey'} />
                    }}
                />
                <Drawer.Screen
                    component={SettingsScreen}
                    name={NavigationPaths.DRAWER_SETTINGS}
                    options={{
                        drawerIcon: ({ focused }) => <AntDesign name="setting" size={24} color={focused ? 'black' : 'grey'} />
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default Routes;
