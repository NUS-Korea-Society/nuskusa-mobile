import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostPreviewItem from "./PostPreviewItem";
import { PostSummary } from "../../../types/PostSummary";
import { setCurrentBoardPage } from "../../../redux/features/currentBoardPage";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

type Props = {
  navigation: any;
  boardType: string;
};

const BoardPreviewList = ({ navigation, boardType }: Props) => {
  const [board, setBoard] = useState({});
  const [permission, setPermission] = useState({});
  const [postArr, setPostArray] = useState<any>([]);

  useEffect(() => {
    fetchBoard().catch(console.error);
    fetchPosts().catch(console.error);
  }, [boardType]);

  const dispatch = useDispatch();

  const navigateBoard = () => {
    dispatch(setCurrentBoardPage(boardType));
    navigation.navigate("PostList", { boardType: boardType });
  };

  const fetchBoard = async () => {
    const url = REACT_APP_HOST + "/api/board/getBoard/" + boardType;
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status == 200) {
      const data = await response.json();
      const board = data.data;
      const permissions = data.permissions;
      const boardObject = {
        title: board.title,
        description: board.description,
        boardId: board.boardId,
        boardColor: board.boardColor,
        boardTextColor: board.boardTextColor,
      };
      setBoard(boardObject);
      setPermission(permission);
    }
  };

  const fetchPosts = async () => {
    const url = REACT_APP_HOST + "/api/board/getPosts/" + boardType;
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status == 200) {
      const posts = await response.json();
      const postArray = [];
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const postObject: any = {
          id: post.id,
          title: post.title,
          content: post.content,
          isAnnouncement: post.isAnnouncement,
          isHidden: post.isHidden,
          isAnonymous: post.isAnonymous,
          isPinned: post.isPinned,
          isEvent: post.isEvent,
          lastModified: new Date(post.updatedAt),
          author: post.author,
          // upvoteCount: post.upvoteCount,
        };
        postObject.lastModified.setHours(
          postObject.lastModified.getHours() - 8
        );
        // postArray.push(postObject);
        postArray.push(post);
        if (postArray.length == 6) {
          // Maintain the number of preview posts to the most recent 5 posts
          postArray.shift;
        }
      }
      setPostArray(postArray);
    }
  };

  const fetchPostUpVote = async (post: any) => {
    const url = REACT_APP_HOST + "/api/post/getPosts/" + post.id;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.status == 200) {
      const post = await response.json();
      post.lastModified = new Date(post.updatedAt);
      post.lastModified.setHours(post.lastModified.getHours() - 8);
      return post;
    }
  };

  return (
    <View>
      <View style={{ justifyContent: "space-between" }}>
        {/* <Text>{boardType}</Text> */}
        <View style={styles.itemsContainer}>
          {/* <FlatList
          data={postArr}
          renderItem={({ item }) => (
            // <View style={{width: }}>
            
            // </View>
          )}
          showsVerticalScrollIndicator={false}
        /> */}
          {postArr.map((item: any) => (
            <PostPreviewItem
              post={item}
              content={item.title}
              time={item.createdAt}
              upvoteCount={1}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.viewAllContainer}
          onPress={navigateBoard}
        >
          <Text style={styles.viewAllButtonText}>+ View All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BoardPreviewList;

const styles = StyleSheet.create({
  itemsContainer: {
    alignItems: "center",
    height: 213,
  },
  viewAllContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  viewAllButtonText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
