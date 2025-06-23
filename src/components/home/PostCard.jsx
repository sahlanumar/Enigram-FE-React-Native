import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import postService from "../../../services/postService";

const PostCard = ({ post, onCommentPress }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [likesCount, setLikesCount] = useState(post.likes_count);

  const toggleExpand = () => setIsExpanded(true);

  const handleLike = async () => {
    const originalLikedState = isLiked;
    const originalLikesCount = likesCount;

    setIsLiked(!isLiked);
    setLikesCount(likesCount + (!isLiked ? 1 : -1));

    try {
      if (!originalLikedState) {
        await postService.likePost(post.id);
      } else {
        await postService.unlikePost(post.id);
      }
    } catch (error) {
      console.error("Failed to like/unlike post:", error);
      setIsLiked(originalLikedState);
      setLikesCount(originalLikesCount);
    }
  };

  const renderCaption = () => {
    if (!post.caption) return null;
    const MAX_CAPTION_LENGTH = 70;
    const showMoreButton = post.caption.length > MAX_CAPTION_LENGTH;
    return (
      <View>
        <Text style={styles.caption}>
          <Text style={styles.username}>{post.user.username}</Text>
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
        <Image
          source={{
            uri: post.user.profile_picture_url || "https://placehold.co/100",
          }}
          style={styles.avatar}
        />
        <View style={styles.userInfoContainer}>
          <Text style={styles.username}>{post.user.username}</Text>
          {post.location && (
            <Text style={styles.location}>{post.location}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Icon name="ellipsis-vertical" size={20} color="#262626" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: post.image_url }} style={styles.postImage} />

      <View style={styles.actionsContainer}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Icon
              name={isLiked ? "heart" : "heart-outline"}
              size={28}
              color={isLiked ? "red" : "#262626"}
            />
          </TouchableOpacity>
          {/* onPress diperbarui untuk memanggil onCommentPress */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onCommentPress(post.id)}
          >
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
        <Text style={styles.likes}>{likesCount} likes</Text>
        {renderCaption()}
        {post.comments_count > 0 && (
          <TouchableOpacity onPress={() => onCommentPress(post.id)}>
            <Text style={styles.viewComments}>
              View all {post.comments_count} comments
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", marginBottom: 10 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  avatar: { width: 35, height: 35, borderRadius: 17.5 },
  userInfoContainer: { flex: 1, marginLeft: 10 },
  username: { fontWeight: "bold", color: "#262626" },
  location: { fontSize: 12, color: "#666" },
  optionsButton: {},
  postImage: { width: "100%", aspectRatio: 1 },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  leftActions: { flexDirection: "row" },
  actionButton: { marginHorizontal: 5 },
  infoContainer: { paddingHorizontal: 15, paddingBottom: 10 },
  likes: { fontWeight: "bold", color: "#262626" },
  caption: { marginTop: 5, color: "#262626" },
  moreText: { color: "#8e8e8e" },
  viewComments: { color: "#8e8e8e", marginTop: 5 },
});

export default PostCard;
