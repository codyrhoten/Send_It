import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from "react-native";
import WelcomePage from './_welcome';
//import MapsPage from './_maps';
//import TestPage from './_test';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomePage} />
          {/* <Stack.Screen name="Test" component={TestPage} /> */}
          {/* <Stack.Screen name="Maps" component={MapsPage} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
