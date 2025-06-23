import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileHeader = ({ username, onMenuPress }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.username}>{username}</Text>
      <TouchableOpacity onPress={onMenuPress}>
        <Icon name="menu" size={30} color="#262626" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dbdbdb",
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#262626",
  },
});

export default ProfileHeader;
