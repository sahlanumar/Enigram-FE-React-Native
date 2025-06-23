import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ImageSelector = ({ imageUri, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Icon name="camera-outline" size={50} color="#8e8e8e" />
          <Text style={styles.placeholderText}>Tap to select a photo</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1, 
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    marginTop: 10,
    color: "#8e8e8e",
  },
});

export default ImageSelector;
