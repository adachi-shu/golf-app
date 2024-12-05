import React from "react";
import { View, Button, StyleSheet, Alert } from "react-native";

export default function LoginComponent() {
  const handleLineLogin = () => {
    Alert.alert("LINE Login", "LINE login functionality goes here.");
    // Implement LINE login logic here
  };

  const handleGoogleLogin = () => {
    Alert.alert("Google Login", "Google login functionality goes here.");
    // Implement Google login logic here
  };

  const handleAppleLogin = () => {
    Alert.alert("Apple Login", "Apple login functionality goes here.");
    // Implement Apple login logic here
  };

  return (
    <View style={styles.container}>
      <Button
        title="LINEでログイン"
        onPress={handleLineLogin}
        color="#00C300"
      />
      <Button
        title="Googleでログイン"
        onPress={handleGoogleLogin}
        color="#4285F4"
      />
      <Button
        title="Appleでログイン"
        onPress={handleAppleLogin}
        color="#000000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    marginVertical: 10,
  },
});
