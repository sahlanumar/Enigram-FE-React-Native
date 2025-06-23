import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AuthInput = ({ label, iconName, error, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <Ionicons name={iconName} size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    height: 50,
  },
  icon: {
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default AuthInput;
