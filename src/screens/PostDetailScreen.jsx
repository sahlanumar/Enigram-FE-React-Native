import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import postService from "../services/postService";
import { PostCard } from "../components/home"; 

const PostDetailScreen = () => {
  const route = useRoute();
  const { postId } = route.params;

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const transformData = (item) => {
    return {
      ...item,
      user: {
        username: item.username,
        profile_picture_url: item.profile_picture_url,
        is_verified: item.is_verified,
      },
    };
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await postService.getPost(postId);
        setPost(transformData(postData));
      } catch (err) {
        setError(err.message || "Failed to fetch post details.");
        Alert.alert("Error", "Could not load the post.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.center}>
        <Text>Could not load post.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <PostCard
        post={post}
        onCommentPress={() => {
          /* Logika buka modal komentar bisa ditambahkan di sini */
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostDetailScreen;
