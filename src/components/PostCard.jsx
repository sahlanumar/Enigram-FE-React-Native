import React,{ useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const PostCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_CAPTION_LENGTH = 70; 

  const toggleExpand = () => {
    setIsExpanded(true); 
  };

  const renderCaption = () => {
    const showMoreButton = post.caption.length > MAX_CAPTION_LENGTH;
    return (
      <View>
        <Text style={styles.caption}>
          <Text style={styles.username}>{post.username}</Text>
          <Text>
            {" "}
            {isExpanded || !showMoreButton
              ? post.caption
              : `${post.caption.substring(0, MAX_CAPTION_LENGTH)}... `}
          </Text>
          {showMoreButton && !isExpanded && (
            <Text style={styles.moreText} onPress={toggleExpand}>
              more
            </Text>
          )}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
        <View style={styles.userInfoContainer}>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.location}>{post.location}</Text>
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Icon name="ellipsis-vertical" size={20} color="#262626" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: post.postImage }} style={styles.postImage} />

      <View style={styles.actionsContainer}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="heart-outline" size={28} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="chatbubble-outline" size={28} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="paper-plane-outline" size={28} color="#262626" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="bookmark-outline" size={28} color="#262626" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.likes}>{post.likes} suka</Text>
        {renderCaption()}
        {post.commentCount > 0 && (
          <TouchableOpacity
            onPress={() => console.log("Navigasi ke halaman komentar...")}
          >
            <Text style={styles.viewComments}>
              View all {post.commentCount} comments
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  username: {
    fontWeight: "bold",
    marginLeft: 10,
    flex: 1,
    color: "#262626",
  },
  optionsButton: {},
  postImage: {
    width: "100%",
    aspectRatio: 1, // Persegi
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  leftActions: {
    flexDirection: "row",
  },
  actionButton: {
    marginHorizontal: 5,
  },
  infoContainer: {
    paddingHorizontal: 15,
  },
  likes: {
    fontWeight: "bold",
    color: "#262626",
  },
  caption: {
    marginTop: 5,
    color: "#262626",
  },
  userInfoContainer: {
    flex: 1, 
  },
});

export default PostCard;
