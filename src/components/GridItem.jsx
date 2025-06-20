import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const GridItem = ({ item, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <Image source={{ uri: item.image }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 2, 
  },
});

export default GridItem;
