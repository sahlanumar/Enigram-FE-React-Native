import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import postService from "../../../services/postService";

const CommentItem = ({ comment }) => (
  <View style={styles.commentContainer}>
    {/* Gambar profil bisa ditambahkan di sini jika ada di data comment */}
    <View style={styles.commentContent}>
      <Text>
        <Text style={styles.commentUsername}>{comment.username}</Text>{" "}
        {comment.content}
      </Text>
    </View>
  </View>
);

const CommentsModal = ({ postId, isVisible, onClose }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    setIsLoading(true);
    try {
      const fetchedComments = await postService.getPostComments(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (isVisible) {
      fetchComments();
    }
  }, [isVisible, fetchComments]);

  const handleAddComment = async () => {
    if (newComment.trim().length === 0) return;
    try {
      const addedComment = await postService.addComment(postId, newComment);
      const transformedComment = { ...addedComment, username: "Anda" }; 
      setComments((prev) => [transformedComment, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Comments</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={30} color="#262626" />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <ActivityIndicator style={{ marginTop: 20 }} />
          ) : (
            <FlatList
              data={comments}
              renderItem={({ item }) => <CommentItem comment={item} />}
              keyExtractor={(item) => item.id.toString()}
              style={styles.list}
            />
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity onPress={handleAddComment}>
              <Text style={styles.postButton}>Post</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dbdbdb",
    position: "relative",
  },
  headerTitle: { fontWeight: "bold", fontSize: 18 },
  list: { flex: 1 },
  commentContainer: { flexDirection: "row", padding: 15 },
  commentContent: { flex: 1 },
  commentUsername: { fontWeight: "bold" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#dbdbdb",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  postButton: { color: "#3897f0", fontWeight: "bold", fontSize: 16 },
});

export default CommentsModal;
