import React from "react";
import { View, StyleSheet } from "react-native";
import GridItem from "./GridItem";

const GridRow = ({ items, reverse = false }) => {
  if (!items || items.length === 0) return null;

  const smallItems = (
    <View style={styles.smallItemsContainer}>
      <GridItem item={items[1]} style={{ flex: 1 }} />
      <GridItem item={items[2]} style={{ flex: 1 }} />
    </View>
  );

  const largeItem = <GridItem item={items[0]} style={{ flex: 2 }} />;

  return (
    <View style={styles.rowContainer}>
      {reverse ? (
        <>
          {smallItems}
          {largeItem}
        </>
      ) : (
        <>
          {largeItem}
          {smallItems}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    height: 250, 
  },
  smallItemsContainer: {
    flex: 1,
    flexDirection: "column",
  },
});

export default GridRow;
