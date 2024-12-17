import React from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "./AuthProvider";

export default function LoginComponent() {
  const { login, loginWithApple, loginWithLine } = useAuth();
  const handleLineLogin = () => {
    loginWithLine();
    // Implement LINE login logic here
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
  };

  const handleAppleLogin = () => {
    loginWithApple();
    // Implement Apple login logic here
  };

  return (
    <View style={styles.container}>
      <Button
        title="LINEでログイン"
        onPress={handleLineLogin}
        color="#00C300"
      />
      <Button title="Googleでログイン" onPress={login} color="#4285F4" />
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
