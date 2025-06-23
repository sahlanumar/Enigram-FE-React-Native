import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#8e8e8e" style={styles.icon} />
      <TextInput placeholder="Search" style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efefef",
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
});

export default SearchBar;