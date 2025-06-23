import React, { useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import postService from "../../services/postService";
import { ImageSelector, PostInput } from "../components/addPost";

const AddPostScreen = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Camera roll access is needed to add a post."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const resetForm = () => {
    setImageUri(null);
    setCaption("");
    setLocation("");
  };

  const handleShare = async () => {
    if (!imageUri) {
      Alert.alert("No Image", "Please select an image to share.");
      return;
    }

    setIsLoading(true);
    try {
      await postService.createPost({
        imageUrl: imageUri,
        caption,
        location,
      });
      Alert.alert("Success", "Your post has been shared!");
      resetForm(); 
      navigation.navigate("Home"); 
    } catch (error) {
      console.error("Failed to create post:", error);
      Alert.alert("Error", "Could not share your post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isLoading ? (
          <ActivityIndicator style={{ marginRight: 15 }} />
        ) : (
          <Text style={styles.headerButton} onPress={handleShare}>
            Share
          </Text>
        ),
      headerTitle: "New Post",
      headerShown: true,
      headerLeft: () => (
        <Text style={styles.headerButton} onPress={() => navigation.goBack()}>
          Cancel
        </Text>
      ),
    });
  }, [navigation, isLoading, imageUri, caption, location]);

  return (
    <ScrollView style={styles.container}>
      <ImageSelector imageUri={imageUri} onPress={handleImagePick} />
      <PostInput
        placeholder="Write a caption..."
        value={caption}
        onChangeText={setCaption}
        multiline
      />
      <PostInput
        placeholder="Add location"
        value={location}
        onChangeText={setLocation}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerButton: {
    color: "#3897f0",
    fontSize: 16,
    marginHorizontal: 15,
  },
});

export default AddPostScreen;
