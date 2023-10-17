import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import navigationNames from '../constants/navigationNames';
import navigationSizes from '../constants/navigationSizes';
import SwapScreen from '../screens/main/swap';
import LoanScreen from '../screens/main/loan';
import AssetsScreen from '../screens/main/assets';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            initialRouteName={navigationNames.TAB_MAIN}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarBackground: () => <BlurView tint="light" intensity={70} style={StyleSheet.absoluteFill} />,
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    borderTopWidth: 0,
                    bottom: -10,
                    height: 10 + navigationSizes.TAB_BAR_HEIGHT + insets.bottom,
                    width: '100%',
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 16.0,
                    elevation: 24,
                    paddingTop: 10,
                    zIndex: 0,
                },
            }}
        >
            <Tab.Screen
                name={navigationNames.TAB_MAIN}
                component={MainStackComponent}
                options={{
                    title: 'Swap',
                    tabBarIcon: ({ focused }) => <AntDesign name="swap" size={24} color={focused ? 'black' : 'grey'} />
                }}
            />
            <Tab.Screen
                name={navigationNames.TAB_LOAN}
                component={LoanStackComponent}
                options={{
                    title: 'Loan',
                    tabBarIcon: ({ focused }) => <AntDesign name="bank" size={24} color={focused ? 'black' : 'grey'} />
                }}
            />

            <Tab.Screen
                name={navigationNames.TAB_ASSETS}
                component={AssetsStackComponent}
                options={{
                    title: 'Assets',
                    tabBarIcon: ({ focused }) => <SimpleLineIcons name="wallet" size={24} color={focused ? 'black' : 'grey'} />
                }}
            />

        </Tab.Navigator>
    )
}


const MainStack = createStackNavigator();
function MainStackComponent() {
    return (
        <MainStack.Navigator initialRouteName={navigationNames.SCREEN_SWAP} screenOptions={{ headerShown: false }} >
            <MainStack.Screen name={navigationNames.SCREEN_SWAP} component={SwapScreen} />
        </MainStack.Navigator>
    );
}


const LoanStack = createStackNavigator();
function LoanStackComponent() {
    return (
        <LoanStack.Navigator screenOptions={{ headerShown: false }} >
            <LoanStack.Screen name={navigationNames.SCREEN_LOAN} component={LoanScreen} />
        </LoanStack.Navigator>
    );
}


const AssetsStack = createStackNavigator();
function AssetsStackComponent() {
    return (
        <AssetsStack.Navigator screenOptions={{ headerShown: false }} >
            <AssetsStack.Screen name={navigationNames.SCREEN_ASSETS} component={AssetsScreen} />
        </AssetsStack.Navigator>
    );
}