import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";

import SearchBar from "../components/SearchBar";
import GridRow from "../components/GridRow";
import AllSmallRow from "../components/AllSmallRow";
import ExploreBar from "../components/ExploreBar";


const DUMMY_EXPLORE_POSTS = Array.from({ length: 30 }).map((_, i) => ({
  id: `explore_post_${i + 1}`,
  image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
}));

const chunkArray = (array, size) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

const ExploreScreen = () => {
  const chunkedData = chunkArray(DUMMY_EXPLORE_POSTS, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar />
        <ExploreBar />
        {chunkedData.map((chunk, index) => {
          if (chunk.length !== 3) return null;

          const patternIndex = index % 3;

          if (patternIndex === 0) {
            return (
              <GridRow key={`row_${index}`} items={chunk} reverse={false} />
            );
          } else if (patternIndex === 1) {
            return <AllSmallRow key={`row_${index}`} items={chunk} />;
          } else {
            return (
              <GridRow key={`row_${index}`} items={chunk} reverse={true} />
            );
          }
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ExploreScreen;
