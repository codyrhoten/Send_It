import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';

import MapsScreen from '../screens/MapsScreen';
import FileSystemScreen from '../screens/FileSystemScreen';
import ClientsScreen from '../screens/ClientsScreen';
import { DrawerParamList, MapsParamList, FileSystemParamList, ClientsParamList } from '../types';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen
                name="Maps"
                component={MapsNavigator} />
            <Drawer.Screen
                name="FileSystem"
                component={FileSystemNavigator}
            />
            <Drawer.Screen
                name="Clients"
                component={ClientsNavigator}
            />
        </Drawer.Navigator>
    );
}

const MapsStack = createStackNavigator<MapsParamList>();

function MapsNavigator() {
    return (
        <MapsStack.Navigator>
            <MapsStack.Screen
                name="MapsScreen"
                component={MapsScreen}
            />
        </MapsStack.Navigator>
    )
}

const FileSystemStack = createStackNavigator<FileSystemParamList>();

function FileSystemNavigator() {
    return (
        <FileSystemStack.Navigator>
            <FileSystemStack.Screen
                name="FileSystemScreen"
                component={FileSystemScreen}
            />
        </FileSystemStack.Navigator>
    )
}

const ClientsStack = createStackNavigator<ClientsParamList>();

function ClientsNavigator() {
    return (
        <ClientsStack.Navigator>
            <ClientsStack.Screen
                name="ClientsScreen"
                component={ClientsScreen}
            />
        </ClientsStack.Navigator>
    )
}
