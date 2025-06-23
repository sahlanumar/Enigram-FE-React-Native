import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Text,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import {
  StoriesBar,
  PostCard,
  CommentsModal,
  StoryViewerModal,
} from "../components/home";
import postService from "../../services/postService";
import storyService from "../../services/storyService";
import { AuthContext } from "../../context/AuthContext";

const HomeScreen = () => {
  const { user: authUser } = useContext(AuthContext);
  const [feed, setFeed] = useState([]);
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [viewingStory, setViewingStory] = useState(null); 

  const transformData = (items) => {
    return items.map((item) => ({
      ...item,
      user: {
        username: item.username,
        profile_picture_url: item.profile_picture_url,
        is_verified: item.is_verified,
      },
    }));
  };

  const fetchData = async () => {
    try {
      setError(null);
      const [feedResponse, storiesResponse] = await Promise.all([
        postService.getFeed(),
        storyService.getActiveStories(),
      ]);
      setFeed(transformData(feedResponse));

      const transformedStories = transformData(storiesResponse);
      const addStoryButton = {
        id: "add-story-button",
        type: "add",
        user: authUser,
      };
      setStories([addStoryButton, ...transformedStories]);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (authUser) fetchData();
  }, [authUser]);

  useFocusEffect(
    useCallback(() => {
      if (authUser) fetchData();
    }, [authUser])
  );

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  const handleCommentPress = (postId) => setSelectedPostId(postId);
  const handleCloseCommentModal = () => setSelectedPostId(null);

  const handleAddStory = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 0.8,
    });

    if (!result.canceled) {
      const imageUrl = result.assets[0].uri;

      try {
        await storyService.createStory({ imageUrl });
        Alert.alert("Success", "Your story has been added!");
        fetchData(); 
      } catch (error) {
        console.error("Failed to add story:", error);
        Alert.alert("Error", "Could not add your story. Please try again.");
      }
    }
  };

  const handleStoryPress = (story) => {
    setViewingStory(story);
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Enigram</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon name="add-circle-outline" size={30} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15 }}>
            <Icon name="paper-plane-outline" size={28} color="#262626" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={feed}
        renderItem={({ item }) => (
          <PostCard post={item} onCommentPress={handleCommentPress} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <StoriesBar
            stories={stories}
            onAddStoryPress={handleAddStory}
            onStoryPress={handleStoryPress}
          />
        }
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
      <CommentsModal
        postId={selectedPostId}
        isVisible={!!selectedPostId}
        onClose={handleCloseCommentModal}
      />
      <StoryViewerModal
        story={viewingStory}
        isVisible={!!viewingStory}
        onClose={() => setViewingStory(null)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dbdbdb",
  },
  headerTitle: { fontFamily: "Cochin", fontSize: 28, fontWeight: "bold" },
  headerIcons: { flexDirection: "row", alignItems: "center" },
});

export default HomeScreen;
