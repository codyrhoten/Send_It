import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function TestPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test test test</Text>
      <Button
        title="Go to Welcome"
        onPress={() => navigation.navigate('Welcome')} 
      />
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
