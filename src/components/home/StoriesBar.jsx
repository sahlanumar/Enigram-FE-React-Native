import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const StoryCircle = ({ item, onPress }) => (
  <TouchableOpacity style={styles.storyContainer} onPress={() => onPress(item)}>
    <View style={styles.storyRing}>
      <Image
        source={{
          uri: item.user.profile_picture_url || "https://placehold.co/100",
        }}
        style={styles.storyImage}
      />
    </View>
    <Text style={styles.storyUsername} numberOfLines={1}>
      {item.user.username}
    </Text>
  </TouchableOpacity>
);

const AddStoryCircle = ({ item, onPress }) => (
  <TouchableOpacity style={styles.storyContainer} onPress={onPress}>
    <View style={styles.addStoryRing}>
      <Image
        source={{
          uri: item.user?.profile_picture_url || "https://placehold.co/100",
        }}
        style={styles.storyImage}
      />
      <View style={styles.addIconContainer}>
        <Icon name="add-circle" size={24} color="#3897f0" />
      </View>
    </View>
    <Text style={styles.storyUsername} numberOfLines={1}>
      Your Story
    </Text>
  </TouchableOpacity>
);

const StoriesBar = ({ stories, onAddStoryPress, onStoryPress }) => {
  const renderItem = ({ item }) => {
    if (item.type === "add") {
      return <AddStoryCircle item={item} onPress={onAddStoryPress} />;
    }
    return <StoryCircle item={item} onPress={onStoryPress} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 10, paddingRight: 5 }}
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
  storyContainer: { alignItems: "center", marginRight: 15, width: 70 },
  storyRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#c13584",
    justifyContent: "center",
    alignItems: "center",
  },
  addStoryRing: { width: 70, height: 70 },
  storyImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: "#fff",
  },
  storyUsername: { marginTop: 5, fontSize: 12, color: "#262626" },
  addIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 15,
  },
});

export default StoriesBar;
