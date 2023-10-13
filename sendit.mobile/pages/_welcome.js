import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function WelcomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
      {/* <Button
        title="Go to Maps"
        onPress={() => navigation.navigate('Test')} 
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
