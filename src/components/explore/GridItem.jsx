import React from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";

const GridItem = ({ item, style, onPress }) => {
  if (!item) {
    return <View style={[styles.container, style]} />;
  }

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress(item.id)}
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
    backgroundColor: "#e1e1e1",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default GridItem;
