import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ExploreBarItem = ({ item, onPress }) => {
  if (!item?.image_url) return null;

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress(item.id)}
    >
      <Image source={{ uri: item.image_url }} style={styles.itemImage} />
    </TouchableOpacity>
  );
};

const ExploreBar = ({ posts, onPostPress }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>For You</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <ExploreBarItem item={item} onPress={onPostPress} />
        )}
        keyExtractor={(item) => `explore-bar-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dbdbdb",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#262626",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  listContent: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    marginRight: 12,
  },
  itemImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: "#e1e1e1",
  },
});

export default ExploreBar;
