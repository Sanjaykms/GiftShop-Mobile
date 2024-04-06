import React, { Fragment } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useReviewCxt } from "../../../contexts/review-context";
import Review from "./Review";
import { useAuthCxt } from "../../../contexts/auth-context";

const ReviewsList = (props) => {
  const reviewCxt = useReviewCxt();
  const authCxt = useAuthCxt();
  const { reviewList } = reviewCxt;
  const { productId } = props;
  let content;
  const filteredReviewList = reviewList.filter((item) => {
    return item.giftId === productId;
  });

  const deleteReviewHandler = (reviewId) => {
    Alert.alert("Delete?", "Want to delete this?", [
      { text: "No", onPress: () => {} },
      { text: "OK", onPress: () => reviewCxt.deleteReview(reviewId) },
    ]);
  };

  if (filteredReviewList.length > 0) {
    content = filteredReviewList.map((item, index) => {
      const isNeed = item.userId === authCxt.userInfo.userId;
      return (
        <Fragment key={index}>
          <Review
            reviewItem={item}
            userName={item.userName}
            comment={item.reviewText}
            reviewId={item.reviewId}
            isNeed={isNeed}
            onDelete={deleteReviewHandler}
            onEdit={props.editReviewHandler}
          />
          <View style={styles.hr} />
        </Fragment>
      );
    });
  } else {
    content = <Text style={styles.noReviews}>No Reviews yet</Text>;
  }

  return <Fragment>{content}</Fragment>;
};

const styles = StyleSheet.create({
  hr: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
  },
  noReviews: {
    textAlign: "center",
    marginTop: 10,
    color: "#666",
    marginBottom: 20,
  },
});

export default ReviewsList;
