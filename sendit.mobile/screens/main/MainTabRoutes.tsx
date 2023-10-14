import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { NavigationPaths } from '@/navigation';
import { MainConstants } from './MainConstants';
import { TreasuryScreen } from './treasury';
import { AssetsScreen } from './assets';
import { ChatScreen, ConversationScreen } from './chat';
import { CashFlowScreen } from './cash-flow';


const Tab = createBottomTabNavigator();

export function MainTabRoutes() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            initialRouteName={NavigationPaths.MAIN_TAB_CASH_FLOW}
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarBackground: () => <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill} />,
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    borderTopWidth: 0,
                    bottom: -10,
                    height: 10 + MainConstants.TAB_BAR_HEIGHT + insets.bottom,
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
                name={NavigationPaths.MAIN_TAB_CASH_FLOW}
                component={MainTabCashFlowComponent}
                options={{
                    title: 'Cash flow',
                    tabBarIcon: ({ focused }) => <AntDesign name="swap" size={24} color={focused ? 'black' : 'grey'} />
                }}
            />
            <Tab.Screen
                name={NavigationPaths.MAIN_TAB_TREASURY}
                component={MainTabTreasuryComponent}
                options={{
                    title: 'Treasury',
                    tabBarIcon: ({ focused }) => <AntDesign name="bank" size={24} color={focused ? 'black' : 'grey'} />
                }}
            />

            <Tab.Screen
                name={NavigationPaths.MAIN_TAB_CHAT}
                component={MainTabChatComponent}
                options={{
                    title: 'Chats',
                    tabBarIcon: ({ focused }) => <Ionicons name="chatbubbles-outline" size={24} color={focused ? 'black' : 'grey'} />
                }}
            />

            <Tab.Screen
                name={NavigationPaths.MAIN_TAB_ASSETS}
                component={MainTabAssetsComponent}
                options={{
                    title: 'Assets',
                    tabBarIcon: ({ focused }) => <SimpleLineIcons name="wallet" size={24} color={focused ? 'black' : 'grey'} />
                }}
            />

        </Tab.Navigator>
    )
}


const CashFlowStack = createStackNavigator();
function MainTabCashFlowComponent() {
    return (
        <CashFlowStack.Navigator initialRouteName={NavigationPaths.SCREEN_CASH_FLOW}>
            <CashFlowStack.Screen name={NavigationPaths.SCREEN_CASH_FLOW} component={CashFlowScreen} />
        </CashFlowStack.Navigator>
    );
}


const TreasuryStack = createStackNavigator();
function MainTabTreasuryComponent() {
    return (
        < TreasuryStack.Navigator>
            < TreasuryStack.Screen name={NavigationPaths.SCREEN_TREASURY} component={TreasuryScreen} />
        </ TreasuryStack.Navigator>
    );
}


const ChatStack = createStackNavigator();
function MainTabChatComponent() {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen name={NavigationPaths.SCREEN_CHAT} component={ChatScreen} />
            <ChatStack.Screen name={NavigationPaths.SCREEN_CHAT_CONVERSATION} component={ConversationScreen} />
        </ChatStack.Navigator>
    );
}


const AssetsStack = createStackNavigator();
function MainTabAssetsComponent() {
    return (
        <AssetsStack.Navigator>
            <AssetsStack.Screen name={NavigationPaths.SCREEN_ASSETS} component={AssetsScreen} />
        </AssetsStack.Navigator>
    );
}
