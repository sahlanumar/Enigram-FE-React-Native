import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const PostInput = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#8e8e8e"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dbdbdb",
  },
  input: {
    minHeight: 50,
    fontSize: 16,
    paddingVertical: 15,
  },
});

export default PostInput;
