import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Import komponen fitur
import StoriesBar from "../components/StoriesBar";
import PostCard from "../components/PostCard";

// Data dummy untuk postingan feed
const DUMMY_POSTS = [
  {
    id: "1",
    username: "siti_aisyah",
    location: "Jakarta, Indonesia",
    userAvatar: "https://i.pravatar.cc/150?u=3",
    postImage: "https://picsum.photos/id/1015/500/500",
    likes: 1201,
    commentCount: 42,
    caption:
      "Menikmati pemandangan dari atas! 🏞️ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. #travel #norway #nature",
  },
  {
    id: "2",
    username: "john.doe",
    location: "Jakarta, Indonesia",
    userAvatar: "https://i.pravatar.cc/150?u=4",
    postImage: "https://picsum.photos/id/1025/500/500",
    likes: 852,
    commentCount: 42,
    caption:
      "Sahabat terbaikku! 🐶 🏞️ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. #travel #norway #nature",
  },
  {
    id: "3",
    username: "budi_iman",
    location: "Jakarta, Indonesia",
    userAvatar: "https://i.pravatar.cc/150?u=2",
    postImage: "https://picsum.photos/id/237/500/500",
    likes: 432,
    commentCount: 42,
    caption:
      "Waktunya kopi pagi ☕️ #morning 🏞️ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. #travel #norway #nature",
  },
];

const HomeScreen = () => {
  const renderPost = ({ item }) => <PostCard post={item} />;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Kamera diklik!")}>
          <Icon name="camera-outline" size={28} color="#262626" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon
              name="add-circle-outline"
              size={30}
              color="#262626"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="paper-plane-outline"
              size={30}
              color="#262626"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={DUMMY_POSTS}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<StoriesBar />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dbdbdb",
  },
  headerTitle: {
    fontFamily: "Cochin", // Ganti dengan font kustom jika ada
    fontSize: 24,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 20,
  },
});

export default HomeScreen;
