import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Animated,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const StoryViewerModal = ({ story, isVisible, onClose }) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000, 
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          onClose(); 
        }
      });
    }
  }, [isVisible, story]);

  if (!story) return null;

  const progressInterpolation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[styles.progressBar, { width: progressInterpolation }]}
          />
        </View>
        <View style={styles.header}>
          <Image
            source={{
              uri:
                story.user?.profile_picture_url || "https://placehold.co/100",
            }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{story.user?.username}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: story.image_url }}
          style={styles.storyImage}
          resizeMode="cover"
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 1,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  closeButton: {
    marginLeft: "auto",
  },
  storyImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  progressBarContainer: {
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    zIndex: 2,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "white",
  },
});

export default StoryViewerModal;
