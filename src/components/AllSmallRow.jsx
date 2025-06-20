import React from "react";
import { View, StyleSheet } from "react-native";
import GridItem from "./GridItem";

const AllSmallRow = ({ items }) => {
  if (!items || items.length < 3) return null;

  return (
    <View style={styles.rowContainer}>
      <GridItem item={items[0]} style={{ flex: 1 }} />
      <GridItem item={items[1]} style={{ flex: 1 }} />
      <GridItem item={items[2]} style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    height: 125, 
  },
});

export default AllSmallRow;
