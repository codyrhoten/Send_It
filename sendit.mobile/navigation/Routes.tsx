import { createDrawerNavigator } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

import { MainTabRoutes, AssetsScreen, SettingsScreen } from '@/screens';
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
                        title: 'Home',
                        drawerIcon: ({ focused }) => <AntDesign name="home" size={24} color={focused ? 'black' : 'grey'} />
                    }}
                />
                <Drawer.Screen
                    component={AssetsScreen}
                    name={NavigationPaths.DRAWER_ASSETS}
                    options={{
                        title: 'Assets',
                        drawerIcon: ({ focused }) => <SimpleLineIcons name="wallet" size={24} color={focused ? 'black' : 'grey'} />
                    }}
                />
                <Drawer.Screen
                    component={SettingsScreen}
                    name={NavigationPaths.DRAWER_SETTINGS}
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
