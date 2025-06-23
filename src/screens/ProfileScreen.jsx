import React, { useState, useCallback, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import userService from "../../services/userService";

import {
  ProfileHeader,
  ProfileInfo,
  ProfileMenuModal,
} from "../components/profile";

const { width } = Dimensions.get("window");
const ITEM_SIZE = (width - 2) / 3;

const ProfileScreen = () => {
  const { user: authUser, logout } = useContext(AuthContext);

  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchProfileData = async () => {
        if (!authUser?.username) {
          setIsLoading(false);
          return;
        }

        try {
          setIsLoading(true);
          setError(null);
          const [userResponse, postsResponse] = await Promise.all([
            userService.getUser(authUser.username),
            userService.getUserPosts(authUser.username),
          ]);
          setProfileData(userResponse);
          setPosts(postsResponse);
        } catch (err) {
          console.error("Failed to fetch profile data:", err);
          setError(err.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      };

      fetchProfileData();
    }, [authUser?.username])
  );

  const handleLogout = () => {
    setIsMenuVisible(false);
    logout();
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
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

  const renderPostItem = ({ item }) => (
    <TouchableOpacity>
      <Image source={{ uri: item.image_url }} style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ProfileHeader
        username={profileData?.username || ""}
        onMenuPress={() => setIsMenuVisible(true)}
      />
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={<ProfileInfo user={profileData} />}
        showsVerticalScrollIndicator={false}
      />
      <ProfileMenuModal
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        onLogout={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postImage: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: 1,
  },
});

export default ProfileScreen;
