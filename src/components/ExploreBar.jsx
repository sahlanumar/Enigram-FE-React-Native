import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const DUMMY_STORIES = [
  { id: "1", username: "Cerita Anda", image: "https://i.pravatar.cc/150?u=1" },
  { id: "2", username: "budi_iman", image: "https://i.pravatar.cc/150?u=2" },
  { id: "3", username: "siti_aisyah", image: "https://i.pravatar.cc/150?u=3" },
  { id: "4", username: "john.doe", image: "https://i.pravatar.cc/150?u=4" },
  { id: "5", username: "jane.doe", image: "https://i.pravatar.cc/150?u=5" },
  { id: "6", username: "eko_pras", image: "https://i.pravatar.cc/150?u=6" },
];

const StoryItem = ({ item }) => (
  <TouchableOpacity style={styles.storyContainer}>
    <View style={styles.storyRing}>
      <Image source={{ uri: item.image }} style={styles.storyImage} />
    </View>
    <Text style={styles.storyUsername}>
      {item.username.length > 10
        ? item.username.substring(0, 9) + "..."
        : item.username}
    </Text>
  </TouchableOpacity>
);

const ExploreBar = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_STORIES}
        renderItem={({ item }) => <StoryItem item={item} />}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dbdbdb",
    backgroundColor: "#fff",
  },
  storyContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  storyRing: {
    width: 70,
    height: 70,
    borderRadius: 22, 
    borderWidth: 2,
    borderColor: "#c13584",
    justifyContent: "center",
    alignItems: "center",
  },
  storyImage: {
    width: 62,
    height: 62,
    borderRadius: 18, 
    borderWidth: 2,
    borderColor: "#fff",
  },
  storyUsername: {
    marginTop: 5,
    fontSize: 12,
    color: "#262626",
  },
});

export default ExploreBar;
