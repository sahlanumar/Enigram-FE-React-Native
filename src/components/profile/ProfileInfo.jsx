import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Stat = ({ count, label }) => (
  <View style={styles.stat}>
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ProfileInfo = ({ user }) => {
  if (!user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image
          source={{
            uri: user.profile_picture_url || "https://placehold.co/150",
          }}
          style={styles.avatar}
        />
        <View style={styles.statsContainer}>
          <Stat count={user.posts_count || 0} label="Posts" />
          <Stat count={user.followers_count || 0} label="Followers" />
          <Stat count={user.following_count || 0} label="Following" />
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.fullName}>{user.full_name}</Text>
        {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    alignItems: "center",
  },
  statCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#262626",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  bioContainer: {
    marginTop: 10,
  },
  fullName: {
    fontWeight: "bold",
    color: "#262626",
  },
  bio: {
    marginTop: 5,
    color: "#262626",
  },
  editButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 15,
  },
  editButtonText: {
    fontWeight: "bold",
    color: "#262626",
  },
});

export default ProfileInfo;
