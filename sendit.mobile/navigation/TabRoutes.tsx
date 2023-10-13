import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import MapsScreen from '../screens/MapsScreen';
import FileSystemScreen from '../screens/FileSystemScreen';
import ClientsScreen from '../screens/ClientsScreen';
import navigationStrings from '../constants/navigationNames';
import navigationSizes from '../constants/navigationSizes';


const Tab = createBottomTabNavigator();

function TabRoutes() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            initialRouteName={navigationStrings.HOME}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarBackground: () => (
                    <BlurView tint="light" intensity={70} style={StyleSheet.absoluteFill} />
                ),
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    borderTopWidth: 0,
                    position: 'absolute',
                    bottom: -10,
                    height: 10 + navigationSizes.TAB_BAR_HEIGHT + insets.bottom
                },
            }}
        >
            <Tab.Screen
                name={navigationStrings.HOME}
                component={HomeStackComponent}
                options={{
                    title: 'Swap',
                    tabBarIcon: ({ focused }) => {
                        return <AntDesign name="swap" size={24} color={focused ? 'black' : 'grey'} />
                    }
                }}
            />
            <Tab.Screen
                name={navigationStrings.EXPLORE}
                component={ExploreStackComponent}
                options={{
                    title: 'Loan',
                    tabBarIcon: ({ focused }) => {
                        return <AntDesign name="bank" size={24} color={focused ? 'black' : 'grey'} />
                    }
                }}
            />

            <Tab.Screen
                name={navigationStrings.PROFILE}
                component={PorfileStackComponent}
                options={{
                    title: 'Assets',
                    tabBarIcon: ({ focused }) => {
                        return <SimpleLineIcons name="wallet" size={24} color={focused ? 'black' : 'grey'} />
                    }
                }}
            />

        </Tab.Navigator>
    )
}

export default TabRoutes;




const ExploreStack = createStackNavigator();
export function ExploreStackComponent() {
    return (
        <ExploreStack.Navigator screenOptions={{ headerShown: false }} >
            <ExploreStack.Screen name={'ExploreMapsTab'} component={MapsScreen} />
            {/* <ExploreStack.Screen name={navigationStrings.SEARCH} component={FileSystemScreen} /> */}
        </ExploreStack.Navigator>
    );
}


const HomeStack = createStackNavigator();
export function HomeStackComponent() {
    return (
        <HomeStack.Navigator initialRouteName='HomeFileSystemTab' screenOptions={{ headerShown: false }} >
            {/* <HomeStack.Screen name={navigationStrings.HOME} component={MapsScreen} /> */}
            <HomeStack.Screen name={'HomeFileSystemTab'} component={FileSystemScreen} />
        </HomeStack.Navigator>
    );
}

const PorfileStack = createStackNavigator();
export function PorfileStackComponent() {
    return (
        <PorfileStack.Navigator screenOptions={{ headerShown: false }} >
            <PorfileStack.Screen name={'PorfileClientsTab'} component={ClientsScreen} />
            {/* <PorfileStack.Screen name={navigationStrings.EDIT_PROFILE} component={FileSystemScreen} /> */}
        </PorfileStack.Navigator>
    );
}
