import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { AuthInput, AuthButton } from "../components/auth";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { register } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!fullName) newErrors.fullName = "Full Name is required";
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register({ email, fullName, username, password });
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        error.error || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started.</Text>

        <AuthInput
          label="Email"
          iconName="mail-outline"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />
        <AuthInput
          label="Full Name"
          iconName="person-outline"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
        />
        <AuthInput
          label="Username"
          iconName="at-outline"
          placeholder="Choose a username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          error={errors.username}
        />
        <AuthInput
          label="Password"
          iconName="lock-closed-outline"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />

        <AuthButton
          title="Register"
          onPress={handleRegister}
          isLoading={isLoading}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  linkText: {
    fontSize: 14,
    color: "#3897f0",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default RegisterScreen;
