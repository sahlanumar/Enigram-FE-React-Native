import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import postService from "../services/postService";
import {
  SearchBar,
  GridRow,
  AllSmallRow,
  ExploreBar,
} from "../components/explore";

const chunkArray = (array) => {
  const result = [];
  for (let i = 0; i < array.length; i += 3) {
    result.push(array.slice(i, i + 3));
  }
  return result;
};

const transformFeedData = (items) => {
  return items.map((item) => ({
    ...item,
    user: {
      username: item.username,
      profile_picture_url: item.profile_picture_url,
      is_verified: item.is_verified,
    },
  }));
};

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [explorePosts, setExplorePosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(
    async (isInitial = false) => {
      if (isFetchingMore || (!isInitial && !hasMore)) return;

      if (isInitial) setIsLoading(true);
      else setIsFetchingMore(true);
      setError(null);

      const currentOffset = isInitial ? 0 : offset;
      try {
        const promises = [
          postService.getExploreFeed({ limit: 12, offset: currentOffset }),
        ];
        if (isInitial) {
          promises.push(postService.getFeed({ limit: 10 }));
        }

        const [newExplorePosts, newFollowingPosts] =
          await Promise.all(promises);

        if (newExplorePosts?.length > 0) {
          setExplorePosts((prev) =>
            isInitial ? newExplorePosts : [...prev, ...newExplorePosts]
          );
          setOffset(currentOffset + newExplorePosts.length);
        } else {
          setHasMore(false);
        }

        if (newFollowingPosts) {
          setFollowingPosts(transformFeedData(newFollowingPosts));
        }
      } catch (err) {
        console.error("Failed to fetch explore data:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    },
    [isFetchingMore, hasMore, offset]
  );

  useEffect(() => {
    fetchData(true);
  }, []);

  const handleRefresh = () => {
    setHasMore(true);
    fetchData(true);
  };

  const handlePostPress = (postId) => {
    navigation.navigate("PostDetail", { postId });
  };

  const renderGridRow = ({ item, index }) => {
    if (item.length !== 3) return null;
    const patternIndex = index % 4;
    if (patternIndex === 0)
      return (
        <GridRow items={item} reverse={false} onPostPress={handlePostPress} />
      );
    if (patternIndex === 2)
      return (
        <GridRow items={item} reverse={true} onPostPress={handlePostPress} />
      );
    return <AllSmallRow items={item} onPostPress={handlePostPress} />;
  };

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} />;
  };

  if (isLoading && explorePosts.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chunkArray(explorePosts)}
        renderItem={renderGridRow}
        keyExtractor={(_, index) => `row_${index}`}
        ListHeaderComponent={
          <>
            <SearchBar />
            <ExploreBar posts={followingPosts} onPostPress={handlePostPress} />
          </>
        }
        onRefresh={handleRefresh}
        refreshing={isLoading}
        showsVerticalScrollIndicator={false}
        onEndReached={() => fetchData(false)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExploreScreen;
