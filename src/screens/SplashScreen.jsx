import React from "react";
import { View, StyleSheet, ActivityIndicator, Image, Text } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Anda bisa mengganti ini dengan logo aplikasi Anda */}
      <Image
        source={{ uri: "https://placehold.co/150x150/3897f0/ffffff?text=Logo" }}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#3897f0" style={styles.spinner} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  spinner: {
    transform: [{ scale: 1.5 }], 
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});

export default SplashScreen;
